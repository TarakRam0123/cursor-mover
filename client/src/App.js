import { useState, useEffect } from "react";
import API from "./api";

function App() {
  const [status, setStatus] = useState("INACTIVE");

  const getStatus = async () => {
    try {
      const res = await API.get("/mouse/status");
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  const activate = async () => {
    try {
      const res = await API.post("/mouse/activate");
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const deactivate = async () => {
    try {
      const res = await API.post("/mouse/deactivate");
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Cursor Mover</h1>

      <div className="status">
        Status:
        <span
          className={
            status === "ACTIVE"
              ? "active"
              : "inactive"
          }
        >
          {status}
        </span>
      </div>

      <div className="buttons">
        <button
          className="activate-btn"
          onClick={activate}
        >
          Activate
        </button>

        <button
          className="deactivate-btn"
          onClick={deactivate}
        >
          Deactivate
        </button>
      </div>
    </div>
  );
}

export default App;