import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Edittask = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { data: user = {} } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosPublic(`/users/${id}`);
      return res.data;
    },
  });
  const onSubmit = async (data) => {
    console.log(data);

    const res = await axiosPublic.put(`/users/${id}`, data);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Info Edited Successfully",
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
        <h2 className="text-2xl font-bold">Edit User Info</h2>
        {/* title */}
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
            placeholder="Title"
            {...register("name")}
            defaultValue={user?.name}
            className="input input-bordered w-full"
          />
        </label>
        {/* description */}
        <label
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor-placement="top-bottom"
          className="form-control"
        >
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
            {...register("addedEmail")}
            defaultValue={user?.addedEmail}
          ></textarea>
        </label>
        {/* deadline */}
        <label
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-anchor-placement="top-bottom"
          className="form-control w-full"
        >
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="number"
            placeholder="Date"
            {...register("phone")}
            defaultValue={user?.phone}
            className="input input-bordered w-full"
          />
        </label>
        
        <button
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-anchor-placement="top-bottom"
          className="flex gap-2 items-center py-2 px-6 bg-green-fade rounded-lg text-white hover:bg-green-medium"
        >
          <FaPlus />
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edittask;
