import axios from "axios";
import { message } from "ant-design-vue";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const BASE_URL=import.meta.env.VUE_APP_BASE_API

const service = axios.create({
    baseURL: 'http://localhost:9999/',
    timeout: 10000
});

service.interceptors.request.use(
    (config) =>{
        return config
    },
    (error) =>{
        console.log(error);
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (success) =>{
        if (success.status && success.status == 200 && success.data.status == 500) {
            message.error(success.data.msg );
            return;
          }
          if (success.data.msg) {
            message.success(success.data.msg);
          }
          return success.data;
    },
    (error) => {
        if (error.response.error_code == 504 || error.response.error_code == 404) {
          message.error( "服务器被吃了( ╯□╰ )" );
        } else if (error.response.error_code == 2001) {
          message.error("请求PCB缺陷数据服务出错" );
        // } else if (error.response.error_code == 401) {
        //   message.error({
        //     message: error.response.data.msg
        //       ? error.response.data.msg
        //       : "尚未登录，请登录",
        //   });
        //   location.href = "/";
        // } 
        }else {
          if (error.response.data.msg) {
            message.error(error.response.data.msg );
          } else {
            message.error("未知错误!" );
          }
        }
       return Promise.reject(error);
      }
)

export default service