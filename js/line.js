var city = 'New York';
    var width = 800;
    var height = 300;
    var margin = {top: 20, bottom: 20, left: 20, right: 20};

    // dataset of city temperatures across time
    d3.tsv('./data/data2.tsv', (err, data) => {
      // clean the data
      data = data.slice(0,100)
      data.forEach(d => {
        d.date = d3.timeParse("%Y%m%d")(d.date);
        d.date = new Date(d.date); // x
        d[city] = ++d[city]; // y
      });

      // scales
      var xExtent = d3.extent(data, d => d.date);

      var xScale = d3.scaleTime()
      	.domain(xExtent)
      	.range([margin.left, width - margin.right]);

      var xAxis = d3.axisBottom()
      	.scale(xScale)
      	.tickFormat(d => d3.timeFormat('%b, %Y')(d));

      var yExtent = d3.extent(data, d => d[city]);
      var yMax = d3.max(data, d => d[city]);

      var yScale = d3.scaleLinear()
      	.domain([0, yMax])
      	.range([height - margin.bottom, margin.top]);

      var heightScale = d3.scaleLinear()
      	.domain([0, yMax])
      	.range([0, height - margin.top - margin.bottom])

      var yAxis = d3.axisLeft()
      	.scale(yScale);

      // create the line
      var line = d3.line()
      	.x(d => xScale(d.date))
      	.y(d => yScale(d[city]))
      	.curve(d3.curveNatural)
      var svg = d3.select('svg');

      svg.append('path')
      	.attr('d', line(data))
      	.attr('fill', 'none')
      	.attr('stroke', 'black');

       svg.append('g')
      	.attr('transform', 'translate(' + [margin.left, 0] + ')')
      	.call(yAxis);

       svg.append('g')
      	.attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      	.call(xAxis);

    });

