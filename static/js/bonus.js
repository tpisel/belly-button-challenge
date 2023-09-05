function viz_gauge(metadata_row) { 
    
    let trace = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata_row.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 24 } },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "rgba(27,98,165,0.6)" },
            bar: { color: "blue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 1], color: "rgba(255,0,0,0.6)" },
                { range: [1, 2], color: "rgba(255,165,0,0.6)" },
                { range: [2, 3], color: "rgba(255,255,0,0.6)" },
                { range: [3, 4], color: "rgba(173,255,47,0.6)" },
                { range: [4, 5], color: "rgba(127,255,0,0.6)" },
                { range: [5, 6], color: "rgba(60,179,113,0.6)" },
                { range: [6, 7], color: "rgba(46,139,87,0.6)" },
                { range: [7, 8], color: "rgba(34,139,34,0.6)" },
                { range: [8, 9], color: "rgba(0,128,0,0.6)" },
            ]
        }
    }];

    Plotly.newPlot("gauge", trace);
}
