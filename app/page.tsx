import Image from "next/image";
import Link from "next/link";
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

const [activeConnection, setActiveConnection] = useState<InjectedExtension[]>(
  []
);
const [accountConnected, setAccountsConnected] = useState<
  InjectedAccountWithMeta[]
>([]);

export default function Home() {
  const connectExtension = async () => {
    let activeExtension: InjectedExtension[] = await web3Enable(
      config.APP_NAME
    );
    setActiveConnection(activeExtension);

    let accounts: InjectedAccountWithMeta[] = [];
    activeExtension
      ? (accounts = await web3Accounts())
      : console.log("No Accounts Found");
    setAccountsConnected(accounts);
  };
  return (
    <main className="flex-1 flex justify-center items-center">
      home page
      <Link href="/login">login</Link>
      <button
        onClick={connectExtension}
        style={{ width: "150px" }}
        className="font-semibold bg-black text-white p-3 text-white rounded-xl text-2xl cursor-pointer py-2 px-5"
      >
        {accountConnected.length > 0
          ? `${accountConnected[0].address.substring(
              3,
              0
            )}...${accountConnected[0].address.substring(
              accountConnected[0].address.length - 3
            )}`
          : "Connect"}
      </button>
    </main>
  );
}
