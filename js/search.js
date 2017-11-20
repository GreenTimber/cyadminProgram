(function ($) {
    // setInterval(function(){
    //     $("#cyreload").fadeOut();
    // }, 1000);
    $("#cyreload").show();
})(jQuery);
$(document).ready(function(){
    $("#cyreload").fadeOut();
});

//主表格初始化
var CyadminDatadable = function () {
    return{
        init:function () {
            var table=$('#cyadmintable').DataTable({
                "dom": '<"lench"l><"datatable"t><"inform"i><"pagin"p><"rocess"r>',
                "deferRender": true,//数据预加载
                "autoWidth":true,
                "pagingType": "full_numbers",//全分页
                "language": {//分页样式
                    "info": "共_TOTAL_条记录",
                    "sSearch": "全局搜索:",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sZeroRecords": "没有匹配结果",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "oPaginate": {
                        "sFirst":      "首页",
                        "sLast":       "尾页",
                        "sNext":       "下一页",
                        "sPrevious":   "上一页",
                        "sEmptyTable": "查询无数据！",
                    },
                    "lengthMenu":     "_MENU_",//改变长度样式
                    "paginate": {
                        "processing": "正在处理中。。。"
                    }
                },

                scrollCollapse: true,
                stateSave: false,//保存最后一次操作状态
                scrollX: true,//水平滚动
                colReorder: true,//表头拖动
                columnDefs: [{
                    targets:0,
                    data: null,
                    defaultContent:"<label><input type=\"checkbox\" class='cyadmrowckbx'/> <span class=\"text\"></span></label>",
                    ordering:false,
                    title:"<label><input type=\"checkbox\"/><span class=\"text\"></span> </label>",
                }
                ,{
                    targets: 1,
                    data: null,
                    defaultContent: "<a href='insert.html' class=\"btn btn-info btn-xs edit tredit \"><i class=\"fa fa-edit\"></i> 编辑</a><a href=\"javascript:deletealert()\" class=\"btn btn-danger btn-xs delete trdelete\"><i class=\"fa fa-trash-o\"></i> 删除</a>" +
                    "<a href='javascript:showzibiao()' class=\"btn btn-info btn-xs edit trzibiao \"><i class=\"fa fa-plus-square-o\"></i> 显示子表</a><a href=\"javascript:showshenpi()\" class=\"btn btn-danger btn-xs delete trshenpi\"><i class=\"fa fa-check-square-o\"></i> 审批</a>",

                },{
                    "bSort": false, "targets": [0,1],  //设置第一列和最后一列列不可排序
                }]

            });
            //隐藏列
            $('.toggle-vis').on( 'change', function (e) {
                e.preventDefault();
                var cname = document.getElementsByClassName("th"+$(this).attr('data-column')+"");
                if($(".checkbox"+$(this).attr('data-column')+"").is(':checked')==true) {
                    table.column('.th' + $(this).attr('data-column') + '').visible(false);
                }else{
                    table.column('.th' + $(this).attr('data-column') + '').visible(true);
                }
            } );
            //点击空白处隐藏div
            $(document).ready(function (){
                $(".showcol").click(function(e){
                    $('.showul').toggle();
                    e.stopPropagation();
                })
                $(".showul li").click(function(e){
                    e.stopPropagation();
                })
                $(document).click(function(){
                    $(".showul").hide();
                })


            });
            //还原拖动
            $('.colReordercol').click(function () {
                table.colReorder.reset();
            });
            //全选
            $('#cyadmintable_wrapper thead th  input[type=checkbox]').change(function() {
                var set = $("#cyadmintable_wrapper tbody tr td  input[type=checkbox]");
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    if (checked) {
                        $(this).prop("checked", true);
                        $(this).parents('tr').addClass("active");
                    } else {
                        $(this).prop("checked", false);
                        $(this).parents('tr').removeClass("active");
                    }
                });
            });

            //双击行单条审批
            $('#cyadmintable tbody').on('dblclick','tr',function(){
                var index = $(this).context._DT_RowIndex;//行号
                $("#sppane").modal();
                $('.modal-open').css('padding-right','0px');
            });
            //选择弹框
            $('.sltbtn').click(function () {
                $('#sltpane').modal('show');
                $('.modal-open').css({"padding-right":"0px"});
                //show之后加载数据
                $('#sltpane').on('shown.bs.modal', function () {
                    $("#selecttable").dataTable().fnDestroy();//每次选择前进行销毁后再加载
                    Selecttable().init();
                })
            });
            //关闭模态
            $('.okbtn,.refusebtn').click(function () {
                $('#sltpane').modal('hide');
                $('#sppane').modal('hide');
                $("#spallpane").modal('hide');
            });
            //新增弹框
            $('.addbtn').click(function () {
                window.location.href="insert.html";
            });


            //右击菜单
            $(function(){
                $.contextMenu({
                    target: function(ele) { // 当前元素--jq对象
                        console.log(ele);
                        $(ele).find("input[type='checkbox']").each(function(){
                            subId=$(this).val();
                            console.log(subId);
                        });
                    },
                    selector: '#cyadmintable tbody tr',
                    callback: function(key, options) {
                        if(key==1){
                            window.location.href="insert.html";
                        }
                        if(key==4){
                            $("#sppane").modal();
                            $('.modal-open').css('padding-right','0px');
                        }
                        if(key==2){
                            $('#subtable').show();
                            $('#collapseThree').show();
                            $("#zibiaotable").dataTable().fnDestroy();//每次销毁后再加载
                            Zibiaotable().init();

                            $(this).parent().find("tr").each(function() {
                                if($(this).hasClass("rightselected")==true){
                                    $(this).removeClass("rightselected");
                                }
                            })
                            $(this).addClass('rightselected');
                        }
                        if(key==3){
                            alert("删除！");
                        }
                    },
                    items: {
                        "1": {name: "编辑"},
                        "2": {name: "显示子表"},
                        "3": {name: "删除"},
                        "4": {name: "审批"},
                    }
                });

            });

            //批量审批
            $('.spallbtn').click(function () {
                $("#spallpane").modal();
                $('.modal-open').css('padding-right','0px');
            });
        }
    }
};
//手机审批按钮
function showshenpi() {
    $('#cyadmintable tbody tr').contextmenu(function(){
        var index = $(this).context._DT_RowIndex;//获取的行号
        console.log(index);
    });
    $("#sppane").modal();
    $('.modal-open').css('padding-right','0px');
}
//手机显示子表按钮
function showzibiao() {
    $('#cyadmintable tbody tr').contextmenu(function(){
        var index = $(this).context._DT_RowIndex;//获取的行号
        console.log(index);
    });
    $('#subtable').show();
    $('#collapseThree').show();
    $("#zibiaotable").dataTable().fnDestroy();//每次销毁后再加载
    Zibiaotable().init();
    

}

