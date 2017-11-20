  // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'), 'macarons');

        // 指定图表的配置项和数据
       option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['物料1','物料2']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['2015','2016','2017']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'物料1',
            type:'bar',
            data:[320, 332, 301 ]
        },
     
        
        {
            name:'物料2',
            type:'bar',
            data:[862, 1018, 964]
            }
            
           
        
    ]
};
        // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);



 	 
 	 var container=document.getElementById('main2');
 	 var resizeContainer=function(){
 		container.style.width=$('.col-md-9 ').width()-50+'px';
 		container.style.height=230+'px';
 		//container.style.height=window.innerHeight+'px';
 	};
 	resizeContainer();
 	var myChart2=echarts.init(container, 'macarons'), 
 	
 	
        // 基于准备好的dom，初始化echarts实例
     //   var myChart2 = echarts.init(document.getElementById('main2'), 'macarons');

        // 指定图表的配置项和数据
       option2 = {
    title : {
        text: '',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['已完成','已支付','未支付','待支付','有拖欠']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'状态统计',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'已完成'},
                {value:310, name:'已支付'},
                {value:234, name:'未支付'},
                {value:135, name:'待支付'},
                {value:1548, name:'有拖欠'}
            ]
        }
    ]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);




 var container3=document.getElementById('main3');
 	 var resizeContainer3=function(){
 		container3.style.width=$('.col-md-9 ').width()-50+'px';
 		container3.style.height=230+'px';
 		//container.style.height=window.innerHeight+'px';
 	};
 	resizeContainer3();
 	var myChart3=echarts.init(container3, 'macarons'), 
 	
 	
        // 基于准备好的dom，初始化echarts实例
     //   var myChart2 = echarts.init(document.getElementById('main2'), 'macarons');

        // 指定图表的配置项和数据
       option3 = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['完成订单','待付款订单','未发货订单','未结清订单','拖欠订单']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'center',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'项目状态',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:335, name:'完成订单'},
                {value:310, name:'待付款订单'},
                {value:234, name:'未发货订单'},
                {value:135, name:'未结清订单'},
                {value:1548, name:'拖欠订单'}
            ]
        }
    ]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart3.setOption(option3);
