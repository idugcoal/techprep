import {
  INITIALIZE_USER,
  SIGNOUT_USER,
  INITIALIZE_STUDY_QUESTIONS
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type){
    case INITIALIZE_USER:
      return { ...state, ...action.payload };
    case INITIALIZE_STUDY_QUESTIONS:
      return { ...state, studyList: action.payload };
    default:
      return state;
  }
}