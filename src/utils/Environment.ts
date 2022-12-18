const development = {
    infuraAPIKey: '',
    transakAPIKey: '',
};
  
  const production = {
    ...development,
    transakAPIKey: '',
};
  
  export default process.env.NODE_ENV === 'production' ? production : development;