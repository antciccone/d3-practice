var city = 'New York';
var width = 800;
var height = 300;
var margin = {top: 20, bottom: 20, left: 20, right: 20};

// dataset of city temperatures across time
d3.tsv('./data/data.tsv', (err, data) => {
  // clean the data
  data.forEach(d => {
    d.date = d3.timeParse("%Y%m%d")(d.date);
    d.date = new Date(d.date); // x
    ++d[city]; // y
    console.log(d[city])
  });


  //scales
  var xExtent = d3.extent(data, function (d){
    return d.date
  });
  var xScale = d3.scaleTime()
    .domain(xExtent)
    .range([margin.left, width - margin.right])

  var yExtent = d3.extent(data, function(d){
    return d[city]
  })
  var yscale = d3.scaleLinear()
    .domain(yExtent)
    .range([height- margin.bottom, margin.top])


  //create the regtangles
  var svg = d3.select('svg')
  var rect = svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('width', 5)
});

