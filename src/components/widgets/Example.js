import R from "ramda";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { _ } from "@common/utils/i18n";
import * as WorkspaceActions from "@workspace/actions/workspace";
import { GET_ENCODING_SCHEMA } from "@workspace/constants/graphTable";

// Some of these have hardcoded splinter tests. Change them with this in mind
export const EXAMPLES = {
  scatter: "https://plot.ly/~chris/17604", // Splinter tested
  line: "https://plot.ly/~chris/17606", // Splinter tested
  bar: "https://plot.ly/~PlotBot/41",
  pie: "https://plot.ly/~stacyannj/2145", // Splinter tested
  errorbars: "https://plot.ly/~etpinard/267", // Splinter tested
  heatmap: "https://plot.ly/~chris/17615", // Splinter tested
  contour: "https://plot.ly/~chris/17618", // Splinter tested
  histogram: "https://plot.ly/~chris/17610",
  box: "https://plot.ly/~PlotBot/32",
  histogram2d: "https://plot.ly/~chris/17612",
  histogram2dcontour: "https://plot.ly/~chris/17600", // Splinter tested
  scattergeo: "https://plot.ly/~chris/17602", // Splinter tested
  choropleth: "https://plot.ly/~chris/17624",
  surface: "https://plot.ly/~chris/17620", // Splinter tested
  scatter3d: "https://plot.ly/~chelsea_lyn/8794",
  // mesh3d: 'https://plot.ly/~chris/17628' // TODO: add once validation passes
  // scattermapbox: 'https://plot.ly/~chris/17622' // TODO: add once validation passes
};

export const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export class LoadExampleButton extends Component {
  constructor(props) {
    super(props);
    this.loadExample = this.loadExample.bind(this);
    this.state = { status: STATUS.SUCCESS };
  }

  /*
     * Download the JSON of the figure and
     * 1 - Convert the data from the figure into our column state
     * 2 - Create a new table with that data
     * 3 - Re-create the graph by assigning these columns to graph attributes
     */
  loadExample() {
    const { chartType } = this.props;
    this.setState({ status: STATUS.LOADING });

    fetch(`${EXAMPLES[chartType]}.json`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(figure => {
        const { dispatch, chartType } = this.props;

        dispatch(WorkspaceActions.loadFigure(figure, chartType));
        this.setState({ status: STATUS.SUCCESS });
      })
      .catch(err => {
        window.Raven.captureException(err);
        console.error(err);

        this.setState({ status: STATUS.ERROR });
        return;
      });
  }

  render() {
    if (!R.has(this.props.chartType, EXAMPLES)) {
      return null;
    }

    return (
      <ExampleButton
        loadExample={this.loadExample}
        status={this.state.status}
      />
    );
  }
}
LoadExampleButton.propTypes = {
  chartType: PropTypes.oneOf(Object.keys(GET_ENCODING_SCHEMA())),
  dispatch: PropTypes.func.isRequired,
};

const ExampleButton = props => {
  const buttonClass = classnames("plot-example-button", "js-example-button");

  const loadingButtonclass = classnames(
    "plot-example-button",
    "js-example-button",
    "plot-example-loading"
  );

  if (props.status === STATUS.LOADING) {
    return <div className={loadingButtonclass}>{_("Loading...")}</div>;
  }

  if (props.status === STATUS.ERROR) {
    return (
      <div className={buttonClass} onClick={props.loadExample}>
        {_("Hm... error occurred. Click to try again.")}
      </div>
    );
  }

  return (
    <div className={buttonClass} onClick={props.loadExample}>
      <i className="icon-arrow +soft-quarter-right" />
      {_("Try an example")}
    </div>
  );
};

ExampleButton.propTypes = {
  loadExample: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS)),
};
