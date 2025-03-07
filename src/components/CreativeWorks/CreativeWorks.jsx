import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Shelf from "./Shelf";
import VinylPlayer from "./VinylPlayer";
import StoryReader from "./StoryReader";
import {
  loadMarkdownFile,
  parseMarkdownWithFrontmatter,
} from "../../utils/markdownLoader";

const CreativeWorks = () => {
  // Sample album data - replace with your actual albums
  const albums = [
    {
      id: 1,
      title: "Strange Weather in Manila",
      year: "November 25, 2023",
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
      year: "November 17, 2017",
      cover: "/images/albums/fmdd.jpg",
      color: "#ec4899", // Pink theme color
      trackPreview: "/audio/one-night.mp3",
      description: `Serenata is my collaborative hip-hop project with Soupherb.
      Our duo naturally materialized after a couple of music sessions. For My 
      Daydream Dalliance is the heartfelt output of our combined efforts, 
      comprised of tales and narratives ranging from overnight adventures and 
      dead flames rekindled to the psycho-fatalism of heartbreaks.`,
      spotifyLink:
        "https://open.spotify.com/album/5priolqwKUYVeebJ8sjArG?si=t8tYG9gESO6cihMk-3tmAQ",
      lyrics:
        "I was magnetized by your gravitational pull, you've been holding me together like Jupiter's moons",
    },
    {
      id: 3,
      title: "Izakaya Nights",
      year: "December 16, 2016",
      cover: "/images/albums/izakaya.jpg",
      color: "#3b82f6", // Blue theme color
      trackPreview: "/audio/inner-children.mp3",
      description: `My first release as a beatsmith when I studied music
      production back in 2016, which served as the foundation of my 
      Japanese-influenced style of hip-hop beats. The track preview, with 
      added vocals from rappers Nakr and AMPON's Leyman's Terms, uses one of 
      the beats from the tape.`,
      spotifyLink: "https://mckensa.bandcamp.com/album/izakaya-nights",
      lyrics:
        "Her role as the crooner of the tune they used to groove to under the glow of the sun and beneath the full moon",
    },
  ];

  // Sample stories data - replace with your actual stories
  const storyMeta = [
    {
      id: 1,
      filename: "/stories/cascading-awakenings.md",
      cover: "/images/stories/cascading-awakenings.jpg",
    },
    {
      id: 2,
      filename: "/stories/the-end-of-worlds.md",
      cover: "/images/stories/the-end-of-worlds.jpg",
    },
    {
      id: 3,
      filename: "/stories/the-men-who-met-god.md",
      cover: "/images/stories/the-men-who-met-god.jpg",
    },
    {
      id: 4,
      filename: "/stories/eternities.md",
      cover: "/images/stories/eternities.jpg",
    },
    {
      id: 5,
      filename: "/stories/the-mysterious-grandfather-clock.md",
      cover: "/images/stories/mysterious-grandfather-clock.jpg",
    },
  ];

  const [stories, setStories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load markdown files when component mounts
  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);

      const loadedStories = await Promise.all(
        storyMeta.map(async (meta) => {
          const markdown = await loadMarkdownFile(meta.filename);
          console.log(meta.filename);
          const { metadata, content } = parseMarkdownWithFrontmatter(markdown);

          return {
            id: meta.id,
            title: metadata.title || `Story ${meta.id}`,
            year: metadata.date || "Unknown",
            cover: metadata.cover || meta.cover,
            color: metadata.color || "#FF6F00", // Default blue
            excerpt: metadata.excerpt || "No excerpt available",
            synopsis: metadata.synopsis || "No synopsis available",
            content: content,
          };
        })
      );

      setStories(loadedStories);
      setLoading(false);
    };

    loadStories();
  }, []);

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
          Beyond coding, the realms of music and writing have been a consistent
          outlet for my creative expression. In the past years, I have released
          album records (under Uprising Records Philippines) and published short
          stories. This is my artist's corner, where you can explore my oeuvre.
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
        <div className="relative z-10 p-0 md:p-6">
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
