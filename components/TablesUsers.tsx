"use client";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User
} from "@nextui-org/react";

import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import React from "react";

// import { useRouter } from "next/navigation";

// import { navigateRevalidatePath } from "@/components/Actions";

// import { revalidatePath } from "next/cache";

// import { Data } from "./data";
// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };
export default function Tables({ Data, Columns = [] }) {
  const rowsPerPage = 6;
  const [page, setPage] = React.useState(1);

  const DataMod = Data.map((v) => ({ ...v, id: v.user_id }));
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return DataMod.slice(start, end);
  }, [page, DataMod]);

  const pages = Math.ceil(DataMod.length / rowsPerPage);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fullname":
        if (user.img) {
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: `data:image/png;base64,${user.img}`
              }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        }
        return (
          <>
            <div className="inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2">
              <span
                className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-large"
                data-hover="true"
              >
                {cellValue.split("")[0]}
              </span>
              <div className="inline-flex flex-col items-start">
                <span className="text-small text-inherit">{cellValue}</span>
                <span className="text-tiny text-foreground-400">
                  {user.email}
                </span>
              </div>
            </div>
          </>
        );
      // case "username":
      //   return (
      //     <div className="flex flex-col">
      //       <p className="text-bold text-sm capitalize">@{cellValue}</p>
      //     </div>
      //   );
      // case "status":
      //   return (
      //     <Chip
      //       className="capitalize"
      //       color={statusColorMap[user.status]}
      //       size="sm"
      //       variant="flat"
      //     >
      //       {cellValue}
      //     </Chip>
      //   );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/studio/users/form/${user.id}`}>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <CiEdit className="text-2xl" />
                </span>
              </Tooltip>
            </Link>
            |
            <Link href={`/studio/users/delete/${user.id}`}>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdDeleteForever className="text-2xl" />
                </span>
              </Tooltip>
            </Link>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  if (!Data) return <>No Data</>;

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
