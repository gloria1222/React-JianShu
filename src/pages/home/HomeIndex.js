import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import List from './componects/List';
import Recommend from './componects/Recommend';
import Topic from './componects/Topic';
import Writer from './componects/Writer';
import * as actionCreators from './store/HomeactionCreator';
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './homeStyle';

class Home extends PureComponent {

    render(){
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img 
                        className='banner-img' 
                        src='//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
                        alt='Home'
                    />
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                {this.props.showScoll? <BackTop onClick={this.handleScrollTop}>顶部</BackTop>: null} 
            </HomeWrapper>
        )
    }

    
    handleScrollTop(){
        window.scrollTo(0,0);
    }

    componentDidMount(){
        this.props.changeHomeData();
        this.bindEvents();
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }

    bindEvents(){
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }
}

const mapState = (state) => ({
    showScoll: state.getIn(['home', 'mapState']),
})

const mapDispatch = (dispatch) => ({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow(){
        if(document.documentElement.scrollTop>100){
            dispatch(actionCreators.toggleTopShow(true))
        }else{
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
});

export default connect(mapState, mapDispatch)(Home);