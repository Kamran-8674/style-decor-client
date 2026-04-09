import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../socialLogin/SocialLogin';

const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const {signInUser}=useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (data)=>{
        console.log(data)
        signInUser(data.email,data.password)
        .then(res=>{
            console.log(res.user)
            navigate(location.state || '/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="w-4xl mx-auto">
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input"
          {...register('email', {required:true})}
          placeholder="Email" />
          {errors.email?.type==='required' && <p className="text-red-400">email is required</p>}
          <label className="label">Password</label>
          <input type="password" className="input"
          {...register('password',{required:true, minLength:6})}
          placeholder="Password" />
          {errors.password?.type==='required' && <p className="text-red-400">password is required</p>}
          {errors.password?.type==='minLength' && <p className="text-red-400">must be above 6</p>}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn w-[38%] btn-neutral mt-4">Login</button>
        </fieldset>
          <p>Do not have an account <Link to={'/register'} className="text-blue-400 underline">Register</Link> </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
    );
};

export default Login;