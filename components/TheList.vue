<template>
    <section class="users-list">
        <h1 class="users-list__title">СПИСОК СЕРВЕРОВ КЛИЕНТОВ</h1>
        <ul class="users-list__content">
            <li>
                <ul class="users-list__header-line">
                    <li>ID</li>
                    <li>Название сервера</li>
                    <li>Тип сервера</li>
                </ul>
            </li>
            <li class="users-list__item item" v-for="(user, idx) in content" :key="idx">
                <ul class="item__line">
                    <li>{{ user.customer_id }}</li>
                    <li>{{ user.server_name }}</li>
                    <li>{{ user.server_type }}</li>
                    <li>
                        <TheButton text="Редактировать" @click.prevent="$emit('edit', idx)" />
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<script setup>
    const props = defineProps({
        content: {
            type: Array,
            required: true,
            default: []
        }
    })

</script>

<style lang="scss" scoped>
    .users-list {
        width: 50%;

        @include media(760px){
            width: 100%;
            margin-top: 3dvh;
        }

        &__title {
            letter-spacing: 0.1em;
            margin-bottom: 2vh;
            @include media(760px){
                text-align: center;
                font-size: 5vw;
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 0.5vh;
        }

        &__header-line,
        .item__line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 2em;

            li:first-child {
                flex: 0.5;
                margin-left: 0.7em;
            }

            li:not(:first-child) {
                flex: 1;
            }
        }

        &__header-line {
            width: 71%;
        }
        .item__line {
            background-color: rgba(235, 235, 235, 0.459);

            @include hover(){
                background-color: rgba(235, 235, 235, 0.719);
            }

            li {
                &:last-child {
                    display: flex;
                    justify-content: flex-end;
                    padding-right: 0.7em;
                }                
            }


        }
    }
</style>