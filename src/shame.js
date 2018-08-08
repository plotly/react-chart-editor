/*
 * DELETE THIS FILE. EVERYTHING NEEDS TO FIND A HOME.
 */
import {getFromId} from 'plotly.js/src/plots/cartesian/axis_ids';
import nestedProperty from 'plotly.js/src/lib/nested_property';

// Temporary fix for:
// https://github.com/plotly/react-chart-editor/issues/103
// We should be able to remove this once the plotly.react method has
// been integrated into react-plotly.js and released:
// https://github.com/plotly/react-plotly.js/issues/2
export const shamefullyClearAxisTypes = (graphDiv, {traceIndexes, update}) => {
  if (!Array.isArray(graphDiv._fullData)) {
    return;
  }
  let hasSrc = false;
  for (const key in update) {
    if (key.substr(key.length - 3) === 'src') {
      hasSrc = true;
    }
  }
  if (hasSrc) {
    clearAxisTypes(graphDiv, traceIndexes);
  }
};

const axLetters = ['x', 'y', 'z'];
function clearAxisTypes(gd, traces) {
  for (let i = 0; i < traces.length; i++) {
    const trace = gd._fullData[i];
    for (let j = 0; j < 3; j++) {
      const type = axLetters[j];
      const ax = getFromId(gd, trace[type + 'axis'] || type);

      // Do not clear log type.
      // Log type is never an auto result so must have been intentional.
      // We are also skipping clearing 3D which could cause bugs with 3D.
      if (ax && ax.type !== 'log') {
        const axAttr = ax._name;
        const typeAttr = axAttr + '.type';
        nestedProperty(gd.layout, typeAttr).set(null);
      }
    }
  }
}

export const shamefullyAdjustAxisRef = (graphDiv, payload) => {
  if (payload.axesToBeGarbageCollected) {
    payload.axesToBeGarbageCollected.forEach(a => {
      const axis = a.charAt(0);
      const axisIdNumber = Number(a.slice(1));

      nestedProperty(graphDiv.layout, `${axis}axis${axisIdNumber || ''}`).set(
        null
      );
      Object.keys(graphDiv.layout)
        .filter(key => key.startsWith(axis + 'axis'))
        .forEach(key => {
          if (
            nestedProperty(graphDiv.layout, `${key}.overlaying`).get() === a
          ) {
            nestedProperty(graphDiv.layout, `${key}.overlaying`).set(null);
          }
        });
    });
  }
  if (payload.subplotToBeGarbageCollected) {
    nestedProperty(graphDiv.layout, payload.subplotToBeGarbageCollected).set(
      null
    );
  }
};

const geoRegex = /^(geo\d*)\./;
export const shamefullyAdjustGeo = ({layout}, {update}) => {
  Object.keys(update).forEach(k => {
    const geoMatch = geoRegex.exec(k);
    if (geoMatch) {
      const geo = geoMatch[1];
      if (update[geo + '.scope']) {
        update[geo + '.projection'] = {};
        update[geo + '.center'] = {};
      }

      if (
        // requesting projection change
        update[geo + '.projection.type'] &&
        (update[geo + '.projection.type'] === 'albers usa' ||
          (layout[geo] && layout[geo].scope === 'usa'))
      ) {
        update[geo + '.scope'] = {};
        update[geo + '.center'] = {};
      }
    }
  });
};

export const shamefullyAddTableColumns = (graphDiv, {traceIndexes, update}) => {
  if (
    update['cells.values'] &&
    (!graphDiv.data[traceIndexes[0]].header ||
      !graphDiv.data[traceIndexes[0]].header.valuessrc)
  ) {
    update['header.values'] = update['cells.valuessrc'];
  } else if (update['header.values'] === null) {
    update['header.values'] =
      graphDiv.data[traceIndexes[0]].cells.valuessrc || null;
  } else if (
    update['cells.values'] === null &&
    !graphDiv.data[traceIndexes[0]].header.valuessrc
  ) {
    update['header.values'] = null;
  }
};

export const shamefullyCreateSplitStyles = (
  graphDiv,
  attr,
  traceIndex,
  splitTraceGroup
) => {
  if (!Array.isArray(splitTraceGroup)) {
    splitTraceGroup = [splitTraceGroup]; // eslint-disable-line
  }

  let indexOfSplitTransform = null;

  graphDiv.data[traceIndex].transforms.forEach((t, i) => {
    if (t.type === 'groupby') {
      indexOfSplitTransform = i;
    }
  });

  function getProp(group) {
    let indexOfStyleObject = null;

    graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles.forEach(
      (s, i) => {
        if (s.target.toString() === group) {
          indexOfStyleObject = i;
        }
      }
    );

    let path =
      graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles[
        indexOfStyleObject
      ].value;

    attr.split('.').forEach(p => {
      if (!path[p]) {
        path[p] = {};
      }
      path = path[p];
    });

    return nestedProperty(
      graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles[
        indexOfStyleObject
      ].value,
      attr
    );
  }

  return splitTraceGroup.map(g => getProp(g));
};
