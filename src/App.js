import "./App.css";
import { useState, useEffect } from "react";

// Import components
import SearchInput from "./components/search/SearchInput";
import TotalEnergyChart from "./components/TotalEnergyChart/TotalEnergyChart";
import RenewableEnergyChart from "./components/RenewableEnergyChart/RenewableEnergyChart";
import EnergyBreakdownChart from "./components/EnergyBreakdown/EnergyBreakdownChart";
import CoEmissionsChart from "./components/CoEmissionsChart/CoEmissionsChart";
// Import hooks
import useFetchData from "./Services/useFetchData";

function App() {
  const [selectedArea, setSelectedArea] = useState(["WORL"]);
  const { data } = useFetchData(selectedArea);
  return (
    <div className="App">
      <div className="search-container">
        <SearchInput />
      </div>
      <div className="total-energy-container">
        <TotalEnergyChart />
      </div>
      <div className="energy-sources-container">
        <div className="renewable-energy-container">
          <RenewableEnergyChart />
        </div>
        <div className="energy-breakdown-container">
          <EnergyBreakdownChart />
        </div>
      </div>
      <div className="co2-emmisions-container">
        <CoEmissionsChart />
      </div>
    </div>
  );
}

export default App;
