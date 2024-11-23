import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { errorLog, log } from '../utils/logsUtils';
import { ReduxState, NavigationRedux, VoidFunction } from '../types/types.d';

const useBackPress = () => {
  const { stack } = useSelector<ReduxState, NavigationRedux>(
    state => state.navigation,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack(undefined));
    } else {
      const res = navigate(-1);
      if (res instanceof Promise) {
        res
          .then(() => {
            log('user back clicked!!!');
          })
          .catch((err: Error) => {
            errorLog('error while navigating back', err);
          });
      }
    }
  }, [stack]);

  window.backPress = handleBackPress;

  useEffect(() => {
    beforeUnload.subscribe(() => {
      log('😬 user back clicked!!');
    });

    return () => {
      beforeUnload.unSubscribe();
    };
  }, []);

  const push = (callback: VoidFunction) => {
    dispatch(pushStack(callback));
  };

  const pop = () => {
    handleBackPress();
  };

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack(undefined));
    }
  }, [stack]);

  return { stack, push, pop, clear };
};

export default useBackPress;
