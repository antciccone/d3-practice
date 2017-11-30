var rectWidth = 150;
var height = 300;
var data = [100, 250, 175, 200, 120, 50];


d3.select('svg').selectAll('rect')
  .data(data).enter().append('rect')
  .attr('x', (d, i) => i * rectWidth)
  .attr('y', function(d){return height - d})
  .attr('width', rectWidth)
  .attr('height', function(data){ return data })
  .attr('fill', function(data) {
    if (data === 250) return "red"
    return 'orange'
  })
  .attr('stroke', '#000000');
