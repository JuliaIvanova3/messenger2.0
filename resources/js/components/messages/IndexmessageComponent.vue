<template>
    <div class="card">
         <div v-if="!CURRENT_CHAT.id" class="notcurChat">
            <span class="badge badge-light ">Please select a chat to start messaging </span>
        </div>
        <div v-if="CURRENT_CHAT.id" class="content">
            <div class="card-header text-secondary">
                <div class="float-left">
                    <p><strong> {{CURRENT_CHAT.title}} </strong></p>
                    <p> {{MEMBERS.length+1}} members </p>
                </div>
                <div class="float-right">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="editable" @click="editChat">
                        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                    </svg>
                </div>
            </div>
            <div class="card-body" id="cardBody" ref="messages">
                <span class="badge badge-light first" v-if="!MESSAGES.length">Please write your first message </span>
                <Message
                    @editMsg="editMsg"
                    @deleteMsg="deleteMsg"
                    :message_data="messegesGet"
                />
            </div>
             <div class="alert alert-danger" role="alert" v-if="nullError" >
            <strong>Error!</strong> The <strong>Message</strong> can not be null.
            </div>
            <div class="alert alert-danger" role="alert" v-if="trimError" >
                <strong>Error!</strong> The <strong>Message</strong> can not consist of only spaces.
            </div>
            <div class="card-footer" >
                <div class="input-group mb-3" v-if="!shownEdit">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"/>
                                <path fill-rule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                                <path fill-rule="evenodd" d="M13 12.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                            </svg>
                        </span>
                    </div>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Write a message ....."
                        v-model="textMessage"
                        @keypress.enter="sendMessage" >
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cursor-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="sendMessage">
                                <path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="input-group mb-3" v-if="shownEdit">
                <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"/>
                                <path fill-rule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                                <path fill-rule="evenodd" d="M13 12.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                            </svg>
                        </span>
                    </div>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Write a message ....."
                        v-model="editTextMessage"
                        @keypress.enter="updateMessage" >
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  @click="updateMessage">
                                <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'

import Message from './MessageComponent'

export default {
    name: 'IndexmessageComponent',
    components: {
        Message
    },
    data() {
        return {
            textMessage: '',
            shownEdit: false,
            editTextMessage: '',
            editMessage: '',
            nullError: false,
            trimError: false,
            messagesArray: [],
            ugvugbu: []
        }
    },
    computed: {
        ...mapGetters([
            'CURRENT_CHAT',
            'MESSAGES',
            'MEMBERS',
            'USER'
        ]),
        editable () {
            return this.CURRENT_CHAT.creator_id == this.USER.id
        },
        messegesGet() {
            return  this.messagesArray = [...this.MESSAGES];
        }
        
    },
    methods: {
        ...mapActions([
            'GET_MESSAGES_FROM_API',
            'GET_CHATS_FROM_API',
            'GET_MEMBERS_FROM_API'
        ]),
        sendMessage() {
            if (this.textMessage.length == 0) {
                this.nullError = true;
            } else {
                if (this.textMessage.trim() == '') {
                    this.nullError = false;
                    this.trimError = true;
                    this.textMessage = '';
                } else {
                    this.trimError = false;
                    const formData = new FormData();
                    formData.append('text', this.textMessage);
                    formData.append('user_id', this.USER.id)
                    formData.append('chat_id', this.CURRENT_CHAT.id);
                    formData.append('channels', 'chat.'+this.CURRENT_CHAT.id);
                    axios.post('http://messenger2.test/addmsg', formData)
                    .then((response) => {
                        console.log(response.data)
                        this.textMessage = ''
                        // this.messagesArray.push(response.data)
                        // this.MESSAGES = this.MESSAGES.push(response.data)
                        // this.load();
                        // this.GET_CHATS_FROM_API();
                        // this.GET_MESSAGES_FROM_API();
                    })
                }
            }
        },
        editMsg(data) {
            console.log(data)
            this.editMessage = data
            this.editTextMessage = data.text
            this.shownEdit = true
        },
        updateMessage () {
            if (this.editTextMessage.length == 0) {
                this.nullError = true;
            } else {
                if (this.editTextMessage.trim() == '') {
                    this.nullError = false;
                    this.trimError = true;
                    this.editTextMessage = '';
                } else {
                    this.trimError = false;
                    const formData = new FormData();
                    formData.append('text', this.editTextMessage);
                    axios.post('http://messenger2.test/messages/'+ this.editMessage.id, formData)
                    .then((response) => {
                        console.log(response.data)
                        this.editTextMessage = ''
                        this.shownEdit = false
                        this.GET_CHATS_FROM_API();
                        this.GET_MESSAGES_FROM_API();
                    })
                }
            }
        },
        deleteMsg(data) {
            axios.delete('http://messenger2.test/messages/'+ data)
            .then((response) => {
                console.log(response)
                this.GET_MESSAGES_FROM_API();
               // this.GET_CHATS_FROM_API();
            })
        },
        editChat() {
            this.$router.push('/chat/edit');
        },
        scrollToEnd() {
            var element = this.$refs.messages
            element.scrollTop = element.scrollHeight;
        },
        updateCurrentChat() {
            this.GET_MESSAGES_FROM_API();
            this.GET_MEMBERS_FROM_API();
            var socket = io('http://messenger2.test:3000');
            let vm = this
            if (vm.CURRENT_CHAT.id) {
                socket.on("chat."+ vm.CURRENT_CHAT.id + ":App\\Events\\NewMessage", function(data) {
                console.log(data.message)
                vm.messagesArray.unshift(data.message)
            });
            }
            // console.log(this.messagesArray.indexOf('0'))
        }
    },
    mounted() {
        // var socket = io('http://messenger2.test:3000');
        //  console.log("chat."+this.CURRENT_CHAT.id)
        //  let vm = this
        // socket.on("chat."+ vm.CURRENT_CHAT.id + ":App\\Events\\NewMessage", function(data) {
        //     console.log(data.message)
        //     vm.GET_MESSAGES_FROM_API();
        // });

        // this.scrollToEnd();
        this.GET_MESSAGES_FROM_API();
        this.GET_MEMBERS_FROM_API();
        
    },
    watch: {
        CURRENT_CHAT () {
           this.updateCurrentChat();
        },
        messagesArray() {
            this.scrollToEnd();
        }
    },
    updated() {
        this.scrollToEnd();
    }
}
</script>

<style scoped>
.notcurChat {
    height: 630px;
    text-align: center;
    background-color: #B0C4DE;
}
.badge {
    margin-top: 310px;
    font-size: 15px;
}
.card-header {
    padding: 10px 20px;
    height: 70px;
}
p {
    margin: 0px;
}
strong {
    font-size: medium;
}
.card-body {
    height: 500px;
    /* background-color: #D3D3D3; */
    overflow: auto;
}
.card-footer {
    height: 60px;
}
.first {
    margin-top: 200px;
    margin-left: 230px;
}
.alert {
    bottom:60px;
    left: 57px;
    position: absolute;
    margin-bottom: 0;
}
</style>