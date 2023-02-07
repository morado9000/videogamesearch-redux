import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamesLoadAsync, selectGame, selectStatus } from './videoGameSlice';



export default function VideoGameSearch() {


    const status = useSelector(selectStatus);
    const games = useSelector(selectGame);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(gamesLoadAsync("Mario")); 
         
       }, [])

    return (
        <>
            <div className="container flex flex-col mx-auto">
                    <div className="border-solid border-b-2 border-gray drop-shadow-md py-6">
                        <div className="flex flex-col items-center py-6 justify-center">
                            <h2 className="text-4xl">Video Game Search</h2>
                        </div>

                     </div>
                     <div className="flex grid grid-cols-4 gap-x-3 items-stretch mt-10">
                        <p className="text-1xl self-start font-bold underline">Name</p>
                        <p className="text-1xl self-start font-bold underline">Genre</p>
                        <p className="text-1xl self-start font-bold underline">Platforms</p>
                        <p className="text-1xl self-start font-bold underline">Rating</p>
                     </div>
            {status == "fulfilled" ? (
                
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
               
            ) : (
                "Loading"
            )}
             </div>
        </>
    )
}