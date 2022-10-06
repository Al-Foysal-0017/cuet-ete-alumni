import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserRole } from "../../store/actions/userAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const Table = ({ users }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState(users);

  const { loading } = useSelector((state) => state.usersRequest);

  const approveHandler = (id, number) => {
    dispatch(updateUserRole(id, { number: number, role: "alumni" }));
  };

  const deleteHandler = async (id, number) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/user/${id}`,
        config
      );
      alert.success(data.message);
      dispatch(getAllUsers());
    } catch (error) {
      alert.error(error.response.data.message || "Something went wrong.");
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => <img src={row.avatar} alt="" width={80} height={80} />,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "Mobile",
      selector: (row) => row.number,
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
      name: "Request Date",
      selector: (row) => row.createdAt,
      // sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="tableButton">
            <Link to={`/admin/user/details/${row._id}`}>
              {loading ? "Load..." : "Details"}
            </Link>
          </button>
          <button
            onClick={() => {
              approveHandler(row._id, row.number);
            }}
            style={{ background: "green" }}
            className="tableButton"
          >
            {loading ? "Load..." : "Approve"}
          </button>
          <button
            onClick={() => deleteHandler(row._id)}
            style={{ background: "tomato" }}
            className="tableButton"
          >
            {loading ? "Load..." : "Delete"}
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
      return (
        user?.firstName?.toLowerCase().match(search.toLowerCase()) ||
        user?.lastName?.toLowerCase().match(search.toLowerCase()) ||
        user?.number?.toLowerCase().match(search.toLowerCase()) ||
        user?.student_id?.toString().toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterUsers(result);
  }, [users, search]);
  return (
    <DataTable
      title="All Request"
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
          placeholder="Search by Name, ID or Mobi..."
        />
      }
      // subHeaderAlign="center"
      customStyles={customStyles}
    />
  );
};

export default Table;
