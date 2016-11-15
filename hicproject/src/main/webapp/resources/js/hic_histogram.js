var HicHistogram = function( config ) {
    this.config = JSON.parse( JSON.stringify(config) );
    
    var graph = d3.select("#graph")
    .append("svg")
    .attr("id", "canvas")
    .attr("width", 1800)
    .attr("width", 640);
};


$(document).ready(function () {
	$("#btn_run").click(function(){
		$.ajax({
			type: 'post',
			url: 'get_data',
			dataType: 'json',
			success:function(data) {
			    var HEIGHT = 640;
			    var WIDTH = 1800;
			    var PADDING = 5;

				var yScale = d3.scale.linear()
				.domain( [0, data.maxFreq] )
				.range([HEIGHT - (PADDING), PADDING]);

				var xScale = d3.scale.linear()
				.domain( [data.startPt, data.endPt] )
				.range([PADDING, (WIDTH-PADDING)]);
				
				var yAxis = d3.svg.axis()
				.orient('left')
				.scale(yScale)
				;
		
				var xAxis = d3.svg.axis()
				.orient('bottom')
				.scale(xScale)
				;
				
				var canvas = d3.select("#canvas");

				canvas.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + (PADDING) + ', 0)')
				.call(yAxis);
		
				canvas.append('g')
				.attr('class', 'axis')
				.attr("transform", "translate(0, " + (HEIGHT-PADDING) + ")")
				.call(xAxis);
			}
		});
	});

	var config = {

	};

	var histogram = new HicHistogram(config);
});