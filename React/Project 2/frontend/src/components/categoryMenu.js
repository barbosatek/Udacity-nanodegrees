import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink  } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class CategoryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.match.params.category
    }

    console.log(this.props.match.params.category)
  }
  render() {
    const { store } = this.props;
    
    return (
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className={"nav-link " + (!this.state.category ? 'active' : '')} to="/">All</Link >
        </li>
        {Object.keys(store.categories).map((key, index) =>
          <li className="nav-item" key={key}>
            <Link className={"nav-link " + (this.state.category === key ? 'active' : '')} to={`/${store.categories[key].path}`}>{store.categories[key].path}</Link>
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
  
  export default withRouter(connect(mapStateToProps)(CategoryMenu));
