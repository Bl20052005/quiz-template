import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Python from "./pages/Python";
import MultipleChoice from "./pages/MultipleChoice";
import PythonNav from "./pages/PythonNav";
import MutipleChoiceResults from "./pages/MutipleChoiceResults";
import MultipleChoiceStart from "./pages/MultipleChoiceStart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}></Route>
        <Route path="33" element={<Python />}>
          <Route index element={<PythonNav />}></Route>
          <Route path="mcq">
            <Route index element={<MultipleChoiceStart />}></Route>
            <Route path="quiz/:qs/:time?" element={<MultipleChoice />}>
              <Route path="results" element={<MutipleChoiceResults />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
