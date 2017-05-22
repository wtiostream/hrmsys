$(function(){
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
		
	})
	
	//提示
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
	
	//DataGrid数据
	function getData(){
		$("#empSalary").datagrid({
			url: "sal_list",
			columns: [[
			     {field:'ck', checkbox:true},
			     {field:'empId', title:'员工编号', width:150,
		        	   formatter:function(value,row,index){
		        		   return value;
		        	   }
			     },      
			     {field:'empName', title:'员工名称', width:150},     
			     {field:'subsidy', title:'月补贴金额', width:150,
		        	   formatter:function(value,row,index){
		        		   return row.empSubsidy.subsidyTel + row.empSubsidy.subsidyTraffic + row.empSubsidy.subsidyEatery;
		        	   }
			     },     
			     {field:'basicwage', title:'月基本工资', width:150,
		        	   formatter:function(value,row,index){
		        		   return row.job.jobBasicWage;
		        	   }
			     },     
			     {field:'totalsalary', title:'总收入', width:150,
		        	   formatter:function(value,row,index){
		        		   return row.empSubsidy.subsidyTel + row.empSubsidy.subsidyTraffic + row.empSubsidy.subsidyEatery +　row.job.jobBasicWage;
		        	   }
			     }     
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
	
	//模糊查询后的数据
	function getConditionData(condition){
		$("#empSalary").datagrid({
			url: 'sal_listByCondition?condition=' +condition,
			columns: [[
				     {field:'ck', checkbox:true},
				     {field:'empId', title:'员工编号', width:150,
			        	   formatter:function(value,row,index){
			        		   return value;
			        	   }
				     },      
				     {field:'empName', title:'员工名称', width:150},     
				     {field:'subsidy', title:'月补贴金额', width:150,
			        	   formatter:function(value,row,index){
			        		   return row.empSubsidy.subsidyTel + row.empSubsidy.subsidyTraffic + row.empSubsidy.subsidyEatery;
			        	   }
				     },     
				     {field:'basicwage', title:'月基本工资', width:150,
			        	   formatter:function(value,row,index){
			        		   return row.job.jobBasicWage;
			        	   }
				     },     
				     {field:'totalsalary', title:'总收入', width:150,
			        	   formatter:function(value,row,index){
			        		   return row.empSubsidy.subsidyTel + row.empSubsidy.subsidyTraffic + row.empSubsidy.subsidyEatery +　row.job.jobBasicWage;
			        	   }
				     }     
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
	
	//固定大小
	function initSize(){
		$('#empSalary').datagrid('resize', {
	        width: $("body").width() - 10,
	        height: $("body").height() - 80	
	    })
	}
	
	
})

