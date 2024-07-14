import axiosInstance from './axios';

const getShort = async () => await axiosInstance.get('/data-endpoint');

const createShort = async () => await axiosInstance.get('/data-endpoint');

const updateShort = async () => await axiosInstance.get('/data-endpoint');

const activateShort = async () => await axiosInstance.get('/data-endpoint');

const deleteShort = async () => await axiosInstance.get('/data-endpoint');

export default {
  getShort,
  createShort,
  updateShort,
  deleteShort,
  activateShort,
};
