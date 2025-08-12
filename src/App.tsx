import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import AppsGrid from './pages/AppsGrid';
import AppDetails from './pages/AppDetails';
import ComponentsPage from './pages/Components';
import IdeasPage from './pages/Ideas';
import SwipeDeck from './pages/SwipeDeck';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SwipeDeck />} />
        <Route path="hand" element={<SwipeDeck />} />
        <Route path="apps" element={<AppsGrid />} />
        <Route path="apps/:id" element={<AppDetails />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="ideas" element={<IdeasPage />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
