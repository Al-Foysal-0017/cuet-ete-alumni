import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../store/actions/eventAction";
import { useAlert } from "react-alert";

const Table = ({ events }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterEvents, setFilterEvents] = useState(events);
  const { token } = useSelector((state) => state.user);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const deleteHandler = async (id) => {
    setDeleteLoader(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/event/${id}`,
        config
      );
      alert.success(data.message);
      dispatch(getAllEvents());
      setDeleteLoader(false);
    } catch (error) {
      alert.error(error.response.data.message || "Something went wrong.");
      setDeleteLoader(false);
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => <img src={row.img} alt="" width={180} height={80} />,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Date",
      selector: (row) => row.particular_date,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="tableButton">
            <Link to={`/admin/event/details/${row?._id}`}>Details</Link>
          </button>
          <button
            onClick={() => deleteHandler(row._id)}
            style={{ background: "tomato" }}
            className="tableButton"
          >
            {deleteLoader ? "Loading.." : "Delete"}
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
    const result = events?.filter((evt) => {
      return (
        evt.title.toLowerCase().match(search.toLowerCase()) ||
        evt.particular_date.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterEvents(result);
  }, [events, search]);
  return (
    <DataTable
      title="All Events"
      columns={columns}
      data={filterEvents}
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
          style={{
            maxWidth: "350px",
            fontSize: "14px",
            padding: "8px 16px",
          }}
          type="text"
          placeholder="Search here..."
        />
      }
      customStyles={customStyles}
    />
  );
};

export default Table;
