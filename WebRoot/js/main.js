$(function() {
	//订制高度
	$('.EPContent').height($(window).height());
	onLevel1MenuClick($('#leftNavigationDiv').children()[0]);
	setInterval(function(){
		fnDate();
	}, 1000);
});

function onLevel1MenuClick(a) {
	//重置所有目录到关闭状态
	$('.EPSortNav_on img').attr('src','images/EmphasisPersonnel/EpSubMenu_open.png');
	$('.EPSortNav_on').removeClass('EPSortNav_on');
	$(a).addClass('EPSortNav_on');
	if($(a).next().css("display")!="none"){
		$('.EpSubMenu').hide();
		$(a).next().hide();
		$('.EPSortNav_on img').attr('src','images/EmphasisPersonnel/EpSubMenu_open.png');
	}
	else{
		$('.EpSubMenu').hide();
		//打开当前所选的一级目录
		$(a).next().show();
		$('.EPSortNav_on img').attr('src','images/EmphasisPersonnel/EpSubMenu_close.png');
		//打开当前所选的一级目录的第一个二级目录
		onLevel2MenuClick($(a).next().children()[0]);
	}
}

function onLevel2MenuClick(li) {
	//重置所有二级目录
	$('.EpSubMenu_on').removeClass('EpSubMenu_on');
	//打开当前所选的二级目录
	$(li).addClass('EpSubMenu_on');
	$('#bottomFrame').attr("src", $(li).attr('url'));
}

function fnDate(){
	var date  = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var data = date.getDate();
	var hours = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var time = year+"-"+fnW((month+1))+"-"+fnW(data)+" "+fnW(hours)+":"+fnW(minute)+":"+fnW(second);
	$('#time').html(time);
}

function fnW(str){
	var num;
	str>=10?num=str:num="0"+str;
	return num;
}
