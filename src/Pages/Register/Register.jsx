import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Login/SocialLogin";
import people from "../../assets/digital-nomad-outline.svg";
import "../../App.css";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data.success);
    if (res.data.success) {
      const imageUrl = res.data.data.display_url;

      createUser(data.email, data.password)
        .then((res) => {
          console.log(res.user);
          updateUserProfile(data.name, imageUrl).then(() => {
            console.log("user added to the database");
            console.log(res.user);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/tasklist");
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex flex-row-reverse  min-h-screen">
      {/* <!-- Left Pane --> */}
      <div className="hidden bg-green-fade lg:flex items-center justify-center flex-1">
        <div className="w-full text-center">
          <img className="w-2/3 mx-auto" src={people} alt="" />
        </div>
      </div>
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-gray60 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Register
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <SocialLogin></SocialLogin>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* <!-- form elements go here --> */}
            {/* name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                {...register("name", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                {...register("email", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* New input fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Phone"
                name="phone"
                {...register("phone", {
                  required: true,
                  // pattern: /^[0-9]{10}$/,
                })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors?.phone?.type === "required" && (
                <p className="text-red-600">Phone is required</p>
              )}
              {errors?.phone?.type === "pattern" && (
                <p className="text-red-600">Enter a valid phone number</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  {...register("gender", { required: true })}
                />
                <label htmlFor="male" className="ml-2">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  {...register("gender", { required: true })}
                />
                <label htmlFor="female" className="ml-2">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="others"
                  name="gender"
                  value="others"
                  {...register("gender", { required: true })}
                />
                <label htmlFor="others" className="ml-2">
                  Others
                </label>
              </div>
              {errors?.gender?.type === "required" && (
                <p className="text-red-600">Gender is required</p>
              )}
            </div>

            {/* How did you hear about this? */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                How did you hear about this?
              </label>
              <div>
                <input
                  type="checkbox"
                  id="linkedin"
                  name="how_heard"
                  value="linkedin"
                  {...register("how_heard")}
                />
                <label htmlFor="linkedin" className="ml-2">
                  LinkedIn
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="friends"
                  name="how_heard"
                  value="friends"
                  {...register("how_heard")}
                />
                <label htmlFor="friends" className="ml-2">
                  Friends
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="job_portal"
                  name="how_heard"
                  value="job_portal"
                  {...register("how_heard")}
                />
                <label htmlFor="job_portal" className="ml-2">
                  Job Portal
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="others"
                  name="how_heard"
                  value="others"
                  {...register("how_heard")}
                />
                <label htmlFor="others" className="ml-2">
                  Others
                </label>
              </div>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                name="city"
                {...register("city", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              {errors?.city?.type === "required" && (
                <p className="text-red-600">City is required</p>
              )}
            </div>

            {/* State Auto Suggested Search Textbox */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                placeholder="State"
                name="state"
                {...register("state", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
              {errors?.state?.type === "required" && (
                <p className="text-red-600">State is required</p>
              )}
            </div>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*%])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            {errors?.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p className="text-red-600">
                password must be 6 or more caharceter long
              </p>
            )}
            {errors?.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}

            {/* for user photo */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Pick a file</span>
              </div>
              <input
                type="file"
                {...register("image", {
                  required: true,
                })}
                className="file-input bg-white border-none file-input-bordered w-full"
              />
            </label>
            <div>
              <input
                type="submit"
                className="w-full cursor-pointer bg-green-fade text-white p-2 rounded-md hover:bg-green-medium focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                value="Register"
              />
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Allready have an account?{" "}
              <Link className="text-black hover:underline" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
