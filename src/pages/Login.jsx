// import Auth from '../Auth'
import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const {mutate, isLoading, isError} = useLogin()
  const logout = useLogout()
  const isLoggedIn = pb.authStore.isValid;
  console.log(register("email"));

  async function onSubmit(data) {
    mutate({email:data.email, password:data.password})
	reset()
  }

 
  

    if (isLoggedIn){
		return (
      <>
        <h1>Logged In : {pb.authStore.model.email}</h1>
        <button
			onClick={logout}
          className=" text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
        >
          Logout 
        </button>
      </>
    );
	}

  return (
    <div className="container mx-auto max-w-6xl mt-20">
      {isLoading && <p>Loading...</p>}
	  {isError && <p>email or password is incorrect</p>}
      <h1>Please Login </h1>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-bold text-black"
        >
          Login
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login into your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  {...register("email")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  {...register("password")}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                {isLoading ? "loading" : "login"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                You don't have an account{" "}
                <Link to={`/sign-up`}>
                  <a
                    href="#"
                    className="font-medium text-sky-600 hover:underline dark:text-sky-500"
                  >
                    SignUp here
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
