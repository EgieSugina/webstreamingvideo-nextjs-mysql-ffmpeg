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
  User,
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
  if (!Data) return <>No Data</>;
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
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: `data:image/png;base64,${user.img}`,
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
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
                  <CiEdit />
                </span>
              </Tooltip>
            </Link>

            <Link href={`/studio/users/delete/${user.id}`}>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdDeleteForever />
                </span>
              </Tooltip>
            </Link>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
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
        wrapper: "min-h-[222px]",
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
