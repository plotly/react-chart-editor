import ACTIONS from './constants';

const initialState = {
  dataSources: {},
  dataSourceOptions: [],
  data: [],
  layout: {},
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
      };
    default:
      return state;
  }
};
