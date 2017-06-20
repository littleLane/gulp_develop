(function(){
    var initOption = {
        dataZoom: [{
            type: "slider",
            show: false,
            startValue: '0-1时',
            endValue: '11-12时'
        }, {
            show: false,
           startValue: '0-1时',
           endValue: '11-12时' 
        }]
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('map2'));

    // 指定图表的配置项和数据
    var option = {

        //鼠标 hover 提示设置
        tooltip: {
            trigger: 'axis',
            padding: [10, 55, 12, 12],
            axisPointer: {
                lineStyle: {
                    color: "#7aec74"
                }
            },
            textStyle: {
                fontSize: 12
            }
        },

        //右边的标识设置
        legend: {
            top: 30,
            right: 4,
            itemWidth: 30,
            selectedMode: false,
            orient: 'vertical',
            itemGap: 16,
            data:['成功订单', '发起订单']
        },

        //网格图标设置
        grid: {
            top: 10,
            left: 0,
            bottom: 20,
            right: 126,
            containLabel: true
        },

        dataZoom: [{
            type: "slider",
            show: false,
            startValue: '',
            endValue: ''
        }, {
            type: "slider",
            show: false,
            startValue: '',
            endValue: ''
        }],

        // x 轴坐标设置 
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['0-1时','1-2时','2-3时','3-4时','4-5时','5-6时','6-7时','7-8时','8-9时','9-10时','10-11时','11-12时','12-13时','13-14时','14-15时','15-16时','16-17时','17-18时','18-19时','19-20时','20-21时','21-22时','22-23时','23-24时'],
            axisLine: {
                lineStyle: {
                    color: "#d8d8d8"
                }
            },
            axisLabel: {
                interval: 0,
                margin: 10,
                rotate: 30,
                textStyle: {
                    color: '#666',
                    fontSize: 10
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                interval: 0
            }
        },

        // y 轴坐标设置
        yAxis: {
            min: 0,
            max: 50,
            type: 'value',
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: "#d8d8d8"
                }
            },
            axisLabel: {
                margin: 10,
                formatter: '{value}笔',
                textStyle: {
                    color: '#666'
                }
            },
            axisTick: {
                show: false
            }
        },

        //数据以及数据图设置
        series: [{
            name: "成功订单",
            smooth: true,
            type:'line',
            symbolSize: 6,
            itemStyle : {  
                normal : {  
                    color:'rgb(0, 224, 108)',  
                    lineStyle:{  
                        color:'rgb(0, 224, 108)',
                        shadowColor: 'rgba(0, 224, 108, 0.4)',
                        shadowBlur: 4,
                        shadowOffsetY: 2
                    }  
                }  
            },
            data:[13, 26, 48, 33, 39, 33, 13, 26, 48, 33, 39, 33]
        },
        {
            name: "发起订单",
            smooth: true,
            type:'line',
            symbolSize: 6,
            itemStyle : {  
                normal : {  
                    color:'rgb(22, 149, 255)',  
                    lineStyle:{  
                        color:'rgb(22, 149, 255)',
                        shadowColor: 'rgba(22, 149, 255, 0.4)',
                        shadowBlur: 4,
                        shadowOffsetY: 2
                    }  
                }  
            },
            data:[4, 16, 38, 25, 29, 26, 33, 24, 14, 4, 16, 38, 25, 29, 26, 33, 24, 14]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption($.extend(option, initOption));

    $("#mapChange1 i").click(function(){
        var startValue = "";
        var endValue = "";

        if($(this).hasClass("current")){
            var index = $(this).index();
            $(this).removeClass("current").siblings().addClass("current");

            if(index == 0){
                startValue = '0-1时';
                endValue = '11-12时';
            }else{
                startValue = '12-13时';
                endValue = '23-24时';
            }

            myChart.setOption($.extend(option, {dataZoom: [{
                type: "slider",
                show: false,
                startValue: startValue,
                endValue: endValue
            }, {
                startValue: startValue,
                endValue: endValue
            }]}));
        }
    });
})()