//alert弹框提示
function deletealert(){
    bootbox.confirm("确定要删除吗?", function (result) {
        if (result) {
            //
        }
    });
}
$('.exportbtn').on('click',function () {
    $("#cyreload").show();
});
//弹框
//子表格初始化
var Zibiaotable = function () {
    return {
        init:function () {
            var zbable = $('#zibiaotable').dataTable({
                "dom": '<"lench"l><"search"f><"datatable"t><"inform"i><"pagin"p><"rocess"r>',
                "deferRender": true,//数据预加载
                "autoWidth":false,
                "pagingType": "full_numbers",//全分页
                "language": {//分页样式
                    "info": "共_TOTAL_条记录",
                    "sSearch": "全局搜索:",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sZeroRecords": "没有匹配结果",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "oPaginate": {
                        "sFirst":      "首页",
                        "sLast":       "尾页",
                        "sNext":       "下一页",
                        "sPrevious":   "上一页",
                    },
                    "lengthMenu":     "_MENU_",//改变长度样式
                    "paginate": {
                        "processing": "正在处理中。。。"
                    }
                },
                "autoWidth":true,
                scrollCollapse: true,
                stateSave: false,//保存最后一次操作状态
                scrollX: true,//水平滚动
                colReorder: false,//表头拖动
                columnDefs: [{
                    targets:0,
                    data: null,
                    defaultContent:"<label><input type=\"checkbox\" > <span class=\"text\"></span></label>",
                    ordering:false,
                    title:"<label><input type=\"checkbox\"> <span class=\"text\"></span></label>",
                },{
                    "bSort": false, "targets": [0],  //设置第一列不可排序
                },{
                    "bSort": false, "targets": [0,1],  //设置第一列和最后一列列不可排序
                }]
            });
            //选择弹框
            $('.sltbtn').click(function () {
                $('#sltpane').modal('show');
                $('.modal-open').css({"padding-right":"0px"});
                //show之后加载数据
                $('#sltpane').on('shown.bs.modal', function () {
                    $("#selecttable").dataTable().fnDestroy();//每次选择前进行销毁后再加载
                    Selecttable().init();
                })
            });
            //全选
            $('#zibiaotable_wrapper thead th label input[type=checkbox]').change(function() {
                var set = $("#zibiaotable_wrapper tbody tr td label input[type=checkbox]");
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    if (checked) {
                        $(this).prop("checked", true);
                        $(this).parents('tr').addClass("active");
                    } else {
                        $(this).prop("checked", false);
                        $(this).parents('tr').removeClass("active");
                    }
                });
            });
            $('#zibiaotable_wrapper tbody tr input[type=checkbox]').change(function() {
                $(this).parents('tr').toggleClass("active");
            });




        }
    }
};

