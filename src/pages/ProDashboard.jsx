import React, { useEffect, useState } from "react";
import Button from '../components/Button';

export default function ProDashboard({ userEmail }) {
  const [userStatus, setUserStatus] = useState({
    isPro: false,
    trialEnds: null,
    nextBillingDate: null
  });
  const [metrics, setMetrics] = useState({
    trials: 0,
    activeSubs: 0,
    nextBillingDate: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check user status
  const fetchUserStatus = async () => {
    try {
      const res = await fetch("/api/user-status");
      const data = await res.json();
      console.log('User Status Response:', res.status, data);
      setUserStatus(data);
    } catch (err) {
      setError("Failed to load user status.");
    }
  };

  // Fetch Pro metrics
  const fetchProMetrics = async () => {
    try {
      const res = await fetch("/api/pro-metrics");
      const data = await res.json();
      console.log('Pro Metrics Response:', res.status, data);
      setMetrics(data);
    } catch (err) {
      setError("Failed to load pro metrics.");
    }
  };

  // Start trial
  const startTrial = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pro-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      console.log('Pro Trial Response:', res.status, data);
      
      if (data.success) {
        setUserStatus(prev => ({
          ...prev,
          isPro: true,
          trialEnds: data.trialEnds
        }));
        alert(`Trial started! Ends on ${new Date(data.trialEnds).toLocaleDateString()}`);
      } else {
        alert("Trial could not be started.");
      }
    } catch (err) {
      alert("Error starting trial.");
    } finally {
      setLoading(false);
    }
  };

  // Create subscription
  const createSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: "footballpro_monthly", email: userEmail }),
      });
      const data = await res.json();
      console.log('Create Subscription Response:', res.status, data);
      
      if (res.ok) {
        setUserStatus(prev => ({
          ...prev,
          isPro: true
        }));
        alert("Subscription created! Check your email for confirmation.");
        await fetchUserStatus();
        await fetchProMetrics();
      } else {
        alert("Subscription failed.");
      }
    } catch (err) {
      alert("Error creating subscription.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      await fetchUserStatus();
      await fetchProMetrics();
      setLoading(false);
    }
    fetchAll();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-accentWhite text-charcoal font-lato p-6 max-w-4xl mx-auto">
      <h1 className="font-montserrat text-primaryGreen text-4xl font-bold mb-8 text-center">
        TennisPro Dashboard
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">{error}</div>
      )}

      {!userStatus.isPro ? (
        <div className="space-y-6">
          <div className="bg-primary bg-opacity-10 p-6 rounded-lg">
            <h2 className="font-montserrat font-bold text-xl text-primary mb-4">
              Upgrade to FootballPro
            </h2>
            <ul className="space-y-2 font-lato text-neutral-charcoal">
              <li>✓ Unlimited Priority Submissions</li>
              <li>✓ 10 free vote credits/month</li>
              <li>✓ Access to monthly "Top Tales" analytics</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <Button onClick={startTrial}>
                Start Free Trial
              </Button>
              <Button variant="ghost" onClick={createSubscription}>
                Subscribe Now ($10/month)
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-neutral-slate bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-montserrat font-bold text-lg mb-2">
                Vote Credits
              </h3>
              <p className="text-2xl font-bold text-primary">10</p>
              <p className="text-sm text-neutral-slate">Free monthly credits</p>
            </div>
            
            <div className="bg-neutral-slate bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-montserrat font-bold text-lg mb-2">
                Priority Stories
              </h3>
              <p className="text-2xl font-bold text-primary">Unlimited</p>
              <p className="text-sm text-neutral-slate">Priority submissions</p>
            </div>
            
            <div className="bg-neutral-slate bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-montserrat font-bold text-lg mb-2">
                Next Billing
              </h3>
              <p className="text-2xl font-bold text-primary">
                {new Date(userStatus.nextBillingDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-neutral-slate">Monthly subscription</p>
            </div>
          </div>

          <div className="border-t border-neutral-slate pt-6">
            <h2 className="font-montserrat font-bold text-xl mb-4">
              Monthly Analytics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-neutral-slate p-4 rounded-lg">
                <p className="text-sm text-neutral-slate">Active Subscribers</p>
                <p className="text-2xl font-bold text-neutral-charcoal">
                  {metrics.activeSubs}
                </p>
              </div>
              <div className="bg-white border border-neutral-slate p-4 rounded-lg">
                <p className="text-sm text-neutral-slate">Trial Users</p>
                <p className="text-2xl font-bold text-neutral-charcoal">
                  {metrics.trials}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
