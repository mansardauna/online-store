import App from "./App";
import { useDarkMode } from "./components/ui/components/DarkMode";

export const AppWrapper =()=>{
const { isDarkMode } = useDarkMode();

return (
  <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
    <App />
  </div>
);
}