$(function(){
	$(document).ready(function(){
		var empId = window.parent.document.getElementById("empId").innerHTML;
		var deptId = window.parent.document.getElementById("deptId").innerHTML;
		getDeptNum(deptId);
		getData(deptId);
		echarts(deptId);
		
	})
	
	
	function getDeptNum(deptId){
		$.ajax({
			contentType: 'application/json',
			dataType: 'json',
			data:{
				deptId:deptId
			},
			url:'dept_getNumById',
			success: function(resobj){
				$("#departNum").html(resobj);
			}
		})
	}
	
	function getData(deptId){
		$("#departEmp").datagrid({
			url: 'dept_getEmpsById?deptId=' + deptId,			
			columns: [[
	           {field:'ck', checkbox:true},
	           {field:'empName', title:'姓名', width:100},
	           {field:'empSex', title:'性别', width:100,
	        	   formatter:function(value,row,index){
	        		   if(value == '0'){
	        			   return '男';
	        		   } else {
	        			   return '女';
	        		   }
	        	   }
	           },     
	           {field:'job', title:'职位', width:100,
	        	   formatter:function(value,row,index){
	        		   return value.jobName;
	        	   }
	            },
	           {field:'empTelephone', title:'手机号码', width:150},     
	           {field:'empProfession', title:'专业', width:150}     
	           ]],
	           pageNumber:1,
	           pageSize:10,
	           pageList:[5,10],
	           striped:true,
	           fit: false,
	           singleSelect:true,
	           pagination:true,
	           onLoadSuccess: initSize
		});
	}
	
	function initSize(){
		$('#departEmp').datagrid('resize', {
	        width: 1000,
	        height: 200	
	    })
	}
	
	function echarts(deptId){
	      require.config({
	            paths: {
	                echarts: 'http://localhost:8090/hrmsys/js/dist'
	            }
	        });
	        
	        // 使用
	        require(
	            [
	                'echarts',
	                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
	            ],
	            function (ec) {
	                // 基于准备好的dom，初始化echarts图表
	                var myChart = ec.init(document.getElementById('main')); 
	                
	                var option = {
	                        tooltip: {
	                        	trigger: 'axis'
	                        },
	                        legend: {
	                            data:['部门员工岗位']
	                        },
	                        xAxis : [
	                            {
	                                type : 'category',
	                                data : []
	                            }
	                        ],
	                        yAxis : [{
	                        	type : 'value',
	           	            	 axisLabel: {
	        	            		 formatter:function(params){
	        	            			 return jobs[params];
	        	            		 }
	        	            	 }
 
	                        }],
	                        series : [
	                            {
	                                "name":"部门员工岗位",
	                                "type":"bar",
	                                "data":[]
	                            }
	                        ]
	                   };                
	            var emps = [];
	            var jobs = [];
	            var series = [];
	            jobs.push("-");
	            // y轴数据
        		$.ajax({
        			url: 'job_getJobsBydeptId',
        			type: 'get',
        			contentType: 'application/json',
        			dataType: 'json',
        			async: false,
        			data :{
        				deptId: deptId
        			},
        			success: function(resobj){
        				var data = eval(('resobj'));
        				for(var i = 0; i < data.length; i++){
        					jobs.push(data[i].jobName);
        				}
        			}
        		 })
        		 //x轴数据
        		 $.ajax({
        			 dataType: 'json',
        			async: false,
        			 contentType: 'application/json',
        			 url: 'dept_getEmpsById?deptId=' + deptId,
        			 success: function(resobj){
        				 var data = eval(('resobj'));
        				 for(var i = 0; i < data.length; i++){
        					 emps.push(data[i].empName);
			            	 for(var j = 0; j < jobs.length; j++){
			            		 if(data[i].job.jobName == jobs[j]){
			            			 series.push(j);
			            		 }
			            	 }
        				 }
        				 option.xAxis[0].data= emps;
        				 option.series[0].data= series;
        			 }
        			 
        		 })
	           
	                // 为echarts对象加载数据 
	            myChart.setOption(option); 
	            }
	        )
	}
})