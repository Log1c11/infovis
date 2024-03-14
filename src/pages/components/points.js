import { useState } from 'react';

function Points(props) {
    const {data, xScale, yScale, height, width,setTooltipX, setTooltipY,selectedStation, setSelectedStation,selectedPoint, setSelectedPoint} = props;
    // const [selectedStation, setSelectedStation] = useState(null);
    // const [selectedPoint, setSelectedPoint] = useState(null);

    const mouseEnter = (station) => {
      console.log('Mouse Enter:', station);
      setSelectedStation(station);
      setSelectedPoint(data.find((d) => d.station === station));  
      setTooltipX(event.pageX);
      setTooltipY(event.pageY);
    };

    const mouseOut = () => {
      console.log('Mouse Out');
      setSelectedStation(null);
      setSelectedPoint(null);
    };

    const getColor = (station) => (station === selectedStation ? 'red' : 'steelblue');
    const getRadius = (station) => (station === selectedStation ? 10 : 5);

    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
        
        {data.map((d) => (
          <circle
            key={d.index}
            cx={xScale(d.tripdurationS)}
            cy={yScale(d.tripdurationE)}
            r={getRadius(d.station)}
            fill={getColor(d.station)}
            stroke={'black'}
            onMouseEnter={(event) => mouseEnter(d.station,event)}
            onMouseOut={mouseOut}
          />
        ))}
        {selectedStation && selectedPoint &&(
                <g>
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="yellow"
                    opacity="0.4"
                    
                />
                <circle
                    cx={xScale(selectedPoint.tripdurationS)}
                    cy={yScale(selectedPoint.tripdurationE)}
                    r={getRadius(selectedPoint.station)} 
                    fill="red"
                    stroke="black"
                    onMouseEnter={(event) => mouseEnter(selectedPoint.station,event)}
                    onMouseOut={mouseOut}
                />
                </g>
            )}
        </g>
    } else {
        return <g></g>
    }
}

export default Points