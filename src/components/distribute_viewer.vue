<script setup>
import { onMounted, onUnmounted,ref,reactive } from 'vue';
import {TimesDistributeViewer} from '../api/overviewer'
import * as echarts from "echarts"
import { message } from 'ant-design-vue';

let chart = ref();
const timer = ref();
let datas = reactive({
    distribute_data: [],
    all: 32011,
    today: 418
});

function GetTimesDistributeViewer(){
    TimesDistributeViewer().then((result)=>{
        datas.distribute_data = result.message.distribute;
        datas.all = result.message.all;
        datas.today = result.message.today;
    }).catch((error)=>{
        console.log(error);
    })
}

function init_chart(){
    const option = {
        // 控制提示
        tooltip: {
            // 非轴图形，使用item的意思是放到数据对应图形上触发提示
            trigger: 'item',
            // 格式化提示内容：
            // a 代表图表名称 b 代表数据名称 c 代表数据  d代表  当前数据/总数据的比例
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 控制图表
        series: [
            {
                // 图表名称
                name: '缺陷',
                // 图表类型
                type: 'pie',
                // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
                // 百分比基于  图表DOM容器的半径
                radius: ['10%', '70%'],
                // 图表中心位置 left 50%  top 50% 距离图表DOM容器
                center: ['50%', '50%'],
                // 半径模式，另外一种是 area 面积模式
                roseType: 'radius',
                // 数据集 value 数据的值 name 数据的名称
                //文字调整
                label: {
                    fontSize: 7
                },
                //引导线
                labelLine: {
                    length: 8,
                    length2: 10
                }
            }
        ],
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
    };
    chart = echarts.init(document.getElementById("pie"));
    chart.setOption(option);
    window.onresize = () =>{
        chart.resize();
    };
}

function change_chart(){
    chart.setOption({
        series:[{
            data:datas.distribute_data,
        }]
    })
}

onMounted(()=>{
    GetTimesDistributeViewer();
    init_chart();
    timer.value=setInterval(()=>{
        GetTimesDistributeViewer();
        change_chart();
    },1000);
});


onUnmounted(()=>{
    clearInterval(timer.value);
    timer.value = "";
});
</script>

<template>
    <div class="point panel">
        <div class="inner">
            <h3>缺陷分布统计</h3>
            <div class="chart">
                <div id="pie" class="pie"></div>
                <div class="data">
                    <div class="item">
                        <h4>{{datas.all}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #ed3f35"></i>
                            缺陷总数
                        </span>
                    </div>
                    <div class="item">
                        <h4>{{datas.today}}</h4>
                        <span>
                            <i class="icon-dot" style="color: #eacf19"></i>
                            本日新增
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
