module.exports = {
  bail: true, // se um teste falhar ele para a execução
  coverageProvide: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js", // ignora outros arquivos e faz a leitura de somente estes
  ],
};
