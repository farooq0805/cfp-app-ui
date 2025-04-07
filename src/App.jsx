//import "./App.css";
import CFPCalculator from "./cfp";
import Logo from "./assets/cfpc_logo.png";
function App() {
  return (
    <>
      <img src={Logo} alt="Logo" className="logo" width={200} />

      <h2 className="header">Carbon Foot Print Calculator</h2>

      <CFPCalculator />
    </>
  );
}

export default App;
