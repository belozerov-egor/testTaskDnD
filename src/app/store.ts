import {AnyAction, combineReducers} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {controlReducer} from "../features/Control/controlReducer.ts";
import {tableReducer} from "../features/Table/tableReducer.ts";
import {graphReducer} from "../features/Graph/graphReducer.ts";
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

