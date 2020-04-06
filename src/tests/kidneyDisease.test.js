import "@testing-library/jest-dom"
import React from "react"
import {render, fireEvent, cleanup, wait} from "@testing-library/react"
import KidneyDiseaseInput from "../components/KidneyDisease/KidneyDiseaseInput";
import KidneyDiseaseClassificationResult from "../components/KidneyDisease/KidneyDiseaseClassificationResult";
import { Provider } from "react-redux";
import reducers from "../redux/reducers";
import { createStore } from "redux";
import kidneyDiseaseResult from "../redux/reducers/kidneyDiseaseResultReducer";

describe("Test Kidney Disease Calculator", () => {
    let kidneyDiseaseInput;
    let kidneyDiseaseClassificationResult;

    beforeEach(() => {
        const store = createStore(reducers);
        kidneyDiseaseInput = render(<Provider store={store}><KidneyDiseaseInput/></Provider>);
        kidneyDiseaseClassificationResult = render(<Provider store={store}><KidneyDiseaseClassificationResult/></Provider>);
    });

    afterEach(cleanup);

    function fillDataArrayItem(dataArrayItem) {
        dataArrayItem.forEach(item => {
            fireEvent.click(kidneyDiseaseInput.getByText('Add new data'));
            expect(kidneyDiseaseInput.getAllByText(/eGFR:/i)).toHaveLength(item.idx+1);

            const eGFRInput = kidneyDiseaseInput.getByTestId(`eGFR${item.idx}`);
            const yearInput = kidneyDiseaseInput.getByTestId(`year${item.idx}`);
            const monthInput = kidneyDiseaseInput.getByTestId(`month${item.idx}`);
            const dayInput = kidneyDiseaseInput.getByTestId(`day${item.idx}`);

            fireEvent.change(eGFRInput, { target: { value: item.eGFR } });
            fireEvent.change(yearInput, { target: { value: item.year } });
            fireEvent.change(monthInput, { target: { value: item.year } });
            fireEvent.change(dayInput, { target: { value: item.day }})
        });

        fireEvent.click(kidneyDiseaseInput.getByText('Submit'));
    }

    test("Test the first set of data", () => {
        const dataArray = [
            {
                idx: 0,
                eGFR: 65,
                year: 2018,
                month: 10,
                day: 31
            },
            {
                idx: 1,
                eGFR: 70,
                year: 2018,
                month: 10,
                day: 20
            }
        ];

        fillDataArrayItem(dataArray);
        wait(()=>expect(kidneyDiseaseClassificationResult.getByTestId('kidney-disease-result').textContent).toEqual('The classification result is: Mildly Decreased'));
    });

    test("Test the second set of data", () => {
        const dataArray = [
            {
                idx: 0,
                eGFR: 90,
                year: 2018,
                month: 10,
                day: 11
            },
            {
                idx: 1,
                eGFR: 120,
                year: 2018,
                month: 10,
                day: 10
            },
            {
                idx: 2,
                eGFR: 60,
                year: 2018,
                month: 10,
                day: 12
            }
        ];

        fillDataArrayItem(dataArray);
        wait(()=>expect(kidneyDiseaseClassificationResult.getByTestId('kidney-disease-result').textContent).toEqual('The classification result is: Mildly Decreased'));
    });
});