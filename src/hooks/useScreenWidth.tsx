import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function useScreenWidth(): number {
  const [width, setWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handler = (event: any) => {
      setWidth(event.target.innerWidth);
    };

    Dimensions.addEventListener('change', handler);

    return () => {
      Dimensions.removeEventListener('change', handler);
    };
  }, []);

  return width;
}
