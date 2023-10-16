import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginImage from '../components/LoginImage';

function Login() {
    return (
        <main>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
                <div>
                    <LoginForm />
                </div>

                <div>
                    <LoginImage />
                </div>
            </div>
        </main>
    );
  }
  

export default Login