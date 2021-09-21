import { vtools } from '@util/';
export function getData() {
    return vtools.get(`/static/json/queryHome.json`);
}