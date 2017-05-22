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
    <title>新建流程</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/Emphasis.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/PopUp.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=basePath%>/js/process/newPro.js"></script>
  </head>

<body style="overflow:hidden;" oncontextmenu="return false;">
	     <div align="center" style="margin-top: 10px;">  
	       	<a id="sj" href="javascript:void(0);" style="margin-right: 30px;">事假申请</a> 
	       	<a id="nj" href="javascript:void(0);">年假申请</a>
	     </div>
	     <div id="process">
			    <div id="njPanel" style="width:100%;max-width:400px;padding:30px 60px;">
			     	<p>
			     		开始时间:<input type="text" id="beginTime" onclick="showSTime();" style="width:140px;margin-left: 5px;height:22px;margin-bottom: 10px;"/>
			     	</p>
			     	<p>
			     		结束时间:<input type="text" id="endTime"  onclick="showETime();"  style="width:140px;margin-left: 5px;height:22px;margin-bottom: 10px;"/>
			     	</p>
			     	<p>
			     		所剩年假天数:<span id="vac" style="color:red;margin-bottom: 10px;"></span>
			     	</p>
			     	<p>
			     		<span >请假事由:</span><textarea id="njreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>
			     	</p>
			     	<p>
			     		<a id="njbtn" href="javascript:void(0);" class="easyui-linkbutton" style="margin-top: 10px;margin-left: 180px;">提交</a>  
			     	</p>
				</div>
			    <div id="sjPanel" style="width:100%;max-width:400px;padding:30px 60px;">
			     	<p>
			     		开始时间:<input type="text" id="begin" onclick="STime();" style="width:140px;margin-left: 5px;height:22px;margin-bottom: 10px;"/>
			     	</p>
			     	<p>
			     		结束时间:<input type="text" id="end"  onclick="ETime();"  style="width:140px;margin-left: 5px;height:22px;"/>
			     	</p>
			     	<p>
			     		<span >请假事由:</span><textarea id="sjreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>
			     	</p>
			     	<p>
			     		<a id="sjbtn" href="javascript:void(0);" class="easyui-linkbutton" style="margin-top: 10px;margin-left: 180px;">提交</a>  
			     	</p>
				</div>
		 </div>
</body>
</html>
