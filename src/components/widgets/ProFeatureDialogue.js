import ProBadge from "./ProBadge";
import PropTypes from "prop-types";
import React from "react";
import UpgradeLink from "./UpgradeLink";
import { _ } from "@common/utils/i18n";

const ProFeatureDialogue = ({ trackingProperties, dispatch }) => {
  return (
    <div className="js-notification-text">
      <div className="pro-feature-dialogue__title">
        {_("We noticed you're using Pro features...")}
      </div>

      <div className="pro-feature-dialogue__text">
        {_("Pro features are marked with a")}
        <ProBadge className="--inline-margin" />
        {_("badge")}
      </div>

      <div className="pro-feature-dialogue__text">
        {_(
          "You can create charts using these, however you will " +
            "not be able to save your charts unless you "
        )}
        <UpgradeLink
          trackingProperties={trackingProperties}
          dispatch={dispatch}
        />
        {_(" or use the free options.")}
      </div>
    </div>
  );
};

ProFeatureDialogue.propTypes = {
  trackingProperties: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ProFeatureDialogue;
