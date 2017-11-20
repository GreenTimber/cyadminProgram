
//主表格初始化
var CyadminDatadable = function () {
    return{
        init:function () {
            var table=$('#cyadmintable').DataTable({
                "dom": '<"lench"l><"datatable"t><"inform"i><"pagin"p><"rocess"r>',
                "ajax": {
                    "url": "json/test2.json",
                    "dataSrc": "test2",
                },
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
                    targets: -1,
                    data: null,
                    defaultContent: "<a href='test2-1.html' class=\"btn btn-info btn-xs edit tredit \"><i class=\"fa fa-edit\"></i> 编辑</a><a href=\"#\" class=\"btn btn-danger btn-xs delete trdelete\"><i class=\"fa fa-trash-o\"></i> 删除</a><a href='javascript:getdepane();' class=\"btn btn-info btn-xs edit trdetail \"><i class=\"fa fa-plus-square-o\"></i> 详情</a>",

                },{
                    "bSort": false, "targets": [0,-1],  //设置第一列和最后一列列不可排序
                }]

            });
            //隐藏列
            $('.toggle-vis').on( 'change', function (e) {
                e.preventDefault();
                var cname = document.getElementsByClassName("th"+$(this).attr('data-column')+"");
                if($("input[type='checkbox']").is(':checked')==true) {
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
            $('#cyadmintable_wrapper thead th label input[type=checkbox]').change(function() {
                var set = $("#cyadmintable_wrapper tbody tr td label input[type=checkbox]");
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
            $('#cyadmintable_wrapper tbody tr input[type=checkbox]').change(function() {
                $(this).parents('tr').toggleClass("active");
            });
            //双击行
            $('#cyadmintable tbody').on('dblclick','tr',function(){
                var index = $(this).context._DT_RowIndex;//行号
                $("#dbpane").modal();
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
            //关闭模态
            $('.okbtn,.refusebtn').click(function () {
                $('#sltpane').modal('hide');
                $('#dbpane').modal('hide');
            });
            //新增弹框
            $('.addbtn').click(function () {
                window.location.href="test2-1.html";
            });

        }
    }
};
//手机端详情
function getdepane() {
    $("#dbpane").modal();
}
//选择子表初始化
var Selecttable = function () {
    return {
        init:function () {
            var setable = $('#selecttable').dataTable({
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




