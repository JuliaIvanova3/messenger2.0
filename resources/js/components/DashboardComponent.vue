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
    
}
</script>
