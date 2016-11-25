<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<jsp:include page="./common/header.jsp" flush="false"/>

<link rel="stylesheet" type="text/css" href="resources/css/graph.css" />

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="http://d3js.org/d3.v3.min.js"></script> 
<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>

<script type="text/javascript" src="resources/js/hic_histogram.js"></script>

<h1>
	Virtual 4C Browser example
</h1>
<%-- 
<P>  The time on the server is ${serverTime}. </P> --%>

<div id="controller">
	<div style="background:none;height:30px;line-height:30px;">
		Input a gene Symbol or Loci <input type='text' id='input' class='input' value='BRCA1'/> (Ex. BRCA1, chr1:566000)
		Boundary range <select id='boundary_range'>
			<option value='500000'>500Kb</option>
			<option value='1000000' selected>1Mb</option>
			<option value='10000000'>10Mb</option>
			<option value='100000000'>100Mb</option>
			<option value='500000000'>500Mb</option>
		</select>
		<button id='btn_run'>Run</button>
	</div>
</div>

<div id='graph' style='width:1280px;height:640px;background:none;float:left;border:1px solid gray;'>

</div>


<div id="gene_list_dialog" style="position:absolute;width:800px;height:200px;background:green;display:block;">
	<div class='dialog-title' style="height:25px;line-height:25px;background:purple;">Genes</div>
	<div class='dialog-content'>
		
	</div>
</div>

<jsp:include page="./common/footer.jsp" flush="false"/>