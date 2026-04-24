import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Decorator = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleBeDecorator = (data) => {
      const applicationData = {
      name: user?.displayName,
      email: user?.email,
      phone: data.phone,
      experience: data.experience,
      portfolio: data.portfolio,
      about: data.about,
    };
    axiosSecure.post("/decorators", applicationData).then((res) => {
      if (res.data.insertedId) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/')
      }
    });
  };

  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Apply as Decorator
      </h2>

      <form onSubmit={handleSubmit(handleBeDecorator)} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          defaultValue={user?.displayName}
          className="input input-bordered w-full"
        />

        {/* Email */}
        <input
          type="email"
          
          value={user?.email}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Phone */}
        <input
          type="text"
          {...register("phone", { required: true })}
          placeholder="Phone Number"
          className="input input-bordered w-full"
        />

        {/* Experience */}
        <input
          type="number"
          {...register("experience", { required: true })}
          placeholder="Years of Experience"
          className="input input-bordered w-full"
        />

        {/* Portfolio */}
        <input
          type="text"
          {...register("portfolio")}
          placeholder="Portfolio Link (optional)"
          className="input input-bordered w-full"
        />

        {/* About */}
        <textarea
          {...register("about", { required: true })}
          placeholder="Tell us about yourself"
          className="textarea textarea-bordered w-full"
          rows="4"
        ></textarea>

        {/* Submit */}
        <button className="btn btn-primary w-full">Submit Application</button>
      </form>
    </div>
  );
};

export default Decorator;
