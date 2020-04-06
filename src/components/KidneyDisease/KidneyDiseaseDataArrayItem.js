import React from "react";

const KidneyDiseaseDataArrayItem = props => {
  return (
    <div className="col-12">
      <div className="kidney-disease-data-array">
        <div>
          <label>eGFR:</label>
          <input
            className={`input-data ${
              props.item.eGFR.length === 0 && props.isSubmitted
                ? "border-danger"
                : ""
            }`}
            type="text"
            value={props.item.eGFR}
            data-idx={props.item.idx}
            data-testid={`eGFR${props.item.idx}`}
            onChange={props.handleeGFRChange}
            name="eGFR"
          ></input>
        </div>
        <div>
          <label>Date:</label>
          <input
            className={`input-year ${
              props.item.year.length < 4 && props.isSubmitted
                ? "border-danger"
                : ""
            }`}
            value={props.item.year}
            data-idx={props.item.idx}
            data-testid={`year${props.item.idx}`}
            onChange={props.handleYearChange}
            type="text"
            placeholder="YYYY"
            maxLength="4"
            name="year"
          ></input>
          <span>/</span>
          <input
            className={`input-month ${
              props.item.month.length < 2 && props.isSubmitted
                ? "border-danger"
                : ""
            }`}
            value={props.item.month}
            data-idx={props.item.idx}
            data-testid={`month${props.item.idx}`}
            onChange={props.handleMonthChange}
            type="text"
            placeholder="MM"
            maxLength="2"
            name="month"
          ></input>
          <span>/</span>
          <input
            className={`input-day ${
              props.item.day.length < 2 && props.isSubmitted
                ? "border-danger"
                : ""
            }`}
            value={props.item.day}
            data-idx={props.item.idx}
            data-testid={`day${props.item.idx}`}
            onChange={props.handleDayChange}
            name="day"
            type="text"
            placeholder="DD"
            maxLength="2"
          ></input>
        </div>
        <div>
          <button
            className="delete-button"
            onClick={() => props.deleteDataArrayItem(props.item.idx)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidneyDiseaseDataArrayItem;
