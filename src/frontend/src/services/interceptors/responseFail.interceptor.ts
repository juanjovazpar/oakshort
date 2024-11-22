const interceptor = (error: any) => {
  if (error && error.response && error.response.status === 401) {
    console.error('No authorized');
  }

  console.log('Intercepted error:', error);

  return Promise.reject(error?.response?.data);
};

export default interceptor;
