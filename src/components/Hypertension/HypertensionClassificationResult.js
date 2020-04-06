import React from "react";
import { connect } from "react-redux";

function HypertensionClassificationResult(props) {
  return (
    <div>
      <p data-testid="hypertension-result">{props.result}</p>
    </div>
  );
}

const mapStateToProps = state => ({
  result: state.hypertensionResult.result
});

export default connect(mapStateToProps)(HypertensionClassificationResult);
