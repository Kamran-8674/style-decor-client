import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
    const {register,handleSubmit, formState:{errors}}=useForm()
    const {registerUser,updateUserProfile}=useAuth()
    const navigate = useNavigate()


    const handleRegister= (data) =>{
        console.log(data)
        const profileImage = data.photo[0]

        registerUser(data.email,data.password)
        .then(res=>{
          console.log(res)
          // store image and get the url
          const formData = new FormData()

          formData.append('image', profileImage)

          const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

        axios.post(image_api_url, formData)
        .then(res=>{
          console.log('after image upload', res)

          const userProfile = {
            displayName : data.name,
            photoURL: res.data.data.url
          }
          updateUserProfile(userProfile)
          .then(()=>{
            console.log('user profile update done')
            navigate ('/')
          })
          .catch(err=>{
            console.log(err)
          })

        })


        })
        .catch(err=>{
          console.log(err)
        })


    }

  return (
    <div className="w-4xl mx-auto ">
      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input"
          {...register('name', {required:true})}
          placeholder="Your Name" />
          {errors.name?.type==='required' && <p className="text-red-400">Name is required</p>}

          <label className="label">Photo</label>
          <input type="file" className="file-input"
          {...register('photo', {required:true})}
          placeholder="Your Photo" />
          {errors.photo?.type==='required' && <p className="text-red-400"> is required</p>}


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
          <button className="btn w-[38%] btn-neutral mt-4">Register</button>
        </fieldset>
        <p>Already have an account <Link to={'/login'} className="text-blue-400 underline">Login</Link> </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
