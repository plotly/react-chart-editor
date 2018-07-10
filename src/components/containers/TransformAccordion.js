import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectTransformToTrace} from 'lib';
import FoldEmpty from './FoldEmpty';
import {PlotScatterIcon} from 'plotly-icons';

const TransformFold = connectTransformToTrace(PlotlyFold);

class TransformAccordion extends Component {
  render() {
    const {
      fullContainer,
      fullContainer: {transforms = []},
      localize: _,
      container,
      dataSources,
      dataSourceOptions,
    } = this.context;
    const {children} = this.props;

    const transformTypes = [
      {label: _('Filter'), type: 'filter'},
      {label: _('Split'), type: 'groupby'},
      {label: _('Aggregate'), type: 'aggregate'},
    ];

    const transformableCharts = [
      'scatter',
      'bar',
      'scattergl',
      'histogram',
      'histogram2d',
      'box',
      'violin',
    ];

    if (!transformableCharts.includes(fullContainer.type)) {
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
              const firstDataSource = dataSourceOptions[0].value;
              if (type === 'filter') {
                payload.targetsrc = firstDataSource;
              } else {
                payload.groupssrc = firstDataSource;
                payload.groups = dataSources[firstDataSource];
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
  dataSources: PropTypes.object,
};

TransformAccordion.propTypes = {
  children: PropTypes.node,
};

export default TransformAccordion;
