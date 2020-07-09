import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { extendWith } from 'lodash';

Vue.use(Vuex)


let store =new Vuex.Store({
    namespaced: true,
    state: {
        chats: [],
        user: [],
        currentChat: [],
        users: [],
        messages: [],
        members: [],
        notUsers: []
    },
    mutations: {
        SET_CHATS_TO_STATE: (state, chats) => {
            state.chats = chats;
        },
        SET_USER_TO_STATE: (state, user) => {
            state.user = user;
        },
        SET_CURRENT_CHAT_TO_STATE: (state, chat) => {
            state.currentChat = chat;
        },
        SET_USERS_TO_STATE: (state, users) => {
            state.users = users;
        },
        SET_MESSAGES_TO_STATE: (state, data) => {
            state.messages = data;
        },
        SET_MEMBERS_TO_STATE: (state, data) => {
            state.members = data;
        },
        SET_NOT_USERS_TO_STATE: (state, data) => {
            state.notUsers = data;
        }
    },
    actions: {
        GET_USERS_FROM_API ({commit}) {
            return axios('http://messenger2.test/users', {
                method: 'GET'
            })
            .then ((users) => {
                commit('SET_USERS_TO_STATE', users.data);
                return users;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        },
        GET_CHATS_FROM_API({commit}) {
            return axios('http://messenger2.test/getchat', {
                method: 'GET'
            })
            .then ((chats) => {
                commit('SET_CHATS_TO_STATE', chats.data);
                commit('SET_CURRENT_CHAT_TO_STATE', chats.data[0]);
                return chats;
            })
            .catch ((error) => {
                console.log(error);
                return error;
            })
        },
        GET_USER_FROM_API({commit}) {
            return axios('http://messenger2.test/getuser', {
                method: 'GET'
            })
            .then ((user) => {
                commit('SET_USER_TO_STATE', user.data);
                return user;
            })
            .catch ((error) => {
                console.log(error);
                return error;
            })
        },
        GET_MESSAGES_FROM_API ({commit}) {
            if (typeof this.state.currentChat == "undefined") {
                let messages = []
                commit('SET_MESSAGES_TO_STATE', messages);
                return messages;
                
            } else {
                return axios.post('http://messenger2.test/getmsgbychat', {
                    chat_id: this.state.currentChat.id
                })
                .then ((messages) => {
                    commit('SET_MESSAGES_TO_STATE',messages.data);
                    return messages;
                })
                .catch ((error) => {
                    console.log(error);
                    return error;
                })
            }
        },
        GET_MEMBERS_FROM_API ({commit}) {
            if (typeof this.state.currentChat == "undefined") {
                let members = []
                commit('SET_MEMBERS_TO_STATE', members);
            } else {
                return axios.post('http://messenger2.test/getByChat/'+this.state.currentChat.id)
                .then((members)=> {
                   commit('SET_MEMBERS_TO_STATE', members.data);
                   return members;
                })
                .catch ((error) => {
                    console.log(error);
                    return error;
                })
            }
        },
        GET_NOT_USERS_FROM_API ({commit}) {
            if (typeof this.state.currentChat == "undefined") {
                let vm = []
                commit('SET_NOT_USERS_TO_STATE', vm);
            } else {
                return axios.post('http://messenger2.test/getUsers/'+this.state.currentChat.id)
                .then ((users) => {
                    commit('SET_NOT_USERS_TO_STATE', users.data);
                    return users;
                })
                .catch ((error) => {
                    console.log(error);
                    return error;
                })
            }
        },
        SET_CURRENT_CHAT ({commit}, chat) {
            commit('SET_CURRENT_CHAT_TO_STATE', chat);
        }

    },
    getters: {
        CHATS (state) {
            return state.chats;
        },
        USER (state) {
            return state.user;
        },
        CURRENT_CHAT (state) {
            return state.currentChat;
        },
        USERS (state) {
            return state.users;
        },
        MESSAGES (state) {
            return state.messages;
        },
        MEMBERS (state) {
            return state.members;
        },
        NOT_USERS (state) {
            return state.notUsers;
        }
    }
});

export default store;