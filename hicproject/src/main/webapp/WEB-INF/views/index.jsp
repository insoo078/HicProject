<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<jsp:include page="./common/header.jsp" flush="false"/>

<h1>
	Hello world!  
</h1>

<P>  The time on the server is ${serverTime}. </P>

<jsp:include page="./common/footer.jsp" flush="false"/>
