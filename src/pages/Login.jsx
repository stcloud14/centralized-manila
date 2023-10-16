import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
    return (
        <main>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 ms-4 mt-4 me-4 gap-4'>
            <div className="col-span-2">
                <LoginForm />
            </div>

            <div className="col-span-1">
                <Card02 />
            </div>
            
        
            </div>
        </main>
    );
  }
  

export default Login