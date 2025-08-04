import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { formContext } from "../App.jsx";
import axios from "axios";

const CreateJob = () => {
  const { register, handleSubmit, reset } = useForm();
  const { open,setOpen } = useContext(formContext);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("API_BASE_URL:", API_BASE_URL);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios.post(`${API_BASE_URL}/api/jobs`, {
        ...data,
        status: "published",
      });
      alert("Job published!");
      setOpen(false);
      reset();
    } catch (err) {
      console.error("Error publishing job", err);
    }
  };

  const handleDraft = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/api/jobs`, {
        ...data,
        status: "draft",
      });
      alert("Job saved as draft!");
      reset();
    } catch (err) {
      console.error("Error saving draft", err);
    }
  };

  return open ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-50 form-container max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Job Opening
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Job Title</label>
          <input
            {...register("jobTitle")}
            placeholder="Job Title"
            type="text"
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Company</label>
          <input
            {...register("companyName")}
            placeholder="Company"
            type="text"
            className="border px-3 py-2 rounded"
          />
        </div>


        <div className="flex flex-col">
          <label className="font-medium mb-1">Location</label>
          <select {...register("location")} className="p-2 border rounded">
            <option value="">Select Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Job Type</label>
          <select {...register("jobType")} className="p-2 border rounded">
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-time</option>
            <option value="Part-Time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Salary Range (₹)</label>
          <div className="flex gap-2">
            <input
              {...register("salaryFrom")}
              placeholder={"\u2191\u2191 \u20B910000"}
              type="number"
              step={10000}
              min={10000}
              max={100000}
              className="w-1/2 border px-3 py-2 rounded"
            />
            <input
              {...register("salaryTo")}
              placeholder={"\u2193\u2193 \u20B91 100000"}
              type="number"
              step={10000}
              min={10000}
              max={100000}
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Application Deadline</label>
          <input
           placeholder=""
            {...register("applicationDeadline")}
            type="date"
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <label className="font-medium mb-1">Description</label>
        <textarea
          {...register("jobDescription")}
          rows="5"
          placeholder="Enter job description..."
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleSubmit(handleDraft)}
          className="px-4 py-2  bg-transpanrent border-black border-1 text-black rounded hover:bg-gray-600"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="px-4 py-2 w-36 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Publish 
        </button>
      </div>
    </form>
  ) : null;
};

export default CreateJob;
