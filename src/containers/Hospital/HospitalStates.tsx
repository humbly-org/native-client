import React, {useState} from 'react';

export const hospitalHOC = (Component: any) => {
  return (props: any) => {
    const [state, setState] = useState(0);
    const componentProps = {
      ...props,
      state,
      setState,
    };

    return <Component {...componentProps} />;
  };
};
