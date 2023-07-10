import {AnyAction, combineReducers} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {controlReducer} from "../reducers/controlReducer";
import {tableReducer} from "../reducers/tableReducer";
import {graphReducer} from "../reducers/graphReducer.ts";
import {configureStore} from "@reduxjs/toolkit";

const RootReducers = combineReducers({
    control: controlReducer,
    table: tableReducer,
    graph: graphReducer
})

export const store = configureStore({
    reducer: RootReducers,
});

export type RootStateType = ReturnType<typeof RootReducers>
export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

