const common = {
    INFURA_API_KEY: '',
    TRANSAK_API_KEY: process.env.REACT_APP_TRANSAK_API_KEY || '',
};

const development = {
    ...common,
    HOST_URL: 'http://localhost:3000',
};

const production = {
    ...common,
    HOST_URL: 'https://wallet.atila.ca',
};
  
  export const Environment = process.env.NODE_ENV === 'production' ? production : development;