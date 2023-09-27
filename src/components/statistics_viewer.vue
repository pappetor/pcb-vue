<script setup>
import { onMounted, onUnmounted,ref,reactive } from 'vue';
import { StatisticViewer } from '../api/overviewer'

const timer = ref();
let datas = reactive({
    pcba:[],
    pcb_line_all: []
});

function change_data(){
    StatisticViewer().then((result)=>{
        datas.pcba = result.message.pcba;
        datas.pcb_line_all = result.message.pcb_line_all;
    }).catch((error)=>{
        console.log(error);
    })
}

onMounted(()=>{
    change_data();
    timer.value=setInterval(()=>{
        change_data();
    },3600000);
});


onUnmounted(()=>{
    clearInterval(timer.value);
    timer.value = "";
});
</script>

<template>
    <div class="wrap">
    <div class="channel panel">
      <div class="inner">
        <h3>直通率/产线</h3>
        <div>
          <li v-for="(item, index) in datas.pcba" :key="index">
            <h4 style="font-size: 12px;">
              {{ item[0] }}<small>%</small>/
              <span style="display:inline-block;width:60%;word-wrap:break-word;white-space:normal;">
                <i class="icon-train"></i>
                {{ item[1] }}
              </span>
            </h4>
            <!-- <span>
              <i class="icon-train"></i>
              {{ item[1] }}
            </span> -->
          </li>
          <div class="data"></div>
        </div>
      </div>
    </div>
        <div class="quarter panel">
            <div class="inner">
                <h3>总产线PCB板直通率</h3>
                <div class="chart">
                    <div class="box">
                        <div class="gauge"></div>
                        <div class="label">{{datas.pcb_line_all}}<small> %</small></div>
                    </div>
                    <div class="data">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
