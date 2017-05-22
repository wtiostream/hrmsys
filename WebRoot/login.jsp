<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>登录界面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/login.css">
	
	<link rel="stylesheet" type="text/css" href="<%=basePath%>js/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>js/jquery-easyui-1.5.1/themes/default/easyui.css">
	<script type="text/javascript" src="<%=basePath%>js/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
  </head>
  
  <body>
	<div class="container">
	  	<div class="header"><span>人力资源管理系统</span></div>
	  	<div class="content">
	  		<div class="easyui-panel" title="登录" style="width:100%;max-width:400px;padding:30px 60px;">
				<form id="ff" method="post">
					<div style="margin-bottom:20px">
						<input class="easyui-textbox" name="username" style="width:100%" data-options="label:'用户名:',required:true">
					</div>
					<div style="margin-bottom:20px">
						<input class="easyui-textbox" name="password" type="password" style=" width:100%" data-options="label:'密码:',required:true">
					</div>
					<div style="margin-bottom:20px">
						<input class="easyui-textbox" id="validateCode" name="validateCode" style="width:70%" data-options="label:'验证码:',required:true">
						<span><img alt="点击更换" src="validate" title="点击更换" style="margin-bottom: -5px;"/></span>
					</div>
				</form>
				<div style="text-align:center;padding:5px 0">
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm()" style="width:80px">登录</a>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()" style="width:80px">清空</a>
				</div>
			</div>
		</div>
	  	<div class="footer"></div>
	</div>
  </body>
  	<script type="text/javascript" src="js/login.js"></script>
</html>
