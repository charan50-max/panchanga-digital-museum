import { BrowserRouter, Routes, Route } from "react-router-dom";
import CosmicIntro from "./components/animations/CosmicIntro";
import Input from "./pages/Input";
import Museum from "./pages/Museum";
import Quiz from "./pages/Quiz";

function Welcome() {
  return <CosmicIntro />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/input" element={<Input />} />

        <Route path="/museum" element={<Museum />} />

        <Route path="/quiz" element={<Quiz />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;