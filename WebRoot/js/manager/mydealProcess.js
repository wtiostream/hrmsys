$(function(){
	$(document).ready(function(){
		var deptId = window.parent.document.getElementById("deptId").innerHTML;
		getData(deptId);
	})
	
	function getData(deptId){
		$("#mydealProcess").datagrid({
			url: 'pro_getProsByDeptId?deptId=' + deptId,			
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
	          {field:'hr', title:'人事部', width:100,
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "待审核";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	           {field:'suggestTwo', title:'意见', width:100,
	        		styler: function(value,row,index){
	        			if (value == "通过"){
	        				return 'color:green;';
	        			}else{
	        				return 'color:red;';
	        			}
	        		},
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "-";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	        	{field:'boss', title:'Boss', width:100,
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "待审核";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	        	{field:'suggestThree', title:'意见', width:100,
	        		styler: function(value,row,index){
	        			if (value == "通过"){
	        				return 'color:green;';
	        			}else{
	        				return 'color:red;';
	        			}
	        		},
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "-";
	        			}else{
	        				return value;
	        			}
	        		}
	        	 }
	           ]],
	           pageNumber:1,
	           pageSize:5,
	           pageList:[5,10],
	           striped:true,
	           fit: false,
	           singleSelect:true,
	           pagination:true,
	           onDblClickRow: function(rowIndex, rowData){
	        	   var html = '<div id="dlg"></div>';
	        	   var str = getTem();
	        	   $(html).appendTo($('body'));
	        	   $("#dlg").dialog({
	        		   title: "审批",
	        		   width: "280px",
	        		   height: "200px",
	        		   content: str,
	        		   modal:true,
	        		   left:600,
	        		   top:100
	        	   })
	        	   
	        	   $("#pass").click(function(){
	        		   NextPro(rowData.processId,deptId);
	        	   })
	        	   $("#fail").click(function(){
	        		   EndPro(rowData.processId);
	        	   })
	           },
	           onLoadSuccess: initSize,
		});
	}
	
	function TransferDate(value,row,index){
		var year = parseInt(value.year) + 1900;
		var month = parseInt(value.month) + 1 > 12 ? "01" : parseInt(value.month) + 1;
		var time = year + '-' + month + '-' + value.date ;
		return time;
	}
	
	//同意
	function NextPro(proId, deptId){
		var empName = window.parent.document.getElementById("empName").innerHTML;
		var data = {
				"pro.processId" : proId,				
		}
		$.ajax({
			dataType : 'json',
			contentType : 'application/json',
			url : 'pro_nextPro?empName=' + empName ,
			data : data,
			success : function(resobj){
				$("#dlg").dialog('close');
				$("#mydealProcess").datagrid("reload");
				manageAttent(deptId);
				tip("审核通过!");
			}
		})
	}
	
	//不同意
	function EndPro(proId, deptId){
		var empName = window.parent.document.getElementById("empName").innerHTML;
		var data = {
				"processId" : proId,	
				"empName" : empName,
				"proStatues" : $("#bh").val(),
				"suggestOne" : $("#bhreason").val(),
		}
		if(data.proStatues == "请选择" || data.suggestOne == ""){
			tip("请输入驳回节点和理由");
			return;
		}
		$.ajax({
			dataType : 'json',
			contentType : 'application/json',
			url : 'pro_endPro',
			data : data,
			success : function(resobj){
				$("#dlg").dialog('close');
				$("#mydealProcess").datagrid("reload");
				manageAttent(deptId);
				tip("审核不通过!");
			}
		})
	}
	
	function getTem(){
		var html = 
		'<span>当前节点:</span><select style="width:100px;margin-top: 10px;">   '+
		'    <option selected >部门经理</option>   '+
		'</select> <br/> '+
		'<span>驳回节点:</span><select id="bh" name="bh" style="width:100px;margin-top: 10px;">   '+
		'    <option selected>请选择</option>   '+
		'    <option value= -1>员工</option>   '+
		'</select> <br/> '+
		'<span>驳回理由:</span><textarea id="bhreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>' +
		'<div> '+
		'   <a id="fail" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">驳回</a>  '+
		'   <a id="pass" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">通过</a>  ' +
		'</div>';
		return html;
	}
	
	function initSize(){
		$('#mydealProcess').datagrid('resize', {
	        width: 1150,
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
	
	function manageAttent(deptId){
		$.ajax({
			contentType: 'application/json',
			dataType: 'json',
			async: 'false',
			url: 'pro_getProsByDeptId?deptId=' + deptId + '&page=1&rows=10',
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