# plotly-react-editor

> Standalone React-based editor panel for Plotly charts

## Theming

If you are interested in theming the editor to suit your needs, we've opted to use CSS custom properties (variables). CSS variables are newer and they run in the browser. Unlike variables in a css preprocessor like less/scss, these can easily be overridden with a simple `.css` file (imported after the main stylesheet).

[Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) about CSS custom properties.

See if [you can use them](https://caniuse.com/#feat=css-variables).

### Sample

Here is a sample theme to change the UI from light to Dark.

![editor-theme-example](https://user-images.githubusercontent.com/11803153/34530258-2dc6fcc0-f074-11e7-969b-b54327416b30.png)

```
@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,700|Roboto+Mono:400,500,700');

.theme--dark .plotly-editor {
  /* Global Colors */
  --color-accent: hsl(205, 100%, 53%);
  --color-accent-shade-mid: hsl(205, 87%, 47%);
  --color-accent-shade: hsl(205, 87%, 40%);
  --color-brand: hsl(269, 94%, 68%);

  /* Background Colors */
  --color-background-base: hsl(216, 28%, 12%);
  --color-background-light: hsl(216, 30%, 16%);
  --color-background-medium: hsl(224, 14%, 18%);
  --color-background-dark: hsl(216, 30%, 20%);
  --color-background-top: hsl(216, 30%, 20%);
  --color-background-inputs: hsl(213, 25%, 12%);

  /* Primary Button:fills */
  --color-button-primary-base-fill: hsl(269, 94%, 68%);
  --color-button-primary-hover-fill: hsl(269, 90%, 62%);
  --color-button-primary-active-fill: hsl(269, 85%, 58%);
  /* Primary Button:border */
  --color-button-primary-base-border: hsl(269, 94%, 75%);
  --color-button-primary-hover-border: hsl(269, 94%, 75%);
  --color-button-primary-active-border: hsl(269, 94%, 75%);

  /* Border Colors */
  --color-border-default: hsl(213, 20%, 28%);
  --color-border-light: hsl(213, 25%, 26%);
  --color-border-dark: hsl(213, 25%, 20%);

  /* Typographical Styles */
  --font-family-body: 'Noto Sans', sans-serif;
  --font-family-headings: 'Roboto Mono', sans-serif;
  --font-size-base: 14px;
  --font-size-heading-base: 20px;
  --font-letter-spacing-headings: 0px;
  --color-text-base: hsl(216, 60%, 80%);
  --color-text-dark: hsl(205, 100%, 92%);
  --color-text-light: hsl(205, 100%, 80%);
  --color-text-active: var(--color-white);
  --color-text-header: hsl(205, 100%, 65%);

  /* Fold Component Styles */
  --fold-header-text-color-base: var(--color-white);
  --fold-header-text-color-closed: var(--color-text-dark);
  --fold-header-background-closed: var(--color-background-dark);
  --fold-header-background-base: var(--color-background-light);
  --fold-header-border-color-base: var(--color-border-default);
  --fold-header-border-color-closed: var(--color-border-default);

  /* Effects */
  --box-shadow-base-color: hsla(216, 32%, 15%, 0.5);
  --text-shadow-dark-ui-inactive: 0;
}
```

You can inspect the editor and see a full listing of all variables that you can override:

![see-css-variables-inspector](https://user-images.githubusercontent.com/11803153/34531018-7e24bbba-f076-11e7-90cd-a35fe5eae84d.png)

## Caveats

CSS custom properties are not supported in IE11. However, you can use a [PostCSS](https://github.com/postcss/postcss) plugin to convert the css properties to their true value when they are used. We are using [PostCSS Custom Properties](https://github.com/postcss/postcss-custom-properties).

The PostCSS plugin we are using only applies to variables that are in the `:root{}` scope. If you'd like to both theme and use your styles to support IE11, you would need to import the unminified IE styles we ship with the editor:
 `import react-plotly.js-editor/lib/react-plotly.js-editor.ie.css` (this stylesheet has the variables attached to the `:root{}` scope).

 Then, rather than applying your custom properties to `.theme--dark .plotly-editor`, you would apply your overrides to `:root`.

 Finally, you would pipe in the PostCSS plugin(s) to your project and produce a css file with the properties applied as their true value. It's reccomended to use the [PostCSS Remove Root](https://github.com/cbracco/postcss-remove-root) plugin after you have converted all of the properties.

 You can see our PostCSS scripts [here](https://github.com/plotly/react-plotly.js-editor/tree/master/scripts/postcss.js).
