import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Form = ({ setIsEditing }) => {
  const [data, setData] = useState({
    Name: "",
    Phone_Number: "",
    Email: "",
    Hobbies: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("https://hobbie.onrender.com/table/add", data);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["table"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    mutation.mutate(data);
    console.log("submitted");
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto my-4 px-4 py-8 bg-slate-900 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Details</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-white-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Name: e.target.value })}
          />
        </div>
        <div>
          <label
            htmlFor="phonenumber"
            className="block text-white-700 font-semibold mb-2"
          >
            Phone Number
          </label>
          <input
            required
            type="tel"
            name="phonenumber"
            id="phonenumber"
            placeholder="Phone Number"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Phone_Number: e.target.value })}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-white-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Email: e.target.value })}
          />
        </div>
        <div>
          <label
            htmlFor="hobbies"
            className="block text-white-700 font-semibold mb-2"
          >
            Hobbies
          </label>
          <input
            required
            type="text"
            name="hobbies"
            id="hobbies"
            placeholder="Hobbies"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Hobbies: e.target.value })}
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
