<template>
    <div class="message-item" :class="className">
        <div class="message-content content">
            <div class="alert alert-primary">
                <div class="header">
                    <p class="p-from"> <strong> {{message.from}} </strong> </p>
                    <div class="actions" v-if="check">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="header-icon bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="editMsg">
                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                        </svg>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="header-icon bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg" @click="deleteMsg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                     </div>
                </div>
                <p> {{message.text}} </p>
                <div :class="classFloat">
                    <small class="small-date">  {{message.date}} </small>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" v-if="check">
                        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    name: 'message-item',
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters([
            'USER'
        ]),
        className() {
            return {
                'chat-own': this.message.user_id == this.USER.id,
                'chat-other' : this.message.user_id != this.USER.id
            }
        },
        classFloat() {
            return {
                'float-right': this.message.user_id == this.USER.id,
                'float-left' : this.message.user_id != this.USER.id
            }
        },
        check() {
            return this.message.user_id == this.USER.id
        }
    },
    methods: {
        editMsg() {
            this.$emit('editMsg', this.message);
        },
        deleteMsg() {
            this.$emit('deleteMsg', this.message.id);
        }
    }
}
</script>

<style scoped>
.message {
    margin-bottom: 16px;
}
.chat-own {
    display: flex;
    justify-content: flex-end;
}
.header {
    display: flex;
    justify-content: space-between;
}
.chat-other {
    display: flex;
    justify-content: flex-start;
}
p {
    margin-bottom: 0;
}
.alert {
    padding: 2px 6px;
}
.p-from {
    font-size: 12px;
}
.small-date {
    font-size: 10px;
}
.header-icon {
    width: 10px;
    margin: 0px 2px;
}
</style>