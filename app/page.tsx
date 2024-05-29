"use client";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex-1 flex justify-center items-center">
      home page
      <Link href="/login">login</Link>
      <Toaster />
    </main>
  );
}
