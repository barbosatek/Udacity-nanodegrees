import React, { Component } from 'react';
import CategoryMenu from './components/categoryMenu';
import Posts from './components/posts';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <CategoryMenu />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Posts />
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
