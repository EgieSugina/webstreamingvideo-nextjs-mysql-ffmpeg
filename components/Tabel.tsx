const Tables = ({ dataSource = null, columns = null }) => {
  return (
    <>
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border-collapse rounded w-overflow-x-auto "
          cellspacing="0"
        >
          <tbody>
            <tr className="border-b border-slate-300 stroke-slate-100 text-slate-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="h-12 px-6 text-sm font-medium  "
                >
                  {column.title}
                </th>
              ))}
            </tr>
            {dataSource.map((row) => (
              <tr
                key={row.key}
                className="border-b border-slate-200 hover:bg-white hover:text-gray-900"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="h-12 px-6 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500"
                  >
                    {row[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tables;
