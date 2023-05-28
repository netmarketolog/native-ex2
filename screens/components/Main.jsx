import { Default } from '../mainScreen/Default/Default';
import { useRoute } from '../../router';
import { NavigationContainer } from '@react-navigation/native';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoggedIn } from '../redux/selectors';
import { refreshUser } from '../redux/auth/authOperations';

export const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const routing = useRoute();

  return (
    <NavigationContainer>
      {isLoggedIn ? <Default /> : routing}
    </NavigationContainer>
  );
};
