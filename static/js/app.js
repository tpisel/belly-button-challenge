let metadata, samples, names;

// Use the D3 library to read in samples.json from the URL provided
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// controller + data load
d3.json(url).then(function (data) {
    
    metadata = data.metadata;
    samples = data.samples;
    names = data.names;
    
    // selector object (from names / test subject IDs)
    let selector = d3.select("#selDataset");
    names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });

    // invoke viz (first item)
    viz_infobox(metadata[0]);
    viz_hbar(samples[0]);
    viz_bubble(samples[0]);
    viz_gauge(metadata[0]);

})
.catch(error => console.error('Error fetching data:', error));
;

// controller update
function optionChanged(value) {
    const samples_row = samples.find((item) => item.id == value);
    const metadata_row = metadata.find((item) => item.id == value);

    // update viz
    viz_infobox(metadata_row);
    viz_hbar(samples_row);
    viz_bubble(samples_row);
    viz_gauge(metadata_row);
}

// hbar plot
function viz_hbar(samples_row) {
    let x_axis = samples_row.sample_values.slice(0, 10).reverse();
    let y_axis = samples_row.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = samples_row.otu_labels.slice(0, 10).reverse();

    let barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 450,
        width: 550,
    };

    Plotly.newPlot("bar", [barChart], layout);
}

// bubble plot
function viz_bubble(samples_row) {
    let x_axis = samples_row.otu_ids;
    let y_axis = samples_row.sample_values;
    let marker_size = samples_row.sample_values;
    let color = samples_row.otu_ids;
    let text = samples_row.otu_labels;

    let bubbleChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            size: marker_size,
        },
        type: "scatter",
    };

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", [bubbleChart], layout);
}

// infobox
function viz_infobox(metadata_row) {
    d3.select("#sample-metadata").html(
    `id: ${metadata_row.id} <br> 
    ethnicity: ${metadata_row.ethnicity} <br>
    gender: ${metadata_row.gender} <br>
    age: ${metadata_row.age} <br>
    location: ${metadata_row.location} <br>
    bbtype: ${metadata_row.bbtype} <br>
    wfreq: ${metadata_row.wfreq}`
    );
}


