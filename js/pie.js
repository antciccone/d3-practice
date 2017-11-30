  var colors = d3.scaleOrdinal(d3.schemeCategory10);
  var data = [1, 1, 2, 3, 5, 8, 13, 21];
  var pies = d3.pie()(data);

  var arc = d3.arc()
    .innerRadius(50)
    .outerRadius(150)
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle);

  var svg = d3.select('svg')
  	.append('g')
  	.attr('transform', 'translate(200,200)');
  svg.selectAll('path')
  	.data(pies).enter().append('path')
  	.attr('d', arc)
  	.attr('fill', (d, i) => colors(d.value))
  	.attr('stroke', '#fff');
