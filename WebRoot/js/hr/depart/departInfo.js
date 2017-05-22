$(function(){
	$(document).ready(function(){
		getData();
		$("#add").bind('click', function(){
			Additem();
		})
		$("#edit").bind('click',function(){
			Edititem();
		})
		$("#del").bind('click',function(){
			Delitem();
		})
		$("a.textbox-icon.searchbox-button").click(function(){
			var condition = $("#_easyui_textbox_input1").val();
			if(condition == '一键搜'){
				getData();
				return;
			}
			getConditionData(condition);
		})
		
		Chart();
	})
		
	//增加部门
	function Additem(){
		var str = AddDiv();
		var html = '<div id="Adddlg"></div>';
		$(html).appendTo($('body'));	
		$("#Adddlg").dialog({
			title: "添加部门",
			width: "510px",
			height: "360px",
			content: str,
			modal:true
		})
		getDeptId();
	}
	
	//得到部门默认下一位ID
	function getDeptId(){
		$.ajax({
			url: 'dept_getMaxId',
			contentType: 'application/json',
			dataType: 'json',
			async: false,
			success: function(resobj){
				var data = eval(('resobj'));
				var num = parseInt(data) + 1;
				if(num < 10){
					var id = "0" + num;
				}else{
					id = num;
				} 
				$("#bmbh").val(id);
			},
			error: function(){
				console.log('errot');
			}
		})
	}
	
	Reset = function(){
		$("#bmmc").val("");
		$("#bz").val("");
	}
	
	UpdateDpt = function(){
		var data = {
			"dept.deptId": $("#bmbh").val(),
			"dept.deptName": $("#bmmc").val(),
			"dept.deptMgr": $("#bmjl").val(),
			"dept.deptNum": $("#bmrs").val(),
			"dept.deptRemark": $("#bz").val()
		}
		$.ajax({
			url: 'dept_save',
			contentType: 'application/json',
			dataType: 'json',
			data: data,
			success: function(resobj){
				var data = eval(('resobj'));
				$("a.panel-tool-close").trigger('click');
				$("#departInfo").datagrid("reload");
				tip("更新成功!");
				Chart();
			},
			error: function(){
				alert(123);
			}
		})
	}
	
	//删除部门
	function Delitem(){
		var row = $("#departInfo").datagrid("getSelections");
		if(row.length == 0){
			tip('请选择要删除的记录!');
			return;			
		}else{
			$.messager.confirm('提示','确认删除所选条目吗?', function(r){
				if (r){
					//删除操作
					var ids = "";
					for(var i = 0; i < row.length; i++){
						ids += row[i].deptId;
						if(i != row.length - 1){
							ids += ",";
						}
					}
					$.ajax({
						url:'dept_delete' ,
						data: {
							ids: ids
						},
						success: function(resobj){
							tip("删除成功!");	
							$("#departInfo").datagrid("reload");
							Chart();
						},
						error: function(){
							console.log("error")
						}
					})
				}
			});
		}
	}
	
	//编辑部门
	function Edititem(){
		var rows = $("#departInfo").datagrid("getSelections");
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
			title: "编辑部门信息",
			width: "510px",
			height: "360px",
			content: str,
			modal:true
		})
		$("#bmbh1").val(rowData.deptId);
		$("#bmmc1").val(rowData.deptName);
		$("#bmjl1").val(rowData.deptMgr);
		$("#bmrs1").val(rowData.deptNum);
		$("#bz").val(rowData.deptRemark);
		//重置
		$("a#btnReset").click(function(){
			$("#bmmc").val(rowData.deptName);
			$("#bz").val(rowData.deptRemark);
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
	//添加部门 div
	function AddDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmbh" name="bmmc" class="Text01"  disabled style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmmc" name="bmmc" class="Text01"  style="width:85px;"/>'+
		'							</td>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门经理：</td>'+
		'							<td align="left">'+		
		'								<input type="text" id="bmjl" name="bmjl" value="暂无" readonly class="Text01"  readonly style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">部门人数：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmrs" name="bmrs" value="0" readonly class="Text01"  readonly style="width:85px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">备注：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bz" name="bz" maxlength="20" class="Text01" style="width:106px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="UpdateDpt();" class="But01">确定</a><span class="ButInterval"></span><a id=""  onclick="Reset();"  style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	//编辑部门 div
	function EditDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmbh1" name="bmmc" class="Text01"  disabled style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmmc1" name="bmmc" class="Text01"  style="width:85px;"/>'+
		'							</td>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">部门经理：</td>'+
		'							<td align="left">'+		
		'								<input type="text" id="bmjl1" name="bmjl" value="暂无" readonly class="Text01"  readonly style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">部门人数：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmrs1" name="bmrs" class="Text01"  readonly style="width:85px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">备注：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bz" name="bz" maxlength="20" class="Text01" style="width:106px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="UpdateDpt();" class="But01">确定</a><span class="ButInterval"></span><a id="btnReset"  onclick=""  style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	//得到初始数据
	function getData(){
		$("#departInfo").datagrid({
			url: "dept_list",
			columns: [[
			     {field:'ck', checkbox:true},
			     {field:'deptId', title:'部门编号', width:100},      
			     {field:'deptName', title:'部门名称', width:150},     
			     {field:'deptMgr', title:'部门经理', width:150},     
			     {field:'deptNum', title:'部门人数', width:150},     
			     {field:'deptRemark', title:'备注', width:100}     
			]],
	        pageNumber:1,
	        pageSize:5,
	        pageList:[5,10,15],
	        striped:true,
	        fit: false,
	        pagination:true,
	        onLoadSuccess: initSize
		});
	}
	
	//模糊查询后数据
	function getConditionData(condition){
		$("#departInfo").datagrid({
			url: 'dept_listByCondition?condition=' + condition ,
			columns: [[
			           {field:'ck', checkbox:true},
			           {field:'deptId', title:'部门编号', width:100},      
			           {field:'deptName', title:'部门名称', width:150},     
			           {field:'deptMgr', title:'部门经理', width:150},     
			           {field:'deptNum', title:'部门人数', width:150},     
			           {field:'deptRemark', title:'备注', width:100}     
			           ]],
			           pageNumber:1,
			           pageSize:5,
			           pageList:[5,10,15],
			           striped:true,
			           fit: false,
			           pagination:true,
			           onLoadSuccess: initSize
		});
	}
	
	function initSize(){
		$('#departInfo').datagrid('resize', {
	        width: 1000,
	        height: 200	
	    })
	}
	
	//图表
	function Chart(){
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
                'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main')); 
                
                var option = {
	                		
					   title : {
					        text: '公司部门人员分布',
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c}(人)"
					    },
					    legend: {
					        orient : 'vertical',
					        x : 'left',
					        data:[]
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType : {
					                show: true, 
					                type: ['pie', 'funnel'],
					                option: {
					                    funnel: {
					                        x: '25%',
					                        width: '50%',
					                        funnelAlign: 'left',
					                        max: 1548
					                    }
					                }
					            },
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    series : [
					        {
					            name:'访问来源',
					            type:'pie',
					            radius : '55%',
					            center: ['50%', '45%'],
					            data:[]               
					        }
					    ]
					};
                $.ajax({
                	contentType : 'application/json',
                	dataType: 'json',
                	url: 'dept_list',
                	async: false,
                	data:{
                		page: 1,
                		rows: 100
                	},
                	success: function(resobj){
                		var data = eval(('resobj')).rows;
                		var names = [];
                		var depts = [];
                		for(var i = 0; i<data.length; i++){
                			var obj = {};
                			obj.value = data[i].deptNum;
                			obj.name = data[i].deptName;
                			names.push(data[i].deptName);
                			depts.push(obj);
                		}
                		option.series[0].data= depts;
                		option.legend.data= names;
                	}
                
                })
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
	}
})