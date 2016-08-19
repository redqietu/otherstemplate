(function($){

//	点击播放视频
var p_url='http://play.video.qcloud.com/iplayer.html?$appid=1251955771&$fileid=14651978969262046952',
	w=510,
	h=300,
	auto=1; // auto等于0为不自动播放，等于1为自动播放
$('.mt-player-btn').click(function(){
	$(this).hide();
	$('.mt-p-close').show();
	$('.mt-iframe-box').addClass('mark-css');
	$('.mt-iframe-box').append('<iframe src="'+p_url+'&$autoplay='+auto+'&$sw='+w+'&$sh='+h+'" frameborder="0" width="'+w+'" height="'+h+'" scrolling="no"></iframe>');
});
$('.mt-iframe-box, .mt-p-close').mouseover(function(){
	if($(this).hasClass('mark-css')){
		$('.mt-p-close i').show();
	}
});
$('.mt-p-close').click(function(){
	$(this).hide();
	$(this).find('i').hide();
	$('.mt-iframe-box iframe').remove();
	$(this).removeClass('mark-css');
	$('.mt-player-btn').show();
});

// 点击区域外关闭层
$(document).on('mouseover', function(e){
	if($(e.target).parents('.mt-iframe-box,.mt-p-close').length == 0){
		$('.mt-p-close i').hide();
	}
});

// 遍历大图
var focus_n=$('.mt-owl-ul img');
var focus_bd=$('.mt-owl-ul');
var str='';
for(var i = 0; i < focus_n.length; i++) {
	var data_img=focus_n.eq(i).attr('data-large-img');
    str +='<div class="item">';
    str +='<img src="'+data_img+'" alt="" />';
    str +='</div>';
    $('#owl-demo-2').html(str);
}

// 焦点图
var owl_1 = $('.tsl-owl-box-2');
    owl_1.owlCarousel({
        navigation : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem : true,
        autoPlay : true,
        afterUpdate : false
    });

// 关闭按钮
$('.mt-close-btn').click(function(){
	$('.mt-player-btn').show();
	$('.scroll-mask, .mt-mask-box').hide();
	$('.mt-iframe-box iframe').remove();
    focus_bd.show();
});

// 点击遍历焦点图库
$('.mt-owl-ul li').click(function(){
    $('.scroll-mask').show();
    $('body').append('<span class="mt-mask-box"></span>');
    owl_1.trigger('owl.goTo',$(this).index());
    $('.mt-player-btn').show();
    $('.mt-iframe-box iframe').remove();
    $('.mt-p-close').hide();
});

// 表单提交
$('.submit-btn').click(function () {		
	//表单验证 开始	
	var data_1   = $('#name-input').val(),
		data_2   = $('#phone-input').val(),
		data_3   = $('#form_prov').val(),
		data_4   = $('#form_city').val(),
		data_5   = $('#form_saler').val(),
		data_6   = $('#car-input').val();
	
	// var partten = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
 //    if(!partten.test(data_1)){
	// 	$('#name-input').focus();
	// 	alert('请填写正确的姓名，只能填写中文或英文！');
	// 	return false;
	// }
	var partten = /^([\u4e00-\u9fa5]*[a-zA-Z]*\s?)*$/;
	if (!partten.test(data_1)) {
		$('#name-input').focus();
		alert('请填写正确的姓名，只能填写中文或英文！');
		return false;
	}
	
	var partten = /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
    if(!partten.test(data_2)){
		$('#phone-input').focus();
		alert('填写的手机号码格式有误');
		return false;
	}
	if(!$.trim(data_3)){
		alert('请选择省份');
		return false;
	}
	
	if(!$.trim(data_4)){
		alert('请选择城市');
		return false;
	}
	
	// if(!$.trim(data_5)){
	// 	alert('请选择经销商');
	// 	return false;
	// }
	
	if(!$.trim(data_6)){
		alert('请填写试驾车型');
		return false;
	}

	$.post('/?c=special&a=mingyu20160715post', {name: data_1, phone: data_2, province: data_3, city: data_4, jxs: data_5, car: data_6 }, function (response) {
		if (response.status == 'success') {
			ga('send', 'event', 'mingyu_h5', 'baoming', data_2);
			// $('.share-wrap').show();
		} else {
			alert(response.msg);
		}
		return false;
	}, 'json');

});

//城市关联
$('.mt-form').citySelect({
	nodata:"none",
	required:false
});

// 分享js
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"left","bdTop":"81.5"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

})(jQuery)
