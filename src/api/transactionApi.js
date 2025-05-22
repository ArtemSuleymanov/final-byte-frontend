import axiosInstance from './axios';

export const getTransactions = () => {
  return axiosInstance.get('/transactions');
};

export const addTransaction = (transactionData) => {
  return axiosInstance.post('/transactions', transactionData);
};

export const deleteTransaction = (transactionId) => {
  return axiosInstance.delete(`/transactions/${transactionId}`);
};
