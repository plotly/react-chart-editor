import PlotlyFold from './PlotlyFold';
import PlotlyPanel from './PlotlyPanel';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectTransformToTrace} from 'lib';
import {PanelMessage} from './PanelEmpty';

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
      {label: _('Sort'), type: 'sort'},
    ];

    const transformBy =
      container.transforms &&
      container.transforms.map((tr) => {
        let foldNameSuffix = '';
        if (tr.groupssrc) {
          const groupssrc =
            dataSourceOptions && dataSourceOptions.find((d) => d.value === tr.groupssrc);
          foldNameSuffix = `: ${groupssrc && groupssrc.label ? groupssrc.label : tr.groupssrc}`;
        } else if (tr.targetsrc) {
          const targetsrc =
            dataSourceOptions && dataSourceOptions.find((d) => d.value === tr.targetsrc);
          foldNameSuffix = `: ${targetsrc && targetsrc.label ? targetsrc.label : tr.targetsrc}`;
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
          name={`${transformTypes.filter(({type}) => type === tr.type)[0].label}${
            transformBy && transformBy[i]
          }`}
          canDelete={true}
        >
          {children}
        </TransformFold>
      ));

    // cannot have 2 Split transforms on one trace:
    // https://github.com/plotly/plotly.js/issues/1742
    const addActionOptions =
      container.transforms && container.transforms.some((t) => t.type === 'groupby')
        ? transformTypes.filter((t) => t.type !== 'groupby')
        : transformTypes;

    const addAction = {
      label: _('Transform'),
      handler: addActionOptions.map(({label, type}) => {
        return {
          label,
          handler: (context) => {
            const {fullContainer, updateContainer} = context;
            if (updateContainer) {
              const transformIndex = Array.isArray(fullContainer.transforms)
                ? fullContainer.transforms.length
                : 0;
              const key = `transforms[${transformIndex}]`;

              const payload = {type};
              if (type === 'filter') {
                payload.target = [];
                payload.targetsrc = null;
              } else if (type !== 'sort') {
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
        {content ? (
          content
        ) : (
          <PanelMessage icon={null}>
            <div style={{textAlign: 'left'}}>
              <p>
                <strong>{_('Filter')}</strong>{' '}
                {_(' transforms allow you to filter data out from a trace.')}
              </p>
              <p>
                <strong>{_('Split')}</strong>{' '}
                {_(
                  ' transforms allow you to create multiple traces from one source trace, so as to style them differently.'
                )}
              </p>
              <p>
                <strong>{_('Aggregate')}</strong>{' '}
                {_(
                  ' transforms allow you to summarize a trace using an aggregate function like "average" or "minimum".'
                )}
              </p>
              <p>
                <strong>{_('Sort')}</strong>{' '}
                {_(
                  ' transforms allow you to sort a trace, so as to control marker overlay or line connection order.'
                )}
              </p>
            </div>
            <p>{_('Click on the + button above to add a transform.')}</p>
          </PanelMessage>
        )}
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
