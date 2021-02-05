import * as actionTypes from './homeActionTypes';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScoll: false
});

const homeReducer = (state=defaultState, action)=>{
    switch(action.type){
        case actionTypes.CHANGE_HOME_DATA:
            return state.merge({
                topicList:fromJS(action.topicList),
                articleList:fromJS(action.articleList),
                recommendList:fromJS(action.recommendList),
            })
        case actionTypes.ADD_HOME_LIST:
            return state.merge({
                articleList: state.get('articleList').concat(action.list), 
                articlePage: action.nextPage
              })
        case actionTypes.TOGGLE_SCROLL_TOP:
            return state.set('showScoll', action.show); 
        default: return state;
    }
};

export default homeReducer;