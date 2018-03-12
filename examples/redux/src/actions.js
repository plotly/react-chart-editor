import ACTIONS from './constants';

export function sourcesUpdate(payload) {
  return {
    type: ACTIONS.UPDATE_SOURCES,
    payload,
  };
}

export function dataSourceOptionsUpdate(payload) {
  return {
    type: ACTIONS.UPDATE_SOURCE_OPTIONS,
    payload,
  };
}

export function editorUpdate(data, layout) {
  return {
    type: ACTIONS.EDITOR_UPDATE,
    payload: {data, layout},
  };
}
