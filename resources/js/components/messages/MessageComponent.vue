<template>
    <div class="messages" ref="messages">
         <MessageItem
            v-for="message in message_data .slice().reverse()"
            :key="message.id"
            :message="message"
            @editMsg="editMsg"
            @deleteMsg="deleteMsg"
        />
    </div>
</template>


<script>

import MessageItem from './MessageItemComponent'

export default {
    name: 'messages',
    props: {
        message_data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        MessageItem
    },
    methods: {
        editMsg(data) {
            this.$emit('editMsg', data);
        },
        deleteMsg(data) {
            this.$emit('deleteMsg', data);
        }
    }
}
</script>