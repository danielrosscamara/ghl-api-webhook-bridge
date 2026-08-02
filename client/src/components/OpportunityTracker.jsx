import { useState, useEffect } from "react";

export default function OpportunityTracker() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api/ghl";

  useEffect(() => {
    let isMounted = true;

    const loadOpportunities = async () => {
      try {
        const res = await fetch(`${API_BASE}/opportunities`);
        const data = await res.json();
        if (isMounted && data.success) {
          setOpportunities(data.opportunities);
        }
      } catch (err) {
        console.error("Failed to load opportunities:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOpportunities();

    return () => {
      isMounted = false;
    };
  }, [API_BASE]);

  // Calculate pipeline total value
  const totalPipelineValue = opportunities.reduce((acc, curr) => acc + (curr.monetaryValue || 0), 0);

  return (
    <div className="space-y-6">
      {/* Pipeline Summary Card */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">GHL Sales Pipeline</h2>
          <p className="text-xs text-slate-400">Tracking active deal stages across sub-account opportunities</p>
        </div>
        <div className="bg-indigo-600/10 border border-indigo-500/20 px-6 py-3 rounded-xl text-right">
          <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider">Total Pipeline Value</p>
          <p className="text-2xl font-black text-indigo-300 font-mono">${totalPipelineValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading sales pipeline...</div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-12 text-slate-400">No active opportunities found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-lg">{opp.name}</h3>
                  <p className="text-xs font-mono text-slate-500">{opp.id}</p>
                </div>
                <span className="text-base font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
                  ${opp.monetaryValue.toLocaleString()}
                </span>
              </div>

              {/* Stage Progress Bar Badge */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Current Stage</span>
                  <span className="text-sm font-semibold text-indigo-300">{opp.stageName}</span>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
                  {opp.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
