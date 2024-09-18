'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

import { GET_ALL_CARS, LOGIN_PAGE } from '@/app/utils/routes';
import { useAuth } from '@/app/utils/auth-context';

const initialForm = {
  id: '',
  image: '',
  brand: '',
  model: '',
  color: '',
  price: '',
  engineType: '',
  year: '',
  transmission: '',
  range: '',
};

const AddCar = () => {
  const [form, setForm] = useState(initialForm);

  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push(LOGIN_PAGE);
    return (
      <div className="flex justify-center items-center grow">Loading...</div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(GET_ALL_CARS, form);

      if (response.data) {
        setForm(initialForm);
        toast.success('Successfully added');
      }
    } catch (error) {
      toast.error('Failed to add car');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        className="block w-full p-2 border"
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={form.model}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
        className="block w-full p-2 border"
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        className="block w-full p-2 border"
        min={1950}
        max={2024}
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
        className="block w-full p-2 border"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="block w-full p-2 border"
        min={0}
        required
      />

      <div className="flex gap-4">
        <select
          value={form.engineType}
          onChange={(e) => setForm({ ...form, engineType: e.target.value })}
          className="p-2 border rounded"
          required
        >
          <option value="" disabled>
            Engine Type
          </option>
          <option value={'Gasoline'}>Gasoline</option>
          <option value={'Diesel'}>Diesel</option>
          <option value={'Electric'}>Electric</option>
        </select>
        {(form.engineType === 'Gasoline' || form.engineType === 'Diesel') && (
          <select
            value={form.transmission}
            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
            className="p-2 border rounded"
            required
          >
            <option value="" disabled>
              Transmission
            </option>
            <option value={'Manual'}>Manual</option>
            <option value={'Automatic'}>Automatic</option>
            <option value={'Robot'}>Robot</option>
          </select>
        )}
      </div>

      {form.engineType === 'Electric' && (
        <input
          type="number"
          placeholder="Range"
          value={form.range}
          onChange={(e) => setForm({ ...form, range: e.target.value })}
          className="block w-full p-2 border"
          min={0}
          required
        />
      )}
      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="block w-full p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Car
      </button>
    </form>
  );
};

export default AddCar;
