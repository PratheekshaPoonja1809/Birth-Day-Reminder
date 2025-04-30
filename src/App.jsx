import "./App.css";
import "tippy.js/dist/tippy.css";
import { BirthdayListComp } from "./BirthdayListComp";

function App() {
  return (
    <>
      <header className="app-header">
        <h1 className="app-name bounce">🎉 Remind Me B'Day</h1>
      </header>
      <BirthdayListComp/>
    </>
  );
}

export default App;
