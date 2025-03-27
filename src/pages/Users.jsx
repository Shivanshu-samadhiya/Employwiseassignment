import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    };
    fetchUsers();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="shadow-lg p-6 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-lg">
            <CardContent className="flex flex-col items-center">
              <img src={user.avatar} alt={user.first_name} className="rounded-full w-24 h-24 border-4 border-gray-600 shadow-md" />
              <p className="mt-4 text-lg font-semibold">{user.first_name} {user.last_name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
              <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-lg py-2 rounded-lg transition-transform transform hover:scale-105" onClick={() => navigate(`/edit/${user.id}`)}>
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Users;