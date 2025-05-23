import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SettingsCategory from "./components/pages/developer/settings/category/SettingsCategory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "../store/StoreContext";
import SettingsDesignation from "./components/pages/developer/settings/designation/SettingsDesignation";
import SettingsNotifications from "./components/pages/developer/settings/notifications/SettingsNotifications";
import DonorList from "./components/pages/developer/donor-list/DonorList";
import ChildrenList from "./components/pages/developer/children-list/ChildrenList";
import ExperienceList from "./components/pages/developer/settings/experiences/ExperienceList";
import ServiceList from "./components/pages/developer/settings/service/ServiceList";
import MainServiceList from "./components/pages/developer/service/MainServiceList";
import MainExperienceList from "./components/pages/developer/experience/MainExperienceList";

import WorkList from "./components/pages/developer/work/WorkList";
import AboutList from "./components/pages/developer/about/AboutList";
import TestimonialsList from "./components/pages/developer/testimonials/TestimonialsList";

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
              <Route path="/about" element={<AboutList />} />
              <Route path="/recent-works" element={<WorkList />} />
              <Route path="/testimonials" element={<TestimonialsList />} />
              <Route path="/services" element={<MainServiceList />} />
              <Route path="/experience" element={<MainExperienceList />} />

              <Route
                path="/settings/my-experience"
                element={<ExperienceList />}
              />

              <Route path="/settings/my-service" element={<ServiceList />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
