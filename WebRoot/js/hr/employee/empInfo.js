$(function(){
	var item = {};
	$(document).ready(function(){
		getData();
		$("a.textbox-icon.searchbox-button").click(function(){
			var condition = $("#_easyui_textbox_input1").val();
			if(condition == '一键搜'){
				getData();
				return;
			}
			getConditionData(condition);
		})
		
		$("#add").bind('click', function(){
			Additem();
		})
		$("#edit").bind('click',function(){
			Edititem();
		})
		$("#del").bind('click',function(){
			Delitem();
		})
		$("#export").bind('click',function(){
			Expotitem();
		})
		charts();
	})

	function Expotitem(){
		$.messager.confirm('提示','确认导出所有条目吗?', function(r){
			if (r){
				//导出操作
				document.location = 'emp_detailXlsExport';
				tip('导出成功');
			}
		});
	}
	
	//增加
	function Additem(){
		var str = AddDiv();
		var html = '<div id="Adddlg"></div>';
		$(html).appendTo($('body'));	
		$("#Adddlg").dialog({
			title: "添加员工",
			width: "610px",
			height: "360px",
			content: str,
			modal:true
		})
		getIds();
		getEmployeeId();
	}
	
	//添加员工对话框的自动生成id
	function getEmployeeId(){
		$.ajax({
			url:'emp_getMaxId',
			contentType:'application/json',
			dataType: 'json',
			success: function(resobj){
				var data = eval(('resobj'));
				var num = parseInt(data) + 1;
				if(num < 100){
					var id = "00" + num;
				}else if(num < 1000){
					var id = "0" + num;
				}else {
					var id = num + "";
				}
				$("#bh1").val(id);
				$("#bh1").attr("disabled",true);  
			}
		})
	}
	
	//添加员工对话框所有部门编号
	function getIds(){
		$.ajax({
			url: 'dept_ids',
			dataType: 'json',
			contentType: 'application/json',
			success: function(resobj){
				var data = eval(('resobj'));
				for(var i = 0; i < data.length; i++){
					$("#bmbh1").append("<option value=" + data[i]+ " >" + data[i] + "</option>")
				}
			}
		})
	}
	
	//编辑员工对话框所有部门编号
	function getEditIds(){
		$.ajax({
			url: 'dept_ids',
			dataType: 'json',
			contentType: 'application/json',
			async: false,
			success: function(resobj){
				var data = eval(('resobj'));
				for(var i = 0; i < data.length; i++){
					$("#bmbh").append("<option value=" + data[i]+ " >" + data[i] + "</option>")
				}
			}
		})
	}
	
	
	function getIdAndJob(deptId,JobName){
		$("#bmbh option[value='"+deptId+"']").prop("selected", 'selected');
		getEditZW(deptId);
		$("#zw option[value='"+JobName+"']").prop("selected", 'selected');
		
	}
	
	//编辑
	function Edititem(){
		var row = $("#empInfo").datagrid("getSelections");
		var rowData = row[0];
		item = {};
		item = rowData;
		if(row.length != 1){
			tip('请选中一条记录!');			
			return;
		}
		//弹出编辑对话框
		var html = '<div id="dlgEdit"></div>';
		var str = editDiv();
		//左侧内容
		str = str.replace("%ygbh", rowData.empId);
		str = str.replace("%bmmc", rowData.department.deptName);
		str = str.replace("%csny", Transfer(rowData.empBirth));
		
		//右侧图片
		str = str.replace("%time", new Date().getTime());
		str = str.replace("%empPhoto", rowData.empPhoto);
		
		$(html).appendTo($('body'));	
		item = rowData;
		$("#dlgEdit").dialog({
			title: "编辑员工信息",
			width: "610px",
			height: "360px",
			content: str,
			modal:true
		})
		//绑定值
		$("#xm").val(rowData.empName);
		$("#jtdz").val(rowData.empAddress);
		$("#csny").val(Transfer(rowData.empBirth));
		
		//填充部门编号
		$("#xb option[value='"+rowData.empSex+"']").prop("selected", 'selected');
		getEditIds();		
		getIdAndJob(rowData.department.deptId,rowData.job.jobId);
//		$("#xb option[value='"+rowData.empSex+"']").prop("selected", 'selected');
		
//		getIds(rowData.department.deptId,rowData.job.jobId);
	}
	
	//删除
	function Delitem(){
		var row = $("#empInfo").datagrid("getSelections");
		if(row.length == 0){
			tip('请选择要删除的记录!');
			return;			
		}else{
			$.messager.confirm('提示','确认删除所选条目吗?', function(r){
				if (r){
					//删除操作
					var ids = "";
					for(var i = 0; i < row.length; i++){
						ids += row[i].empId;
						if(i != row.length - 1){
							ids += ",";
						}
					}
					$.ajax({
						url:'emp_delete' ,
						data: {
							ids: ids
						},
						success: function(resobj){
							tip("删除成功!")
							$("#empInfo").datagrid("reload");
							charts();
						},
						error: function(){
							console.log("error")
						}
						
					})
				}
			});
		}
	}
	
	function tip(msg){
		$.messager.show({
			title:'提示',
			msg: msg,
			timeout:1500,
			showType:'show',
			style:{
				right:'300',
				bottom:'300'
			}
		});
	}

	//重置
	window.Reset = function(){
		$("#xm").val(item.empName);
		$("#xb").val(item.empSex == '0' ? '男':'女');
		$("#bmmc").val(item.department.deptName);
		$("#bmbh").val(item.department.deptId);
		$("#zw").val(item.job.jobName);
		$("#csny").val(Transfer(item.empBirth));
		$("#jtdz").val(item.empAddress);
	}	
	
	//关闭对话框
	window.Close =  function(){
		$("a.panel-tool-close").trigger('click');
	}
	
	//查看员工Div
	function	 viewDiv(){
		var html ='	<div class="Popups01" style="width:600px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'			<div class="PT_l">'+
		'					<div class="PTShow">'+
		'						<div style="height: 178px; overflow:hidden;" id="idTransformView">'+
		'							<img id="noPic" src="%empPhoto?time=%time" onerror="this.src=\'images/PopUp/img02.png\'" height="178" width="216" />'+
		'						</div>'+
		'					</div>'+
		'				</div>'+
		'				<div class="PT_r">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" width="80" class="Table01_l">员工编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bh" name="bh" value="%ygbh" maxlength="20" class="Text01"  style="width:74px;" disabled/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">员工姓名：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="xm" name="xm"  value="%ygxm" maxlength="20"  disabled class="Text01" style="width:74px"/>'+
		'							</td>'+
		'						</tr>'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmbh" name="bmmc" value="%bmbh"  class="Text01"  disabled style="width:74px;"/>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmmc" name="bmmc" value="%bmmc"  class="Text01"  disabled style="width:74px;"/>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">性别：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="xb" name="xb" value="%xb" maxlength="20" class="Text01"  disabled style="width:74px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">职位：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="zw" name="zw" value="%zw" maxlength="20" class="Text01"  disabled style="width:74px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table>'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">出生年月：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="csny" name="csny"  value="%csny" maxlength="20" class="Text01" disabled onclick="showtime(\'YYYY-MM-DD\')" style="width:145px" />'+
		'							</td>'+
		'						</tr> '+
		'						<tr> '+
		'							<td align="right" class="Table01_l">家庭地址：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="jtdz" name="jtdz" value="%jtdz" maxlength="20" class="Text01" disabled style="width:220px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnClose" href="javascript:void(0);" class="But01" onclick="window.Close();">关闭</a></div>' +
		'				</div>';
		return html;
	}
	
	//编辑员工div
	function editDiv(){
		var html ='	<div class="Popups01" style="width:600px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'			<div class="PT_l">'+
		'					<div class="PTShow">'+
		'						<div style="height: 178px; overflow:hidden;" id="idTransformView">'+
		'							<img id="pic" src="%empPhoto" onerror="this.src=\'images/PopUp/img02.png\'" height="178" width="216" />'+
		'						</div>'+
		'					</div>'+
		'				</div>'+
		'				<div class="PT_r">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" width="80" class="Table01_l">员工编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bh" name="bh" value="%ygbh" maxlength="20" class="Text01"  style="width:74px;" disabled/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">员工姓名：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="xm" name="xm"  maxlength="20"  class="Text01" style="width:74px"/>'+
		'							</td>'+
		'						</tr>'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门编号：</td>'+
		'							<td align="left">'+
		'								<select id="bmbh" onchange="getEditBmmc();"  style="margin-left: 4px;width: 75px;">'+
		'									<option selected value="">请选择</option>'+
		'								</select>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmmc" name="bmmc" value="%bmmc"  class="Text01"  style="width:74px;"/>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">性别：</td>'+
		'							<td align="left">'+
		'								<select id="xb" style="margin-left: 4px;width: 75px;">'+
		'									<option selected value="">请选择</option>'+
		'									<option value="0">男</option>'+
		'									<option value="1">女</option>'+
		'								</select>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">职位：</td>'+
		'							<td align="left">'+
		'								<select id="zw" onclick="validateDep();" style="margin-left: 4px;width: 75px;">'+
		'									<option selected value="">请选择</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table>'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">出生年月：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="csny" name="csny"  value="%csny" maxlength="20" class="Text01"  onclick="showtime(\'YYYY-MM-DD\')" style="width:145px" />'+
		'							</td>'+
		'						</tr> '+
		'						<tr> '+
		'							<td align="right" class="Table01_l">家庭地址：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="jtdz" name="jtdz" maxlength="20" class="Text01"  style="width:220px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="UpdateEditEmp();" class="But01">确定</a><span class="ButInterval"></span><a id="btnReset"  onclick=""  href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}

	//添加员工 div
	function AddDiv(){
		var html ='	<div class="Popups01" style="width:600px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'			<div class="PT_l">'+
		'					<div class="PTShow">'+
		'						<div style="height: 178px; overflow:hidden;" id="idTransformView">'+
		'							<img id="pic" src="images/PopUp/img02.png" onerror="this.src=\'images/PopUp/img02.png\'" height="178" width="216" />'+
		'						</div>'+
		'					</div>'+
		'				</div>'+
		'				<div class="PT_r">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" width="80" class="Table01_l">员工编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bh1" name="bh" maxlength="20" class="Text01"  style="width:74px;" />'+
		'							</td>'+
		'							<td align="right" class="Table01_l">员工姓名：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="xm1" name="xm"  value="" class="Text01" style="width:74px"/>'+
		'							</td>'+
		'						</tr>'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门编号：</td>'+
		'							<td align="left">'+
		'								<select id="bmbh1" onchange="getBmmc();"  style="margin-left: 4px;width: 75px;">'+
		'									<option selected value="">请选择</option>'+
		'								</select>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmmc1" name="bmmc" class="Text01"  readonly style="width:74px;"/>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">性别：</td>'+
		'							<td align="left">'+
		'								<select id="xb" style="margin-left: 4px;width: 75px;">'+
		'									<option selected value="">请选择</option>'+
		'									<option value="0">男</option>'+
		'									<option value="1">女</option>'+
		'								</select>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">职位：</td>'+
		'							<td align="left">'+
		'								<select id="zw1" onclick="validateDep();" style="margin-left: 4px;width: 75px;">'+
		'									<option selected value="">请选择</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table>'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">出生年月：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="csny1" name="csny" maxlength="20" class="Text01" onclick="showtime1(\'YYYY-MM-DD\')" style="width:145px" />'+
		'							</td>'+
		'						</tr> '+
		'						<tr> '+
		'							<td align="right" class="Table01_l">家庭地址：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="jtdz" name="jtdz" maxlength="20" class="Text01" style="width:220px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="UpdateEmp();" class="But01">确定</a><span class="ButInterval"></span><a id="btnReset"  onclick="AddReset();"  href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	function initSize(){
		$('#empInfo').datagrid('resize', {
	        width: 1000,
	        height: 200
	    })
	}
	
	function Transfer(birth){
		var year = parseInt(birth.year) + 1900;
		var month = parseInt(birth.month) + 1 > 12 ? "01" : parseInt(birth.month) + 1;
		var birthday = year + '-' + month + '-' + birth.date;
		return birthday;
	}
	
	//双击 datagrid查看详情
	function getData(){
		$("#empInfo").datagrid({
			url: 'emp_list',
			columns: [[
	           {field:'ck',checkbox: true},
	           {field:'empId', title:'员工编号', width:100},      
	           {field:'empName', title:'员工姓名', width:150},     
	           {field:'empSex', title:'性别', width:150,
	        	   formatter:function(value,row,index){
	        		   if(value == '0'){
	        			   return '男';
	        		   } else {
	        			   return '女';
	        		   }
	        	   }
	           },     
	           {field:'department', title:'部门名称', width:150,
	        	   formatter:function(value,row,index){
	        		   return row.department.deptName;
	        	   }
	           },     
	           {field:'job', title:'职位', width:100,
	        	   formatter:function(value,row,index){
	        		   return row.job.jobName;
	        	   }
	           }     
	           ]],
	           pageNumber:1,
	           pageSize:10,
	           pageList:[10,15,20],
	           striped:true,
	           fit: false,
	           pagination:true,
	           sortName:'deptId',
	           onDblClickRow: function(rowIndex, rowData){
	        	   var html = '<div id="dlg"></div>';
	        	   var str = viewDiv();
	        	   
	        	   //右侧信息
	        	   str = str.replace("%ygbh", rowData.empId);
	        	   str = str.replace("%ygxm", rowData.empName);
	        	   str = str.replace("%xb", rowData.empSex == '0' ? '男':'女');
	        	   str = str.replace("%bmmc", rowData.department.deptName);
	        	   str = str.replace("%bmbh", rowData.department.deptId);
	        	   str = str.replace("%zw", rowData.job.jobName);
	        	   str = str.replace("%csny", Transfer(rowData.empBirth));
	        	   str = str.replace("%jtdz", rowData.empAddress);
	        	   
	        	   //左侧照片
	        	   str = str.replace("%time", new Date().getTime());
	        	   str = str.replace("%empPhoto", rowData.empPhoto);

	        	  
	        	   $(html).appendTo($('body'));
	        	   $("#dlg").dialog({
	        		   title: "员工详细信息",
	        		   width: "610px",
	        		   height: "360px",
	        		   content: str,
	        		   modal:true
	        	   })
	           },
	           onLoadSuccess: initSize
		});
	}
	
	//选择日历时间
	showtime = function(fmtmsg){
		var showTM=true;
		if(fmtmsg.length<=10){showTM=false;}
		//查询开始时间
		laydate({
	        elem:'#csny', //需显示日期的元素选择器
	        format:fmtmsg, //日期格式'YYYY-MM-DD hh:mm:ss'
	        event: 'click', //触发事件
			istime: showTM,
			max:$("#searchEndTime").val()
		});
		this.initLayDataCss(fmtmsg);
	}
	
	showtime1 = function(fmtmsg){
		var showTM=true;
		if(fmtmsg.length<=10){showTM=false;}
		//查询开始时间
		laydate({
			elem:'#csny1', //需显示日期的元素选择器
			format:fmtmsg, //日期格式'YYYY-MM-DD hh:mm:ss'
			event: 'click', //触发事件
			istime: showTM,
			max:$("#searchEndTime").val()
		});
		this.initLayDataCss(fmtmsg);
	}
	
	initLayDataCss = function(fmtmsg){
		if(fmtmsg=="YYYY"){
			$("#laydate_box .laydate_top").css("display","");//顶部
			$(".laydate_y").css("display","");//年份
			$(".laydate_m").css("display","none");//月份
			$("#laydate_box .laydate_table").css("display","none");//日选择列表
			$("#laydate_hms").css("display","none");//时间选择列表
		}
		else if(fmtmsg=="YYYY-MM"){
			$("#laydate_box .laydate_top").css("display","");//顶部
			$(".laydate_y").css("display","");//年份
			$(".laydate_m").css("display","");//月份
			$("#laydate_box .laydate_table").css("display","none");//日选择列表
			$("#laydate_hms").css("display","none");//时间选择列表
		}
		else if(fmtmsg=="YYYY-MM-DD"){
			$("#laydate_box .laydate_top").css("display","");//顶部
			$(".laydate_y").css("display","");//年份
			$(".laydate_m").css("display","");//月份
			$("#laydate_box .laydate_table").css("display","");//日选择列表
			$("#laydate_hms").css("display","none");//时间选择列表
		}
		else if(fmtmsg=="hh:mm:ss"){	
			$("#laydate_box .laydate_top").css("display","none");//顶部,年月不显示
			$(".laydate_y").css("display","none");//年份
			$(".laydate_m").css("display","none");//月份
			$("#laydate_box .laydate_table").css("display","none");//日选择列表
			$("#laydate_hms").css("display","");//时间选择列表
		}
		else{
			$("#laydate_box .laydate_top").css("display","");//顶部
			$(".laydate_y").css("display","");//年份
			$(".laydate_m").css("display","");//月份
			$("#laydate_box .laydate_table").css("display","");//日选择列表
			$("#laydate_box .laydate_today").css("display","");//时间选择列表
		}
	}
	
	//获取增加对话框部门名称
	getBmmc = function(){
		var id = $("#bmbh1").val();
		$.ajax({
			contentType:'application/json',
			dataType:'json',
			url:'dept_intoUpdate',
			data:{
				deptId:id
			},
			success: function(resobj){
				var data = eval(('resobj'));
				if(data == ""){
					$("#bmmc1").val("");
				}else {
					$("#bmmc1").val(data[0].deptName);
					getZW(id);
				}
			}
		})
	}
	
	//获取编辑对话框部门名称
	getEditBmmc = function(){
		var id = $("#bmbh").val();
		$.ajax({
			contentType:'application/json',
			dataType:'json',
			url:'dept_intoUpdate',
			data:{
				deptId:id
			},
			success: function(resobj){
				var data = eval(('resobj'));
				if(data == ""){
					$("#bmmc").val("");
				}else {
					$("#bmmc").val(data[0].deptName);
					getEditZW(id);
				}
			}
		})
	}
	
	validateDep = function(){
		if($("#bmbh").val() == ""){
			alert("请先选择部门编号");
		}
		return;
	}
	
	//得到部门id所对应的职位名称
	function getZW(id){
		$.ajax({
			url: 'job_getJobsBydeptId',
			type: 'get',
			contentType: 'application/json',
			dataType: 'json',
			data :{
				deptId: id
			},
			success: function(resobj){
				$("#zw1").empty();
				var data = eval(('resobj'));
				$("#zw1").append("<option value=''>请选择</option>");
				for(var i=0;i<data.length;i++){
					$("#zw1").append("<option value="+ data[i].jobId+">" + data[i].jobName +"</option>");
				}
			}
		})
	}
	
	//得到部门id所对应的职位名称
	function getEditZW(id){
		$.ajax({
			url: 'job_getJobsBydeptId',
			type: 'get',
			contentType: 'application/json',
			dataType: 'json',
			async: false,
			data :{
				deptId: id
			},
			success: function(resobj){
				$("#zw").empty();
				var data = eval(('resobj'));
				$("#zw").append("<option value=''>请选择</option>");
				for(var i=0;i<data.length;i++){
					$("#zw").append("<option value="+ data[i].jobId+">" + data[i].jobName +"</option>");
				}
			}
		})
	}

	//添加员工对话框重置按钮的功能
	AddReset = function(){
		$("#xm").val("");
		$("#bmbh option:first").prop("selected", 'selected');
		$("#csny").val("");
		$("#jtdz").val("");
		$("#bmmc").val("");
		$("#xb option:first").prop("selected", 'selected');
		$("#zw option:first").prop("selected", 'selected');
	}
	
	//添加员工对话框确定按钮的功能
	UpdateEmp = function(){
		var emp = {
				"emp.empId": $("#bh1").val(),
				"emp.empName": $("#xm1").val(),
				"emp.empSex": $("#xb").val(),
				"emp.empBirth": $("#csny").val(),
				"emp.empAddress": $("#jtdz").val(),
				"emp.empPhoto": $("img#pic").attr('src'),
				"deptId": $("#bmbh1").val(),
				"deptName": $("#bmmc1").val(),
				"jobId": $("#zw1").val()
		};
//		"emp.department.deptId": $("#bmbh").val(),
//		"emp.department.deptName": $("#bmmc").val(),
//		"emp.job.jobId": $("#bmmc").val()
		$.ajax({
			url: 'emp_save',
			type: 'get',
			data: emp,
			dataType: 'json',
			success: function(resobj){
//				var data = JSON.parse(resobj);
				var data = eval(('resobj'));
				$("a.panel-tool-close").trigger('click');
				 $("#empInfo").datagrid("reload");
				 tip('更新成功!');
				 charts();
			},
			error: function(resobj){
			}
		})
		
		var user = {
			"user.employee.empId": $("#bh1").val(),
			"user.userName": $("#xm1").val(),
			"user.employee.department.deptId": $("#bmbh1").val(),
			"user.employee.job.jobId": $("#zw1").val()
		}
		
		$.ajax({
			url: 'user_save',
			dataType: 'json',
			data: user,
			success: function(resobj){
				var data = eval(('resobj'));
			},
			error: function(){
				
			} 
		})
		
	}
	
	
	//编辑员工对话框确定按钮的功能
	UpdateEditEmp = function(){
		var user = {
				"user.employee.empId": $("#bh").val(),
				"user.userName": $("#xm").val(),
				"user.employee.department.deptId": $("#bmbh").val(),
				"user.employee.job.jobId": $("#zw").val()
			}
		
		$.ajax({
			url: 'user_getUserId',
			dataType: 'json',
			data:  {
				empId: $("#bh").val(),
			},
			async: false,
			success: function(resobj){
				var data = eval(('resobj'));
				user["user.userId"] = data.msg;
			},
			error: function(){
				alert(123);
			} 
		})
		
		//先保存用户
		var emp = {
				"emp.empId": $("#bh").val(),
				"emp.empName": $("#xm").val(),
				"emp.empSex": $("#xb").val(),
				"emp.empBirth": $("#csny").val(),
				"emp.empAddress": $("#jtdz").val(),
				"emp.empPhoto": $("img#pic").attr('src'),
				"deptId": $("#bmbh").val(),
				"deptName": $("#bmmc").val(),
				"jobId": $("#zw").val()
		};

		$.ajax({
				url: 'user_save',
				dataType: 'json',
				data: user,
				success: function(resobj){
					
				},
				error: function(){
					
				} 
		})

		$.ajax({
			url: 'emp_save',
			type: 'get',
			data: emp,
			dataType: 'json',
			success: function(resobj){
//				var data = JSON.parse(resobj);
				var data = eval(('resobj'));
				$("a.panel-tool-close").trigger('click');
				$("#empInfo").datagrid("reload");
				tip('更新成功!');
				charts();
			},
			error: function(resobj){
			}
		})
	}
	
	//一键搜
	function getConditionData(condition){
		$("#empInfo").datagrid({
			url: 'emp_listByCondition?condition=' + condition ,
			columns: [[
	           {field:'ck',checkbox: true},
	           {field:'empId', title:'员工编号', width:100},      
	           {field:'empName', title:'员工姓名', width:150},     
	           {field:'empSex', title:'性别', width:150,
	        	   formatter:function(value,row,index){
	        		   if(value == '0'){
	        			   return '男';
	        		   } else {
	        			   return '女';
	        		   }
	        	   }
	           },     
	           {field:'department', title:'部门名称', width:150,
	        	   formatter:function(value,row,index){
	        		   return row.department.deptName;
	        	   }
	           },     
	           {field:'job', title:'职位', width:100,
	        	   formatter:function(value,row,index){
	        		   return row.job.jobName;
	        	   }
	           }     
	           ]],
	           pageNumber:1,
	           pageSize:5,
	           pageList:[10,15,20],
	           striped:true,
	           fit: false,
	           pagination:true,
	           sortName:'deptId',
	           onDblClickRow: function(rowIndex, rowData){
	        	   var html = '<div id="dlg"></div>';
	        	   var str = viewDiv();
	        	   
	        	   //右侧信息
	        	   str = str.replace("%ygbh", rowData.empId);
	        	   str = str.replace("%ygxm", rowData.empName);
	        	   str = str.replace("%xb", rowData.empSex == '0' ? '男':'女');
	        	   str = str.replace("%bmmc", rowData.department.deptName);
	        	   str = str.replace("%bmbh", rowData.department.deptId);
	        	   str = str.replace("%zw", rowData.job.jobName);
	        	   str = str.replace("%csny", Transfer(rowData.empBirth));
	        	   str = str.replace("%jtdz", rowData.empAddress);
	        	   
	        	   //左侧照片
	        	   str = str.replace("%time", new Date().getTime());
	        	   str = str.replace("%empPhoto", rowData.empPhoto);

	        	  
	        	   $(html).appendTo($('body'));
	        	   $("#dlg").dialog({
	        		   title: "员工详细信息",
	        		   width: "610px",
	        		   height: "360px",
	        		   content: str,
	        		   modal:true
	        	   })
	           },
	           onLoadSuccess: initSize
		});
	}
	
	function charts(){
        require.config({
            paths: {
                echarts: 'http://localhost:8090/hrmsys/js/dist'
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
                'echarts/chart/pie', // 使用柱状图就加载pie模块，按需加载
                'echarts/chart/line', // 使用柱状图就加载line模块，按需加载
                'echarts/chart/map' // 使用柱状图就加载map模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main')); 
                
                var option = {

            		tooltip : {
            	        trigger: 'axis'
            	    },
            	    legend: {
            	        data:['员工职位信息']
            	    },
            	    xAxis : [
            	             {
            	            	 type : 'category',
            	            	 data : []
            	             }
            	    ],
            	    yAxis : [
            	             {
            	            	 type : 'value',
            	            	 axisLabel: {
            	            		 formatter:function(params){
            	            			 return depts[params];
            	            		 }
            	            	 }
            	             }
            	     ],
            	    series : [
    	              {
    	                  name:'员工职位信息',
    	                  type:'bar',
    	                  data: []
    	              },
            	    ],
            	    calculable:false
				};
                var emps = [];
                var depts = []; 
                var series = [];
                depts.push("-");
                //yAxis
                $.ajax({
                	contentType: 'application/json',
                	dataType: 'json',
                	data:{
                		page: 1,
                		rows: 100,
                	},    
                	async: false,
                	url: 'dept_show',
                	success: function(resobj){
                		var data = eval(('resobj'));
                		for(var i = 0; i < data.length; i++){
                			depts.push(data[i].deptName);
                		}
                	}
                })
                // xAxis、series
                $.ajax({
                	contentType: 'application/json',
                	dataType: 'json',
                	data:{
                		page: 1,
                		rows: 100,
                	},    
                	async: false,
                	url: 'emp_list',
                	success: function(resobj){
                		var data = eval(('resobj')).rows;
                        for(var i = 0; i < data.length; i++){
                        	emps.push(data[i].empName);
                        	for(var j = 0; j < depts.length; j++){
                        		if(data[i].department.deptName == depts[j]){
                        			series.push(j);
                        		}
                        	}
                        }
                        option.xAxis[0].data= emps;
                        option.series[0].data= series;
                	}
                })
                
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
	}
	
	
})
