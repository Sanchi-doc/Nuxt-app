// import { defineStore } from 'pinia';
// import axios from 'axios';
//
// interface UserPayloadInterface {
//   username: string;
//   password: string;
//   email: string;
// }
//
// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     authenticated: false,
//     loading: false,
//     token: '',
//     user: {} as Partial<UserPayloadInterface>
//   }),
//   actions: {
//     async authenticateUser({ email, password }: { email: string; password: string }) {
//       try {
//         this.loading = true;
//         const response = await axios.post('/api/login', { email, password });
//         const { token, user } = response.data;
//
//         if (token) {
//           localStorage.setItem('token', token);
//           this.token = token;
//           this.user = user;
//           this.authenticated = true;
//           localStorage.setItem('currentUser', JSON.stringify(this.user));
//         }
//       } catch (error) {
//         console.error('Authentication failed:', error);
//         this.authenticated = false;
//       } finally {
//         this.loading = false;
//       }
//     },
//     async registerUser(userPayload: UserPayloadInterface) {
//       try {
//         this.loading = true;
//         const response = await axios.post('/api/register', userPayload);
//         const { token } = response.data;
//
//         if (token) {
//           localStorage.setItem('token', token);
//           this.token = token;
//           this.user = {
//             username: userPayload.username,
//             email: userPayload.email,
//            
//           };
//           this.authenticated = true;
//           localStorage.setItem('currentUser', JSON.stringify(this.user));
//         }
//       } catch (error) {
//         console.error('Registration failed:', error);
//         this.authenticated = false;
//       } finally {
//         this.loading = false;
//       }
//     },
//     logUserOut() {
//       this.user = {};
//       this.authenticated = false;
//       this.token = '';
//       localStorage.removeItem('token');
//       localStorage.removeItem('currentUser');
//     },
//     loadUserFromLocalStorage() {
//       const token = localStorage.getItem('token');
//       const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//
//       if (token && currentUser.email) {
//         this.token = token;
//         this.user = currentUser;
//         this.authenticated = true;
//       }
//     }
//   }
// });
