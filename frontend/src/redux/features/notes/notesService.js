import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000';

const TICKETS_URL = '/api/tickets';

export const notesService = {
  fetchAll: async (payload, { rejectWithValue, getState }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const { data } = await axios.get(`${TICKETS_URL}/${payload}/notes`, config);
      console.log(data);
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
  create: async (payload, { rejectWithValue, getState }) => {
    console.log(payload);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };
      const { data } = await axios.post(`${TICKETS_URL}/${payload.id}/notes`,{
        text: payload.noteText
      }, config);
      return data;
    } catch (e) {
      const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
      return rejectWithValue(message);
    }
  },
};


