import React, { Component } from 'react';
import CategoryMenu from './components/categoryMenu';
import Posts from './components/posts';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="container">
      <Switch>
        <Route replace exact path="/:category?" render={({match, history, props}) => (
          <div>
            <div className="row">
              <div className="col">
                <CategoryMenu match={match} history={history} props={props} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/* <Posts match={match} history={history} /> */}
              </div>
            </div>
          </div>
        )} />
        </Switch>
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

export default withRouter(connect(mapStateToProps)(App))
