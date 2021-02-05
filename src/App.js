import React, {Component} from 'react';
import {Provider}from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './common/header/HeaderIndex';
import store from './store/index';
import Home from './pages/home/HomeIndex';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login/LoginIndex';
import Write from './pages/write/WriteIndex';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path='/' exact component={Home}/>
                        <Route path='/detail' exact component={Detail}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/write' exact component={Write}/>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
