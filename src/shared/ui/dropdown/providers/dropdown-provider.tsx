'use client';

import type { Dispatch, HTMLAttributes, RefObject, SetStateAction } from 'react';
import { createContext, useContext, useRef, useState } from 'react';

import { DropdownRoot } from '../components/dropdown-root';

type DropdownContextValue = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
};

type Props = HTMLAttributes<HTMLDivElement>;

const DropdownContext = createContext<DropdownContextValue | null>(null);

export const DropdownProvider = ({ children, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef, contentRef }}>
      <DropdownRoot {...props}>{children}</DropdownRoot>
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('<DropdownProvider/> 내에서 사용 가능합니다.');
  }

  return context;
};
