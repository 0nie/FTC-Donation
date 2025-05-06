import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SettingsCategory from './components/pages/developer/settings/category/SettingsCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <div className='h-dvh w-screen flex items-center justify-center'>
              <h3>Page Not Found</h3>
            </div>
          }
        />

        <Route path="/settings/category/" element={<SettingsCategory/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
