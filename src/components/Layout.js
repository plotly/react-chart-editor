import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bem} from '../lib';
import {EDITOR_ACTIONS} from '../constants';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.updateContainer = this.updateContainer.bind(this);
  }

  getChildContext() {
    const {layout, fullLayout, plotly} = this.context;
    return {
      getValObject: plotly.PlotSchema.getLayoutValObject.bind(null, fullLayout),
      updateContainer: this.updateContainer,
      container: layout,
      fullContainer: fullLayout,
    };
  }

  updateContainer(update) {
    this.context.onUpdate &&
      this.context.onUpdate({
        type: EDITOR_ACTIONS.UPDATE_LAYOUT,
        payload: {
          update,
        },
      });
  }

  render() {
    return (
      <div>
        <div className={bem('trace-panel', 'top', ['active'])}>
          Layout {this.props.traceIndex}
        </div>
        <div className={bem('trace-panel', 'panel')}>{this.props.children}</div>
      </div>
    );
  }
}

Layout.contextTypes = {
  layout: PropTypes.object,
  fullLayout: PropTypes.object,
  plotly: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

Layout.childContextTypes = {
  getValObject: PropTypes.func,
  updateContainer: PropTypes.func,
  container: PropTypes.object,
  fullContainer: PropTypes.object,
};
