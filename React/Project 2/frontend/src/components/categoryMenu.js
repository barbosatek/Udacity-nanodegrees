import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryMenu extends Component {
  render() {
    const { store } = this.props;
    
    return (
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
          <a class="nav-link active" href="#">All</a>
        </li>
        {Object.keys(store.categories).map((key, index) =>
          <li className="nav-item" key={store.categories[key].name}>
              <a class="nav-link" href={`#/${store.categories[key].path}`}>{store.categories[key].name}</a>
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
