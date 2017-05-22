$(function(){
	$(document).ready(function(){
		getData();
	})
	
	function getData(){
		$("#dealProcess").datagrid({
			url: 'pro_getProsByboss',			
			columns: [[
	           {field:'ck', checkbox:true},
	           {field:'name', title:'姓名', width:100,
	        	   formatter: function(value,row,index){
	        		   return row.employee.empName;
	        	   }
	           },
	           {field:'employee', title:'职位', width:100,
	        	   formatter:function(value,row,index){
	        		   return value.job.jobName;
	        	   }
	            },
	           {field:'type', title:'类型', width:100,
	            	formatter: function(value,row,index){
	            		if(value == 1){
	            			return "年假"
	            		}else{
	            			return "事假";
	            		}
	            	}
	           },
	        	{field:'beginTime', title:'开始时间', width:100,
	        		formatter: TransferDate,
	        	},
	        	{field:'endTime', title:'结束时间', width:100,
	        		formatter: TransferDate,
	        	},
	        	{field:'reason', title:'事由', width:150,},
	        	{field:'manager', title:'部门经理', width:100,
	        		styler: function(value,row,index){
	        			if (value == ""){
	        				return 'background: #e6e3e2;' ;
	        			    
	        			}else{
	        				return '';
	        			}
	        		},
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	        	{field:'suggestOne', title:'意见', width:100,
	        		styler: function(value,row,index){
	        			if (value == ""){
	        				return 'background: #e6e3e2;' ;
	        			    
	        			}else{
	        				return '';
	        			}
	        		},
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	        	{field:'hr', title:'人事部', width:100,
	        		styler: function(value,row,index){
	        			if (value == ""){
	        				return 'background: #e6e3e2;' ;
	        			    
	        			}else{
	        				return '';
	        			}
	        		},
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	        	{field:'suggestTwo', title:'意见', width:100,
	        		styler: function(value,row,index){
	        			if (value == ""){
	        				return 'background: #e6e3e2;' ;
	        			    
	        			}else{
	        				return '';
	        			}
	        		},
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	           ]],
	           pageNumber:1,
	           pageSize:5,
	           pageList:[5,10],
	           striped:true,
	           fit: false,
	           singleSelect:false,
	           pagination:true,
	           onDblClickRow: function(rowIndex, rowData){
	        	   var html = '<div id="dlg"></div>';
	        	   var str = getTem(rowData);
	        	   $(html).appendTo($('body'));
	        	   $("#dlg").dialog({
	        		   title: "审批",
	        		   width: "280px",
	        		   height: "200px",
	        		   content: str,
	        		   left:600,
	        		   top:100
	        	   })
	        	   $("#pass").click(function(){
	        		   NextPro(rowData.processId);
	        	   })
	        	   $("#fail").click(function(){
	        		   EndPro(rowData.processId);
	        	   })
	           },
	           onLoadSuccess: initSize,
		});
	}
	
	//通过
	function NextPro(proId){
		var empName = window.parent.document.getElementById("empName").innerHTML;
		var data = {
				"pro.processId" : proId,				
		}
		$.ajax({
			dataType : 'json',
			contentType : 'application/json',
			url : 'pro_overPro?empName=' + empName ,
			data : data,
			success : function(resobj){
				$("#dlg").dialog('close');
				$("#dealProcess").datagrid("reload");
				bossAttent();
				tip("审核通过!");
			}
		})
	}
	
	//驳回
	function EndPro(proId){
		var empName = window.parent.document.getElementById("empName").innerHTML;
		var data = {
				"processId" : proId,				
				"proStatues" : $("#jd").val(),
				"suggestThree" : $("#bhreason").val()
		}
		if(data.proStatues == "请选择" || data.suggestThree == ""){
			tip("请填写驳回节点和理由");
			return;
		}
		$.ajax({
			dataType : 'json',
			contentType : 'application/json',
			url : 'pro_rejectPro?empName=' + empName ,
			data : data,
			success : function(resobj){
				$("#dlg").dialog('close');
				$("#dealProcess").datagrid("reload");
				tip("驳回成功!");
				bossAttent();
			}
		})
	}
	
	function getTem(rowData){
		var deptId = rowData.employee.department.deptId;
		var jobName = rowData.employee.job.jobName; 
		if(deptId == "03"){			
			var html = 
				'<span>当前节点:</span><select id="" name="dept" style="width:100px;margin-top: 10px;">   '+
				'    <option selected >Boss</option>   '+
				'</select> <br/> '+
				'<span>驳回节点:</span><select id="jd" name="dept" style="width:100px;margin-top: 10px;">   '+
				'    <option selected>请选择</option>   '+
				'    <option value= -3>HR</option>   '+
				'</select> <br/> '+
				'<span>驳回理由:</span><textarea id="bhreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>' +
				'<div> '+
				'   <a id="fail" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">驳回</a>  '+
				'   <a id="pass" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">通过</a>  ' +
				'</div>';
		}else if(jobName.indexOf('经理') > 0){
			var html = 
				'<span>当前节点:</span><select id="" name="dept" style="width:100px;margin-top: 10px;">   '+
				'    <option selected >Boss</option>   '+
				'</select> <br/> '+
				'<span>驳回节点:</span><select id="jd" name="dept" style="width:100px;margin-top: 10px;">   '+
				'    <option selected>请选择</option>   '+
				'    <option value= -2>部门经理</option>   '+
				'    <option value= -3>HR</option>   '+
				'</select> <br/> '+
				'<span>驳回理由:</span><textarea id="bhreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>' +
				'<div> '+
				'   <a id="fail" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">驳回</a>  '+
				'   <a id="pass" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">通过</a>  ' +
				'</div>';
		}else{
			var html = 
				'<span>当前节点:</span><select id="" name="dept" style="width:100px;margin-top: 10px;">   '+
				'    <option selected >Boss</option>   '+
				'</select> <br/> '+
				'<span>驳回节点:</span><select id="jd" name="dept" style="width:100px;margin-top: 10px;">   '+
				'    <option selected>请选择</option>   '+
				'    <option value= -2>部门经理</option>   '+
				'    <option value= -3>HR</option>   '+
				'</select> <br/> '+
				'<span>驳回理由:</span><textarea id="bhreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>' +
				'<div> '+
				'   <a id="fail" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">驳回</a>  '+
				'   <a id="pass" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">通过</a>  ' +
				'</div>';
		}
		return html;
	}
	
	function initSize(){
		$('#dealProcess').datagrid('resize', {
	        width: 1100,
	        height: 200	
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
	
	function TransferDate(value,row,index){
		var year = parseInt(value.year) + 1900;
		var month = parseInt(value.month) + 1 > 12 ? "01" : parseInt(value.month) + 1;
		var time = year + '-' + month + '-' + value.date ;
		return time;
	}
	
	//待处理流程数提醒
	function bossAttent(){
		$.ajax({
			contentType: 'application/json',
			dataType: 'json',
			
			url: 'pro_getProsByStaId?page=1&rows=10',
			success: function(resobj){
				var data = eval(('resobj'));
				if(data.rows.length > 0){
					$("#tip",window.parent.document).css("display","block").html("<span>" + data.rows.length + "</span>");
				}else{
					$("#tip",window.parent.document).css("display","none");
				}
			}
		})
	}
})