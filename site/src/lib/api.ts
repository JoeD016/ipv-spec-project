import axios from 'axios';

import { IInputData } from '@/context/analysis';

const client = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const uploadFile = async ({
  networkActivityCSV,
  macAddressCSV,
}: IInputData) => {
  if (!networkActivityCSV || !macAddressCSV) {
    return;
  }
  const formData = new FormData();
  const macAddressCSVAsFile = new Blob([macAddressCSV], { type: 'text/csv' });
  formData.append('networkActivityCSV', networkActivityCSV);
  formData.append('macAddressCSV', macAddressCSVAsFile);
  const result = await client.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result;
};
