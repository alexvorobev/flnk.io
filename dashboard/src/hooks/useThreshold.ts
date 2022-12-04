import { useCallback, useRef } from 'react';

export const useThreshold = <T>(onChangeState?: (event: T) => void, threshold?: number) => {
  const timer = useRef<NodeJS.Timeout>();

  const handleChange = useCallback(
    (event: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        onChangeState?.(event);
      }, threshold ?? 100);
    },
    [onChangeState, threshold],
  );

  return handleChange;
};
