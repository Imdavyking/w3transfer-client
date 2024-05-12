'use client'
import {NextUIProvider} from "@nextui-org/react";
import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

export type HeaderContentType = {
  content?: React.ReactNode
  setContent?: Dispatch<SetStateAction<HeaderContentType['content']>>
  contentRight?: React.ReactNode
  setContentRight?: Dispatch<SetStateAction<HeaderContentType['content']>>
  contentLeft?: React.ReactNode
  setContentLeft?: Dispatch<SetStateAction<HeaderContentType['content']>>
}
// TODO: remember to check context on route change

const defaultHeaderContent = {
  content: undefined,
  setContent: (content:HeaderContentType['content']) => {},
  contentRight: undefined,
  setContentRight: (content:HeaderContentType['content']) => {},
  contentLeft: undefined,
  setContentLeft: (content:HeaderContentType['content']) => {},
} as HeaderContentType
export const HeaderContentContext = createContext(defaultHeaderContent)

export function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerContent, setHeaderContent] = useState<HeaderContentType['content']>(undefined)
  const [headerRightContent, setHeaderRightContent] = useState<HeaderContentType['content']>(undefined)
  const [headerLeftContent, setHeaderLeftContent] = useState<HeaderContentType['content']>(undefined)
  
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