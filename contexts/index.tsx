'use client'
import {NextUIProvider} from "@nextui-org/react";
import { createContext, Dispatch, SetStateAction, useState, ReactNode } from 'react';

export type HeaderContentType = {
  content?: ReactNode
  setContent?: Dispatch<SetStateAction<ReactNode>>
  contentRight?: ReactNode
  setContentRight?: Dispatch<SetStateAction<ReactNode>>
  contentLeft?: ReactNode
  setContentLeft?: Dispatch<SetStateAction<ReactNode>>
}
// TODO: remember to check context on route change

const defaultHeaderContent = {
  content: undefined,
  setContent: (content:ReactNode) => {},
  contentRight: undefined,
  setContentRight: (content:ReactNode) => {},
  contentLeft: undefined,
  setContentLeft: (content:ReactNode) => {},
} as HeaderContentType
export const HeaderContentContext = createContext(defaultHeaderContent)

export function Providers({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const [headerContent, setHeaderContent] = useState<ReactNode>(undefined)
  const [headerRightContent, setHeaderRightContent] = useState<ReactNode>(undefined)
  const [headerLeftContent, setHeaderLeftContent] = useState<ReactNode>(undefined)
  
  return (
    <HeaderContentContext.Provider value={{
      content: headerContent,
      setContent: setHeaderContent,
      contentRight: headerRightContent,
      setContentRight: setHeaderRightContent,
      contentLeft: headerLeftContent,
      setContentLeft: setHeaderLeftContent,
    }}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </HeaderContentContext.Provider>
  );
}