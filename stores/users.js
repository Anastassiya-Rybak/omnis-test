import JSON from '~/server/bd.json'
export const useUsersStore = defineStore ("users", {
    state: () => ({
        users: [],
    }),

    actions: {
        editItem(index, newData){
            this.users[index] = newData;
        },

        saveState () {
            localStorage.setItem('usersDataState', JSON.stringify(this.$state))
        },

        async restoreState() {
            const savedState = localStorage.getItem('usersDataState');
            this.users = JSON.users;
            if (savedState) {
              this.$patch(JSON.parse(savedState))
            }
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}