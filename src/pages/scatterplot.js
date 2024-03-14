import * as d3 from 'd3';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/c2704a1ae38c0a36983bc13121050dac/raw/7fd577be21752939375d92cd3a808558106e903b/oldFaithfulGeyserDataset.csv'
// const csvUrl = "/data/oldFaithfulGeyserDataset.csv"

function useData(csvPath) {
    const [dataAll, setData] = React.useState(null);
    React.useEffect( () => {
        d3.csv(csvPath).then(data => {     
            data.forEach( d => {
                d.eruptions = +d.eruptions;
                d.waiting = +d.waiting;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function Points(props) {
    const { r, c, data, xScale, yScale } = props;
    const [selectPoint, setSelectPoint] = React.useState(null);

    const mouseOver = (d) => {
        setSelectPoint(d.index);
    };
    const mouseOut = () => {
        setSelectPoint(null);
    };
    // console.log(data);
    const radius = d => d.index === selectPoint ? 10:r;
    const color = d => d.index === selectPoint ? 'red':c;

    return <g>
        {data.map(d => {
            return <circle key={d.index} cx={xScale(d.waiting)} cy={yScale(d.eruptions)} 
            onMouseOver={()=>mouseOver(d)} onMouseOut={mouseOut} r={radius(d)} fill={color(d)} stroke={'black'} />
        })}
    </g>
}

function XAxis(props) {
    const {xScale, width, height} = props;
    const ticks = xScale.ticks();
    return <g>
        <line x1={0} x2={width} y1={height} y2={height} stroke={'black'} />
        {ticks.map( tickValue => {
                return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height+20})`}>
                    <line y1={-20} y2={-30} stroke={'black'} />
                    <text style={{ textAnchor:'end', fontSize:'18px'}}>
                        {tickValue}
                    </text>
                </g>
            })
        }
    </g>
}

function YAxis(props) {
    const {yScale, height} = props;
    const ticks = yScale.ticks(10);
    console.log(ticks);
    return <g>
        <line y2={height} stroke={'black'} />
        {
            ticks.map( tickValue => {
                return <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                    <line x2={10} stroke={'black'} />
                    <text style={{ textAnchor:'end', fontSize:'18px'}}>
                        {tickValue}
                    </text>
                </g>
            })
        }
    </g>
}

function ScatterPlot(props) {
    const WIDTH = 800;
    const HEIGHT = 600;
    const margin = {
        top: 50,
        bottom: 50,
        left: 100,
        right: 50
    }
    const data = useData(csvUrl);
    if (!data) {
        // console.log("data is", data);
        return <pre>Loading</pre>
    };
    console.log(data.forEach(d => {
        d.index = +d.index;
    }));
    console.log(data);
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;


    const xScale = d3.scaleLinear().range([0, width])
        .domain([0, d3.max(data, d => d.waiting)]).nice();
    const yScale = d3.scaleLinear().range([height, 0])
    .domain([0, d3.max(data, d => d.eruptions)]).nice();

    return <div className='row'>
        <div className='col-lg-6'>
            <svg width={'100%'} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <Points r={5} c={"steelblue"} data={data} xScale={xScale} yScale={yScale} />
                    <XAxis xScale={xScale} width={width} height={height}/>
                    <YAxis yScale={yScale} height={height}/>
                </g>
            </svg>
        </div>
    </div>
}

export default ScatterPlot