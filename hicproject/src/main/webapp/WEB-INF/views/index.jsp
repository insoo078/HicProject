<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<jsp:include page="./common/header.jsp" flush="false"/>

<link rel="stylesheet" type="text/css" href="resources/css/graph.css" />

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<!--<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script> -->
<script src="http://d3js.org/d3.v3.min.js"></script> 
<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>

<script type="text/javascript" src="resources/js/hic_histogram.js"></script>

<h1>
	Virtual 4C Browser example
</h1>
<%-- 
<P>  The time on the server is ${serverTime}. </P> --%>

<form id='transferForm' action=''>
	<input type='text' id='chrom' name='chrom'/>
	<input type='text' id='pos' name='pos'/>
</form>

<div id="controller">
	<div style="background:none;height:30px;line-height:30px;">
		Input a gene Symbol or Loci <input type='text' id='input' class='input' value='chr1:16943000'/> (Ex. BRCA1, chr1:566000)
		Binning size (Window)
		<select id='window_size'>
			<option value='1000' selected>1Kb</option>
			<option value='3000'>3Kb</option>
			<option value='5000'>4Kb</option>
			<option value='5000'>5Kb</option>
		</select>
		Interaction boundary range 
		<select id='boundary_range'>
			<option value='500000'>500Kb</option>
			<option value='1000000' selected>1Mb</option>
			<option value='10000000'>10Mb</option>
			<option value='100000000'>100Mb</option>
			<option value='500000000'>500Mb</option>
		</select>
		<button id='btn_run'>Run</button>
	</div>
</div>

<div id='graph' style='width:1280px;height:640px;background:none;border:1px solid gray;'>

</div>

<div id='hit_list' style='width:1280px;background:none;border:1px solid gray;margin-top:20px;'>
	<div class='hit_list_title' style='width:100%;height:25px;'>
		<div style="width:10%;height:25px;float:left;text-align:center;">Index</div>
		<div style="width:30%;height:25px;float:left;text-align:center;">Bait</div>
		<div style="width:50%;height:25px;float:left;text-align:center;">Interaction pair candidates</div>
		<div style="width:10%;height:25px;float:left;text-align:center;">Count</div>
	</div>
	<div class='hit_list_content'></div>
</div>



<div id="gene_list_dialog" title="Find genomic location from Gene Symbol or SNP id" >
	<div class='dialog-title' style="height:25px;line-height:25px;background:none;">Genes</div>
	<div class='dialog-content'>
		
	</div>
</div>

<jsp:include page="./common/footer.jsp" flush="false"/>