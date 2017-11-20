(function ($) {
    // setInterval(function(){
    //     $("#cyreload").fadeOut();
    // }, 1000);
    $("#cyreload").show();
})(jQuery);
$(document).ready(function(){
    $("#cyreload").fadeOut();
});


//右上角保存
function savedata() {
    //获取已经勾选的节点
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var checkednodes = treeObj.getCheckedNodes(true);//获取已经勾选的节点
    if (checkednodes.length>0) {
        var nodesname ="";
        for(var i=0;i<checkednodes.length;i++){
            nodesname+=checkednodes[i].name+"和";
        }
        alert(nodesname);
    }

}

//搜索节点方法
function searchtreenode() {
    var nodename= document.getElementById("searchnodeinput").value;//得到用户搜索的值
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var selectednodes = treeObj.getSelectedNodes();//获取选中节点
    if (selectednodes.length>0) {
        for(var i=0;i<selectednodes.length;i++) {
            treeObj.cancelSelectedNode(selectednodes[i]);//每次搜索前清除以选择的节点
        }
    }
    var nodes = treeObj.getNodesByParamFuzzy("name", nodename, null);
    if (nodes.length>0) {
        for(var i=0;i<nodes.length;i++){
            treeObj.selectNode(nodes[i],true);//选择节点并且显示展开到选中的节点上
        }
    }
}
//初始化树并且将已勾选的节点选择展开
$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var checkednodes = treeObj.getCheckedNodes(true);//获取已经勾选的节点
    if (checkednodes.length>0) {
        for(var i=0;i<checkednodes.length;i++){
            treeObj.selectNode(checkednodes[i],true);//选择节点并且显示展开到选中的节点上
        }
    }
});
var setting = {
    view: {
        selectedMulti: true,
        showIcon:false,//是否显示图标
        showLine: true, //是否显示节点之间的连线。
        expandSpeed: "fast",//展开速度
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true,//是否简单数据模式
            idKey: "id",
            pIdKey: "pId",
            rootPId: null
        }
    },
    edit: {
        enable: false
    }
};


var zNodes =[
    {id:1, pId:0, name:"[core] 基本功能 演示", open:false},
    {id:101, pId:1, name:"最简单的树 --  标准 JSON 数据"},
    {id:102, pId:1, name:"最简单的树 --  简单 JSON 数据",checked:true},
    {id:103, pId:1, name:"不显示 连接线"},
    {id:104, pId:1, name:"不显示 节点 图标"},
    {id:108, pId:1, name:"异步加载 节点数据"},
    {id:109, pId:1, name:"用 zTree 方法 异步加载 节点数据"},
    {id:110, pId:1, name:"用 zTree 方法 更新 节点数据"},
    {id:111, pId:1, name:"单击 节点 控制"},
    {id:112, pId:1, name:"展开 / 折叠 父节点 控制"},
    {id:113, pId:1, name:"根据 参数 查找 节点"},
    {id:114, pId:1, name:"其他 鼠标 事件监听"},

    {id:2, pId:0, name:"[excheck] 复/单选框功能 演示", open:false},
    {id:201, pId:2, name:"Checkbox 勾选操作"},
    {id:206, pId:2, name:"Checkbox nocheck 演示"},
    {id:207, pId:2, name:"Checkbox chkDisabled 演示"},
    {id:208, pId:2, name:"Checkbox halfCheck 演示",checked:true},
    {id:202, pId:2, name:"Checkbox 勾选统计"},
    {id:203, pId:2, name:"用 zTree 方法 勾选 Checkbox"},
    {id:204, pId:2, name:"Radio 勾选操作"},
    {id:209, pId:2, name:"Radio nocheck 演示"},
    {id:210, pId:2, name:"Radio chkDisabled 演示"},
    {id:211, pId:2, name:"Radio halfCheck 演示"},
    {id:205, pId:2, name:"用 zTree 方法 勾选 Radio"},

    {id:3, pId:0, name:"[exedit] 编辑功能 演示", open:false},
    {id:301, pId:3, name:"拖拽 节点 基本控制"},
    {id:302, pId:3, name:"拖拽 节点 高级控制"},
    {id:303, pId:3, name:"用 zTree 方法 移动 / 复制 节点"},
    {id:304, pId:3, name:"基本 增 / 删 / 改 节点"},
    {id:305, pId:3, name:"高级 增 / 删 / 改 节点"},
    {id:306, pId:3, name:"用 zTree 方法 增 / 删 / 改 节点"},
    {id:307, pId:3, name:"异步加载 & 编辑功能 共存"},
    {id:308, pId:3, name:"多棵树之间 的 数据交互"},

    {id:4, pId:0, name:"大数据量 演示", open:false},
    {id:401, pId:4, name:"一次性加载大数据量"},
    {id:402, pId:4, name:"分批异步加载大数据量"},
    {id:403, pId:4, name:"分批异步加载大数据量"},

    {id:5, pId:0, name:"组合功能 演示", open:false},
    {id:501, pId:5, name:"冻结根节点"},
    {id:502, pId:5, name:"单击展开/折叠节点"},
    {id:503, pId:5, name:"保持展开单一路径"},
    {id:504, pId:5, name:"添加 自定义控件"},
    {id:505, pId:5, name:"checkbox / radio 共存"},
    {id:506, pId:5, name:"左侧菜单"},
    {id:507, pId:5, name:"下拉菜单"},
    {id:509, pId:5, name:"带 checkbox 的多选下拉菜单"},
    {id:510, pId:5, name:"带 radio 的单选下拉菜单"},
    {id:508, pId:5, name:"右键菜单 的 实现"},
    {id:511, pId:5, name:"与其他 DOM 拖拽互动"},
    {id:512, pId:5, name:"异步加载模式下全部展开"},

    {id:6, pId:0, name:"其他扩展功能 演示", open:false},
    {id:601, pId:6, name:"隐藏普通节点"},
    {id:602, pId:6, name:"配合 checkbox 的隐藏"},
    {id:603, pId:6, name:"配合 radio 的隐藏"}
];




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