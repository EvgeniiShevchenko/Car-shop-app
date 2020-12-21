import isEmail from 'validator/lib/isEmail';

export default {
  methods: {
    validationRegistrationFields(checkCollection) {
      for (let item in checkCollection) {
        if (this.isEmpty(checkCollection[item])) {
          if (!this.error.status) {
            this.error.message = 'Ошибка поля. Поле должно быть заполненным';
            this.error.type = 'empty';
            this.error.status = true;
          }

          this.error.locations.add(item);
        }
      }

      if (this.error.type !== 'empty' && !isEmail(this.email)) {
        this.error.message = 'Ошибка поля. Емейл должен быть верным';
        this.error.status = true;
        this.error.type = 'email';
        this.error.locations.add('email');
      }

      if (this.error.type !== 'empty' && this.password !== this.confirmation && this.isContinue) {
        this.error.message = 'Пароль не совпадает';
        this.error.status = true;
        this.error.type = 'confirmation';
        this.error.locations.add('password_confirmation');
      }

      if (!!this.error.locations.size) {
        this.error.locations = new Set(this.error.locations);
        return false;
      }

      this.error = { ...this.error, status: false, message: '', type: '' };
      return true;
    },
  },
};
