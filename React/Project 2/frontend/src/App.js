import React, { Component } from 'react';
import CategoryMenu from './components/categoryMenu';
import Posts from './components/posts';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col">
            <CategoryMenu />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <Posts />
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
