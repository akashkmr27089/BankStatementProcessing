import FileUploadForm from './components/fileUploadForm';
import CircleGraph from './components/Graph/CircleGraph';
import DoughnutChart from './components/Graph/DoughnutChart';
import ApexPieChart from './components/Graph/ApexPieChart';


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const state = {
    series: [44, 55, 41, 17],
    chartOptions: {
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
  };
  return (
    <div className="App container">
      <FileUploadForm />
    </div>
  );
}

export default App;
