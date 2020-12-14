import ApiService from './api';

export default class UserService extends ApiService {
  getContactForm() {
    return this.axios.$get(`/contact`);
  }
  submitContactForm(data) {
    return this.axios.$post(`/contact`, data);
  }
  getUserData(token) {
    return this.axios.$get(`/auth/client/personal`, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWYxMTE4ZTgwMDI0ZTRlMjQxNDViMmVmODQ1Y2FkMjlhZjQ2N2UzMjE5ZDg0ZGQzN2E2NTRjZTY1NDRkZDFkNzIzYjkzZWFlNzIzZDIzM2YiLCJpYXQiOjE2MDc1OTE0NjMsIm5iZiI6MTYwNzU5MTQ2MywiZXhwIjoxNjM5MTI3NDYzLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.WL_QUkHKTYgSxYLBfWVu5fFLrj1No6Sa_1uiI86AhpJEqySQkuyVaUVNZ3xPgk3iakacB2wHkOf3lGYk1Otb80_X8sqdKJr9QwSViWeouTpoh_32KOhBFm8hcZZutIkPd8DN0dpOqQWGzs7hNbefGtSZpta4-tRAJbMrpTudMiuvNODVLBJuDSghXsNbY-HO1qvmwio7HXx6jqY0Y1v5-RwAV2iQL0owHMnQ1PsUMYFERy55pK__zg79iOVKbUvEXlKGIxD79v55IuLtZo43ElWBTC-IQ1cxX4FDkFqW0YY8EwIsVBq1K7pRFxt6p4NZMlSf7oI1KvKbNNHdCU4LejsiIEVRWGEZBwRwURg7AnWlQdQhjUsyvLBPiR_Vyf7eRgwK4Nyh1uvshH1kNiWm6n_4lUgbKLW5Xm_Y9qapJGlTOltiiQiBoNaP4jrrJpEK7RStSQFu4a21zrnqFfSlauAQHMrf1p4wkPmWtMDJCecjvFnuUWc6KlMVtSyRYNVt34uxfkocm7sUNQ7V0i_feTKndfQ_mPMwhRu9qAF9MLwvMlH7MUy4n_7rYSqB4PP4KgS4V4j1dxssNOEeaIu2Ry4BOTWKaiz_GbNj6ddBA1422U3KeOYUt2Nn_tlsW210FY_9BcAUVKXWekxsgJS09_bjWrNJx8W_-IOsZ1QORwM`,
      },
    });
  }
  saveUserData(data, token) {
    return this.axios.$put(`/auth/client/change`, data, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWYxMTE4ZTgwMDI0ZTRlMjQxNDViMmVmODQ1Y2FkMjlhZjQ2N2UzMjE5ZDg0ZGQzN2E2NTRjZTY1NDRkZDFkNzIzYjkzZWFlNzIzZDIzM2YiLCJpYXQiOjE2MDc1OTE0NjMsIm5iZiI6MTYwNzU5MTQ2MywiZXhwIjoxNjM5MTI3NDYzLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.WL_QUkHKTYgSxYLBfWVu5fFLrj1No6Sa_1uiI86AhpJEqySQkuyVaUVNZ3xPgk3iakacB2wHkOf3lGYk1Otb80_X8sqdKJr9QwSViWeouTpoh_32KOhBFm8hcZZutIkPd8DN0dpOqQWGzs7hNbefGtSZpta4-tRAJbMrpTudMiuvNODVLBJuDSghXsNbY-HO1qvmwio7HXx6jqY0Y1v5-RwAV2iQL0owHMnQ1PsUMYFERy55pK__zg79iOVKbUvEXlKGIxD79v55IuLtZo43ElWBTC-IQ1cxX4FDkFqW0YY8EwIsVBq1K7pRFxt6p4NZMlSf7oI1KvKbNNHdCU4LejsiIEVRWGEZBwRwURg7AnWlQdQhjUsyvLBPiR_Vyf7eRgwK4Nyh1uvshH1kNiWm6n_4lUgbKLW5Xm_Y9qapJGlTOltiiQiBoNaP4jrrJpEK7RStSQFu4a21zrnqFfSlauAQHMrf1p4wkPmWtMDJCecjvFnuUWc6KlMVtSyRYNVt34uxfkocm7sUNQ7V0i_feTKndfQ_mPMwhRu9qAF9MLwvMlH7MUy4n_7rYSqB4PP4KgS4V4j1dxssNOEeaIu2Ry4BOTWKaiz_GbNj6ddBA1422U3KeOYUt2Nn_tlsW210FY_9BcAUVKXWekxsgJS09_bjWrNJx8W_-IOsZ1QORwM`,
      },
    });
  }
  ChangeUserPassword(data, token) {
    return this.axios.$put(`/auth/client/changePassword`, data, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWYxMTE4ZTgwMDI0ZTRlMjQxNDViMmVmODQ1Y2FkMjlhZjQ2N2UzMjE5ZDg0ZGQzN2E2NTRjZTY1NDRkZDFkNzIzYjkzZWFlNzIzZDIzM2YiLCJpYXQiOjE2MDc1OTE0NjMsIm5iZiI6MTYwNzU5MTQ2MywiZXhwIjoxNjM5MTI3NDYzLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.WL_QUkHKTYgSxYLBfWVu5fFLrj1No6Sa_1uiI86AhpJEqySQkuyVaUVNZ3xPgk3iakacB2wHkOf3lGYk1Otb80_X8sqdKJr9QwSViWeouTpoh_32KOhBFm8hcZZutIkPd8DN0dpOqQWGzs7hNbefGtSZpta4-tRAJbMrpTudMiuvNODVLBJuDSghXsNbY-HO1qvmwio7HXx6jqY0Y1v5-RwAV2iQL0owHMnQ1PsUMYFERy55pK__zg79iOVKbUvEXlKGIxD79v55IuLtZo43ElWBTC-IQ1cxX4FDkFqW0YY8EwIsVBq1K7pRFxt6p4NZMlSf7oI1KvKbNNHdCU4LejsiIEVRWGEZBwRwURg7AnWlQdQhjUsyvLBPiR_Vyf7eRgwK4Nyh1uvshH1kNiWm6n_4lUgbKLW5Xm_Y9qapJGlTOltiiQiBoNaP4jrrJpEK7RStSQFu4a21zrnqFfSlauAQHMrf1p4wkPmWtMDJCecjvFnuUWc6KlMVtSyRYNVt34uxfkocm7sUNQ7V0i_feTKndfQ_mPMwhRu9qAF9MLwvMlH7MUy4n_7rYSqB4PP4KgS4V4j1dxssNOEeaIu2Ry4BOTWKaiz_GbNj6ddBA1422U3KeOYUt2Nn_tlsW210FY_9BcAUVKXWekxsgJS09_bjWrNJx8W_-IOsZ1QORwM`,
      },
    });
  }
  getCities(params) {
    return this.axios.$get(`/filters/cities`, { params });
  }
  getAboutUsInfo() {
    return this.axios.$get(`/about`);
  }
}
