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
import { ref } from "firebase/storage";

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
        console.log(allUsers);
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
      <div className="table">
        <h2>All Products</h2>
        {users.length === 0 ? (
          <p>No user found</p>
        ) : (
          <table>
            <tr>
              <th>No.</th>
              <th>Id</th>
              <th>Email</th>
              <th>name</th>
              <th>Action</th>
            </tr>
            {users.map((user, index) => {
              const { id, email, name } = user;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>{email}</td>
                  <td>{name}</td>
                  <td>
                    <FaTrashAlt
                      size={18}
                      color="red"
                      onClick={() => deleteProduct(id)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default All_user;
