import constants from "./constants";
import dictionaries from "./dictionary";

/*
* BEM helper
*
* bem()                       => 'plotly-editor'
* bem('foo')                  => 'plotly-editor__foo'
* bem('foo', 'bar')           => 'plotly-editor__foo__bar'
* bem('foo', ['mod'])         => 'plotly-editor__foo plotly-editor__foo--mod'
* bem('foo', 'bar', ['mod'])  => 'plotly-editor__foo__bar plotly-editor__foo__bar--mod'
* bem('foo', ['mod1', mod2']) => 'plotly-editor__foo plotly-editor__foo--mod1 plotly-editor__foo--mod2'
*/
export function bem(block, element, modifiers) {
  var i, modifier;
  var out = [];
  var c = constants.baseClass;

  if (Array.isArray(block)) {
    modifiers = block;
    block = null;
    element = null;
  } else if (Array.isArray(element)) {
    modifiers = element;
    element = null;
  }

  if (block && block.length) {
    c += "__" + block;
  }

  if (element && element.length) {
    c += "__" + element;
  }

  out.push(c);
  if (modifiers) {
    for (i = 0; i < modifiers.length; i++) {
      modifier = modifiers[i];
      if (modifier && modifier.length) {
        out.push(c + "--" + modifier);
      }
    }
  }

  return out.join(" ");
}

var state = {};

export function setLocale(locale) {
  state.locale = locale;
  state.dictionary = dictionaries[locale];
}

export function _(str) {
  var parts = str.split(".");

  var ref = state.dictionary;

  console.log("ref:", ref);
  for (var i = 0; i < parts.length; i++) {
    if (ref[parts[i]]) {
      ref = ref[parts[i]];
    } else {
      return str;
    }
  }

  return ref;
}
