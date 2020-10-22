import PropTypes from 'prop-types';
import TextArea from '../TextArea';

class HTML extends TextArea {
  render() {
    const {className} = this.props;
    const editorClassNames = className ? className : 'text-editor__html';
    return (
      <textarea
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        className={editorClassNames}
      />
    );
  }
}

HTML.propTypes = {
  className: PropTypes.string,
};

HTML.defaultProps = {
  placeholder: '',
};

export default HTML;
