import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function UpdateForm({ table, setIsEditing }) {
  const queryClient = useQueryClient();
  const [data, setData] = useState({
    Name: table.Name,
    Phone_Number: table.Phone_Number,
    Email: table.Email,
    Hobbies: table.Hobbies,
  });

  const mutation = useMutation({
    mutationKey: ["table", table._id],
    mutationFn: (data) => {
      return axios.put(
        "https://hobbie.onrender.com/table/update/" + table._id,
        data
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["table"]);
    },
  });

  console.log(table);
  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    mutation.mutate(data);
    setIsEditing(false);
    console.log("submitted");
  };

  return (
    <div className="max-w-md mx-auto my-4 px-4 py-8 bg-slate-900 w-full rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-white-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Name: e.target.value })}
            value={data.Name}
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
            type="tel"
            name="phonenumber"
            id="phonenumber"
            placeholder="Phone Number"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Phone_Number: e.target.value })}
            value={data.Phone_Number}
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
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Email: e.target.value })}
            value={data.Email}
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
            type="text"
            name="hobbies"
            id="hobbies"
            placeholder="Hobbies"
            className="w-full bg-gray-100 text-black rounded-sm py-2 px-4 placeholder-gray-500"
            onChange={(e) => setData({ ...data, Hobbies: e.target.value })}
            value={data.Hobbies}
          />
        </div>
        <div className="flex justify-around items-center">
          <button
            // onClick={() => setIsEditing(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-600"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
