import { contextFactory } from '../lib/context';

import { TODOSState, Action, INITIAL_STATE } from './reducer';

export const { useSelector, Context, useDispatch } = contextFactory<
    TODOSState,
    Action
>(INITIAL_STATE);
