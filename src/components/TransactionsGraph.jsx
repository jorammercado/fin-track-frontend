import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Graph = ({ checking = [], savings = [],
    investments = [] }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const graphRef = useRef(null);

    useEffect(() => {
        d3.select("#my_dataviz svg").remove();
        let margin = { top: 60, right: 115, bottom: 50, left: 50 },
            width = ((
                screenWidth > 1660 ? 1400 :
                screenWidth <= 1660 && screenWidth > 1560 ? 1350 :
                screenWidth <= 1560 && screenWidth > 1460 ? 1300 :
                screenWidth <= 1460 && screenWidth > 1360 ? 1250 :
                screenWidth <= 1360 && screenWidth > 1280 ? 1200 :
                screenWidth <= 1280 && screenWidth > 1215 ? 1150 :
                screenWidth <= 1215 && screenWidth > 1165 ? 1100 :
                screenWidth <= 1165 && screenWidth > 1100 ? 1065 :
                screenWidth <= 1100 && screenWidth > 1024 ? 1000 :
                screenWidth <= 1024 && screenWidth > 950 ? 930 :
                screenWidth <= 950 && screenWidth > 890 ? 870 :
                screenWidth <= 890 && screenWidth > 840 ? 820 :
                screenWidth <= 840 && screenWidth > 790 ? 770 :
                screenWidth <= 790 && screenWidth > 740 ? 720 :
                screenWidth <= 740 && screenWidth > 700 ? 680 :
                screenWidth <= 700 && screenWidth > 650 ? 630 :
                screenWidth <= 650 && screenWidth > 615 ? 590 :
                screenWidth <= 615 && screenWidth > 570 ? 550 :
                screenWidth <= 570 && screenWidth > 540 ? 520 :
                screenWidth <= 540 && screenWidth > 520 ? 500 :
                screenWidth <= 520 && screenWidth > 500 ? 480 :
                screenWidth <= 500 && screenWidth > 480 ? 460 :
                screenWidth <= 480 && screenWidth > 460 ? 440 :
                screenWidth <= 460 && screenWidth > 440 ? 420 :
                screenWidth <= 440 && screenWidth > 420 ? 400 :
                screenWidth <= 420 && screenWidth > 400 ? 380 :
                screenWidth <= 400 && screenWidth > 380 ? 360 :
                screenWidth <= 380 && screenWidth > 370 ? 355 :
                330
            ) - margin.left - margin.right),
            height = 275 - margin.top - margin.bottom;

        let svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#09213A");

        const data = []
        if (checking.length > 0) {
            for (let i = 0; i < checking.length; i++) {
                data.push({
                    x: i,
                    checking: checking[i],
                    savings: savings[i],
                    investments: investments[i]
                })
            }
        }

        //////////
        // GENERAL //
        //////////

        if (data.length === 0) {
            return;
        }

        // List of groups
        let keys = Object.keys(data[0]).filter(key => key !== 'x');

        // Color palette
        let color = d3.scaleOrdinal()
            .domain(keys)
            .range([
                "#07a",
                "#2ca8e2",
                "#1480d8"
            ].reverse());

        // Store visibility status of each group
        let visible = {
            checking: true,
            savings: true,
            investments: true,
        };

        //////////
        // AXIS //
        //////////

        // Add X axis
        let x = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.x; }))
            .range([0, width]);
        let xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(15));

        xAxis.selectAll("text").style("fill", "white");
        xAxis.selectAll("line").style("stroke", "white");
        xAxis.selectAll("path").style("stroke", "white");

        svg.selectAll(".domain").style("stroke", "white"); // Adjust domain line color
        svg.selectAll("line").style("stroke", "white");

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width + 20)
            .attr("y", height + 41)
            .style("fill", "white")
            .text("transaction (date added)");

        // Add Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", -20)
            .attr("y", -15)
            .style("fill", "white")
            .text("amount")
            .attr("text-anchor", "start");

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([d3.min(data, d => d3.min(keys, key => d[key])),
            d3.max(data, d => d3.max(keys, key => d[key]))])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y).ticks(10));

        // Add Y axis and save the selection to a letiable
        let yAxis = svg.append("g")
            .call(d3.axisLeft(y).ticks(10));

        // Apply white color styles to Y axis
        yAxis.selectAll("text").style("fill", "white");
        yAxis.selectAll("line").style("stroke", "white");
        yAxis.selectAll("path").style("stroke", "white");


        //////////
        // CHART //
        //////////

        // Create clip path
        // let clipPath = svg.append("defs")
        //   .append("clipPath")
        //   .attr("id", "clip")
        //   .append("rect")
        //   .attr("width", width)
        //   .attr("height", height);

        // Area generator with curve interpolation
        let area = d3.area()
            .x(function (d) { return x(d.x); })
            .y0(function () { return y(0); }) // Fix y0 position
            .y1(function (d) { return y(d.value); })
            .curve(d3.curveLinear);

        // Show the areas
        keys.forEach(key => {
            svg.append("path")
                .datum(data)
                .attr("fill", color(key))
                .attr("fill-opacity", 0.5)
                .attr("stroke", color(key))
                .attr("stroke-width", 2)
                .attr("class", key) // Added class for each path
                .attr("d", area.y1(function (d) { return y(d[key]); })(data))
                .style("opacity", visible[key] ? 1 : 0);
        });

        // Add the points
        keys.forEach(key => {
            svg.selectAll("." + key + "Point")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", key + "Point")
                .attr("cx", function (d) { return x(d.x); })
                .attr("cy", function (d) { return y(d[key]); })
                .attr("r", 2)
                .style("fill", color(key))
                .style("opacity", visible[key] ? 1 : 0);
        });

        //////////
        // LEGEND //
        //////////

        // Add legend dots
        let legend = svg.selectAll(".legend")
            .data(keys)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + 8)
            .attr("y", function (d, i) { return i * 20; })
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", color);

        // Add checkbox squares
        legend.append("rect")
            .attr("x", width + 8)
            .attr("y", function (d, i) { return i * 20; })
            .attr("width", 15)
            .attr("height", 15)
            .attr("cursor", 'pointer')
            .attr("rx", 3)
            .attr("ry", 3)
            .style("fill", color)
            .style("stroke", color)
            .style("stroke-width", 2)
            .on("click", function (event, d) {
                // Toggle visibility
                visible[d] = !visible[d];

                // Update path and point visibility
                svg.selectAll("." + d)
                    .transition()
                    .duration(500)
                    .style("opacity", visible[d] ? 1 : 0);

                svg.selectAll("." + d + "Point")
                    .transition()
                    .duration(500)
                    .style("opacity", visible[d] ? 1 : 0);

                // Toggle checkmark
                if (visible[d]) {
                    d3.select(this).style("fill", color);
                } else {
                    d3.select(this).style("fill", "white");
                }
            });

        legend.append("text")
            .attr("x", width + 30)
            .attr("y", function (d, i) { return i * 20 + 9; })
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .style("fill", "white")
            .text(function (d) { return d; })
            .each(function () {
                if (screenWidth <= 440) {
                    d3.select(this).style("font-size", "9px");
                }
                else if (screenWidth <= 520) {
                    d3.select(this).style("font-size", "11px");
                }
                else {
                    d3.select(this).style("font-size", "12px");
                }
            });

        //////////
        // BRUSHING AND CHART //
        //////////

        let idleTimeout;
        // Add brushing
        let brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("end", updateChart);

        svg.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.move, [0, width]); // Initially show the full chart

        function idled() { idleTimeout = null; }

        // A function that updates the chart for given boundaries
        function updateChart(event) {
            let extent = event.selection;

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain(d3.extent(data, function (d) { return d.x; }));
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])]);
                svg.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and area position
            xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(15))
                .selectAll("text").style("fill", "white");
            xAxis.selectAll("line").style("stroke", "white");
            xAxis.selectAll("path").style("stroke", "white");

            svg.selectAll(".domain").style("stroke", "white");
            svg.selectAll("line").style("stroke", "white");

            keys.forEach(key => {
                svg.select("." + key)
                    .transition().duration(1000)
                    .attr("d", area.y0(y(0)).y1(function (d) { return y(d[key]); })(data));
            });

            // Update points
            keys.forEach(key => {
                svg.selectAll("." + key + "Point")
                    .attr("cx", function (d) { return x(d.x); })
                    .attr("cy", function (d) { return y(d[key]); });
            });
        }

        // Set the graphRef to true so it won't render again
        graphRef.current = true;
        // }
    }, [checking, savings, investments, screenWidth]);

    return (
        <div style={{
            backgroundColor: "#09213A",
            paddingBottom: "15px",
            borderRadius: "5px",
            marginBottom: "40px",
            marginTop: "-70px",
            fontFamily: "Roboto-Thin",
        }} id="my_dataviz"></div>
    );
};

export default Graph;
