import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setdata({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, author, description, price } = data;
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    const Data = await axios.post(
      "http://localhost:3001/book/addbook",
      { title, author, description, price },
      {
        headers: { Authorization: token },
      }
    );
    console.log(Data);
    if (Data.data.status === false) alert(Data.msg);
    if (Data.data.status === true) {
      localStorage.setItem("saved-book", JSON.stringify(Data.data.savedBook));
    }
  };

  return (
    <>
      <Navbar />
      <body class="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" onSubmit={handleSubmit}>
            <h5 class="text-xl text-center font-medium text-gray-900 dark:text-white">
              Add Book
            </h5>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={data.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Author
              </label>
              <input
                type="text"
                name="author"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={data.author}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <input
                type="text"
                name="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={data.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                price
              </label>
              <input
                type="number"
                name="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={data.price}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add book
            </button>
          </form>
        </div>

      </body>
    </>
  );
};

export default Home;
