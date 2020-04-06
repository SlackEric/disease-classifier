import React, { useState } from "react";
import { connect } from "react-redux";
import KidneyDiseaseDataArrayItem from "./KidneyDiseaseDataArrayItem";
import "../../sass/calculator.scss";
import "../../sass/kidneyDisease.scss";
import { getLatestData, sortDataByDate} from "../../utils/data";
import { showResult as showResultAction } from "../../redux/actions/kidneyDiseaseResultAction";
import kidneyDiseaseResult from "../../redux/reducers/kidneyDiseaseResultReducer";

function KidneyDiseaseInput(props) {
  const [kidneyDiseaseInputState, setKidneyDiseaseInputState] = useState({
    isSubmitted: false,
    isInputValid: false,
    dataArray: []
  });

  const addDataArrayItem = () => {
    const newDataItem = {
      idx: kidneyDiseaseInputState.dataArray.length,
      eGFR: "",
      year: "",
      month: "",
      day: ""
    };

    setKidneyDiseaseInputState({
      ...kidneyDiseaseInputState,
      isSubmitted: false,
      dataArray: [...kidneyDiseaseInputState.dataArray, newDataItem]
    });
  };

  const getClassificationResult = data => {
    if (data.eGFR >= 90) {
        return "Normal";
    } else if (data.eGFR >= 60 && data.eGFR <= 89) {
        return "Mildly Decreased";
    } else if (data.eGFR >=45 && data.eGFR <= 59) {
        return "Mild to Moderate";
    } else if (data.eGFR >= 30 && data.eGFR <= 44) {
        return "Moderate to Severe";
    } else if (data.eGFR >= 15 && data.eGFR <= 29) {
        return "Severly Decreased";
    } else {
        return "Kidney Failure";
    }
  }

  const getSuddenDropReadings = () => {
    const dataArray = [...kidneyDiseaseInputState.dataArray];
    const sortedDataArray = sortDataByDate(dataArray);
    const length = sortedDataArray.length;
    const dropReadings = [];

    for (let i = 0; i+1 < length; i++) {
        let eGFR1 = parseInt(sortedDataArray[i].eGFR);
        let eGFR2 = parseInt(sortedDataArray[i + 1].eGFR);
        if (eGFR1 > eGFR2) {
            let percentage = (eGFR1 - eGFR2) / eGFR1;
            if (percentage >= 0.2) {
                const readings = {firstReading: sortedDataArray[i], secondReading: sortedDataArray[i + 1], percentage: (percentage * 100).toFixed(2)+"%"};
                dropReadings.push(readings);
            }
        }
    }

    return dropReadings;
  }

  const validateInput = () => {
      let isInputValid = true;
      const dataArray = kidneyDiseaseInputState.dataArray;
      const length = dataArray.length;

      for (let i = 0; i < length; i++) {
        isInputValid = !Object.keys(dataArray[i]).some(
            key =>
              dataArray[i].eGFR.length === 0 ||
              dataArray[i].year.length < 4 ||
              dataArray[i].month.length < 2 ||
              dataArray[i].day.length < 2
          );
          if (!isInputValid) {
            return isInputValid;
          }
      }
      return isInputValid;  
  }

  const classifyKidneyDisease = () => {
      const isInputValid = validateInput();
      setKidneyDiseaseInputState({
        ...kidneyDiseaseInputState,
        isInputValid: isInputValid,
        isSubmitted: true
      });
      if (isInputValid && kidneyDiseaseInputState.dataArray.length > 0) {
        const dataArray = [...kidneyDiseaseInputState.dataArray];
        const latestData = getLatestData(dataArray);
        const result = getClassificationResult(latestData);
        const dropReadings = getSuddenDropReadings();

        const output = {
            result: "The classification result is: " + result,
            dropReadings: dropReadings
        };

        props.showResult(output);
      }
  }

  const handleeGFRChange = event => {
    const value = event.target.value.replace(/[^0-9]/, "");
    const idx = event.target.dataset.idx;
    const property = event.target.name;
    const dataArrayCopy = [...kidneyDiseaseInputState.dataArray];

    dataArrayCopy[idx][property] = value;

    setKidneyDiseaseInputState({
      ...kidneyDiseaseInputState,
      dataArray: dataArrayCopy
    });
  }

  const handleDateFormatChange = (format, event) => {
    const match = event.target.value.match(format);

    if (match) {
      const idx = event.target.dataset.idx;
      const property = event.target.name;
      const dataArrayCopy = [...kidneyDiseaseInputState.dataArray];
      dataArrayCopy[idx][property] = event.target.value;
      setKidneyDiseaseInputState({
        ...kidneyDiseaseInputState,
        dataArray: dataArrayCopy
      });
    }
  };

  const handleYearChange = event => {
    handleDateFormatChange(/^([1-9][0-9]{0,3}|[1-9]?)$/, event);
  };

  const handleMonthChange = event => {
    handleDateFormatChange(/^(0[1-9]?|1[0-2]?|[01]?)$/, event);
  };

  const handleDayChange = event => {
    handleDateFormatChange(/^(0[1-9]?|[12][0-9]?|3[01]?|[0-3]?)$/, event);
  };

  const clearAll = () => {
    setKidneyDiseaseInputState({
      isSubmitted: false,
      isInputValid: false,
      dataArray: []
    });
    const output = {
        result: "No classification result yet",
        dropReadings: []
    };

    props.showResult(output);
  };

  const deleteDataArrayItem = (idx) => {
    const dataArray = [...kidneyDiseaseInputState.dataArray];
    dataArray.splice(idx, 1);

    setKidneyDiseaseInputState({...kidneyDiseaseInputState, dataArray: dataArray});     
  }

  const warningMsgStyle =
  (kidneyDiseaseInputState.isSubmitted &&
    kidneyDiseaseInputState.isInputValid) ||
  !kidneyDiseaseInputState.isSubmitted
    ? { display: "none" }
    : {};

  return (
    <div className="row input-section">
      <div className="col-12">
        <div className="input-section__header">
          <label>Please input your eGFR data here:</label>
        </div>
      </div>
      <div className="col-12 input-section__content">
        <div className="row">
          {kidneyDiseaseInputState.dataArray.map(item => (
            <KidneyDiseaseDataArrayItem
              isSubmitted={kidneyDiseaseInputState.isSubmitted}
              item={item}
              key={item.idx}
              deleteDataArrayItem={deleteDataArrayItem}
              handleeGFRChange={handleeGFRChange}
              handleYearChange={handleYearChange}
              handleMonthChange={handleMonthChange}
              handleDayChange={handleDayChange}
            />
          ))}
          <div className="col-12">
            <div className="center-element">
              <button onClick={addDataArrayItem}>Add new data</button>
              <button onClick={clearAll}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="center-element">
          <button onClick={classifyKidneyDisease}>Submit</button>
        </div>
      </div>
      <div className="col-12">
        <div className="center-element">
          <p className="text-danger" style={warningMsgStyle}>
            Input Error!
          </p>
        </div>
      </div>           
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
    showResult: output => dispatch(showResultAction(output))
});

export default connect(null, mapDispatchToProps)(KidneyDiseaseInput);
