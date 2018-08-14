import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectTransformToTrace} from 'lib';
import FoldEmpty from './FoldEmpty';
import {PlotScatterIcon} from 'plotly-icons';
import {TRANSFORMABLE_TRACES} from 'lib/constants';

const TransformFold = connectTransformToTrace(PlotlyFold);

class TransformAccordion extends Component {
  render() {
    const {
      fullContainer,
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
      {label: _('Sort'), type: 'sort'},
    ];

    if (!TRANSFORMABLE_TRACES.includes(fullContainer.type)) {
      return (
        <FoldEmpty
          icon={PlotScatterIcon}
          messagePrimary={_('No transforms available for this trace type')}
        />
      );
    }

    const transformBy =
      container.transforms &&
      container.transforms.map(tr => {
        let foldNameSuffix = '';
        if (tr.groupssrc) {
          const groupssrc =
            dataSourceOptions &&
            dataSourceOptions.find(d => d.value === tr.groupssrc);
          foldNameSuffix = `: ${
            groupssrc && groupssrc.label ? groupssrc.label : tr.groupssrc
          }`;
        } else if (tr.targetsrc) {
          const targetsrc =
            dataSourceOptions &&
            dataSourceOptions.find(d => d.value === tr.targetsrc);
          foldNameSuffix = `: ${
            targetsrc && targetsrc.label ? targetsrc.label : tr.targetsrc
          }`;
        }
        return foldNameSuffix;
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
          }${transformBy && transformBy[i]}`}
          canDelete={true}
        >
          {children}
        </TransformFold>
      ));

    // cannot have 2 Split transforms on one trace:
    // https://github.com/plotly/plotly.js/issues/1742
    const addActionOptions =
      container.transforms &&
      container.transforms.some(t => t.type === 'groupby')
        ? transformTypes.filter(t => t.type !== 'groupby')
        : transformTypes;

    const addAction = {
      label: _('Transform'),
      handler: addActionOptions.map(({label, type}) => {
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
              if (type === 'filter') {
                payload.targetsrc = null;
              } else {
                payload.groupssrc = null;
                payload.groups = null;
              }

              if (type === 'groupby') {
                payload.styles = [];
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
