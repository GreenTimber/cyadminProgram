(function ($) {
    setInterval(function(){
        $("#cyreload").fadeOut();
    }, 2000);
})(jQuery);


// 增加一个tab
function addtab(menuid,tabname,taburl){
    var cont = menuid;
    if($(".nav-tabs").find("li").hasClass("cytab"+cont)==false) {
        var oAddtab = '';
        oAddtab += '<li class="cytab' + cont + '" >'
        oAddtab += '<a data-toggle="tab" href="#ctab' + cont + '">' + tabname + ''
        oAddtab += '<div class="widget-buttons">'
        oAddtab += ' <i  data-toggle="dispose" class="cytabclose" onclick="closetab(this.id)" id="' + cont + '">'
        oAddtab += '<i class="fa fa-times"></i>'
        oAddtab += '</i>'
        oAddtab += '</div>'
        oAddtab += '</a>'
        oAddtab += '</li>'
        var oAddpane = '';
        oAddpane += '<div id="ctab' + cont + '" class="tab-pane cytabpane' + cont + '">'
        oAddpane += '<iframe  src="'+taburl+'" id="iframe'+cont+'" name="myframe"></iframe>'
        oAddpane += '</div>'
        $("#myTab").append(oAddtab);
        $("#myPane").append(oAddpane);
        closeshade();
        /*添加完tab关闭菜单*/
        /*每次增加一个tab就显示到增加到tab上*/
        $(".tab-content").find(".tab-pane").removeClass("active");
        $(".nav-tabs").find("li").removeClass("active");
        $(".cytab" + cont).toggleClass("active");
        $(".cytabpane" + cont).toggleClass("active");
    }else{
        $(".tab-content").find(".tab-pane").removeClass("active");
        $(".nav-tabs").find("li").removeClass("active");
        $(".cytab"+cont+"").toggleClass("active");
        $(".cytabpane"+cont+"").toggleClass("active");
        closeshade();

    }
    $("#iframe"+cont+"")[0].onload = function () {
        iosIframeWidthBug();
    }
    /*修复ios iframe width bug*/
    function iosIframeWidthBug(){
        //不是 iphone ipad就不执行了
        if (!navigator.userAgent.match(/iPad|iPhone/i))
            return false;
        //获取子iframe
        var iframebody = document.getElementById('iframe'+cont+'').contentWindow.document.body;
        iframebody.style.width = document.body.clientWidth+'px';
    }

    $("#myTab").find("li").each(function () {
        console.log($(this).index());
    });



}



// 关闭tab
function closetab(id){
    $("#myTab").find("li").each(function () {

            if($(".cytab"+id+"").index()==$(this).index()&&$(this).hasClass("active")==true){
                     if($(this).index()+1==$("#myTab").find("li").length){
                         $(this).prev("li").addClass("active");
                         $($(this).prev("li").children().attr("href")).addClass("active");
                         $(this).remove();
                         $($(this).children().attr("href")).remove();
                     }else{
                         $(this).next("li").addClass("active");
                         $($(this).next("li").children().attr("href")).addClass("active");
                         $($(".cytab"+id+"").children().attr("href")).remove();
                         $(".cytab"+id+"").remove();
                     }
                }

            if($(".cytab"+id+"").index()==$(this).index()&&$(this).hasClass("active")==false){
                $($(".cytab"+id+"").children().attr("href")).remove();
                $(".cytab"+id+"").remove();
                }
        });

}
//手机端显示菜单
$('.cymobile-block-menu').click(function () {
    $("#sidebar").toggleClass("hide");
    $(".cymobile-block-menu").hide();
    var s = document.getElementById("shade");
    s.style.display = "block";
});
//关闭遮罩和菜单
$("#shade").on('click',closeshade);
function closeshade() {
    $("#sidebar").removeClass("hide");
    var s = document.getElementById("shade");
    s.style.display = "none";
    $(".cymobile-block-menu").show();
}
/*tab内容适应屏幕高度*/
$(window).resize(function() {
    getclientheight();
});

 window.onload=function(){
          getclientheight();

}


function getclientheight() {
    var ifm = document.getElementById("tabbable");
    var h= document.body.clientHeight-($(".navbar").height()+40);//设备屏幕高度减去头部标题高度
    ifm.style.height=h + 'px';
    var paneh;
    if(document.body.clientWidth<500||document.body.clientHeight<500){
        paneh = $("#tabbable").height();//iphone pane高度
    }else{
        paneh = $("#tabbable").height()-40;//pane高度
    }
    document.getElementById("myPane").style.height =paneh+'px';
    document.getElementById("sidebar").style.height = (document.body.clientHeight-45)+'px';
}
var  h =0;
$(".tabbarright").click(function(){
    if(($("#myTab").scrollLeft()%100==0)==true) {
        h += 100;
        $("#myTab").scrollLeft(h);
    }
});
$(".tabbarleft").click(function(){
    if(h<=0){
        return;
    }
    h -= 100;
    $("#myTab").scrollLeft(h);
});