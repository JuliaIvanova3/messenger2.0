<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <indexChat/>
            </div>
            <div class="col-md-8">
                <indexMessage/>
            </div>
        </div>
    </div>
</template>
<script>
import indexChat from './chats/IndexchatComponent'
import indexMessage from './messages/IndexmessageComponent'

import {mapActions} from 'vuex'

export default {
    name: 'dashboard',
    components: {
        indexChat,
        indexMessage
    },
    data() {
        return {
        //
        }
    },
    methods: {
        ...mapActions([
            'GET_USER_FROM_API'
        ])
    },
    created() {
        this.GET_USER_FROM_API();
    }
    
}
</script>
