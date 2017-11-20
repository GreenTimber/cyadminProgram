//子表格初始化
var Zibiaotable = function () {
    return {
        init:function () {
            var zbable = $('#zibiaotable').dataTable({
                "dom": '<"lench"l><"search"f><"datatable"t><"inform"i><"pagin"p><"rocess"r>',
                "ajax": {
                    "url": "json/test2.json",
                    "dataSrc": "sedatas",
                },
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
                columnDefs: [{
                    targets:0,
                    data: null,
                    defaultContent:"<label><input type=\"checkbox\" > <span class=\"text\"></span></label>",
                    ordering:false,
                    title:"<label><input type=\"checkbox\"> <span class=\"text\"></span></label>",
                },{
                    "bSort": false, "targets": [0],  //设置第一列不可排序
                },{
                    targets: -1,
                    data: null,
                    defaultContent: "<a  class=\"btn btn-info btn-xs edit tredit\" data-toggle=\"modal\" data-target=\".bs-example-modal-lg\"><i class=\"fa fa-edit\"></i> 编辑</a><a href=\"#\" class=\"btn btn-danger btn-xs delete trdelete\"><i class=\"fa fa-trash-o\"></i> 删除</a>",

                },{
                    "bSort": false, "targets": [0,-1],  //设置第一列和最后一列列不可排序
                }]
            });
            //选择弹框
            $('.sltbtn').click(function () {
                $('#sltpane').modal('show');
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
            //新增子表
            $('.addbtn').click(function(e) {
                $('#addpane').modal();
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
//选择表初始化
var Selecttable = function () {
    return {
        init:function () {
            var setable = $('#selecttable').dataTable({
                "dom": '<"lench"l><"search"f><"datatable"t><"inform"i><"pagin"p>r',
                "ajax": {
                    "url": "json/test2.json",
                    "dataSrc": "sedatas",
                },
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
                    title:"<label><input type=\"checkbox\"/><span class=\"text\"></span></label>",
                },{
                    "bSort": false, "targets": [0],  //设置第一列不可排序
                }]
            });
            //全选
            $('#selecttable_wrapper thead th label input[type=checkbox]').change(function() {
                var set = $("#selecttable_wrapper tbody tr td label input[type=checkbox]");
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
            $('#selecttable_wrapper tbody tr input[type=checkbox]').change(function() {
                $(this).parents('tr').toggleClass("active");
            });

        }
    }
};


