import "./App.css";
import { Route, Routes } from "react-router-dom";
import Calculator from "./component/calculator/Calculator";
import { VenuesList } from "./component/venues_list/VenuesList";
import Template from "./component/Template";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Calculator />}></Route>
        <Route path="/venuelist" element={<VenuesList />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
