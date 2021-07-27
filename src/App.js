import logo from './logo.svg';
import './App.css';
import React,{Fragment} from "react"
import Login from"./components/Login"
import User from"./components/User"
import Not_found from './components/404';
import checkSession from './lib/checkSession'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from "react-router-dom"

function App() {
    return (

        <Router>
        <Switch>
            <Route exact path="/login">       
                <Login></Login>
            </Route>
            <Route path="/user">
                <User></User>
            </Route>
            <Route path="*">
               <Not_found>
                </Not_found>
            </Route>
        </Switch>
        </Router>

        )
    }

    export default App;