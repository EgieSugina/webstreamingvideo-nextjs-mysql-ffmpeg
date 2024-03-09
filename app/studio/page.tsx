"use client";

import "./studio.css";
import "react-quill/dist/quill.snow.css";

import React, { useState } from "react";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";

// import ReactQuill from "react-quill";
// <ReactQuill theme="snow"  value={value} onChange={setValue} />

export default function HomeStudio() {
  const variant = "underlined"; //["flat", "bordered", "underlined", "faded"];
  const [value, setValue] = useState("");

  return (
    <>
      <form>
        <div className="w-full max-w-3xl  p-3 bg-[#323949] rounded-lg">
          <h1 className="font-bold text-2xl text-white">INI ISI</h1>
          <hr className="mb-3" />

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input type="email" variant={variant} label="Email" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input type="email" variant={variant} label="Email" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <Input type="email" variant={variant} label="Email" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <Input type="email" variant={variant} label="Email" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 place-content-end">
            <Button color="success" radius="sm">
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
