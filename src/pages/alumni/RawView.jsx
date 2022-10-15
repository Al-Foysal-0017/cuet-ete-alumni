import React from "react";
import { Link } from "react-router-dom";

const RawView = ({ search, setSearch, filterSearch }) => {
  return (
    <div>
      <div className="inputFieldCommunityDetailsCont">
        <input
          className="inputFieldCommunityDetails"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search by name, batch, id...."
        />
      </div>

      <div className="communityDetails__container">
        {filterSearch?.length === 0 && (
          <div className="NoAlumniFound">No alumni found!!!</div>
        )}
        {filterSearch.map((item, index) => (
          <div className="communityDetails__box" key={index}>
            <img
              className="communityDetails__img"
              src={item?.avatar?.url}
              alt=""
            />
            <div className="communityDetails__box__right">
              <div className="communityDetails__name">
                {item.firstName} {item?.lastName}
              </div>
              <div className="">Batch: {item.batch}</div>
              <div className="">ID: {item.student_id}</div>

              <Link to={`/user/details/${item._id}`}>
                <button className="communityDetails__button">Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RawView;
