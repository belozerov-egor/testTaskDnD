import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { controlReducer } from "../reducers/controlReducer";
import { tableReducer } from "../reducers/tableReducer";

const RootReducers = combineReducers({
    control: controlReducer,
    table: tableReducer
})



export const store = createStore(RootReducers, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof RootReducers>
export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>

