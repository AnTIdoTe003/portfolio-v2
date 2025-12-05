// Centralized SEO Configuration
// Update these values with your actual information

export const siteConfig = {
  // Basic Info
  name: "Debmalya Biswas",
  title: "Debmalya Biswas | Frontend & Full Stack Engineer",
  description:
    "Frontend & Full Stack Engineer specializing in React, Next.js, and TypeScript. Building performant, beautiful web experiences at SaffronStays. View my portfolio, projects, and get in touch.",
  shortDescription:
    "Frontend & Full Stack Engineer crafting performant web experiences with React, Next.js & TypeScript.",

  // URLs
  url: "https://www.debmalya.in/",
  ogImage: "/og-image.png",

  // Contact & Social
  email: "viperbale.db@gmail.com",
  phone: "+91-XXXXXXXXXX", // Optional
  location: "India",

  // Social Links
  links: {
    github: "https://github.com/debmalya",
    linkedin: "https://linkedin.com/in/debmalya",
    twitter: "https://twitter.com/debmalya",
    // Add more social links as needed
  },

  // Professional Info
  jobTitle: "SDE-1",
  company: "SaffronStays",
  companyUrl: "https://saffronsstays.com",
  yearsOfExperience: "2+",

  // Skills for SEO
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "Docker",
    "AWS",
    "Performance Optimization",
    "Frontend Architecture",
    "Full Stack Development",
    "Web Development",
    "UI/UX Engineering",
  ],

  // Keywords for SEO (more comprehensive list)
  keywords: [
    // Primary Keywords
    "Frontend Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer",
    "Software Engineer",

    // Name Keywords
    "Debmalya Biswas",
    "Debmalya Biswas Portfolio",
    "Debmalya Biswas Developer",

    // Company/Location Keywords
    "SaffronStays Developer",
    "Frontend Developer India",
    "React Developer India",

    // Skill-based Keywords
    "React Expert",
    "Next.js Expert",
    "TypeScript Expert",
    "Node.js Developer",
    "Tailwind CSS Developer",
    "Performance Optimization Expert",
    "Frontend Architecture",

    // Service-based Keywords
    "Hire Frontend Developer",
    "Hire React Developer",
    "Freelance Web Developer",
    "Web Application Development",
    "SaaS Development",
    "E-commerce Development",

    // Long-tail Keywords
    "Senior Frontend Engineer Portfolio",
    "Full Stack Developer Portfolio",
    "React TypeScript Developer",
    "Modern Web Development",
    "Scalable Web Applications",
  ],

  // Verification tokens (add your actual tokens here)
  verification: {
    google: "", // Google Search Console verification
    bing: "", // Bing Webmaster Tools
    yandex: "", // Yandex Webmaster
    pinterest: "", // Pinterest verification
  },
};

// Projects data for structured data
export const projectsData = [
  {
    name: "Coinhub",
    description:
      "A React based Web App where you can see the live price of various cryptos and also the previous trend of the price of that specific Crypto built using ReactJs, ChakraUI, CoinGecko API, and FramerMotion.",
    url: "https://coinhub-db.vercel.app/",
    image: "/real-time-analytics-dashboard-charts-graphs.jpg",
    technologies: ["React", "ChakraUI", "CoinGecko API", "FramerMotion"],
    datePublished: "2023-01-01",
  },
  {
    name: "theEngineerGuy",
    description:
      "A Blogging Website where you can post your own blog, edit and delete and view other user's blog. A custom Dashboard(CMS) has been made for all the users. Built using NextJs, TypeScript, MongoDB for database, Next-Auth for authentication with Custom Credentials Provider and Google Auth.",
    url: "https://theengineerguy.vercel.app/",
    image: "/ai-content-generation-interface.jpg",
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Next-Auth",
      "SCSS",
      "REST API",
    ],
    datePublished: "2023-06-01",
  },
  {
    name: "Apna Dukan",
    description:
      "A full-stack e-commerce web application made using the MERN Stack. Features include User Registration and Authentication, Filters, Functional Search Bar, Cart, Wishlist, Payment Gateway(RazorPay), User Dashboard, Admin Dashboard, Protected Routes.",
    url: "https://apnadukan.vercel.app/",
    image: "/ecommerce-store-product-catalog.jpg",
    technologies: ["React", "MongoDB", "Node.js", "Express", "RazorPay"],
    datePublished: "2023-09-01",
  },
];

// Experience data for structured data
export const experienceData = [
  {
    role: "SDE-1",
    company: "SaffronStays",
    companyUrl: "https://saffronsstays.com",
    location: "India",
    startDate: "2024-07-01",
    endDate: undefined, // Current position
    description:
      "Full-stack development focusing on security deposit management, review platforms, API migrations, and performance optimization.",
  },
  {
    role: "Frontend Developer Intern",
    company: "SaffronStays",
    companyUrl: "https://saffronsstays.com",
    location: "India",
    startDate: "2023-03-01",
    endDate: "2024-06-30",
    description:
      "Frontend development and feature implementation focusing on user experience improvements and booking system enhancements.",
  },
  {
    role: "Frontend Developer Intern",
    company: "CrazeBazaar",
    companyUrl: "",
    location: "India",
    startDate: "2023-09-01",
    endDate: "2024-07-31",
    description:
      "Full-stack development on e-commerce platforms and government budget systems.",
  },
  {
    role: "Frontend Developer Intern",
    company: "MadAlgos",
    companyUrl: "",
    location: "India",
    startDate: "2023-09-01",
    endDate: "2023-10-31",
    description:
      "UI/UX development and bug fixes for mentor profile and listing pages.",
  },
  {
    role: "Technical Content Writer Intern",
    company: "MyWays",
    companyUrl: "",
    location: "India",
    startDate: "2022-04-01",
    endDate: "2023-01-31",
    description:
      "Technical content creation and SEO-optimized blog writing on various technical topics and roadmaps.",
  },
];

// FAQ data for FAQ Schema
export const faqData = [
  {
    question: "What technologies does Debmalya Biswas specialize in?",
    answer:
      "Debmalya specializes in React, Next.js, TypeScript, Node.js, and modern frontend technologies. He has extensive experience with performance optimization, frontend architecture, and full-stack development.",
  },
  {
    question: "Is Debmalya available for freelance projects?",
    answer:
      "Yes, Debmalya is currently open for freelance projects and full-time opportunities. You can reach out through the contact form on this website.",
  },
  {
    question: "What kind of projects has Debmalya worked on?",
    answer:
      "Debmalya has worked on diverse projects including property management platforms, real-time analytics dashboards, component libraries, e-commerce platforms, and AI-powered applications.",
  },
  {
    question: "Where is Debmalya Biswas currently working?",
    answer:
      "Debmalya currently works as an SDE-1 at SaffronStays, where he focuses on full-stack development, API migrations, and performance optimization.",
  },
];
