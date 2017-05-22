$(function(){
	$(document).ready(function(){
		getData();
	})
	
	function getData(){
		$("#dealProcess").datagrid({
			url: 'pro_getProsByStaId',			
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
			url : 'pro_finishPro?empName=' + empName ,
			data : data,
			success : function(resobj){
				$("#dlg").dialog('close');
				$("#dealProcess").datagrid("reload");
				hrAttent();
				tip("审核通过!");
			}
		})
	}
	
	//驳回
	function EndPro(proId){
		var empName = window.parent.document.getElementById("empName").innerHTML;
		var data = {
				"processId" : proId,				
				"proStatues" : $("#bh").val(),
				"suggestTwo" : $("#bhreason").val()
		}
		if(data.proStatues == "请选择" || data.suggestTwo == ""){
			tip("请填写驳回节点和理由");
			return;
		}
		$.ajax({
			dataType : 'json',
			contentType : 'application/json',
			url : 'pro_killPro?empName=' + empName ,
			data : data,
			success : function(resobj){
				$("#dlg").dialog('close');
				$("#dealProcess").datagrid("reload");
				hrAttent();
				tip("驳回成功!");
			}
		})
	}
	
	function getTem(rowData){
		var jobName = rowData.employee.job.jobName; 
		if(jobName.indexOf('经理') > 0){
			var html = 
				'<span>当前节点:</span><select style="width:100px;margin-top: 10px;">   '+
				'    <option selected >HR</option>   '+
				'</select> <br/> '+
				'<span>驳回节点:</span><select id="bh" style="width:100px;margin-top: 10px;">   '+
				'    <option selected>请选择</option>   '+
				'    <option value= -2 >部门经理</option>   '+
				'</select> <br/> '+
				'<span>驳回理由:</span><textarea id="bhreason" rows="3" cols="20" style="margin-top: 10px;"></textarea>' +
				'<div> '+
				'   <a id="fail" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">驳回</a>  '+
				'   <a id="pass" href="javascript:void(0);" class="easyui-linkbutton" style="width: 60px;height: 30px;margin-top: 15px;margin-left: 15px;">通过</a>  ' +
				'</div>';
		}else{
			var html = 
				'<span>当前节点:</span><select style="width:100px;margin-top: 10px;">   '+
				'    <option selected >HR</option>   '+
				'</select> <br/> '+
				'<span>驳回节点:</span><select id="bh" style="width:100px;margin-top: 10px;">   '+
				'    <option selected>请选择</option>   '+
				'    <option value= -1 >员工</option>   '+
				'    <option value= -2 >部门经理</option>   '+
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
	function hrAttent(){
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