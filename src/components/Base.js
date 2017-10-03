import React, { Component } from "react";
import PropTypes from "prop-types";
import { _ } from "../common";

class Base extends Component {
  constructor(props, context) {
    super(props, context);

    this._ = function(key) {
      return _(context.dictionaries, context.locale, key);
    };
  }
}

Base.contextTypes = {
  locale: PropTypes.string,
  dictionaries: PropTypes.object,
};

export default Base;
