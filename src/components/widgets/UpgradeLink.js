import Environment from "@common/utils/environment";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { DEFAULTS } from "@settings/constants/subscription";
import { MODAL_TYPES } from "@common/constants/modal";
import { _ } from "@common/utils/i18n";
import { find, merge, propEq } from "ramda";
import { openModal } from "@common/actions/modal";
import { requireAuthActionWrapper } from "@common/actions/requireAuthActionWrapper";

export default class UpgradeLink extends Component {
  render() {
    const {
      dispatch,
      featureSetId,
      trackingProperties,
      onSuccessfulUpgradeAction,
    } = this.props;

    const PLANS = Environment.get("PLANS");
    const plan = find(propEq("featureSetId", featureSetId), PLANS);

    const updatedTrackingProperties = merge(trackingProperties, {
      plan: plan.featureSetId,
      isSettingsApp: false,
    });

    const handleUpgradeLink = () =>
      dispatch(
        requireAuthActionWrapper(
          openModal(MODAL_TYPES.SUBSCRIPTION, {
            plan,
            initialBillingFrequency: DEFAULTS.BILLING_FREQUENCY,
            trackingProperties: updatedTrackingProperties,
            onSuccessfulUpgradeAction,
          })
        )
      );

    const className = classnames(
      "+upgrade-cta",
      "+uppercase",
      "+weight-semibold",
      "+font-size-m"
    );
    /* eslint-disable no-script-url */
    return (
      <a href="javascript:;" className={className} onClick={handleUpgradeLink}>
        {_("Upgrade")}
      </a>
    );
    /* eslint-enable no-script-url */
  }
}

UpgradeLink.defaultProps = {
  featureSetId: DEFAULTS.FEATURE_SET_ID,
};

UpgradeLink.propTypes = {
  dispatch: PropTypes.func.isRequired,
  featureSetId: PropTypes.string,
  trackingProperties: PropTypes.object.isRequired,
  onSuccessfulUpgradeAction: PropTypes.func,
};
