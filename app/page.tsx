import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex-1 flex justify-center items-center'>
      home page
      <Link href="/login">login</Link>
    </main>
  );
}
