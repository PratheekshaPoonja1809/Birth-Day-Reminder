import "./App.css";
import "tippy.js/dist/tippy.css";
import { BirthdayListComp } from "./BirthdayListComp";
import { SessionContext } from "./utils/Constants";
import { useState } from "react";

function App() {
  const [session, setSession] = useState([]);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      <header className="app-header">
        <h1 className="app-name bounce">🎉 Remind Me B'Day</h1>
      </header>
      <BirthdayListComp/>
    </SessionContext.Provider>
  );
}

export default App;
