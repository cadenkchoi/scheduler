import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(() => newMode)
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory(() => replaceHistory);
    } else {
      setMode(() => newMode);
      let newHistory = [...history];
      newHistory.push(newMode);
      setHistory(() => newHistory);
    }
  };

  const back = () => {
     let newHistory = [...history];
    newHistory.pop(mode);
    setHistory(() => newHistory);
    if (history.length > 1) {
      setMode(() => newHistory[(newHistory.length - 1)]);
    }
  };

  return { mode, transition, back };
}