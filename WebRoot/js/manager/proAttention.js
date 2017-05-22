$(function(){
	$(document).ready(function(){
		var deptId = window.parent.document.getElementById("deptId").innerHTML;
		var roleId = window.parent.document.getElementById("roleId").innerHTML;
		isExistPro(roleId,deptId);
	})
	
	function manageAttent(deptId){
		$.ajax({
			contentType: 'application/json',
			dataType: 'json',
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
	
	function hrAttent(){
		$.ajax({
			contentType: 'application/json',
			dataType: 'json',
			url: 'pro_getProsByStaId?deptId=' + deptId + '&page=1&rows=10',
			success: function(resobj){
				var data = eval(('resobj'));
				if(data.rows.length > 0){
					$("#tip",window.parent.document).css("display","block").append("<span>" + data.rows.length + "</span>");
				}else{
					$("#tip",window.parent.document).css("display","none");
				}
			}
		})
	}
	
	function isExistPro(roleId,deptId){
		switch(roleId){
			case '2' : manageAttent(deptId);
			break;
			case '3' : hrAttent();
			break;
		}
	}
	
})