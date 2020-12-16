export default {
  methods: {
    formatPhoneNumber(phoneNumber) {
      const replacer = (match, p1, p2, p3, p4, offset, string) => {
        if (p4) {
          return `+${p1} (${p2}) ${p3}-${p4}`;
        } else if (p3) {
          return `+${p1} (${p2}) ${p3}`;
        } else if (p2) {
          return `+${p1} (${p2})`;
        } else if (p1) {
          return p1 === '+3' ? p1 : p1.length === 2 ? `+${p1}` : `+3${p1}`;
        }
      };

      return String(phoneNumber)
        .replace(/[^\d]+/g, '')
        .replace(/(\d{1,2})((?<=\d{1,2})\d{1,3})?((?<=\d{4,5})\d{1,3})?((?<=\d{7,8})\d{1,4})?/g, replacer);
    },
  },
};
