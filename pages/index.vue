<template>
    <main class="main container">
        <TheList @edit="goEdit" :content="users" />
        <TheEditForm :userData="user" :idx="userIdx" :request="takeChangedData" @finish="saveUserData" @doit="editProcess = true" />
        <TheClarificationMessage v-show="suddenExit" @yes="toSaveIt(true)" @no="toSaveIt(false)"/>
    </main>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useUsersStore } from '~/stores/users';
    
    const usersStore = useUsersStore();
    const { users } = storeToRefs(usersStore);
    
    const user = ref({
        "customer_id": "",
        "server_name": "",
        "server_type": ""
    });

    let userIdx = ref(0);
    const suddenExit = ref(null);
    const editProcess = ref(false);
    const takeChangedData = ref(false);
        
    onMounted(() => {
        try {
            usersStore.restoreState();
        } catch (error) {
            console.error('Ошибка при запросе данных', error);
        }
    });
    
    const goEdit = (index) => {
        console.log(index);
        if (!editProcess.value){
            userIdx.value = index;
            user.value = Object.assign(user.value, users.value[index]);
            console.log(user.value, userIdx.value);
        } else { toClarify(index ? index : true); }
    };

    const toClarify = (savesIdx) => {
        suddenExit.value = savesIdx;
    }
    
    const saveUserData = (data, uidx) => {
        usersStore.editItem(uidx, data);
        usersStore.saveState();
        user.value = {
            "customer_id": "",
            "server_name": "",
            "server_type": ""
        };
        takeChangedData.value = false;
        editProcess.value = false;
        suddenExit.value = null;
        userIdx.value = 0;
    };

    const toSaveIt = (decision) => {
        if (decision) {
            takeChangedData.value = true;
        } else {
            takeChangedData.value = false;
            editProcess.value = false;
            goEdit(suddenExit.value === true ? 0 : suddenExit.value);
            suddenExit.value = null;
        }
    }
</script>

<style lang="scss">
    .main {
        display: flex;
        height: 100dvh;
        align-items: center;
        justify-content: space-between;

        @include media(760px){
            flex-direction: column-reverse;
            height: fit-content;
        }
    }
</style>