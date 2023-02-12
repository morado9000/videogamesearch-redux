import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { gamesLoadAsync, selectGame, selectStatus } from './features/search/videoGameSlice';

function App() {

  const [gamelist, setGameList] = useState([]);

  const status = useSelector(selectStatus);
  const game = useSelector(selectGame);


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
      
    </div>
  );
}

export default App;
