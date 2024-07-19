import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import ActionPanel from "./components/ActionPanel";
import Footer from "./components/Footer";

function App() {
  const [reportPage, setReportPage] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Header
        reportPage={reportPage}
        setClicked={setClicked}
        setReportPage={setReportPage}
      />
      <main>
        <ActionPanel
          clicked={clicked}
          setClicked={setClicked}
          setReportPage={setReportPage}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
