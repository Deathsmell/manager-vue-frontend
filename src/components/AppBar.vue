<template>
    <div>
        <v-app-bar
                color="deep-purple accent-4"
                dense
                dark
        >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>Manager</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon
                                @click="logout()"
                                v-if="auth()"
                                color="white"
                        >mdi-exit-to-app
                        </v-icon>
                        <v-icon
                                @click="logout()"
                                v-if="!auth()"
                                color="white"
                        >mdi-login
                        </v-icon>
                    </v-btn>
                </template>
                <span
                        v-if="!auth()"
                >Login</span>
                <span
                        v-if="auth()"
                >Logout</span>
            </v-tooltip>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-img v-if="false" src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                    <v-icon large color="black">mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{getUserInfo()}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                    nav
                    dense
            >
                <v-list-item-group
                        v-model="group"
                        active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item href="/">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item href="/">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>

                    <v-list-item
                            @click="logout"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Exit</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        name: "AppBar",
        data() {
            return {
                group: [],
                drawer: false,
            }
        },
        created() {
            console.log(this.$store.getters.isAuthenticated);
            console.log(this.$store.state.token);
        },
        methods: {
            getUserInfo() {
                let username = this.$store.getters.getUsername;
                if (username) {
                    return username
                } else {
                    return 'Гость'
                }
            },

            auth() {
                let authenticated = this.$store.getters.isAuthenticated;
                if (authenticated != null) {
                    return authenticated
                } else {
                    return false
                }
            },
            home() {
                this.$router.push('/')
            },
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/login')
            },

        }
    }
</script>

<style scoped>

</style>