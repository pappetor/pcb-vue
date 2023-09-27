<script setup>
import { onMounted, onUnmounted,ref,reactive } from 'vue';
import { TopDefectsViewer } from '../api/overviewer';

const timer = ref()

let top_viewer = reactive({
    top_defects:[],
    datas: [],
    line_data: [],
    lines: {},
})

function GetTopDefects(){
    TopDefectsViewer().then((result)=>{
        top_viewer.top_defects = result.message.top_defects;
        top_viewer.datas = result.message.datas;
        top_viewer.line_data = result.message.datas[0];
        top_viewer.lines = result.message.lines;
    }).catch((error)=>{
        console.log(error);
    })
}

function change_line_list(id){
    top_viewer.line_data = top_viewer.datas[id];
}

onMounted(()=>{
    GetTopDefects();
    timer.value=setInterval(()=>{
        GetTopDefects();
    },5000);
})

onUnmounted(()=>{
    clearInterval(timer.value);
    timer.value = "";
});

</script>

<template>
    <div class="top panel">
        <div class="inner">
            <div class="all">
                <h3>产线缺陷热榜</h3>
                <ul v-for="(item,id) in top_viewer.top_defects " :key="id">
                    <li>
                        <i :class="'icon-cup' + (id + 1)" style="color: #d93f36;"></i>
                        {{item["name"]}}
                    </li>
                </ul>
            </div>
            <div class="pcb_defect">
                <h3>各产线线排行榜 <i class="date">// 近30日 //</i></h3>
                <div class="data">
                    <ul class="sup" >
                        <li  v-for="item, index in top_viewer.lines" :key="index">
                            <ul>
                                <li v-for="(value,key) in item"  class="active" @click="change_line_list(index)" style="font-size: 15px;margin-bottom: 8px;">
                                <!-- {{item[0]}}  {{item[1]}}  -->
                                {{ key }}缺陷总数量:{{ value }}
                                <s class="icon-down">{{ key }}</s>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="sub">
                        <li v-for="item in top_viewer.line_data">
                            <span>{{item.name}}</span><span>{{item.num}} <s class="icon-up"></s></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
