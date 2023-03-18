import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamesLoadAsync, selectGame, selectStatus, resetGames } from './videoGameSlice';


const delay = ms => new Promise(res => setTimeout(res, ms));


export default function VideoGameSearch() {


    const status = useSelector(selectStatus);
    const games = useSelector(selectGame);

    const [searchTerm, setSearchTerm] = useState("Mario");
    const [offset, setOffset] = useState(1);
    const [myStatus, setMyStatus] = useState("idle");
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    function onSearchChange(e) {
        e.preventDefault();
        setSearchTerm(e.target[0].value);
    }

    let gamesLoad = async () => {
            setMyStatus("Loading")
            const res = await fetch(
                "/igdb/games", {
                  method: "POST", 
                  body: 'sort created_at desc; where name ~*"' + searchTerm + '"* & rating > 0; fields *; offset ' + offset + '; limit 20;',
                  }
                )
            const json =  await res.json();
            for(let i=0; i<json.length; i++){
                await delay(1500)
                .then(dispatch(gamesLoadAsync({game: json[i]})))
            }
            setMyStatus("idle")
    }

    function loadGames() {
        setOffset(1);
        dispatch(resetGames());
        gamesLoad();
    }

    function loadMore() {
        const off = (Number(offset) + 20);
        setOffset(off);
    }

    function open(){
        setIsOpen(true);
    }

    function close(){
        setIsOpen(false);
    }
    
    useEffect(() => {
        if(offset != 1){
            gamesLoad();
        }
    }, [offset])

    useEffect(() => {
        loadGames();
    }, [searchTerm])

    return (
        <>
            <div className="container flex flex-col mx-auto">
                    <div className="border-solid border-b-2 border-gray drop-shadow-md py-6">
                        <div className="flex flex-col items-center py-6 justify-center">
                            <h2 className="text-4xl">Video Game Search</h2>
                        </div>
                        <div className='flex flex-col items-center py-6 justify-center md:flex-row'>
                            <form onSubmit={onSearchChange}>
                                <label>Search: </label>
                                {myStatus == "idle" ? (
                                    <>
                                        <input type="text" className="rounded-full focus:outline-none mx-6" placeholder="Look for a game" />
                                        <button type="submit" className='p-3 mr-3 border border-black'>Submit</button>
                                        <button type="button" className='p-3 border border-black' onClick={loadMore}>Load more</button>
                                    </>
                                ) : (
                                    <>
                                        <input disabled type="text" className="rounded-full focus:outline-none mx-6" placeholder="Loading. Please wait."/>
                                        <button disabled type="submit" className='p-3 mr-3 border border-black'>Submit</button>
                                        <button disabled type="button" className='p-3 border border-black' onClick={loadMore}>Load more</button>
                                    </>
                                )}
                                
                            </form>
                            
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