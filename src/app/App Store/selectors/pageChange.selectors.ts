import { createSelector,createFeatureSelector } from "@ngrx/store";
import { AppState } from "../state";


export const selectPage = createFeatureSelector<AppState,{pageNumber:number}>('page');

export const getCurrentPage = createSelector(
	selectPage,(state) =>state.pageNumber
);