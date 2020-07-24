function optionChanged(id) {
    
    modifyCharts(id);
    buildMetadata(id);
}

function modifyCharts(id) {
    
    d3.json("samples.json").then(data => {
       
        var samples = data.samples
        var sample  = samples.filter(sample => sample.id === id.toString())[0]
        
        var barX = sample.sample_values.slice(0,10).reverse()
        var barY = sample.otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse()
        var bardata = [{
            x: barX,
            y: barY,
            text: sample.otu_labels.slice(0,10).reverse(), 
            type: "bar",
            orientation: "h"
        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            height: 600
        };

        Plotly.newPlot("bar", bardata, barLayout);

        
        var bubbleData = [{
            x: sample.otu_ids,
            y: sample.sample_values,
            text: sample.otu_labels, 
            mode: "markers",
            marker: {
                color: sample.otu_ids,
                colorscale: [
                    ['0.0', 'rgb(165,0,38)'],
                    ['0.111111111111', 'rgb(215,48,39)'],
                    ['0.222222222222', 'rgb(244,109,67)'],
                    ['0.333333333333', 'rgb(253,174,97)'],
                    ['0.444444444444', 'rgb(254,224,144)'],
                    ['0.555555555556', 'rgb(224,243,248)'],
                    ['0.666666666667', 'rgb(171,217,233)'],
                    ['0.777777777778', 'rgb(116,173,209)'],
                    ['0.888888888889', 'rgb(69,117,180)'],
                    ['1.0', 'rgb(49,54,149)']
                  ],
                size: sample.sample_values
            }
        }];

        var bubbleLayout = {
            xaxis: { title: "OTU ID" },
            showlegend: false,
            height: 600,
            weight: 600
        }

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    });
};

function buildMetadata(id) {
    d3.json("samples.json").then(data => {
        var item = data.metadata.filter(obj => obj.id === parseInt(id))[0];
        
        var htmlPanelElement = d3.select("#sample-metadata");

        htmlPanelElement.html("");
        
        Object.entries(item).forEach(([key, value]) => {
            htmlPanelElement.append("h6").text(`${key}, ${value}`)

        })
        
        buildGauge(item.wfreq);
    });
}

function init() {
    d3.json("samples.json").then(data => {
        var selector = d3.select("#selDataset")
        var metadataIds = data.metadata.map(obj => obj.id);
        metadataIds.forEach(metadataId => {
            selector
                .append("option")
                .text(metadataId)
                .property("value", metadataId)
        });

        
        var firstId = metadataIds[0]
        buildMetadata(firstId);
        modifyCharts(firstId)

    });

}
init()


  




