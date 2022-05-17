import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connectUpdateMenuToLayout} from 'lib';

const UpdateMenuFold = connectUpdateMenuToLayout(PlotlyFold);

class UpdateMenuAccordion extends Component {
  render() {
    const {
      fullLayout: {updatemenus = []},
      localize: _,
    } = this.context;
    const {children} = this.props;

    const content =
      updatemenus.length > 0 &&
      updatemenus.map((upd, i) => {
        const localizedType = {
          dropdown: _('Dropdown'),
          buttons: _('Buttons'),
        };
        const menuType = localizedType[upd.type] || localizedType.dropdown;
        const activeBtn = upd.buttons.filter((b) => b._index === upd.active)[0];
        const foldName = menuType + (activeBtn ? ': ' + activeBtn.label : '');

        return (
          <UpdateMenuFold key={i} updateMenuIndex={i} name={foldName}>
            {children}
          </UpdateMenuFold>
        );
      });

    return <TraceRequiredPanel>{content ? content : null}</TraceRequiredPanel>;
  }
}

UpdateMenuAccordion.contextTypes = {
  fullLayout: PropTypes.object,
  localize: PropTypes.func,
};

UpdateMenuAccordion.propTypes = {
  children: PropTypes.node,
};

export default UpdateMenuAccordion;
