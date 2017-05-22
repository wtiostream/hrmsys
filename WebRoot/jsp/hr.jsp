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
    
    <title>HR界面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/Emphasis.css">
 	<script type="text/javascript" src="<%=basePath%>/js/main.js"></script>
 	 	<script type="text/javascript" src="<%=basePath%>/js/hr/process/flush.js"></script>
 	
 	<%
 			User user = (User)request.getSession().getAttribute("hr");
 	 %>
	
  </head>
    <body  style="overflow:hidden;" oncontextmenu="return false;">
	<div style=height:30px;background-color:#4cc1cc;"><span style="margin-left: 1170px;"> &nbsp;&nbsp;&nbsp;&nbsp;你好，</span><span id="currentName" style="color:red;font-weight:normal;"><%=user.getUserName() %>(<%=user.getEmployee().getJob().getJobName() %>)</span>
			<br/><span id="time" style="color:#ffffff;font-weight:normal;margin-left: 1180px"></span>
	</div>
      <div class="EPContent EPBg" style='min-height:500px;' >
        <!---左边分类开始--->
        <div class="EPContent_l02">
            <div class="EPSort EPSort02" id="leftNavigationDiv">               
                <a href="javascript:void(0);" class="EPSortNav_on" onclick="onLevel1MenuClick(this)">
					<img aliasid="1" src="images/EmphasisPersonnel/EpSubMenu_close.png" width="19" height="19" />
					<span>公司部门管理</span>
				</a>
                <ul class="EpSubMenu" id="waibuxitong" style="display:none;">
                    <li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/hr/depart/departInfo.jsp">部门信息管理</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/hr/depart/departJob.jsp">部门职位管理</li>
                </ul>
				<a href="javascript:void(0);" onclick="onLevel1MenuClick(this)">
					<img aliasid="3" src="images/EmphasisPersonnel/EpSubMenu_open.png" width="19" height="19" />   
					<span>公司职员管理</span>
				</a>
				<ul class="EpSubMenu" id="employee" style="display:none;">
					<li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/hr//employee/empInfo.jsp">员工信息管理</li>
                    <!-- <li onclick="onLevel2MenuClick(this)" url="jsp/hr/employee/empSubsidy.jsp">员工补贴配置管理</li> -->
				</ul>
				<a href="javascript:void(0);" onclick="onLevel1MenuClick(this)">
					<img aliasid="3" src="images/EmphasisPersonnel/EpSubMenu_open.png" width="19" height="19" />   
					<span>公司培训管理</span>
				</a>
				<ul class="EpSubMenu" id="toolStore" style="display:none;">
					<li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/hr/train/trainInfo.jsp">培训信息发布</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/hr/train/trainLog.jsp">培训评价记录</li>
				</ul>
<!-- 				<a href="javascript:void(0);" onclick="onLevel1MenuClick(this)">
					<img aliasid="3" src="images/EmphasisPersonnel/EpSubMenu_open.png" width="19" height="19" />   
					<span>薪资管理</span>
				</a>
				<ul class="EpSubMenu" id="toolStore" style="display:none;">
					<li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/hr/salary/empSalary">员工月收入信息</li>
				</ul> -->
				<a href="javascript:void(0);" onclick="onLevel1MenuClick(this)">
					<img aliasid="3" src="images/EmphasisPersonnel/EpSubMenu_open.png" width="19" height="19" />   
					<span>流程管理</span>
					<div id="tip" style="float:right;color:red;"></div>
				</a>
				<ul class="EpSubMenu" id="toolStore" style="display:none;">
					<li class="EpSubMenu_on" onclick="onLevel2MenuClick(this)" url="jsp/process/newPro.jsp">新建流程</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/hr/process/onPro.jsp">进行中的流程</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/hr/process/finishPro.jsp">已完成的流程</li>
                    <li onclick="onLevel2MenuClick(this)" url="jsp/hr/process/dealProcess.jsp">我待处理的流程</li>
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
       		<span id="roleId"><%=user.getRole().getRoleId() %></span>
       </div>
    </body>
</html>
