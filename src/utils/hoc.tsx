import React, {useState} from 'react';
// import {useScreenWidth} from '../hooks';

export const withHooksHOC = (Component: any): any => {
  return (props: any) => {
    const [state, setState] = useState(0);

    return <Component state={state} setState={setState} {...props} />;
  };
};
