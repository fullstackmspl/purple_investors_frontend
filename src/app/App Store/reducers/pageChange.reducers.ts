import { createReducer ,on } from "@ngrx/store";
import { setPageNumber } from "../actions/pageChange.actions";


export const initialState = {
	pageNumber:0
}

const _pageReducer = createReducer(
	initialState,on(setPageNumber,(state,{pageNumber})=>({...state,pageNumber}))
)

export function pageReducer(state,action){
	return _pageReducer(state,action)
}