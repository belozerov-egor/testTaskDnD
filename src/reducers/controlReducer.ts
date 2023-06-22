import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk"
import { control } from "../api/api"


type controlValuesType = {
    currentValue: number
        minValue: number
        maxValue: number                 
}

type StateType = controlValuesType


const initialState : StateType= {
        currentValue: 0,
        minValue: 0,
        maxValue: 0,

}

export const getControlValues = createAppAsyncThunk<{controlValues: controlValuesType}, void>(
    'control/getValues', async (_, thunkAPI) => {
        try {
            const result = await control.getValues()
            return {controlValues: result.data.value}
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(null)
        }
    }
)

const slice = createSlice({
    name: 'control',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(getControlValues.fulfilled, (_, action) => {
       return action.payload.controlValues
    })
}
})

export const controlReducer = slice.reducer
export const controlAction = slice.actions
export const controlThunks = {getControlValues}