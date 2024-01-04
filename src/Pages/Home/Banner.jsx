import { Link } from "react-router-dom";
import banner from "../../assets/notes-flatline.svg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-gray60 min-h-[calc(100vh-61.5px)] flex items-center">
      {/* banner */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-between py-10 lg:p-0">
        {/* Banner moto */}
        <div className="space-y-5 p-2 lg:p-0">
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-anchor-placement="top-bottom"
            className="text-green-medium text-xl font-medium"
          >
            User Management Platform
          </p>
          <h2
            data-aos="zoom-in"
            data-aos-delay="500"
            data-aos-anchor-placement="top-bottom"
            className="text-7xl font-bold leading-[80px]"
          >
            Expand Your Network, <br />Add with a Click!
            <span className="text-green-fade">ConnectHub</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-anchor-placement="top-bottom"
            className="text-green-fade"
          >
            Linking Lives, One Connection at a Time
            <br /> Organize, track, and conquer User effectively with ConnectHub
          </p>
          <button>
            {" "}
            <Link
              to={user ? "/dashboard/tasklist" : "/login"}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor-placement="top-bottom"
              className="py-2 px-4 text-white bg-green-dark rounded-lg"
            >
              Let{"'"}s Explore
            </Link>
          </button>
        </div>
        {/* banner image */}
        <img
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-anchor-placement="top-bottom"
          className="max-w-2xl"
          src={banner}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
