export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Connection Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl">
            ⚡
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              GHL Custom Portal
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                API v2
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Location: <span className="text-slate-300 font-mono">loc_demo_888</span> • Simulator Mode Active
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "contacts"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Contacts Explorer
          </button>
          <button
            onClick={() => setActiveTab("opportunities")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "opportunities"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Pipeline Tracker
          </button>
          <button
            onClick={() => setActiveTab("webhooks")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === "webhooks"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Live Webhooks
          </button>
        </nav>
      </div>
    </header>
  );
}
