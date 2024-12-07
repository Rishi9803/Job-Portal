'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Job Portal</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/jobs"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Find Jobs
            </Link>
            <Link
              href="/employers"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              For Employers
            </Link>
            <Link
              href="/login"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/jobs"
              className="block text-gray-500 hover:text-gray-900 px-3 py-2"
            >
              Find Jobs
            </Link>
            <Link
              href="/employers"
              className="block text-gray-500 hover:text-gray-900 px-3 py-2"
            >
              For Employers
            </Link>
            <Link
              href="/login"
              className="block text-gray-500 hover:text-gray-900 px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block text-gray-500 hover:text-gray-900 px-3 py-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 