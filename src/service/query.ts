import request from '@/utils/request';

export const getBotResponse = async (message: string) => {
  const { data } = await request.post('/query', { question: message });
  return data;
};
