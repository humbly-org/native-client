import React, {useState} from 'react';

export interface IWithHooksHOCProps {
  state: number;
  setState: (state: number) => void;
}

export const counterHOC = (Component: any): any => {
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
