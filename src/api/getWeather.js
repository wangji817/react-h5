import { vtools } from '@util/';
export function getWeather(province = "zhejiang", city = "hangzhou") {
    return vtools.get(`https://tianqi.moji.com/weather/china/${province}/${city}/`);
}