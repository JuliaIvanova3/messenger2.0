<template>
    <div class="chat" :class="{ active: isActive }" @click="activeTrue(chat_data)">
        <img :src="require('../../../../storage/app/public/uploads/' + chat_data.image)"  alt="">
        <div class="content">
            <p><strong> {{chat_data.title}} </strong></p>
            <p> {{chat_data.last_msg ? chat_data.last_msg.text : '...' }}</p>
        </div>
        <div class="notifications">
            <div class="inside">
                <svg width="20px" height="20px" viewBox="0 0 16 16" class="icons bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="editable" @click="editChat" >
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                </svg>
                <span class="badge badge-primary" v-if="unread">{{chat_data.unread}}</span>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'ChatitemComponent',
    props: {
        chat_data: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'USER',
            'CURRENT_CHAT',
            'MESSAGES'
        ]),
        editable() {
            return this.chat_data.creator_id == this.USER.id;
        },
        isActive() {
            if (!this.CURRENT_CHAT) {
                return false;
            } else {
                return this.chat_data.id == this.CURRENT_CHAT.id;
            }
        },
        unread() {
            return this.chat_data.unread != 0;
        },
        checkUnread() {
            if (this.chat_data.id == this.CURRENT_CHAT.id) {
                this.chat_data.unread = 0;
            }
        }
    },
    methods: {
        activeTrue(data) {
            this.$emit('swicthActive', data)
        },
        editChat() {
            this.$router.push('/chat/edit');
        }
    },
    watch: {
        CURRENT_CHAT() {
            this.checkUnread;
        }
    }
}
</script>

<style scoped>
.chat {
    border: solid 1px rgba(0,0,0, 0.125);
    display: flex;
    margin: 5px 0px;
}
.active {
    background-color: #87CEEB;
    color: honeydew;
}
.notifications {
    margin-left: auto;
    order: 2;
}
img {
    border-radius: 50%;
    width: 60px;
    padding: 5px;
    margin: 2px;
}
p {
    margin: 0px;
}
strong {
    font-size: medium;
}
.icons {
    margin: 8px;
}
</style>