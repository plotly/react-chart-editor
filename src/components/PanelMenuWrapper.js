import React, {cloneElement, Component} from 'react';
import {bem, localize} from '../lib';
import ModeMenuSection from './ModeMenuSection';

class PanelsWithModeMenu extends Component {
  constructor(props) {
    super(props);

    var opts = this.computeMenuOptions(props);

    this.state = {
      section: opts[0].name,
      panel: opts[0].panels[0],
    };

    this.setPanel = this.setPanel.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }

  setPanel(section, panel) {
    this.setState({section, panel});
  }

  renderSection(section, i) {
    return (
      <ModeMenuSection
        key={i}
        selectedSection={this.state.section}
        selectedPanel={this.state.panel}
        section={section.name}
        panels={section.panels}
        onChangeSection={this.setPanel}
      />
    );
  }

  computeMenuOptions(props) {
    var obj, child, section, name;
    var children = props.children;
    var sectionLookup = {};
    var sectionIndex;
    var sections = [];
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      section = child.props.section;
      name = child.props.name;

      if (sectionLookup.hasOwnProperty(section)) {
        sectionIndex = sectionLookup[section];
        obj = sections[sectionIndex];
      } else {
        sectionLookup[section] = sections.length;
        obj = {name: section, panels: []};
        sections.push(obj);
      }

      obj.panels.push(name);
    }

    return sections;
  }

  render() {
    var menuOpts = this.computeMenuOptions(this.props);

    return (
      <div>
        <div className={bem('mode-menu')}>
          {menuOpts.map(this.renderSection)}
        </div>

        {this.props.children.map((child, i) =>
          cloneElement(child, {
            key: i,
            visible:
              this.state.section === child.props.section &&
              this.state.panel === child.props.name,
          })
        )}
      </div>
    );
  }
}

export default localize(PanelsWithModeMenu);
