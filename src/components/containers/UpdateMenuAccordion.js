import PlotlyFold from './PlotlyFold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectUpdateMenuToLayout} from 'lib';

const UpdateMenuFold = connectUpdateMenuToLayout(PlotlyFold);

class UpdateMenuAccordion extends Component {
  render() {
    const {layout: {updatemenus = []}, localize: _} = this.context;
    const {children} = this.props;

    const content =
      updatemenus.length > 0 &&
      updatemenus.map((upd, i) => {
        const localizedType = {
          dropdown: _('Dropdown'),
          buttons: _('Buttons'),
        };
        const updateMenuType =
          localizedType[upd.type] || localizedType.dropdown;
        const activeElementLabel = upd.buttons.filter(
          b => b.index === upd.active
        )[0].label;

        return (
          <UpdateMenuFold
            key={i}
            updateMenuIndex={i}
            name={updateMenuType + ': ' + activeElementLabel}
          >
            {children}
          </UpdateMenuFold>
        );
      });

    return (
      <TraceRequiredPanel
        extraConditions={[() => updatemenus.length > 0]}
        extraEmptyPanelMessages={[
          {
            heading: _('There are no update menus to style in your plot'),
            message: '',
          },
        ]}
      >
        {content ? content : null}
      </TraceRequiredPanel>
    );
  }
}

UpdateMenuAccordion.contextTypes = {
  layout: PropTypes.object,
  localize: PropTypes.func,
};

UpdateMenuAccordion.propTypes = {
  children: PropTypes.node,
};

export default UpdateMenuAccordion;
