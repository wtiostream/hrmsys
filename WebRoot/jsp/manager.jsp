<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hrmsys.model.*" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="comm.jsp" />

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>部门经理界面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/Emphasis.css">
 	<script type="text/javascript" src="<%=basePath%>/js/main.js"></script>
 	<script type="text/javascript" src="<%=basePath%>/js/manager/flush.js"></script>
 	<%
 			User user = (User)request.getSession().getAttribute("manager");
 	 %>
  </head>
    <body  style="overflow:hidden;" oncontextmenu="return false;">
	<div style=height:30px;background-color:#4cc1cc;"><span style="margin-left: 1150px"> &nbsp;&nbsp;&nbsp;&nbsp;你好，</span><span id="currentName" style="color:red;font-weight:normal;"><%=user.getUserName()%>(<%=user.getEmployee().getJob().getJobName() %>)</span>
			<br/><span id="time" style="color:#ffffff;font-weight:normal;margin-left: 1180px"></span>
	</div>
      <div class="EPContent EPBg" style='min-height:500px;' >
        <!---左边分类开始--->
        <div class="EPContent_l02">
            <div class="EPSort EPSort02" id="leftNavigationDiv">               
                <a href="javascript:void(0);" class="EPSortNav_on" onclick="onLevel1MenuClick(this)">
					<img aliasid="1" src="images/EmphasisPersonnel/EpSubMenu_close.png" width="19" height="19" />
					<span>基本信息</span>
				</a>
                <ul class="EpSubMenu" id="waibuxitong" style="display:none;">
                    <li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/manager/basicInfo.jsp">个人基本信息</li>
                    <!-- <li onclick="onLevel2MenuClick(this)" url="jsp/commenInfo/attentInfo.jsp">个人考勤信息</li> -->
                    <!-- <li onclick="onLevel2MenuClick(this)" url="jsp/depart/departJob.jsp">个人薪资信息</li> -->
                </ul>
                <a href="javascript:void(0);" class="EPSortNav_on" onclick="onLevel1MenuClick(this)">
					<img aliasid="1" src="images/EmphasisPersonnel/EpSubMenu_close.png" width="19" height="19" />
					<span>我的部门</span>
				</a>
                <ul class="EpSubMenu" id="waibuxitong" style="display:none;">
                    <li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/manager/mydepartInfo.jsp">部门基本信息</li>
                    <!-- <li onclick="onLevel2MenuClick(this)" url="jsp/manager/departAttent.jsp">部门职工考勤</li> -->
                    <li onclick="onLevel2MenuClick(this)" url="jsp/depart/departJob.jsp">部门职工调岗</li>
                </ul>
				<a href="javascript:void(0);" onclick="onLevel1MenuClick(this)" >
					<img aliasid="3" src="images/EmphasisPersonnel/EpSubMenu_open.png" width="19" height="19" />   
					<span style="position: absolute; left: 59px;" >流程管理 </span>
					<div id="tip" style="float:right;color:red;"></div>
				</a>
				<ul class="EpSubMenu" id="pro" style="display:none;">
					<li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/process/newPro.jsp">新建流程</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/manager/onPro.jsp">进行中的流程</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/manager/finishPro.jsp">已完成的流程</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/manager/mydealProcess.jsp">我待处理的流程</li>
				</ul>
            </div>
        </div>
		
        <!---左边分类结束--->
        <!---右边iframe开始--->
        <div class="EPContent_r02">
            <iframe src="" id="bottomFrame" name="bottomFrame" width="100%" height="100%" frameborder="no" scrolling="no"></iframe>    
        </div>
        <!---右边iframe结束--->
      </div>
       <div style="display:none;" >
       		<span id="empId"><%=user.getEmployee().getEmpId() %></span>
       		<span id="empName"><%=user.getEmployee().getEmpName() %></span>
       		<span id="deptId"><%=user.getEmployee().getDepartment().getDeptId() %></span>
       		<span id="roleId"><%=user.getRole().getRoleId() %></span>
       </div>
    </body>
</html>
<script type="text/javascript" src="<%=basePath%>/js/manager/flush.js"></script>
