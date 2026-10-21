import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
export default function SiteApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
