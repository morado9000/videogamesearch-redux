import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

const initialState = {
    games: [],
    status: 'loading'
}

const clientid = '';
const autho = '';

const delay = ms => new Promise(res => setTimeout(res, ms));

export const gamesLoadAsync = createAsyncThunk(
    'gamesearch/getGamesBySearchTerm',
    async (userData) => {
        const res = await fetch(
            "http://0.0.0.0:8080/https://api.igdb.com/v4/games", {
              method: "POST", 
              headers:{ 'Client-ID':clientid, 'Authorization':autho }, 
              body: 'search "' + userData.search + '"; fields *; offset ' + userData.offset + '; limit 20;'
              }
            )
        const json =  await res.json();
        for(let i=0; i<json.length; i++){
            
            json[i].genres = await genresLoadAsync(json[i]);
            json[i].platforms = await platformsLoadAsync(json[i]);
        }
        return userData.prevList.concat(json);
    }
)

export const genresLoadAsync = async (game) => {
        let gen = [];
        if(game.genres){
            for (let i=0; i<game.genres.length; i++) {  
                delay(3000);        
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
                delay(3000);          
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

    extraReducers: (builder) => {
        builder
            .addCase(gamesLoadAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(gamesLoadAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.games = action.payload;
                state.status = 'fulfilled';
            })

            
    }
})

export const selectStatus = (state) => state.gamesearch.status;
export const selectGame = (state) => state.gamesearch.games;


export default videoGameSlice.reducer;
