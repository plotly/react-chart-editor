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
    payload.axesToBeGarbageCollected.forEach((a) => {
      const axis = a.charAt(0);
      const axisIdNumber = Number(a.slice(1));

      nestedProperty(graphDiv.layout, `${axis}axis${axisIdNumber || ''}`).set(null);
      Object.keys(graphDiv.layout)
        .filter((key) => key.startsWith(axis + 'axis'))
        .forEach((key) => {
          if (nestedProperty(graphDiv.layout, `${key}.overlaying`).get() === a) {
            nestedProperty(graphDiv.layout, `${key}.overlaying`).set(null);
          }
        });
    });
  }
  if (payload.subplotToBeGarbageCollected) {
    nestedProperty(graphDiv.layout, payload.subplotToBeGarbageCollected).set(null);
  }
};

const geoRegex = /^(geo\d*)\./;
export const shamefullyAdjustGeo = ({layout}, {update}) => {
  Object.keys(update).forEach((k) => {
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

export const shamefullyAdjustMapbox = (gd) => {
  if (gd.layout && gd.layout.mapbox && gd.layout.mapbox.style) {
    return;
  }
  nestedProperty(gd.layout, 'mapbox.style').set('open-street-map');
};

export const shamefullyAddTableColumns = (graphDiv, {traceIndexes, update}) => {
  if (
    update['cells.values'] &&
    (!graphDiv.data[traceIndexes[0]].header || !graphDiv.data[traceIndexes[0]].header.valuessrc)
  ) {
    update['header.values'] = update['cells.valuessrc'];
  } else if (update['header.values'] === null) {
    update['header.values'] = graphDiv.data[traceIndexes[0]].cells.valuessrc || null;
  } else if (update['cells.values'] === null && !graphDiv.data[traceIndexes[0]].header.valuessrc) {
    update['header.values'] = null;
  }
};

export const shamefullyAdjustSplitStyleTargetContainers = (graphDiv, {traceIndexes, update}) => {
  for (const attr in update) {
    if (attr && attr.startsWith('transforms') && attr.endsWith('groups')) {
      const transformIndex = parseInt(attr.split('[')[1], 10);
      const transform = graphDiv.data[traceIndexes[0]].transforms[transformIndex];

      if (transform && transform.type === 'groupby' && transform.styles) {
        // Create style containers for all groups
        if (!transform.styles.length && update[attr] && Array.isArray(update[attr])) {
          const dedupedGroups = [];
          update[attr].forEach((group) => {
            if (!dedupedGroups.includes(group)) {
              dedupedGroups.push(group);
            }
          });

          const styles = dedupedGroups.map((groupEl) => ({
            target: groupEl,
            value: {},
          }));

          update[`transforms[${transformIndex}].styles`] = styles;
        }

        // When clearing the data selector of groupby transforms, we want to clear
        // all the styles we've added
        if (transform.styles.length && !update[attr]) {
          update[`transforms[${transformIndex}].styles`] = [];
        }
      }
    }
  }
};

export const shamefullyCreateSplitStyleProps = (graphDiv, attr, traceIndex, splitTraceGroup) => {
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

    graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles.forEach((s, i) => {
      if (s.target.toString() === group) {
        indexOfStyleObject = i;
      }
    });

    let path =
      graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles[indexOfStyleObject].value;

    attr.split('.').forEach((p) => {
      if (!path[p]) {
        path[p] = {};
      }
      path = path[p];
    });

    return nestedProperty(
      graphDiv.data[traceIndex].transforms[indexOfSplitTransform].styles[indexOfStyleObject].value,
      attr
    );
  }

  return splitTraceGroup.map((g) => getProp(g));
};

export const shamefullyDeleteRelatedAnalysisTransforms = (graphDiv, payload) => {
  const parentTraceDataIndex = payload.traceIndexes[0];
  const parentUid = graphDiv.data[parentTraceDataIndex].uid;

  if (parentUid) {
    const relatedAnalysisTraceIndexes = [];
    graphDiv.data.forEach((d, i) => {
      if (
        d.transforms &&
        d.transforms.some(
          (transform) =>
            ['moving-average', 'fit'].includes(transform.type) && transform.inputUid === parentUid
        )
      ) {
        relatedAnalysisTraceIndexes.push(i);
      }
    });

    if (relatedAnalysisTraceIndexes.length) {
      relatedAnalysisTraceIndexes.forEach((i) => {
        graphDiv.data.splice(i, 1);
      });
    }
  }
};

export const shamefullyAdjustSizeref = (gd, {update}) => {
  const {'marker.size': size = null, 'marker.sizesrc': src = null} = update;
  if (size && src) {
    const DEFAULT_MAX_AREA_PX = 45;
    const scaleFactor = DEFAULT_MAX_AREA_PX * DEFAULT_MAX_AREA_PX;
    update['marker.sizeref'] = size.reduce((a, b) => Math.max(a, b)) / scaleFactor;
    update['marker.sizemode'] = 'area';
  }
};

export const shamefullyAdjustAxisDirection = (gd, {update}) => {
  if (update.type === 'funnel' && gd.data.length === 1) {
    gd.layout.yaxis.autorange = 'reversed';
  }
};
