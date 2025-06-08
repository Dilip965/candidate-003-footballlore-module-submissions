import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-accentWhite text-charcoal font-lato">
      {/* Hero Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="font-montserrat font-bold text-5xl text-primaryGreen mb-6">
          Welcome to TennisLore
        </h1>
        <p className="text-lg mb-10 max-w-xl mx-auto">
          A community-driven platform where tennis fans share match-point tales, court-side memories, and personal tennis narratives.
        </p>
        <a
          href="/submit-story"
          className="inline-block bg-primaryGreen text-accentWhite font-semibold py-3 px-8 rounded shadow hover:bg-green-700 transition"
        >
          Share Your Story
        </a>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Community Voting",
            desc: "Vote for your favorite stories and help highlight the best tennis tales.",
          },
          {
            title: "Priority Submissions",
            desc: "Boost your story’s visibility with premium priority submissions.",
          },
          {
            title: "Tournament Sponsorships",
            desc: "Support tournaments and enjoy exclusive content and rewards.",
          },
        ].map(({ title, desc }, i) => (
          <div
            key={i}
            className="border border-charcoal border-opacity-30 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            style={{ borderStyle: "dotted" }} // subtle net-style border
          >
            <h3 className="font-montserrat font-bold text-primaryGreen mb-2">{title}</h3>
            <p className="text-slateGray text-sm">{desc}</p>
          </div>
        ))}
      </section>

      {/* Latest Stories Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-montserrat font-bold text-3xl text-primaryGreen mb-8 text-center">
          Latest Tennis Stories
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[1, 2].map((storyId) => (
            <div
              key={storyId}
              className="border border-charcoal border-opacity-30 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold mb-3 text-charcoal">Exciting Match Point #{storyId}</h3>
              <p className="text-slateGray text-sm line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium, massa nec lacinia vehicula, justo urna consequat velit, eu finibus elit magna nec lacus.
              </p>
              <a
                href={`/stories/${storyId}`}
                className="inline-block mt-4 text-primaryGreen font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-accentWhite py-6 mt-16 text-center text-sm">
        <p>© 2025 TennisLore. All rights reserved.</p>
      </footer>
    </div>
  );
}
