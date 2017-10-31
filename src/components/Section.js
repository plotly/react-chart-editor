import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { bem } from "../lib";
import unpackPlotProps from '../lib/unpackPlotProps'

class Section extends Component {
  constructor(props, context) {
    super(props, context);

    this.children = this.processChildren(context);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.children = this.processChildren(nextContext);
  }

  processChildren (context) {
    let children = this.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    children = children.slice();

    for (let i = 0; i < children.length; i++) {
      let child = children[i];


      let isAttr = !!child.props.attr;
      let childProps = Object.assign(
        isAttr ? unpackPlotProps(child.props, context) : {},
        child.props
      );
      childProps.key = i;

      children[i] = cloneElement(child, childProps, child.children);
    }

    return children;
  }

  render() {
    return (
      <div className={bem("section")}>
        <div className={bem("section", "heading")}>{this.props.heading}</div>
        {this.children}
      </div>
    );
  }
}

Section.contextTypes = {
  data: PropTypes.array,
  fullData: PropTypes.array,
  fullLayout: PropTypes.object,
  fullTraceIndex: PropTypes.number,
  graphDiv: PropTypes.any,
  layout: PropTypes.object,
  onUpdate: PropTypes.func,
  plotSchema: PropTypes.object,
  traceIndex: PropTypes.number,
};

export default Section;
