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
                        defaultContent: "<a href='insert.html' class=\"btn btn-info btn-xs edit tredit \"><i class=\"fa fa-edit\"></i> 编辑</a><a href=\"javascript:deletealert()\" class=\"btn btn-danger btn-xs delete trdelete\"><i class=\"fa fa-trash-o\"></i> 删除</a>",

                    },{
                        "bSortable": false, "targets": [0,1],  //设置第一列和最后一列列不可排序
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



        }
    }
};


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

