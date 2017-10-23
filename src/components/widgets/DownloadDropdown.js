import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import getFeatureValue, { getFeatureSetByID } from "@common/utils/features";
import { currentUserOrNull } from "@workspace/utils/customPropTypes";

class DownloadDropdown extends Component {
  renderAllowedExportTypes(allowedExportTypes = [], graphURLBase) {
    const downloadItemClass = classnames(
      "dropdown-menu-item",
      "--product-pages",
      "--brand-blue-hover"
    );

    return allowedExportTypes.map((format, index) => {
      const url = `${graphURLBase}.${format}`;
      const formatUpper = format.toUpperCase();
      return (
        <a target="_blank" className={downloadItemClass} href={url} key={index}>
          {formatUpper}
        </a>
      );
    });
  }

  renderRestrictedExportTypes(restrictedExportTypes = []) {
    const downloadItemClassMuted = "dropdown-menu-item-restricted";

    return restrictedExportTypes.map((format, index) => {
      const formatUpper = format.toUpperCase();
      return (
        <a target="_blank" className={downloadItemClassMuted} key={index}>
          {formatUpper}
        </a>
      );
    });
  }

  render() {
    const { graphURLBase, currentUser, shareKey } = this.props;
    const feature_set = currentUser ? currentUser.feature_set_id : null;
    let restrictedExportTypes;

    const fullFeatureSet = getFeatureSetByID("full");
    const allExportTypes = fullFeatureSet.file_export_types.value;

    const allowedExportTypes = getFeatureValue(
      feature_set,
      "file_export_types"
    );

    if (allExportTypes && allowedExportTypes) {
      restrictedExportTypes = allExportTypes.filter(
        exportType => !allowedExportTypes.includes(exportType)
      );
    }

    const downloadItemClass = classnames(
      "dropdown-menu-item",
      "--product-pages",
      "--brand-blue-hover"
    );

    const containerClass = classnames(
      "dropdown-menu",
      "--feed-download-menu",
      "--product-pages",
      "--atright"
    );

    return (
      <div className={containerClass}>
        <div className="dropdown-menu-triangle --grey-menu-triangle +no-right" />

        <span className="dropdown-menu-title">Download Image</span>
        {this.renderAllowedExportTypes(allowedExportTypes, graphURLBase)}
        {this.renderRestrictedExportTypes(restrictedExportTypes)}
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("embed", graphURLBase, shareKey)}
        >
          {"Full-screen"}
        </a>

        <span className="dropdown-menu-title">Download Data</span>

        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("csv", graphURLBase, shareKey)}
        >
          {"CSV"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("xlsx", graphURLBase, shareKey)}
        >
          {"Excel (xlsx)"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href="https://store.office.com/plotly-charts-WA104379485.aspx?assetid=WA104379485"
        >
          {"PowerPoint"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("json", graphURLBase, shareKey)}
        >
          {"JSON"}
        </a>

        <span className="dropdown-menu-title">Download Code</span>

        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("py", graphURLBase, shareKey)}
        >
          {"Python"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("m", graphURLBase, shareKey)}
        >
          {"MATLAB"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("r", graphURLBase, shareKey)}
        >
          {"R"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("js", graphURLBase, shareKey)}
        >
          {"plotly.js"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("nodejs", graphURLBase, shareKey)}
        >
          {"node.js"}
        </a>
        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("jl", graphURLBase, shareKey)}
        >
          {"Julia"}
        </a>

        <span className="dropdown-menu-title">Download HTML</span>

        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("zip", graphURLBase, shareKey)}
        >
          {"Zip archive"}
        </a>

        <a
          target="_blank"
          className={downloadItemClass}
          href={exportUrl("download", graphURLBase, shareKey)}
        >
          {"HTML"}
        </a>
      </div>
    );
  }
}

DownloadDropdown.propTypes = {
  graphURLBase: PropTypes.string.isRequired,
  currentUser: currentUserOrNull,
  shareKey: PropTypes.string,
};

function exportUrl(ext, base, shareKey) {
  let url = `${base}.${ext}`;

  if (shareKey) {
    url += `?share_key=${shareKey}`;
  }

  return url;
}

export default DownloadDropdown;
