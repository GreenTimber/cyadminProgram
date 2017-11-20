(function ($) {
    // setInterval(function(){
    //     $("#cyreload").fadeOut();
    // }, 1000);
    $("#cyreload").show();
})(jQuery);
$(document).ready(function(){
    $("#cyreload").fadeOut();
});

//子表格初始化
var Zibiaotable = function () {
    return {
        init:function () {
            var zbable = $('#zibiaotable').DataTable({
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
                "lengthMenu": [[-1], ["All"]],
                "autoWidth":true,
                scrollY: 300,//固定表格滚动高度
                scrollCollapse: true,
                stateSave: false,//保存最后一次操作状态
                scrollX: true,//水平滚动
                colReorder: false,//表头拖动
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
            //新增子表模态
            $('.addbtn').click(function() {
                $('#addpane').modal();
                $('.modal-open').css({"padding-right":"0px"});
            });

            //关闭模态
            $('.okbtn,.refusebtn').click(function () {
                $('#sltpane').modal('hide');
                $('#dbpane').modal('hide');
                $('#editpane').modal('hide');
                $('#addpane').modal('hide');
            });

        }
    }
};
//编辑子表模态
function gettreditpane() {
    $('#editpane').modal();
    $('.modal-open').css({"padding-right":"0px"});
}
//选择表初始化
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
                "autoWidth":true,
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
            $('#seldtable').click(function () {
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
    maxFileSize: 10000,//单位为kb，如果为0表示不限制文件大小
    maxFilesNum: 10,//数量
    dropZoneEnabled: true,//显示拖拽区域
    language: 'zh', //设置语言
    browseClass: "btn btn-primary",//按钮样式
    showUpload: false,//是否显示上传按钮
    showRemove:false,//显示删除按钮
    showCaption: false,//是否显示标题
    showPreview : true, //是否显示预览
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



$('dsa').on('click',function () {
    bootbox.prompt("保存", function (result) {

        if (result) {

        } else {

        }
    });
});


