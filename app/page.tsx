import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            FlowChart Builder
          </h1>
          <p className="text-xl text-slate-600">
            Create interactive decision trees and flowcharts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/builder"
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Create New Flow
            </h2>
            <p className="text-slate-600 text-center">
              Start building a new decision tree from scratch
            </p>
          </Link>

          <Link
            href="/flows"
            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="h-16 w-16 bg-violet-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              My Flows
            </h2>
            <p className="text-slate-600 text-center">
              View and manage your existing flowcharts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
