<script setup>

import { onMounted, onUnmounted,ref,reactive } from 'vue';
import * as echarts from "echarts"
import { TimeTrendViewer } from '../api/overviewer';

let chart = ref()
const timer = ref()
let datas = reactive({
    ng_data: [0.0],
    ok_data: [0.0]
})

function GetTimeTrendViewer(){
    TimeTrendViewer().then((result)=>{
        // datas.ng_data.shift();
        // datas.ok_data.shift();
        datas.ng_data = result.message.ng_data;
        datas.ok_data = result.message.ok_data;
    }).catch((error)=>{
        console.log(error);
    })
}

function initChart(){
    const option = {
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#dddc6b'
            }
        }
        },
        legend: {
            top:'0%',
            data:["良品率","不良率"],
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize:'12',
            }
        },
        grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel:  {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize:12,
                    },
                },
            axisLine: {
                lineStyle: { 
                    color: 'rgba(255,255,255,.2)'
                }

            },
            data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        }, {
        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,
        }],

        yAxis: [{
            type: 'value',
            axisTick: {show: false},
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            },
            axisLabel:  {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize:12,
                    },
                },

            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            }
        }],
        series: [{
                name: '不良率',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#0184d5',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                    itemStyle: {
                    normal: {
                        color: '#0184d5',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: datas.ng_data
            }, 
            {
                name: '良品率',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: '#00d887',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                    itemStyle: {
                    normal: {
                        color: '#00d887',
                        borderColor: 'rgba(221, 220, 107, .1)',
                        borderWidth: 12
                    }
                },
                data: datas.ok_data
        }],

    };
    chart = echarts.init(document.getElementById("line"));
    chart.setOption(option);
    window.onresize = () =>{
        chart.resize();
    };
}

function change_chart(){
    GetTimeTrendViewer();
    chart.setOption({
        series:[{
            name:"不良率",
            data: datas.ng_data
        },{
            name:"良品率",
            data:datas.ok_data
        }]
    })
    // console.log(1)
}

onMounted(()=>{
    GetTimeTrendViewer();
    initChart();
    timer.value=setInterval(()=>{
        change_chart();
    },1000);
});


onUnmounted(()=>{
    clearInterval(timer.value);
    timer.value = "";
});

</script>

<template>
    <div class="sales panel">
        <div class="inner">
            <div class="caption">
                <h3>缺陷检测趋势/天</h3>
            </div>
            <div class="chart">
                <div id="line" class="line"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
