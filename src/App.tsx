import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import AppsGrid from './pages/AppsGrid';
import AppDetails from './pages/AppDetails';
import ComponentsPage from './pages/Components';
import IdeasPage from './pages/Ideas';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="apps" element={<AppsGrid />} />
        <Route path="apps/:id" element={<AppDetails />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="ideas" element={<IdeasPage />} />
      </Route>
    </Routes>
  );
}
