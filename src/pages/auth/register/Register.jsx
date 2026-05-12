import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
    const {register,handleSubmit, formState:{errors}}=useForm()
    const {registerUser,updateUserProfile}=useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()


    const handleRegister= (data) =>{
        // console.log(data)
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
          const photoURL = res.data.data.url

          const userInfo = {
            email : data.email,
            displayName : data.name,
            photoURL: photoURL

          }
        
          axiosSecure.post('/users',userInfo)
          .then(res =>{
            if(res.data.insertedId){
              console.log('user created in data base')
            }
          })
          
          const userProfile = {
            displayName : data.name,
            photoURL: photoURL
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
     <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">

    <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl">

      {/* Header */}
      <div className="text-center pt-8">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="text-gray-500 mt-2">
          Join StyleDecor today
        </p>
      </div>

      {/* Form */}
      <form
        className="card-body"
        onSubmit={handleSubmit(handleRegister)}
      >
        <fieldset className="fieldset space-y-2">

          {/* Name */}
          <div>
            <label className="label font-medium">
              Name
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
              placeholder="Your Name"
            />

            {errors.name?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">
                Name is required
              </p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label font-medium">
              Photo
            </label>

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("photo", { required: true })}
            />

            {errors.photo?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">
                Photo is required
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label font-medium">
              Email
            </label>

            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
              placeholder="Email"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">
                Email is required
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium">
              Password
            </label>

            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">
                Password is required
              </p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">
                Must be at least 6 characters
              </p>
            )}
          </div>

          {/* Forgot */}
          {/* <div className="text-right">
            <a className="text-sm link link-hover text-primary">
              Forgot password?
            </a>
          </div> */}

          {/* Button */}
          <button className="btn btn-primary w-full mt-4">
            Register
          </button>

        </fieldset>

        {/* Login */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-primary font-medium underline"
          >
            Login
          </Link>
        </p>
      </form>

      {/* Divider */}
      <div className="divider px-6">
        OR
      </div>

      {/* Social Login */}
      <div className="pb-8 px-6">
        <SocialLogin />
      </div>

    </div>
  </div>
  );
};

export default Register;
