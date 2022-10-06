import React from "react";
import { useSelector } from "react-redux";
import "./__approvalMsg.scss";

const ApprovalMsg = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user && (
        <>
          {(user.role === "subscriber" || user?.role === undefined) && (
            <div className="approvalMsg">
              We want to verify you that are you really a CUET ETE Alumni? So,
              please contact us for approval.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ApprovalMsg;
