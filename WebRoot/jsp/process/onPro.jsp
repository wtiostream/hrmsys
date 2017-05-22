<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/jsp/comm.jsp" />

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>进行中的流程</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/Emphasis.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/PopUp.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=basePath%>/js/process/onPro.js"></script>
  </head>

<body style="overflow:hidden;" oncontextmenu="return false;">
        <div  id="easyui_toolbar" border="false" style="border-bottom: 1px solid #ddd; height: 32px; padding: 2px 5px; background: #fafafa;">  
		<div id="tb" style="float: left;">  
                <input id="ss" class="easyui-searchbox"  
                     prompt="一键搜"  
                    style="width: 130px; vertical-align: middle;"></input>   
            </div>  
        </div>  
        <div style="margin-left: 10px;margin-top: 10px;" >  
            <table id="onPro"></table>  
        </div>  
</body>
</html>
