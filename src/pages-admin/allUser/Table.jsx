import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Table = ({ users }) => {
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState(users);

  const { loading } = useSelector((state) => state.usersRequest);

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img src={row.avatar?.url} alt="" width={80} height={80} />
      ),
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "ID",
      selector: (row) => row.student_id,
    },
    {
      name: "Batch",
      selector: (row) => row.batch,
    },
    {
      name: "View Profile",
      cell: (row) => (
        <>
          <button className="tableButton">
            <Link to={`/user/details/${row._id}`}>
              {loading ? "Load..." : "Profile"}
            </Link>
          </button>
        </>
      ),
    },
  ];

  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        width: "180px",
        borderBottom: "1px solid #05BE71",
        display: "flex",
        justifyContent: "center",
        background: "#05BE71",
        color: "#fff",
      },
    },
    cells: {
      style: {
        width: "180px",
        borderBottom: "1px solid #05BE71",
        display: "flex",
        justifyContent: "center",
      },
    },
  };

  useEffect(() => {
    const result = users?.filter((user) => {
      // console.log(user.student_id);
      return (
        user?.firstName?.toLowerCase().match(search.toLowerCase()) ||
        user?.lastName?.toLowerCase().match(search.toLowerCase()) ||
        user?.student_id
          ?.toString()
          .toLowerCase()
          .match(search.toLowerCase()) ||
        user?.batch?.toString().toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterUsers(result);
  }, [users, search]);
  return (
    <DataTable
      title="Find Alumni"
      columns={columns}
      data={filterUsers}
      pagination
      // fixedHeader
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          style={{
            maxWidth: "350px",
            fontSize: "14px",
            padding: "8px 16px",
          }}
          placeholder="Search by Name, ID or Batch..."
        />
      }
      // subHeaderAlign="center"
      customStyles={customStyles}
    />
  );
};

export default Table;
