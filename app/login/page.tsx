'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

import { HOME, LOGIN } from '@/app/utils/routes';
import { useAuth } from '@/app/utils/auth-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN, { email, password });
      toast.success(response.data.message);
      setEmail('');
      setPassword('');
      login(JSON.stringify(response.data.user));
      router.push(HOME);
    } catch (error) {
      toast.error('Invalid credentials');
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          className="p-2 rounded"
          placeholder="Type your email here"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          className="p-2 rounded"
          placeholder="Type your password here"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
