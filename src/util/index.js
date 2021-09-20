import axios from 'axios';
import qs from 'qs';

const vtools = {};
/**
 * 参数序列化
 *
 * @param {object} params 'key/value'名值对形式的参数集
 * @returns {string} 序列化后的参数字符串
 * @example
 *
 * cmr.paramSerialize({a: 1, b: 2})
 * // => 'a=1&b=2'
 */
vtools.paramSerialize = (params) => {
    if (!params || typeof params !== 'object') {
        return '';
    }
    let keys = Object.keys(params);
    if (!keys || !keys.length) {
        return '';
    }
    keys = keys.map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    });
    return keys.join('&').replace(/%20/g, '+');
};
/**
 * 判断值是否为空
 *
 * @param {any} val 需要判断的值
 * @returns {boolean} 判断结果
 */
vtools.judgeQuestion = (str) => {
    (/\?/i).test(str) ? str += '&' : str += '?';
    return str;
};
vtools.isEmpty = (val) => {
    return val === null || val === undefined || val === '';
};

vtools.addUrl = (url) => {
    if (!url) {
        return "";
    }
    let _ua = navigator.userAgent.toLowerCase();
    if (_ua.indexOf('ios') != -1 || _ua.indexOf('iphone') != -1) {
        url = vtools.judgeQuestion(url) + (url.indexOf("cm=") != -1 ? "" : "cm=M8030001");
    }
    if (url.indexOf("//") != -1) {
        url = `${url}`;
    } else {
        url = `./${url}`;
    }
    return url;
}

/**整合ajax url路径 */
vtools.ajaxFlag = !true;/**本地ajax请求开关，为true时会请求本地的json文件，false为线上地址，本地文件不存在时请求线上 */

/**
 * get请求
 *
 * @param {string} url 需要判断的值
 * @param {object} data 传参数
 * timeFlag 是否需要拼接时间戳，默认true
 */
vtools.get = (url = "", data = {}, extParam = {}, timeFlag = true) => {
    if (!url) {
        console.warn('get请求的url不能为空')
        return {};
    }
    return new Promise((resolve, reject) => {
        timeFlag && (data._t = new Date().getTime());
        axios.get(url, { "params": data }, extParam)
            .then(function (response) {
                const { data = {}, status = {} } = response;
                if (data && data.code === 401) {
                    vtools.goJumpRoute('/login');
                } else {
                    if (response.status === 200) {
                        resolve(data, status);
                    } else {
                        reject(data, status);
                    }
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
/**
 * post请求
 *
 * @param {string} url 需要判断的值
 * @param {object} data 传参数
 */
vtools.post = (url, data = {}, extParam = {}, timeFlag = true) => {
    if (!url) {
        console.warn('post请求的url不能为空')
        return {};
    }
    if (!data.dataType) {
        data = qs.stringify(data);//默认为form表单提交，否则设置了dataType才为json
    }
    return new Promise((resolve, reject) => {
        timeFlag && (data._t = new Date().getTime());
        axios.post(url, data, extParam)
            .then(function (response) {
                const { data = {}, status = {} } = response;
                if (data && data.code === 401) {
                    vtools.goJumpRoute('/login');
                } else {
                    if (response.status === 200) {
                        resolve(data, status);
                    } else {
                        reject(data, status);
                    }
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

vtools.getQueryString = (param) => {
    // query = query || window.location.search.substr(1);
    // query = query.replace(/\?/g,"");
    const query = window.location.href.split("?")[1] || "";
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = query.match(reg);
    if (r !== null) return unescape(r[2]); return null;
}
vtools.picCdnPre = (atomsid) => {
    return window.location.protocol + `//cdn.cmread.com/comment/image/${atomsid}/pic.jpg`;
}

export {
    vtools
}