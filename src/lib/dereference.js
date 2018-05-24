import walkObject from './walkObject';
import {maybeTransposeData} from './index';

const SRC_ATTR_PATTERN = /src$/;

export default function dereference(
  container,
  dataSources,
  config = {deleteKeys: false}
) {
  const replacer = (key, parent, srcPath) => {
    if (!SRC_ATTR_PATTERN.test(key)) {
      return;
    }

    const dataKey = key.replace(SRC_ATTR_PATTERN, '');
    const traceType = parent.type;

    // making this into an array to more easily lookup 1d and 2d srcs in dataSourceOptions
    const srcRef = config.splitSrcs
      ? config.splitSrcs(parent[key])
      : Array.isArray(parent[key])
        ? parent[key]
        : [parent[key]];

    let data = srcRef.map(ref => {
      if (config.deleteKeys && !(ref in dataSources)) {
        delete parent[dataKey];
      }
      return dataSources[ref];
    });

    // remove extra data wrapping
    if (srcRef.length === 1) {
      data = data[0];
    }

    if (!Array.isArray(data)) {
      return;
    }

    parent[dataKey] = maybeTransposeData(data, srcPath, traceType);
  };

  walkObject(container, replacer, {
    walkArraysMatchingKeys: ['data', 'transforms'],
    pathType: 'nestedProperty',
  });
}
