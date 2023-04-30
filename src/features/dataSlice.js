import { createSlice } from "@reduxjs/toolkit";

const getApiUrl = artId => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`;

const initialState = {
    artId: 10245,
    apiData: {},
    isLoggedIn: true
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        loadData: (state, action) => {
            state.apiData = action.payload;
        },
        nextImage: (state) => {
            state.artId++;
        },
        prevImage: (state) => {
            state.artId--;
        },
        setArtId: (state, action) => {
            state.artId = action.payload;
        },
        reset: () => {
            return initialState;
        }
    }
});

export const { 
    loadData, 
    nextImage, 
    prevImage, 
    setArtId, 
    reset
} = dataSlice.actions;
export default dataSlice.reducer;

export const fetchData = () => {
    return async (dispatch, getState) => {
        const data = getState();
        const { artId } = data.data;
        const response = await fetch(getApiUrl(artId));
        const json = await response.json();
        dispatch(loadData(json))
    }
}