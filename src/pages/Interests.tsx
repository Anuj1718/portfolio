import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Oneko from "@/components/portfolio/Oneko";
import BottomDock from "@/components/portfolio/BottomDock";

const Interests = () => {
  return (
    <div className="min-h-screen bg-background">
      <Oneko />
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            back to home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 pb-24">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-foreground">more about me and the things i believe in</h1>
        </div>

        {/* Points */}
        <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>dark mode is superior and light mode is a violation of human rights fr</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>huge weeb - watched 70+ anime. steins;gate, vinland saga, aot, orb, monster, code geass, haikyuu, hxh, psycho pass s1, run with the wind are peak and non-negotiable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>"el psy kongroo" - okabe rintaro</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>fav movies - the matrix, a silent voice, interstellar, shawshank redemption, gwh, ***** club, whiplash, shutter island</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>fav series - dark and breaking bad are peak television</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>into philosophy and debating ideas - i fw existentialism, absurdism and stoicism. nietzsche, camus and dostoevsky hit different. also an agnostic</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>into poetry and literature - invictus, the song of the open road, the road not taken, stopping by woods on a snowy evening, o captain my captain go crazy</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>"i am the master of my fate, i am the captain of my soul" - invictus</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>have read meditations, white nights, the gift of the magi, the alchemist, etc. - books &gt; doom scrolling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>i prefer physical books - as makishima said: "books are not something that you just read words in. they're also a tool to adjust your senses... it might be something like mental tuning. what's important when you tune is the feeling of the paper that you're touching with your fingers and the momentary stimulation your brain receives when you turn pages"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>listen to keshi, lil skele, radiohead, cas - music is always on in the background</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>lowkey decent at chess - won the chess competition in college (2nd year), came #1. find me on{" "}
              <a href="https://www.chess.com/member/anuj1718" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                chess.com
              </a>{" "}or{" "}
              <a href="https://lichess.org/@/MagzyBogues1718" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                lichess
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>gaming is therapy - a way out, witcher 3, rdr2, cs2, sekiro, rocket league are goated. wanna play elden ring but got no time rn. waiting for gta6 like everyone else</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>magnus, ab de villiers, messi, djokovic are the goats. no debate.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>love george mack's agency stuff - striving to be a higher agency person each day</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>high agency &gt; high iq. you can just do things.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>iteration in the right direction * consistency = freedom</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>code and building things is the best dopamine source</span>
          </li>
        </ul>

        <p className="mt-8 text-sm text-muted-foreground/70 italic">more on the way...</p>
      </main>

      <BottomDock />
    </div>
  );
};

export default Interests;
