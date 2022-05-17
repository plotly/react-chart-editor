import Drop from '../widgets/Dropzone';
import Field from './Field';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectToContainer} from 'lib';

export class UnconnectedDropzone extends Component {
  render() {
    return (
      <Field {...this.props}>
        <Drop
          value={this.props.fullValue}
          onUpdate={this.props.updatePlot}
          fileType={this.props.fileType}
        />
      </Field>
    );
  }
}

UnconnectedDropzone.propTypes = {
  value: PropTypes.any,
  onUpdate: PropTypes.func,
  ...Field.propTypes,
};

UnconnectedDropzone.displayName = 'UnconnectedDropzone';

function modifyPlotProps(props, context, plotProps) {
  if (context.container.type === 'choroplethmapbox' || context.container.type === 'choropleth') {
    plotProps.isVisible = true;
  }
}

export default connectToContainer(UnconnectedDropzone, {modifyPlotProps});
