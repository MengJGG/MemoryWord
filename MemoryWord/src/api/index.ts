import axios from 'axios';
import { nanoid } from 'nanoid';  // 随机id
import { ref, reactive } from 'vue';

import type { User }  from '@/types'

// 创建axios实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
});

export function getThemeFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'theme') {
            if (value == 'dark' || value == 'light') {
                return value;
            } else {
                return "dark";
            }
        }
    }
    return "dark"; // 如果没找到theme cookie则返回null
}

// 获取单词音频并播放，type为1为英式发音，2为美式发音
export async function playPronunciation(word?: string, type: string="2") {
    if (!word) {
        return;
    }
    
    try {
        const URL = `/youdao-audio/dictvoice?audio=${word}&type=${type}`;
        console.log("请求音频", URL);
        const response = await axios.get(URL, {
            responseType: 'arraybuffer',
            
        });

        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(response.data);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    } catch (error) {
        console.error("播放音频失败:", error);
    }
}

// 设置该单词为不常用单词，或者已经熟练掌握的单词，以后不再出现在学习列表中
export function setUselessWord(word: string) {
    
}

// 设置该单词为常用单词，以后出现在学习列表中
export function setUseWord(word: string) {

}

// 设置该单词为收藏的单词，以便随时查看
export function setFavoriteWord(word: string) {

}


export async function getJSON(src: string) {
    try {
        const response = await axios.get(src);
        return response.data;
    } catch (error) {
        console.error("获取JSON数据失败:", error);
        return null;
    }
}

export function checkLogin() {
    // 
}

// 获取用户信息，包括用户名，学习进度，收藏单词，不常用单词。
export function getUserInfo() {
    
}
