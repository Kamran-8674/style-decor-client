import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    
  <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">

    <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl">

      {/* Header */}
      <div className="text-center pt-8">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-2">
          Login to continue using StyleDecor
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="card-body"
      >
        <fieldset className="fieldset space-y-2">

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

         

          {/* Button */}
          <button className="btn btn-primary w-full mt-4">
            Login
          </button>

        </fieldset>

        {/* Register */}
        <p className="text-center mt-4 text-sm">
          Do not have an account?{" "}
          <Link
            to={"/register"}
            className="text-primary font-medium underline"
          >
            Register
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

export default Login;
