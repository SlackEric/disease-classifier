import React from "react";
import { connect } from "react-redux";

function KidneyDiseaseClassificationResult(props) {
  return (
    <div className="output-wrapper">
      <div>
        <p data-testid="kidney-disease-result">{props.output.result}</p>
      </div>
      {props.output.dropReadings.map(item => (
        <div className="border border-primary">
          <div className="readings-wrapper">
            <div className="reading-block">
              <p>Reading 1</p>
              <p>
                eGFR:{item.firstReading.eGFR} Date:{item.firstReading.year}/{item.firstReading.month}/
                {item.firstReading.day}
              </p>
            </div>
            <div className="reading-block">
              <p>Reading 2</p>
              <p>
                eGFR: {item.secondReading.eGFR} Date:{item.secondReading.year}/{item.secondReading.month}/{item.secondReading.day}
              </p>
            </div>
          </div>
          <div className="reading-block">
            <p>percentage: {item.percentage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  output: state.kidneyDiseaseResult.output
});

export default connect(mapStateToProps)(KidneyDiseaseClassificationResult);
