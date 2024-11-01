/* eslint-disable no-undef */
"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { RegisterButton } from "@/components/buttons.component";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  // const handleGoogleLogin = async () => {
  //   const result = await signIn("google");

  //   if (result) {
  //     router.push(callbackUrl);
  //     // Redirect to home after successful login
  //   }
  // };
  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          style={{ backgroundColor: `${loading ? "#ccc" : "#161616"}` }}
          className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign In"}
        </button>
        <RegisterButton />
        {/* <button
          type="submit"
          style={{ backgroundColor: `${loading ? "#ccc" : "#b21010"}` }}
          className="inline-block px-7  py-4 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          disabled={loading}
        >
          {loading ? "loading..." : "Sign Up"}
        </button> */}
      </div>

      {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0 text-gray-700">OR</p>
      </div>

      <Button
        className="px-7 py-6 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150  ease-in-out w-full flex justify-center items-center mb-3"
        // style={{ backgroundColor: "#3b5998" }}
        onClick={handleGoogleLogin}
        role="button"
      >
        <Image
          className=""
          src="assets/images/google.svg"
          alt=""
          width={50}
          height={200}
          style={{ height: "2rem" }}
        />
        Continue with Google
      </Button> */}
    </form>
  );
};
