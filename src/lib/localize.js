import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default function localize(Comp) {
  class LocalizedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      let dictionaries = context.dictionaries;
      let locale = context.locale;

      this.localize = function localize(str) {
        return localizeString(dictionaries, locale, str);
      };
    }

    render() {
      return <Comp localize={this.localize} {...this.props} />;
    }
  }

  LocalizedComponent.contextTypes = LocalizedComponent.contextTypes || {};
  LocalizedComponent.contextTypes.dictionaries = PropTypes.object;
  LocalizedComponent.contextTypes.locale = PropTypes.string;

  return LocalizedComponent;
}

export function localizeString(dictionaries, locale, key) {
  const dict = dictionaries[locale];
  if (dict && dict.hasOwnProperty(key)) {
    return dict[key];
  } else {
    return key;
  }
}
