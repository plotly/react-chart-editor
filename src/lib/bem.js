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

import {baseClass} from './constants';

export default function bem(block, element, modifiers) {
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
