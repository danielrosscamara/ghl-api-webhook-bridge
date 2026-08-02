import { useState, useEffect, useCallback } from "react";

export default function WebhookLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerStatus, setTriggerStatus] = useState("");

  const API_BASE = "http://localhost:5000/api";

  const refreshLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/webhooks/logs`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error("Failed to fetch webhook logs:", err);
    }
  }, [API_BASE]);

  useEffect(() => {
    let isMounted = true;

    const loadLogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/webhooks/logs`);
        const data = await res.json();
        if (isMounted && data.success) {
          setLogs(data.logs);
        }
      } catch (err) {
        console.error("Failed to load webhook logs:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLogs();
    const interval = setInterval(loadLogs, 3000); // Auto-poll every 3 seconds for live webhooks

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [API_BASE]);

  // Simulate triggering a GHL Webhook event
  const triggerSimulatedEvent = async (type) => {
    try {
      setTriggerStatus(`Firing '${type}'...`);
      const res = await fetch(`${API_BASE}/ghl/simulate-trigger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type })
      });
      const data = await res.json();
      if (data.success) {
        setTriggerStatus(`✅ Trigger '${type}' logged!`);
        await refreshLogs();
        setTimeout(() => setTriggerStatus(""), 2500);
      }
    } catch (err) {
      console.error("Failed to fire simulated event:", err);
      setTriggerStatus("❌ Trigger failed to fire");
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Simulator Banner */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Live Webhook Event Log
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </h2>
            <p className="text-xs text-slate-400">
              Capturing HTTP POST triggers sent from GoHighLevel Workflows (auto-refreshing every 3s)
            </p>
          </div>
          {triggerStatus && (
            <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-xl animate-fade-in">
              {triggerStatus}
            </span>
          )}
        </div>

        {/* Trigger Simulator Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Simulate GHL Triggers:</span>
          <button
            onClick={() => triggerSimulatedEvent("ContactCreated")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-xl transition-all"
          >
            + Contact Created Trigger
          </button>
          <button
            onClick={() => triggerSimulatedEvent("OpportunityStageUpdate")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-xl transition-all"
          >
            + Stage Changed Trigger
          </button>
          <button
            onClick={() => triggerSimulatedEvent("FormSubmission")}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded-xl transition-all"
          >
            + Form Submission Trigger
          </button>
        </div>
      </div>

      {/* Webhook Log List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Connecting to webhook log buffer...</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-12 text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
          No webhooks received yet. Click one of the simulation buttons above to fire a test trigger!
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  {log.event}
                </span>
                <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              <pre className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl overflow-x-auto border border-slate-850">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
