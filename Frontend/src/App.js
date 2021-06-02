import FileUploadForm from './components/fileUploadForm';
import DropDown from './components/HtmlTags/DropDown.js';
import { useState } from 'react';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [value, setValue] = useState('');
  // const dropdownValues = ["OptionA", "OptionB", "OptionC"];
  const dropdownValues = ["OptionA", "OptionB", "OptionC", "OptionD"];

  return (
    <div className="App container">
      <FileUploadForm />
      {/* <DropDown setSelected={setValue} dropdownValues={dropdownValues} title={"Option"} id={"DropdownBtn"} /> */}
    </div>
  );

}

export default App;
