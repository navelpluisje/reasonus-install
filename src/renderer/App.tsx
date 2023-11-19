import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Content } from './components/atoms/Content';
import { Page } from './components/atoms/Page';
import { Sidebar } from './components/organisms/Sidebar';
import { useCsiApi } from './hooks/useCsiApi';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Install } from './pages/Install';
import { ReaperPath } from './pages/ReaperPath';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchReaperPath } from './store/settings/actions';
import { getReaperPath } from './store/settings/selectors';

export const App = () => {
  const paths = ['/home', '/functions', '/about', '/install', '/path'];
  const location = useLocation();
  const dispatch = useAppDispatch();
  const reaperPath = useAppSelector(getReaperPath);
  const appRoot = document.getElementById('app');

  useCsiApi();

  useEffect(() => {
    const setClass = async () => {
      const className = await window.reasonusAPI.getOS();
      appRoot.classList.add(className);
    };
    dispatch(fetchReaperPath());
    setClass();
  }, []);

  if (!reaperPath) {
    return (
      <Page>
        <Sidebar/>  
        <Content>
          <ReaperPath />
        </Content>
      </Page>
    );
  }

  return (
    <Page>
      <Sidebar/>  
      <Content>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/install" element={<Install />} />
          <Route path="/about" element={<About />} />
          <Route path="/path" element={<ReaperPath />} />
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
        {!paths.includes(location.pathname) && (
          <Navigate replace to="/home" />
        )}
      </Content>
    </Page>
  );
};
