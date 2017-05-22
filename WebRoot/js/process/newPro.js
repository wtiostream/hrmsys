$(function(){
	$(document).ready(function(){
		initSize();
		var empId = window.parent.document.getElementById("empId").innerHTML;
		$("#nj").click(function(){
			$("#process .panel").eq(0).css("display", "block");
			$("#process .panel").eq(1).css("display", "none");
			getVac(empId);
		})
		$("#sj").click(function(){
			$("#process .panel").eq(1).css("display", "block");
			$("#process .panel").eq(0).css("display", "none");
		})
		
		
		//年假提交
		$("#njbtn").bind('click',function(){
			NJSQ(empId);
		})
		
		//事假提交
		$("#sjbtn").bind('click',function(){
			SJSQ(empId);
		})
		
	})
	
	function initSize(){
		$('#nj').linkbutton({    
		    iconCls: 'icon-add',
		    
		});  
		$('#sj').linkbutton({    
			iconCls: 'icon-add'   
		}); 
		
		$('#njPanel').panel({    
			  width:500,    
			  height:300,    
			  title: '年假申请',  
		});
		$('#sjPanel').panel({    
			width:500,    
			height:250,    
			title: '事假申请',  
		});
		$('div.panel').css({
			"margin-left":"385",
			"margin-top":"25"
		});
		
		$("#process .panel").css("display", "none");
	}
	
	function getVac(empId){
		$.ajax({
			contentType:'json/applicayion',
			dataType:'json',
			url:'emp_getVac?empId=' + empId,
			success: function(resobj){
				var data = eval(('resobj'));
				var num = parseInt(data);
				$("#vac").html(" "+data+"天");
			}
		})
	}
	
	function NJSQ(empId){
		var data = $("#vac").html();
		if(data.substring(1,2) == 0){
			alert("你再看看!");
		}
		
		var data = {
				"pro.beginTime": $("#beginTime").val(),
				"pro.endTime": $("#endTime").val(),
				"pro.reason": $("#njreason").val(),
				"pro.employee.empId": empId,
				"pro.type": 1
		}
		
		$.ajax({
			DataType: 'json',
			ContentType: 'application/json',
			url: 'pro_save',
			data: data,
			success: function(resobj){
				var data = eval(('resobj'));
				$("#beginTime").val("");
				$("#endTime").val("");
				$("#njreason").val("");
				tip("提交成功");
			}
		})
	}
	
	function SJSQ(empId){
		var data = {
				"pro.beginTime": $("#begin").val(),
				"pro.endTime": $("#end").val(),
				"pro.reason": $("#sjreason").val(),
				"pro.employee.empId": empId,
				"pro.type": 2
		}
		
		$.ajax({
			DataType: 'json',
			ContentType: 'application/json',
			url: 'pro_save',
			data: data,
			success: function(resobj){
				var data = eval(('resobj'));
				$("#begin").val("");
				$("#end").val("");
				$("#sjreason").val("");
				tip("提交成功");
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
	
	showSTime = function (){
		//开始时间
		laydate({
	        elem:'#beginTime', //需显示日期的元素选择器
	        format:'YYYY-MM-DD', //日期格式'YYYY-MM-DD hh:mm:ss'
	        event: 'click', //触发事件
			istime: true,
			max:laydate.now(),
		});
	}
	
	STime = function (){
		//开始时间
		laydate({
			elem:'#begin', //需显示日期的元素选择器
			format:'YYYY-MM-DD', //日期格式'YYYY-MM-DD hh:mm:ss'
			event: 'click', //触发事件
			istime: true,
			max:laydate.now(),
		});
	}
	
	showETime = function(){
		//开始时间
		laydate({
	        elem:'#endTime', //需显示日期的元素选择器
	        format:'YYYY-MM-DD', //日期格式'YYYY-MM-DD hh:mm:ss'
	        event: 'click', //触发事件
			istime: true,
			max:laydate.now()
		});
	}
	
	ETime = function(){
		//结束时间
		laydate({
			elem:'#end', //需显示日期的元素选择器
			format:'YYYY-MM-DD', //日期格式'YYYY-MM-DD hh:mm:ss'
			event: 'click', //触发事件
			istime: true,
			max:laydate.now()
		});
	}
})