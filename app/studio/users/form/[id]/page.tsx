"use client";

import "react-quill/dist/quill.snow.css";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import { FormEvent } from "react";
import Image from "next/image";
import MsgBox from "@/components/ToastMsgBox";
import getDataByPk from "./getDataByPk";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function FormUsers({ params }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const { id } = params;
  const [Data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getDataByPk(id);
      setData(data);
    };
    getData();
  }, [id]);
  if (!Data) {
    return <>Loading...</>;
  }
  const variant: any = "underlined"; //["flat", "bordered", "underlined", "faded"];
  //   SELECT `user_id`, `fullname`, `username`, `email`, `role`, `password`, `img` FROM `user` WHERE 1

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    // try {
    if (password !== retypePassword) {
      setError("Passwords don't match");
      return;
    } else {
      setError("");
    }

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(<MsgBox MsgError={data} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        // transition: Bounce
      });
    }
    toast.success("Update User Sucsess!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      // transition: Bounce
    });
    router.refresh();
    return router.push("/studio/users");

    // } catch (error) {
    //   // Handle any errors that occurred during the fetch or processing
    //   console.error("Error:", error);
    //   // Optionally, set an error state or display an error message to the user
    // }
  }

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
          <h1 className="font-bold text-2xl text-white center">
            Edit Users {id}
          </h1>
          <hr className="mb-3" />
          <Input type="text" name="id" className="hidden" value={id} />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input
                isRequired
                defaultValue={Data.fullname}
                name={"fullname"}
                type="text"
                variant={variant}
                label="Fullname"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
                isRequired
                defaultValue={Data.username}
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
                defaultValue={Data.email}
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
                defaultSelectedKeys={[Data.role]}
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
                onChange={handlePasswordChange}
                type={isVisible ? "text" : "password"}
                color={error ? "danger" : "default"}
                errorMessage={error}
                isInvalid={error}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input
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
            <Button radius="sm" onClick={() => router.back()}>
              Back
            </Button>
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
                    src={`data:image/png;base64,${Data.img}`}
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
