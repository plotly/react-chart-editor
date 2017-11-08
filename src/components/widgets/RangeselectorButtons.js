/*
 * This component is used to create rangeselector buttons:
 *     https://plot.ly/javascript/reference/#layout-xaxis-rangeselector
 * We're rebuilding the buttons array because of this bug on Plotly.js:
 *     https://github.com/plotly/plotly.js/issues/777
 * We are able to make this work because Plotly.js is more lenient here:
 *     https://github.com/plotly/plotly.js/issues/749
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { tail } from "ramda";

import AccordionMenu from "./AccordionMenu";
import connectWorkspacePlot from "@workspace/utils/connectWorkspacePlot";

// eslint-disable-next-line
import GenericStylePanel from "@workspace/components/panels/EditSidebar/Style/GenericStyleComponents/Generic";
import { _ } from "@common/utils/i18n";
import { CONTROL_TYPES } from "@workspace/constants/workspace";
import { relayout } from "@workspace/actions/workspace";
import { textControls } from "@workspace/schemas/Reusable";

class RangeselectorButtons extends Component {
  constructor(props) {
    super(props);
    this.removeButton = this.removeButton.bind(this);
    this.newButton = this.newButton.bind(this);
  }

  removeButton(userButtonIndex) {
    const { axisTarget, buttons, dispatch } = this.props;
    const userButtonsArray = tail(buttons);
    const reset = { step: "all", label: "reset" };

    userButtonsArray.splice(userButtonIndex, 1);
    userButtonsArray.unshift(reset);

    const relayoutObject =
      userButtonsArray.length === 1
        ? { [`${axisTarget}.rangeselector.buttons`]: [] }
        : { [`${axisTarget}.rangeselector.buttons`]: userButtonsArray };

    dispatch(relayout(relayoutObject));
  }

  newButton() {
    const { axisTarget, buttons, dispatch } = this.props;
    const newButtons = [...buttons, { label: `#${buttons.length}` }];
    const reset = { step: "all", label: "reset" };

    const relayoutObject =
      buttons.length === 0
        ? { [`${axisTarget}.rangeselector.buttons`]: [reset, { label: "#1" }] }
        : { [`${axisTarget}.rangeselector.buttons`]: newButtons };

    dispatch(relayout(relayoutObject));
  }

  buildSpec(index) {
    const { axisTarget } = this.props;
    const prefix = `layout.${axisTarget}.rangeselector.buttons[${index}]`;
    return {
      controls: [
        {
          label: "Label",
          type: CONTROL_TYPES.TEXT_INPUT,
          immediate: true,
          attr: `${prefix}.label`,
        },
        {
          label: "Step",
          type: CONTROL_TYPES.DROPDOWN_SELECTOR,
          attr: `${prefix}.step`,
          options: [
            { label: "Month", value: "month" },
            { label: "Year", value: "year" },
            { label: "Day", value: "day" },
            { label: "Hour", value: "hour" },
            { label: "Minute", value: "minute" },
            { label: "Second", value: "second" },
            { label: "All", value: "all" },
          ],
        },
        {
          label: "Count",
          type: CONTROL_TYPES.NUMERIC_INPUT,
          attr: `${prefix}.count`,
        },
        {
          label: "Stepmode",
          type: CONTROL_TYPES.DROPDOWN_SELECTOR,
          attr: `${prefix}.stepmode`,
          options: [
            { label: "Backward", value: "backward" },
            { label: "To Date", value: "todate" },
          ],
        },
      ],
    };
  }

  renderButtonPanel(button, i) {
    const buttonPanel = (
      <GenericStylePanel
        dispatch={this.props.dispatch}
        componentSpec={[this.buildSpec(i + 1)]}
      />
    );

    return {
      content: buttonPanel,
      title: button.label,
      isOpen: true,
    };
  }

  renderGeneralSpec() {
    const prefix = `layout.${this.props.axisTarget}.rangeselector`;
    const visibility = {
      attr: `${prefix}.visible`,
      value: true,
    };

    const generalControls = [
      {
        title: "Visibility",
        controls: [
          {
            label: null,
            type: CONTROL_TYPES.RADIO,
            attr: `${prefix}.visible`,
            options: [
              { label: "Show", value: true },
              { label: "Hide", value: false },
            ],
          },
        ],
      },
      {
        title: "Style",
        controls: [
          {
            /*
                         * Cannot change the color of the 'reset' button:
                         *     https://github.com/plotly/plotly.js/issues/790
                         */
            label: "Background",
            type: CONTROL_TYPES.COLOR,
            attr: `${prefix}.bgcolor`,
          },
          {
            label: "Border Width",
            type: CONTROL_TYPES.NUMERIC_INPUT,
            attr: `${prefix}.borderwidth`,
          },
          {
            label: "Border Color",
            type: CONTROL_TYPES.COLOR,
            attr: `${prefix}.bordercolor`,
          },
        ],
        visibility: visibility,
      },
      {
        title: "Text",
        controls: textControls(`${prefix}.font`),
        visibility: visibility,
      },
      {
        title: "Position",
        controls: [
          {
            label: "Horizontal",
            type: CONTROL_TYPES.NUMERIC_INPUT,
            step: 0.1,
            attr: `${prefix}.x`,
          },
          {
            label: "Vertical",
            type: CONTROL_TYPES.NUMERIC_INPUT,
            step: 0.1,
            attr: `${prefix}.y`,
          },
        ],
        visibility: visibility,
      },
    ];

    return (
      <div style={{ marginTop: "20px" }}>
        <GenericStylePanel
          dispatch={this.props.dispatch}
          componentSpec={generalControls}
        />
      </div>
    );
  }

  render() {
    const { axisTarget, buttons, value } = this.props;
    if (axisTarget === "xaxis") {
      const allUserButtons = tail(value.buttons);
      const buttonPanels = allUserButtons.map(
        this.renderButtonPanel.bind(this)
      );
      let generalStylingControls =
        buttons.length > 0 ? this.renderGeneralSpec() : null;

      return (
        <div className="+clearfix">
          <AccordionMenu
            subMenus={buttonPanels}
            addMenuText={_("Button")}
            removeMenuHandler={this.removeButton}
            addNewMenuHandler={this.newButton}
          />
          {generalStylingControls}
        </div>
      );
    }
    throw new Error(`This styling option is unavalable for ${axisTarget} axis`);
  }
}

RangeselectorButtons.propTypes = {
  axisTarget: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.object,
};

function mapPlotToProps(plot, { axisTarget }) {
  const buttonsPath = ["_fullLayout", axisTarget, "rangeselector", "buttons"];
  return { buttons: plot.pathOr([], buttonsPath) };
}

export default connectWorkspacePlot(mapPlotToProps)(RangeselectorButtons);
