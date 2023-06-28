import {VictoryAxis, VictoryChart, VictoryLine} from 'victory';
import {useEffect} from 'react';
import {graphThunks} from '../reducers/graphReducer';
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";
import {styled} from "styled-components";

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
        <Graph>
            <div style={{width: '100%',  backgroundColor: '#005fb8'}}>Потребление</div>
            <VictoryChart
                padding={{ top: 0, bottom: 50, left: 50, right: 20 }}
                height={450}
                width={900}
                domainPadding={20}
                style={{ background: { fill: 'white' } }}
            >
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: { stroke: 'black' },
                        tickLabels: { fontSize: 10 },
                        grid: { stroke: ' #005fb8' },
                    }}
                />
                <VictoryAxis
                    style={{
                        axis: { stroke: 'black' },
                        tickLabels: { fontSize: 11 },
                        grid: { stroke: ' #005fb8' },
                    }}
                />
                <VictoryLine
                    data={formattedData}
                    x="timestep"
                    y="currentValue"
                    style={{
                        data: { stroke: 'black' },
                    }}
                />
            </VictoryChart>
        </Graph>
    );
};

const Graph = styled.div`
  background-color: #ffffff;
  height: 450px;
  @media screen and (max-width: 840px) {
    width: 400px;
    height: 230px;
  }
div{
padding-left: 15px;
  width: 100%;
  backgroundColor: #005fb8;
  color: #FFFFFF;
}
`
