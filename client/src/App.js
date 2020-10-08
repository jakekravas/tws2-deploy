import React from 'react';
import MainCard from "./components/MainCard";
import './css/bootstrap.min.css';
import './css/App.css';
// REDUX
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <MainCard/>
      </div>
    </Provider>
  );
}

export default App;
