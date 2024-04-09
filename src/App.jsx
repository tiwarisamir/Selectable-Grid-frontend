import "./App.css";
import SelectableGrid from "./components/SelectableGrid";

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="text-4xl font-semibold">Selectable Grid</h1>
      <SelectableGrid rows={10} cols={10} />
    </div>
  );
}

export default App;
