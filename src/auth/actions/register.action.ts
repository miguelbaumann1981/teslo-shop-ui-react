import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Error in registration');
  }
};
