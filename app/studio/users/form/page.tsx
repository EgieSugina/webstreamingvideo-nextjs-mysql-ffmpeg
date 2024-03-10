"use client";

import "react-quill/dist/quill.snow.css";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      setError("Passwords don't match");
    } else {
      // Passwords match, proceed with form submission
      setError("");
      // Perform any further action like API calls or form submission here
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-3xl  p-3 bg-[#212129]  rounded-lg">
          <h1 className="font-bold text-2xl text-white">
            Users {"{{"}Action{"}}"}
          </h1>
          <hr className="mb-3" />

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                isRequired
                type="text"
                variant={variant}
                label="Fullname"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                isRequired
                type="text"
                variant={variant}
                label="username"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input isRequired type="email" variant={variant} label="Email" />
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
      </form>
      {/* <hr />
      <br />
      <div className="w-full max-w-3xl  p-3 bg-white"></div> */}
    </>
  );
}
