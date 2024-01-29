<template>
    <main class="main container">
        <TheList @edit="goEdit" :content="users"/>
        <TheEditForm :open="formState" @finish="openForm = false"/>
    </main>
</template>

<script setup>
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUsersStore } from '~/stores/users';

    const usersStore = useUsersStore();

    const { users } = storeToRefs(usersStore);
    

    onMounted(() => {
       try {
            usersStore.restoreState();
            console.log(users);
       } catch (error) {
            console.error('Ошибка при запросе данных', error);
       }
    });

    const formState = ref(false);

    const goEdit = () => {
        console.log(formState.value);
        formState.value = true;
        console.log(formState.value);
    }

</script>

<style lang="scss">
    .main {
        display: flex;
        height: 100dvh;
        align-items: center;
        justify-content: space-between;
    }
</style>