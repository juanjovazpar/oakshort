import shortService from '../services/shorts.service';

export const shortsLoader = async () => {
  const response = await shortService.getShorts();
  console.log(response);

  return [];
};
