import {Component} from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import {LINK} from './configuration';

class StyleButtonGroup extends Component {
  render() {
    const {currentStyle, linkIsSelected, styles, onToggle} = this.props;

    const isActive = (currentStyle, value) => {
      if (value === LINK) {
        return linkIsSelected;
      }

      if (typeof currentStyle.has === 'function') {
        return currentStyle.has(value);
      }

      return Boolean(currentStyle.value);
    };

    return (
      <div className="rich-text-editor__controls">
        {styles.map(({label, value}) => (
          <StyleButton
            key={value}
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
  currentStyle: PropTypes.object,
  linkIsSelected: PropTypes.bool,
};

export default StyleButtonGroup;
