import { AnyAction, configureStore, CombinedState , Reducer} from '@reduxjs/toolkit'
import counterReducer, {CounterState} from '../features/counter/counterSlice'

import { combineReducers } from '@reduxjs/toolkit';
//next-redux-wrapper 추가
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';

interface ReducerStates {
    counter : CounterState;
}


// ### 루트 리듀서 생성
// 1) next-redux-wrapper의 HYDRATE 액션을 정의해주고,
// 2) 슬라이스들을 통합한다.
// next-redux-wrapper의 사용 매뉴얼이므로 그냥 이대로 해주면 알아서 처리된다.
const rootReducer = (state: ReducerStates, action: AnyAction): CombinedState<ReducerStates> => {
    switch (action.type) {
      // next-redux-wrapper의 HYDRATE 액션 처리(그냥 이렇게만 해주면 된다.)
      case HYDRATE:
        return action.payload;
  
      // 슬라이스 통합
      default: {
        const combinedReducer = combineReducers({
          counter: counterReducer,
          // [couterSlice.name]: couterSlice.reducer,
          // [numberSlice.name]: numberSlice.reducer
        });
        return combinedReducer(state, action);
      }
    }
  };

// ### store 생성 함수
const makeStore = () => {

    
  // store 생성
  const store = configureStore({
    reducer: rootReducer as Reducer<ReducerStates, AnyAction>, // 리듀서
    // middleware: [...getDefaultMiddleware(), logger]
    devTools: process.env.NODE_ENV === 'development' // 개발자도구
  });

  // store 반환
  return store;
};


// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// })


export type AppStore = ReturnType<typeof makeStore>; // store 타입
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']; // dispatch 타입

// ### next-redux-wrapper의 wrapper 생성
const wrapper = createWrapper<AppStore>(makeStore, {
    debug: process.env.NODE_ENV === 'development'
  });
  
  // wrapper 익스포트
  export default wrapper;
   
