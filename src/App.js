import React from 'react'

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import MainPage from './pages';

export default function App() {
  return (
    <Router>
      <Route path="/" component={MainPage}/>
    </Router>
  );
}
