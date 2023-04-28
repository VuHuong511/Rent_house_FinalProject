import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import "./All-user.css";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const All_user = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(allUsers);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const deleteProduct = async (id, imageURL) => {
    try {
      if (window.confirm("Are you sure you want to delete")) {
        await deleteDoc(doc(db, "users", id));
        toast.success("Users deleted successfully.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="table mx-auto">
        {users.length === 0 ? (
          <p>No user found</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">No.</th>
                <th className="px-4 py-2 border border-gray-300">Id</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const { id, email, name } = user;
                return (
                  <tr key={id} className="border border-gray-300">
                    <td className="px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{id}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{name}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => deleteProduct(id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default All_user;
