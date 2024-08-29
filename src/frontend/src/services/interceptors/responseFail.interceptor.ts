const interceptor = (error: any) => {
  if (error.response && error.response.status === 401) {
    console.error('No authorized');
  }
  return Promise.reject(error);
};

export default interceptor;
