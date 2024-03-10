"use client";

import "react-quill/dist/quill.snow.css";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

import { FormEvent } from "react";
import Image from "next/image";

// import ReactQuill from "react-quill";
// <ReactQuill theme="snow"  value={value} onChange={setValue} />

export default function FormUsers() {
  const variant = "underlined"; //["flat", "bordered", "underlined", "faded"];
  const [value, setValue] = useState("");
  //   SELECT `user_id`, `fullname`, `username`, `email`, `role`, `password`, `img` FROM `user` WHERE 1
  const [isVisible, setIsVisible] = React.useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      if (password !== retypePassword) {
        setError("Passwords don't match");
        return;
      } else {
        setError("");
      }

      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      console.log(formData);

      const response = await fetch("/api/users", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        // Handle non-2xx status codes (errors)
        console.log(`Failed to submit form: ${response.statusText}`);
        
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch or processing
      console.error("Error:", error.message);
      // Optionally, set an error state or display an error message to the user
    }
  }

  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <form onSubmit={onSubmit} className={"flex bg-[#212129] "}>
        <div className=" w-3/4   p-3  rounded-lg">
          <h1 className="font-bold text-2xl text-white">
            Users {"{{"}Action{"}}"}
          </h1>
          <hr className="mb-3" />

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                isRequired
                name={"fullname"}
                type="text"
                variant={variant}
                label="Fullname"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                isRequired
                name={"username"}
                type="text"
                variant={variant}
                label="Username"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                isRequired
                name={"email"}
                type="email"
                variant={variant}
                label="Email"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Select
                items={[
                  {
                    value: "Member"
                  },
                  {
                    value: "Staff"
                  },
                  {
                    value: "Admin"
                  }
                ]}
                isRequired
                name={"role"}
                label="Role"
                // type="text"
                variant={variant}
              >
                {(animal) => (
                  <SelectItem key={animal.value}>{animal.value}</SelectItem>
                )}
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6 text-white">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
              <Input
                isRequired
                name={"password"}
                variant={variant}
                className=""
                label="Password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                value={password}
                onChange={handlePasswordChange}
                type={isVisible ? "text" : "password"}
                color={error ? "danger" : "default"}
                errorMessage={error}
                isInvalid={error}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                isRequired
                variant={variant}
                label="Retype Password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                value={retypePassword}
                onChange={handleRetypePasswordChange}
                color={error ? "danger" : "default"}
                isInvalid={error}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 place-content-end">
            <Button type="submit" color="success" radius="sm">
              Simpan
            </Button>
            <Button radius="sm">Back</Button>
          </div>
        </div>
        <div className=" w-1/3   p-3  rounded-lg">
          <div className=" relative flex flex-col items-center gap-4 p-6">
            <div className="shrink-0">
              <div className="relative flex border bg-white p-1 h-40 w-40 items-center justify-center rounded-full text-white">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    title="user name"
                    width="500"
                    height="500"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                    className="max-w-full rounded-full"
                    alt="Uploaded"
                  />
                ) : (
                  <Image
                    src="/assets/images/profile.jpg"
                    alt="Uploaded"
                    title="user name"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                    width="500"
                    height="500"
                    className="max-w-full rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="flex border-dashed border p-1  border-green-500 flex-col items-start justify-center gap-0 text-center text-white">
              <input
                // isRequired
                name={"img"}
                accept="image/*"
                type="file"
                variant={variant}
                onChange={handleFileChange}
                // label="username"
              />
            </div>
          </div>
        </div>
      </form>
      {/* <hr />
      <br />
      <div className="w-full max-w-3xl  p-3 bg-white"></div> */}
    </>
  );
}
