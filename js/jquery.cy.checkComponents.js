/* -- JQuery计算控件 --
 *
 * Author: vanterc
 * Email: 18936151656@163.com
 * Date: 2017年9月
 *
 */
$.fn.extend({
    /*
* 调用方式举例
* 直接调用$('#selectsql').checkComponents(）
* $('#selectsql').checkComponents({paramType:'select',data:'上海,苏州,南京,深圳,重庆,北京,广东'}）
*
* */
    checkComponents:function (options) {
        //默认值参数
        var settings = $.extend({
            paramType:'select',//控件类型
            data:'1,2,3,4,5,6', //数据
            inputId1:'input1',//控件1
            inputId2:'param2',//控件2
            readonly: true,//结果框是否只读
            formula:'*',//公式
            digit:2//要保留的小数位数
        }, options);
        var  valuepools,valuein;
        if(settings.paramType=="select") {
            //默认值为空
            if (settings.data == "") {
                var id=$(this).attr("id");
                document.getElementById(id).options.add(new Option("暂无记录",""));
            }
            //传入sql
            else if (settings.data.indexOf("select")>-1){
                jQuery.ajax({
                    type: 'POST',
                    async: false,
                    url: "${rc.contextPath}/search/searchSelectValue.json",
                    data: {
                        data : settings.data,
                        id : subdetailid,
                    },
                    dataType: 'json',
                    success: function(data) {
                        var selectpool=new Array()
                        for(var i = 0;i<data.length;i++){
                            selectpool.push( data[i].t_warehouse_name);
                        }
                        valuepools = data;
                        //获得属性值
                    },
                    error : function() {
                        alert("出错啦~！");
                    }
                });
                var selectId =document.getElementById($(this).attr("id"));//将返回的数据添加到select里
                for(var i=0;i<valuepools.length;i++){
                    selectId.options.add(new Option(valuepools[i].name,valuepools[i].name));
                }
            }
            //例如1，2，3的格式
            else{
                var ckoption="";
                var dataArr= new Array(); //定义一数组
                dataArr=settings.data.split(","); //字符分割
                var selectId =document.getElementById($(this).attr("id"));
                for (i=0;i<dataArr.length ;i++ )
                {
                    selectId.options.add(new Option(dataArr[i],dataArr[i]));
                }
            }
        }
        if(settings.paramType=="string"){
            var resultinput = document.getElementById($(this).attr("id"));
            resultinput.readOnly=settings.readonly;
            document.getElementById(settings.inputId1).addEventListener("blur", function()
            {//获取2个input框的值并且去除千分位
                var input1data = (document.getElementById(settings.inputId1).value).replace(/,/g,'');
                var input2data = (document.getElementById(settings.inputId2).value).replace(/,/g,'');;
                var result  = input1data+settings.formula+input2data;//拼接公式字符串
                if(input1data!=""&&input2data!=""){
                    var res = eval(result).toFixed(settings.digit);//将公式字符串转成计算公式
                    //进行千分位分割
                    var a =res.split(".");
                    var r = a[0].replace(/\d+?(?=(?:\d{3})+$)/g, function(s){
                        return s +',';
                    });
                    resultinput.value=r+"."+a[1];
                }
            });
            document.getElementById(settings.inputId2).addEventListener("blur", function()
            {
                var input1data = (document.getElementById(settings.inputId1).value).replace(/,/g,'');
                var input2data = (document.getElementById(settings.inputId2).value).replace(/,/g,'');
                var result  = input1data+settings.formula+input2data;
                if(input1data!=""&&input2data!=""){
                    var res = eval(result).toFixed(settings.digit);
                    var a =res.split(".");
                    var r = a[0].replace(/\d+?(?=(?:\d{3})+$)/g, function(s){
                        return s +',';
                    });
                    resultinput.value=r+"."+a[1];
                }
            });
        }
        if(settings.paramType=="input"){
            var num =document.getElementById($(this).attr("id"));
            if (settings.data.indexOf("select")>-1){
                jQuery.ajax({
                    type: 'POST',
                    async: false,
                    url: "${rc.contextPath}/search/searchSelectValue.json",
                    data: {
                        data : settings.data,
                        id : subdetailid,
                    },
                    dataType: 'json',
                    success: function(data) {
                        var selectpool=new Array()
                        for(var i = 0;i<data.length;i++){
                            selectpool.push( data[i].t_warehouse_name);
                        }
                        var valuepool = data;
                        //获得属性值
                        for(var z in valuepool ){
                            valuein = valuepool[z]
                        }
                    },
                    error : function() {
                        alert("出错啦~！");
                    }
                });
                num.value = valuein;
                num.value.replace(/[^\d\.-]/g, '');
                //数字千分位
                var digit_thousands = num.value.split(".");
                var r = digit_thousands[0].replace(/\d+?(?=(?:\d{3})+$)/g, function (s) {
                    return s + ',';
                });
                if(digit_thousands[1] == undefined){
                    digit_thousands[1]="00";
                }
                num.value = r + "." + digit_thousands[1];

            }else if(settings.data ==""){
                num.value = '0.00';
            }
            else{
                num.value = settings.data;

                num.value.replace(/[^\d\.-]/g, '');
                //数字千分位
                var digit_thousands = num.value.split(".");
                var r = digit_thousands[0].replace(/\d+?(?=(?:\d{3})+$)/g, function (s) {
                    return s + ',';
                });
                if(digit_thousands[1] == undefined){
                    digit_thousands[1]="00";
                }
                num.value = r + "." + digit_thousands[1];

            }
        }
    },


//数字校验方法
    /*
    * @param
    * toplimit 上限值
    * lowerlimit 下限值
    * defaultvalue 默认值
    * num 传入数据
    * digit 需要保留的小数位数
    *
    * */
    checkNumber:function (options) {
        //默认值参数
        var settings = $.extend({
            toplimit:'',//上限值
            lowerlimit:'',//下限值
            defaultvalue:'0',//默认值
            digit:'2'//要保留的小数位数
        }, options);

        var num = document.getElementById($(this).attr("id"));
        num.addEventListener("blur", function(){
            var tplmt = settings.toplimit.toString();
            var lwlmt = settings.lowerlimit.toString();
            //获取上限值
            var rettoplimit;
            if (tplmt.indexOf("select")>-1){
                jQuery.ajax({
                    type: 'POST',
                    async: false,
                    url: "${rc.contextPath}/search/searchSelectValue.json",
                    data: {
                        data : tplmt,
                        id : subdetailid,
                    },
                    dataType: 'json',
                    success: function(data) {
                        var selectpool=new Array()
                        for(var i = 0;i<data.length;i++){
                            selectpool.push( data[i].t_warehouse_name);
                        }
                        var valuepool = data;
                        //获得属性值
                        for(var z in valuepool ){
                            rettoplimit = valuepool[z]
                        }
                    },
                    error : function() {
                        alert("出错啦~！");
                    }
                });
            }else if(tplmt == "") {
                rettoplimit =Infinity;
            }else{
                rettoplimit = tplmt;
            }

            //获取下限值
            var retlowerlimit;
            if (lwlmt.indexOf("select")>-1){
                jQuery.ajax({
                    type: 'POST',
                    async: false,
                    url: "${rc.contextPath}/search/searchSelectValue.json",
                    data: {
                        data : lwlmt,
                        id : subdetailid,
                    },
                    dataType: 'json',
                    success: function(data) {
                        var selectpool=new Array()
                        for(var i = 0;i<data.length;i++){
                            selectpool.push( data[i].t_warehouse_name);
                        }
                        var valuepool = data;
                        //获得属性值
                        for(var z in valuepool ){
                            retlowerlimit = valuepool[z]
                        }
                    },
                    error : function() {
                        alert("出错啦~！");
                    }
                });
            }else if(lwlmt == "") {
                retlowerlimit =  -Infinity;
            }else{
                retlowerlimit = lwlmt;
            }

            //验证数字
            num.value.replace(/[^\d\.-]/g, '');
            //保留传入个数的小数  (default_digit显示格式0.xx /default_digit_p显示格式0xx)/default_digit_f显示为.00
            var default_digit = "0."
            var default_digit_p = ""
            //遍历参数获取小数个数
            for (var i = 0; i < settings.digit; i++) {
                default_digit = default_digit + "0";
                default_digit_p = default_digit_p + "0"
            }
            var default_digit_f = "." + default_digit_p

            var digit_regular = eval("/\\d+\\.\\d{" + settings.digit + "}/");  //动态正则


            if (num.value.indexOf("--") != -1) {
                num.value = default_digit;
            }
            if (num.value.indexOf("..") != -1) {
                num.value = default_digit;
            }
            if (num.value.indexOf("-") > 0) {
                num.value = default_digit;
            }

            //存在负数符号
            if (num.value.indexOf("-") == 0) {
                var digit_negative = num.value.replace("-", "");
                digit_negative += '';
                digit_negative = digit_negative.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
                //alert(w+","+w.indexOf(".."));
                if (/^0+/.test(digit_negative)) { //清除字符串开头的0
                    digit_negative = digit_negative.replace(/^0+/, '');
                }
                if (!/\./.test(digit_negative)) {//为整数字符串在末尾添加.00
                    digit_negative += default_digit_f;
                }
                if (/^\./.test(digit_negative)) { //字符以.开头时,在开头添加0
                    digit_negative = '0' + digit_negative;
                }

                digit_negative += default_digit_p;        //在字符串末尾补零
                digit_negative = digit_negative.match(digit_regular)[0];
                num.value = "-" + digit_negative;
                //alert("最后值："+num.value);
            }
            //不存在负数符号
            if (num.value.indexOf("-") == -1) {

                num.value += '';
                num.value = num.value.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
                if (/^0+/) { //清除字符串开头的0
                    num.value = num.value.replace(/^0+/, '');
                    //console.log("1"+ num.value)
                }
                if (!/\./.test(num.value)) { //为整数字符串在末尾添加.00
                    num.value += default_digit_f;
                    //console.log("2"+ num.value)
                }
                if (/^\./.test(num.value)) { //字符以.开头时,在开头添加0
                    num.value = '0' + num.value;
                    //console.log("3"+ num.value)
                }
                num.value += default_digit_p;//在字符串末尾补零(小数情况)
                //console.log("4:"+ num.value)

                num.value = num.value.match(digit_regular)[0];

            }

            //数字千分位
            var digit_thousands = num.value.split(".");

            var r = digit_thousands[0].replace(/\d+?(?=(?:\d{3})+$)/g, function (s) {
                return s + ',';
            });
            num.value = r + "." + digit_thousands[1];

            //input限制上下线
            var atoplimit = parseFloat(rettoplimit);
            var alowerlimit = parseFloat(retlowerlimit);
            var limitnum = (num.value).replace(/,/g, '');

            //获取 上下限的值
            if (atoplimit == "" && alowerlimit == "") {
                //公共方法在中已将""转化为null
                $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("focus");
                $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("blur");
                return
            }
            else if (atoplimit == null && alowerlimit == null) {
                $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("focus");
                $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("blur");
                return
            }
            else if (atoplimit == null && alowerlimit != null) {
                if (limitnum < alowerlimit) {
                    alert("超出范围！");
                    $(num).parent().parent().find("input[ id=" + num.id + "]").val(settings.defaultvalue);
                    $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("focus");
                    $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("blur");
                }
            }
            else if (atoplimit != null && alowerlimit == null) {

                if (limitnum > atoplimit) {
                    alert("超出范围！");
                    $(num).parent().parent().find("input[ id=" + num.id + "]").val(settings.defaultvalue);
                    $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("focus");
                    $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("blur");
                }
            }
            else {
                if (limitnum < alowerlimit || limitnum > atoplimit) {
                    alert("超出范围！");
                    $(num).parent().parent().find("input[ id=" + num.id + "]").val(settings.defaultvalue);
                    $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("focus");
                    $(num).parent().parent().find("input[ id=" + num.id + "]").trigger("blur");
                }
            }
        });
    },


    /*
     *此方法用来多个input的计算
     * 当input存在的情况下
     * 只要传入公式即可进行计算
     * 如公式 (&input1&+&input2&)&/&input6
     * */
    countNumber:function (options) {
        //默认值参数
        var settings = $.extend({
            formulaString:'input1&+&input2',//公式字符串
            digit:2,
            readonly:true
        }, options);

        try {
            var resulltinput = $(this).attr("id");
            document.getElementById(resulltinput).readOnly = settings.readonly;//设置只读
        }catch(err) {}
        var arr = settings.formulaString.split("&");
        var inputarr = new Array();
        for(var i in arr){
            if(arr[i].indexOf('input')==0){
                inputarr.push(arr[i]);
            }
        }
        var p = /[a-z]/i; //测试是否有英文
        for(var i in inputarr){
            if($("#"+inputarr[i]).length>0) {//判断控件是否存在
                document.getElementById(inputarr[i]).addEventListener("blur", function () {
                    var agetform = settings.formulaString.replace(/&/g,'');
                    for(var i in inputarr) {
                        if ($("#" + inputarr[i]).length > 0) {
                            agetform = agetform.replace(inputarr[i], document.getElementById(inputarr[i]).value);//公式转换
                            if (document.getElementById(inputarr[i]).value != "" && p.test(agetform) == false) {
                                try
                                {
                                    var res = eval(agetform.replace(/,/g,'')).toFixed(settings.digit);
                                    var a =res.split(".");
                                    var r = a[0].replace(/\d+?(?=(?:\d{3})+$)/g, function(s){
                                        return s +',';
                                    });
                                    res = r+"."+a[1];
                                }
                                catch(err)
                                {
                                    console.log("请先填完数值！");
                                }
                                if(res=="Infinity.undefined"||res=="NaN.undefined")res="分母不能为0";
                                if(res==undefined)res="";
                                document.getElementById(resulltinput).value = res;
                            }
                        }else{
                            alert("不存在控件！");
                        }
                    }
                });

            }else{
                alert("不存在控件！");
            }

        }
    }


});













