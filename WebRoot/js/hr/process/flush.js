$(function(){
	setInterval(function(){
		hrAttent();
	}, 10000)
})


function hrAttent(){
	$.ajax({
		contentType: 'application/json',
		dataType: 'json',
		url: 'pro_getProsByStaId?page=1&rows=10',
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
	