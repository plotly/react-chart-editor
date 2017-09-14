import React, { Component } from "react";
import PropTypes from "prop-types";
import SymbolSelector from "./SymbolSelector";
import { eqProps, allPass } from "ramda";

export default class SymbolSelectorStatefulWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOption: props.activeOption || "circle",
      symbolColor: props.symbolColor,
      isOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeSymbol = this.changeSymbol.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const shouldNotUpdate = allPass(
      eqProps("activeOption", nextProps, this.state),
      eqProps("symbolColor", nextProps, this.state)
    );

    if (!shouldNotUpdate) {
      this.setState({
        activeOption: nextProps.activeOption,
        symbolColor: nextProps.symbolColor,
      });
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeMenu);
  }

  closeMenu(e) {
    this.setState({ isOpen: false });
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  changeSymbol(newSymbol) {
    this.setState({ activeOption: newSymbol });
    this.props.onChange(newSymbol);
  }

  render() {
    return (
      <SymbolSelector
        activeOption={this.state.activeOption}
        toggleMenu={this.toggleMenu}
        changeSymbol={this.changeSymbol}
        symbolColor={this.props.symbolColor}
        isOpen={this.state.isOpen}
        is3D={this.props.is3D}
        borderColor={this.props.borderColor}
        traceType={this.props.traceType}
      />
    );
  }
}

SymbolSelectorStatefulWrapper.propTypes = {
  activeOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  symbolColor: PropTypes.string.isRequired,
  is3D: React.PropTypes.bool,
  borderColor: React.PropTypes.string,
  traceType: React.PropTypes.string,
};
