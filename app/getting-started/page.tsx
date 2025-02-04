'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GettingStartedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
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
                        Start Your <span className="text-blue-900">Investment Journey</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        New to investing? Follow our simple guide to get started with your first stock purchase.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="text-4xl mb-4">1️⃣</div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                Choose Your Broker
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Select a licensed online broker that suits your needs. Popular options in:
                            </p>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2 flex items-center gap-2">
                                        <span className="text-lg">🇺🇸</span> United States
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Robinhood - Commission-free, beginner-friendly</li>
                                        <li>• Fidelity - Full-service, excellent research tools</li>
                                        <li>• Charles Schwab - Great customer service</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2 flex items-center gap-2">
                                        <span className="text-lg">🇦🇺</span> Australia
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• CommSec - Most popular, bank integration</li>
                                        <li>• Stake - Low-cost trading platform</li>
                                        <li>• SelfWealth - Fixed-fee trading</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="text-4xl mb-4">2️⃣</div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                Set Up Your Account
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Complete these steps to open your trading account:
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0">1</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Verify Your Identity</h4>
                                        <p className="text-sm text-gray-600">Government ID and proof of address required</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0">2</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Link Your Bank</h4>
                                        <p className="text-sm text-gray-600">Connect your bank account for funding</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0">3</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Fund Your Account</h4>
                                        <p className="text-sm text-gray-600">Transfer money to start trading</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="text-4xl mb-4">3️⃣</div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                Make Your First Trade
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Ready to buy your first shares? Here's what to know:
                            </p>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Order Types</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Market Order: Buy at current price</li>
                                        <li>• Limit Order: Set your maximum price</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Trading Hours</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>🇺🇸 NYSE: 9:30 AM - 4:00 PM ET</li>
                                        <li>🇦🇺 ASX: 10:00 AM - 4:00 PM AEST</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-blue-50 p-6 rounded-xl mb-12"
                >
                    <div className="flex items-start gap-4">
                        <div className="text-2xl">💡</div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Pro Tips</h4>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Start with well-known companies you understand and use</li>
                                <li>• Don't invest more than you can afford to lose</li>
                                <li>• Consider setting up regular investments to build your portfolio over time</li>
                                <li>• Use our calculator to understand exactly what your ownership means</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-800 transition-colors"
                    >
                        Try Our Calculator
                    </Link>
                </div>
            </main>
        </div>
    );
} 