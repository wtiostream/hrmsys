<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hrmsys.model.*,java.text.SimpleDateFormat;" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<jsp:include page="/jsp/comm.jsp" />

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>员工基本信息</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=basePath%>css/Emphasis.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>css/PopUp.css" rel="stylesheet" type="text/css" />
	<%-- <script type="text/javascript" src="<%=basePath%>js/manager/proAttention.js"></script> --%>
  </head>
  
   	<%   			
 			User user = (User)request.getSession().getAttribute("emp");
 	 %>
 	 <script type="text/javascript">
		$(function(){
			var empId = '<%=user.getEmployee().getEmpId()%>';
			var url = "../../picture/LOL/" + empId + ".png" + "?time=" + (new Date().getTime());
			$("#empId").val('<%=user.getEmployee().getEmpId()%>'); 
			$("#roleId").val('<%=user.getRole().getRoleId()%>'); 
			$(".EPPhoto img").attr("src", url);
		});
			
	</script>
	
 	<style style="text/css">
		.EPPhoto img{
			width: 100%;
			height: 100%;		
		}
	</style>
 	 
<body style="overflow:hidden;" oncontextmenu="return false;">
		<div class="">
			<table width="100%" border="1" cellspacing="0" cellpadding="0" class="EPTable" style="margin-left:10px;margin-top: 10px;margin-right: 10px;">
                    <tr>
                        <td class="EPTable_l" width="120"><span>姓名：</span></td>
                        <td class="EPTable_r" width="230"><span id="name"><%=user.getEmployee().getEmpName() %></span></td>
                        <td class="EPTable_l" width="120"><span>部门：</span></td>
                        <td class="EPTable_r"><span id="department"><%=user.getEmployee().getDepartment().getDeptName()%></span></td>
                        <td width="240" rowspan="9" valign="top">
                            <div class="EPPhoto" style="padding-top: 0px;">
                            	<img src="" />
                       		</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="EPTable_l"><span>性别：</span></td>
                        <td class="EPTable_r"><span id="female"> 
                        <%
                        	if(user.getEmployee().getEmpSex() == 0){
                        %>	
                        	男
                        <%	
                        	}else{
                        %>
                        	女
                        <%
                        	}
                         %>
                        </span></td>
                        <td class="EPTable_l"><span>职位：</span></td>
                        <td class="EPTable_r"><span id="zy"><%=user.getEmployee().getJob().getJobName()%></span></td>
                    </tr>
                    <tr>
                        <td class="EPTable_l"><span>民族：</span></td>
                        <td class="EPTable_r"><span id="nationality"><%=user.getEmployee().getEmpOrigin()%></span></td>
                        <td class="EPTable_l"><span>出生日期：</span></td>
                        <td class="EPTable_r"><span id="birth">
                        <%
                        	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");  
  							String sDate = simpleDateFormat.format(new Date());  
                        %>
                        <%=sDate%>
                        </span></td>
                    </tr>
                    <tr>
                        <td class="EPTable_l"><span>家庭地址：</span></td>
                        <td class="EPTable_r" colspan="3"><span id="jtdz"><%=user.getEmployee().getEmpAddress()%></span></td>
                    </tr>
                    <tr>
                        <td class="EPTable_l"><span>手机号：</span></td>
                        <td class="EPTable_r"><span id="tel"><%=user.getEmployee().getEmpTelephone() %></span></td>
                        <td class="EPTable_l"><span>身份证号码：</span></td>
                        <td class="EPTable_r"><span id="idcard"><%=user.getEmployee().getEmpIdcard() %></span></td>
                    </tr>
                    <tr>
                        <td class="EPTable_l"><span>学历：</span></td>
                        <td class="EPTable_r"><span id="edu"><%=user.getEmployee().getEmpEducation() %></span></td>
                        <td class="EPTable_l"><span>专业：</span></td>
                        <td class="EPTable_r"><span id="pro"><%=user.getEmployee().getEmpProfession()%></span></td>
                    </tr>
                    <tr>
                        <td class="EPTable_l"><span>毕业院校：</span></td>
                        <td class="EPTable_r"><span id="school"><%=user.getEmployee().getEmpSchool() %></span></td>
                        <td class="EPTable_l"><span>年假天数：</span></td>
                        <td class="EPTable_r"><span id="vaction"><%=user.getEmployee().getEmpVacation() %></span></td>
                    </tr>
			</table>
			<form action="emp_upload" enctype="multipart/form-data" method="post">			 
				<input type="text" id="empId" name="empId"  value="" style="display:none;"/>
				<input type="text" id="roleId" name="roleId"  value="" style="display:none;"/>
				<input type="submit"  value="上传" style="float:right;margin-top:10px;margin-right: 30px;width:40px;height:20px;"/>
				<input type="file" name="image" id="img" size="1000" style="width:75px;height:25px;margin-top:10px; float:right;"/>
			</form>
			
		</div>
	</body>
</html>
