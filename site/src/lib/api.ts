import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await client.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res;
};
