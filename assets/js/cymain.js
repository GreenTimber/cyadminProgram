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
}
// 关闭tab
function closetab(id){
    $(".cytab"+id+"").remove();
    $(".cytabpane"+id+"").remove();
    if($(".cytabpane").hasClass("active")==false) {
        $(".tab-content").find(".tab-pane").removeClass("active");
        $(".nav-tabs").find("li").removeClass("active");
        $(".cytab").toggleClass("active");
        $(".cytabpane").toggleClass("active");
    }
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
 window.onload=function(){
     if(navigator.userAgent.match(/(iPhone|iPad|Android)/i))
     {
         var ifm = document.getElementById("tabbable");
         var h= document.body.clientHeight-85;//设备屏幕高度减去头部标题高度
         ifm.style.height=h + 'px';
         var paneh = $("#tabbable").height()-30;//pane高度(减去tab高度和底部foot高度)
         console.log(document.body.clientHeight,document.body.clientHeight-85,ifm.style.height,$("#tabbable").height()-70);
         document.getElementById("myPane").style.height =paneh+'px';
     }else {
         var ifm = document.getElementById("tabbable");
         var h= document.body.clientHeight-85;//设备屏幕高度减去头部标题高度
         ifm.style.height=h + 'px';
         var paneh = $("#tabbable").height()-70;//pane高度(减去tab高度和底部foot高度)
         console.log(document.body.clientHeight,document.body.clientHeight-85,ifm.style.height,$("#tabbable").height()-70);
         document.getElementById("myPane").style.height =paneh+'px';
     }
     self.setInterval("clock()", 50)
}
/*时间刷新*/
function clock() {
    var date = new Date();
    var seperator1 = "年";
    var seperator2 = "月";
    var seperator3 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator2 + strDate
        + "日 " + date.getHours() + seperator3 + date.getMinutes()
        + ":" + date.getSeconds();
    var currenttime = document.getElementById("currenttime");
    currenttime.innerHTML="<span>当前时间："+currentdate+"</span>";
}
