import React, { useState } from "react";
import { connect } from "react-redux";
import HypertensionDataArrayItem from "./HypertensionDataArrayItem";
import "../../sass/calculator.scss";
import "../../sass/hypertension.scss";
import { getLatestData } from "../../utils/data";
import { showResult as showResultAction } from "../../redux/actions/hypertensionResultAction";

function HypertensionInput(props) {
  const [hypertensionInputState, setHypertensionInputState] = useState({
    isSubmitted: false,
    isInputValid: false,
    dataArray: []
  });

  const addDataArrayItem = () => {
    const newDataItem = {
      idx: hypertensionInputState.dataArray.length,
      SysBP: "",
      DiaBP: "",
      year: "",
      month: "",
      day: ""
    };

    setHypertensionInputState({
      ...hypertensionInputState,
      isSubmitted: false,
      dataArray: [...hypertensionInputState.dataArray, newDataItem]
    });
  };

  const getClassificationResult = data => {
    if (data.SysBP >= 180 && data.DiaBP >= 120) {
      return "Stage 3";
    } else if (
      (data.SysBP >= 160 && data.SysBP < 180) ||
      (data.DiaBP >= 100 && data.DiaBP < 110)
    ) {
      return "Stage 2";
    } else if (
      (data.SysBP >= 140 && data.SysBP < 160) ||
      (data.DiaBP >= 90 && data.DiaBP < 100)
    ) {
      return "Stage 1";
    } else {
      return "No Hypertension";
    }
  };

  const validateInput = () => {
    let isInputValid = true;
    const dataArray = hypertensionInputState.dataArray;
    const length = dataArray.length;

    for (let i = 0; i < length; i++) {
      isInputValid = !Object.keys(dataArray[i]).some(
        key =>
          dataArray[i].SysBP.length === 0 ||
          dataArray[i].DiaBP.length === 0 ||
          dataArray[i].year.length < 4 ||
          dataArray[i].month.length < 2 ||
          dataArray[i].day.length < 2
      );

      if (!isInputValid) {
        return isInputValid;
      }
    }
    return isInputValid;
  };

  const classifyHypertension = () => {
    const isInputValid = validateInput();
    setHypertensionInputState({
      ...hypertensionInputState,
      isInputValid: isInputValid,
      isSubmitted: true
    });

    if (isInputValid && hypertensionInputState.dataArray.length > 0) {
      const dataArrayCopy = [...hypertensionInputState.dataArray];
      const latestData = getLatestData(dataArrayCopy);
      const result = getClassificationResult(latestData);
      props.showResult("The classfication result is: " + result);
    }
  };

  const handleBPChange = event => {
    const value = event.target.value.replace(/[^0-9]/, "");
    const idx = event.target.dataset.idx;
    const property = event.target.name;
    const dataArrayCopy = [...hypertensionInputState.dataArray];

    dataArrayCopy[idx][property] = value;

    setHypertensionInputState({
      ...hypertensionInputState,
      dataArray: dataArrayCopy
    });
  };

  const handleDateFormatChange = (format, event) => {
    const match = event.target.value.match(format);

    if (match) {
      const idx = event.target.dataset.idx;
      const property = event.target.name;
      const dataArrayCopy = [...hypertensionInputState.dataArray];
      dataArrayCopy[idx][property] = event.target.value;
      setHypertensionInputState({
        ...hypertensionInputState,
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
    setHypertensionInputState({
      isSubmitted: false,
      isInputValid: false,
      dataArray: []
    });
    props.showResult("No classification result yet");
  };

  const deleteDataArrayItem = (idx) => {
    const dataArray = [...hypertensionInputState.dataArray];
    dataArray.splice(idx, 1);

    setHypertensionInputState({...hypertensionInputState, dataArray: dataArray});
  }

  const warningMsgStyle =
    (hypertensionInputState.isSubmitted &&
      hypertensionInputState.isInputValid) ||
    !hypertensionInputState.isSubmitted
      ? { display: "none" }
      : {};

  return (
    <div className="row input-section">
      <div className="col-12">
        <div className="input-section__header">
          <label>Please input your blood pressure data here:</label>
        </div>
      </div>
      <div className="col-12 input-section__content">
        <div id="dataItemList" className="row">
          {hypertensionInputState.dataArray.map(item => (
            <HypertensionDataArrayItem
              isSubmitted={hypertensionInputState.isSubmitted}
              item={item}
              deleteDataArrayItem={deleteDataArrayItem}
              handleBPChange={handleBPChange}
              handleYearChange={handleYearChange}
              handleMonthChange={handleMonthChange}
              handleDayChange={handleDayChange}
              key={item.idx}
            />
          ))}
          <div className="col-12">
            <div className="center-element">
              <button name="addNewData" onClick={addDataArrayItem}>Add new data</button>
              <button name="reset" onClick={clearAll}>Reset</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="center-element">
          <button onClick={classifyHypertension}>Submit</button>
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
  showResult: result => dispatch(showResultAction(result))
});

export default connect(null, mapDispatchToProps)(HypertensionInput);
