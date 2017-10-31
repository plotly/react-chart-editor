import React, {Component} from 'react';
import {baseClass} from './constants';
import PropTypes from 'prop-types';

export { default as findAttrs } from './find-attrs';
export { default as connectToPlot } from './connectToPlot'

//
// BEM helper
//
// bem()                       => 'plotly-editor'
// bem('foo')                  => 'plotly-editor__foo'
// bem('foo', 'bar')           => 'plotly-editor__foo__bar'
// bem('foo', ['mod'])         => 'plotly-editor__foo plotly-editor__foo--mod'
// bem('foo', 'bar', ['mod'])  => 'plotly-editor__foo__bar plotly-editor__foo__bar--mod'
// bem('foo', ['mod1', mod2']) => 'plotly-editor__foo plotly-editor__foo--mod1 plotly-editor__foo--mod2'
//
export function bem(block, element, modifiers) {
  var i, modifier;
  var out = [];
  var c = baseClass;

  if (Array.isArray(block)) {
    modifiers = block;
    block = null;
    element = null;
  } else if (Array.isArray(element)) {
    modifiers = element;
    element = null;
  }

  if (block && block.length) {
    c += '__' + block;
  }

  if (element && element.length) {
    c += '__' + element;
  }

  out.push(c);
  if (modifiers) {
    for (i = 0; i < modifiers.length; i++) {
      modifier = modifiers[i];
      if (modifier && modifier.length) {
        out.push(c + '--' + modifier);
      }
    }
  }

  return out.join(' ');
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function localize(Comp) {
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
