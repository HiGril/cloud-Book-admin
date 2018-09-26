import axios from "axios"
import { Message } from 'element-ui';
import router from "../router/index"



//获取连接
const baseURL = "/api/admin"
const instance = axios.create({
    baseURL,
    // timeout:1000,
})
//定义各种请求方法
const xhr = {
    get(url,data,config){
        return new Promise((resolve,reject)=>{
            instance.get(url, {params:data}, config).then(res => {
                if(res.data.code==401){
                    Message.error("登录失效请重新登录");   
                   router.push("/login")
                }
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        }) 
    },
    post(url,data,config){
        return this.fetch(url, data, config,"post")
    },
    put(url, data, config){
        return this.fetch(url, data, config, "put")
    },
    // delete(url, data, config) {
    //     return this.fetch(url, data, config, "delete")
    // },
  
    delete(url, data, config){
        return new Promise((resolve, reject) => {
            instance.delete(url, { params: data }, config).then(res => {
                if (res.data.code == 401) {
                    Message.error("登录失效请重新登录");
                    router.push("/login")
                }
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }) 
    },
    fetch (url,data,config,method){
        return new Promise((resolve, reject) => {
            instance[method](url, data, config).then(res => {
                if (res.data.code == 401) {
                    Message.error("登录失效请重新登录");
                    router.push("/login")
                }
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

}

export const $axios = xhr