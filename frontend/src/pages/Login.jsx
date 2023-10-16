import React from 'react';
 
function Login() {
  return (
    <div className='bg-white'>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 items-center">
        <div className="md:w-1/3 max-w-sm mx-16">
            <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image" />
        </div>

        <div className="md:w-1/3 max-w-sm">
            <form>
                <h1 className='text-center mb-7 text-black'>Login</h1>
                <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Mobile Number" />
                <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Remember Me</span>
                    </label>
                    <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
                </div>

                <div className="text-center md:text-left">
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
                </div>
            </form>
            

            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Don't have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="../register">Register</a>
            </div>
        </div>
        </section>
    </div>
    
  );
}
 
export default Login;