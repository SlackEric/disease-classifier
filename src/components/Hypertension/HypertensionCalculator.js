import React from 'react';
import HypertensionInput from './HypertensionInput';
import HypertensionClassificationResult from './HypertensionClassificationResult';
import '../../sass/hypertension.scss';

function HypertenstionCalculator() {
    return (
        <div className="row calculator">
            <div className="col-7"><HypertensionInput/></div>
            <div className="col-5"><HypertensionClassificationResult/></div>
        </div>
    );
}

export default HypertenstionCalculator;