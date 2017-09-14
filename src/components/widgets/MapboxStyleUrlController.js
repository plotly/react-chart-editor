import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import R from "ramda";
import { _ } from "@common/utils/i18n";
import UncontrolledTextarea from "./UncontrolledTextarea";
import { fetchAndParseStyleJSON } from "@workspace/utils/mapbox";
import { MAPBOX_ATLAS_MESSAGES } from "@workspace/constants/errorMessages";
import Environment from "@common/utils/environment";
import classnames from "classnames";
import URL from "url";
import { EDIT_MODE, MAPBOX_ERROR_TYPES } from "@workspace/constants/workspace";
import { selectEditMode } from "@workspace/actions/workspace";
import MapboxTokenDropdown from "./MapboxTokenDropdown";

const PRESET_STYLES = [
  { label: "Basic", value: "basic" },
  { label: "Outdoors", value: "outdoors" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Satellite", value: "satellite" },
  { label: "Satellite with Streets", value: "satellite-streets" },
];

const STYLE_OPTIONS = [
  { label: "Preset Styles", value: "PRESET" },
  { label: "Mapbox Studio Style", value: "MAPBOX_STUDIO" },
  { label: "Mapbox Atlas Style", value: "MAPBOX_ATLAS" },
  { label: "Custom JSON", value: "JSON" },
];

const VALUE_TYPES = {
  PRESET: "PRESET",
  MAPBOX_STUDIO: "MAPBOX_STUDIO",
  MAPBOX_ATLAS: "MAPBOX_ATLAS",
  JSON: "JSON",
};

const STATUS = {
  LOADING: "LOADING",
  BLANK: "BLANK",
  WARNING: "WARNING",
  DONE: "DONE",
};

const menuItem = content => {
  return (
    <div className="menu-item">
      <div className="menu-item__no-title">{content}</div>
    </div>
  );
};

const menuItemWarning = content => {
  return (
    <div className="menu-item">
      <div className="menu-item__no-title">
        <span className="menu-item__multiple +red-imp">{content}</span>
      </div>
    </div>
  );
};

const MAPBOX_ATLAS_ERROR_MESSAGES = {
  INVALID_JSON: url =>
    menuItemWarning(
      <span>
        {MAPBOX_ATLAS_MESSAGES.INVALID_JSON}
        <a href={url} target="_blank">
          {url}
        </a>
      </span>
    ),

  FAILED_REQUEST: url => {
    let errorMessage;
    if (URL.parse(url).protocol === "http:") {
      errorMessage = menuItemWarning(
        <span>
          {MAPBOX_ATLAS_MESSAGES.FAILED_REQUEST}
          <a href="http://help.plot.ly/mapbox-atlas" target="_blank">
            http://help.plot.ly/mapbox-atlas
          </a>.
        </span>
      );
    } else {
      errorMessage = menuItemWarning(
        <span>
          {MAPBOX_ATLAS_MESSAGES.DOWNLOAD}
          <a href={url} target="_blank">
            {url}
          </a>
          {_(" in your browser to verify that the URL works?")}
        </span>
      );
    }
    return errorMessage;
  },

  FAILED_PARSING: url =>
    menuItemWarning(
      <span>
        {MAPBOX_ATLAS_MESSAGES.FAILED_PARSING}
        <a href={url} target="_blank">
          {url}
        </a>.
        {MAPBOX_ATLAS_MESSAGES.EXPECTED_URL}
        http://my-atlas-server:2999/pages/light-v6/cilo6dghg0008a2kqgq9dnsug.json
      </span>
    ),

  UNKNOWN: () => menuItemWarning(<span>{MAPBOX_ATLAS_MESSAGES.UNKNOWN}</span>),
};

// TODO: Try replacing this with our new jsoneditor component
class JsonEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      invalidJSON: false,
    };
    this.setValidJSON = this.setValidJSON.bind(this);
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  setValidJSON(jsonString) {
    this.setState({ invalidJSON: false });
    try {
      const jsonObject = JSON.parse(jsonString);
      this.setState({ value: jsonObject });
    } catch (e) {
      console.error(e);
      this.setState({ invalidJSON: true });
    }
  }

  render() {
    const { applyChanges, textareaStyle, textareaClass } = this.props;
    const { value } = this.state;

    return (
      <div>
        {menuItem(
          <UncontrolledTextarea
            style={textareaStyle}
            className={textareaClass}
            value={JSON.stringify(value, null, 2)}
            onBlur={e => this.setValidJSON(e.target.value)}
          />
        )}

        {this.state.invalidJSON ? (
          menuItem(
            <span className="menu-item__multiple +red-imp +text-center">
              {_("Invalid JSON")}
            </span>
          )
        ) : null}

        {menuItem(
          <div
            className="btn --small --secondary +text-center --full-width"
            onClick={() => applyChanges(this.state.value)}
          >
            {_("Apply Changes")}
          </div>
        )}
      </div>
    );
  }
}

