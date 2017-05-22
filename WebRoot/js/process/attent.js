$(function(){
	$(document).ready(function(){
		var empId = window.parent.document.getElementById("empId").innerHTML;	
		//得到datagrid
		getData(empId,"");
		$("#dd").datebox({
			 onSelect: function(date){
			        var date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			        getData(empId, date);
			    }
		});
	})
	
	function TransferDate(value,row,index){
		var year = parseInt(value.year) + 1900;
		var month = parseInt(value.month) + 1 > 12 ? "01" : parseInt(value.month) + 1;
		var time = year + '-' + month + '-' + value.date ;
		return time;
	}

	function TransferTime(value, row, index){
		var minutes = parseInt(value.minutes) > 10 ? value.minutes : '0' + value.minutes;
		var seconds = parseInt(value.seconds) > 10 ? value.seconds : '0' + value.seconds;
		return value.hours + ":" + minutes + ":" +  seconds;
	}
	
	function initSize(){
		$('#attentInfo').datagrid('resize', {
	        width: $("body").width() - 10,
	        height: $("body").height() - 80	
	    })
	}
	function getData(empId,condition){
		$("#attentInfo").datagrid({
			url: 'attent_getlistByConditon?empId=' + empId +'&condition=' + condition,
			columns: [[
	           {field:'ck', checkbox:true},
	           {field:'attentTime', title:'日期', width:100,
	        	   formatter: TransferDate,
	        	   styler: function(value,row,index){
//                       return 'color:red;';
	        	   }
	           },      
	           {field:'amTime', title:'上午打卡时间', width:150,
	        	   formatter: TransferTime,
	           },     
	           {field:'fix1', title:'系统默认时间', width:150,
	        	   formatter: function(){
	        		   return "12:00:00";
	        	   }
	           },     
	           {field:'fix2', title:'系统默认时间', width:150,
	        	   formatter: function(){
	        		   return "13:30:00";
	        	   }
	           },     
	           {field:'pmTime', title:'下班打卡时间', width:150,
	        	   formatter: TransferTime,
	           },     
	           {field:'status', title:'状态', width:100}     
	           ]],
	           pageNumber:1,
	           pageSize:10,
	           pageList:[5,10,15],
	           striped:true,
	           fit: false,
	           singleSelect:true,
	           pagination:true,
	           onLoadSuccess: initSize
		});
	}
	
})