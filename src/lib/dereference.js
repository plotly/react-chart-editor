import walkObject from './walkObject';
import {maybeTransposeData} from './index';

const SRC_ATTR_PATTERN = /src$/;

export default function dereference(container, dataSources, config = {deleteKeys: false}) {
  const replacer = (key, parent, srcPath) => {
    if (!SRC_ATTR_PATTERN.test(key)) {
      return;
    }

    const dataKey = key.replace(SRC_ATTR_PATTERN, '');

    let srcRef = config.toSrc ? config.toSrc(parent[key]) : parent[key];

    // making this into an array to more easily lookup 1d and 2d srcs in dataSourceOptions
    if (!Array.isArray(srcRef)) {
      srcRef = [srcRef];
    }

    let dereferencedData = srcRef.map(ref => {
      if (config.deleteKeys && !(ref in dataSources)) {
        delete parent[dataKey];
      }
      return dataSources[ref];
    });

    // remove extra data wrapping
    if (srcRef.length === 1) {
      dereferencedData = dereferencedData[0];
    }

    if (!Array.isArray(dereferencedData)) {
      return;
    }

    if (Array.isArray(container)) {
      // Case where we were originally given data to dereference
      const traceType = parent.type;
      parent[dataKey] = maybeTransposeData(dereferencedData, srcPath, traceType);
    } else {
      // This means we're dereferencing layout
      parent[dataKey] = dereferencedData;
    }
  };

  if (Array.isArray(container)) {
    walkObject(container, replacer, {
      walkArraysMatchingKeys: ['data', 'transforms'],
      pathType: 'nestedProperty',
    });
  } else {
    walkObject(container, replacer, {pathType: 'nestedProperty'});
  }
}
