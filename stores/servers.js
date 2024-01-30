export const useServersStore = defineStore ("servers", {
    state: () => ({
        servers: []
    }),

    actions: {
        getServers(){
            return this.servers;
        },
        addItem(newServer){
            this.servers.push(newServer);
        },

        saveState () {
            localStorage.setItem('serversTypeState', JSON.stringify(this.$state))
        },

        updateServers (users) {
            users.forEach(item => {
                const itemServerType = item.server_type;
                if (!this.servers.some( el => el === itemServerType )) this.addItem(itemServerType);
            });
        },    

        async restoreState() {
            const savedState = localStorage.getItem('serversTypeState');
            if (savedState) {
              this.$patch(JSON.parse(savedState))
            } else {
                const users = await $fetch('/api/bd');
                this.updateServers(users);
            }
        },
    }
})