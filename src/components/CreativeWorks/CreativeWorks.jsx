import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Shelf from "./Shelf";
import VinylPlayer from "./VinylPlayer";
import StoryReader from "./StoryReader";

const CreativeWorks = () => {
  // Sample album data - replace with your actual albums
  const albums = [
    {
      id: 1,
      title: "Strange Weather in Manila",
      year: "2023",
      cover: "/images/albums/swim.jpg", // Replace with your album art
      color: "#8b5cf6", // Purple theme color
      trackPreview: "/audio/tangerine-dream.mp3", // Replace with actual audio file
      description: `Strange Weather in Manila, abbreviated as S.W.I.M., is my 
      first solo studio album released under Uprising Records Philippines. 
      Heavily inspired by Korean and Japanese sample-based production styles of 
      hip-hop, paired with a heavy influence in JRPG compositions, the lyrics 
      of the album are deeply emotional and often convey a sense of 
      vulnerability, exploring themes such as love, justice, loneliness, 
      nostalgia, personal identity, and redemption.`,
      spotifyLink:
        "https://open.spotify.com/album/3G1NiOG3C2L75Qkec8t82Q?si=xui8CpioSRWdthNUySSkNg",
      lyrics:
        "Faltering conditions of long-running friendships forcibly sustained will fulminate to soul-crushing endings",
    },
    {
      id: 2,
      title: "Serenata",
      year: "2017",
      cover: "/images/albums/fmdd.jpg",
      color: "#ec4899", // Pink theme color
      trackPreview: "/audio/one-night.mp3",
      description: `Serenata is my collaborative hip-hop project with Soupherb.
      For My Daydream Dalliance is the output of our heartfelt work, comprised 
      of tales and narratives ranging from overnight adventures and dead flames 
      rekindled to the psycho-fatalism of heartbreaks.`,
      spotifyLink:
        "https://open.spotify.com/album/5priolqwKUYVeebJ8sjArG?si=t8tYG9gESO6cihMk-3tmAQ",
      lyrics:
        "I was magnetized by your gravitational pull, you've been holding me together like Jupiter's moons",
    },
    {
      id: 3,
      title: "Izakaya Nights",
      year: "2016",
      cover: "/images/albums/izakaya.jpg",
      color: "#3b82f6", // Blue theme color
      trackPreview: "/audio/children-who-chase-lost-voices.mp3",
      description: `My first release as a beatsmith when I studied music
      production back in 2016, which served as the foundation of my 
      Japanese-influenced style of hip-hop beats.`,
      spotifyLink: "https://mckensa.bandcamp.com/album/izakaya-nights",
      lyrics: "(This album is purely instrumental)",
    },
  ];

  // Sample stories data - replace with your actual stories
  const stories = [
    {
      id: 1,
      title: "Cascading Awakenings",
      year: "November 03, 2016",
      cover: "/images/stories/cascading-awakenings.jpg",
      color: "#3b82f6", // Blue
      excerpt: `I have no recollection of what happened in the past few days or 
      weeks...`,
      synopsis: "A man gets stuck in an endless series of false awakenings.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.", // Replace with full story content
    },
    {
      id: 2,
      title: "The End of Worlds",
      year: "2017",
      cover: "/images/stories/the-end-of-worlds.jpg",
      color: "#8b5cf6", // Purple
      excerpt:
        "They promised eternal life, but they never mentioned the loading times.",
      synopsis:
        "A science fiction exploration of consciousness uploaded to digital realms after death, examining what it means to be human when our minds outlive our bodies.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      title: "The Men Who Met God",
      year: "2017",
      cover: "/images/stories/the-men-who-met-god.jpg",
      color: "#ec4899", // Pink
      excerpt:
        "The code was elegant, beautiful even. It was also completely illegal.",
      synopsis:
        "A tech noir tale following a programmer who discovers an algorithm that can predict human behavior with perfect accuracy, and the moral implications of wielding such power.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 4,
      title: "Eternities",
      year: "2017",
      cover: "/images/stories/eternities.jpg",
      color: "#10b981", // Green
      excerpt:
        "In mathematics, parallel lines never meet. In life, they sometimes do.",
      synopsis:
        "A contemporary drama about two strangers whose lives run parallel until a chance encounter creates an intersection neither expected, changing their trajectories forever.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 5,
      title: "The Mysterious Grandfather Clock",
      year: "2017",
      cover: "/images/stories/mysterious-grandfather-clock.jpg",
      color: "#f97316", // Orange
      excerpt: "For a moment I thought it was alive...",
      synopsis: `A 17th century grandfather clock in an antique shop appears to 
      be a time machine.`,
      content: `There is something rejuvenating about collecting mementos older 
      than everyone alive today, anything made before the 20th century, knowing 
      that those generational heirlooms witnessed the very histories written in 
      our school textbooks as they unfolded. You feel like you were a part of 
      the historical narrative. I own a coin manufactured in the late quarter of
      the 19th century; I imagine that particular coin went through the palm 
      and pocket of the great revolutionary leader, Andres Bonifacio himself, 
      and how, materially, we are not that far apart. It was a gift from my 
      uncle to me, right before my family and I moved to Legazpi City in 2004. 
      \n\nThere is a quiet drive away from downtown full of antique shops that I 
      frequently pass through during the sunset after work, some of them I never
       see open. Until today. I would not notice one of these perpetually closed
        shops being open if not for the absence of the sign that it was, well, 
        closed. It was worth a shot. I parked my motorcycle next to the porch 
        and stepped through the door.`,
    },
  ];

  // State for selected item (album or story)
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle album selection
  const handleSelectAlbum = (album) => {
    // If already selected, deselect it
    if (
      selectedItem &&
      selectedItem.id === album.id &&
      selectedItem.type === "album"
    ) {
      setSelectedItem(null);
      return;
    }

    setSelectedItem({ ...album, type: "album" });
  };

  // Handle story selection
  const handleSelectStory = (story) => {
    // If already selected, deselect it
    if (
      selectedItem &&
      selectedItem.id === story.id &&
      selectedItem.type === "story"
    ) {
      setSelectedItem(null);
      return;
    }

    setSelectedItem({ ...story, type: "story" });
  };

  // Add ambient background sounds (can be uncommented when audio files are available)
  useEffect(() => {
    // Uncomment when ready to implement ambient sounds
    // const ambientAudio = new Audio('/audio/room-ambience.mp3');
    // ambientAudio.volume = 0.1;
    // ambientAudio.loop = true;
    // ambientAudio.play().catch(err => console.log('Ambient audio autoplay prevented:', err));
    // return () => {
    //   ambientAudio.pause();
    //   ambientAudio.src = '';
    // };
  }, []);

  return (
    <section id="creative-works" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-amber-900/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-amber-300">
            Creative Works
          </h2>
        </div>
        {/* <p className="text-amber-100/80 max-w-3xl"> */}
        <p className="text-amber-100/80 max-w-3xl">
          Beyond coding, music and writing have been a consistent outlet for my
          creative expression. In the past years, I have published album records
          and short stories. This is my artist's corner, where you can explore
          my oeuvre in a cozy, personal space.
        </p>
      </motion.div>

      {/* Creative space with wooden background */}
      <div
        className="relative rounded-lg overflow-hidden min-h-[600px] border border-amber-900/30 creative-works-scrollbar"
        style={{
          backgroundImage: "url('/images/wooden-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Vintage paper texture overlay */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-10"
          style={{
            backgroundImage: "url('/images/vintage-paper-texture.jpg')",
          }}
        ></div>

        {/* Main content area */}
        <div className="relative z-10 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Shelf */}
            <div className="lg:col-span-1">
              <Shelf
                albums={albums}
                stories={stories}
                onSelectAlbum={handleSelectAlbum}
                onSelectStory={handleSelectStory}
                selectedItem={selectedItem}
              />
            </div>

            {/* Right side - Player/Reader Area */}
            <div className="lg:col-span-2">
              {selectedItem ? (
                selectedItem.type === "album" ? (
                  <VinylPlayer album={selectedItem} />
                ) : (
                  <StoryReader story={selectedItem} />
                )
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center p-8 bg-amber-900/30 backdrop-blur-sm rounded-lg border border-amber-800/50 max-w-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-4 text-amber-300/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-serif text-amber-200 mb-3">
                      Select an item from the shelf
                    </h3>
                    <p className="text-amber-100/80">
                      Choose an album to play music or a book to read a story.
                      Each item represents a piece of my creative journey.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeWorks;
