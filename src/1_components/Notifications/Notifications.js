import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../2_redux/Actions/actionTypes';

const ToDo = () => {
  const localStorageLocation = 'notifications';

  const notifications = useSelector((state) => state.dataReducer.notifications);
  const showNotifications = useSelector((state) => state.notificationReducer.showNotifications);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.GET_ALL_DATA, item: localStorageLocation });
  }, [dispatch]);

  const deleteNotification = (data) => {
    dispatch({ type: actionTypes.DELETE_DATA, data, item: localStorageLocation });
  };

  return (
    <>
      {showNotifications && (
        <div className="notifications">
          {notifications.map((item) => (
            <div className={`notifications__notification notifications__notification--${item.action}`} key={item.id}>
              <div className="notifications__colorbar" />
              <div className="notifications__item">
                <div className="notifications__header">
                  <div className="notifications__title">
                    {`Task ${item.action}`}
                  </div>
                  <button
                    type="button"
                    className="button--icon"
                    aria-label="Delete notification"
                    onClick={() => deleteNotification(item)}
                  >
                    <i className="icon icon--close " />
                  </button>
                </div>
                <div className="notifications__text">
                  {item.text}
                </div>
                <div className="notifications__datetime">
                  {`Item added ${item.datetime}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ToDo;
