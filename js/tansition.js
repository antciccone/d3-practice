  var radius = 10;
  var duration = 1500;
  var width = 800;
  var height = 600;
  var svg = d3.select('body').append('svg');
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // scales
  xScale = d3.scaleBand()
  	.rangeRound([0, width]);
  yScale = d3.scaleLinear()
  	.range([height, 0])


  function update(data, year){
    data = data.filter(function(d){
      return d.year === year
    })
    var t = d3.transition().duration(2500)
    var circles = svg.selectAll('circle')
      .data(data, d =>  d.key)

    circles.exit()
      .transition(t)
      .attr('r', 0)
      .remove()

    var enter = circles.enter().append('circle')
      .attr('r', radius)
      .merge(circles)
      .attr('cx', d => xScale(d.site))
      .transition(t)
      .attr('cy', d => yScale(d.yield))
      .attr('fill', d => colorScale(d.gen))
  }

  d3.csv('./data/barelyfull.csv', function(err, response){
		response.forEach(function(d){
      d.year = +d.year;
      d.yield = +d.yield;
      // use gen and site as the unique key for each datum
      d.key = `${d.site}:${d.gen}`
    })

    xDomain = response.map(function(d) { return d.site})

     // domain() returns an array for ur labeled axis
    xScale.domain(xDomain);

     // extent() eturns an array of the y min and y max
    var yExtent = d3.extent(response, d => d.yield)

    // d3.max and d3.min get the max and min from your data
    var yMax = d3.max(response, d => d.yield)
    yScale.domain([0, yMax])

    var startYear = 1927
    var numYears = 9
    var index = 0
    update(response, startYear)
  })
