
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Calculator from "./component/Calculator";
import { VenuesList } from "./component/VenuesList";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Calculator />}></Route>
      <Route path="venuelist" element={<VenuesList />}></Route>
    </Routes>
  );
}

export default App;
