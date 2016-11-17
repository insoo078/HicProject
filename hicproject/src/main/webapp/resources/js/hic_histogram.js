var HicHistogram = function( config ) {
    this.config = JSON.parse( JSON.stringify(config) );

    var div = $("#graph");

    var graph = d3.select("#graph")
    .append("svg")
    .attr("id", "canvas")
    .attr("viewBox","0 0 " + div.width() +" " + div.height() )
    ;
};


$(document).ready(function () {
	$("#btn_run").click(function(){
		$.ajax({
			type: 'post',
			url: 'get_data',
			dataType: 'json',
			success:function(data) {
			    var HEIGHT = $("#canvas").height();
			    var WIDTH = $("#canvas").width();
			    var PADDING = 100;

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
				
				
				var line = d3.svg.line()
			    .x(function(d) { return xScale(d.bin); })
			    .y(function(d) { return yScale(d.count); });

				canvas.append("path")
			      .data([data.pairList])
			      .attr("class", "line")
				.attr("d", line);
				
				console.log( data );
				console.log( (data.endPt - data.startPt +1) / 1000 );

//				for( var i=data.startPt; i<=data.endPt; i+=1000) {
//					console.log(i);
//				}
			}
		});
	});

	var config = {

	};

	var histogram = new HicHistogram(config);
});