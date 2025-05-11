import { defineStore } from "pinia";


const useVocabularyStore = defineStore("vocabulary", {
    state: () => ({
        vocabularyList: [],
        current: {},
        currentUKPhonetic: "",  // 当前音标
        currentUSPhonetic: "",  // 当前音标
        currentWord: ""  // 当前单词
    }),
    getters: {
        getVocabularyList(state) {
            return state.vocabularyList;
        }
    }
});