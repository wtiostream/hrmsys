<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<link rel="stylesheet" type="text/css" href="<%=basePath%>js/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>js/jquery-easyui-1.5.1/themes/default/easyui.css">
<script type="text/javascript" src="<%=basePath%>js/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>js/laydate/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>js/dist/echarts.js"></script>


