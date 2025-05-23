// TODO: Use the function from the shared utils folder and remove this one
export const isValidURL = (url: string): boolean => {
  const urlPattern =
    /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])∫*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
  return urlPattern.test(url);
};
