export interface Project {
  title: string;
  description: string;
  repo: string;
  website: string;
  image?: string;
  tags: string[]; // Short preview tags
  techStack: string[]; // Full tech stack shown on expand
  features: string[];
  highlights?: string[];
}

export const projects: Project[] = [
  {
    title: "CodeLens",
    description: "An interactive educational platform that transforms how developers learn Data Structures and Algorithms through real-time visualizations and competitive algorithm racing.",
    repo: "https://github.com/Anuj1718/CodeLens",
    website: "https://c0delens.vercel.app/",
    tags: ["React 19", "TypeScript", "Vite 6", "Tailwind CSS"],
    techStack: [
      "React 19",
      "Vite 6",
      "TypeScript 5.7",
      "Tailwind CSS 4",
      "ShadCN UI",
      "Radix UI",
      "React Router 7",
      "Lucide React",
      "FontAwesome",
      "React Icons",
      "Next Themes",
      "Sonner",
      "ESLint 9",
      "Tailwindcss Animate",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    features: [
      "Real-time Algorithm Visualizations - Watch sorting and searching algorithms execute step-by-step with animated visual feedback",
      "Code Arena - Competitive feature where multiple algorithms race side-by-side to compare performance metrics in real-time",
      "Interactive Data Structure Visualizations - Hands-on exploration of Arrays, Stacks, Queues, Linked Lists, Trees, Graphs, Hash Tables, and Heaps",
      "Adjustable Speed Controls - Play, pause, and control execution speed for better understanding",
      "Complexity Analysis - Learn Big-O notation with practical, visual examples",
      "Dark/Light Theme - Modern UI with sleek teal/slate design optimized for long study sessions",
    ],
    highlights: [
      "8 Sorting Algorithms visualized (Bubble, Selection, Insertion, Merge, Quick Sort)",
      "2 Searching Algorithms (Linear, Binary Search)",
      "8 Data Structures with interactive operations",
      "Fully responsive design (mobile, tablet, desktop)",
      "Deployed on Vercel with CDN distribution",
    ],
  },
  {
    title: "Brevity AI",
    description: "A full-stack web application that extracts, cleans, and summarizes PDF documents using advanced NLP techniques and ML models. Supports multi-language processing (English, Hindi, Marathi) with OCR capabilities.",
    repo: "https://github.com/Anuj1718/Brevity-AI",
    website: "https://brevityapp.vercel.app/",
    tags: ["React 19", "FastAPI", "PyTorch", "Vercel"],
    techStack: [
      // Frontend
      "React 19.1.1",
      "Vite 7.1.2",
      "React Router DOM 7.9.6",
      "React Dropzone",
      "Lottie Animations",
      "Spline 3D",
      "Firebase Auth",
      "Firestore",
      // Backend
      "FastAPI 0.104.1",
      "Uvicorn 0.24.0",
      "PyMuPDF",
      "pytesseract",
      "Pillow",
      // ML/NLP
      "NLTK 3.8.1",
      "scikit-learn 1.3.2",
      "PyTorch 2.2.0",
      "Transformers 4.35.0",
      "BART (facebook/bart-large-cnn)",
      "Helsinki-NLP (Marian)",
      "Tesseract OCR",
      // Utilities
      "NumPy",
      "Pandas",
      "httpx",
    ],
    features: [
      "PDF text extraction with OCR support for scanned documents",
      "Multiple summarization methods (Extractive, Abstractive, Hybrid)",
      "Multi-language translation (English ↔️ Hindi ↔️ Marathi)",
      "Text-to-Speech for summaries",
      "Real-time upload progress tracking",
      "Image preprocessing for better OCR accuracy",
      "Automatic text type detection (searchable vs scanned)",
      "Caching system for improved performance",
    ],
    highlights: [
      "3 Summarization methods: TextRank, TF-IDF, BART Transformer",
      "Multi-language OCR (English, Hindi, Marathi)",
      "Pipeline-based processing for 2-3x faster summarization",
      "Frontend on Vercel, Backend on Render",
      "Firebase Authentication & Firestore integration",
    ],
  },
];
