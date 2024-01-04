import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddTask = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const userInfo = {
      email: user?.email,
      name: data.name,
      addedEmail: data.addedEmail,
      phone: data.phone,
    };
    console.log(userInfo);

    const res = await axiosPublic.post("/users", userInfo);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/tasklist");
    }
  };
  return (
    <div className="min-h-screen bg-green-fade flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray60 space-y-3 w-full shadow-2xl md:w-2/3 lg:w-2/3  2xl:w-1/3 mx-auto my-auto p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold">Add User</h2>
        {/* Name */}
        <label
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-anchor-placement="top-bottom"
          className="form-control w-full"
        >
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </label>


        {/* Email */}
        <label
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor-placement="top-bottom"
          className="form-control"
        >
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Email"
            {...register("addedEmail", { required: true })}
          ></input>
        </label>


        {/* Phone */}
        <label
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor-placement="top-bottom"
          className="form-control"
        >
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="number"
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Phone"
            {...register("phone", { required: true })}
          ></input>
        </label>
    
      
        <button
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-anchor-placement="top-bottom"
          className="flex gap-2 items-center py-2 px-6 bg-green-fade rounded-lg text-white hover:bg-green-medium"
        >
          <FaPlus />
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddTask;
