import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    user: {}
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const foundUser = users.find(u => u.email === email && u.password === password)
        if (foundUser) {
          this.user = { email: foundUser.email }
          localStorage.setItem('currentUser', JSON.stringify(this.user))
          this.authenticated = true;
        }

      // const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: {
      //     username,
      //     password,
      //   },
      // });
      // this.loading = pending;

      // if (data.value) {
      //   const token = useCookie('token');
      //   token.value = data?.value?.token;
      //   this.authenticated = true;
      // }
    },
    async registerUser({ username, password, email, phone }: UserPayloadInterface) {

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.find(u => u.email === email)) {
        return false // User already exists
      }
      users.push({ username,email, password, phone })
      localStorage.setItem('users', JSON.stringify(users))
      this.authenticated = true;
      return true

      // const { data, pending }: any = await useFetch('https://dummyjson.com/auth/register', {
      //   method: 'post',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: {
      //     username,
      //     password,
      //     email,
      //     phone,
      //   },
      // });
      // this.loading = pending;
      //
      // console.log('data', data);
      // if (data.value) {
      //   const token = useCookie('token');
      //   token.value = data?.value?.token;
      //   this.authenticated = true;
      // }
    },
    logUserOut() {
      this.user = {}
      this.authenticated = false
      localStorage.removeItem('currentUser')
      // const token = useCookie('token');
      // this.authenticated = false;
      // token.value = null;
    },
  },
});