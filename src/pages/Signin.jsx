
import React, { useState } from 'react';
import trees from '../assets/logo.png';
import supabase from '../../supaBase';
import { useNavigate } from 'react-router-dom';

const Signin = ({setUser}) => {
  const [name, setName] = useState('');
  const [aadhar, setAadharNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const { data, error } = await supabase.from('election').insert([
        { name, aadhar }
      ]);
      
      if (error) {
        throw error;
      }

      console.log('User data inserted:', data);
      // Optionally, you can navigate to another page after successful insertion
    } catch (error) {
      console.error('Error inserting user data:', error.message);
    }

    setUser({ name, aadhar });
    navigate('/profile');
  };

  return (
    <div className='flex items-center justify-center h-screen -mt-16 md:-mt-24 lg:-mt-32'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px] h-[400px] shadow-lg shadow-gray-600'>
        <div className='hidden md:block'>
          <img className='w-full mt-40 mb-20 object-cover animate-spin-horizontal ' src={trees} alt="/" />
        </div>
        <div className='p-4 flex flex-col justify-center items-center md:items-start'>
          <form className='w-full' onSubmit={handleSubmit}>
            <h2 className='text-4xl font-bold text-center mb-8'>VOTE.</h2>
            <div className='w-full'>
              <input
                className='border p-2 mb-4 w-full'
                type="text"
                placeholder='NAME'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className='border p-2 mb-4 w-full'
                type="text"
                placeholder='AADHAR NUMBER'
                value={aadhar}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>
            <button className='w-full py-2 bg-orange-700 hover:bg-orange-800'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;

