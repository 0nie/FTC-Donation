import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SettingsCategory from "./components/pages/developer/settings/category/SettingsCategory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "../store/StoreContext";
import SettingsDesignation from "./components/pages/developer/settings/designation/SettingsDesignation";
import SettingsNotifications from "./components/pages/developer/settings/notifications/SettingsNotifications";
import DonorList from "./components/pages/developer/donor-list/DonorList";
import ChildrenList from "./components/pages/developer/children-list/ChildrenList";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route
                path="*"
                element={
                  <div className="h-dvh w-screen flex items-center justify-center">
                    <h3>Page Not Found</h3>
                  </div>
                }
              />

              <Route path="/" element={<DonorList />} />
              <Route path="/donor" element={<DonorList />} />

              <Route
                path="/settings/category/"
                element={<SettingsCategory />}
              />

              {/* Added SettingsDesignation Route */}
              <Route
                path="/settings/designation"
                element={<SettingsDesignation />}
              />

              <Route
                path="/settings/notifications"
                element={<SettingsNotifications />}
              />

              <Route path="/children-list" element={<ChildrenList />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
