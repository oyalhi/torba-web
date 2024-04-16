"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
            <div className="hero bg-transparent text-slate-300 relative">
              <div className="rounded-4xl overflow-hidden">
                <Image
                  style={{ left: "45px", top: "-30px" }}
                  alt="hero"
                  src="/iphone-15-pro.png"
                  className="rounded-4xl absolute z-0"
                  width={360}
                  height={351}
                />
                <iframe
                  className="rounded-4xl z-10 relative"
                  id="player"
                  width="300"
                  height="651"
                  src="https://www.youtube.com/embed/4ZCQGkUnbzw?rel=0&autohide=1&showinfo=0&wmode=opaque"
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold">Split expenses quickly and easily, online or offline</h1>
              <p className="text-xl py-6">
                &quot;Torba Split Cost&quot; is your go-to free tool for managing shared expenses with friends and
                family effortlessly.
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
              style={{ boxShadow: "0 0px 10px 6px rgba(0, 0, 0, 0.1)" }}
              alt="hero"
              src="/undraw_team_spirit_re_yl1v.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Quick and Simple</h2>
              <p className="text-xl py-6">
                Experience seamless navigation with our mobile-optimized design. Each page presents only essential
                information, avoiding clutter. Interactive fields expand only when clicked, making data entry
                efficient—just tap, update, and move on. The app intuitively guides you from creating groups to viewing
                detailed transactions and settings, with each action smoothly leading you to relevant pages without
                unnecessary steps.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 2 */}
      <div className="hero py-4 bg-cyan-900 text-slate-300">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <Image
              style={{ boxShadow: "0 0px 10px 6px rgba(255, 255, 255, 0.1)" }}
              alt="hero"
              src="/devices.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Universal Compatibility</h2>
              <p className="text-xl py-6">
                Our app is built as a Progressive Web App (PWA), ensuring flawless operation across all devices, whether
                iPhone, Android, or desktop. Designed to function both online and offline, it can be added to your home
                screen or desktop for an app-like experience. This feature allows you to access all functionalities of
                our app with the convenience of native applications, promoting a seamless user experience on any
                platform.
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
              style={{ boxShadow: "0 0px 10px 6px rgba(0, 0, 0, 0.1)" }}
              alt="hero"
              src="/offline.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Always Accessible</h2>
              <p className="text-xl py-6">
                Our app prioritizes your ability to manage finances without interruption, ensuring functionality both
                online and offline. All data is stored locally first, allowing you to continue your activities even
                without an internet connection. Changes are seamlessly synchronized across all your devices once
                connectivity is restored, maintaining data integrity and providing a consistent experience no matter
                where you are.
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
              style={{ boxShadow: "0 0px 10px 6px rgba(255, 255, 255, 0.1)" }}
              alt="hero"
              src="/graphic.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Flexible Splitting</h2>
              <p className="text-xl py-6">
                Tailor expense sharing to fit any scenario with our adjustable weight system. Each participant can have
                a set weight, reflecting their share in expenses, ranging from an equal split to a weighted division
                based on consumption or participation. This allows for precise financial management whether splitting
                costs equally, by percentage, or in unequal shares, catering to various needs like family units or
                individual preferences within groups.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 5 */}
      <div className="hero bg-cyan-50 py-4 text-slate-900">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row flex-col">
            <Image
              style={{ boxShadow: "0 0px 10px 6px rgba(0, 0, 0, 0.1)" }}
              alt="hero"
              src="/world.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Multi-Currency Support</h2>
              <p className="text-xl py-6">
                Manage expenses in any currency with our versatile currency management system. Each group can define and
                use an unlimited number of currencies, setting specific exchange rates that remain constant across all
                transactions. The settlement calculations are based on the group&apos;s designated home currency,
                simplifying financial management across different monetary units while maintaining consistency in
                reporting and reconciliation.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* hero feature 6 */}
      <div className="hero py-4 text-slate-300">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <Image
              style={{ boxShadow: "0 0px 10px 6px rgba(255, 255, 255, 0.1)" }}
              alt="hero"
              src="/real-time-sync.svg"
              className="max-w-sm rounded-4xl shadow-2xl p-4"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-3xl font-bold">Cloud Sync</h2>
              <p className="text-xl py-6">
                Ensure your financial data is always up-to-date across all your devices with our basic cloud sync
                feature. This synchronization allows for seamless data consistency, whether you&apos;re switching
                between devices or ensuring all entries are current. It&apos;s ideal for users who operate the app on
                multiple platforms, providing a unified view of their finances no matter where they access it from.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
