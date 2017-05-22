<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hrmsys.model.*" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/jsp/comm.jsp" />

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>个人考勤信息</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/Emphasis.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/PopUp.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=basePath%>js/commentJS/attent.js"></script>	
  </head>

<body style="overflow:hidden;" oncontextmenu="return false;">
	        <div class="easyui-layout" fit="true"  >  
	        	<div  id="timepicker" region="north" border="false" style="width:100px;" ">
					<input id="dd" type="text" class="" required="required"></input>
				</div>	    
            <div region="center" border="false" style="margin-top: 10px;">  
                <table id="attentInfo"></table>  
            </div>  
        </div>  
</body>
</html>
