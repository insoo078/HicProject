var HicHistogram = function( config ) {
    this.config = JSON.parse( JSON.stringify(config) );

    var div = $("#graph");

    var graph = d3.select("#graph")
    .append("svg")
    .attr("id", "canvas")
    .attr("viewBox","0 0 " + div.width() +" " + div.height() )
    ;
};

HicHistogram.prototype.draw = function( data ) {
    var HEIGHT = $("#canvas").height();
    var WIDTH = $("#canvas").width();
    var PADDING = 100;

	var yScale = d3.scale.linear()
	.domain( [0, data.peakValue] )
	.range([HEIGHT - (PADDING), PADDING + 50]);

	var xScale = d3.scale.linear()
	.domain( [data.startPt, data.endPt] )
	.range([PADDING, (WIDTH-PADDING)]);

	var canvas = d3.select("#canvas");

	canvas.append("g")
	.append("rect")
	.attr('id', 'peakBaseRect')
	.attr('class', 'boundary')
	.attr('x', PADDING)
	.attr('y', PADDING)
	.attr('width', WIDTH - (2*PADDING))
	.attr('height', HEIGHT - (2*PADDING))
	;

	canvas.append('g')
	.append('line')
	.attr('class', 'bait')
	.attr('x1', xScale(data.bait))
	.attr('y1', PADDING)
	.attr('x2', xScale(data.bait))
	.attr('y2', HEIGHT - PADDING)
	;

	canvas.append('g')
	.selectAll('circle')
	.data(data.interactionPairs)
	.enter()
	.append('circle')
	.attr('cx', function(d, i) {
		return xScale(d.bin2);
	})
	.attr('cy', function(d, i){
		return yScale(d.count);
	})
	.attr('r', 2);
	
//	var yAxis = d3.svg.axis()
//	.orient('left')
//	.scale(yScale)
//	;
//
//	var xAxis = d3.svg.axis()
//	.orient('bottom')
//	.scale(xScale)
//	;
//
//	canvas.append('g')
//	.attr('class', 'axis')
//	.attr('transform', 'translate(' + (PADDING) + ', 0)')
//	.call(yAxis);
//
//	canvas.append('g')
//	.attr('class', 'axis')
//	.attr("transform", "translate(0, " + (HEIGHT-PADDING) + ")")
//	.call(xAxis);
//	
//	var line = d3.svg.line()
//    .x(function(d) { return xScale(d.bin2); })
//    .y(function(d) { return yScale(d.count); });
//
//	canvas.append("line")
//      .data([data.interactionPairs])
//      .attr("class", "line")
//	.attr("d", line);
	
	console.log(data);
}


HicHistogram.prototype.init = function( ) {
	var obj = this;

	$("#input").focus(function(){
		$(this).val('');
	});
	$("#input").blur(function(){
		if( $(this).val() === '' ) {
			$(this).val('chr1:566000');
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
		this.findInteractionPairs( param );
	}else {
		// gene symbol
		this.checkHowManyGenesAreThere( param );
	}
};

HicHistogram.prototype.findInteractionPairs = function( param ) {
	var data = param.split(":");
	var chr = data[0];
	var pos = data[1].split("-")[0];

	$("#gene_list_dialog").hide();
	
	var boundary_range = $("#boundary_range").val();
	var window_size = $("#window_size").val();
	var loci = chr + ":" + pos;
	
	this.findInteractionsAboutBait( loci, boundary_range, window_size );
};

HicHistogram.prototype.checkHowManyGenesAreThere = function( param ) {
	var obj = this;

	$.ajax({
		type: 'post',
		url: 'get_gene_symbols',
		data: {symbol:param},
		dataType: 'json',
		success:function(data) {
			var content = $("#gene_list_dialog .dialog-content");
			for(var i in data ) {
				content.append("<div class='gene-symbol-list'>" + param + " " + data[i].chrom + ":" + data[i].txStart + "-" + data[i].txEnd + "</div>");
			}
			
			$(".gene-symbol-list").click(function(){
				var item = $(this).text();
				var breakedItems = item.split(" ")[1];
				
				obj.findInteractionPairs( breakedItems );
			});
		}
	});
}

HicHistogram.prototype.findInteractionsAboutBait = function( loci, boundary_range, window_size ) {
	var obj = this;

	$.ajax({
		type: 'post',
		url: 'get_data',
		data: {loci:loci, boundary_range:boundary_range, window_size:window_size},
		dataType: 'json',
		success:function(data) {
			
			obj.draw(data);

			console.log(data);
		}
	});
}

$(document).ready(function () {
	var config = {

	};

	var histogram = new HicHistogram(config);
	histogram.init();
});