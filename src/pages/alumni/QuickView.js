import React from "react";
import CheckAlumni from "./checkAlumni";
import {
  batch12,
  batch13,
  batch14,
  batch15,
  batch16,
  batch17,
  batch18,
  batch19,
  batch20,
} from "./data";

const QuickView = () => {
  return (
    <div className="quickView">
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-12</div>
        <div className="quickView__contr__ids">
          {batch12.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-13</div>
        <div className="quickView__contr__ids">
          {batch13.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-14</div>
        <div className="quickView__contr__ids">
          {batch14.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-15</div>
        <div className="quickView__contr__ids">
          {batch15.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-16</div>
        <div className="quickView__contr__ids">
          {batch16.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-17</div>
        <div className="quickView__contr__ids">
          {batch17.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-18</div>
        <div className="quickView__contr__ids">
          {batch18.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>

      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-19</div>
        <div className="quickView__contr__ids">
          {batch19.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div className="quickView__contr">
        <div className="quickView__contr__batch">Batch-20</div>
        <div className="quickView__contr__ids">
          {batch20.map((item, index) => (
            <CheckAlumni key={index} studentId={item} />
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "7rem" }} />
    </div>
  );
};

export default QuickView;
