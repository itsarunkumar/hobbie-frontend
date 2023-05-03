import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import UpdateForm from "./UpdateForm";
import ReactModal from "react-modal";

export default function TableContent({ table, index, handleCheck }) {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const mutation = useMutation({
    mutationKey: ["table", table._id],
    mutationFn: (table) => {
      console.log(table);
      return axios.delete(
        `https://hobbie.onrender.com/table/delete/${table._id}`
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["table"]);
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    mutation.mutate(table);
    console.log("deleted");
  };

  //---------------------------------------------------------------------------------------

  return (
    <tbody>
      <ReactModal
        isOpen={isEditing}
        onRequestClose={() => setIsEditing(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <UpdateForm table={table} setIsEditing={setIsEditing} />
        </div>
      </ReactModal>

      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              onChange={(e) => handleCheck(e, table._id)}
              id={`checkbox-table-search-${table._id}`}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`checkbox-table-search-${table._id}`}
              className="sr-only"
            >
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {index}
        </th>
        <td className="px-6 py-4">{table.Name}</td>
        <td className="px-6 py-4">{table.Phone_Number}</td>
        <td className="px-6 py-4">{table.Email}</td>
        <td className="px-6 py-4">{table.Hobbies}</td>

        <td className="flex items-center px-6 py-4 space-x-3">
          <div
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
            className="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
          >
            Edit
          </div>
          <div
            onClick={handleDelete}
            className="font-medium text-red-600 cursor-pointer dark:text-red-500 hover:underline"
          >
            Remove
          </div>
        </td>
      </tr>
    </tbody>
  );
}
