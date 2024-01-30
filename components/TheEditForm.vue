<template>
    <section class="edit-form">
        <h2 v-if="!open" class="edit-form__title">ФОРМА <br><span>редактирования</span></h2>
        <div v-else class="edit-form__content">
            <form @submit.prevent="toSave" class="edit-form__form" action="#" @change="$emit('doit')">
                <label for="user-id"> ID КЛИЕНТА:
                    <input type="text" name="user-id" id="user-id" v-model="userData.customer_id"
                    :placeholder="userData.customer_id" readonly disabled>
                </label>
                <label for="server-name"> Название сервера:
                    <input type="text" name="server-name" id="server-name" v-model="userData.server_name"
                    :placeholder="userData.server_name" required maxlength="20" autocomplete="false">
                </label>
                <label for="server-type"> Тип сервера:
                    <select name="server-type" id="server-type" v-model="userData.server_type">
                        <option v-for="server in servers" :key="server" :value="server">{{ server }}</option>
                    </select>
                </label>
                <TheButton class="edit-form__submit" :class="{'edit-form__submit_done': btnText === 'СОХРАНЕНО!'}" type="submit" :text="btnText" />
            </form>
        </div>
    </section>
</template>

<script setup>
    import { computed, onMounted, onBeforeUnmount } from 'vue';
    import { useServersStore } from '~/stores/servers';

    const props = defineProps({
        userData: {
            type: Object
        },
        idx: {
            type: Number
        },
        request: {
            type: Boolean
        }
    })

    const serversStore = useServersStore();
    const { servers } = storeToRefs(serversStore);

    const btnText = ref('СОХРАНИТЬ');

    const emit = defineEmits(['finish', 'doit']);
    const toSave = () => {
        btnText.value = 'СОХРАНЕНО!';
        setTimeout(()=>{
            btnText.value = 'СОХРАНИТЬ';
            emit('finish', props.userData, props.idx);
        }, 1000);
    }

    watch(()=>props.request, ()=>{
        if (props.request) {
            toSave();
        }
    })

    const open = computed(() => { return props.userData.customer_id ? true : false; });

    onMounted(()=>{
        serversStore.restoreState();
    });

    onBeforeUnmount(() => {
        serversStore.saveState();
    })
</script>

<style lang="scss" scoped>
    .edit-form {
        height: 100%;
        width: 40%;
        padding-top: 42dvh;

        @include media(760px){
            padding-top: 10dvh;
            height: fit-content;
            width: 100%;
        }

        &__title {
            padding: 0.35em 0 0.2em;
            text-align: center;
            font-size: 300%;
            letter-spacing: 0.3em;
            line-height: 0.8em;

            span {
                font-size: 0.5em;
                letter-spacing: 0.3em;
            }
        }

        &__title,
        &__content {
            background-color: $accent;
            width: 100%;
            overflow: hidden;
            height: fit-content;
            animation: open 0.5s ease-in-out alternate;

            @keyframes open {
                from { width: 0; opacity: 0; }
                to { width: 100%; opacity: 1; }
            }
        }

        &__content,
        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__form {
            align-items: flex-start;
            gap: 2vh;
            padding: 3vh 1vw;

            @include media(760px){
                font-size: 1.2em;
                width: 100%;
            }

            input,
            select,
            label {
                padding: 0.3em 0.5em;
                @include media(760px){
                    font-size: 1em;
                    width: 100%;
                }
            }
        }

        &__submit {
            margin: 0 auto;
            font-size: 1.5em;
            background-color: $main-light;

            &_done {
                background-color: aquamarine;
            }
        }
    }

</style>