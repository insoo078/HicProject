var HicHistogram = function( config ) {
    this.config = JSON.parse( JSON.stringify(config) );

    var div = $("#graph");

    var graph = d3.select("#graph")
    .append("svg")
    .attr("id", "canvas")
    .attr("viewBox","0 0 " + div.width() +" " + div.height() )
    ;
};


HicHistogram.prototype.init = function( ) {
	var obj = this;

	$("#input").focus(function(){
		$(this).val('');
	});
	$("#input").blur(function(){
		if( $(this).val() === '' ) {
			$(this).val('BRCA1');
		};
	});
	
	$("#btn_run").click(function(){
		var param = $("#input").val();
		if( param === '' ) {
			alert('You have to input a gene symbol or loci');
			$('#input').focus();
			return;
		}
		var boundary = $("#boundary_range").val();
		
		obj.checkParam( param );
	});
};

HicHistogram.prototype.checkParam = function( param ) {
	if( param.startsWith('chr') && param.indexOf(":") ) {
		console.log("Alright it is loci");
	}else {
		// gene symbol
		this.checkHowManyGenesAreThere( param );
	}
};

HicHistogram.prototype.checkHowManyGenesAreThere = function( param ) {
	$.ajax({
		type: 'post',
		url: 'get_gene_symbols',
		data: {symbol:param},
		dataType: 'json',
		success:function(data) {
			var content = $("#gene_list_dialog .dialog-content");
			for(var i in data ) {
				content.append("<div>" + param + " " + data[i].chrom + ":" + data[i].txStart + "-" + data[i].txEnd + "</div>");
			}
//			$("#gene_list_dialog .dialog-content").text( data );
		}
	});
}


HicHistogram.prototype.getData = function() {
//	$.ajax({
//	type: 'post',
//	url: 'get_data',
//	dataType: 'json',
//	success:function(data) {
//	    var HEIGHT = $("#canvas").height();
//	    var WIDTH = $("#canvas").width();
//	    var PADDING = 100;
//
//		var yScale = d3.scale.linear()
//		.domain( [0, data.maxFreq] )
//		.range([HEIGHT - (PADDING), PADDING]);
//
//		
//		
//		var xScale = d3.scale.linear()
//		.domain( [data.startPt, data.endPt] )
//		.range([PADDING, (WIDTH-PADDING)]);
//		
//		var yAxis = d3.svg.axis()
//		.orient('left')
//		.scale(yScale)
//		;
//
//		var xAxis = d3.svg.axis()
//		.orient('bottom')
//		.scale(xScale)
//		;
//
//		var canvas = d3.select("#canvas");
//
//		canvas.append('g')
//		.attr('class', 'axis')
//		.attr('transform', 'translate(' + (PADDING) + ', 0)')
//		.call(yAxis);
//
//		canvas.append('g')
//		.attr('class', 'axis')
//		.attr("transform", "translate(0, " + (HEIGHT-PADDING) + ")")
//		.call(xAxis);
//		
//		
//		var line = d3.svg.line()
//	    .x(function(d) { return xScale(d.bin); })
//	    .y(function(d) { return yScale(d.count); });
//
//		canvas.append("path")
//	      .data([data.pairList])
//	      .attr("class", "line")
//		.attr("d", line);
//	}
//});
};

$(document).ready(function () {
	var config = {

	};

	var histogram = new HicHistogram(config);
	histogram.init();
});