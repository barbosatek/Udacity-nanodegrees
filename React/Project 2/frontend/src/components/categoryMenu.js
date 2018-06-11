import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CategoryMenu extends Component {
  render() {
    const { store } = this.props;

    return (
        <div className="container-fluid">
      <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    {store.categories.map((category) =>
                      <li className="nav-item" key={category.name}>
                          <Link to={`/${category.path}`}>{category.name}</Link>
                      </li>
                    )}
                </ul>
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Home</h1>
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                      <button className="btn btn-sm btn-outline-secondary">Share</button>
                      <button className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                      <span data-feather="calendar"></span>
                      This week
                    </button>
                  </div>
                </div>
              </main>
      </div>
    </div>
    );
  }
}
function mapStateToProps(store) {
    return {
        store: {
            categories: [...store.categories]
        }
      }
  }
  
  export default connect(mapStateToProps)(CategoryMenu);
