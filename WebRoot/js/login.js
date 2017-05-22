$(function() {
	$(document).ready(function(){
  		$("#_easyui_textbox_input3").bind("keydown", function(e){
  			if(e.keyCode == 13){
  				submitForm();
  			}
  		})
  		submitForm = function (){
  		 	$('#ff').form('submit', {    
  		   		url:'user_login', 
  		   		success:function(res){
  		   			if(res == "1"){
  			   			$.messager.show({
  							title:'提示',
  							msg:'验证码有误!',
  							timeout:1000,
  							width:200,
  							height:20,
  							showType:'show',
  							style:{
  								right:'',
  								top:'',
  								bottom:-document.body.scrollTop-document.documentElement.scrollTop
  							}
  						});	
  						$("#_easyui_textbox_input3").val("");
  						return;
  		   			} else if(res == "2") {
  			   			$.messager.show({
  							title:'提示',
  							msg:'用户名或密码有误!',
  							timeout:1000,
  							showType:'show',  
  							width:200,
  							height:20,
  							style:{
  								right:'',
  								top:'',
  								bottom:-document.body.scrollTop-document.documentElement.scrollTop
  							}
  					     });
  			   			$('#ff').form('clear');  
  						return;
  		   			} 
  		   			var data = eval("("+ res + ")");
  				    window.location.href=data.url;   
  			    }     
  			});  
  	   	}
  		clearForm = function (){
  		 	$('#ff').form('clear');  
  	   	}	
  	})
});

