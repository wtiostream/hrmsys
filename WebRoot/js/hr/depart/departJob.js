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
		
		charts();
		
		$("a.textbox-icon.searchbox-button").click(function(){
			var condition = $("#_easyui_textbox_input1").val();
			if(condition == '一键搜'){
				getData();
				return;
			}
			getConditionData(condition);
		})		
	})
	
	//添加部门职位
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
		getJobId();
		getAllDeptName();
		
		//重置
		$("a#reset").click(function(){
			$("#bmmc option:first").prop("selected", 'selected');
			$("#gwgz option:first").prop("selected", 'selected');
			$("#zwmc").val("");
			$("#bz").val("");
		})
	} 
	
	//得到默认JobId
	function getJobId(){
		$.ajax({
			url: 'job_getMaxId',
			dataType: 'json',
			contentType: 'application/json',
			success: function(resobj){
				var data = eval(('resobj'));
				var num = parseInt(data) + 1;
				$("#zwbh").val(num);
			},
			error: function(){
				console.log("error");
			}
		})
	}
	
	//得到所有的部门名称
	function getAllDeptName(){
		$.ajax({
			url: 'dept_allDeptName',
			dataType: 'json',
			contentType: 'application/json',
			success: function(resobj){
				var data = eval(('resobj'));
				for(var i = 0; i < data.length; i++){
					$("#bmmc").append("<option value=" + data[i].deptId+ " >" + data[i].deptName + "</option>")
				}
			},
			error: function(){
				console.log('error');
			}
		})
	}
	
	//编辑部门
	function Edititem(){
		var rows = $("#departJob").datagrid("getSelections");
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
		$("#zwbh1").val(rowData.jobId);
		$("#bmmc1").val(rowData.department.deptName);
		$("#zwmc1").val(rowData.jobName);
		$("#bz1").val(rowData.jobRemark);
		$("#gwgz option[value='"+rowData.jobBasicWage+"']").attr("selected",'selected');
		
		//重置
		$("a#reset").click(function(){
			$("#gwgz option[value='"+rowData.jobBasicWage+"']").attr("selected",'selected');
			$("#bz").val(rowData.jobRemark);
			$("#zwmc").val(rowData.jobName);
		})
		//确认
		$("a#btnOK").bind("click",function(){
			var data = {
					"job.jobId": $("#zwbh").val(),
					"job.jobName" : $("#zwmc").val(),
					"job.jobRemark": $("#bz").val(),
					"job.jobBasicWage": $("#gwgz").val(),
					"job.department.deptId": rowData.department.deptId
			}
			$.ajax({
				url: 'job_saveOrUpdate',
				dataType: 'json',
				contentType: 'application/json',
				data: data,
				success: function(resobj){
					var data = eval(('resobj'));
					$("a.panel-tool-close").trigger('click');
					tip("更新成功!");
					$("#departJob").datagrid("reload");
				},
				error: function(){
					console.log("error");
				}
			})
		})
	}
	
	//删除职位
	function Delitem(){
		var row = $("#departJob").datagrid("getSelections");
		if(row.length == 0){
			tip('请选择要删除的记录!');
			return;			
		}else{
			$.messager.confirm('提示','确认删除所选条目吗?', function(r){
				if (r){
					//删除操作
					var ids = "";
					for(var i = 0; i < row.length; i++){
						ids += row[i].jobId;
						if(i != row.length - 1){
							ids += ",";
						}
					}
					$.ajax({
						url:'job_delete' ,
						data: {
							ids: ids
						},
						success: function(resobj){
							tip("删除成功!");	
							$("#departJob").datagrid("reload");
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
	
	//添加部门职位div
	function AddDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">职位编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="zwbh" name="zwbh" class="Text01"  disabled style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<select id="bmmc" style="margin-left: 4px;width: 85px;">'+
		'									<option value="">请选择</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">职位名称：</td>'+
		'							<td align="left">'+		
		'								<input type="text" id="zwmc" name="zwmc"  class="Text01"  style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">基本工资：</td>'+
		'							<td align="left">'+
		'								<select id="gwgz" style="margin-left: 4px;width: 85px;">'+
		'									<option selected value="">请选择</option>'+
		'									<option value=3000>3000</option>'+
		'									<option value=3500>3500</option>'+
		'									<option value=4000>4000</option>'+
		'									<option value=4500>4500</option>'+
		'									<option value=5000>5000</option>'+
		'									<option value=5500>5500</option>'+
		'									<option value=6000>6000</option>'+
		'								</select>'+
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
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="UpdateDptJob();" class="But01">确定</a><span class="ButInterval"></span><a id="reset" style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	//编辑部门职位div
	function EditDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">职位编号：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="zwbh1" name="zwbh" class="Text01"  disabled style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">部门名称：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bmmc1" name="bmmc"  class="Text01"  readonly style="width:85px;"/>'+		
		'							</td>'+
		'						</tr>						'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">职位名称：</td>'+
		'							<td align="left">'+		
		'								<input type="text" id="zwmc1" name="zwmc"  class="Text01"  style="width:75px;"/>'+
		'							</td>'+
		'							<td align="right" class="Table01_l">基本工资：</td>'+
		'							<td align="left">'+
		'								<select id="gwgz" style="margin-left: 4px;width: 85px;">'+
		'									<option selected value="">请选择</option>'+
		'									<option value=3000>3000</option>'+
		'									<option value=3500>3500</option>'+
		'									<option value=4000>4000</option>'+
		'									<option value=4500>4500</option>'+
		'									<option value=5000>5000</option>'+
		'									<option value=5500>5500</option>'+
		'									<option value=6000>6000</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">备注：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="bz1" name="bz" maxlength="20" class="Text01" style="width:106px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);"  class="But01">确定</a><span class="ButInterval"></span><a id="reset" style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	//添加确认按钮
	UpdateDptJob = function(){
		var data = {
				"job.jobId": $("#zwbh").val(),
				"job.jobName" : $("#zwmc").val(),
				"job.jobRemark": $("#bz").val(),
				"job.jobBasicWage": $("#gwgz").val(),
				"job.department.deptId": $("#bmmc").val()
		}
		$.ajax({
			url: 'job_saveOrUpdate',
			dataType: 'json',
			contentType: 'application/json',
			data: data,
			success: function(resobj){
				var data = eval(('resobj'));
				$("a.panel-tool-close").trigger('click');
				tip("更新成功!");
				$("#departJob").datagrid("reload");
			},
			error: function(){
				console.log("error");
			}
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
	
	function getData(){
		$("#departJob").datagrid({
			url: "job_list",
			columns: [[
			           {field:'ck', checkbox:true},
			           {field:'jobId', title:'职位编号', width:100},    
			           {field:'deptName', title:'部门名称', width:150,
			        	   formatter:function(value,row,index){
			        		   return row.department.deptName;
			        	   }
			           },     
			           {field:'jobName', title:'职位名称', width:150},     
			           {field:'jobBasicWage', title:'基本工资', width:150},     
			           {field:'jobRemark', title:'备注', width:100}     
			           ]],
			           pageNumber:1,
			           pageSize:5,
			           pageList:[5,10,15],
			           striped:true,
			           fit: false,
			           pagination:true,
			           sortName:'JobId',
			           onLoadSuccess: initSize
		});
	}
	
	function getConditionData(condition){
		$("#departJob").datagrid({
			url: 'job_listByCondition?condition=' + condition ,
			columns: [[
			           {field:'ck', checkbox:true},
			           {field:'jobId', title:'职位编号', width:100},    
			           {field:'deptName', title:'部门名称', width:150,
			        	   formatter:function(value,row,index){
			        		   return row.department.deptName;
			        	   }
			           },     
			           {field:'jobName', title:'职位名称', width:150},     
			           {field:'jobBasicWage', title:'基本工资', width:150},     
			           {field:'jobRemark', title:'备注', width:100}     
			           ]],
			           pageNumber:1,
			           pageSize:10,
			           pageList:[5,10,15],
			           striped:true,
			           fit: false,
			           pagination:true,
			           sortName:'JobId',
			           onLoadSuccess: initSize
		});
	}
	
	function initSize(){
		$('#departJob').datagrid('resize', {
	        width: 1000,
	        height: 200	
	    })
	}
	
	//图表
	function charts(){
        require.config({
            paths: {
                echarts: 'http://localhost:8090/hrmsys/js/dist'
            }
        });
        
        dataRangeStyle = [
      					{
      					     min: 0,
      					     max: 2000,
      					     formatter : function(v, v2){
      					         if (v2 < 1000) { return '低于' + v2}
      					         else if (v > 1000) { return '高于' + v}
      					         else { return '中' }
      					     }
      					 }
      			    ]	 
        
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
            	        data:[]
            	    },
            	    xAxis : [
            	             {
            	                 type : 'category',
            	                 axisLabel:{
            	                	 interval: 0
            	                 },
            	                 data : []
            	             }
            	    ],
            	    yAxis : [
            	             {
            	                 type : 'value'
            	             }
            	    ],
            	    series : [
    	              {
    	                  name:'基本薪资',
    	                  type:'bar',
    	                  data: []
    	              },
            	    ],
            	    calculable:false
				};
                var jobName = [];
                var salary = [];
                var depts = [];
                //导航的部门
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
                		option.legend.data= depts;
                	}
                })
                
                
                //职位和薪水
        		$.ajax({
        			dataType : 'json',
        			contentType: 'application/json',
        			url: 'job_echarts',
        			async: false,
        			success: function(resobj){
        				var data = eval(('resobj'));
        				for(var i = 0; i < data.length; i ++){
        					jobName.push(data[i].jobName);
        					salary.push(data[i].jobBasicWage);
        				}
        				option.xAxis[0].data= jobName;
        				option.series[0].data= salary;
        				
        			}
        		})
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
        
	}
	
})