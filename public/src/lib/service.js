import Config from './config'
import {notification} from "antd";
import axios from 'axios'

class Service {
  static CommonService (baseURL = `${Config.api_url}`) {
    let service = axios.create({
      baseURL: baseURL
    })
    service.defaults.timeout = 60000
    service.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.code === 'ECONNABORTED' || !error.response) {
            notification.warning({
                key: 'network error',
                message: '很抱歉',
                description: '请检查您的网络是否正常..'
            });
        }
        return Promise.reject(error);
    });
    return service
  }
  static getIP () {
    return Service.CommonService(Config.ip_url).get('/')
  }
  static getMusic (id) {
    return Service.CommonService().post('/music163/playlist',{id})
  }
  static likeIt (ip) {
    return Service.CommonService().post('/portal/likeIt',{ip})
  }
}

export default Service