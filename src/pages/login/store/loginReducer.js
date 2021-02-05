import * as actionTypes from './loginActionTypes';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    login: false
});

const loginReducer = (state=defaultState, action)=>{
    switch(action.type){
        case actionTypes.CHANGE_LOGIN:
            return state.set('login', action.value);
        case actionTypes.LOGOUT:
            return state.set('login', action.value);
        default: return state;
    }
};

export default loginReducer;