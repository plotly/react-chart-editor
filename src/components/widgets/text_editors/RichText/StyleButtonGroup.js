import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';
import StyleButton from './StyleButton';
import {LINK} from './configuration';

class StyleButtonGroup extends Component {
  render() {
    const {currentStyle, linkIsSelected, styles, onToggle} = this.props;

    const isActive = (currentStyle, value) => {
      if (value === LINK) {
        return linkIsSelected;
      }

      return currentStyle.has(value);
    };

    return (
      <div className="rich-text-editor__controls">
        {styles.map(({label, value}) => (
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
  }
}

StyleButtonGroup.propTypes = {
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
  linkIsSelected: PropTypes.bool,
};

StyleButtonGroup.defaultProps = {
  currentStyle: new Immutable.OrderedSet(),
};

export default StyleButtonGroup;
