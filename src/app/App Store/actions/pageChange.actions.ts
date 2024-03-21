import { createAction, props } from "@ngrx/store";

export const setPageNumber = createAction('[Page] Set Page Number',props<{pageNumber:number}>())