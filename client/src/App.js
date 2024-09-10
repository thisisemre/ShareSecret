import React, { useState } from "react";
import './App.css';
import Secret from './components/Secret';
import NewSecret from "./components/NewSecret";

function App() {
  const [secretAdded, setSecretAdded] = useState(false);

  const handleSecretAdded = () => {
    setSecretAdded(true);
  };
  const handleSecretsFinished = ()=>{
    alert("Seceets finished");
    setSecretAdded(false);
  }

  return (
    <div className="app-container">
      
      {!secretAdded ? (
        <NewSecret onSecretAdded={handleSecretAdded} />
      ) : (
        <Secret onSecretsFinished={handleSecretsFinished} />
      )}
    </div>
  );
}

export default App;
