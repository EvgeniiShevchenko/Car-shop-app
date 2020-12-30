export default {
  methods: {
    getAuthToken() {
      return localStorage.getItem('token');
    },
  },
};
