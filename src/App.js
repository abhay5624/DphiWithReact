import Home from "./Pages/Home";
import Challanges from "./Pages/Challanges";
import EditChallanges from "./Pages/EditChallanges";
import Header from "./Components/Header";
import { data } from "./Data";
import { useSelector } from "react-redux/es/exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateChallenge from "./Pages/CreateChallenge";
function App() {
  const ChallangData = useSelector((state) => state);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challanges/:id" element={<Challanges />} />
          <Route path="/createchallange" element={<CreateChallenge />} />
          <Route path="/editschallanges/:id" element={<EditChallanges />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
