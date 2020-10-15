/*
 * A DecoratorComponent is used by `draft-js` to render rich content
 *  beyond inline styles. This Decorator renders LINK entities.
 *
 * See
 * https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#decorator-components
 */

import PropTypes from 'prop-types';

const LinkDecorator = (props) => {
  return (
    <a href="#" style={props.style}>
      {props.children}
    </a>
  );
};

LinkDecorator.propTypes = {
  style: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
};

export default LinkDecorator;
