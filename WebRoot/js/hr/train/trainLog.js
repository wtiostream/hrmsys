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
			title: "填写培训记录",
			width: "510px",
			height: "360px",
			content: str,
			modal:true
		});
		getAlltitle();
		
		//评分效果
		$("#Trainer").webwidget_rating_simple({
			rating_star_length: '5',
			rating_initial_value: '',
			rating_function_name: '',
			directory: 'js/rating/star/'
		});
		$("#Emp").webwidget_rating_simple({
			rating_star_length: '5',
			rating_initial_value: '',
			rating_function_name: '',
			directory: 'js/rating/star/'
		});
		$("#HR").webwidget_rating_simple({
			rating_star_length: '5',
			rating_initial_value: '',
			rating_function_name: '',
			directory: 'js/rating/star/'
		});
		//
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
	
	//获取所有主题
	function getAlltitle(){
		$.ajax({
			url:'train_getAllInfo',
			dataType: 'json',
			success: function(resobj){
				var data = eval(('resobj'));
				for(var i=0;i<data.length;i++){
					$("#zt").append("<option value="+ data[i].trainTitle+">" + data[i].trainTitle +"</option>");
				}
				getDetail = function(){
					var title = $("#zt").val();
					if(title == ""){
						$("#zjr").val("");
						$("#jb").val("");
						$("#fbz").val("");
						$("#shijianduan").val("");
					}
					for(var i=0;i<data.length;i++){
						if(data[i].trainTitle == title){
							$("#zjr").val(data[i].trainPerson);
							$("#jb").val(data[i].trainLevel);
							$("#fbz").val(data[i].trainAddPerson);
							$("#shijianduan").val(TransferTime(data[i].trainStartDate) + "~" +TransferTime(data[i].trainEndDate).substring(9,18));
							$("#bh").val(data[i].trainId);
						}
					}
				}
			},
			error: function(){
				console.log("error");
			}
		})
	}
	
	//时间段转化
	function TransferTime(data){
		var year = parseInt(data.year) + 1900;
		var month = parseInt(data.month) + 1 > 12 ? "01" : parseInt(data.month) + 1;
		var time = year + '-' + month + '-' + data.date + ' '+ data.hours + ':' + (data.minutes > 10 ? data.minutes : "0" + data.minutes) + ':'+ (data.seconds > 10 ? data.seconds : "0" + data.seconds);
		return time;
	}

	//重置
	Reset = function(){
		$("#zt").val("");
		$("#zjr").val("");
		$("#jb").val("");
		$("#fbz").val("");
		$("#shijianduan").val("");
	}
	
	//培训记录模板 div
	function AddDiv(){
		var html ='	<div class="Popups01" style="width:500px;">'+
		'		<div class="PopupsContent">'+
		'			<div class="PopupsContenta" style="padding:10px; height:250px;">'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr>'+
		'							<td class="Table01_l">主题：</td>'+
		'							<td align="left">'+
		'								<select id="zt" onchange="getDetail();"  style="margin-left: 6px;width: 217px;height: 22px;">'+
		'									<option selected value="">请选择</option>'+
		'								</select>'+
		'							</td>'+
		'						</tr>						'+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr>'+
		'							<td  class="Table01_l">主讲人:</td>'+
		'							<td >'+		
		'								<input type="text" id="zjr" name="zjr" value=""  class="Text01"  readonly style="width:75px;margin-left: 3px;"/>'+
		'							</td>'+
		'							<td class="Table01_l">级别：</td>'+
		'							<td >'+
		'								<input type="text" id="jb" name="jb" value=""  class="Text01"  readonly style="width:70px;margin-left: 3px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table style="margin-left:30px;margin-top:10px;">'+
		'						<tr>'+
		'							<td  class="Table01_l">时间段:</td>'+
		'							<td >'+		
		'								<input type="text" id="shijianduan" name="shijianduan"  readonly style="width:200px;margin-left: 3px;height:22px;"/>'+
		'							</td>'+
		'						</tr> '+
		'					</table>'+
		'					<table style="margin-left:15px;margin-top:10px;">'+
		'						<tr> '+
		'							<td align="right" class="Table01_l">讲师评分:</td>'+
		'							<td align="left">'+
		'								<input type="hidden" id="Trainer" name="Trainer" maxlength="20" value="" class="Text01" readonly style="width:106px;"/>'+
		'							</td>'+
		'						</tr> '+
		'						<tr> '+
		'							<td align="right" class="Table01_l">职员评分:</td>'+
		'							<td align="left">'+
		'								<input type="hidden" id="Emp" name="Emp" maxlength="20" class="Text01" value="" readonly style="width:106px;"/>'+
		'							</td>'+
		'						</tr> '+
		'						<tr> '+
		'							<td align="right" class="Table01_l">HR评分:</td>'+
		'							<td align="left">'+
		'								<input type="hidden" id="HR" name="HR" maxlength="20" class="Text01" value="" readonly style="width:106px;"/>'+
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
		' 					<input type="hidden" id="bh" style="dispaly:none"/>'+
		'				</div>'  +
		'				<div class="ButBox01" style="text-align:right;"><a id="btnOK" href="javascript:void(0);" onclick="AddTrainLog();" class="But01">确定</a><span class="ButInterval"></span><a id=""  onclick="Reset();"  style="margin-right: 10px;" href="javascript:void(0);" class="But01">重置</a></div>' +
		'				</div>';
		return html;
	}
	
	function convertMsg(data){
		switch(data){
			case '1': return '不满意';
			case '2': return '一般';
			case '3': return '满意';
			case '4': return '比较满意';
			case '5': return '非常满意';
			case	'' : return "";
		}
	}
	
	AddTrainLog = function(){
		var data = {
				"trainRecord.train.trainId": $("#bh").val(),
				"trainRecord.trainTitle": $("#zt").val(),
				"trainRecord.trainPerson": $("#zjr").val(),
				"trainRecord.trecordDate": $("#shijianduan").val(),
				"trainRecord.trecordAddPerson": window.parent.document.getElementById("currentName").innerHTML,
				"trainRecord.trecordTrainer": convertMsg($("#Trainer").val()),
				"trainRecord.trecordEmp": convertMsg($("#Emp").val()),
				"trainRecord.trecordHR": convertMsg($("#HR").val())
		}
		if(convertMsg($("#Trainer").val()) == '' || convertMsg($("#Emp").val()) == '' || convertMsg($("#HR").val()) == ''){
			alert("123");
			return;
		}
			
			
		$.ajax({
			url: 'tRecord_save',
			data: data,
			dataType: 'json',
			contentType: 'application/json',
			success: function(resobj){
				$("a.panel-tool-close").trigger('click');
				tip("添加成功!");
				$("#trainLog").datagrid("reload");
				charts();
			},
			error: function(){
				console.log("error");
			}
		})
	}
	
	//删除
	function Delitem(){
		var row = $("#trainLog").datagrid("getSelections");
		if(row.length == 0){
			tip('请选择要删除的记录!');
			return;			
		}else{
			$.messager.confirm('提示','确认删除所选条目吗?', function(r){
				if (r){
					//删除操作
					var ids = "";
					for(var i = 0; i < row.length; i++){
						ids += row[i].trecordId;
						if(i != row.length - 1){
							ids += ",";
						}
					}
					$.ajax({
						url:'tRecord_delete' ,
						data: {
							ids: ids
						},
						success: function(resobj){
							tip("删除成功!");	
							$("#trainLog").datagrid("reload");
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
	
	//DataGrid数据
	function getData(){
		$("#trainLog").datagrid({
			url: "tRecord_list",
			columns: [[
			     {field:'ck', checkbox:true},
			     {field:'trainTitle', title:'主题', width:150},      
			     {field:'trainPerson', title:'主讲人', width:150},     
			     {field:'trecordDate', title:'时间段', width:180},
			     {field:'trecordTrainer', title:'讲师评分', width:100},     
			     {field:'trecordEmp', title:'员工评分', width:100},     
			     {field:'trecordHR', title:'HR评分', width:100},     
			     {field:'trecordAddPerson', title:'审核员', width:100}     
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
	
	//模糊查询数据
	function getConditionData(condition){
		$("#trainLog").datagrid({
			url: "tRecord_listByCondition?condition=" +condition,
			columns: [[
			           {field:'ck', checkbox:true},
			           {field:'trainTitle', title:'主题', width:150},      
			           {field:'trainPerson', title:'主讲人', width:150},     
			           {field:'trecordDate', title:'时间段', width:180},
			           {field:'trecordTrainer', title:'讲师评分', width:100},     
			           {field:'trecordEmp', title:'员工评分', width:100},     
			           {field:'trecordHR', title:'HR评分', width:100},     
			           {field:'trecordAddPerson', title:'审核员', width:100}     
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
	
	function TransferBegin(){
		
	}
	//固定大小
	function initSize(){
		$('#trainLog').datagrid('resize', {
	        width: 1000,
	        height: 200	
	    })
	}
	
	//echarts
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
            	        data:['学员评分','讲师评分','hr评分']
            	    },
            	    xAxis : [
            	             {
            	                 type : 'category',
            	                 data : []
            	             }
            	    ],
            	    yAxis : [
            	             {
            	                 type : 'value',
            	                 boundaryGap: true,
            	                 axisLabel:{
            	                	 formatter:function(params){
            	                		 switch (params) {
										case 1:
											return '不满意';
											break;
										case 2:
											return '一般';
											break;
										case 3:
											return '满意';
											break;
										case 4:
											return '比较满意';
											break;
										case 5:
											return '非常满意';
											break;
										}
            	                	 }
            	                 }
            	             }
            	    ],
            	    series : [
    	              {
    	                  name:'学员评分',
    	                  type:'bar',
    	                  data: []
    	              },
    	              {
    	            	  name:'讲师评分',
    	            	  type:'bar',
    	            	  data: []
    	              },
    	              {
    	            	  name:'hr评分',
    	            	  type:'bar',
    	            	  data: []
    	              },
            	    ],
            	    calculable:false
				};
                var title = [];
                var emp = [];
                var trainer = [];
                var hr = [];
                $.ajax({
                	contentType: 'application/json',
                	dataType: 'json',
                	data:{
                		page: 1,
                		rows: 100,
                	},    
                	async: false,
                	url: 'tRecord_list',
                	success: function(resobj){
                		var data = eval(('resobj')).rows;
                        for(var i = 0; i < data.length; i++){
                        	title.push(data[i].trainTitle);
                        	switch(data[i].trecordEmp){
                        	case '非常满意':
                        		emp.push(5);
                        		break;
                        	case '比较满意':
                        		emp.push(4);
                        		break;
                        	case '满意':
                        		emp.push(3);
                        		break;
                        	case '一般':
                        		emp.push(2);
                        		break;
                        	case '不满意':
                        		emp.push(1);
                        	}
                        	switch(data[i].trecordTrainer){
                        	case '非常满意':
                        		trainer.push(5);
                        		break;
                        	case '比较满意':
                        		trainer.push(4);
                        		break;
                        	case '满意':
                        		trainer.push(3);
                        		break;
                        	case '一般':
                        		trainer.push(2);
                        		break;
                        	case '不满意':
                        		trainer.push(1);
                        	}
                        	switch(data[i].trecordHR){
                        	case '非常满意':
                        		hr.push(5);
                        		break;
                        	case '比较满意':
                        		hr.push(4);
                        		break;
                        	case '满意':
                        		hr.push(3);
                        		break;
                        	case '一般':
                        		hr.push(2);
                        		break;
                        	case '不满意':
                        		hr.push(1);
                        	}
                        }
                        option.xAxis[0].data= title;
                        option.series[0].data= emp;
                        option.series[1].data= trainer;
                        option.series[2].data= hr;
                	}
                })
                
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
	}
	

})