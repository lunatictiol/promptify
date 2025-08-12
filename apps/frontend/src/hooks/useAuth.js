// src/hooks/useAuth.js
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth/login';
import { register } from '../api/auth/register';


export const useRegister = (options = {}) => {
  return useMutation({
    mutationFn: register,
    ...options, 
  });
};

export const useLogin = (options = {}) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};
