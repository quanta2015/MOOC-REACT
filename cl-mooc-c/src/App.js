import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import Mooc from './components/Mooc';
import Index from './components/Index';
import './App.css';
import './css/markdown.css';
import './css/github.css';
import 'antd/dist/antd.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">C程序设计</header>
        <Route exact path ="/" component={Index} />
        <Route exact path ="/mooc/:id" component={Mooc} />
      </div>
    );
  }
}

export default (App);
