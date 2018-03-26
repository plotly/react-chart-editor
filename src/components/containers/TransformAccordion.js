import Fold from './Fold';
import Panel from './Panel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectTransformToTrace, localize} from 'lib';

const TransformFold = connectTransformToTrace(Fold);

class TransformAccordion extends Component {
  render() {
    const {fullContainer: {transforms = []}} = this.context;
    const {children, localize: _} = this.props;

    const transformTypes = [
      {label: _('Filter'), type: 'filter'},
      {label: _('Split'), type: 'groupby'},
      {label: _('Aggregate'), type: 'aggregate'},
    ];

    const filteredTransforms = transforms.filter(({type}) => Boolean(type));
    const content =
      filteredTransforms.length &&
      filteredTransforms.map((tr, i) => (
        <TransformFold
          key={i}
          transformIndex={i}
          name={transformTypes.filter(({type}) => type === tr.type)[0].label}
          canDelete={true}
        >
          {children}
        </TransformFold>
      ));

    const addAction = {
      label: _('Transform'),
      handler: transformTypes.map(({label, type}) => {
        return {
          label,
          handler: context => {
            const {fullContainer, updateContainer} = context;
            if (updateContainer) {
              const transformIndex = Array.isArray(fullContainer.transforms)
                ? fullContainer.transforms.length
                : 0;
              const key = `transforms[${transformIndex}]`;
              updateContainer({[key]: {type}});
            }
          },
        };
      }),
    };

    return <Panel addAction={addAction}>{content ? content : null}</Panel>;
  }
}

TransformAccordion.contextTypes = {
  fullContainer: PropTypes.object,
};

TransformAccordion.propTypes = {
  children: PropTypes.node,
  localize: PropTypes.func,
};

export default localize(TransformAccordion);
