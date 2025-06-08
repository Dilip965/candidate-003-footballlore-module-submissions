import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '../components/Button';

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [voteCredits, setVoteCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to get story details
    const fetchStory = async () => {
      try {
        // This would be replaced with actual API call
        const response = await fetch(`/api/stories/${id}`);
        const data = await response.json();
        setStory(data);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleVote = async () => {
    if (voteCredits > 0) {
      try {
        // This would be replaced with actual API call
        await fetch(`/api/stories/${id}/vote`, {
          method: 'POST',
        });
        setVoteCredits(prev => prev - 1);
        setStory(prev => ({
          ...prev,
          votes: prev.votes + 1
        }));
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  };

  const handleBuyVotePack = async () => {
    try {
      // This would be replaced with actual API call
      const response = await fetch('/api/create-vote-pack-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pack: 5,
          amount: 300
        }),
      });
      
      if (response.ok) {
        // Handle successful purchase
        setVoteCredits(prev => prev + 5);
      }
    } catch (error) {
      console.error('Error purchasing vote pack:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!story) {
    return <div className="text-center p-8">Story not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <article className="bg-white rounded-lg border border-neutral-slate p-8">
        <h1 className="font-montserrat font-bold text-3xl text-neutral-charcoal mb-4">
          {story.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-6">
          <span className="text-neutral-slate">By {story.author}</span>
          <span className="text-primary font-montserrat">
            {story.votes} votes
          </span>
        </div>

        <div className="prose max-w-none font-lato text-neutral-charcoal">
          {story.content}
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-slate">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleVote}
              disabled={voteCredits === 0}
            >
              Vote ({voteCredits} credits left)
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleBuyVotePack}
            >
              Buy 5 Votes ($3)
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
