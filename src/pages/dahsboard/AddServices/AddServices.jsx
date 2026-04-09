import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddServices = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const handleAddService = (data) => {
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)

        axiosSecure.post('/services', data)
        .then(res=>{
            console.log('after adding',res.data)
        })
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
    });
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Service</h2>

      <form onSubmit={handleSubmit(handleAddService)} className="space-y-4">
        {/* Service Name */}
        <div>
          <label className="label">Service Name</label>
          <input
            type="text"
            {...register("service_name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.service_name && <p className="text-red-500">Required</p>}
        </div>

        {/* Cost */}
        <div>
          <label className="label">Cost (BDT)</label>
          <input
            type="number"
            {...register("cost", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.cost && <p className="text-red-500">Required</p>}
        </div>

        {/* Unit */}
        <div>
          <label className="label">Unit</label>
          <input
            type="text"
            {...register("unit")}
            placeholder="per event / per room"
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="wedding">Wedding</option>
            <option value="home">Home</option>
            <option value="office">Office</option>
            <option value="seminar">Seminar</option>
          </select>
          {errors.category && <p className="text-red-500">Required</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.image && <p className="text-red-500">Required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
          {errors.description && <p className="text-red-500">Required</p>}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full">Add Service</button>
      </form>
    </div>
  );
};

export default AddServices;
