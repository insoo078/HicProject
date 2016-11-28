var HicHistogram = function( config ) {
	this.threshold = 0;
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
	.attr('id', 'circle-data')
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
	.attr('r', 1);

	canvas.append('g')
	.attr('id', 'bar-data')
	.selectAll('line')
	.data(data.interactionPairs)
	.enter()
	.append('line')
	.attr('class', 'bar')
	.attr('x1', function(d, i) {
		return xScale(d.bin2);
	})
	.attr('y1', function(d, i){
		return yScale(d.count);
	})
	.attr('x2', function(d, i) {
		return xScale(d.bin2);
	})
	.attr('y2', function(d, i){
		return yScale(0);
	});
	
	var units = canvas.append('g');
	for(var i=0; i<=data.peakValue; i++) {
		units.append('line')
		.attr('class', 'unit')
		.attr('x1', PADDING - 15)
		.attr('y1', yScale(i))
		.attr('x2', PADDING)
		.attr('y2', yScale(i));
	}
	
	var obj = this;
	
	obj.threshold = data.peakValue;

	var drag = d3.behavior.drag()
	.on("drag", function(d) {
		var av = d3.event.dy;
		
		var value = yScale( obj.threshold );
		
		obj.threshold = yScale.invert( value + av );

		$("#threshold-bar").attr('y1', value);
		$("#threshold-bar").attr('y2', value);

		var lines = d3.selectAll(".bar").each(function(d,i) {
			if( yScale($(this).attr('y1')) >= yScale(value) )
				$(this).attr('class', 'bar hit');
			else
				$(this).attr('class', 'bar');
		});
	});

//	canvas.on("click", function() {
//		if (d3.event.defaultPrevented) return; // click suppressed
//
//		var value = d3.mouse(this)[1];
//		obj.threshold = yScale.invert( value );
//
//		$("#threshold-bar").attr('y1', value);
//		$("#threshold-bar").attr('y2', value);
//	});

	canvas.on('mousedown', function(){
		if (d3.event.defaultPrevented) return; // click suppressed

		var value = d3.mouse(this)[1];
		obj.threshold = yScale.invert( value );

		$("#threshold-bar").attr('y1', value);
		$("#threshold-bar").attr('y2', value);

		var lines = d3.selectAll(".bar").each(function(d,i) {
			if( yScale($(this).attr('y1')) >= yScale(value) )
				$(this).attr('class', 'bar hit');
			else
				$(this).attr('class', 'bar');
		});
	});
	
	canvas.append('g')
	.attr('id', 'threashold-bar-group')
	.append('line')
	.attr('id', 'threshold-bar')
	.attr('class', 'threshold-bar')
	.attr('x1', PADDING)
	.attr('y1', yScale(data.peakValue))
	.attr('x2', WIDTH - PADDING)
	.attr('y2', yScale(data.peakValue))
	;
	
	canvas.call(drag);
}


HicHistogram.prototype.init = function( ) {
	var obj = this;

	$("#input").focus(function(){
		$(this).val('');
	});
	$("#input").blur(function(){
		if( $(this).val() === '' ) {
			$(this).val('chr1:16943000');
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