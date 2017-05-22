$(function(){
	$(document).ready(function(){
		getData();
		$("#edit").bind('click',function(){
			Edititem();
		})
		$("a.textbox-icon.searchbox-button").click(function(){
			var condition = $("#_easyui_textbox_input1").val();
			if(condition == '一键搜'){
				getData();
				return;
			}
			getConditionData(condition);
		})
	})
		
	
	UpdateSub = function(){
		var data = {
			"sub.empId": $("#ygbh").val(),
			"sub.empName": $("#ygmc").val(),
			"sub.subsidyTraffic": $("#jtbt").val(),
			"sub.subsidyEatery": $("#cybt").val(),
			"sub.subsidyTel": $("#hfbt").val(),
			"sub.subsidyId": $("#subId").val()
		}
		$.ajax({
			url: 'sub_save',
			contentType: 'application/json',
			dataType: 'json',
			data: data,
			success: function(resobj){
				var data = eval(('resobj'));
				$("a.panel-tool-close").trigger('click');
				$("#empSubsidy").datagrid("reload");
				tip("更新成功!");
			},
			error: function(){
				console.log("error");
			}
		})
	}
	
	
	//修改配置
	function Edititem(){
		var rows = $("#empSubsidy").datagrid("getSelections");
		var rowData = rows[0];
		if(rows.length != 1){
			tip('请选中一条记录!');
			return;
		}
		//拼接dom
		var html = '<div id="dlgEdit"></div>';
		var str = EditDiv();
		$(html).appendTo($('body'));	
		//弹出对话框
		$("#dlgEdit").dialog({
			title: "编辑配置信息",
			width: "510px",
			height: "360px",
			content: str,
			modal:true
		})
		$("#subId").val(rowData.subsidyId);
		$("#ygbh").val(rowData.empId);
		$("#ygmc").val(rowData.empName);
		$("#cybt option[value='"+rowData.subsidyEatery+"']").attr("selected",'selected');
		$("#hfbt option[value='"+rowData.subsidyTel+"']").attr("selected",'selected');
		$("#jtbt option[value='"+rowData.subsidyTraffic+"']").attr("selected",'selected');
		//重置
		$("a#btnReset").click(function(){
			$("#cybt option[value=400]").prop("selected",'selected');
			$("#jtbt option:first").prop("selected",'selected');
			$("#hfbt option:first").prop("selected",'selected');
		})
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

	
	//编辑配置 模板
	function EditDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table style="margin-left:35px;margin-top:10px; class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">员工编号:</td>'+
		'							<td align="left">'+
		'								<input type="text" id="ygbh" name="ygbh" class="Text01"  readonly style="width:83px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">员工名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="ygmc" name="ygmc" class="Text01"  readonly style="width:83px;"/>'+
		'							</td>'+
		'						</tr>						'+
		'					</table>'+
		'					<table style="margin-left:35px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">交通补贴:</td>'+
		'							<td align="left">'+
		'								<select id="jtbt" style="margin-left: 4px;width: 85px;">'+
		'									<option value="">请选择</option>'+
		'									<option value=50>50</option>'+
		'									<option value=100>100</option>'+
		'									<option value=150>150</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+	
		'					<table style="margin-left:35px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">话费补贴:</td>'+
		'							<td align="left">'+
		'								<select id="hfbt" style="margin-left: 4px;width: 85px;">'+
		'									<option value="">请选择</option>'+
		'									<option value=100>100</option>'+
		'									<option value=150>150</option>'+
		'									<option value=200>200</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+	
		'					<table style="margin-left:35px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">餐饮补贴:</td>'+
		'							<td align="left">'+
		'								<select id="cybt" style="margin-left: 4px;width: 85px;">'+
		'									<option value=400>请选择</option>'+
		'									<option value=400>400</option>'+
		'									<option value=600>600</option>'+
		'									<option value=800>800</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+	
		'				</div>'  +
		'				</div>'  +
		'			<input type="text" id="subId" style="display:none;"/>'+
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="UpdateSub();" class="But01">确定</a><span class="ButInterval"></span><a id="btnReset"  onclick=""  style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	//得到初始数据
	function getData(){
		$("#empSubsidy").datagrid({
			url: "sub_list",
			columns: [[
			     {field:'ck', checkbox:true},
			     {field:'empId', title:'员工编号', width:100},      
			     {field:'empName', title:'员工名称', width:150},     
			     {field:'subsidyTraffic', title:'交通补贴', width:150},     
			     {field:'subsidyEatery', title:'餐饮补贴', width:150},     
			     {field:'subsidyTel', title:'话费补贴', width:100}     
			]],
	        pageNumber:1,
	        pageSize:10,
	        pageList:[5,10,15],
	        striped:true,
	        fit: false,
	        pagination:true,
	        onLoadSuccess: initSize
		});
	}
	
	//模糊查询后数据
	function getConditionData(condition){
		$("#empSubsidy").datagrid({
			url: 'sub_listByCondition?condition=' + condition ,
			columns: [[
					     {field:'ck', checkbox:true},
					     {field:'empId', title:'员工编号', width:100},      
					     {field:'empName', title:'员工名称', width:150},     
					     {field:'subsidyTraffic', title:'交通补贴', width:150},     
					     {field:'subsidyEatery', title:'餐饮补贴', width:150},     
					     {field:'subsidyTel', title:'话费补贴', width:100}     
					]],
	       pageNumber:1,
	       pageSize:10,
	       pageList:[5,10,15],
	       striped:true,
	       fit: false,
	       pagination:true,
	       onLoadSuccess: initSize
		});
	}
	
	function initSize(){
		$('#empSubsidy').datagrid('resize', {
	        width: $("body").width() - 10,
	        height: $("body").height() - 80	
	    })
	}
})