class MapboxStyleUrlController extends Component {
  constructor(props) {
    super(props);

    let defaultValueType;
    const defaultAtlasUrl = Environment.get(
      "PLOTLY_MAPBOX_ATLAS_DEFAULT_STYLE_URL"
    );
    if (defaultAtlasUrl !== "") {
      defaultValueType = VALUE_TYPES.MAPBOX_ATLAS;
    } else {
      defaultValueType = VALUE_TYPES.PRESET;
    }

    this.state = {
      valueType: defaultValueType,

      /*
             * each of these values can get set to plotly.js's
             * layout.mapbox.source value
             */
      values: {
        [VALUE_TYPES.PRESET]: null,
        [VALUE_TYPES.MAPBOX_STUDIO]: null,
        [VALUE_TYPES.MAPBOX_ATLAS]: null,
        [VALUE_TYPES.JSON]: null,
      },
      status: STATUS.BLANK,
      error: null,
      atlasStyleURL: defaultAtlasUrl,
    };

    this.changeValueType = this.changeValueType.bind(this);
    this.setValue = this.setValue.bind(this);
    this.updatePlot = this.updatePlot.bind(this);
    this.setAtlasURL = this.setAtlasURL.bind(this);
    this.downloadAtlasJSON = this.downloadAtlasJSON.bind(this);
    this.viewJson = this.viewJson.bind(this);
  }

  componentWillMount() {
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { values, valueType } = this.state;
    if (
      !values[valueType] &&
      this.props.value.style !== nextProps.value.style
    ) {
      this.setValueFromProps(nextProps);
    }
  }

  setValueFromProps(props) {
    const value = this.props.value.style;
    const { values } = this.state;
    let valueType;
    if (PRESET_STYLES.find(option => option.value === value)) {
      values[VALUE_TYPES.PRESET] = value;
      valueType = VALUE_TYPES.PRESET;
    } else if (typeof value === "string") {
      /*
         * If it's a string, it's likely a mapbox style url like
         * mapbox://chriddyp/styles/my-style
         */
      values[VALUE_TYPES.MAPBOX_STUDIO] = value;
      valueType = VALUE_TYPES.MAPBOX_STUDIO;
    } else if (
      R.isNil(value) &&
      Environment.get("PLOTLY_MAPBOX_ATLAS_DEFAULT_STYLE_URL")
    ) {
      /*
         * When folks have Atlas set up without mapbox studio,
         * nothing will work until they load up their style JSON.
         * mapbox in the plotly.js figure won't be defined and so the `value`
         * will be null. Display the Mapbox Atlas style URL input to prompt them
         * to download their style data.
         */
      valueType = VALUE_TYPES.MAPBOX_ATLAS;
    } else {
      /*
         * Otherwise, it's probably a style JSON object.
         */
      valueType = VALUE_TYPES.JSON;
      values[VALUE_TYPES.JSON] = values[VALUE_TYPES.MAPBOX_ATLAS] = value;
    }

    this.setState({ valueType, values });
  }

  changeValueType(newValueType) {
    const { values, valueType } = this.state;
    this.setState({ valueType: newValueType });
    if (values[newValueType] && values[newValueType] !== values[valueType]) {
      this.props.updatePlot.style(values[newValueType]);
    }
  }

  setValue(value) {
    const { values, valueType } = this.state;
    this.setState({
      values: Object.assign(values, { [valueType]: value }),
      error: null,
    });
  }

  updatePlot() {
    const { values, valueType } = this.state;
    this.props.updatePlot.style(values[valueType]);
  }

  setAtlasURL(atlasStyleURL) {
    this.setState({ atlasStyleURL, error: null });
  }

