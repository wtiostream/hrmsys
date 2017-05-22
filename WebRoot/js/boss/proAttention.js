$(function(){
	$(document).ready(function(){
		bossAttent();
	})
	
	function bossAttent(){
		$.ajax({
			contentType: 'application/json',
			dataType: 'json',
			url: 'pro_getProsByboss?page=1&rows=100',
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
	
})