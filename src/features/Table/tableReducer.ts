import {createSlice} from "@reduxjs/toolkit"
import {createAppAsyncThunk} from "../../common/utils/createAppAsyncThunk.ts"
import { table} from "../../api/api.ts"


type controlValuesType = {
    currentValue: number
    prevValue: number
    change: number
    timestep: Date
}

type StateType = controlValuesType[]

const initialState: StateType = []

export const getTableValues = createAppAsyncThunk<{ tableValues: controlValuesType[] }, void>(
    'table/getValues', async (_, thunkAPI) => {
        try {
            const result = await table.getValues()
            return {tableValues: result.data}
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(null)
        }
    }
)

const slice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTableValues.fulfilled, (_, action) => {
            return action.payload.tableValues
        })
    }
})

export const tableReducer = slice.reducer
export const tableAction = slice.actions
export const tableThunks = {getTableValues}
