import { SET_QUESTIONS, SET_INSTALLATIONS, SET_PARTNERS, SET_REVIEWS, SET_SYSTEMS, SET_USERS, CLEAR_USERS } from './actions';
import { combineReducers } from 'redux';
const initialState = {
  questions: [],
  installations: [],
  partners: [],
  reviews: [],
  systems: [],
  user: { name: "", email: "", bio: "", location: "" },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case SET_INSTALLATIONS:
      return {
        ...state,
        installations: action.payload,
      };
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.payload,
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case SET_SYSTEMS:
      return {
        ...state,
        systems: action.payload,
      };
    case SET_USERS:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USERS:
      return { ...state, user: { name: '', email: '', bio: '', location: '' } };
    default:
      return state;
  }
};
const rootReducers = combineReducers({
  questions: rootReducer,
  installations: rootReducer,
  partners: rootReducer,
  reviews: rootReducer,
  systems: rootReducer
});
export default rootReducers;
