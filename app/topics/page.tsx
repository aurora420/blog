"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Cpu, Eye, Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"
import { useRouter } from "next/navigation"

// Static topic data
const topics = [
  {
    title: "Unity",
    description: "Learning journey of Unity for AR/VR and interactive experiences.",
    icon: <BrainCircuit className="h-6 w-6" />,
    count: 0,
    slug: "unity",
  },
  {
    title: "Biomedical Science",
    description:
      "Exploring the novel discoveries and advancements in biomedical science and healthcare technology.",
    icon: <Eye className="h-6 w-6" />,
    count: 0,
    slug: "biomedical-science",
  },
  {
    title: "Visualization Techniques",
    description: "2D/3D animation, 3D modeling and rendering techniques, Data visualization.",
    icon: <Cpu className="h-6 w-6" />,
    count: 0,
    slug: "visualization-techniques",
  },
  {
    title: "Art",
    description: "Honing artistic skills and finding inspiration.",
    icon: <BrainCircuit className="h-6 w-6" />,
    count: 0,
    slug: "art",
  },
  {
    title: "Life",
    description: "Journals and reflections on personal growth.",
    icon: <BrainCircuit className="h-6 w-6" />,
    count: 0,
    slug: "life",
  },

]

export default function TopicsPage() {
  const router = useRouter()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Neural<span className="text-purple-500">Pulse</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/articles/" className="text-gray-400 hover:text-white transition-colors">
              Articles
            </Link>
            <Link href="/topics/" className="text-white transition-colors border-b-2 border-purple-500 pb-1">
              Topics
            </Link>
            <Link href="/about/" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
          </nav>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
            onClick={handleSubscribeClick}
          >
            Subscribe
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Topics</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <TopicCard
                key={index}
                title={topic.title}
                description={topic.description}
                icon={topic.icon}
                count={topic.count}
                slug={topic.slug}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="text-xl font-bold tracking-tighter">
                Neural<span className="text-purple-500">Pulse</span>
              </Link>
              <p className="text-gray-400 text-sm">
                Exploring the cutting edge of artificial intelligence and machine learning.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Rss className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Topics</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Unity
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Biomedical Science
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Visualization Techniques
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Art
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Life
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Portfolio</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    AR/VR/Interactive
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                   Journal Figure
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Placeholder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                   Placeholder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                   Placeholder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>fabulaurora420@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Jeah Aurora Kim. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TopicCard({ title, description, icon, count, slug = "" }) {
  return (
    <Link href={`/articles/`} className="group">
      <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-colors h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500">{icon}</div>
            <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">{count} articles</div>
          </div>
          <CardTitle className="text-xl mt-4 group-hover:text-purple-400 transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <span className="text-purple-500 text-sm group-hover:text-purple-400 transition-colors">View articles →</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
