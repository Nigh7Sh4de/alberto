import React from 'react';
import { useTurnContext } from 'src/hooks/Turn';

const NextSpace = ({ children }: { children: any }) => {
  const [, { nextTurn }] = useTurnContext();

  const nextTurnKeyHandler = (event: React.KeyboardEvent) => {
    console.log('DP', 'nextTurnKeyHandler', { event });
    if (event.code === 'Space') {
      nextTurn();
    }
  };

  return (
    <div tabIndex={0} onKeyDown={nextTurnKeyHandler}>
      {children}
    </div>
  );
};

export default NextSpace;
