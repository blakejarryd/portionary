'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GettingStartedPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50" data-oid="m759cfd">
            <nav className="bg-white shadow-lg" data-oid="s6o..c4">
                <div className="max-w-7xl mx-auto px-4 py-4" data-oid="d:kq.as">
                    <div className="flex items-center justify-between" data-oid="pf.lw:-">
                        <Link href="/" className="flex items-center space-x-2" data-oid=":awg0nd">
                            <div
                                className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center"
                                data-oid="eq:oz.7"
                            >
                                <span className="text-2xl font-bold text-white" data-oid="::x1a2p">
                                    P
                                </span>
                            </div>
                            <div className="flex items-center" data-oid="4:90r0g">
                                <div
                                    className="text-2xl font-bold text-blue-900"
                                    data-oid="2cvk-m:"
                                >
                                    portionary
                                </div>
                                <span
                                    className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                                    data-oid="8xqlp96"
                                >
                                    Beta
                                </span>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-6" data-oid="fbzlx2-">
                            <Link
                                href="/getting-started"
                                className="text-gray-600 hover:text-blue-900"
                                data-oid="ansbj4d"
                            >
                                Getting Started
                            </Link>
                            <Link
                                href="/pro"
                                className="text-gray-600 hover:text-blue-900"
                                data-oid="_v4oo-g"
                            >
                                Pro Features
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-12" data-oid="5fd_aom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                    data-oid="4ydgo.p"
                >
                    <h1 className="text-6xl font-bold text-gray-800 mb-6" data-oid="jpcb5qh">
                        Start Your{' '}
                        <span className="text-blue-900" data-oid="k8h.vq3">
                            Investment Journey
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-oid="h28mf7v">
                        New to investing? Follow our simple guide to get started with your first
                        stock purchase.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16" data-oid="p6bmico">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                        data-oid="o03pxw5"
                    >
                        <div className="p-8" data-oid="td21m9d">
                            <div className="text-4xl mb-4" data-oid="l--q4v0">
                                1️⃣
                            </div>
                            <h3
                                className="text-xl font-semibold text-blue-900 mb-4"
                                data-oid="ww.0df8"
                            >
                                Choose Your Broker
                            </h3>
                            <p className="text-gray-600 mb-6" data-oid="g:6wh71">
                                Select a licensed online broker that suits your needs. Popular
                                options in:
                            </p>
                            <div className="space-y-4" data-oid="bq503ky">
                                <div className="bg-blue-50 p-4 rounded-lg" data-oid="8.kh3mt">
                                    <h4
                                        className="font-medium mb-2 flex items-center gap-2"
                                        data-oid="-.yukqw"
                                    >
                                        <span className="text-lg" data-oid="i_56u59">
                                            🇺🇸
                                        </span>{' '}
                                        United States
                                    </h4>
                                    <ul
                                        className="text-sm text-gray-600 space-y-2"
                                        data-oid="zhhoz2o"
                                    >
                                        <li data-oid="03u_q4l">
                                            • Robinhood - Commission-free, beginner-friendly
                                        </li>
                                        <li data-oid="_qv0dgo">
                                            • Fidelity - Full-service, excellent research tools
                                        </li>
                                        <li data-oid="90204el">
                                            • Charles Schwab - Great customer service
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg" data-oid="sa2s:y7">
                                    <h4
                                        className="font-medium mb-2 flex items-center gap-2"
                                        data-oid="thi3t2."
                                    >
                                        <span className="text-lg" data-oid="f_zx5uf">
                                            🇦🇺
                                        </span>{' '}
                                        Australia
                                    </h4>
                                    <ul
                                        className="text-sm text-gray-600 space-y-2"
                                        data-oid="7cw8z8w"
                                    >
                                        <li data-oid="ri96q86">
                                            • CommSec - Most popular, bank integration
                                        </li>
                                        <li data-oid="6v5ju0e">
                                            • Stake - Low-cost trading platform
                                        </li>
                                        <li data-oid="pdc7be0">• SelfWealth - Fixed-fee trading</li>
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
                        data-oid="t8497pu"
                    >
                        <div className="p-8" data-oid="wt-mfpz">
                            <div className="text-4xl mb-4" data-oid="k5knoq4">
                                2️⃣
                            </div>
                            <h3
                                className="text-xl font-semibold text-blue-900 mb-4"
                                data-oid="ooid2p5"
                            >
                                Set Up Your Account
                            </h3>
                            <p className="text-gray-600 mb-6" data-oid="zwdkrbs">
                                Complete these steps to open your trading account:
                            </p>
                            <div className="space-y-6" data-oid="v65nw2d">
                                <div className="flex items-start gap-3" data-oid="u6sq3dt">
                                    <div
                                        className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0"
                                        data-oid="t672u2o"
                                    >
                                        1
                                    </div>
                                    <div data-oid="2.mg.4d">
                                        <h4
                                            className="font-medium text-gray-800"
                                            data-oid="9dpl3--"
                                        >
                                            Verify Your Identity
                                        </h4>
                                        <p className="text-sm text-gray-600" data-oid="wsurup4">
                                            Government ID and proof of address required
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3" data-oid="w5k1-5d">
                                    <div
                                        className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0"
                                        data-oid="00r3-h4"
                                    >
                                        2
                                    </div>
                                    <div data-oid="mguq_46">
                                        <h4
                                            className="font-medium text-gray-800"
                                            data-oid="at7jrcc"
                                        >
                                            Link Your Bank
                                        </h4>
                                        <p className="text-sm text-gray-600" data-oid=":uef2i7">
                                            Connect your bank account for funding
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3" data-oid="tu-ohex">
                                    <div
                                        className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0"
                                        data-oid="j8h3u.f"
                                    >
                                        3
                                    </div>
                                    <div data-oid="grk5.ng">
                                        <h4
                                            className="font-medium text-gray-800"
                                            data-oid="esmm21m"
                                        >
                                            Fund Your Account
                                        </h4>
                                        <p className="text-sm text-gray-600" data-oid="j4jx4zh">
                                            Transfer money to start trading
                                        </p>
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
                        data-oid="-x7dfuf"
                    >
                        <div className="p-8" data-oid="mwyj9.9">
                            <div className="text-4xl mb-4" data-oid="wr8bo5_">
                                3️⃣
                            </div>
                            <h3
                                className="text-xl font-semibold text-blue-900 mb-4"
                                data-oid="23yaj-e"
                            >
                                Make Your First Trade
                            </h3>
                            <p className="text-gray-600 mb-6" data-oid="ke4kmbv">
                                Ready to buy your first shares? Here's what to know:
                            </p>
                            <div className="space-y-4" data-oid="j3jo4j3">
                                <div className="bg-blue-50 p-4 rounded-lg" data-oid="cd-kqe4">
                                    <h4 className="font-medium mb-2" data-oid="3e7qn1i">
                                        Order Types
                                    </h4>
                                    <ul
                                        className="text-sm text-gray-600 space-y-2"
                                        data-oid="y1siu8p"
                                    >
                                        <li data-oid="zrpbkah">
                                            • Market Order: Buy at current price
                                        </li>
                                        <li data-oid="b_jsj5p">
                                            • Limit Order: Set your maximum price
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg" data-oid="3kmc02h">
                                    <h4 className="font-medium mb-2" data-oid="l:c8_kr">
                                        Trading Hours
                                    </h4>
                                    <ul
                                        className="text-sm text-gray-600 space-y-2"
                                        data-oid="_5.m1mc"
                                    >
                                        <li data-oid=".rs5yl1">🇺🇸 NYSE: 9:30 AM - 4:00 PM ET</li>
                                        <li data-oid="ywh23xv">🇦🇺 ASX: 10:00 AM - 4:00 PM AEST</li>
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
                    data-oid="we41ago"
                >
                    <div className="flex items-start gap-4" data-oid="t_f6-mc">
                        <div className="text-2xl" data-oid="elg_vjd">
                            💡
                        </div>
                        <div data-oid="-ml06vn">
                            <h4 className="font-semibold text-blue-900 mb-2" data-oid="h.z0zjl">
                                Pro Tips
                            </h4>
                            <ul className="text-gray-600 space-y-2" data-oid="3mf81sh">
                                <li data-oid="djxs:c:">
                                    • Start with well-known companies you understand and use
                                </li>
                                <li data-oid="ln:71ym">
                                    • Don't invest more than you can afford to lose
                                </li>
                                <li data-oid="9q.mabh">
                                    • Consider setting up regular investments to build your
                                    portfolio over time
                                </li>
                                <li data-oid="hkagubj">
                                    • Use our calculator to understand exactly what your ownership
                                    means
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center" data-oid="noc3qly">
                    <Link
                        href="/"
                        className="inline-block bg-blue-900 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-800 transition-colors"
                        data-oid="894az6y"
                    >
                        Try Our Calculator
                    </Link>
                </div>
            </main>
        </div>
    );
}