var sjid=Date.now();
var tabcontent3 = {};
tabcontent3["tabmenuid"]="3";
tabcontent3["tabname"]= "行动记录";
tabcontent3["taburl"]= "subtable.html";
$('.dtopbtn').on('click',function () {
    // window.location.href="subtable.html";
    console.log(sjid);
    window.parent.addtab(tabcontent3['tabmenuid'],tabcontent3['tabname'],tabcontent3['taburl']);
});


//选择子表初始化
var Selecttable = function () {
    return {
        init:function () {
            var setable = $('#selecttable').dataTable({
                "dom": '<"lench"l><"search"f><"datatable"t><"inform"i><"pagin"p><"rocess"r>',
                "deferRender": true,//数据预加载
                "autoWidth":false,
                "pagingType": "full_numbers",//全分页
                "language": {//分页样式
                    "info": "共_TOTAL_条记录",
                    "sSearch": "全局搜索:",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sZeroRecords": "没有匹配结果",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "oPaginate": {
                        "sFirst":      "首页",
                        "sLast":       "尾页",
                        "sNext":       "下一页",
                        "sPrevious":   "上一页",
                        "sEmptyTable": "查询无数据！",
                    },
                    "lengthMenu":     "_MENU_",//改变长度样式
                    "paginate": {
                        "processing": "正在处理中。。。"
                    }
                },
                "lengthMenu": [[-1], [ "All"]],
                scrollY: 250,//固定表格滚动高度
                scrollCollapse: true,
                stateSave: false,//保存最后一次操作状态
                scrollX: true,//水平滚动
                colReorder: false,//表头拖动
                columnDefs: [{
                    targets:0,
                    data: null,
                    defaultContent:"<label><input type=\"checkbox\" class='sltrowckbx' /><span class=\"text\"></span> </label>",
                    ordering:false,
                    title:"",
                },{
                    "bSort": false, "targets": [0],  //设置第一列不可排序
                }]
            });

            //单选一行
            $('#selecttable tbody tr label input[type=checkbox]').each(function(){
                $(this).click(function(){
                    if($(this).prop('checked')){
                        $(':checkbox[type="checkbox"]').removeAttr('checked');
                        $(this).prop('checked','checked');
                    }
                });
            });
            $('#seldtable ').click(function () {
                var nTrs = setable.fnGetNodes();//获取有的行
                $("#selecttable tbody tr label input[type=checkbox]").each(function(key,value){
                    if($(value).prop('checked')){
                        //获取选中的一行数据
                        var t =setable.fnGetData(nTrs[key]);
                        console.log(t[1]);//选中行的第一列数据
                        $('.sltval').val(t[1]);//input的id

                    }
                })
            });





        }
    }
};



//文件上传额外方法
fodderType = function() {
    return $("#youid").val();
};
//文件上传
$("#file-1").fileinput({
    uploadUrl: '#', //上传地址
    allowedFileExtensions: ['jpg', 'png', 'gif','jpeg'],//接受文件后缀
    uploadAsync: true, //默认异步上传
    overwriteInitial: false,//不覆盖已存在的图片
    maxFileSize: 1000,//单位为kb，如果为0表示不限制文件大小
    maxFilesNum: 10,//数量
    dropZoneEnabled: true,//显示拖拽区域
    language: 'zh', //设置语言
    browseClass: "btn btn-primary",//按钮样式
    showUpload: true,//是否显示上传按钮
    showRemove:true,//显示删除按钮
    showCaption: true,//是否显示标题
    showPreview : false, //是否显示预览
    //allowedFileTypes: ['image', 'video', 'flash'],
    //minImageWidth: 50, //图片的最小宽度
    //minImageHeight: 50,//图片的最小高度
    //maxImageWidth: 1000,//图片的最大宽度
    //maxImageHeight: 1000,//图片的最大高度
    uploadExtraData: function(previewId, index) {   //额外参数的关键点
        var obj = {};
        obj.fodder = fodderType();
        console.log(obj);
        return obj;
    }

});

