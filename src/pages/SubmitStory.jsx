import React, { useState } from "react";
import Button from '../components/Button';

export default function SubmitStory() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPriority: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [priorityActive, setPriorityActive] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    setPriorityActive(false);

    // Basic validation
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      setSubmitting(false);
      return;
    }

    try {
      // 1. Submit the story first
      const submitRes = await fetch("/api/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title, content: formData.content }),
      });
      
      const submitData = await submitRes.json();
      console.log('Submit Story Response:', submitRes.status, submitData);
      
      if (!submitRes.ok) {
        throw new Error(submitData.message || "Failed to submit story");
      }
      
      const storyId = submitData.storyId;

      // 2. If user checked "Make Priority", create priority session
      if (formData.isPriority) {
        const priorityRes = await fetch("/api/create-priority-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ storyId, amount: 500 }),
        });
        
        const priorityData = await priorityRes.json();
        console.log('Create Priority Session Response:', priorityRes.status, priorityData);
        
        if (!priorityRes.ok) {
          throw new Error(priorityData.message || "Failed to create priority session");
        }
        setPriorityActive(true);
      }

      // Reset form or show success message as needed
      alert("Story submitted successfully!");
      setFormData({
        title: '',
        content: '',
        isPriority: false
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="font-montserrat font-bold text-3xl text-neutral-charcoal mb-8">
        Share Your Tennis Story
      </h1>
      
      {error && (
        <div className="mb-4 text-red-600 font-semibold">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-lato text-neutral-charcoal mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-neutral-slate rounded-md font-lato"
            required
          />
        </div>

        <div>
          <label className="block font-lato text-neutral-charcoal mb-2">
            Your Story
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 border border-neutral-slate rounded-md font-lato h-48"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="priority"
            checked={formData.isPriority}
            onChange={(e) => setFormData({ ...formData, isPriority: e.target.checked })}
            className="w-4 h-4 text-primary"
          />
          <label htmlFor="priority" className="font-lato text-neutral-charcoal">
            Make Priority ($5)
          </label>
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Story"}
        </Button>

        {priorityActive && (
          <div className="mt-4 text-green-700 font-semibold">
            ✅ Priority Active.
          </div>
        )}
      </form>
    </div>
  );
}
