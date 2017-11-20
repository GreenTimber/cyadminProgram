//子表格初始化
var Zibiaotable = function () {
    return {
        init:function () {
            var zbable = $('#zibiaotable').DataTable({
                "dom": '<"datatable"t>',
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
                "ordering": false
            });



        }
    }
};
//显示详情
$('.schbtn').on('click',function () {
    $('#schpane').modal('show');
    $('.modal-open').css({"padding-right":"0px"});
})


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