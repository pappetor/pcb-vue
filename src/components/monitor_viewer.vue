<script setup>
import { ProductionLine } from '../api/overviewer';
import { onMounted, onUnmounted,ref,reactive } from 'vue';
const timer = ref()
let index = ref(0)
const monitor_viewer = reactive({
    lines: [],
    datas:  [],
    line_data: [],
})


function GetMonitorLine(){
    ProductionLine().then((result)=>{
        monitor_viewer.lines = result.message.lines;
        monitor_viewer.datas = result.message.line_data;
        monitor_viewer.line_data = result.message.line_data[0];
    }).catch((error)=>{
        console.log(error);
    })
}

function line_data(id){
    monitor_viewer.line_data = monitor_viewer.datas[id]
}

onMounted(()=>{
    GetMonitorLine();
    timer.value=setInterval(()=>{
        GetMonitorLine();
    },5000);
})

onUnmounted(()=>{
    clearInterval(timer.value);
    timer.value = "";
});


</script>

<template>
    <div class="monitor panel">
                <div class="inner">
                    <div class="tabs" >
                        <a-button type="link" class="mbutton active" v-for="(item,id) in monitor_viewer.lines" @click="line_data(id)" :key="id">{{item}}</a-button>
                    </div>
                    <div class="content" style="display: block;">
                        <div class="head">
                            <span class="col">序号</span>
                            <span class="col">PCB板ID</span>
                            <span class="col">料号</span>
                            <span class="col">NG/OK</span>
                        </div>
                        <div class="marquee-view">
                            <div class="marquee">
                                <div class="row" v-for="(items,id) in monitor_viewer.line_data" :key="id">
                                    <span class="col" v-for=" (item,id) in items" :key="id">{{item}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
    </div>
</template>

<style scoped>
.mbutton{
	color: #95a3c2;
	font-size: 0.75rem;
	padding: 0 1.125rem;
}
.mbutton.active{
    border-right: 0.083rem solid #00f2f1;
    color: #fff;
}
</style>
