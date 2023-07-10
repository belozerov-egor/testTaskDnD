import {createSlice} from "@reduxjs/toolkit"
import {createAppAsyncThunk} from "../../common/utils/createAppAsyncThunk.ts"
import {graph} from "../../api/api.ts"


type controlValuesType = {
    timestep: Date
    currentValue: number

}

type StateType = {
    graphData: controlValuesType[] }

const initialState: StateType = {
    graphData: [{

    } as controlValuesType]}

export const getGraphData = createAppAsyncThunk<{ graphValues: controlValuesType[] }, void>(
    'graph/getValues', async (_, thunkAPI) => {
        try {
            const result = await graph.getValues()
            return {graphValues: result.data}
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
        builder.addCase(getGraphData.fulfilled, (state, action) => {
            state.graphData = action.payload.graphValues
        })
    }
})

export const graphReducer = slice.reducer
export const graphAction = slice.actions
export const graphThunks = {getGraphData}
