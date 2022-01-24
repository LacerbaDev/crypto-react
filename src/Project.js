import React, { Component } from 'react'
import {Grid } from '@material-ui/core'
import CoinList from './components/CoinList';
import CoinDetail from './components/CoinDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,  
  Link,
  useHistory,
  useParams,
  useLocation
} from "react-router-dom";


export default class Project extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" render={props => <CoinList {...props} />} exact />
          <Route path="/coins/:coinId">
            <CoinDetail />
          </Route>
        </Switch>
      </Router>
    )
  }
}
