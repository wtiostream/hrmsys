$(function(){
	$(document).ready(function(){
		getData();
		$("#add").bind('click', function(){
			Additem();
		})
		$("#del").bind('click', function(){
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
		
		charts();
	})
	
	//增加
	function Additem(){
		var str = AddDiv();
		var html = '<div id="Adddlg"></div>';
		$(html).appendTo($('body'));	
		$("#Adddlg").dialog({
			title: "发布培训信息",
			width: "510px",
			height: "360px",
			content: str,
			modal:true
		});
		var name = window.parent.document.getElementById("currentName").innerHTML;
		$("#fbz").val(name);
	}

	//删除
	function Delitem(){
		var row = $("#trainInfo").datagrid("getSelections");
		if(row.length == 0){
			tip('请选择要删除的记录!');
			return;			
		}else{
			$.messager.confirm('提示','确认删除所选条目吗?', function(r){
				if (r){
					//删除操作
					var ids = "";
					for(var i = 0; i < row.length; i++){
						ids += row[i].trainId;
						if(i != row.length - 1){
							ids += ",";
						}
					}
					$.ajax({
						url:'train_delete' ,
						data: {
							ids: ids
						},
						success: function(resobj){
							tip("删除成功!");	
							$("#trainInfo").datagrid("reload");
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
	
	//发布培训信息 div
	function AddDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Table01 Table02">'+
		'						<tr>'+
		'							<td align="right" class="Table01_l">主题：</td>'+
		'							<td align="left">'+
		'								<input type="text" id="zt" name="zt" class="Text01" style="width:212px;"/>'+
		'							</td>'+
		'						</tr>						'+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr>'+
		'							<td  class="Table01_l">主讲人:</td>'+
		'							<td >'+		
		'								<input type="text" id="zjr" name="zjr" value=""  class="Text01"  style="width:75px;margin-left: 3px;"/>'+
		'							</td>'+
		'							<td class="Table01_l">级别：</td>'+
		'							<td >'+
		'								<select id="jb" style="margin-left: 4px;width: 85px; height:22px;">'+
		'									<option value="">请选择</option>'+
		'									<option value="Ⅰ级">Ⅰ级</option>'+
		'									<option value="Ⅱ级">Ⅱ级</option>'+
		'									<option value="Ⅲ级">Ⅲ级</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr>'+
		'							<td  class="Table01_l">时间段:</td>'+
		'							<td >'+		
		'								<input type="text" id="beginTime" name="beginTime"  onclick="showSTime();" style="width:140px;margin-left: 3px;height:22px;"/><span id="seperator"> - </span><input type="text" id="endTime" name="endTime" onclick="showETime();" value="" style="width:140px;height:22px;"/>'+
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
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">发布者:</td>'+
		'							<td align="left">'+
		'								<input type="text" id="fbz" name="fbz" maxlength="20" class="Text01" readonly style="width:106px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="AddTrain();" class="But01">确定</a><span class="ButInterval"></span><a id=""  onclick="Reset();"  style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	//重置
	Reset = function (){
		$("#zt").val("");
		$("#zjr").val("");
		$("#jb").val("");
		$("#beginTime").val("");
		$("#endTime").val("");
		$("#bz").val("");
	}
	
	//添加
	AddTrain = function(){
		var data = {
				"train.trainTitle": $("#zt").val(),
				"train.trainPerson": $("#zjr").val(),
				"train.trainLevel": $("#jb").val(),
				"train.trainStartDate": $("#beginTime").val(),
				"train.trainEndDate": $("#endTime").val(),
				"train.trainAddPerson": $("#fbz").val()
		}
		$.ajax({
			url: 'train_save',
			data: data,
			dataType: 'json',
			contentType: 'application/json',
			success: function(resobj){
				$("a.panel-tool-close").trigger('click');
				tip("添加成功!");
				$("#trainInfo").datagrid("reload");
				charts();
			},
			error: function(){
				console.log("error");
			}
		})
	}
	
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
		$("#trainInfo").datagrid({
			url: "train_list",
			columns: [[
			     {field:'ck', checkbox:true},
			     {field:'trainTitle', title:'主题', width:150},      
			     {field:'trainPerson', title:'主讲人', width:150},     
			     {field:'trainLevel', title:'级别', width:150},     
			     {field:'trainStartDate', title:'开始时间', width:150,
			    	 formatter: TransferBegin
			     },	 
			     {field:'trainEndDate', title:'结束时间', width:150,
			    	 formatter: TransferEnd
			     },     
			     {field:'trainAddPerson', title:'发布人', width:100}     
			]],
	        pageNumber:2,
	        pageSize:5,
	        pageList:[5,10,15],
	        striped:true,
	        fit: false,
	        pagination:true,
	        onLoadSuccess: initSize
		});
	}
	
	//模糊查询后的数据
	function getConditionData(condition){
		$("#trainInfo").datagrid({
			url: 'train_listByCondition?condition=' +condition,
			columns: [[
			           {field:'ck', checkbox:true},
			           {field:'trainTitle', title:'主题', width:150},      
			           {field:'trainPerson', title:'主讲人', width:150},     
			           {field:'trainLevel', title:'级别', width:150},     
			           {field:'trainStartDate', title:'开始时间', width:150,
			        	   formatter: TransferBegin
			           },	 
			           {field:'trainEndDate', title:'结束时间', width:150,
			        	   formatter: TransferEnd
			           },     
			           {field:'trainAddPerson', title:'发布人', width:100}     
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
	
	//转化起始时间
	function TransferBegin(value,row,index){
		var data = row.trainStartDate;
		var year = parseInt(data.year) + 1900;
		var month = parseInt(data.month) + 1 > 12 ? "01" : parseInt(data.month) + 1;
		var time = year + '-' + month + '-' + data.date + ' '+ data.hours + ':' + (data.minutes > 10 ? data.minutes : "0" + data.minutes) + ':'+ (data.seconds > 10 ? data.seconds : "0" + data.seconds);
		return time;
	}
	
	//转化结束时间
	function TransferEnd(value,row,index){
		var data = row.trainEndDate;
		var year = parseInt(data.year) + 1900;
		var month = parseInt(data.month) + 1 > 12 ? "01" : parseInt(data.month) + 1;
		var time = year + '-' + month + '-' + data.date + ' '+ data.hours + ':' + (data.minutes > 10 ? data.minutes : "0" + data.minutes) + ':'+ (data.seconds > 10 ? data.seconds : "0" + data.seconds);
		return time;
	}
	
	//固定大小
	function initSize(){
		$('#trainInfo').datagrid('resize', {
	        width: 1000,
	        height: 200	
	    })
	}
	
	//绑定起始时间
	showSTime = function (){
		//开始时间
		laydate({
	        elem:'#beginTime', //需显示日期的元素选择器
	        format:'YYYY-MM-DD hh:mm:ss', //日期格式'YYYY-MM-DD hh:mm:ss'
	        event: 'click', //触发事件
			istime: true,
			max:laydate.now(),
		});
	}
	
	showETime = function(){
		//结束时间
		laydate({
	        elem:'#endTime', //需显示日期的元素选择器
	        format:'YYYY-MM-DD hh:mm:ss', //日期格式'YYYY-MM-DD hh:mm:ss'
	        event: 'click', //触发事件
			istime: true,
			max:laydate.now()
		});
	}
	
	function charts(){
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
            	        data:['级别']
            	    },
            	    xAxis : [
            	             {
            	                 type : 'value',
            	                 boundaryGap: true,
            	                 axisLabel:{
            	                	 formatter:function(params){
            	                		 return params + '级';
            	                	 }
            	                 }
            	             }
            	    ],
            	    yAxis : [
            	             {
            	                 type : 'category',
            	                 data : []
            	             }
            	    ],
            	    series : [
    	              {
    	                  name:'级别',
    	                  type:'bar',
    	                  data: []
    	              },
            	    ],
            	    calculable:false
				};
                var title = [];
                var level = []; 
                $.ajax({
                	contentType: 'application/json',
                	dataType: 'json',
                	data:{
                		page: 1,
                		rows: 100,
                	},    
                	async: false,
                	url: 'train_list',
                	success: function(resobj){
                		var data = eval(('resobj')).rows;
                        for(var i = 0; i < data.length; i++){
                        	title.push(data[i].trainTitle);
//                        	level.push(data[i].trainLevel);
                        	switch(data[i].trainLevel){
                        	case 'Ⅰ级' :
                        		level.push(1);
                        		break;
                        	case 'Ⅱ级' :
                        		level.push(2);
                        	break;
                        	case  'Ⅲ级' :
                        		level.push(3);
                        	break;
                        	}
                        }
                        option.yAxis[0].data= title;
                        option.series[0].data= level;
                	}
                })
                
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
	}
	
	
})

