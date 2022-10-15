import axios from "axios";
import { useEffect, useState } from "react";

const CheckAlumni = ({ studentId }) => {
  const [isPresent, setIsPresent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/student/${studentId}`
        );
        console.log(data);
        if (data?.user?.length > 0) {
          setIsPresent(true);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
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
        <div
          className={
            isPresent ? "quickView__contr__id" : "quickView__contr__idNull"
          }
        >
          {studentId}
        </div>
      )}
    </>
  );
};

export default CheckAlumni;
