import AccordionMenuItem from "./AccordionMenuItem";
import AnnotationEditor from "./annotation_editor/AnnotationEditor";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import NumericInputStatefulWrapper from "./NumericInputStatefulWrapper";
import RadioBlocks from "./RadioBlocks";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ToolMenuItem from "./ToolMenuItem";
import { _ } from "@common/utils/i18n";
import { contains, has, empty, merge } from "ramda";
import { relayout } from "@workspace/actions/workspace";
import { showNotification } from "@common/actions/notification";

export const DEFAULT_ANNOTATION_VALUES = {
  ax: 0,
  ay: -20,
  annotationTemplate: "{x}, {y}",

  align: "left",
  fontcolor: "rgb(60, 60, 60)",
  fontsize: 12,
  fontfamily: '"Open Sans", verdana, arial, sans-serif',

  showarrow: true,
  arrowcolor: "rgb(60, 60, 60)",
  arrowwidth: 1,
};

export default class AutomaticAnnotationWidget extends Component {
  constructor() {
    super();
    this.state = merge(DEFAULT_ANNOTATION_VALUES, { showControls: false });
    this.plotlyClickHandler = this.plotlyClickHandler.bind(this);
    this.renderControls = this.renderControls.bind(this);
  }

  componentDidMount() {
    const gd = document.querySelector(".js-plot-panel");
    gd.on("plotly_click", this.plotlyClickHandler);
  }

  componentWillUnmount() {
    const gd = document.querySelector(".js-plot-panel");
    // TODO: removeListener seems to be the right API, but I've
    // seen removeEventListener elsewhere in the code
    gd.removeListener("plotly_click", this.plotlyClickHandler);
  }

  plotlyClickHandler(clickObject) {
    const { annotationsLength, dispatch } = this.props;

    const {
      ax,
      ay,
      annotationTemplate,
      align,
      fontcolor,
      fontsize,
      fontfamily,
      showarrow,
      arrowcolor,
      arrowwidth,
    } = this.state;

    const relayoutObject = {};

    for (var i = 0; i < clickObject.points.length; i++) {
      const point = clickObject.points[i];

      /*
            * Annotations can only be bound to x and y axes
            * 'z', 'lat', 'lon', etc axes aren't supported.
            * Validate the the point has an 'xaxis' and 'yaxis'
            * and no 'z' axis.
            */
      if (!(has("xaxis", point) && has("yaxis", point))) {
        showNotification(`
                    Clicking on data points to add annotations isn't supported
                    for this chart type. It is only supported for 2D plots.`);
        continue;
      } else if (
        has("xaxis", point) &&
        has("yaxis", point) &&
        has("zaxis", point)
      ) {
        showNotification(`
                    Adding annotations by clicking on points
                    isn't supported for 3D charts yet.
                    `);
        continue;
      }

      // fullData is confusingly named. this is really the full trace.
      const trace = point.fullData;
      const pointNumber = point.pointNumber;
      const templateVariables = ["x", "y", "text", "z"];
      let text = annotationTemplate;
      let annotationIndex = Number.isNaN(annotationsLength)
        ? 0
        : annotationsLength;
      for (let j = 0; j < templateVariables.length; j++) {
        const t = templateVariables[j];

        /*
                * the point object contains data about the hover point
                * that was clicked on. this might actually be different
                * than the trace data itself. For example, in box plots,
                * the point.x and point.y contains positional data of
                * the 5 hover flags on the box plot
                * (median, quartials, tails) not the underlying data.
                *
                * the 'text' data is found in the actual trace.
                */

        // 'x', 'y', 'z' data
        if (has(t, point)) {
          text = text.replace(`{${t}}`, point[t]);
        } else if (
          has(t, trace) &&
          Array.isArray(trace[t]) &&
          point.pointNumber < trace[t].length
        ) {
          // 'text' data
          text = text.replace(`{${t}}`, trace[t][pointNumber]);
        }
      }

      const annotation = {
        text,
        // position the annotation with an arrow (which may be transparent)
        showarrow: DEFAULT_ANNOTATION_VALUES.showarrow,
        x: point.x,
        y: point.y,
        xref: point.xaxis._id,
        yref: point.yaxis._id,
        ax,
        ay,
        arrowcolor: showarrow ? arrowcolor : "rgba(0, 0, 0, 0)",

        align,
        font: {
          color: fontcolor,
          family: fontfamily,
          size: fontsize,
        },
        arrowwidth,
        arrowhead: 0,
      };

      relayoutObject[`annotations[${annotationIndex}]`] = annotation;
      annotationIndex += 1;
    }

    if (empty(relayoutObject)) {
      dispatch(relayout(relayoutObject));
    }
  }

