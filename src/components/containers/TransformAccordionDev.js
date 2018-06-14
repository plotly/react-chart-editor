import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectTransformToTrace} from 'lib';

const TransformFold = connectTransformToTrace(PlotlyFold);

class TransformAccordion extends Component {
  render() {
    const {
      fullContainer: {transforms = []},
      localize: _,
      container,
      dataSourceOptions,
    } = this.context;
    const {children} = this.props;

    const transformTypes = [
      {label: _('Filter'), type: 'filter'},
      {label: _('Split'), type: 'groupby'},
      {label: _('Aggregate'), type: 'aggregate'},
    ];

    const transformBy =
      container.transforms &&
      container.transforms.map(tr => {
        let retValue = '';
        if (tr.groupssrc) {
          retValue = `: ${
            dataSourceOptions.find(d => d.value === tr.groupssrc).label
          }`;
        } else if (tr.targetsrc) {
          retValue = `: ${
            dataSourceOptions.find(d => d.value === tr.targetsrc).label
          }`;
        }
        return retValue;
      });

    const filteredTransforms = transforms.filter(({type}) => Boolean(type));
    const content =
      filteredTransforms.length &&
      filteredTransforms.map((tr, i) => (
        <TransformFold
          key={i}
          transformIndex={i}
          name={`${
            transformTypes.filter(({type}) => type === tr.type)[0].label
          }${transformBy[i]}`}
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

              const payload = {type};
              const firstDataSrouce = dataSourceOptions[0].value;
              if (type === 'filter') {
                payload.targetsrc = firstDataSrouce;
              } else {
                payload.groupssrc = firstDataSrouce;
              }

              updateContainer({[key]: payload});
            }
          },
        };
      }),
    };

    return (
      <PlotlyPanel addAction={addAction}>
        {content ? content : null}
      </PlotlyPanel>
    );
  }
}

TransformAccordion.contextTypes = {
  fullContainer: PropTypes.object,
  localize: PropTypes.func,
  container: PropTypes.object,
  dataSourceOptions: PropTypes.array,
};

TransformAccordion.propTypes = {
  children: PropTypes.node,
};

export default TransformAccordion;
