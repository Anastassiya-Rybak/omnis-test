<template>
    <div class="clarify">
        <h2>Сохранить внесённые изменения?</h2>
        <div class="clarify__btns">
            <TheButton class="clarify__btn" text="НЕТ" @click="$emit('no')"/>
            <TheButton class="clarify__btn" text="ДА" @click="$emit('yes')"/>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .clarify {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(10, 10, 10, 0.623);
        backdrop-filter: blur(3px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h2 {
            color: #fff;
            font-size: 2rem;
            letter-spacing: 0.2em;
            word-spacing: 0.2em;
            text-shadow: 0 0.1em 0.07em #27272746;
        }

        &__btns {
            display: flex;
            gap: 2vw;
            padding-top: 3vh;
        }

        &__btn {
            font-size: 1.5rem;
            
            &:last-child {
                background-color: $accent;
            }
        }
    }
</style>