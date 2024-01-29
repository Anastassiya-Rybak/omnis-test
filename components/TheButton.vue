<template>
    <button :class="styleBy">
        {{ text }}
    </button>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true,
            default: ""
        }
    });

    const styleBy = computed(()=>{
        return props.text === 'Редактировать' ? 'users-list__btn btn' : 'edit-form__btn btn';
    })
</script>

<style lang="scss" scoped>
    .users-list__btn {
        background-color: $accent;
    }

    .edit-form__btn {
        background-color: $main-light;
    }

    .btn {
        border: none;
        border-radius: 5px;
        padding: 0.1em 0.4em;
        box-shadow: 0.1em 0.1em 0.3em #4e4e4e67;
        transition: 0.2s;
        letter-spacing: 0.1em;
        cursor: pointer;

        &:active {
            box-shadow: 0 0 0.01em #4e4e4e67;
        }
    }
</style>