<script setup>
import { onMounted, onUnmounted,ref,reactive } from 'vue';
import { TimesViewer } from '../api/overviewer';

const timer = ref()

let time_viewer = reactive({
    defects_lose:[{"time":"365天"}, {"time":"90天"}, {"time":"30天"},{"time":"24小时"}],
    current_bn_index: 0,
    datas: [0, 0]
})

function GetTimeViewer(){
    TimesViewer(time_viewer.current_bn_index).then((result)=>{
        time_viewer.datas = result.message;
    }).catch((error)=>{
        console.log(error);
    })
}

function change_time_viewer(id){
    time_viewer.current_bn_index = id;
    TimesViewer(time_viewer.current_bn_index).then((result)=>{
        time_viewer.datas = result.message;
    }).catch((error)=>{
        console.log(error);
    })
}

onMounted(()=>{
    GetTimeViewer();
    timer.value=setInterval(()=>{
        GetTimeViewer();
    },60000);
})

onUnmounted(()=>{
    clearInterval(timer.value);
    timer.value = "";
});

</script>

<template>
    <div class="order panel">
        <div class="inner">
            <!-- 筛选 -->
            <div class="filter" >
                <a v-for="item, index in time_viewer.defects_lose">
                    <a :class="{active:index===time_viewer.current_bn_index}" @click="change_time_viewer(index)">{{item["time"]}}</a>
                </a>
            </div>
            <!-- 数据 -->
            <div class="data">
                <div class="item">
                    <h4>{{time_viewer.datas[0]}}</h4>
                    <span>
                        <i class="icon-dot" style="color: #ed3f35;"></i>
                        缺陷数量
                    </span>
                </div>
                <div class="item">
                    <h4>{{time_viewer.datas[1]}}</h4>
                    <span>
                        <i class="icon-dot" style="color: #eacf19;"></i>
                        损失(万元)
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
