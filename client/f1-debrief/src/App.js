import './globals.css';
import F1RaceReport from './page';
import { F1DataProvider } from './context/F1DataContext';

function App() {
  return (
    <F1DataProvider>
      <div className="Results">
        <F1RaceReport />
      </div>
    </F1DataProvider>
  );
}

export default App;
