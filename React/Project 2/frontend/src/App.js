import React, { Component } from 'react';
import CategoryMenu from './components/categoryMenu';
import Posts from './components/posts';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <CategoryMenu />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Posts category="redux"/>
          </div>
        </div>
      </div>  
    );
  }
}

function mapStateToProps(store) {
  return {
      store: {
        ...store
      }
    }
}

export default connect(mapStateToProps)(App)
