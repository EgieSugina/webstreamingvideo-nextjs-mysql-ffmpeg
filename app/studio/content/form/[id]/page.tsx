"use client";

import "react-quill/dist/quill.snow.css";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useMemo, useState } from "react";

import { CgSpinnerTwo } from "react-icons/cg";
import { FormEvent } from "react";
import MsgBox from "@/components/ToastMsgBox";
import VideoPlayer from "@/components/VideoPlayer";
import dynamic from "next/dynamic";
import ffmpeg from "@/lib/ffmpeg";
import getDataByPk from "./getDataByPk";
import { navigate } from "@/components/Actions";
import { toast } from "react-toastify";

// import Link from "next/link";

// import ReactQuill from "react-quill";

export default function FormUsers({ params }) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const variant = "underlined"; //["flat", "bordered", "underlined", "faded"];
  const [value, setValue] = useState("");
  const [ConvertoHLS, setConvertoHLS] = useState("raw");
  const [Data, setData] = useState<any>(null);
  const [ValuesSelect, setValuesSelect] = useState([]);

  const { id } = params;
  React.useEffect(() => {
    const getData = async () => {
      const data = await getDataByPk(id);
      setData(data);
      setValue(data.description);
      setConvertoHLS(data.status);
    };
    getData();
  }, [id]);
  if (!Data) {
    return <>Loading...</>;
  }
  const handleSelectionChange = (e) => {
    setValuesSelect(new Set(e.target.value.split(",")));
  };
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const response = await fetch(`/api/content/${id}`, {
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
      toast.success("Update Sucsess!", {
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
      return navigate("/studio/content");

    } catch (error) {
      console.error("Error:", error);
    }
  }
  const Genres = new Set(
    Data.genre
      .toLowerCase()
      .split(",")
      .map((v) => v.trimStart())
  );
  const _genre = [
    {
      label: "Action",
      value: "action"
    },
    {
      label: "Adventure",
      value: "adventure"
    },
    {
      label: "Animation",
      value: "animation"
    },
    {
      label: "Comedy",
      value: "comedy"
    },
    {
      label: "Crime",
      value: "crime"
    },
    {
      label: "Documentary",
      value: "documentary"
    },
    {
      label: "Drama",
      value: "drama"
    },
    {
      label: "Family",
      value: "family"
    },
    {
      label: "Fantasy",
      value: "fantasy"
    },
    {
      label: "Horror",
      value: "horror"
    },
    {
      label: "Mystery",
      value: "mystery"
    },
    {
      label: "Romance",
      value: "romance"
    },
    {
      label: "Science Fiction",
      value: "science fiction"
    },
    {
      label: "Thriller",
      value: "thriller"
    },
    {
      label: "War",
      value: "war"
    },
    {
      label: "Slice of Life",
      value: "slice of life"
    },
    {
      label: "Sports",
      value: "sports"
    }
  ];
  // SELECT  `user_id`, ``, `description`, `duration`, `status`, `release_date`, `upload_date`, `type` FROM `videos` WHERE 1
  return (
    <>
      <form onSubmit={onSubmit} className={"flex bg-[#212129] "}>
        <div className=" w-full   p-3  rounded-lg">
          <h1 className="font-bold text-2xl text-white">Video Content</h1>
          <hr className="mb-3" />

          <input name={"description"} type="text" value={value} hidden />
          <input
            name={"genre"}
            type="text"
            value={Array.from(ValuesSelect).join(", ")}
            hidden
          />
          <div className="flex flex-row">
            <div className="grow">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Input
                    isRequired
                    name={"title"}
                    defaultValue={Data.title}
                    type="text"
                    variant={variant}
                    label="Title"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <Input
                    // isRequired
                    name={"video_file"}
                    accept="video/mp4,video/x-m4v,video/*,.mkv"
                    type="file"
                    variant={variant}
                    // onChange={handleFileChange}
                    // label="File"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3">
                  <Select
                    items={[
                      {
                        label: "Movie",
                        value: "movie"
                      },
                      {
                        label: "TV Series",
                        value: "tv_series"
                      }
                    ]}
                    isRequired
                    name={"type"}
                    label="Type"
                    defaultSelectedKeys={[Data.type]}
                    // type="text"
                    variant={variant}
                  >
                    {(x) => (
                      <SelectItem key={x.value} value={x.value}>
                        {x.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <Select
                    onChange={handleSelectionChange}
                    isRequired
                    name={"genre"}
                    defaultSelectedKeys={Genres}
                    label="Genre"
                    selectionMode="multiple"
                    // type="text"
                    variant={variant}
                  >
                    {_genre.map((x) => (
                      <SelectItem key={x.value} value={x.value}>
                        {x.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3 mb-6   h-80">
                  <div className={"bg-white h-[18.6rem]"}>
                    <ReactQuill
                      theme="snow"
                      className={"bg-white h-64"}
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {Data.status === "done" ? (
                <>
                  <VideoPlayer src={`/hls/${id}/video.m3u8`} width={"45vw"} />
                </>
              ) : (
                <>
                  <VideoPlayer
                    src={`/raw/${id}${Data.format_raw}`}
                    width={"45vw"}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t-2 place-content-end p-4">
            <Button
              // className="btn bg-warning-700 p-2 rounded-md shadow-2xl"
              color="warning"
              onClick={async () => {
                setConvertoHLS("process");
                await ffmpeg(id, Data.format_raw);
              }}
              radius="sm"
              hidden={true}
              isDisabled={
                ConvertoHLS == "process" || ConvertoHLS == "done" ? true : false
              }
            >
              {ConvertoHLS == "raw" ? (
                <>Convert to HLS</>
              ) : ConvertoHLS == "process" ? (
                <>
                  <CgSpinnerTwo className=" animate-spin " /> Processing...
                </>
              ) : (
                <>HLS Ready</>
              )}
            </Button>
            <Button type="submit" color="success" radius="sm">
              Simpan
            </Button>
            <Button radius="sm">Back</Button>
          </div>
        </div>
      </form>
    </>
  );
}
