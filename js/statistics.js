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



// 图表JS
var myChart = document.getElementById('echarts1');
var resetechartswidth1 = function () {
    myChart.style.width=(document.body.clientWidth-50)+'px';
    myChart.style.height=600+'px';
}
resetechartswidth1();
var myCharta=echarts.init(myChart);
option = {
    title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myCharta.setOption(option);



var myChartoption = document.getElementById('echartszz');
var resetechartswidth = function () {
    myChartoption.style.width=(document.body.clientWidth-50)+'px';
    myChartoption.style.height=600+'px';
}
resetechartswidth();
var myChartzz=echarts.init(myChartoption);
optionzz = {
    title : {
        text: '某地区蒸发量和降水量',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['蒸发量','降水量']
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
                data : [
                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};
myChartzz.setOption(optionzz);
window.onresize = function () {
    //重置容器高宽
    resetechartswidth();
    resetechartswidth1();
    myChartzz.resize();
    myCharta.resize();
};