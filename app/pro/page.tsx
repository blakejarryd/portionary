'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50" data-oid="ptyto_b">
            {/* Reuse the same nav */}
            <nav className="bg-white shadow-lg" data-oid="4buwi6y">
                <div className="max-w-7xl mx-auto px-4 py-4" data-oid="y6018dl">
                    <div className="flex items-center justify-between" data-oid="7i:w_n7">
                        <Link href="/" className="flex items-center space-x-2" data-oid="x3m6u2.">
                            <div
                                className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center"
                                data-oid="5nu9g9d"
                            >
                                <span className="text-2xl font-bold text-white" data-oid="0g7j0qp">
                                    P
                                </span>
                            </div>
                            <div className="flex items-center" data-oid="6nn7_c7">
                                <div
                                    className="text-2xl font-bold text-blue-900"
                                    data-oid="6pxv6k1"
                                >
                                    portionary
                                </div>
                                <span
                                    className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                                    data-oid="51:jbw."
                                >
                                    Beta
                                </span>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-6" data-oid="axra821">
                            <Link
                                href="/getting-started"
                                className="text-gray-600 hover:text-blue-900"
                                data-oid="gxp.0n7"
                            >
                                Getting Started
                            </Link>
                            <Link
                                href="/pro"
                                className="text-gray-600 hover:text-blue-900"
                                data-oid="l:d-9rt"
                            >
                                Pro Features
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-12" data-oid="x1i9m2p">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                    data-oid="h88dwlm"
                >
                    <h1 className="text-6xl font-bold text-gray-800 mb-6" data-oid="aydan8c">
                        Upgrade to{' '}
                        <span className="text-blue-900" data-oid="7_c4.b6">
                            Pro
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-oid="ajb.3es">
                        Take your investment understanding to the next level with advanced features
                        and insights.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-12" data-oid="fzr1yfn">
                    {/* Free Plan */}
                    <div className="bg-white rounded-xl shadow-lg p-8" data-oid="iaa:soi">
                        <h3 className="text-xl font-semibold mb-4" data-oid=".esrwgs">
                            Free
                        </h3>
                        <div className="text-3xl font-bold mb-6" data-oid="ix58mm2">
                            $0
                        </div>
                        <ul className="space-y-3 mb-8" data-oid=":k9tlh8">
                            <li className="flex items-center text-gray-600" data-oid="1lsyu84">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="rsflxr_"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid=":-bj4mn"
                                    />
                                </svg>
                                Basic company metrics
                            </li>
                            <li className="flex items-center text-gray-600" data-oid="4fh-lpx">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="z19xv-:"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="_nb8zuy"
                                    />
                                </svg>
                                Ownership calculator
                            </li>
                        </ul>
                        <Link
                            href="/"
                            className="block w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            data-oid="3si:g62"
                        >
                            Current Plan
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div
                        className="bg-blue-900 text-white rounded-xl shadow-lg p-8 transform scale-105"
                        data-oid="pcrqd._"
                    >
                        <div className="absolute -top-4 right-4" data-oid="5yokx_:">
                            <span
                                className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                                data-oid="po18rcw"
                            >
                                Popular
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4" data-oid="9.82n3-">
                            Pro
                        </h3>
                        <div className="text-3xl font-bold mb-2" data-oid="8-jkl0s">
                            $9
                        </div>
                        <div className="text-blue-200 mb-6" data-oid="lz4frw5">
                            per month
                        </div>
                        <ul className="space-y-3 mb-8" data-oid="f9grj0w">
                            <li className="flex items-center" data-oid="yq1a6lc">
                                <svg
                                    className="w-5 h-5 mr-2 text-blue-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="s7cwdyu"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="-g1stoc"
                                    />
                                </svg>
                                Everything in Free
                            </li>
                            <li className="flex items-center" data-oid="1:vfwfi">
                                <svg
                                    className="w-5 h-5 mr-2 text-blue-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="nnepxyg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="6ge7rz2"
                                    />
                                </svg>
                                Company comparisons
                            </li>
                            <li className="flex items-center" data-oid="zxd1l-v">
                                <svg
                                    className="w-5 h-5 mr-2 text-blue-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="h3j2t45"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="a:y3gu9"
                                    />
                                </svg>
                                Portfolio tracking
                            </li>
                        </ul>
                        <button
                            onClick={() => alert('Coming soon! Sign up for early access.')}
                            className="block w-full bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            data-oid="e:rlxtj"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-xl shadow-lg p-8" data-oid="n3yhkcl">
                        <h3 className="text-xl font-semibold mb-4" data-oid="ajkyvf5">
                            Enterprise
                        </h3>
                        <div className="text-3xl font-bold mb-2" data-oid="eux-ai0">
                            Custom
                        </div>
                        <div className="text-gray-600 mb-6" data-oid="x_q0kt_">
                            Contact us for pricing
                        </div>
                        <ul className="space-y-3 mb-8" data-oid=":6ia8qk">
                            <li className="flex items-center text-gray-600" data-oid="6sragh4">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="-y0zq41"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="lqwoupk"
                                    />
                                </svg>
                                Everything in Pro
                            </li>
                            <li className="flex items-center text-gray-600" data-oid="5y_b:.3">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="n0r3k:a"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="9x2zxsr"
                                    />
                                </svg>
                                Custom integrations
                            </li>
                            <li className="flex items-center text-gray-600" data-oid="4m8_a-u">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="wh3d5_w"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        data-oid="7rjwslf"
                                    />
                                </svg>
                                Dedicated support
                            </li>
                        </ul>
                        <button
                            onClick={() => alert('Contact us at enterprise@portionary.com')}
                            className="block w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            data-oid="ewzxrbk"
                        >
                            Contact Sales
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
