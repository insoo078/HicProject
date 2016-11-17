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
	Hello world!
</h1>

<P>  The time on the server is ${serverTime}. </P>
<p><button id='btn_run'>Button</button>

<div id='graph' style='width:1280px;height:640px;background:none;float:left;border:1px solid gray;'>

</div>

<jsp:include page="./common/footer.jsp" flush="false"/>