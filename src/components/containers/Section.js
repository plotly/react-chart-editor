import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {
  containerConnectedContextTypes,
  localize,
  unpackPlotProps,
  traceTypeToAxisType,
} from '../../lib';
import SectionHeader from './SectionHeader';

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = null;
    this.menuPanel = null;
    this.sectionVisible = false;

    this.processAndSetChildren(props, context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.processAndSetChildren(nextProps, nextContext);
  }

  processAndSetChildren(nextProps, nextContext) {
    const {isVisible} = unpackPlotProps(nextProps, nextContext);
    this.sectionVisible = isVisible === true;

    this.children = React.Children.map(nextProps.children, child => {
      if ((child.type.plotly_editor_traits || {}).is_menu_panel) {
        // Process the first menuPanel. Ignore the rest. MenuPanel does
        // not affect visibility.
        if (!this.menuPanel) {
          this.menuPanel = child;
        }
        return null;
      }

      if ((child.type.plotly_editor_traits || {}).is_axis_creator) {
        // as a hack, right now any section with an axis creator in it will be
        // hidden unless in a trace-connected container whose trace is cartesian
        const {data, fullContainer} = this.context;

        if (
          data.length > 1 &&
          data[fullContainer.index] &&
          traceTypeToAxisType(data[fullContainer.index].type) === 'cartesian'
        ) {
          this.sectionVisible = true;
          return cloneElement(child, {
            isVisible: true,
            container: this.context.container,
            fullContainer: this.context.fullContainer,
          });
        }
        this.sectionVisible = false;
        return child;
      }

      if (child.props.attr) {
        let plotProps;
        if (child.type.supplyPlotProps) {
          plotProps = child.type.supplyPlotProps(child.props, nextContext);
          if (child.type.modifyPlotProps) {
            child.type.modifyPlotProps(child.props, nextContext, plotProps);
          }
        } else {
          plotProps = unpackPlotProps(child.props, nextContext);
        }

        // assign plotProps as a prop of children. If they are connectedToContainer
        // it will see plotProps and skip recomputing them.
        this.sectionVisible = this.sectionVisible || plotProps.isVisible;
        return cloneElement(child, {plotProps});
      }

      if (!(child.type.plotly_editor_traits || {}).no_visibility_forcing) {
        // non-attr components force visibility (unless they don't via traits)
        this.sectionVisible = true;
        return child;
      }

      return child;
    });
  }

  render() {
    if (!this.sectionVisible) {
      return null;
    }
    return (
      <div className="section">
        <SectionHeader name={this.props.name} menuPanel={this.menuPanel} />
        {this.children}
      </div>
    );
  }
}

Section.plotly_editor_traits = {no_visibility_forcing: true};

Section.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  attr: PropTypes.string,
};

Section.contextTypes = containerConnectedContextTypes;
export default localize(Section);
