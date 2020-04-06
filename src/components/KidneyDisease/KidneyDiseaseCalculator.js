import React from 'react';
import KidneyDiseaseInput from './KidneyDiseaseInput';
import KidneyDiseaseClassificationResult from './KidneyDiseaseClassificationResult';

function KidneyDiseaseCalculator() {
    return (
        <div className="row calculator">
            <div className="col-6"><KidneyDiseaseInput/></div>
            <div className="col-6"><KidneyDiseaseClassificationResult/></div>
        </div>
    );    
}

export default KidneyDiseaseCalculator;