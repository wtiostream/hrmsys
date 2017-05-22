$(function(){
	$(document).ready(function(){
		var empId = window.parent.document.getElementById("empId").innerHTML;
		var roleId = window.parent.document.getElementById("roleId").innerHTML;
		//得到datagrid
		getData(empId,"",roleId);
	})
	
	function getData(empId,condition,roleId){
		$("#onPro").datagrid({
			url: 'pro_getonPro?empId=' + empId +'&condition=' + condition+'&roleId=' + roleId,
			columns: [[
	           {field:'ck', checkbox:true},
	           {field:'processId', title:'编号', width:100,},
	           {field:'type', title:'类型', width:100,
	        	   formatter : function(value, row, index){
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
	        		formatter : function(value, row, index){
	        			if(value == ""){
	        				return "待审核";
	        			}else{
	        				return value;
	        			}
	        		}
	        	},
	        	{field:'suggestOne', title:'意见', width:100,
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
	           pageList:[5,10,15],
	           striped:true,
	           fit: false,
	           singleSelect:true,
	           pagination:true,
	           onLoadSuccess: initSize
		});
	}
	
	function initSize(){
		$('#onPro').datagrid('resize', {
	        width: 1150,
	        height: 200	
	    })
	}
	
	function TransferDate(value,row,index){
		var year = parseInt(value.year) + 1900;
		var month = parseInt(value.month) + 1 > 12 ? "01" : parseInt(value.month) + 1;
		var time = year + '-' + month + '-' + value.date ;
		return time;
	}
	
})