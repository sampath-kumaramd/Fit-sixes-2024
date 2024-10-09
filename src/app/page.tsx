"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return <div>
    Home
    <button onClick={() => router.push('/auth/sign-up')}>Register</button>
  </div>;
}

