export const useUsersStore = defineStore ("users", {
    state: () => ({
        users: []
    }),

    actions: {
        editItem(index, newData){
            this.users[index] = newData;
        },

        saveState () {
            localStorage.setItem('usersState', JSON.stringify(this.$state))
        },

        async restoreState() {
            const savedState = localStorage.getItem('usersState');
            this.users = await $fetch('/api/bd');
            if (savedState) {
              this.$patch(JSON.parse(savedState))
            }
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}