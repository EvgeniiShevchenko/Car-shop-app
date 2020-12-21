import Vue from 'vue';
import VueSocialauth from 'vue-social-auth';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: process.env.SOCIAL_AUTH_ID,
      redirectUri: process.env.SOCIAL_AUTH_REDIRECT_URI, // Your client app URL
    },
  },
});
