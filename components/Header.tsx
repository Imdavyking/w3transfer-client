"use client";
import { act, useContext, useEffect, useLayoutEffect } from "react";
import { HeaderContentContext } from "@/contexts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useState } from "react";
import config from "../config.json";
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from "@polkadot/extension-inject/types";
import Button from "@/components/Button";
type Props = {};

const ellipsis = (address: string): string => {
  return `${address.substring(5, 0)}...${address.substring(
    address.length - 5
  )}`;
};

const Header = ({}: Props) => {
  const {
    content,
    setContent,
    contentRight,
    setContentRight,
    contentLeft,
    setContentLeft,
  } = useContext(HeaderContentContext);
  const [activeConnection, setActiveConnection] = useState<InjectedExtension[]>(
    []
  );
  const [accountConnected, setAccountsConnected] = useState<
    InjectedAccountWithMeta[]
  >([]);

  const connectExtension = async () => {
    let activeExtension: InjectedExtension[] = await web3Enable(
      config.APP_NAME
    );

    if (activeExtension.length == 0) {
      console.log("hee");
      toast.error("Please install Polkadot extension to connect (Talisman)");
      return;
    }
    setActiveConnection(activeExtension);

    let accounts: InjectedAccountWithMeta[] = [];
    activeExtension
      ? (accounts = await web3Accounts())
      : console.log("No Accounts Found");
    setAccountsConnected(accounts);
  };

  const path = usePathname();
  // reset header to default so page can control which what show
  useLayoutEffect(() => {
    setContent!(undefined);
    setContentRight!(undefined);
    setContentLeft!(undefined);
  }, [path]);

  return (
    <header className="bg-white border-b border-gray-custom-100">
      <Toaster />
      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-5 flex justify-between overflow-hidden">
        {content ||
          (!contentLeft && !contentRight && (
            <Link
              href="/"
              className="md:text-xl font-bold text-gray-custom-300"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
          ))}
        {!content && (contentRight || contentLeft) && (
          <span>
            {contentLeft || (
              <Link
                href="/"
                className="md:text-xl font-bold text-gray-custom-300"
              >
                {process.env.NEXT_PUBLIC_APP_NAME}
              </Link>
            )}
            {contentRight}
          </span>
        )}
        <Button className="uppercase" onPress={connectExtension}>
          {accountConnected.length > 0
            ? ellipsis(accountConnected[0].address)
            : "Connect"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
