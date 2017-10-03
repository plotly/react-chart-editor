import Dropdown from "./Dropdown";
import ImmutablePropTypes from "react-immutable-proptypes";
import React, { Component } from "react";
import PropTypes from "prop-types";
import connectWorkspaceSheets from "@workspace/utils/connectWorkspaceSheets";
import { difference, is, isEmpty, isNil, map } from "ramda";
import { connect } from "react-redux";
import { COL_REF_TYPES } from "@workspace/constants/files";
import { stringOrNull } from "@workspace/utils/customPropTypes";
import { joinSrcs, parseColRef, parseSrc } from "@workspace/utils/regexps";

export const TEST_SELECTOR_CLASS = "js-SelectColumn";

export class UnconnectedSelectColumn extends Component {
  constructor(props) {
    super(props);
    this.isConsistent = this.isConsistent.bind(this);
    this.onColumnSelection = this.onColumnSelection.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  onColumnSelection(newOption) {
    const { multi, multiTable, onColumnSelection } = this.props;
    if (multi) {
      if (multiTable) {
        onColumnSelection(isEmpty(newOption || []) ? null : newOption);
      } else {
        // newOption can be `undefined` or an array.
        const srcString = joinSrcs(newOption || []);
        onColumnSelection(srcString ? srcString : null);
      }
    } else {
      onColumnSelection(newOption);
    }
  }

  getOptions() {
    const {
      columnMeta,
      multi,
      multiTable,
      selectedColumnId: selection,
      tables,
      tableIds,
    } = this.props;

    // If multiTable is true, selection is an array of columnIds.
    const restrictOptions = !multiTable && multi && selection;
    const fid = restrictOptions ? parseSrc(selection).fid : null;

    return tables.reduce((options, table, tableId) => {
      const index = tableIds.indexOf(tableId);

      if (restrictOptions) {
        // Only allow new selections to match currently-selected table.
        if (fid !== tableId) {
          return options;
        }
      }

      // This is just a label, which is why it's always disabled.
      options.push({ disabled: true, label: `Grid ${index + 1}` });

      // These are the select-able options.
      const columnIds = table.get("columnIds");
      columnIds.forEach(columnId => {
        const label = columnMeta.getIn([columnId, "name"]);
        options.push({ label, value: columnId });
      });

      return options;
    }, []);
  }

  getValue() {
    const {
      multi,
      multiTable,
      tables,
      selectedColumnId: selection,
    } = this.props;

    // If we're not in multi-mode, we return the string we're given.
    if (!multi) {
      return selection;
    }

    // We're in multi-mode, but be consistent undefined, null, '', & [].
    if (isEmpty(selection || [])) {
      return null;
    }

    // If we're in multiTable-mode, just return the array we have.
    if (multiTable) {
      return selection;
    }

    // For everything else, we need to parse the src to return an array.
    const { colRef, fid } = parseSrc(selection);
    const { type, uids = [] } = parseColRef(colRef);
    const table = tables.find(value => value.get("fid") === fid);
    const allColumnIds = table.get("columnIds").toJS();
    const referencedColumnIds = map(uid => `${fid}:${uid}`, uids);

    switch (type) {
      case COL_REF_TYPES.EXCLUDE:
        return difference(allColumnIds, referencedColumnIds);
      case COL_REF_TYPES.SINGLE:
      case COL_REF_TYPES.INCLUDE:
        return referencedColumnIds;
      case COL_REF_TYPES.ALL:
        return allColumnIds;
      default:
        throw new Error("Unknown colRef type in SelectColumn.");
    }
  }

  isConsistent(selection, tables) {
    /*
         * This is really tricky, we need the props from our parent component
         * (selectedSrc) to be consistent with props from connect (tables).
         * Shockingly, we can't depend on this being synchronous.
         */

    if (isNil(selection) || isEmpty(selection)) {
      // Nothing to cross-check with, we're A-OK.
      return true;
    }

    /*
         * We return false if the connected 'tables' doesn't match passed-down
         * 'selectedSrc'. Note that there's also a potential problem with the
         * uids in the `selectedSrc`, however, this doesn't lead to bad render
         * cycles and it's hard to tell if the given `selectedSrc` was just bad
         * from the beginning or if it's just a temporary inconsistency due to
         * a race condition.
         */
    const srcs = is(Array, selection) ? selection : [selection];
    for (const src of srcs) {
      const { fid } = parseSrc(src);
      const table = tables.find(value => value.get("fid") === fid);
      if (!table) {
        return false;
      }
    }
    return true;
  }

  shouldComponentUpdate(nextProps) {
    // TODO: Tricky issue with connected leaf components. See #7517
    const { selectedColumnId: selection, tables } = nextProps;
    return this.isConsistent(selection, tables);
  }

  render() {
    const { label, minWidth, multi, placeholder } = this.props;
    const options = this.getOptions();
    const value = this.getValue();

    return (
      <span className="widget-dropdown">
        <Dropdown
          className={`${TEST_SELECTOR_CLASS}-${label}`}
          options={options}
          value={value}
          searchable={true}
          placeholder={placeholder}
          onChange={this.onColumnSelection}
          clearable={true}
          minWidth={minWidth}
          multi={multi}
          width={"100%"}
        />
      </span>
    );
  }
}

UnconnectedSelectColumn.propTypes = {
  // Props from parent component.
  onColumnSelection: PropTypes.func.isRequired,
  selectedColumnId: PropTypes.oneOfType([stringOrNull, PropTypes.array]),
  placeholder: PropTypes.string,
  minWidth: PropTypes.string,
  multi: PropTypes.bool,
  multiTable: PropTypes.bool,
  label: PropTypes.string,

  // Props from connect.
  columnMeta: ImmutablePropTypes.map,
  tables: ImmutablePropTypes.map,
  tableIds: ImmutablePropTypes.list,
};

UnconnectedSelectColumn.defaultProps = {
  placeholder: "",
  clearable: true,
  multi: false,
  multiTable: false,
  label: "",
};

const mapStateToProps = state => {
  const { columnMeta, tables, tableIds } = state.workspace;
  return { columnMeta, tables, tableIds };
};

const SelectColumn = connect(mapStateToProps)(
  connectWorkspaceSheets(null, true)(UnconnectedSelectColumn)
);

export default SelectColumn;
