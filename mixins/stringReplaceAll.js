export default {
  methods: {
    stringReplaceAll(replacePattern, targetString) {
      for (let x in replacePattern) {
        targetString = targetString.replace(new RegExp(x, 'g'), replacePattern[x]);
      }

      return targetString;
    },
  },
};
