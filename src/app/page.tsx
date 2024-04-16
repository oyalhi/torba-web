"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Header } from "../components/header";

export default function Home() {
  // state
  const [isClient, setIsClient] = useState(false);

  // effects
  useEffect(() => {
    setIsClient(true);
  }, []);

  // render
  return (
    <main className="flex flex-col h-screen pt-12">
      <Header />
      {/* show youtube player */}

      {/* hero intro */}
      <div className="hero text-slate-300">
        <div className="hero max-w-screen-lg mx-auto py-4">
          <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <div className="hero bg-transparent text-slate-300">
              {/* <Image
                style={{ position: "absolute" }}
                alt="hero"
                src="/iphone-15-pro.png"
                className="max-w-sm rounded-4xl shadow-2xl"
                width={350}
                height={300}
              /> */}
              {isClient ? (
                <ReactPlayer
                  config={{
                    youtube: {
                      playerVars: {
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        start: 1,
                        autoplay: 1,
                      },
                      embedOptions: {
                        allowfullscreen: false,
                        frameBorder: 0,
                        allow: "autoplay;",
                      },
                    },
                  }}
                  fallback={
                    <Image
                      alt="hero"
                      src="/app-home.png"
                      className="max-w-sm rounded-4xl shadow-2xl"
                      width={300}
                      height={300}
                    />
                  }
                  height={300 * 2.1679}
                  lazy="true"
                  pip={false}
                  playing
                  playsinline
                  url="https://youtu.be/4ZCQGkUnbzw"
                  width={300}
                />
              ) : (
                <Image
                  alt="hero"
                  src="/app-home.png"
                  className="max-w-sm rounded-4xl shadow-2xl"
                  width={300}
                  height={300}
                />
              )}
            </div>
            <div>
              <h1 className="text-5xl font-bold">Split expenses quickly and easily, online or offline</h1>
              <p className="text-xl py-6">
                Torba Split Cost is a free tool to split expenses with your friends and family.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 1 */}
      <div className="hero bg-cyan-50 py-24 text-slate-900">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row flex-col">
            <Image
              alt="hero"
              src="/undraw_team_spirit_re_yl1v.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">The Only Group Expense Tracking App You&apos;ll ever Need</h2>
              <p className="text-xl py-6">Used by students, travelers, friends, couples, and families.</p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 2 */}
      <div className="hero py-4 bg-cyan-900 text-slate-300">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <Image
              alt="hero"
              src="/undraw_digital_currency_qpak.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Multi-Currency Support with Real-Time Sync</h2>
              <p className="text-xl py-6">
                Support for over 100 currencies, coupled with real-time cloud synchronization, ensures that your expense
                tracking is accurate and secure, no matter where you are. Subscribe for enhanced cloud features that
                backup data seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 3 */}
      <div className="hero bg-cyan-50 py-4 text-slate-900">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row flex-col">
            <Image
              alt="hero"
              src="/undraw_printing_invoices_-5-r4r.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Innovative Settlement Solutions</h2>
              <p className="text-xl py-6">
                Discover the most efficient way to settle expenses using our smart algorithm, which minimizes the number
                of transactions needed for clearing balances. View detailed reports and suggested repayments to simplify
                debts.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 4 */}
      <div className="hero py-4 text-slate-300">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <Image
              alt="hero"
              src="/undraw_internet_on_the_go_re_vben.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Stay Informed On the Go</h2>
              <p className="text-xl py-6">
                Get immediate updates about your finances even without direct payment integrations. Our app allows you
                to monitor who owes you and whom you owe, with easy-to-manage notifications and reminders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
