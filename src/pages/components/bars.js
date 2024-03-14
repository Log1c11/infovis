import { useState } from 'react';

function Bars(props) {
    const {data, xScale, yScale, height,selectedStation, setSelectedStation} = props;
    // const [selectedStation, setSelectedStation] = useState(null);

    const mouseEnter = (station) => {
      console.log('Mouse Enter:', station);
      setSelectedStation(station);
    };

    const mouseOut = () => {
      console.log('Mouse Out');
      setSelectedStation(null);
    };

    const getColor = (station) => (station === selectedStation ? 'red' : 'steelblue');

    //Note: 
    //the if(data){...} means when data is not null, the component will return the bars; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
            
            {data.map((d) => (
            <rect
                key={d.index}
                x={xScale(d.station)}
                y={yScale(d.start)}
                width={xScale.bandwidth()}
                height={height - yScale(d.start)}
                fill={getColor(d.station)}
                stroke={'black'}
                onMouseEnter={() => mouseEnter(d.station)}
                onMouseOut={mouseOut}
            />
        ))} 
            </g>
    } else {
        return <g></g>
    }
}

export default Bars