  downloadAtlasJSON() {
    const { atlasStyleURL } = this.state;
    const updatePlot = this.props.updatePlot.style;
    this.setState({
      status: STATUS.LOADING,
      error: null,
    });

    return fetchAndParseStyleJSON(atlasStyleURL)
      .then(styleJSON => {
        const stateUpdate = this.state;
        stateUpdate.status = STATUS.DONE;
        stateUpdate.values[VALUE_TYPES.MAPBOX_ATLAS] = styleJSON;
        stateUpdate.values[VALUE_TYPES.JSON] = styleJSON;
        this.setState(stateUpdate);

        updatePlot(styleJSON);
      })
      .catch(error => {
        const stateUpdate = this.state;
        stateUpdate.status = STATUS.ERROR;
        if (!R.contains(error.message, Object.keys(MAPBOX_ERROR_TYPES))) {
          console.error(error);
          stateUpdate.error = MAPBOX_ERROR_TYPES.UNKNOWN;
        } else {
          stateUpdate.error = error.message;

          if (error.styleJSON) {
            stateUpdate.values[VALUE_TYPES.MAPBOX_ATLAS] = error.styleJSON;
            stateUpdate.values[VALUE_TYPES.JSON] = error.styleJSON;
          }
        }
        this.setState(stateUpdate);
      });
  }

  viewJson() {
    this.props.dispatch(selectEditMode(EDIT_MODE.JSON));
  }

  render() {
    return (
      <MapboxStyleUrl
        valueType={this.state.valueType}
        values={this.state.values}
        status={this.state.status}
        error={this.state.error}
        atlasStyleURL={this.state.atlasStyleURL}
        changeValueType={this.changeValueType}
        setValue={this.setValue}
        updatePlot={this.updatePlot}
        setAtlasURL={this.setAtlasURL}
        downloadAtlasJSON={this.downloadAtlasJSON}
        viewJson={this.viewJson}
        selectedToken={this.props.value.accesstoken}
        onTokenChange={this.props.updatePlot.accesstoken}
      />
    );
  }
}

