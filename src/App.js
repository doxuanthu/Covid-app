import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";

function App() {
  return (
    <div className="app-container">
      <CountrySelector />
      <HighLight />
      <Summary />
    </div>
  );
}

export default App;
