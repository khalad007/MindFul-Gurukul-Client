import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = () => {
  const { user, loading } = useContext(AuthContext);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["taskslist", user?.email],
    enabled: !loading && isOnline,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [searchInput, setSearchInput] = useState("");

  const filteredUsers = users.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.addedEmail.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleDelete = (id) => {
    if (!isOnline) {
      toast.error("You are offline. Please check your internet connection.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          refetch();
        }
      }
    });
  };

  // ... (other functions)

  return (
    <div className="min-h-screen bg-green-fade">
      <h2 className="text-4xl font-bold text-gray60 text-center py-10">
        User Lists
      </h2>

      {/* Filter and Search Section */}
      <div className="flex justify-between mb-4">
        {/* Sorting */}
        <div>
          <label className="text-white mr-2">Sort by:</label>
          <select
            className="bg-white px-2 py-1 rounded-md"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="text-white mr-2">Search:</label>
          <input
            type="text"
            className="bg-white px-2 py-1 rounded-md"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* User List */}
      <div className="max-w-7xl mx-auto grid xl:grid-cols-3 gap-6 grid-cols-1 md:grid-cols-2 pb-10">
        {/* Users */}
        <div className="space-y-5 border-2 w-full border-dashed p-3 border-gray60">
          <h2 className="text-2xl font-bold text-gray60 text-center"></h2>
          {sortedUsers.length > 0 ? (
            sortedUsers.map((item, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
                data-aos-anchor-placement="top-bottom"
                key={index}
                className="card bg-green-medium mx-auto shadow-xl"
              >
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 25}`}
                  data-aos-anchor-placement="top-bottom"
                  className="card-body"
                >
                  <h2 className="card-title text-gray60">{item.name}</h2>
                  <p className="text-white">{item.addedEmail}</p>
                  <p className="text-white">Phone : {item.phone}</p>
                  <div className="card-actions text-white">
                    <div className="inline-block">
                      <p className="px-4  bg-green-dark rounded-full">
                        {item.priority}
                      </p>
                    </div>
                  </div>
                
                  <div className=" space-x-2 flex text-white ">
                    <Link
                      to={`/dashboard/edittask/${item._id}`}
                      className="py-2 flex gap-2 text-black rounded-lg px-4 bg-gray60"
                    >
                      <FaPencil />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="py-2 flex gap-2 rounded-lg px-4 bg-green-dark"
                    >
                      <FaTrashCan />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-center mt-4">
              <p>No User Added</p>
            </div>
          )}
        </div>
    
      </div>

  
      <ToastContainer />
    </div>
  );
};

export default TaskList;

