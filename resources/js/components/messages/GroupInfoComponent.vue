<template>
    <div class="modal-wrapper" ref="modal_wrapper">
        <div class="card">
            <div class="card-header">
                <div class="float-left">
                   <p>Group info</p>
                </div>
                <div class="float-right">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-sliders" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M14 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM11.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM7 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM4.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9.5 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM11.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                        <path fill-rule="evenodd" d="M9.5 4H0V3h9.5v1zM16 4h-2.5V3H16v1zM9.5 14H0v-1h9.5v1zm6.5 0h-2.5v-1H16v1zM6.5 9H16V8H6.5v1zM0 9h2.5V8H0v1z"/>
                    </svg>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="close">
                        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                    </svg>
                </div>
            </div>
            <div class="card-body">
                <div class="first-block">
                    <img :src="require('../../../../storage/app/public/uploads/' + CURRENT_CHAT.image)"  alt="">
                    <div class="content">
                        <p><strong>{{CURRENT_CHAT.title}}</strong></p>
                        <small>{{members.length }} members, {{online.length}} online</small>
                    </div>
                </div>
                <hr/>
                <div class="second-block">
                    <div class="float-left">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg>
                    </div>
                    {{members.length}} members
                    <div class="float-right">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                            <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                        </svg>
                    </div>
                </div>
                <div class="third-block">
                    <ul class="list-group"
                        v-for="member in members"
                        :key="member.id"
                        >
                        <li class="list-group-item">
                            <img :src="require('../../../../storage/app/public/uploads/' + member.image)"  alt="" class="avatar">
                            <strong>{{member.name}}</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'GroupInfo',
    props: {
        online: {
            type: Array,
            default: () => []
        },
        members_data: {
            type: Array,
            default: () => []
        }
        
    },
    data() {
        return {
            members: this.members_data
        }
    },
    computed: {
        ...mapGetters([
            'CURRENT_CHAT',
            'USER',
            'MEMBERS'
        ])
    },
    methods: {
        close() {
            this.$emit('close');
            
        }
    },
    created() {
        // this.members.unshift(this.USER);
    },
    mounted() {
        

        let vm = this;
        document.addEventListener('click', function(item) {
            if (item.target === vm.$refs['modal_wrapper']) {
                vm.close();
            }
        })
        // vm.members.unshift(vm.USER);
        // vm.members.unshift(vm.MEMBERS)
        // this.members.push(this.members_data);
    }
}
</script>

<style scoped>
.modal-wrapper {
    background: rgba(64,64,64, .4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
}
p {
    margin: 0;
}
.card {
    width: 500px;
    display: flex;
    position: fixed;
    top: 100px;

}
.first-block {
    display: flex;
}
.second-block {
    margin: 10px
}
img {
    border-radius: 50%;
    width: 60px;
    padding: 5px;
    margin: 2px;
}
.avatar {
    width: 30px;
    height: 30px;
}
</style>