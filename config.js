import getConfig from 'next/config'; // So we can access configuration variables

const { publicRuntimeConfig } = getConfig();

// This way later it will be easy to access our api routes by just bringin API from this config file

export const REGISTER_REDIRECT_URL = publicRuntimeConfig.REGISTER_REDIRECT_URL;
export const FORGOT_PASSWORD_REDIRECT_URL = publicRuntimeConfig.FORGOT_PASSWORD_REDIRECT_URL;
export const API_URL = publicRuntimeConfig.API_URL;
