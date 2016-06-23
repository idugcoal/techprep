import {
  LOAD_QUESTIONS
} from '../actions/actionTypes';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type){
    case LOAD_QUESTIONS:
      // console.log('load questions action.payload', _.map(action.payload, (obj) => obj));
      return _.map(action.payload, (obj) => obj);
    default:
      return state;
  }
}