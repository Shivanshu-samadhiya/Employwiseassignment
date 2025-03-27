import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => setUser(res.data.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      toast.success("User deleted successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-96 bg-gray-900 shadow-lg rounded-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit User</h1>
        <div className="flex flex-col gap-4">
          <Input 
            className="bg-gray-800 text-white border-gray-600 focus:ring-blue-500" 
            value={user.first_name || ""} 
            onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
            placeholder="First Name"
          />
          <Input 
            className="bg-gray-800 text-white border-gray-600 focus:ring-blue-500" 
            value={user.last_name || ""} 
            onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
            placeholder="Last Name"
          />
          <div className="flex gap-4 mt-4">
            <Button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-500">Save</Button>
            <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-500">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;