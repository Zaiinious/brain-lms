declare module "@headlessui/react" {
  import * as React from 'react';

  // Minimal ambient declarations so `Dialog` can be used in JSX without
  // requiring the real package types during development in this repo.
  export const Dialog: React.ComponentType<any> & {
    Overlay: React.ComponentType<any>;
    Panel: React.ComponentType<any>;
    Title: React.ComponentType<any>;
  };
}
