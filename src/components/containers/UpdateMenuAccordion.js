import Fold from './Fold';
import TraceRequiredPanel from './TraceRequiredPanel';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connectUpdateMenuToLayout, localize} from 'lib';

const UpdateMenuFold = connectUpdateMenuToLayout(Fold);

class UpdateMenuAccordion extends Component {
  render() {
    const {layout: {updatemenus = []}} = this.context;
    const {children, localize: _} = this.props;

    const content =
      updatemenus.length > 0 &&
      updatemenus.map((sli, i) => (
        <UpdateMenuFold
          key={i}
          updateMenuIndex={i}
          name={_('Update Menu') + ` ${i + 1}`}
        >
          {children}
        </UpdateMenuFold>
      ));

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
};

UpdateMenuAccordion.propTypes = {
  children: PropTypes.node,
  localize: PropTypes.func,
};

export default localize(UpdateMenuAccordion);
