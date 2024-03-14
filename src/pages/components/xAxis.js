//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate




function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    if(xScale) {
        const isLinearScale = typeof xScale.domain()[0] === 'number';
        if (isLinearScale) {
            const ticks = xScale.ticks();
            return (
                <g>
                    <line x1={0} x2={width} y1={height} y2={height} stroke={'black'} strokeWidth={1} />
                    {ticks.map(tickValue => (
                        <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                            <line y2={10} stroke={'black'} />
                            <text y={17} style={{ textAnchor: 'middle', fontSize: '10px' }}>
                                {tickValue}
                            </text>
                        </g>
                    ))}

                    <text style={{ textAnchor: 'middle', fontSize: '18px' }} transform={`translate(460, 350)`}>
                        {axisLable}
                    </text>
                </g>
            );
        }else {
            const tickValues = xScale.domain();
            return (
                <g>
                    <line x1={0} x2={width} y1={height} y2={height} stroke={'black'} strokeWidth={1} />
                    {tickValues.map((tickValue, index) => (
                        <g key={index} transform={`translate(${xScale(tickValue) + xScale.bandwidth()}, ${height})`}>
                            <line y2={5} stroke={'black'} />
                            <text transform={`rotate(75)`} y={18} style={{ textAnchor: 'left', fontSize: '10px' }}>
                                {tickValue}
                            </text>
                        </g>
                    ))}
                </g>
            );

        }
    }else{
        return <g></g>;
    }
}


export default XAxis