<template>
    <div class="card">
        <div class="card-header text-secondary" >
            <svg width="2em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
            <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            </svg>
            <p class="lead">Create new chat ...</p>
        </div>
        <div class="card-body">
            <ChatitemComponent 
                v-for="(chat, index) in CHATS"
                :key="index"
                :chat_data="chat"
                @swicthActive="swicthActive"
            />
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import ChatitemComponent from './ChatitemComponent'

export default {
    name: 'IndexchatComponent',
    components: {
        ChatitemComponent
    },
    computed: {
        ...mapGetters([
            'CHATS',
            'USER',
            'CURRENT_CHAT'
        ]),
        connectAllChats() {
            var socket = io('http://messenger2.test:3000');
            this.CHATS.filter(function (item) {
                socket.on("chat."+ item.id + ":App\\Events\\NewMessage", function(data) {
                    console.log(data.message)
                    item.last_msg = data.message
                });
            })
        }
    },
    methods: {
        ...mapActions([
            'GET_CHATS_FROM_API',
            'SET_CURRENT_CHAT',
            'GET_USER_FROM_API'
        ]),
        swicthActive(data) {
            this. SET_CURRENT_CHAT(data)
        },
        // connectAllChats() {
            
        //     this.CHATS.filter(function (item) {
        //         socket.on("chat."+ item.id + ":App\\Events\\NewMessage", function(data) {
        //             console.log(data.message)
        //             item.last_msg = data.message
        //         });
        //     })
        // }
    },
    mounted() {
        this.GET_CHATS_FROM_API();
        this.GET_USER_FROM_API();
    },
    updated() {
        this.connectAllChats();
    }
}
</script>

<style scoped>
.card {
    height: 630px;
}
.card-header {
    display: flex;
    padding: 0px 12px;
}
.card-body {
    padding: 10px;
    overflow: auto;
}
.lead {
    margin: 0;
}
.icons {
    margin: 8px;
}
</style>