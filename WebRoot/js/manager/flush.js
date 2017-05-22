$(function(){
	var deptId = $("#deptId").html();
	setInterval(function(){
		manageAttent(deptId);
	}, 10000);
});

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
