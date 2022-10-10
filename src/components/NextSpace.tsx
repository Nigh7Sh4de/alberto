import React from 'react';
import { useTurnContext } from 'src/hooks/Turn';

const NextSpace = ({ children }: { children: React.ReactElement[] }) => {
  const [, { nextTurn }] = useTurnContext();

  console.log('DP', 'nextTurnKeyHandler', 'render');
  const nextTurnKeyHandler = (event: React.KeyboardEvent) => {
    console.log('DP', 'nextTurnKeyHandler', { event });
    debugger;
    if (event.code === 'Space') {
      nextTurn(1);
    }
  };

  return <div tabIndex={0} onKeyDown={nextTurnKeyHandler}></div>;
};

export default NextSpace;
