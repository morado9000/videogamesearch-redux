import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { gamesLoadAsync, selectGame, selectStatus } from './features/search/videoGameSlice';

function App() {

  const [gamelist, setGameList] = useState([]);

  const status = useSelector(selectStatus);
  const game = useSelector(selectGame);


  /*  useEffect(() => {
   const getStuff = async () => {
      const res = await fetch("https://id.twitch.tv/oauth2/token?client_id=lih3ve08wly9ns7w1ksj04w2uq80uc&client_secret=rapb5c0zqq8lqn5ux82krevrw3dip5&grant_type=client_credentials", {method: "POST"});
      const json = await res.json();
      console.log(json)
    }
    getStuff();
    
  }, [])*/

  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(gamesLoadAsync("Mario")); 
    
  }, [])

  useEffect(() => {
    if(status == "pending")
      console.log("list: " + game);
  }, [status])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
