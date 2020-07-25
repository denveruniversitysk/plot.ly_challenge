// Creating function buildGauge
function buildGauge(washes) {
    
    console.log(washes)

  // Creating variable dataGauge
    var dataGauge = [
        {
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "850000" },
            showlegend: false,
            name: "Freq",
            text: washes,
            hoverinfo: "text+name"
          },
        {
        
        type: 'pie',
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        direction: 'clockwise',
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            colors: [
                "rgba(0, 105, 11, .5)",
                "rgba(10, 120, 22, .5)",
                "rgba(14, 127, 0, .5)",
                "rgba(110, 154, 22, .5)",
                "rgba(170, 202, 42, .5)",
                "rgba(202, 209, 95, .5)",
                "rgba(210, 206, 145, .5)",
                "rgba(232, 226, 202, .5)",
                "rgba(240, 230, 215, .5)",
                "rgba(255, 255, 255, 0)"
              ],
          labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
          hoverinfo: 'label'
        },
      }
    ]
      // Creating needle for gauge chart
      var degrees = 180 - (washes * 20)
      var radius = .5
      var radians = degrees * Math.PI / 180
      var x = radius * Math.cos(radians) 
      var y = radius * Math.sin(radians)

      var mainPath = "M -.0 -0.05 L .0 0.05 L ";
      var pathX = String(x);
      var space = " ";
      var pathY = String(y);
      var pathEnd = " Z";
      var path = mainPath.concat(pathX, space, pathY, pathEnd);
  
      // Creating variable gaugeLayout and modifying layout specifications  
      var gaugeLayout = {
        shapes: [{
          type: 'path',
          path: path,
          fillcolor: "850000",
          line: {
            color: "850000",
            width: 3,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
              },
          }
          
        }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [-1, 1]}
      }
  
      // Plotting gauge chart
      Plotly.newPlot('gauge', dataGauge, gaugeLayout)
  
}