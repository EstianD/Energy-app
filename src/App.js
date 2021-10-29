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
// import useSearchInput from "./Services/useSearchInput";

function App() {
  const [selectedArea, setSelectedArea] = useState({
    areaCode: "WORL",
    name: "World",
  });
  const { data, loading } = useFetchData(selectedArea);

  console.log("DATA IN COMPONENT: ", data);
  console.log("SELECTED AREA: ", selectedArea);

  return (
    <div className="App">
      <div className="search-container">
        <SearchInput setSelectedArea={setSelectedArea} />
      </div>
      {loading && <p>Loading...</p>}
      {data && (
        <>
          <div className="total-energy-container">
            <TotalEnergyChart
              totalElectricity={data[1]}
              totalPopulation={data[0]}
              selectedArea={selectedArea}
            />
          </div>
          <div className="energy-sources-container">
            <div className="renewable-energy-container">
              <RenewableEnergyChart
                hydro={data[4]}
                wind={data[3]}
                solar={data[2]}
                geothermal={data[6]}
                biomass={data[7]}
              />
            </div>
            <div className="energy-breakdown-container">
              <EnergyBreakdownChart
                fossilFuel={data[5]}
                hydro={data[4]}
                wind={data[3]}
                solar={data[2]}
                geothermal={data[6]}
                biomass={data[7]}
                nuclear={data[8]}
              />
            </div>
          </div>
          <div className="co2-emmisions-container">
            <CoEmissionsChart
              coalEmissions={data[9]}
              naturalGasEmissions={data[10]}
              patroleumEmissions={data[11]}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
