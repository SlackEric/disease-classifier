import "@testing-library/jest-dom"
import React from "react"
import {render, fireEvent, cleanup, wait} from "@testing-library/react"
import HypertensionInput from "../components/Hypertension/HypertensionInput";
import HypertensionClassificationResult from "../components/Hypertension/HypertensionClassificationResult";
import { Provider } from "react-redux";
import reducers from "../redux/reducers";
import { createStore } from "redux";

describe("Test Hypertension Calculator", ()=>{

    let hypertensionInput;
    let hypertensionClassificationResult;

    beforeEach(() => {
        const store = createStore(reducers);
        hypertensionInput = render(<Provider store={store}><HypertensionInput/></Provider>);
        hypertensionClassificationResult = render(<Provider store={store}><HypertensionClassificationResult/></Provider>);
    });

    afterEach(cleanup);

    function fillDataArray(dataArray) {
        dataArray.forEach(item => {
            fireEvent.click(hypertensionInput.getByText('Add new data'));
            expect(hypertensionInput.getAllByText(/SysBP/i)).toHaveLength(item.idx+1);
    
            const SysBPInput = hypertensionInput.getByTestId(`SysBP${item.idx}`);
            const DiaBPInput = hypertensionInput.getByTestId(`DiaBP${item.idx}`);
            const yearInput = hypertensionInput.getByTestId(`year${item.idx}`);
            const monthInput = hypertensionInput.getByTestId(`month${item.idx}`);
            const dayInput = hypertensionInput.getByTestId(`day${item.idx}`);
    
            fireEvent.change(SysBPInput, { target: { value: item.SysBP } });
            fireEvent.change(DiaBPInput, { target: { value: item.DiaBP } });
            fireEvent.change(yearInput, { target: { value: item.year } });
            fireEvent.change(monthInput, { target: { value: item.month } });
            fireEvent.change(dayInput, { target: { value: item.day } });
        });
    
        fireEvent.click(hypertensionInput.getByText('Submit'));
    }

    test('test first set of data', ()=> {  
        const dataArray = [
            {
                idx: 0,
                SysBP: 120,
                DiaBP: 90,
                year: 2018,
                month: 10,
                day: 31
            },
            {
                idx: 1,
                SysBP: 115,
                DiaBP: 100,
                year: 2018,
                month: 10,
                day: 20
            }];
        fillDataArray(dataArray);
        expect(hypertensionClassificationResult.getByTestId('hypertension-result').textContent).toEqual('The classfication result is: Stage 1');
    });
    
    test('test second set of data', ()=> {  
        const dataArray = [
            {
                idx: 0,
                SysBP: 100,
                DiaBP: 90,
                year: 2018,
                month: 10,
                day: 21
            },
            {
                idx: 1,
                SysBP: 180,
                DiaBP: 120,
                year: 2018,
                month: 10,
                day: 22
            }];
        fillDataArray(dataArray);
        expect(hypertensionClassificationResult.getByTestId('hypertension-result').textContent).toEqual('The classfication result is: Stage 3');
    });
});




