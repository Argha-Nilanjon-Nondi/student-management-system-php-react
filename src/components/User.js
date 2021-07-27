import React, { Component,Fragment,useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom"
import Admin from './users/Admin'
import Teacher from './users/Teacher'
import Student from './users/Student'
import Not_found from './404'
import LoadingBar from './LoadingBar'
import axios from 'axios'


  

function getUserRoutes(user,path){
  let content;

  if(user==="admin"){
     content=(
       <Router>
         <Route path={`${path}/admin`}>
           <Admin></Admin>
         </Route>
       </Router>
     );
  }

  if(user==="teacher"){
     content=(
      <Router>
      <Route path={`${path}/teacher`}>
        <Teacher></Teacher>
      </Route>
    </Router>
     );
  }

  if(user==="student"){
     content=(
      <Router>
      <Route path={`${path}/student`}>
        <Student></Student>
      </Route>
    </Router>
     );
  }

  if(user==="unknown"){
    content = (
      <div className="container my-4">
        <LoadingBar></LoadingBar>
      </div>
    );
  }

  if(user==="unauthorize"){
    content=(
    <Redirect to="/login"></Redirect>
    );
  }

  return content;

}


export default function User(){

  let { path } = useRouteMatch();

  let [isAuth,setIsAuth]=useState("unknown");

  if(localStorage.token===undefined || localStorage.usertype===undefined){
    return (
     <Redirect to="/login"></Redirect>
    );
  }

  axios({
    method: 'post',
    url: `http://${document.location.hostname}/student-management-system/validation.php`,
    data: {
        "token":localStorage.getItem("token"),
        "usertype":localStorage.getItem("usertype")
      }
  })
  .then((response)=>{
      if(response.data.code==="3003"){
        setIsAuth("unauthorize");
      }
      if(response.data.code==="2300"){
        setIsAuth(localStorage.usertype)
      }
  })
  .catch((err)=>{
      return err;
  })

  return (<Fragment>
      {
        
          getUserRoutes(isAuth,path)
      }
    </Fragment>)
    }
