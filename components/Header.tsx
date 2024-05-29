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
  web3FromSource,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useState } from "react";
import config from "../config.json";
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from "@polkadot/extension-inject/types";
import Button from "@/components/Button";
import { stringToHex } from "@polkadot/util";
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

  const signMessage = async (accounts: InjectedAccountWithMeta[]) => {
    if (accounts.length == 0) {
      toast.error("Please connect your wallet first");
      return;
    }
    const account = accounts[0];

    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await web3FromSource(account.meta.source);

    // this injector object has a signer and a signRaw method
    // to be able to sign raw bytes
    const signRaw = injector?.signer?.signRaw;

    if (!!signRaw) {
      // after making sure that signRaw is defined
      // we can use it to sign our message
      const { signature } = await signRaw({
        address: account.address,
        data: stringToHex(
          "I am signing this message to prove that I own this account"
        ),
        type: "bytes",
      });
      setAccountsConnected(accounts);
      console.log(signature);
    }
  };
  const connectExtension = async () => {
    if (accountConnected.length > 0) return;
    let activeExtension: InjectedExtension[] = await web3Enable(
      config.APP_NAME
    );

    if (activeExtension.length == 0) {
      toast.error("Please install Polkadot extension to connect (Talisman)");
      return;
    }
    setActiveConnection(activeExtension);

    let accounts: InjectedAccountWithMeta[] = [];
    activeExtension
      ? (accounts = await web3Accounts())
      : console.log("No Accounts Found");

    // sign message
    await signMessage(accounts);
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
