var HicHistogram = function( config ) {
    this.config = JSON.parse( JSON.stringify(config) );
    
    var graph = d3.select("#graph")
    .append("svg")
    .attr("id", "canvas")
    .attr("width", 1800)
    .attr("width", 640);

    
    var data = [{score:0, frequency:100}, {score:1, frequency:80}];
    
    
    var HEIGHT = 640;
    var WIDTH = 1800;
    var PADDING = 5;

    var dataset = [];
	for(var i=0; i<data.length; i++) {
		dataset.push( [data[i].score, data[i].frequency] );
	}
    
	var yScale = d3.scale.linear()
	.domain( [d3.min(dataset, (d)=> d[1]), d3.max(dataset, (d)=> d[1])] )
	.range([HEIGHT - (PADDING), PADDING]);

	var xScale = d3.scale.linear()
	.domain( [d3.min(dataset, (d)=> d[0]), d3.max(dataset, (d)=> d[0])] )
	.range([PADDING, (WIDTH-PADDING)]);
	
	
	
	console.log( yScale );
};


$(document).ready(function () {
	$("#btn_run").click(function(){
		$.ajax({
			type: 'post',
			url: 'project/get_data.jsp',
			dataType: 'json',
			success:function(data) {
			}
		});
	});

	var config = {

	};

	var histogram = new HicHistogram(config);
});