import XAxis from './xAxis.js';
import YAxis from './yAxis.js';
import Points from './points.js';
import React from 'react';

function ScatterPlot(props){
    const { offsetX, offsetY, data, xScale, yScale, height, width,setTooltipX, setTooltipY,selectedStation, setSelectedStation, selectedPoint, setSelectedPoint} = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the retur
    const transform = `translate(${offsetX}, ${offsetY})`;
    return <g transform={transform}>
           <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width} setTooltipX={setTooltipX} setTooltipY = {setTooltipY}selectedStation={selectedStation} setSelectedStation={setSelectedStation} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />
           <YAxis yScale={yScale} height={height} axisLable={"Trip duration end in"}/>
           <XAxis xScale={xScale} height={height} width={width} axisLable={"Trip duration start from"}/>
        </g>
}

export default ScatterPlot