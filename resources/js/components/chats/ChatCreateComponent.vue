<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <small><strong>CREATE NEW CHAT</strong></small>
            </div>
            <div class="card-body">
                <form class="form-group" @submit.prevent="addChat">
                    <div class="form-group">
                        <label> Chat Title </label>
                        <input type="text" class="form-control" v-model="chatTitle" placeholder="Chat Title">
                    </div>
                    <div class="alert alert-danger" role="alert" v-if="titleError">
                        <strong>Error!</strong> The <strong>Title</strong> need to be more than 3 symbols.
                    </div>
                    <hr/>
                    <div class="image">
                        <img v-if="url" :src="url" />
                        <div class="input-group mb-3">
                            <input 
                                type="file" 
                                class="form-control" 
                                id="file" 
                                ref="file" 
                                v-on:change="handleFileUpload()"
                            >
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cloud-upload" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                                        <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="form-group">
                        <label >Add members</label>
                        <div class="form-inline">
                            <select class="form-control select" v-model="firstMember" @change="addMember">
                                <option class="form-control"
                                        v-for="user in USERS"
                                        :key="user.id"
                                        :value="user.id"
                                > {{user.name}} </option>
                            </select>
                            <svg width="1em" height="2em" viewBox="0 0 16 16" class="text-muted icons bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="showAdd">
                                <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>
                            <select v-if="shownAdd" class="form-control select" v-model="secondMember" >
                                <option class="form-control"
                                        v-for="user in users"
                                        :key="user.id"
                                        :value="user.id"
                                > {{user.name}} </option>
                            </select>
                        </div>
                    </div>
                    <div class="alert alert-danger" role="alert" v-if="memberError">
                        <strong>Error!</strong> The <strong>Chat</strong> need to have even one member.
                    </div>
                    <button class="btn btn-secondary"> Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'ChatCreateComponent',
    data() {
        return {
            chatTitle: '',
            users: [], 
            shownAdd: false,
            firstMember: '',
            secondMember: '',
            newChatId: '',
            titleError: false,
            memberError: false,
            file: '',
            url: ''
        }
    },
    computed: {
        ...mapGetters([
            'USERS',
            'USER'
        ]),
    },
    methods: {
        ...mapActions([
            'GET_USERS_FROM_API',
        ]),
        addChat() {
            if (this.chatTitle.length < 3) {
               return this.titleError = true;
            } else {
                this.titleError = false;
                if (this.firstMember == "") {
                    return this.memberError = true;
                } else{
                    this.memberError = false;
                    const formData = new FormData();
                    formData.append('creator_id', this.USER.id)
                    formData.append('title', this.chatTitle);
                    if ( this.file != '') {
                        formData.append('image', this.file);
                    }
                    axios.post('http://messenger2.test/addchat', formData)
                    .then ((response) => {
                        console.log(response.data.id)
                        this.newChatId = response.data.id
                        this.addMembers();
                        this.$router.push('/home');
                    })
                }
            }
        },
        addMembers() {
            const formData1 = new FormData();
            formData1.append('user_id', this.firstMember)
            formData1.append('chat_id', this.newChatId)
            axios.post('http://messenger2.test/adduserchat', formData1)
            .then ((response) => {
                console.log(response.data)
            })
            if ( this.secondMember != '') {
                const formData2 = new FormData();
                formData2.append('user_id', this.secondMember)
                formData2.append('chat_id', this.newChatId)
                axios.post('http://messenger2.test/adduserchat', formData2)
                .then ((response) => {
                    console.log(response.data)
                })
            }
        },
        showAdd() {
            this.shownAdd = true;
        },
        addMember() {
            let vm = this;
            this.users = [...this.USERS]
            this.users = this.users.filter(function (item) {
                return item.id != vm.firstMember
            })
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.url = URL.createObjectURL(this.file);
        },
    },
    mounted() {
        this.GET_USERS_FROM_API();
    }
}
</script>

<style scoped>
.select {
    max-width: 300px;
}
.icons {
    margin: 8px;
}
img {
    border-radius: 50%;
    width: 60px;
    padding: 5px;
    margin: 2px;
}
</style>