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

export function editorUpdate() {
  return {
    type: ACTIONS.EDITOR_UPDATE,
  };
}

export function plotUpdate(payload) {
  return {
    type: ACTIONS.PLOT_UPDATE,
    payload,
  };
}

export function initializePlot(payload) {
  return {
    type: ACTIONS.INITIALIZE_PLOT,
    payload,
  };
}
