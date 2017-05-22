<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hrmsys.model.*;" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/jsp/comm.jsp" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>部门信息管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/Emphasis.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/PopUp.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=basePath%>js/manager/mydepartInfo.js"></script>
  </head>
  
     <%
 			User user = (User)request.getSession().getAttribute("manager");
 	 %>
<body style="overflow:hidden;" oncontextmenu="return false;">
	<div class="">
		<table width="100%" border="1" cellspacing="0" cellpadding="0" class="EPTable" style="margin-left:10px;margin-top: 10px;">
		           <tr>
		               <td class="EPTable_l" width="120"><span>部门编号：</span></td>
		               <td class="EPTable_r" width="230"><span id="name"><%=user.getEmployee().getDepartment().getDeptId() %></span></td>
		               <td class="EPTable_l" width="120"><span>部门名称：</span></td>
		               <td class="EPTable_r"><span id="departName"><%=user.getEmployee().getDepartment().getDeptName()%></span></td>
		               <td class="EPTable_l" width="120"><span>部门人数：</span></td>
		               <td class="EPTable_r"><span id="departNum"></span></td>
		           </tr>
		 </table>
		 <div style="margin-left: 10px;margin-top: 10px;">
			  <table id="departEmp"></table>  
        </div>
        <div id="main" style="height:400px;"></div>
	 </div>
</body>
</html>
