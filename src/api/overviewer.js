import request from "../utils/request";


// 获取图片的方法
export function Image() {
  return request({
    url: "/getImage",
    method: "get",
  });
}

// 登录方法
export function Overviewer() {
  return request({
    url: "/overviewer",
    method: "get",
  });
}


export function ProductionLine(){
  return request({
    url: "/monitor_line",
    method: "get",
  });
}

export function TopDefectsViewer(){
  return request({
    url: "/top_defect_lists",
    method: "get",
  });
}

export function TimesViewer(index){
  return request({
    url: "/times_viewer",
    method: "post",
    data: index
  });
}

export function TimeTrendViewer(){
  return request({
    url: "/trend_viewer",
    method: "get",
  });
}

export function TimesDistributeViewer(){
  return request({
    url: "/times_distribute_viewer",
    method: "get",
  });
}

export function StatisticViewer(){
  return request({
    url: "/statistic_viewer",
    method: "get",
  });
}