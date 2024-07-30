const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_PROD_BACKEND_URL;
  // return process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
};

export default getBackendUrl;