import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../2_redux/Actions/actionTypes';

const Header = () => {
  const dispatch = useDispatch();

  const nrOfNotifications = useSelector((state) => state.notificationReducer.nrOfNotifications);

  useEffect(() => {
    dispatch({ type: actionTypes.NOTIFICATION_UPDATE });
  }, [dispatch]);

  const toggleNotifications = () => {
    dispatch({ type: actionTypes.TOGGLE_NOTIFICATIONS });
  };

  return (
    <div className="header">
      <i className="icon icon--logo" />
      <button type="button" className=" button--icon header__notify" onClick={() => toggleNotifications()}>
        <i className="icon icon--notify" />
        <div className="notify__nr">{nrOfNotifications}</div>
      </button>
    </div>
  );
};

export default Header;
