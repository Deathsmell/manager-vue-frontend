<template>
    <v-card
            :loading="login"
            width="500"
            class="ma-auto"
            elevation="18"
    >
        <v-card-title class="d-flex justify-center">
            <h2 class="mt-2">Вход</h2>
        </v-card-title>
        <v-form
                ref="form"
                class=" ma-5"
        >
            <v-text-field
                    v-model="username"
                    :counter="24"
                    label="Username"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Normal with hint text"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
            ></v-text-field>

            <v-card-actions>
                <v-btn
                        color="success"
                        class="mr-4"
                        :disabled="login"
                        @click="signin(username,password)"
                >
                    Войти
                </v-btn>
                <v-btn
                        color="lime lighten-3"
                        class="mr-4"
                        @click="registration(username,password)"
                >
                    Регистрация
                </v-btn>
            </v-card-actions>
        </v-form>
        <v-snackbar
                v-model="snackbar"
        >
            {{ text }}
            <v-btn
                    color="red"
                    text
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
    export default {
        name: "Auth",


        data() {
            return {

                show1: false,
                login: false,
                password: '',
                username: '',
                text: 'ERROR',
                snackbar: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },

            }
        },
        methods: {
            registration(username, password) {
                this.login = true
                this.$axios.post("http://localhost:8080/signup", {
                    username: username,
                    password: password,
                }).then(res => {
                    this.text = `${res.response.status} ${res.response.body}`
                    this.login = false
                }).catch(error => {
                    setTimeout(() => this.login = false, 1000)
                    this.text = `${error.response.status} ${error.response.data.message}`
                    this.snackbar = true
                })
            },
            signin(username, password) {
                this.login = true
                this.$axios.post("http://localhost:8080/signin", {
                    username: username,
                    password: password,
                }).then(res => {
                    this.$store.dispatch('login', {'token': res.data.token, 'username': res.data.username});
                    this.$router.push('/')
                }).catch(error => {
                    console.log(error.response);
                    if (error.response.status >= 400) {
                        setTimeout(() => this.login = false, 1000)
                        this.text = `${error.response.status} ${error.response.data.message}`
                        this.snackbar = true
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>