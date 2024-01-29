<template>
    <section class="edit-form">
        <h2 class="edit-form__title" :class="{'edit-form__title_open': open}">ФОРМА <br><span>редактирования</span></h2>
        <span>ID КЛИЕНТА: </span>
        <form action="#">
            <label for="server-name">
                <input type="text" name="server-name" id="server-name">
            </label>
            <label for="server-type">
                <select name="server-type" id="server-type">
                    <option v-for="server in serverTypes" :key="server" value="server">{{ server }}</option>
                </select>
            </label>
        </form>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    // import JSON from '~/server/bd.json';

    const props = defineProps({
        open: {
            type: Boolean,
            required: true,
            default: false
        }
    })
    
    // const serverTypes = Object.keys(Object.groupBy(JSON.users, (user) => user.server_type));
</script>

<style lang="scss" scoped>
    .edit-form {
        height: 100%;
        width: 40%;
        background-color: $main-light;

        &__title {
            margin-top: 45dvh;
            // margin-left: -2px;
            padding: 0.35em 0 0.2em;
            width: 100%;
            text-align: center;
            font-size: 300%;
            letter-spacing: 0.3em;
            line-height: 0.8em;
            background-color: $accent;

            &_open {
                margin-top: 5dvh;
                animation: open 0.5s ease-in-out alternate;
            }

            @keyframes open {
                from { margin-top: 45dvh; }
                to { margin-top: 5dvh; }
            }
            span {
                font-size: 0.5em;
                letter-spacing: 0.3em;
            }
        }
    }

</style>