import React,{PureComponent} from 'react';
import {CSSTransition} from 'react-transition-group';
import{connect}from 'react-redux';
import {Link} from 'react-router-dom';

import * as actionCreators from './store/HeaderActionCreators';
import * as loginActionCreators from '../../pages/login/store/loginActionCreators';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button,
} from './headerStyle';
import '../../statics/iconfont/iconfont.css';

class Header extends PureComponent {

    getListArea(){
        const {focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
        const jsList = list.toJS();
        const pageList = [];

        if (jsList.length) {
            for(let i=(page-1)*10; i<page*10; i++){
                pageList.push(
                    <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
                )
            }
        }

        if(focused || mouseIn){
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={()=>handleChangePage(page, totalPage, this.spinIcon)}>
                            <i 
                                className='iconfont icon-spin spin'
                                ref={icon => {this.spinIcon = icon}}>
                            </i>
                            换一换
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else {
            return null;
        }
    }

    render(){
        const {focused, list, handleInputFocus, handleInputBlur, login, logout} = this.props;
        return(
            <HeaderWrapper>
                <Link to='/'>
                    <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        login ? 
                            <NavItem onClick={logout} className='right'>退出</NavItem> : 
                            <Link to='/login'>
                                <NavItem className='right'>登录</NavItem>
                            </Link>
                    }
                    <NavItem className='right'>
                        <i className='iconfont icon-Aa'></i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide">
                            <NavSearch
                                className={focused ? 'focused': ''}
                                onFocus={()=>handleInputFocus(list)}
                                onBlur={handleInputBlur}>
                            </NavSearch>
                        </CSSTransition>
                        <i className={focused ? 'focused iconfont icon-fangdajing zoom': 'iconfont icon-fangdajing zoom'}></i>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write'>
                        <Button className='writting'>
                            <i className='iconfont icon-yumaobi'></i>
                            写文章
                        </Button>
                    </Link>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        focused: state.get('header').get('focused'),
        list: state.get('header').get('list'),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login', 'login'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleInputFocus(list){
            if (list.size ===0 ){
                dispatch(actionCreators.getList())
            };
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/gi, '') // replace unit
            if (originAngle) {
                originAngle = parseInt(originAngle, 10)
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'
            if (page < totalPage){
                dispatch(actionCreators.changePage(page + 1));
            }else {
                dispatch(actionCreators.changePage(1));
            }
        },
        logout(){
            dispatch(loginActionCreators.logout())
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
    