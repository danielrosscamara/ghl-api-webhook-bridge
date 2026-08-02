import { useState } from "react";
import Header from "./components/Header";
import ContactExplorer from "./components/ContactExplorer";
import OpportunityTracker from "./components/OpportunityTracker";
import WebhookLogViewer from "./components/WebhookLogViewer";

export default function App() {
  const [activeTab, setActiveTab] = useState("contacts");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "contacts" && <ContactExplorer />}
        {activeTab === "opportunities" && <OpportunityTracker />}
        {activeTab === "webhooks" && <WebhookLogViewer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>GHL Custom Developer Portal</p>
      </footer>
    </div>
  );
}
