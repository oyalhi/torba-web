"use client";

import Image from "next/image";
import { Header } from "../components/header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen pt-12">
      <Header />
      {/* hero intro */}
      <div className="hero text-slate-300">
        <div className="hero max-w-screen-lg mx-auto py-4">
          <div className="hero-content lg:flex-row-reverse flex-col-reverse">
            <Image
              alt="hero"
              src="/app-home.png"
              className="max-w-sm rounded-4xl shadow-2xl"
              width={300}
              height={300}
            />
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
      <div className="hero bg-cyan-50 py-4 text-slate-900 border-b border-cyan-700">
        <div className="hero max-w-screen-lg mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-center">
              The Only Group Expense Tracking App You&apos;ll ever Need
            </h2>
            <p className="text-xl text-center py-4">Used by students, travelers, friends, couples, and families.</p>
          </div>
        </div>
      </div>
      <div className="hero bg-cyan-50 py-4 text-slate-900">
        <div className="hero max-w-screen-lg mx-auto">
          <div className="hero-content lg:flex-row flex-col">
            <Image
              alt="hero"
              src="/app-home.png"
              className="max-w-sm rounded-4xl shadow-2xl"
              width={300}
              height={300}
            />
            <div>
              <h2 className="text-3xl font-bold">Effortless Group Expense Management</h2>
              <p className="text-xl py-6">
                Create and manage expense lists for any group activity—be it holidays, sports teams, or shared
                households. Our intuitive interface makes it easy to add and track expenses, even offline or with
                unreliable internet connections.
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
              alt="hero"
              src="/app-home.png"
              className="max-w-sm rounded-4xl shadow-2xl"
              width={300}
              height={300}
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
              src="/app-home.png"
              className="max-w-sm rounded-4xl shadow-2xl"
              width={300}
              height={300}
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
              src="/app-home.png"
              className="max-w-sm rounded-4xl shadow-2xl"
              width={300}
              height={300}
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
