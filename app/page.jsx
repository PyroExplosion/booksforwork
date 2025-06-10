'use client'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { scrollY } = useScroll()
  const welcomeRef = useRef(null)
  const [visibleIDTitles, setVisibleIDTitles] = useState(false)
  const [isLogoTextVisible, setIsLogoTextVisible] = useState(true);
  
  // Transform for welcome section opacity based on scroll
  const welcomeOpacity = useTransform(scrollY, 
    [0, 300, 600], // scroll positions
    [1, 0.8, 0]    // opacity values
  )
  
  const welcomeY = useTransform(scrollY,
    [0, 300],
    [0, -50]
  )

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setIsLogoTextVisible(currentScrollY <= 100); // Hide logo text after scrolling
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisibleIDTitles(true)
      } else {
        setVisibleIDTitles(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // State for active page/modal
  const [activePage, setActivePage] = useState(null)
  const [activeFeature, setActiveFeature] = useState(null)
  
  const features = [
    {
      id: 1,
      title: "Box Office Hits",
      description: "Explore the biggest blockbusters of 2025",
      details: [
        { id: 1, title: "A Minecraft Movie", description: "Broke records as the highest weekend debut for a video game adaptation in 2025." },
        { id: 2, title: "Captain America: Brave New World", description: "Marvel fans rejoiced as this blockbuster dominated February's box office." },
        { id: 3, title: "Snow White", description: "Disney's live-action remake charmed audiences worldwide." },
        { id: 4, title: "Dog Man", description: "A family-friendly hit that had kids and adults laughing alike." },
        { id: 5, title: "Mickey 17", description: "A sci-fi adventure that kept viewers on the edge of their seats." }
      ]
    },
    {
      id: 2,
      title: "Popular Searches",
      description: "See what everyone's searching for online",
      details: [
        { id: 1, title: "YouTube", description: "Still reigning as the go-to platform for videos and entertainment." },
        { id: 2, title: "Amazon", description: "Everyone's favorite online shopping destination." },
        { id: 3, title: "Wordle", description: "The word game that refuses to go out of style." },
        { id: 4, title: "Weather", description: "Because knowing if you need an umbrella is always trending." },
        { id: 5, title: "ChatGPT", description: "AI conversations are all the rage in 2025." }
      ]
    },
    {
      id: 3,
      title: "TV Stations",
      description: "Discover unique channels for every interest",
      details: [
        { id: 1, title: "The Nostalgia Network", description: "Where reruns of your childhood favorites never stop." },
        { id: 2, title: "Drama Llama TV", description: "All the soap operas and reality shows you secretly love." },
        { id: 3, title: "Sci-Fi & Chill", description: "Your one-stop shop for aliens, time travel, and futuristic fun." },
        { id: 4, title: "Foodie Frenzy", description: "Cooking shows, food challenges, and mouthwatering recipes 24/7." },
        { id: 5, title: "Sports-a-Palooza", description: "From cricket to curling, it's all sports, all the time." }
      ]
    }
  ]

  const handleFeatureClick = (featureId) => {
    setActiveFeature(activeFeature === featureId ? null : featureId)
  }
  
  // Page content for different navigation links
  const pages = {
    home: null,
    trending: {
      title: "Trending Topics",
      content: "Here are the hottest topics across our platform right now.",
      comments: [
        { id: 1, user: "Alice", text: "These trending topics are amazing!", likes: 15 },
        { id: 2, user: "Bob", text: "Can't believe #2 is so popular!", likes: 8 },
        { id: 3, user: "Charlie", text: "I've been following #3 for weeks now.", likes: 21 }
      ]
    },
    recent: {
      title: "Recent Updates",
      content: "Check out the latest activities and updates.",
      comments: [
        { id: 1, user: "Dana", text: "The latest features are game-changing!", likes: 12 },
        { id: 2, user: "Evan", text: "Just discovered this platform yesterday. Amazing work!", likes: 19 }
      ]
    },
    // Add more pages as needed
  }
  
  const handleNavClick = (page) => {
    setActivePage(page)
  }

  // Welcome section reveal animation
  const [isWelcomeRevealed, setIsWelcomeRevealed] = useState(true)
  const welcomeContainerRef = useRef(null)
  
  useEffect(() => {
    const handleRevealScroll = () => {
      if (window.scrollY > 250) {
        setIsWelcomeRevealed(false)
      } else {
        setIsWelcomeRevealed(true)
      }
    }
    
    window.addEventListener('scroll', handleRevealScroll)
    return () => window.removeEventListener('scroll', handleRevealScroll)
  }, [])


  // Parallax effects references and values - reduced intensity
  const parallaxRef = useRef(null)
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -75]) // Reduced from -150
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -150]) // Reduced from -300
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -25]) // Reduced from -50
  const parallaxOpacity = useTransform(scrollY, [0, 300], [1, 0.8]) // Less opacity change

  // Refined welcome section reveal animation - ends exactly at scroll indicator
  useEffect(() => {
    const handleRevealScroll = () => {
      // Calculate when scroll indicator reaches bottom of viewport
      const scrollThreshold = window.innerHeight * 0.85;
      if (window.scrollY > scrollThreshold) {
        setIsWelcomeRevealed(false)
      } else {
        setIsWelcomeRevealed(true)
      }
    }
    
    window.addEventListener('scroll', handleRevealScroll)
    return () => window.removeEventListener('scroll', handleRevealScroll)
  }, [])

  // Logo accordion state
  const [isLogoAccordionOpen, setIsLogoAccordionOpen] = useState(false)
  
  // Expanded content data for each category
  const additionalIDs = [
    {
      id: 4,
      title: "Trending Music",
      description: "Discover the hottest tracks of the month"
    },
    {
      id: 5,
      title: "Technology Updates",
      description: "Latest innovations and tech releases"
    },
    {
      id: 6,
      title: "Upcoming Events",
      description: "Don't miss these exciting gatherings"
    },
    {
      id: 7,
      title: "Gaming Highlights",
      description: "Top gaming moments and new releases"
    },
    {
      id: 8,
      title: "Digital Art Showcase",
      description: "Creative digital artwork from top artists"
    },
    {
      id: 9,
      title: "Coding Tutorials",
      description: "Learn the latest programming techniques"
    }
  ];

  const detailedContent = {
    trendingMusic: [
      { id: 1, title: "Spotify Pop Hits 2025", description: "A playlist featuring chart-topping tracks from Ed Sheeran, Dua Lipa, and Bruno Mars." },
      { id: 2, title: "TikTok Viral Tunes", description: "Songs that are taking over TikTok, including Melody Knight's soulful hits." },
      { id: 3, title: "Summer Vibes Playlist", description: "Feel-good anthems perfect for sunny days, featuring Maroon 5 and Adele." },
      { id: 4, title: "Rock Classics Collection", description: "Timeless rock anthems from legendary bands." },
      { id: 5, title: "EDM Festival Hits", description: "Electronic dance music tracks dominating festivals worldwide." }
    ],
    technologyUpdates: [
      { id: 1, title: "Agentic AI", description: "Autonomous AI systems revolutionizing industries with self-driven tasks." },
      { id: 2, title: "Neuromorphic Computing", description: "Brain-inspired computing for faster and energy-efficient processing." },
      { id: 3, title: "Synthetic Media", description: "AI-generated content reshaping media creation and distribution." },
      { id: 4, title: "Quantum Computing", description: "Latest breakthroughs in quantum processing and applications." },
      { id: 5, title: "Green Tech", description: "Sustainable technology innovations changing our future." }
    ],
    upcomingEvents: [
      { id: 1, title: "World Expo 2025", description: "Held in Osaka, Japan, showcasing innovations under the theme 'Designing Future Society.'" },
      { id: 2, title: "The World Games", description: "Multi-sport event in Chengdu featuring new disciplines." },
      { id: 3, title: "Sundance Festival", description: "Independent filmmakers gather for groundbreaking premieres." },
      { id: 4, title: "Tech Summit 2025", description: "Global conference on emerging technologies." },
      { id: 5, title: "Art Biennale", description: "International exhibition of contemporary art." }
    ],
    gamingHighlights: [
      { id: 1, title: "Assassin's Creed Shadows", description: "A Sengoku-period Japan adventure with revamped combat." },
      { id: 2, title: "Atomfall", description: "A survival-action game blending Fallout and Elden Ring elements." },
      { id: 3, title: "Nintendo Switch 2", description: "The next-gen console release with exciting new titles." },
      { id: 4, title: "Cyberpunk 2078", description: "The highly anticipated sequel to Cyberpunk 2077." },
      { id: 5, title: "VR Gaming Hub", description: "New virtual reality gaming platform launch." }
    ],
    digitalArtShowcase: [
      { id: 1, title: "LG Wonderbox", description: "3D digital art competition highlighting endangered species." },
      { id: 2, title: "Virtual Galleries", description: "Online exhibitions featuring immersive digital artwork." },
      { id: 3, title: "AI Masterpieces", description: "Creative works crafted by AI pushing artistic boundaries." },
      { id: 4, title: "NFT Collections", description: "Curated digital art collections on the blockchain." },
      { id: 5, title: "Digital Sculptures", description: "3D printed art from digital designs." }
    ],
    codingTutorials: [
      { id: 1, title: "Python Basics", description: "Learn Python for AI, data science, and web development." },
      { id: 2, title: "Full-Stack Dev", description: "Master front-end and back-end development fundamentals." },
      { id: 3, title: "Game Development", description: "Create games using Unity and Unreal Engine." },
      { id: 4, title: "Mobile Apps", description: "Build cross-platform mobile applications." },
      { id: 5, title: "Cloud Computing", description: "Deploy and manage cloud-based applications." }
    ]
  };

  // Refined welcome section reveal animation with smoother transitions
  useEffect(() => {
    const handleRevealScroll = () => {
      // Calculate when scroll indicator reaches bottom of viewport with a more gradual threshold
      const scrollThreshold = window.innerHeight * 0.85;
      // Use a more gradual approach for visibility
      const visibilityRatio = Math.max(0, Math.min(1, 1 - (window.scrollY / scrollThreshold)));
      if (window.scrollY > scrollThreshold) {
        setIsWelcomeRevealed(false);
      } else {
        setIsWelcomeRevealed(true);
      }
      
      // More gradual transition for ID Titles
      const idTitleThreshold = 350;
      const idVisibilityRatio = Math.max(0, Math.min(1, (window.scrollY - 200) / 200));
      setVisibleIDTitles(window.scrollY > idTitleThreshold ? true : idVisibilityRatio > 0.2);
    }
    
    window.addEventListener('scroll', handleRevealScroll);
    return () => window.removeEventListener('scroll', handleRevealScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" ref={parallaxRef}>
      {/* Dynamic Header (Simplified) - Removed from top, will be positioned at side */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sr-only"
      >
        <nav className="hidden">
          {/* Hidden but preserved for accessibility */}
        </nav>
      </motion.header>

      {/* Scrawl Menu - Repositioned to where the toggle menu was */}
      <div className="scrawl-menu-outer">
        <motion.div 
          className={`scrawl-menu-container ${isLogoAccordionOpen ? 'open' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div 
            className="scrawl-logo-trigger"
            onClick={() => setIsLogoAccordionOpen(!isLogoAccordionOpen)}
          >
            <Image 
              src="/logo.png" 
              alt="Scrawl Logo" 
              width={42} 
              height={42} 
              className="rounded-md"
              onError={(e) => {
                e.target.style.backgroundColor = '#4f46e5';
                e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
              }}
            />
            {isLogoTextVisible && (
              <span className="scrawl-text">Scrawl</span>
            )}
          </div>
          
          {isLogoAccordionOpen && (
            <motion.div 
              className="scrawl-accordion-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ul className="scrawl-menu-list">
                <li><a href="#">Trending</a></li>
                <li><a href="#">Popular</a></li>
                <li><a href="#">Recent</a></li>
                <li><a href="#">Settings</a></li>
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Parallax Background Element */}
      <motion.div 
        className="parallax-bg"
        style={{ y: parallaxY3, opacity: parallaxOpacity }}
      />

      {/* Dynamic Features Section with Parallax Effect */}
      <section className="py-20 px-6 pt-32 relative">
        <motion.div 
          className="max-w-4xl mx-auto" // Changed from max-w-6xl to max-w-4xl
          style={{ y: parallaxY1 }}
        >
          {/* Gradient Banner for Discover Section */}
          <motion.div 
            className="gradient-banner rounded-lg p-2 mb-6" // Reduced margin-bottom
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center"
            >
              Discover
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.id * 0.1 }}
                onClick={() => handleFeatureClick(feature.id)}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 feature-card"
              >
                <h3 className="text-xl font-semibold mb-4">#{feature.id} {feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
                
                {activeFeature === feature.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    <hr className="border-gray-200 dark:border-gray-700 my-4" />
                    <h4 className="font-medium text-blue-600 dark:text-blue-400">Details:</h4>
                    {feature.details.map(detail => (
                      <div key={detail.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                        <p className="font-medium">{detail.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{detail.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
                
                {/* Removed Explore and Details buttons */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced Welcome Box Section - Now Purely Graphical */}
      <div className="welcome-container relative" ref={welcomeContainerRef}>
        <AnimatePresence>
          {isWelcomeRevealed && (
            <motion.section 
              ref={welcomeRef}
              style={{ 
                opacity: welcomeOpacity, 
                y: welcomeY
              }}
              className="px-4 min-h-[25vh] flex items-center justify-center relative welcome-section" // Reduced padding and height
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -100 }}
            >
              <motion.div 
                className="max-w-xl mx-auto" // Changed from max-w-3xl
                style={{ y: parallaxY2 }}
              >
                <motion.div className="welcome-content p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg carousel-width">
                  {/* Purely graphical design replacing welcome text */}
                  <div className="graphical-design">
                    <div className="design-element design-circle"></div>
                    <div className="design-element design-square"></div>
                    <div className="design-element design-triangle"></div>
                    <div className="design-lines">
                      <div className="design-line"></div>
                      <div className="design-line"></div>
                      <div className="design-line"></div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="scroll-indicator"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-sm text-gray-500">Scroll to explore</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mt-2">
                      <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
      
      {/* Enhanced "Find the Latest" Section with Smooth Rollover Animation */}
      <motion.section
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ 
          opacity: visibleIDTitles ? 1 : 0,
          y: visibleIDTitles ? 0 : 30,
          rotateX: visibleIDTitles ? 0 : 10
        }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1], // custom bezier curve for smooth rollover
          staggerChildren: 0.1
        }}
        className="px-6 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 id-section rollover-section" 
        style={{ y: parallaxY1 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visibleIDTitles ? 1 : 0, y: visibleIDTitles ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl font-bold mb-6 text-center rainbow-text"
          >
            Find the Latest
          </motion.h2>
          
          {/* Grid container with staggered children */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            initial="hidden"
            animate={visibleIDTitles ? "show" : "hidden"}
          >
            {/* First card - keeps the #4 format */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md feature-card numbered-card"
              onClick={() => setActiveFeature(activeFeature === 'trendingMusic' ? null : 'trendingMusic')}
            >
              <span className="text-3xl font-bold numbered-indicator">#4</span>
              <h3 className="text-xl font-semibold mt-2">Trending Music</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Discover the hottest tracks of the month.</p>
              
              {/* ...existing conditional content... */}
            </motion.div>
            
            {/* Display only the number 5 without # */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md feature-card numbered-card"
              onClick={() => setActiveFeature(activeFeature === 'technologyUpdates' ? null : 'technologyUpdates')}
            >
              <span className="text-3xl font-bold numbered-indicator">5</span>
              <h3 className="text-xl font-semibold mt-2">Technology Updates</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Latest innovations and tech releases.</p>
              
              {/* ...existing conditional content... */}
            </motion.div>
            
            {/* Display only the number 6 without # */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md feature-card numbered-card"
              onClick={() => setActiveFeature(activeFeature === 'upcomingEvents' ? null : 'upcomingEvents')}
            >
              <span className="text-3xl font-bold numbered-indicator">6</span>
              <h3 className="text-xl font-semibold mt-2">Upcoming Events</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Don't miss these exciting gatherings.</p>
              
              {/* ...existing conditional content... */}
            </motion.div>
          </motion.div>
          
          {/* Use the same pattern for the second row of cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate={visibleIDTitles ? "show" : "hidden"}
          >
            {/* Display only the number 7 without # */}
            <motion.div 
              key="gamingHighlights"
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md feature-card numbered-card"
              onClick={() => setActiveFeature(activeFeature === 'gamingHighlights' ? null : 'gamingHighlights')}
            >
              <span className="text-3xl font-bold numbered-indicator">7</span>
              <h3 className="text-xl font-semibold mt-2">Gaming Highlights</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Top gaming moments and new releases</p>
              
              {/* ...existing conditional content... */}
            </motion.div>
            
            {/* Display only the number 8 without # */}
            <motion.div 
              key="digitalArtShowcase"
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md feature-card numbered-card"
              onClick={() => setActiveFeature(activeFeature === 'digitalArtShowcase' ? null : 'digitalArtShowcase')}
            >
              <span className="text-3xl font-bold numbered-indicator">8</span>
              <h3 className="text-xl font-semibold mt-2">Digital Art Showcase</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Creative digital artwork from top artists</p>
              
              {/* ...existing conditional content... */}
            </motion.div>
            
            {/* Display only the number 9 without # */}
            <motion.div 
              key="codingTutorials"
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md feature-card numbered-card"
              onClick={() => setActiveFeature(activeFeature === 'codingTutorials' ? null : 'codingTutorials')}
            >
              <span className="text-3xl font-bold numbered-indicator">9</span>
              <h3 className="text-xl font-semibold mt-2">Coding Tutorials</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Learn the latest programming techniques</p>
              
              {/* ...existing conditional content... */}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Page Overlay */}
      {activePage && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setActivePage(null)}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 max-w-2xl w-full rounded-xl shadow-2xl p-6 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{pages[activePage].title}</h2>
              <button 
                onClick={() => setActivePage(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">{pages[activePage].content}</p>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-semibold mb-3">Comments</h3>
              <div className="space-y-4">
                {pages[activePage].comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium">{comment.user}</p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-1">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <textarea 
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  placeholder="Add your comment..."
                  rows={3}
                ></textarea>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
