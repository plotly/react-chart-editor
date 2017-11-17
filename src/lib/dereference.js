import walkObject from './walkObject';

const SRC_ATTR_PATTERN = /src$/;

export default function dereference(container, dataSources) {
  const replacer = (key, parent) => {
    if (!SRC_ATTR_PATTERN.test(key)) {
      return;
    }

    const srcRef = parent[key];
    const data = dataSources[srcRef];

    if (!Array.isArray(data)) {
      throw new Error(
        `Attempted to dereference ${key} but no array data found for ${srcRef}.`
      );
    }

    const dataKey = key.replace(SRC_ATTR_PATTERN, '');
    parent[dataKey] = data;
  };

  walkObject(container, replacer, {walkArraysMatchingKeys: ['transforms']});
}
