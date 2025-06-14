import "./App.css";
import { AddTodoForm } from "./components/AddTodoForm";
import { ProgressBar } from "./components/ProgressBar";
import { ThemeSelector } from "./components/ThemeSelector";
import { TodoStats } from "./components/TodoStats";

function App() {
  return (
    <div className="flex flex-col">
      <p className="p-6">hi</p>
      <p className="p-5">hi2</p>
      <ThemeSelector />
      <AddTodoForm />
    </div>
  );
}

export default App;
