import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamesLoadAsync, selectGame, selectStatus, resetGames } from './videoGameSlice';

const clientid = '';
const autho = '';

const delay = ms => new Promise(res => setTimeout(res, ms));


export default function VideoGameSearch() {


    const status = useSelector(selectStatus);
    const games = useSelector(selectGame);

    const [searchTerm, setSearchTerm] = useState("Mario");
    const [offset, setOffset] = useState("1");

    const dispatch = useDispatch();

    function onSearchChange(e) {
        setSearchTerm(e.target.value);
    }

    let gamesLoad = async (offset) => {
            const res = await fetch(
                "http://0.0.0.0:8080/https://api.igdb.com/v4/games", {
                  method: "POST", 
                  headers:{ 'Client-ID':clientid, 'Authorization':autho }, 
                  body: 'search "' + searchTerm + '"; fields *; offset ' + offset + '; limit 20;'
                  }
                )
            const json =  await res.json();
            for(let i=0; i<json.length; i++){
                await delay(1500)
                .then(dispatch(gamesLoadAsync({game: json[i]})))
            }
    }

    function loadGames(e) {
        e.preventDefault();
        dispatch(resetGames());
        gamesLoad();
    }

    function loadMore() {
        const off = (Number(offset) + 20);
        setOffset(off.toString());
        console.log(off);
        gamesLoad(off);
    }

    useEffect(() => {
        gamesLoad("1"); 
         
    }, [])


    return (
        <>
            <div className="container flex flex-col mx-auto">
                    <div className="border-solid border-b-2 border-gray drop-shadow-md py-6">
                        <div className="flex flex-col items-center py-6 justify-center">
                            <h2 className="text-4xl">Video Game Search</h2>
                        </div>
                        <div className='flex flex-col items-center py-6 justify-center md:flex-row'>
                            <form onSubmit={loadGames}>
                                <label>Search: </label>
                                <input type="text" className="rounded-full focus:outline-none mx-6" placeholder="Look for a game" onChange={onSearchChange}/>
                                <button type="submit">Submit</button>
                            </form>
                            <button onClick={loadMore}>Load more</button>
                        </div>

                     </div>
                     <div className="flex grid grid-cols-4 gap-x-3 items-stretch mt-10">
                        <p className="text-1xl self-start font-bold underline">Name</p>
                        <p className="text-1xl self-start font-bold underline">Genre</p>
                        <p className="text-1xl self-start font-bold underline">Platforms</p>
                        <p className="text-1xl self-start font-bold underline">Rating</p>
                     </div>
           {/* {status == "fulfilled" ? (*/}
                
                    <>
                        {games.map(game => 
                            <div className="flex grid grid-cols-4 gap-x-3 items-stretch mt-10">
                                <p className="text-1xl self-start">{game.name}</p>
                                <p className="text-1xl self-start">{game.genres[0]}</p>
                                <p className="text-1xl self-start">{game.platforms[0]}</p>
                                <p className="text-1xl self-start">{game.rating}</p>
                            </div>    
                        )}
                    </>
               
            {/*) : (
                "Loading"
            )}*/}
             </div>
        </>
    )
}