MapboxStyleUrlController.propTypes = {
  value: PropTypes.object.isRequired,
  updatePlot: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

const MapboxStyleUrl = props => {
  const {
    valueType,
    values,
    status,
    error,
    atlasStyleURL,

    changeValueType,
    setValue,
    updatePlot,
    setAtlasURL,
    downloadAtlasJSON,
    viewJson,
    selectedToken,
    onTokenChange,
  } = props;

  function renderOptions() {
    const value = values[valueType];

    const help = (
      <div className="menu-item">
        <div className="menu-item__no-title +text-center">
          {/* TODO: fill in this help url */}
          <a href="http://help.plot.ly/mapbox-atlas/" target="_blank">
            {_("Help Page")}
          </a>
        </div>
      </div>
    );

    function header(title, tooltip) {
      return (
        <div className="style-block__header">
          {title}
          <span
            className="hint--left hint--small +float-right"
            data-hint={tooltip}
          >
            <i className="icon-question" />
          </span>
        </div>
      );
    }

    let viewJsonButton = null;
    if (
      R.contains(valueType, [VALUE_TYPES.MAPBOX_ATLAS, VALUE_TYPES.JSON]) &&
      value
    ) {
      let buttonText;
      if (valueType === VALUE_TYPES.MAPBOX_ATLAS) {
        buttonText = "View Mapbox Style JSON";
      } else {
        buttonText = "Rich JSON Editor";
      }

      viewJsonButton = menuItem(
        <div className="button-control" onClick={viewJson}>
          {buttonText}
        </div>
      );
    }

    if (valueType === VALUE_TYPES.PRESET) {
      const onChange = newValue => {
        setValue(newValue);
        updatePlot();
      };
      return menuItem(
        <span className="widget-dropdown">
          <Dropdown
            options={PRESET_STYLES}
            onChange={onChange}
            value={value}
            clearable={false}
          />
        </span>
      );
    } else if (
      R.contains(valueType, [
        VALUE_TYPES.MAPBOX_STUDIO,
        VALUE_TYPES.MAPBOX_ATLAS,
      ])
    ) {
      let tooltip,
        headerText,
        placeholder,
        onSubmit,
        onChange,
        textAreaValue,
        errorMessage;

      if (valueType === VALUE_TYPES.MAPBOX_STUDIO) {
        tooltip = _("Import custom map styles from Mapbox Studio.");
        headerText = _("Mapbox Studio URL");
        placeholder = _(
          "mapbox://styles/your-mapbox-username/your-mapbox-style-id"
        );
        onSubmit = updatePlot;
        onChange = setValue;
        textAreaValue = value === null ? placeholder : value;
        errorMessage = null;
      } else {
        tooltip = _(
          "Download map styles from Mapbox Atlas enterprise map server."
        );
        headerText = _("Mapbox Atlas URL");
        placeholder = _(
          "https://<your-atlas-server>:2999/pages/light-v6/<style-id>.json"
        );
        onSubmit = downloadAtlasJSON;
        onChange = setAtlasURL;
        textAreaValue = atlasStyleURL === null ? placeholder : atlasStyleURL;
        errorMessage = error
          ? MAPBOX_ATLAS_ERROR_MESSAGES[error](atlasStyleURL)
          : null;
      }

      const buttonText =
        status === STATUS.LOADING ? _("Loading...") : _("Load Style");

      const buttonClass = classnames(
        "btn",
        "--small",
        "--secondary",
        "+text-center",
        "--full-width",
        { "+cursor-wait-important": status === STATUS.LOADING }
      );

      return (
        <div>
          {header(headerText, tooltip)}

          {menuItem(
            <textarea
              className="url-input"
              placeholder={placeholder}
              onChange={e => onChange(e.target.value)}
              value={textAreaValue}
            />
          )}

          {menuItem(
            <div className={buttonClass} onClick={onSubmit}>
              {buttonText}
            </div>
          )}

          {errorMessage}

          {viewJsonButton}

          {help}
        </div>
      );
    } else if (valueType === VALUE_TYPES.JSON) {
      const tooltip = _(`
                A Mapbox style is a JSON object that defines the visual appearance of a map:
                what data to draw, the order to draw it in, and how to style the data when
                drawing it.
            `);
      const placeholder = [
        "{",
        '    "version": 8,',
        '    "name": "Mapbox Streets",',
        '    "sprite": "mapbox://sprites/mapbox/streets-v8",',
        '    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",',
        '    "sources": {...},',
        '    "layers": [...]',
      ].join("\n");

      const applyChanges = newValue => {
        setValue(newValue);
        updatePlot();
      };

      return (
        <div>
          {header(_("Mapbox Style JSON"), tooltip)}

          <JsonEditor
            textareaClass={"json-view"}
            value={value}
            applyChanges={applyChanges}
          />

          {viewJsonButton}

          {help}
        </div>
      );
    }
  }

  const token =
    valueType === VALUE_TYPES.MAPBOX_STUDIO ? (
      <MapboxTokenDropdown
        selectedToken={selectedToken}
        onChange={onTokenChange}
      />
    ) : null;

  return (
    <div className="mapbox-style-url">
      <div className="menu-item">
        <div className="menu-item__title">{_("Mapbox Style")}</div>
        <div className="menu-item__widget">
          <span className="widget-dropdown">
            <Dropdown
              options={STYLE_OPTIONS}
              onChange={changeValueType}
              value={valueType}
              clearable={false}
            />
          </span>
        </div>
      </div>

      {token}

      {renderOptions()}
    </div>
  );
};

MapboxStyleUrl.propTypes = {
  valueType: PropTypes.oneOf(Object.keys(VALUE_TYPES)).isRequired,
  values: PropTypes.shape({
    [VALUE_TYPES.PRESET]: PropTypes.oneOf([
      "basic",
      "outdoors",
      "light",
      "dark",
      "satellite",
      "satellite-streets",
    ]),
    [VALUE_TYPES.MAPBOX_STUDIO]: PropTypes.string,
    [VALUE_TYPES.MAPBOX_ATLAS]: PropTypes.object,
    [VALUE_TYPES.JSON]: PropTypes.object,
  }).isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS)).isRequired,
  error: PropTypes.object,
  atlasStyleURL: PropTypes.string,

  changeValueType: PropTypes.func,
  setValue: PropTypes.func,
  updatePlot: PropTypes.func,
  setAtlasURL: PropTypes.func,
  downloadAtlasJSON: PropTypes.func,
  viewJson: PropTypes.func,
  selectedToken: PropTypes.string,
  onTokenChange: PropTypes.func,
};

module.exports = MapboxStyleUrlController;
