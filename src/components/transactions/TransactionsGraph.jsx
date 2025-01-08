import { useEffect } from 'react'
import * as d3 from 'd3'
import useScreenWidth from '../../hooks/useScreenWidth'
import { calculateGraphWidth } from '../../utils/graphUtils'
import './TransactionsGraph.scss'

const Graph = ({ checking = [], savings = [], investments = [] }) => {
    const screenWidth = useScreenWidth()

    useEffect(() => {
        // Prevent double rendering of graph when using React Strict Mode
        d3.select('#my_dataviz svg').remove()

        const margin = { top: 60, right: 115, bottom: 50, left: 50 }
        const width = calculateGraphWidth(screenWidth, margin)
        const height = 275 - margin.top - margin.bottom

        // Create an SVG container with specified dimensions and margins for proper alignment
        // (canvas and layout)
        const svg = d3.select('#my_dataviz')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')')

        // Add a background rectangle to the SVG with specified dimensions and a fill color
        // (add a visual element inside the canvas)
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', '#09213A')

        // Parse input data into the required format for the graph:
        /* [
                { checking: 0, investments: 0, savings: 0, x: 0 },
                { checking: 5000, investments: 0, savings: 0, x: 1 },
                { checking: 5000, investments: 0, savings: 3000, x: 2 },
                ...
            ] 
        */
        const data = []
        if (checking.length > 0) {
            checking.forEach((value, i) => {
                data.push({
                    x: i,
                    checking: value, 
                    savings: savings[i],
                    investments: investments[i]
                })
            })

        }

        //////////
        // GENERAL //
        //////////

        // Check if there is data to render, otherwise exit early.
        if (data.length === 0) {
            return
        }

        // Extract data group keys ( ['checking', 'savings', 'investments'] ) 
        // from the first object in the dataset, excluding 'x' which represents the x-axis values.
        const keys = Object.keys(data[0]).filter(key => key !== 'x')

        // Color palette
        const color = d3.scaleOrdinal()
            .domain(keys)
            .range([
                '#07a',
                '#2ca8e2',
                '#1480d8'
            ].reverse())

        // Store visibility status of each group
        let visible = {
            checking: true,
            savings: true,
            investments: true,
        }

        //////////
        // AXIS //
        //////////

        // Add X axis
        const x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.x })) // Get the min and max of 'x' values
            .range([0, width]) // Map data to the width of the chart
        const xAxis = svg.append('g')
            .attr('transform', 'translate(0,' + height + ')') // Position at the bottom of the chart
            .call(d3.axisBottom(x).ticks(15)) // Create bottom axis with 15 ticks

        // Style X axis
        xAxis.selectAll('text').style('fill', 'white')
        xAxis.selectAll('line').style('stroke', 'white')
        xAxis.selectAll('path').style('stroke', 'white')

        // Add X axis label
        svg.append('text')
            .attr('text-anchor', 'end')
            .attr('x', width + 20)
            .attr('y', height + 41)
            .style('fill', 'white')
            .style('font-size', '13px')
            .text('transaction (date added order)')

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([
                d3.min(data, d => d3.min(keys, key => d[key])), // Min value across all keys
                d3.max(data, d => d3.max(keys, key => d[key]))]) // Max value across all keys
            .range([height, 0]) // Map data to the height of the chart
        svg.append('g')
            .call(d3.axisLeft(y).ticks(10)) // Y axis (line) ticks

        const yAxis = svg.append('g')
            .call(d3.axisLeft(y).ticks(10)) // Create left Y-axis with 10 (numbered) ticks 

        // Style Y axis
        yAxis.selectAll('text').style('fill', 'white')
        yAxis.selectAll('line').style('stroke', 'white')
        yAxis.selectAll('path').style('stroke', 'white')

        // Add Y axis label:
        svg.append('text')
            .attr('text-anchor', 'end')
            .attr('x', -20)
            .attr('y', -15)
            .style('fill', 'white')
            .text('amount')
            .attr('text-anchor', 'start')

        //////////
        // CHART //
        //////////

        // Area generator with curve interpolation
        const area = d3.area()
            .x(function (d) { return x(d.x) }) // Map the x-coordinate based on the 'x' field in the data
            .y0(function () { return y(0) }) // Set the baseline (y0) of the area to 0
            .y1(function (d) { return y(d[key]) }) // Set the upper boundary (y1) based on the current key's value
            .curve(d3.curveLinear)

        // Render the area paths for each group (e.g., checking, savings, investments)
        keys.forEach(key => {
            svg.append('path')
                .datum(data)
                .attr('fill', color(key))
                .attr('fill-opacity', 0.5)
                .attr('stroke', color(key))
                .attr('stroke-width', 2)
                .attr('class', key)
                .attr('d', area.y1(function (d) { return y(d[key]) })(data))
                .style('opacity', visible[key] ? 1 : 0)
        })

        // Add individual points for each group (circle markers for data points)
        keys.forEach(key => {
            svg.selectAll('.' + key + 'Point')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', key + 'Point')
                .attr('cx', function (d) { return x(d.x) })
                .attr('cy', function (d) { return y(d[key]) })
                .attr('r', 2)
                .style('fill', color(key))
                .style('opacity', visible[key] ? 1 : 0)
        })

        //////////
        // LEGEND //
        //////////

        // Add legend groups for each data key
        const legend = svg.selectAll('.legend')
            .data(keys) // Bind data keys (e.g., checking, savings, investments)
            .enter().append('g') // Create a group (g element) for each key
            .attr('class', 'legend') // Add class to identify legend groups
            .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')' }) // Position legend groups vertically

        // Add colored rectangles (legend dots) for each key
        legend.append('rect')
            .attr('x', width + 8)
            .attr('y', function (d, i) { return i * 20 })
            .attr('width', 15)
            .attr('height', 15)
            .style('fill', color)

        // Add interactive checkbox squares (toggle visibility)
        legend.append('rect')
            .attr('x', width + 8)
            .attr('y', function (d, i) { return i * 20 })
            .attr('width', 15)
            .attr('height', 15)
            .attr('cursor', 'pointer')
            .attr('rx', 3) // Round rectangle corners
            .attr('ry', 3) // Round rectangle corners
            .style('fill', color)
            .style('stroke', color)
            .style('stroke-width', 2)
            .on('click', function (event, d) { // Add click event for toggling visibility
                // Toggle visibility of the current key
                visible[d] = !visible[d]

                // Update path visibility
                svg.selectAll('.' + d)
                    .transition()
                    .duration(500)
                    .style('opacity', visible[d] ? 1 : 0)

                // Update point visibility
                svg.selectAll('.' + d + 'Point')
                    .transition()
                    .duration(500)
                    .style('opacity', visible[d] ? 1 : 0)

                // Toggle the fill color of the checkbox (colored or white)
                if (visible[d]) {
                    d3.select(this).style('fill', color)
                } else {
                    d3.select(this).style('fill', 'white')
                }
            })

        // Add text labels for each legend group
        legend.append('text')
            .attr('x', width + 30)
            .attr('y', function (d, i) { return i * 20 + 9 })
            .attr('dy', '.35em')
            .style('text-anchor', 'start')
            .style('fill', 'white')
            .text(function (d) { return d })
            .each(function () {
                if (screenWidth <= 440) {
                    d3.select(this).style('font-size', '9px')
                }
                else if (screenWidth <= 520) {
                    d3.select(this).style('font-size', '11px')
                }
                else {
                    d3.select(this).style('font-size', '12px')
                }
            })

        //////////
        // BRUSHING AND CHART //
        //////////

        let idleTimeout // Variable to prevent rapid updates when no selection is made

        // Add brushing functionality
        const brush = d3.brushX()
            .extent([[0, 0], [width, height]]) // // Define brushable area (entire chart width and height)
            .on('end', updateChart) // Trigger chart update on brush end

        // Add brush to the chart
        svg.append('g')
            .attr('class', 'brush') // Add a brush group element for user interaction
            .call(brush) // Initialize the brush functionality
            .call(brush.move, [0, width]) // Set initial brushing range to cover the full chart

        // Function to reset idle timeout
        function idled() { idleTimeout = null }

        // Function to update chart based on brushing
        function updateChart(event) {
            const extent = event.selection // Get the selection area (brushed area)

            if (!extent) {
                // If no selection, reset to initial x-axis domain after a short delay
                if (!idleTimeout) {
                    idleTimeout = setTimeout(idled, 350) // Wait for a brief period to avoid rapid updates
                    return
                }
                x.domain(d3.extent(data, d => d.x)) // Reset x-axis to full extent of data
            } else {
                // Update x-axis domain to match the brushed selection range
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                svg.select('.brush').call(brush.move, null) // Clear the brushed area visually
            }

            // Update the x-axis to reflect the new domain
            xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(15)) // Animate x-axis update
                .selectAll('text').style('fill', 'white')
            xAxis.selectAll('line').style('stroke', 'white')
            xAxis.selectAll('path').style('stroke', 'white')

            svg.selectAll('.domain').style('stroke', 'white')
            svg.selectAll('line').style('stroke', 'white')

            // Update paths (areas) for all keys to reflect new x-axis domain
            keys.forEach(key => {
                svg.select('.' + key)
                    .transition().duration(1000) // Animate area updates
                    .attr('d', area.y0(y(0)).y1(function (d) { return y(d[key]) })(data))  // Update path data
            })

            // Update points for all keys to reflect new x-axis domain
            keys.forEach(key => {
                svg.selectAll('.' + key + 'Point')
                    .attr('cx', function (d) { return x(d.x) }) // Adjust x-position of points
                    .attr('cy', function (d) { return y(d[key]) }) // Adjust y-position of points
            })
        }

    }, [checking, savings, investments, screenWidth])

    return (
        <div id="my_dataviz"></div>
    )
}

export default Graph