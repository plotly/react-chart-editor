function getUniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

function sortAlphabetically(a, b) {
  const sortByGroup = a.props.group === b.props.group ? 0 : a.props.group < b.props.group ? -1 : 1;
  const sortByName = a.props.name === b.props.name ? 0 : a.props.name < b.props.name ? -1 : 1;
  return sortByGroup || sortByName;
}

export default function sortMenu(panels, order) {
  // validates order, if a desired panel matches no panel in the panels array,
  // it is excluded from ordering considerations

  // eslint-disable-next-line
  order = order.filter(desiredPanel =>
    panels.some(
      actualPanel =>
        actualPanel.props.name === desiredPanel.name &&
        actualPanel.props.group === desiredPanel.group
    )
  );

  const desiredGroupOrder = order.map(panel => panel.group).filter(getUniqueValues);
  const desiredNameOrder = order.map(panel => panel.name).filter(getUniqueValues);

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
}
