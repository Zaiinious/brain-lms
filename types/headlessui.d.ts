declare module "@headlessui/react" {
  import * as React from 'react';

  // Minimal ambient declarations so `Dialog` can be used in JSX without
  // requiring the real package types during development in this repo.
  export const Dialog: React.ElementType & {
    Overlay: React.ElementType;
    Panel: React.ElementType;
    Title: React.ElementType;
  };
}
