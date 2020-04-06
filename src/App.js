import React from "react";
import "./App.css";
import DiseaseClassifier from './components/DiseaseClassifier'

class App extends React.Component {
  render() {
	return (
		<div className="disease-classifier__container">
			<DiseaseClassifier/>
		</div>
	);
  }
}

export default App;
