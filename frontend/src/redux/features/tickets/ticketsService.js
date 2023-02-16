import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const TICKETS_URL = '/api/tickets';

export const ticketsService = {
  create: async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.post(TICKETS_URL, payload, {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      });
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  fetchAll: async (_, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(TICKETS_URL, {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      });
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  fetchSingle: async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(`${TICKETS_URL}/${payload}`, {
        headers: { Authorization: `Bearer ${getState().auth.user.token}` },
      });
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  close: async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.put(
        `${TICKETS_URL}/${payload}`,
        { status: 'closed' },
        {
          headers: { Authorization: `Bearer ${getState().auth.user.token}` },
        });
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
};


