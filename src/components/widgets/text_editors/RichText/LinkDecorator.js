/*
 * A DecoratorComponent is used by `draft-js` to render rich content
 *  beyond inline styles. This Decorator renders LINK entities.
 *
 * See
 * https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#decorator-components
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'draft-js';

const LinkDecorator = props => {
  const {url} = Entity.get(props.entityKey).getData();

  return (
    <a href={url} style={props.style}>
      {props.children}
    </a>
  );
};

LinkDecorator.propTypes = {
  entityKey: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
};

export default LinkDecorator;
