import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/pluginPage/ui/Plugin';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
