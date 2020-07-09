<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <small><strong>EDIT  CHAT</strong></small>
            </div>
            <div class="card-body">
                <form class="form-group" @submit.prevent="editChat">
                    <div class="form-group">
                        <label >Chat Title</label>
                        <input type="text" class="form-control" v-model="chatTitle" placeholder="Chat Title" >
                    </div>
                    <div class="alert alert-danger" role="alert" v-if="titleError">
                        <strong>Error!</strong> The <strong>Title</strong> need to be more than 3 symbols.
                    </div>
                    <hr/>
                    <div class="image">
                        <img v-if="url" :src="url" />
                        <img v-if="!url" :src="require('../../../../storage/app/public/uploads/' + CURRENT_CHAT.image)"  alt="">
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
                    <div class="form-group" v-if="MEMBERS.length">
                        <label> Members</label>
                        <div class="members">
                            <ul class="list-group">
                                <li   
                                    v-for="member in MEMBERS"
                                    :key="member.id"
                                >
                                    <span class="badge badge-secondary">{{member.user.name}}
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="deleteMember(member.id)">
                                            <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.854 4.854a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
                                        </svg>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <hr/>
                    </div>
                    <div class="form-group" v-if="NOT_USERS.length">
                        <label >Add Member</label>
                        <div class="form-inline">
                            <select class="form-control select" v-model="firstMember">
                                <option class="form-control"
                                        v-for="user in NOT_USERS"
                                        :key="user.id"
                                        :value="user.id"
                                > {{user.name}} </option>
                            </select>

                            <!-- <fa-icon :icon="['fa', 'plus-square']" class="text-muted icons" @click="addMembers" size="2x" /> -->
                            <svg width="1em" height="2em" viewBox="0 0 16 16" class="text-muted icons bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="addMembers">
                                <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                                <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            </svg>
                        
                        </div>
                        <div class="alert alert-danger" role="alert" v-if="memberError">
                        <strong>Error!</strong> The <strong>Chat</strong> need to have even one member.
                        </div>
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
    name: 'create-chat',
    data() {
        return {
            chatTitle: '',
            users: [], 
            shownAdd: false,
            firstMember: '',
            members: [],
            titleError: false,
            memberError: false,
            url: '',
            file: ''
        }
    },
    computed: {
        ...mapGetters([
            'USERS',
            'CURRENT_CHAT',
            'MEMBERS',
            'NOT_USERS'
        ]),
    },
    methods: {
        ...mapActions([
            'GET_NOT_USERS_FROM_API',
            'GET_MEMBERS_FROM_API',
            'GET_CHATS_FROM_API',
            'SET_CURRENT_CHAT'
        ]),
        editChat() {
            if ( this.chatTitle.length < 3) {
                return this.titleError = true;
                
            } else  {
                if ( this.firstMember != "" || this.MEMBERS.length) {
                    const formData = new FormData();
                    formData.append('title', this.chatTitle);
                    if (this.file != '') {
                        formData.append('image', this.file);
                    }
                    //console.log(formData.getAll('image'))
                    axios.post('http://messenger2.test/updatechat/'+this.CURRENT_CHAT.id, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    )
                    .then ((response) => {
                        console.log(response.data)
                        this.SET_CURRENT_CHAT(response.data);
                        //console.log(formData.getAll('image'))
                        this.GET_CHATS_FROM_API();
                        this.$router.push('/home');
                        
                    })
                   
                    this.titleError = false;
                } else {
                    return this.memberError = true;
                }
            }
        },
        addMembers() {
            if ( this.firstMember != "" || this.MEMBERS.length) {
                this.memberError = false;
                const formData = new FormData();
                formData.append('user_id', this.firstMember)
                formData.append('chat_id', this.CURRENT_CHAT.id)
                axios.post('http://messenger2.test/adduserchat', formData,)
                .then ((response) => {
                    console.log(response.data)
                    this.GET_MEMBERS_FROM_API();
                })
                
                this.firstMember = ""
            } else {
                return this.memberError = true;
            }   
        },
        deleteMember(id) {
            console.log(id)
            axios.delete('http://messenger2.test/userchat/'+id)
            .then((response) => {
                console.log(response.data)
                this.GET_MEMBERS_FROM_API();
            })
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            this.url = URL.createObjectURL(this.file);
        }
    },
    mounted() {
        this.GET_NOT_USERS_FROM_API();
        this.chatTitle = this.CURRENT_CHAT.title
    },
    watch: {
        MEMBERS() {
            this.GET_NOT_USERS_FROM_API();
        }
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
.badge {
    font-size: 85%;
    margin: 5px;
}
li {
    list-style-type: none; /* Убираем маркеры */
}
image {
    display: flex;
}
</style>