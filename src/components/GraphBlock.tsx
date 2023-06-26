import {VictoryAxis, VictoryChart, VictoryLine} from 'victory';
import {useEffect} from 'react';
import {graphThunks} from '../reducers/graphReducer';
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";

export const GraphBlock = () => {
    const graphData = useAppSelector(state => state.graph.graphData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(graphThunks.getGraphData());
        const interval = setInterval(() => {
            dispatch(graphThunks.getGraphData());
        }, 60000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (graphData.length === 0) {
        return <div>loading</div>;
    }

    const formattedData = graphData.map((item) => ({
        timestep: item.timestep,
        currentValue: item.currentValue,
    }));

    return (
        <div>
            <div style={{width: '100%',  backgroundColor: 'blue'}}>Потребление</div>
            <VictoryChart
                padding={{ top: 0, bottom: 50, left: 50, right: 20 }}
                height={400}
                width={900}
                domainPadding={20}
                style={{ background: { fill: 'white' } }}
            >
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: { stroke: 'black' },
                        tickLabels: { fontSize: 10 },
                        grid: { stroke: '#ebebeb' },
                    }}
                />
                <VictoryAxis
                    style={{
                        axis: { stroke: 'black' },
                        tickLabels: { fontSize: 10 },
                        grid: { stroke: '#ebebeb' },
                    }}
                />
                <VictoryLine
                    data={formattedData}
                    x="timestep"
                    y="currentValue"
                    style={{
                        data: { stroke: '#8884d8' },
                    }}
                />
            </VictoryChart>
        </div>
    );
};
