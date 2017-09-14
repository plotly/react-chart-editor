import React, { PropTypes } from "react";
import Immutable from "immutable";
import ImmutablePropTypes from "react-immutable-proptypes";

import StyleButton from "./StyleButton";

const StyleButtonGroup = React.createClass({
  propTypes: {
    onToggle: PropTypes.func.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.element.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,

    // A draft-js DraftInlineStyle instance
    // https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#getcurrentinlinestyle
    currentStyle: ImmutablePropTypes.orderedSet,
  },

  getDefaultProps() {
    return {
      currentStyle: Immutable.OrderedSet(),
    };
  },

  render() {
    const { currentStyle, linkIsSelected, styles, onToggle } = this.props;

    const isActive = (currentStyle, value) => {
      if (value === "LINK") {
        return linkIsSelected;
      }

      return currentStyle.has(value);
    };

    return (
      <div className="rich-text-editor__controls">
        {styles.map(({ label, value }) => (
          <StyleButton
            key={value}
            ref={value}
            active={isActive(currentStyle, value)}
            label={label}
            onToggle={onToggle}
            value={value}
          />
        ))}
      </div>
    );
  },
});

export default StyleButtonGroup;
