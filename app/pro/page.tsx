'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
            {/* Reuse the same nav */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">P</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-blue-900">portionary</div>
                                <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Beta</span>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link href="/getting-started" className="text-gray-600 hover:text-blue-900">
                                Getting Started
                            </Link>
                            <Link href="/pro" className="text-gray-600 hover:text-blue-900">
                                Pro Features
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-bold text-gray-800 mb-6">
                        Upgrade to <span className="text-blue-900">Pro</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Take your investment understanding to the next level with advanced features and insights.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Free Plan */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Free</h3>
                        <div className="text-3xl font-bold mb-6">$0</div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Basic company metrics
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Ownership calculator
                            </li>
                        </ul>
                        <Link 
                            href="/"
                            className="block w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Current Plan
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-blue-900 text-white rounded-xl shadow-lg p-8 transform scale-105">
                        <div className="absolute -top-4 right-4">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                                Popular
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Pro</h3>
                        <div className="text-3xl font-bold mb-2">$9</div>
                        <div className="text-blue-200 mb-6">per month</div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Everything in Free
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Company comparisons
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Portfolio tracking
                            </li>
                        </ul>
                        <button 
                            onClick={() => alert('Coming soon! Sign up for early access.')}
                            className="block w-full bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
                        <div className="text-3xl font-bold mb-2">Custom</div>
                        <div className="text-gray-600 mb-6">Contact us for pricing</div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Everything in Pro
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Custom integrations
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Dedicated support
                            </li>
                        </ul>
                        <button 
                            onClick={() => alert('Contact us at enterprise@portionary.com')}
                            className="block w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Contact Sales
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
} 