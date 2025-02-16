import { createContext, useContext, useMemo, useState, useEffect } from "react";
import LocalStorageUtil from "@/lib/local-storage";
import { useGetUserQuery } from "@/pages/auth/services/queries";

import Pusher from "pusher-js";

const StateContext = createContext({
  currentUser: {},
  token: null,
  setUser: () => {},
  setToken: () => {},
  isAuthenticated: false,
});

const ModalContext = createContext({
  visible: false,
  target: null,
  options: {},
});

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    currentUser: {},
    initToken: null,
    isAuthenticated: false,
  });

  const [isOpen, setIsOpen] = useState({
    visible: false,
    target: null,
    options: {},
  });

  const [event, setEvent] = useState({
    pooling: false,
    flag: "",
    payload: {
      customer: {},
      notification: {},
    },
  });
  let accessToken = LocalStorageUtil.readLocalStorage("access_token");
  const [token, _setToken] = useState(accessToken);

  const { data } = useGetUserQuery();

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      LocalStorageUtil.writeLocalStorage("access_token", token);
    } else {
      LocalStorageUtil.removeLocalStorage("access_token");
    }
  };

  useEffect(() => {
    if (!token) {
      setToken(user?.initToken);
    }
  }, [user.initToken]);

  useEffect(() => {
    if (token) {
      setUser({
        ...user,
        initToken: user?.initToken,
        currentUser: data?.data,
        isAuthenticated: true,
      });
    }
  }, [token, data]);

  useEffect(() => {
    let pusher;
    let channel;
    Pusher.logToConsole = false;
    pusher = new Pusher(import.meta.env.VITE_APP_PUSHERSOCKETS_ID, {
      cluster: import.meta.env.VITE_APP_PUSHER_CLUSTER,
    });

    channel = pusher.subscribe("voice-channel");
    channel.bind("notification-event", function (data) {
      setEvent({
        ...event,
        pooling: true,
        flag: data.flag,
        payload: {
          customer: data.customer,
          notification: data.notification,
        },
      });
    });
    return () => {
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
    };
  }, [setEvent]);

  useEffect(() => {
    if (event.pooling) {
      setEvent({
        ...event,
        pooling: false,
        flag: "",
        payload: { customer: {}, notification: {} },
      });
    }
  }, [event.pooling]);

  const stateValue = useMemo(
    () => ({ user, setUser, token, setToken, event, setEvent }),
    [user, token, event]
  );

  const modalValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <StateContext.Provider value={stateValue}>
      <ModalContext.Provider value={modalValue}>
        {children}
      </ModalContext.Provider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const useModalContext = () => useContext(ModalContext);
