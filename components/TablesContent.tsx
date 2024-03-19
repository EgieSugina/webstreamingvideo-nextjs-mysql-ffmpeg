"use client";

import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@nextui-org/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { BiSolidVideos } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import React from "react";
import { contentVisibelity } from "@/app/studio/content/data";
import { useRouter } from "next/navigation";

// import { dataouter } from "next/navigation";

// import { navigateRevalidatePath } from "@/components/Actions";

// import { revalidatePath } from "next/cache";

// import { Data } from "./data";
const statusColorMap = {
  done: "success",
  raw: "danger",
  process: "warning"
};
function Action({ data }) {
  const router = useRouter();
  const [Public, setPublic] = React.useState(data.public);
  return (
    <>
      <div className="relative flex items-center gap-2">
        <Link
          href=""
          onClick={async () => {
            await contentVisibelity(data.id, !data.public);
            router.push(`/studio/content?id=${data.id}`);
            router.refresh();
            return setPublic(!data.public);
          }}
        >
          {Public ? (
            <Tooltip content="Public">
              <span className="text-lg  cursor-pointer active:opacity-50">
                <FaRegEye className="text-green-900" />
              </span>
            </Tooltip>
          ) : (
            <Tooltip content="Private">
              <span className="text-lg  cursor-pointer active:opacity-50">
                <FaRegEyeSlash className="text-red-900" />
              </span>
            </Tooltip>
          )}
        </Link>
        <Link href={`/studio/content/form/${data.id}`}>
          <Tooltip content="Process">
            <span className="text-lg text-cyan-500 cursor-pointer active:opacity-50">
              <BiSolidVideos />
            </span>
          </Tooltip>
        </Link>
        <Link href={`/studio/content/form/${data.id}`}>
          <Tooltip content="Edit data">
            <span className="text-lg text-warning cursor-pointer active:opacity-50">
              <CiEdit />
            </span>
          </Tooltip>
        </Link>

        <Link href={`/studio/content/delete/${data.id}`}>
          <Tooltip color="danger" content="Delete data">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <MdDeleteForever />
            </span>
          </Tooltip>
        </Link>
      </div>
    </>
  );
}
export default function Tables({ Data, Columns = [] }) {
  const rowsPerPage = 6;
  const [page, setPage] = React.useState(1);

  const DataMod = Data.map((v) => ({ ...v, id: v.video_id }));
  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    // const showRef = React.useRef(0);

    switch (columnKey) {
      // case "fullname":
      //   return (
      //     <data
      //       avatarProps={{
      //         radius: "lg",
      //         src: `data:image/png;base64,${data.img}`,
      //       }}
      //       description={data.email}
      //       name={cellValue}
      //     >
      //       {data.email}
      //     </data>
      //   );
      case "description":
        return <div dangerouslySetInnerHTML={{ __html: data.description }} />;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[data.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return <Action data={data} />;
      default:
        return cellValue;
    }
  }, []);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return DataMod.slice(start, end);
  }, [page, DataMod]);
  if (!Data) return <>No Data</>;
  const pages = Math.ceil(DataMod.length / rowsPerPage);
  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]"
      }}
    >
      <TableHeader columns={Columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item: any) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
