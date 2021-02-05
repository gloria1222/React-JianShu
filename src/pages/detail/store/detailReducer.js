import * as actionTypes from './detailActionTypes';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    title:'',
    content:'',
});

const detailReducer = (state=defaultState, action)=>{
    switch(action.type){
        case actionTypes.CHANGE_DETAIL:
            return state.merge({
                title: action.title,
                content: action.content,
            })
        default: return state;
    }
};

export default detailReducer;