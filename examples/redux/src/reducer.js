import ACTIONS from './constants';

const initialState = {
  dataSources: {},
  dataSourceOptions: [],
  data: [],
  layout: {},
  frames: [],
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
        data: action.payload.data,
        layout: action.payload.layout,
        frames: action.payload.frames,
      };
    default:
      return state;
  }
};
