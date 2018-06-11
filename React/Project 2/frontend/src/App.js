import React, { Component } from 'react';
import CategoryMenu from './components/categoryMenu';
import Posts from './components/posts';

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
       <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Udacity</a>
      </nav>
        <CategoryMenu />
        <Posts/>
      </div>
    );
  }
}

export default App;
