import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainCard from "./components/MainCard";
import './css/bootstrap.min.css';
import './css/App.css';
// REDUX
import { Provider } from "react-redux";
import store from "./store";

function App() {

  // const [allow, setAllow] = useState(false);
  
  // if allow is true, don't do anything
  // if allow is false, get whatever user was submitted
  
  // const history = useHistory();

  // useEffect(() => {
  //   history.listen((location) => { 
  //   console.log(`You changed the page to: ${location.pathname}`) 
  // }, [history]);

  // useEffect(() => {
    // let user = window.location.href.split("3000/")[1];
    // console.log("1");
    // getUser(user);

  // }, []);

  return (
    <Provider store={store}>
      <div className="container">
        <MainCard/>
      </div>
    </Provider>
    // <Provider store={store}>
    //   {allow ?
    //   <div className="container">
    //     <MainCard/>
    //   </div>
    //   :
    //   <h5>Not available</h5>}
    // </Provider>
  );
}

export default App;