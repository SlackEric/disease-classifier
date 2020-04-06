import React from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import HypertensionCalculator from './Hypertension/HypertensionCalculator';
import KidneyDiseaseCalculator from './KidneyDisease/KidneyDiseaseCalculator';

function DiseaseClassifier() {
    return (
        <Tabs defaultActiveKey="hypertensionCalculator" id="diseaseClassifier">
            <Tab eventKey="hypertensionCalculator" title="Hypertension Calculator">
                <HypertensionCalculator/>
            </Tab>
            <Tab eventKey="kidneyDiseaseCalculator" title="Kidney Disease Calculator">
                <KidneyDiseaseCalculator/>
            </Tab>
        </Tabs>
    );
}

export default DiseaseClassifier;