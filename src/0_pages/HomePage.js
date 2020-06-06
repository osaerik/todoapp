import React from 'react';
import ToDo from '../1_components/Todo/Todo';
import Header from '../1_components/Header/Header';
import Notifications from '../1_components/Notifications/Notifications';

const HomePage = () => (
  <>
    <Header />
    <div className="homepage">
      <div className="homepage__todolist">
        <ToDo />
      </div>
      <div className="homepage__notifications">
        <Notifications />
      </div>
    </div>
  </>
);

export default HomePage;
