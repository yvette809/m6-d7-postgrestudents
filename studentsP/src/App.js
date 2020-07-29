import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Intro.css'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Details from './components/Details'
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom'


function App() {
  return (
    <>
    <Router>  
    <Navigation/>
    <Route path="/" exact><Home/></Route>
    <Route path="/Details/:_id" ><Details/></Route>
    </Router>
    </>
  );
}

export default App;
