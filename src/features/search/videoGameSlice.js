import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    games: [],
    status: 'loading'
}


const delay = ms => new Promise(res => setTimeout(res, ms));

export const gamesLoadAsync = createAsyncThunk(
    'gamesearch/getGamesBySearchTerm',
    async (userData) => {
            
            userData.game.genres = await genresLoadAsync(userData.game);
            userData.game.platforms = await platformsLoadAsync(userData.game);

        return userData.game;
    }
)

export const genresLoadAsync = async (game) => {
        let gen = [];
        if(game.genres){
            for (let i=0; i<game.genres.length; i++) {  
                await fetch(
                  "http://0.0.0.0:8080/https://api.igdb.com/v4/genres", {
                    method: "POST", 
                    headers:{ 'Client-ID':clientid, 'Authorization':autho }, 
                    body: 'fields name; where id = ' + game.genres[i] + ';'
                  }
                )
                .then(res => res.json())
                .then(json => gen.push(json[0].name))
            }
        }
        return gen;
    }

export const platformsLoadAsync = async (game) => {
        let gen = [];
        if(game.platforms){
            for (let i=0; i<game.platforms.length; i++) {
                await fetch(
                  "http://0.0.0.0:8080/https://api.igdb.com/v4/platforms", {
                    method: "POST", 
                    headers:{ 'Client-ID':clientid, 'Authorization':autho }, 
                    body: 'fields name; where id = ' + game.platforms[i] + ';'
                  }
                )
                .then(res => res.json())
                .then(json => gen.push(json[0].name))
            }
        }
        return gen;
}


export const videoGameSlice = createSlice({
    name: 'gamesearch',
    initialState,

    reducers: {
        resetGames(state) {
            state.games = [];
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(gamesLoadAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(gamesLoadAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.games.push(action.payload);
                state.status = 'fulfilled';
            })

            
    }
})

export const selectStatus = (state) => state.gamesearch.status;
export const selectGame = (state) => state.gamesearch.games;

export const { resetGames } = videoGameSlice.actions;


export default videoGameSlice.reducer;
