import React from "react";

const HypertensionDataArrayItem = props => {
  return (
    <div className="col-12">
      <div className="hypertension-data-array">
        <div>
          <label>SysBP:</label>
          <input
            className={`input-data ${
              props.item.SysBP.length === 0 && props.isSubmitted
                ? "border-danger"
                : ""
            }`}
            type="text"
            value={props.item.SysBP}
            data-idx={props.item.idx}
            name="SysBP"
            data-testid={`SysBP${props.item.idx}`}
            onChange={props.handleBPChange}
          />
        </div>
        <div>
          <label>DiaBP:</label>
          <input
            className={`input-data ${
              props.item.DiaBP.length === 0 && props.isSubmitted
                ? "border-danger"
                : ""
            }`}
            type="text"
            value={props.item.DiaBP}
            data-idx={props.item.idx}
            name="DiaBP"
            data-testid={`DiaBP${props.item.idx}`}
            onChange={props.handleBPChange}
          />
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
            onChange={props.handleYearChange}
            type="text"
            placeholder="YYYY"
            maxLength="4"
            data-testid={`year${props.item.idx}`}
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
            onChange={props.handleMonthChange}
            type="text"
            placeholder="MM"
            maxLength="2"
            data-testid={`month${props.item.idx}`}
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
            onChange={props.handleDayChange}
            data-testid={`day${props.item.idx}`}
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

export default HypertensionDataArrayItem;
