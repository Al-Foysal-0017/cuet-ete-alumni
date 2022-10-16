import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const CheckAlumni = ({ studentId }) => {
  const alert = useAlert();
  const [isPresent, setIsPresent] = useState(false);
  const [loading, setLoading] = useState(false);

  const noAccount = (id) => {
    alert.error(`Currently ID:${id} has no account on this site.`);
  };

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/student/${studentId}`
        );
        if (data?.user?.length > 0) {
          setIsPresent(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUser();
  }, [setLoading, studentId]);
  return (
    <>
      {loading ? (
        <div className="quickView__contr__idLoad">Load...</div>
      ) : (
        <>
          {isPresent ? (
            <Link to={`/user/details/student/${studentId}`}>
              <div
                className={
                  isPresent
                    ? "quickView__contr__id"
                    : "quickView__contr__idNull"
                }
              >
                {studentId}
              </div>
            </Link>
          ) : (
            <div
              className={
                isPresent ? "quickView__contr__id" : "quickView__contr__idNull"
              }
              onClick={() => {
                noAccount(studentId);
              }}
            >
              {studentId}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckAlumni;
