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
    user: {} as Partial<UserPayloadInterface>
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
      if (foundUser) {
        this.user = { email: foundUser.email, username: foundUser.username, phone: foundUser.phone };
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.authenticated = true;
      }
    },
    async registerUser({ username, password, email, phone }: UserPayloadInterface) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: { email: string }) => u.email === email)) {
        return false; // User already exists
      }
      users.push({ username, email, password, phone });
      localStorage.setItem('users', JSON.stringify(users));
      this.user = { username, email, phone };
      this.authenticated = true;
      return true;
    },
    logUserOut() {
      this.user = {};
      this.authenticated = false;
      localStorage.removeItem('currentUser');
    },
    loadUserFromLocalStorage() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (currentUser.email) {
        this.user = currentUser;
        this.authenticated = true;
      }
    }
  },
});
