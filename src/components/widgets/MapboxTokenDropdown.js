import DropdownWithTextInput from "./DropdownWithTextInput";
import Environment from "@common/utils/environment";
import React from "react";
import PropTypes from "prop-types";
import { append, compose, prepend, filter, split, head, map } from "ramda";
import { currentUserOrNull } from "@workspace/utils/customPropTypes";
import { _ } from "@common/utils/i18n";

// Get mapbox token from currentUser. Return empty array if user not logged in
function getMapboxTokens(context) {
  const { currentUser } = context;
  const tokens = currentUser.mapbox_access_tokens || [];
  if (tokens) {
    return tokens;
  }

  return [];
}

// Only public tokens work with Plotly.js mapbox chart
const filterSecretTokens = filter(token => {
  const getHead = compose(head, split("."));
  return getHead(token) === "pk";
});

const mapToOption = map(option => {
  return {
    value: option,
    label: option,
  };
});

const prependDefault = prepend({
  value: Environment.get("MAPBOX_DEFAULT_ACCESS_TOKEN"),
  label: "Plotly token",
});

export const customTokenLabel = "custom access token";
const appendCustom = append({
  value: "custom",
  label: customTokenLabel,
});

const getTokenOptions = compose(
  appendCustom,
  prependDefault,
  mapToOption,
  filterSecretTokens,
  getMapboxTokens
);

function MapboxTokenDropdown(props, context) {
  const {
    onChange,
    selectedToken = Environment.get("MAPBOX_DEFAULT_ACCESS_TOKEN"),
  } = props;

  const tokenOptions = getTokenOptions(context);

  // display inline-block is needed because:
  // http://stackoverflow.com/questions/2614091/simple-div-containing-span-wont-size-correctly

  return (
    <div className="menu-item">
      <div className="menu-item__title">{_("Mapbox Token")}</div>
      <div className="menu-item__widget">
        <span className="widget-dropdown">
          <DropdownWithTextInput
            value={selectedToken}
            options={tokenOptions}
            onUpdate={onChange}
            clearable={false}
            minWidth="125px"
          />
        </span>
      </div>
    </div>
  );
}

MapboxTokenDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedToken: PropTypes.string,
};

MapboxTokenDropdown.contextTypes = {
  currentUser: currentUserOrNull.isDefined,
};

export default MapboxTokenDropdown;
