import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TableContent from "./TableContent";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ReactModal from "react-modal";
import Form from "./Form";

export default function Table({ children }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["table"],
    queryFn: () => {
      return axios.get("https://hobbie.onrender.com/table/get");
    },
  });

  const table = data?.data;

  //-------------------------------
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (e, itemId) => {
    const isChecked = e.target.checked;
    const item = table.table.find((item) => item._id === itemId);

    if (isChecked) {
      // Add the checked item to the checked items array
      setCheckedItems((checkedItems) => [...checkedItems, item]);
    } else {
      // Remove the unchecked item from the checked items array
      setCheckedItems(checkedItems.filter((i) => i._id !== item._id));
    }
  };

  console.log(checkedItems);

  const sendEmail = (e) => {
    e.preventDefault();

    if (checkedItems.length === 0) {
      alert("Please select atleast one item.");
      return;
    }

    // Prepare the list of checked items for the email body
    const emailBody = checkedItems
      .map((item) => {
        return ` Name: ${item.Name}, Phone Number: ${item.Phone_Number}, Email: ${item.Email}, Hobbies: ${item.Hobbies}\n`;
      })
      .join("");

    //templateparams
    const templateParams = {
      from_name: "from_name_value",
      to_name: "arunkumark052001@gmail.com",
      message: emailBody,
    };

    // Send the email using EmailJS
    emailjs
      .send(
        "service_vw9yeuc",
        "template_psxe8uj",
        templateParams,
        "MxTxxEXfOBjpTjdcM"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Error sending email, please try again.");
        }
      );
  };

  //----------------------------------

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={sendEmail}
            className="bg-blue-500 text-white py-2 px-4 mx-3 rounded-sm hover:bg-blue-600"
          >
            Send
          </button>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600"
          >
            Add
          </button>
        </div>{" "}
        <ReactModal
          isOpen={isEditing}
          onRequestClose={() => setIsEditing(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <Form setIsEditing={setIsEditing} />
          </div>
        </ReactModal>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <label htmlFor="checkbox-all-search">Select</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Hobbies
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {table.table.map((item, index) => (
            <TableContent
              key={item._id}
              table={item}
              index={index + 1}
              handleCheck={handleCheck}
            />
          ))}
        </table>
      </div>
    </>
  );
}
