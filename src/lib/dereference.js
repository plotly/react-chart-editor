import walkObject from './walkObject';

const SRC_ATTR_PATTERN = /src$/;

export default function dereference(container, dataSources, config = {deleteKeys: false}) {
  const replacer = (key, parent) => {
    if (!SRC_ATTR_PATTERN.test(key)) {
      return;
    }

    const srcRef = parent[key];
    const data = dataSources[srcRef];
    const dataKey = key.replace(SRC_ATTR_PATTERN, '');

    if (config.deleteKeys && !(srcRef in dataSources)) {
      delete parent[dataKey];
      return;
    }

    if (!Array.isArray(data)) {
      return;
    }

    parent[dataKey] = data;
  };

  walkObject(container, replacer, {
    walkArraysMatchingKeys: ['data', 'transforms'],
  });
}
