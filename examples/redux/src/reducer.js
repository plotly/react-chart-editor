import ACTIONS from './constants';

const initialState = {
  dataSources: {},
  dataSourceOptions: [],
  graphDiv: {},
  editorRevision: 0,
  plotRevision: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_SOURCES:
      return {...state, dataSources: action.payload};
    case ACTIONS.UPDATE_SOURCE_OPTIONS:
      return {...state, dataSourceOptions: action.payload};
    case ACTIONS.EDITOR_UPDATE:
      return {
        ...state,
        plotRevision: state.plotRevision + 1,
      };
    case ACTIONS.PLOT_UPDATE:
      return {
        ...state,
        graphDiv: action.payload,
        editorRevision: state.editorRevision + 1,
      };
    case ACTIONS.INITIALIZE_PLOT:
      return {
        ...state,
        graphDiv: action.payload,
      };
    default:
      return state;
  }
};
