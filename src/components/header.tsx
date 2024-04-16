import Image from "next/image";
import { appConfig } from "../utils/app-config";

export function Header() {
  return (
    <nav className="px-4 py-2 fixed top-0 bg-cyan-950 z-10 w-full">
      <div className="max-w-screen-lg mx-auto flex flex-row items-center">
        <Image src="/logo.png" alt="logo" className="h-10 w-10" width={80} height={80} />
        <h1 className="text-white text-2xl font-bold ml-4">Torba Split Cost</h1>

        <div className="flex-grow" />

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            window.location.href = appConfig.clientUrl;
          }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}
