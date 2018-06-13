import React, { Component } from 'react';
import { connect } from 'react-redux'

class CategoryMenu extends Component {
  render() {
    const { store } = this.props;
    
    return (
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <a className="nav-link active" href="#all">All</a>
        </li>
        {Object.keys(store.categories).map((key, index) =>
          <li className="nav-item" key={store.categories[key].name}>
              <a className="nav-link" href={`#${store.categories[key].path}`}>{store.categories[key].name}</a>
          </li>
        )}
      </ul>
    );
  }
}
function mapStateToProps(store) {
    return {
        store: {
            categories: store.categories
        }
      }
  }
  
  export default connect(mapStateToProps)(CategoryMenu);
