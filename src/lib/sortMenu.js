function getUniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

function sortAlphabetically(a, b) {
  const sortByGroup = a.props.group === b.props.group ? 0 : a.props.group < b.props.group ? -1 : 1;
  const sortByName = a.props.name === b.props.name ? 0 : a.props.name < b.props.name ? -1 : 1;
  return sortByGroup || sortByName;
}

export default function sortMenu(children, order) {
  // PART 1: only sorting panels (i.e. child with a group and name prop)
  // and not other elements (like Buttons, or Logo)
  let panelsStartIndex = null;
  let panelsEndIndex = null;
  for (let i = 0; i < children.length; i++) {
    if (children[i].props.group && children[i].props.name && !panelsStartIndex) {
      panelsStartIndex = i;
      break;
    }
  }
  for (let i = panelsStartIndex; i < children.length; i++) {
    if (!children[i].props.group && !children[i].props.name && !panelsEndIndex) {
      panelsEndIndex = i - 1;
      break;
    } else if (i === children.length - 1) {
      panelsEndIndex = i;
    }
  }

  const prePanelsChildren = panelsStartIndex === 0 ? [] : children.slice(0, panelsStartIndex);
  const panels =
    panelsStartIndex !== panelsEndIndex ? children.slice(panelsStartIndex, panelsEndIndex + 1) : [];
  const postPanelsChildren =
    panelsEndIndex === children.length ? [] : children.slice(panelsEndIndex + 1);

  // PART 2: validate order prop, if a desired panel specified in order, matches no actual panel rendered
  // in the panels array, it is excluded from ordering considerations
  // eslint-disable-next-line
  order = order.filter(desiredPanel =>
    panels.some(
      actualPanel =>
        actualPanel.props.name === desiredPanel.name &&
        actualPanel.props.group === desiredPanel.group
    )
  );

  const desiredGroupOrder = order.map(panel => panel.group).filter(getUniqueValues);

  // PART 3: Sort panels
  panels.sort((a, b) => {
    const panelAHasGroupCustomOrder = desiredGroupOrder.includes(a.props.group);
    const panelBHasGroupCustomOrder = desiredGroupOrder.includes(b.props.group);

    // if one of the elements is not in the desiredGroupOrder array, then it goes to the end of the list
    if (panelAHasGroupCustomOrder && !panelBHasGroupCustomOrder) {
      return -1;
    }
    if (!panelAHasGroupCustomOrder && panelBHasGroupCustomOrder) {
      return 1;
    }

    // if both elements are not in the desiredGroupOrder array, they get sorted alphabetically,
    // by group, then by name
    if (!panelAHasGroupCustomOrder && !panelBHasGroupCustomOrder) {
      return sortAlphabetically(a, b);
    }

    // if both elements are in the desiredGroupOrder array, they get sorted according to their order in
    // the desiredGroupOrder, then desiredNameOrder arrays.
    if (panelAHasGroupCustomOrder && panelBHasGroupCustomOrder) {
      const indexOfGroupA = desiredGroupOrder.indexOf(a.props.group);
      const indexOfGroupB = desiredGroupOrder.indexOf(b.props.group);

      if (indexOfGroupA < indexOfGroupB) {
        return -1;
      }

      if (indexOfGroupA > indexOfGroupB) {
        return 1;
      }

      if (indexOfGroupA === indexOfGroupB) {
        // Since Subpanels names can be reused in different groups
        // we compute desired order here to get the desired index right.
        // We are filtering on unique values, just in case, even if we don't
        // have to because within a given group we'd assume that there will be
        // no 2 subpanels named the same.
        const desiredNameOrder = order
          .filter(panel => panel.group === a.props.group)
          .map(panel => panel.name)
          .filter(getUniqueValues);

        const panelAHasNameCustomOrder = desiredNameOrder.includes(a.props.name);
        const panelBHasNameCustomOrder = desiredNameOrder.includes(b.props.name);

        if (!panelAHasNameCustomOrder || !panelBHasNameCustomOrder) {
          if (panelAHasNameCustomOrder && !panelBHasNameCustomOrder) {
            return -1;
          }
          if (!panelAHasNameCustomOrder && panelBHasNameCustomOrder) {
            return 1;
          }
          if (!panelAHasNameCustomOrder && !panelBHasNameCustomOrder) {
            return sortAlphabetically(a, b);
          }
        }

        if (panelAHasNameCustomOrder && panelBHasNameCustomOrder) {
          return desiredNameOrder.indexOf(a.props.name) - desiredNameOrder.indexOf(b.props.name);
        }
      }
    }
    return 0;
  });

  // PART 4: Return all children
  return prePanelsChildren.concat(panels).concat(postPanelsChildren);
}
