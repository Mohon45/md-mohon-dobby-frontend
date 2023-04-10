import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../../shared/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingOverlay from "../../shared/LoadingOverlay/LoadingOverlay";
import cardImage from "../../assets/img/th.jpeg";
import { useForm } from "react-hook-form";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios
      .get("https://dobby-ads.onrender.com/api/image", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data.data);
        if (filterData.length === 0) {
          setFilterData(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  const onSearchHandler = (e) => {
    const result = data.filter((item) => item.name.includes(e.target.value));

    setFilterData(result);
  };

  const onSubmitHandler = (data) => {
    setLoading(true);
    if (data.image) {
      data.image = data.image[0];
    }

    axios
      .post("https://dobby-ads.onrender.com/api/image/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          toast.success("Image Successfully Uploaded!");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        toast.error(error);
      });
  };
  return (
    <LoadingOverlay active={loading}>
      <div>
        <Navbar />

        {/* main body */}
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between my-4">
            <div>
              <input
                type="text"
                onChange={(e) => {
                  onSearchHandler(e);
                }}
                placeholder="search image"
                className="outline-none border border-green-500 rounded-md px-2 py-1"
              />
            </div>
            <div>
              <form className="flex" onSubmit={handleSubmit(onSubmitHandler)}>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className="outline-none border border-green-500 rounded-md px-2 py-1 mr-2"
                  required
                />
                <label htmlFor="fileInput" className="mr-4">
                  <Icon id="icon" icon="uil:image-upload" fontSize={30} />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  {...register("image")}
                  required
                ></input>

                <button className="bg-green-500 text-white rounded-md px-3">
                  Upload
                </button>
              </form>
            </div>
          </div>
          <hr className="border border-b-green-500" />

          {/* img card section */}

          <div className="grid grid-cols-4 gap-4 my-6">
            {filterData?.map((item, index) => (
              <div>
                <img
                  src={item.image}
                  alt=""
                  className="rounded w-[310px] h-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Home;
