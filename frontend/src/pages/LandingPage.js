import React from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { BookOpen, MessageSquare, Users, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`px-4 lg:px-6 h-14 flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-md opacity-95' : 'bg-transparent opacity-100'
      }`}>
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-2xl font-bold text-green-600">CourseHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4" href="#">
            Courses
          </Link>
          <Link className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-green-600 hover:underline underline-offset-4" href="#">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to CourseHub Forum
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Collaborate with fellow students, share knowledge, and excel in your courses.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-green-800 dark:text-green-100">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-green-200 dark:border-green-700 border p-4 rounded-lg">
                <Users className="h-12 w-12 mb-2 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-100">Course Channels</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Join specific course channels and collaborate with your peers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 dark:border-green-700 border p-4 rounded-lg">
                <MessageSquare className="h-12 w-12 mb-2 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-100">Discussion Forums</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Create posts, ask questions, and participate in discussions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-green-200 dark:border-green-700 border p-4 rounded-lg">
                <UserPlus className="h-12 w-12 mb-2 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-100">User Profiles</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Customize your profile and connect with other students.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-green-800 dark:text-green-100">Popular Courses</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {["Math 101", "CS 301", "Physics 51"].map((course) => (
                <div key={course} className="flex flex-col items-center space-y-2 border-green-200 dark:border-green-700 border p-4 rounded-lg">
                  <BookOpen className="h-12 w-12 mb-2 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-100">{course}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Join the discussion and collaborate with your classmates.
                  </p>
                  <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">Join Channel</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-800 dark:text-green-100">Join CourseHub Today</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start collaborating with your classmates and improve your academic performance.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col py-6 w-full shrink-0 items-center justify-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">© 2024 CourseHub. All rights reserved.</p>
      </footer>
    </div>
  )
}