import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const USER_URL = '/api/users';
const USER_LOGIN_URL = '/api/users/login';

export const authService = {
  register: async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(USER_URL, payload);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  login: async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(USER_LOGIN_URL, payload);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  logout: () => localStorage.removeItem('user'),
};


