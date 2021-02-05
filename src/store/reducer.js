import {combineReducers} from 'redux-immutable';

import headerReducer from '../common/header/store/HeaderReducer';
import homeReducer from '../pages/home/store/HomeReducer';
import detailReducer from '../pages/detail/store/detailReducer';
import loginReducer from '../pages/login/store/loginReducer';

const reducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer
})

export default reducer;
