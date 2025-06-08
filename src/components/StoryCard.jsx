import React from 'react';
import { Link } from 'react-router-dom';

const StoryCard = ({ story }) => {
  return (
    <Link 
      to={`/stories/${story.id}`}
      className="block p-6 bg-white rounded-lg border border-neutral-slate hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      <h3 className="font-montserrat font-bold text-xl text-neutral-charcoal mb-2">
        {story.title}
      </h3>
      <p className="font-lato text-neutral-slate line-clamp-3">
        {story.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-neutral-slate">
          By {story.author}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-primary font-montserrat">
            {story.votes} votes
          </span>
          {story.isPriority && (
            <span className="text-xs bg-primary bg-opacity-10 text-primary px-2 py-1 rounded">
              Priority
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StoryCard; 