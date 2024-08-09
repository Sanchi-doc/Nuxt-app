import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
  email: string;
  username: string;
  exp: number; // время истечения срока действия токена
  // добавьте другие поля, если они присутствуют в токене
}

export default defineNuxtRouteMiddleware((to: { name: string; }) => {
  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(authStore);
  const token = useCookie('token').value; // get token from cookies

  if (token) {
    try {
      // Decode and validate token
      const decodedToken = jwtDecode<DecodedToken>(token);

      // Optionally, you can add expiration time check here
      if (Date.now() >= decodedToken.exp * 1000) {
        throw new Error('Token expired');
      }

      // If the token is valid, update the authenticated state
      authenticated.value = true;
      authStore.user = decodedToken; // update the user state with decoded token data
    } catch (error) {
      console.error('Invalid or expired token:', error);
      authenticated.value = false;
      // Clear the invalid token from cookies
      useCookie('token').value = null;
    }
  }

  // Redirect to homepage if already authenticated and trying to access login
  if (authenticated.value && to?.name === 'login') {
    return navigateTo('/');
  }

  // Redirect to login if not authenticated and trying to access a protected route
  if (!authenticated.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
});
