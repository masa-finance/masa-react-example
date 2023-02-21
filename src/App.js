import logo from "./logo.svg";
import "./App.scss";
import { MasaProvider, useMasa } from "@masa-finance/masa-react";

import "@masa-finance/masa-react/dist/style.css";

const MasaRequiredComponent = () => {
  const { connect } = useMasa();

  const handleConnect = () => {
    connect({
      scope: [],
      callback: () => {
        alert("Hey I am connected!, now I can do whatever I want");
      },
    });
  };
  
  return <div onClick={handleConnect}>Hey! Connect with masa!</div>;
};

function App() {
  return (
    <MasaProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <MasaRequiredComponent />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </MasaProvider>
  );
}

export default App;