  renderControls() {
    return (
      <div>
        <div className="automatic-annotation-widget__container">
          <div>{_("Text Template")}</div>
          <AnnotationEditor
            onChange={value => this.setState({ annotationTemplate: value })}
            placeholder={"y = {y}"}
            value={this.state.annotationTemplate}
          />

          <div className="automatic-annotation-widget__description">
            {_("Note")}: <code>{" {y} "}</code>
            {_("and")}
            <code>{" {x} "}</code>
            {_(`are special tokens that will get
                        filled in with the x and y values
                        of the data point that you click on.
                        {text} and {z} are also supported if
                        your data points contains those attributes.
                        Stuck? `)}
            <a
              href="http://help.plot.ly/how-to-add-annotations/#step-6-add-an-automatically-positioned-label"
              target="_blank"
            >
              {_("Check out our tutorial")}
            </a>.
          </div>
        </div>

        {contains("<br>", this.state.annotationTemplate) ? (
          <ToolMenuItem className={"js-alignment"} title={_("Alignment")}>
            <RadioBlocks
              options={[
                { label: "", value: "left", icon: "icon-align-left" },
                { label: "", value: "center", icon: "icon-align-center" },
                { label: "", value: "right", icon: "icon-align-right" },
              ]}
              activeOption={this.state.align}
              onOptionChange={align => {
                this.setState({ align });
              }}
            />
          </ToolMenuItem>
        ) : null}

        <ToolMenuItem
          className={"js-ay"}
          title={_("Vertical Position Relative to Data Point")}
          units={"px"}
        >
          <NumericInputStatefulWrapper
            value={this.state.ay}
            onUpdate={ay => this.setState({ ay })}
            step={10}
          />
        </ToolMenuItem>

        <ToolMenuItem
          className={"js-ax"}
          title={_("Horizontal Position Relative to Data Point")}
          units={"px"}
        >
          <NumericInputStatefulWrapper
            value={this.state.ax}
            onUpdate={ax => this.setState({ ax })}
            step={10}
          />
        </ToolMenuItem>

        {/* Standard Properties */}

        <ToolMenuItem className={"js-fontcolor"} title={_("Text Color")}>
          <ColorPicker
            onColorChange={fontcolor => {
              this.setState({ fontcolor });
            }}
            dispatch={this.props.dispatch}
            selectedColor={this.state.fontcolor}
          />
        </ToolMenuItem>

        <ToolMenuItem title={_("Size")}>
          <NumericInputStatefulWrapper
            value={this.state.fontsize}
            onUpdate={fontsize => this.setState({ fontsize })}
            step={10}
          />
        </ToolMenuItem>

        <ToolMenuItem title={_("Typeface")}>
          <FontSelector
            onChange={fontfamily => {
              this.setState({ fontfamily });
            }}
            dispatch={this.props.dispatch}
            activeOption={this.state.fontfamily}
          />
        </ToolMenuItem>

        <ToolMenuItem title={_("Arrow")}>
          <RadioBlocks
            options={[
              { value: true, label: "Show" },
              { value: false, label: "Hide" },
            ]}
            activeOption={this.state.showarrow}
            onOptionChange={showarrow => {
              this.setState({ showarrow });
            }}
          />
        </ToolMenuItem>

        {this.state.showarrow ? (
          <ToolMenuItem title={_("Arrow Color")}>
            <ColorPicker
              onColorChange={arrowcolor => {
                this.setState({ arrowcolor });
              }}
              dispatch={this.props.dispatch}
              selectedColor={this.state.color}
            />
          </ToolMenuItem>
        ) : null}

        {this.state.showarrow ? (
          <ToolMenuItem title={_("Line Width")} units={"px"}>
            <NumericInputStatefulWrapper
              value={this.state.arrowwidth}
              onUpdate={arrowwidth => this.setState({ arrowwidth })}
              step={1}
            />
          </ToolMenuItem>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="automatic-annotation-widget__header">
          {_("Add annotations by clicking on data points in the graph. ")}
        </div>

        <div>
          <AccordionMenuItem
            id="automatic-annotation-controls"
            isOpen={this.state.showControls}
            onToggle={() =>
              this.setState({
                showControls: !this.state.showControls,
              })}
            title={"Annotation Template"}
          >
            {this.renderControls()}
          </AccordionMenuItem>

          <div className="automatic-annotation-widget__button_container">
            <div className="btnbase btn--default" onClick={this.props.onClose}>
              {_("Done")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AutomaticAnnotationWidget.propTypes = {
  dispatch: PropTypes.func.isRequired,
  annotationsLength: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
