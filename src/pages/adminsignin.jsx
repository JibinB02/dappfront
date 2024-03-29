import React, { useState } from 'react';
import trees from '../assets/logo.png';
import supabase from '../../supaBase';
import { useNavigate } from 'react-router-dom';

const AdminSignin = ({ setAdmin }) => {
    const [admin, setAdminName] = useState('');
    const [adminpass, setAdminID] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
          // Check if admin already exists in the database
          const { data: existingAdmin, error: existingAdminError } = await supabase
              .from('admin')
              .select()
              .single();
  
          if (existingAdminError) {
            const { data: newAdmin } = await supabase.from('admin').insert([
              { admin, adminpass}
          ]);
          setAdmin({ admin, adminpass });
          navigate("/admin");
          console.log('Admin data inserted:', adminpass);
          
      }
  
          // If admin exists and provided admin name and ID match
          if (existingAdmin) {
            if (existingAdmin && existingAdmin.admin == admin && existingAdmin.adminpass == adminpass) {
              console.log('existing admin',existingAdmin.admin)
              console.log("admin",admin)
              setAdmin({ admin, adminpass });
              // Redirect to the admin page
              navigate('/admin');
              return;
          }
          
          // If admin exists but provided admin name and ID do not match
         
            else if (existingAdmin && (existingAdmin.admin == admin && existingAdmin.adminpass != adminpass || existingAdmin.admin != admin && existingAdmin.adminpass == adminpass)) {
              
              setError('An admin already exists');
              return;
            }
          
        } 
          
      } catch (error) {
          console.error('Error inserting admin data:', error.message);
      }
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
                                placeholder='Admin Name'
                                value={admin}
                                onChange={(e) => setAdminName(e.target.value)}
                            />
                            <input
                                className='border p-2 mb-4 w-full'
                                type="password"
                                placeholder='Admin Password'
                                value={adminpass}
                                onChange={(e) => setAdminID(e.target.value)}
                            />
                        </div>
                        <button className='w-full py-2 bg-orange-700 hover:bg-orange-800'>Sign In</button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminSignin;
