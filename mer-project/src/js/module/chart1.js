(function(){
    //鼠标 hover 提示设置
    var tooltip = {
        trigger: 'axis',
        padding: [10, 55, 12, 12],
        axisPointer: {
            lineStyle: {
                color: "#7aec74"
            }
        },
        textStyle: {
            fontSize: 12
        },
        formatter: function(){}
    };

    //右边的标识设置
    var legend = {
        top: 30,
        right: 4,
        itemWidth: 30,
        selectedMode: false,
        orient: 'vertical',
        itemGap: 16,
        data:[]
    };

    //网格图标设置
    var grid = {
        top: 10,
        left: 0,
        bottom: 20,
        right: 126,
        containLabel: true
    };

    // x 轴坐标设置 
    var xAxis = {
        type: 'category',
        boundaryGap: true,
        data: [],
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
    };

    // y 轴坐标设置
    var yAxis = {
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
            formatter: '',
            textStyle: {
                color: '#666'
            }
        },
        axisTick: {
            show: false
        }
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('map1'));
    var myChart2 = echarts.init(document.getElementById('map2'));

    var xData = [
        ['0-1时','1-2时','2-3时','3-4时','4-5时','5-6时','6-7时','7-8时','8-9时','9-10时','10-11时','11-12时'], 
        ['12-13时','13-14时','14-15时','15-16时','16-17时','17-18时','18-19时','19-20时','20-21时','21-22时','22-23时','23-24时']
    ];

    var yData = {
        y1Data: [
            [5, 18, 38, 25, 29, 28, 32, 25, 15, 25, 46, 30],
            [28, 32, 25, 15, 29, 28, 32, 25, 15, 25, 46, 30]
        ],
        y2Data: {
            data1: [
                [13, 26, 48, 33, 39, 33, 13, 26, 48, 33, 39, 33],
                [5, 18, 38, 25, 29, 28, 32, 25, 15, 25, 46, 30]
            ],
            data2: [
                [4, 16, 38, 25, 29, 26, 33, 24, 14, 4, 16, 38],
                [28, 32, 25, 15, 29, 28, 32, 25, 15, 25, 46, 30]
            ]
        }
    };

    // 默认图表的配置项和数据
    var config1 = {
        //鼠标 hover 提示设置
        tooltip: $.extend(tooltip, {
            formatter: function(dataArr){
                var data = dataArr[0];
                return data.name + "<br/>" + data.marker + data.seriesName + ": " + data.value + "元";
            } 
        }),
        //右边的标识设置
        legend: $.extend(true, legend, {
            data: ['交易金额']
        }),
        //网格图标设置
        grid: grid,
        // x 轴坐标设置 
        xAxis: $.extend(xAxis, {
            data: ['0-1时','1-2时','2-3时','3-4时','4-5时','5-6时','6-7时','7-8时','8-9时','9-10时','10-11时','11-12时']
        }),
        // y 轴坐标设置
        yAxis: $.extend(true, yAxis, {
            axisLabel: {
                formatter: '{value}元',
            }
        }),
        //数据以及数据图设置
        series: [{
            name: "交易金额",
            smooth: true,
            type: 'line',
            symbolSize: 6,
            itemStyle : {  
                normal : {  
                    color:'rgb(0, 225, 219)',  
                    lineStyle:{  
                        color:'rgb(0, 225, 219)',
                        shadowColor: 'rgba(0, 225, 219, 0.4)',
                        shadowBlur: 4,
                        shadowOffsetY: 2
                    }  
                }  
            },
            data: [5, 18, 38, 25, 29, 28, 32, 25, 15, 25, 46, 30]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(config1);

    // 默认图表的配置项和数据
    var config2 = {
        //鼠标 hover 提示设置
        tooltip: $.extend(tooltip, {
            formatter: function(dataArr){
                var data1 = dataArr[0].marker + dataArr[0].seriesName + ": " + dataArr[0].value + "元";
                var data2 = dataArr[1].marker + dataArr[1].seriesName + ": " + dataArr[1].value + "元";
                return dataArr[0].name + "<br/>" + data1 + "<br/>" + data2;
            } 
        }),
        //右边的标识设置
        legend: $.extend(true, legend, {
            data: ['成功订单', '发起订单']
        }),
        //网格图标设置
        grid: grid,
        // x 轴坐标设置 
        xAxis: $.extend(xAxis, {
            data: ['0-1时','1-2时','2-3时','3-4时','4-5时','5-6时','6-7时','7-8时','8-9时','9-10时','10-11时','11-12时']
        }),
        // y 轴坐标设置
        yAxis: $.extend(true, yAxis, {
            axisLabel: {
                formatter: '{value}笔',
            }
        }),
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
            data: [13, 26, 48, 33, 39, 33, 13, 26, 48, 33, 39, 33]
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
            data: [4, 16, 38, 25, 29, 26, 33, 24, 14, 4, 16, 38]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(config2);

    $("#mapChange1 i").click(function(){
        if($(this).hasClass("current")){
            var index = $(this).index();
            $(this).removeClass("current").siblings().addClass("current");

            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption($.extend(true, config1, {
                //鼠标 hover 提示设置
                tooltip: $.extend(tooltip, {
                    formatter: function(dataArr){
                        var data = dataArr[0];
                        return data.name + "<br/>" + data.marker + data.seriesName + ": " + data.value + "元";
                    } 
                }),
                // x 轴坐标设置 
                xAxis: $.extend(xAxis, {
                    data: xData[index],
                }),
                // y 轴坐标设置 
                yAxis: $.extend(true, yAxis, {
                    axisLabel: {
                        formatter: '{value}元',
                    }
                }),
                //右边的标识设置
                legend: $.extend(legend, {
                    data: ['交易金额']
                }),
                //数据以及数据图设置
                series: [{
                    data: yData.y1Data[index]
                }]
            }));

            myChart2.setOption($.extend(true, config2, {
                //鼠标 hover 提示设置
                tooltip: $.extend(tooltip, {
                    formatter: function(dataArr){
                        var data1 = dataArr[0].marker + dataArr[0].seriesName + ": " + dataArr[0].value + "元";
                        var data2 = dataArr[1].marker + dataArr[1].seriesName + ": " + dataArr[1].value + "元";
                        return dataArr[0].name + "<br/>" + data1 + "<br/>" + data2;
                    } 
                }),
                // x 轴坐标设置 
                xAxis: $.extend(xAxis, {
                    data: xData[index],
                }),
                // y 轴坐标设置 
                yAxis: $.extend(true, yAxis, {
                    axisLabel: {
                        formatter: '{value}笔',
                    }
                }),
                //右边的标识设置
                legend: $.extend(legend, {
                    data: ['成功订单', '发起订单']
                }),
                //数据以及数据图设置
                series: [{
                    data: yData.y2Data.data1[index]
                }, {
                    data: yData.y2Data.data2[index]
                }]
            }));
        }
    });
})()