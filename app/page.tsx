'use client';

import { useState, Fragment, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Combobox, Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { companyFinancials } from './data/companyFinancials';
import Link from 'next/link';

interface Company {
    id: string;
    name: string;
    exchange: string;
    country: string;
}

interface Country {
    id: string;
    name: string;
    flag: string;
    currency: string;
    symbol: string;
}

export default function Page() {
    const [shares, setShares] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<Country>({
        id: 'US',
        name: 'United States',
        flag: '🇺🇸',
        currency: 'USD',
        symbol: '$',
    });
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const countries = [
        { id: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$' },
        { id: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$' },
    ];

    const companies = [
        { id: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', country: 'US' },
        { id: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', country: 'US' },
        { id: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', country: 'US' },
        { id: 'WOW', name: 'Woolworths Group', exchange: 'ASX', country: 'AU' },
        { id: 'CBA', name: 'Commonwealth Bank', exchange: 'ASX', country: 'AU' },
        { id: 'BHP', name: 'BHP Group', exchange: 'ASX', country: 'AU' },
    ];

    const filteredCompanies =
        query === ''
            ? companies.filter((company) => company.country === selectedCountry.id)
            : companies
                  .filter((company) => company.country === selectedCountry.id)
                  .filter(
                      (company) =>
                          company.name.toLowerCase().includes(query.toLowerCase()) ||
                          company.id.toLowerCase().includes(query.toLowerCase()),
                  );

    const getSharePrice = (company: any) => {
        if (!company) return 0;
        const financials = companyFinancials[company.id];
        if (!financials) return 0;
        return (financials.marketCap * 1000000) / (financials.sharesOutstanding * 1000000);
    };

    // Add this function to calculate company-wide metrics
    const calculateCompanyMetrics = (company: any) => {
        if (!company) return null;

        const financials = companyFinancials[company.id];
        if (!financials) return null;

        const sharePrice = getSharePrice(company);
        const dividendYield = ((financials.quarterlyDividend * 4) / sharePrice) * 100;

        return {
            dividendYield: Math.round(dividendYield * 100) / 100,
        };
    };

    // Keep the existing metrics calculation for share-specific calculations
    const calculateMetrics = () => {
        if (!selectedCompany || !shares) {
            return {
                revenueShare: 0,
                profitShare: 0,
                ownershipPercentage: 0,
                dividendIncome: 0,
                annualDividend: 0,
                roi: 0,
            };
        }

        const financials = companyFinancials[selectedCompany.id];
        if (!financials) return null;

        const sharePrice = getSharePrice(selectedCompany);
        const sharesNum = parseFloat(shares); // Convert string to number

        const ownershipPercentage = (sharesNum / (financials.sharesOutstanding * 1000000)) * 100;
        const revenueShare = financials.annualRevenue * 1000000 * (ownershipPercentage / 100);
        const profitShare = financials.annualProfit * 1000000 * (ownershipPercentage / 100);
        const quarterlyDividend = sharesNum * financials.quarterlyDividend;
        const annualDividend = quarterlyDividend * 4;

        // Calculate yields
        const earningsYield =
            ((financials.annualProfit * 1000000) /
                (financials.sharesOutstanding * 1000000) /
                sharePrice) *
            100;

        // Total ROI includes both dividend yield and earnings yield
        const totalROI = earningsYield;

        return {
            revenueShare: Math.round(revenueShare),
            profitShare: Math.round(profitShare),
            ownershipPercentage: ownershipPercentage.toFixed(6),
            dividendIncome: Math.round(quarterlyDividend * 100) / 100,
            annualDividend: Math.round(annualDividend * 100) / 100,
            roi: Math.round(totalROI * 100) / 100,
        };
    };

    const metrics = calculateMetrics();

    const formatInputCurrency = (value: string) => {
        // Remove any non-digit characters except decimal point
        const number = value.replace(/[^\d.]/g, '');
        // Ensure only one decimal point
        const parts = number.split('.');
        if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
        return number;
    };

    const scrollToSlice = () => {
        setTimeout(() => {
            document.getElementById('your-slice')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 300);
    };

    const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShares(e.target.value);
        if (e.target.value) {
            const sliceSection = document.getElementById('your-slice');
            if (sliceSection) {
                sliceSection.classList.add('scroll-highlight');
                setTimeout(() => {
                    sliceSection.classList.remove('scroll-highlight');
                }, 1000);
            }
            scrollToSlice();
        }
    };

    useEffect(() => {
        if (shares && selectedCompany) {
            const sharePrice = getSharePrice(selectedCompany);
        }
    }, [selectedCompany, shares]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const formatLargeNumber = (value: number) => {
        if (value >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
        if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
        if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
        return value.toString();
    };

    // Add this helper function for calculating profit margin
    const calculateProfitMargin = (revenue: number, profit: number) => {
        return revenue ? (profit / revenue) * 100 : 0;
    };

    // First, let's create a reusable Disclaimer component
    const Disclaimer = ({ currency }: { currency: string }) => (
        <div className="mt-4 bg-blue-50 p-4 rounded-lg" data-oid="ld8dzvw">
            <div className="flex items-center gap-2 text-sm text-gray-600" data-oid="-_q5hk9">
                <svg
                    className="w-5 h-5 text-blue-900 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="0c4ud31"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        data-oid="z7f5.ga"
                    />
                </svg>
                <p data-oid="ga4yf9u">
                    All calculations are based on the company's most recent annual report and shown
                    in {currency}. These numbers help you understand the company's current position,
                    but remember that performance changes over time.
                </p>
            </div>
        </div>
    );

    // Add tooltips object near the top of the component
    const tooltips = {
        profitMargin: 'Profit margin shows how much of each dollar of revenue becomes profit',
        dividendYield: 'Annual dividend payments as a percentage of the current share price',
        roi: "Return on Investment based on the company's earnings relative to share price",
        ownershipSlice: "Your percentage ownership of the company's total shares",
        revenueShare: "Your portion of the company's annual revenue based on your ownership",
        profitShare: "Your portion of the company's annual profit based on your ownership",
        dividendIncome: 'Expected annual dividend payments based on current dividend rate',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50" data-oid="2i4d6_4">
            <nav className="bg-white shadow-lg" data-oid="5qhp237">
                <div className="max-w-7xl mx-auto px-4 py-4" data-oid="6l:zln_">
                    <div className="flex items-center justify-between" data-oid="_7yx-5j">
                        <div className="flex items-center space-x-2" data-oid="_3q7d8:">
                            <div
                                className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center"
                                data-oid="c3e2gz7"
                            >
                                <span className="text-2xl font-bold text-white" data-oid="zir0ptn">
                                    P
                                </span>
                            </div>
                            <div className="flex items-center" data-oid="khch7op">
                                <div
                                    className="text-2xl font-bold text-blue-900"
                                    data-oid="p99aj7e"
                                >
                                    portionary
                                </div>
                                <span
                                    className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                                    data-oid="l7xt1v4"
                                >
                                    Beta
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6" data-oid="705dha:">
                            <Link
                                href="/getting-started"
                                className="text-gray-600 hover:text-blue-900"
                                data-oid=".lanc3i"
                            >
                                Getting Started
                            </Link>
                            <Link
                                href="/pro"
                                className="text-gray-600 hover:text-blue-900"
                                data-oid="pmv7duw"
                            >
                                Pro Features
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-12" data-oid="n467io9">
                <section
                    className="min-h-[60vh] flex flex-col justify-center mb-12"
                    data-oid="wq4-s0:"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                        data-oid="v0mscj8"
                    >
                        <h1 className="text-6xl font-bold text-gray-800 mb-6" data-oid="1amtguv">
                            Your Slice of the Market,
                            <br data-oid="fwnfnq0" />
                            <span className="text-blue-900" data-oid="oz_rxdz">
                                Simplified
                            </span>
                        </h1>
                        <p
                            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                            data-oid="c8bk-6u"
                        >
                            Ever wondered what it actually means to own shares? With Portionary,
                            you&apos;ll see exactly what you own and how it works—without the
                            finance-industry fluff.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg hover:bg-orange-600 transition-colors"
                            onClick={() => {
                                document.getElementById('calculator')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            }}
                            data-oid="ocs5tlm"
                        >
                            Discover Your Portion
                        </motion.button>
                    </motion.div>
                </section>

                <motion.section
                    id="calculator"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                    data-oid="out9_0m"
                >
                    <h2
                        className="text-4xl font-bold text-center text-gray-800 mb-6"
                        data-oid=".zqeg1_"
                    >
                        Calculate Your{' '}
                        <span className="text-blue-900" data-oid=":39vfq.">
                            Slice
                        </span>
                    </h2>
                    <p
                        className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12"
                        data-oid="0k8df7i"
                    >
                        A piece of a company = a piece of its success. See exactly what your
                        investment means in real terms.
                    </p>
                    <div
                        className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
                        data-oid="47b2i.n"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="7qw714s">
                            <div className="space-y-6" data-oid="jypq5lg">
                                <div data-oid="g2tsigf">
                                    <label
                                        className="block text-gray-700 mb-2 font-medium"
                                        data-oid="_l4oykg"
                                    >
                                        Select Market
                                    </label>
                                    <Listbox
                                        value={selectedCountry}
                                        onChange={setSelectedCountry}
                                        data-oid="7yl_ix6"
                                    >
                                        <div className="relative" data-oid="nrm1k8d">
                                            <Listbox.Button
                                                className="w-full p-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                                data-oid="07e0vsr"
                                            >
                                                <span
                                                    className="flex items-center gap-2"
                                                    data-oid="dgory3x"
                                                >
                                                    <span className="text-xl" data-oid="ufjeav_">
                                                        {selectedCountry.flag}
                                                    </span>
                                                    {selectedCountry.name}
                                                </span>
                                            </Listbox.Button>
                                            <Listbox.Options
                                                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
                                                data-oid="p3-z3wq"
                                            >
                                                {countries.map((country) => (
                                                    <Listbox.Option
                                                        key={country.id}
                                                        value={country}
                                                        as={Fragment}
                                                        data-oid="8zjd64p"
                                                    >
                                                        {({ active, selected }) => (
                                                            <li
                                                                className={`p-3 flex items-center gap-2 cursor-pointer ${
                                                                    active ? 'bg-teal-50' : ''
                                                                }`}
                                                                data-oid="8jxhmve"
                                                            >
                                                                <span
                                                                    className="text-xl"
                                                                    data-oid="1keo-hu"
                                                                >
                                                                    {country.flag}
                                                                </span>
                                                                {country.name}
                                                                {selected && (
                                                                    <CheckIcon
                                                                        className="w-5 h-5 text-teal-600 ml-auto"
                                                                        data-oid="q4bfgbt"
                                                                    />
                                                                )}
                                                            </li>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>

                                <div data-oid="f4c4rtx">
                                    <label
                                        className="block text-gray-700 mb-2 font-medium"
                                        data-oid="ovxiwog"
                                    >
                                        Search Company
                                    </label>
                                    <Combobox
                                        value={selectedCompany}
                                        onChange={(company) => {
                                            setIsLoading(true);
                                            setSelectedCompany(company);
                                            setTimeout(() => setIsLoading(false), 500);
                                        }}
                                        data-oid="h_wxnu6"
                                    >
                                        <div className="relative" data-oid="b-g:m6s">
                                            <Combobox.Input
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                                placeholder="Search by name or ticker"
                                                displayValue={(company: Company | null) =>
                                                    company?.name || ''
                                                }
                                                onChange={(event) => setQuery(event.target.value)}
                                                data-oid="1-d4ig0"
                                            />

                                            <Combobox.Options
                                                className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                                                data-oid="mnfbps8"
                                            >
                                                {filteredCompanies.map((company) => (
                                                    <Combobox.Option
                                                        key={company.id}
                                                        value={company}
                                                        as={Fragment}
                                                        data-oid="yfgiyvb"
                                                    >
                                                        {({ active, selected }) => (
                                                            <li
                                                                className={`p-3 cursor-pointer list-none ${
                                                                    active ? 'bg-teal-50' : ''
                                                                }`}
                                                                data-oid="51sr_a3"
                                                            >
                                                                <div
                                                                    className="flex justify-between items-center"
                                                                    data-oid="wt:-2j0"
                                                                >
                                                                    <span
                                                                        className="font-medium"
                                                                        data-oid="0v-r-p3"
                                                                    >
                                                                        {company.name}
                                                                    </span>
                                                                    <span
                                                                        className="text-sm text-gray-500"
                                                                        data-oid="6na43f9"
                                                                    >
                                                                        {company.exchange}:{' '}
                                                                        {company.id}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </div>
                                    </Combobox>
                                </div>

                                {selectedCompany && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-t pt-6"
                                        data-oid="kiv4i5d"
                                    >
                                        <label
                                            className="block text-gray-700 mb-2 font-medium"
                                            data-oid="24a4.a8"
                                        >
                                            Your Holdings
                                        </label>
                                        <div className="space-y-4" data-oid="g5qkyfr">
                                            <input
                                                type="number"
                                                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                value={shares}
                                                onChange={handleSharesChange}
                                                placeholder="Enter number of shares"
                                                data-oid="f1l681y"
                                            />

                                            {shares && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="p-4 bg-blue-50 rounded-lg"
                                                    data-oid="v.lqq:5"
                                                >
                                                    <div
                                                        className="text-sm text-gray-600"
                                                        data-oid="md-cvq0"
                                                    >
                                                        Total Value
                                                    </div>
                                                    <div
                                                        className="text-xl font-bold text-blue-900"
                                                        data-oid="y43x3ja"
                                                    >
                                                        {selectedCountry.symbol}
                                                        {formatCurrency(
                                                            parseFloat(shares) *
                                                                getSharePrice(selectedCompany),
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {selectedCompany ? (
                                <div className="space-y-6" data-oid="nali75s">
                                    <div data-oid="y:fw9sc">
                                        <h3
                                            className="text-xl font-semibold text-blue-900 mb-4"
                                            data-oid="21m_m0c"
                                        >
                                            Company Overview
                                        </h3>
                                        {isLoading ? (
                                            <div
                                                className="h-full flex items-center justify-center"
                                                data-oid="vkb82is"
                                            >
                                                <div
                                                    className="animate-pulse space-y-4"
                                                    data-oid="u_royuv"
                                                >
                                                    <div
                                                        className="h-4 bg-gray-200 rounded w-32"
                                                        data-oid="s79my9q"
                                                    ></div>
                                                    <div
                                                        className="grid grid-cols-2 gap-4"
                                                        data-oid="yo6ze60"
                                                    >
                                                        <div
                                                            className="h-20 bg-gray-200 rounded"
                                                            data-oid="rvsbfo-"
                                                        ></div>
                                                        <div
                                                            className="h-20 bg-gray-200 rounded"
                                                            data-oid="pp4vt7c"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="grid grid-cols-2 gap-4 mb-2"
                                                data-oid="9k3e1ve"
                                            >
                                                <div
                                                    className="bg-blue-50 p-3 rounded-lg"
                                                    data-oid="cq:_q-."
                                                >
                                                    <div
                                                        className="text-sm text-gray-600"
                                                        data-oid="qwuba.x"
                                                    >
                                                        Share Price
                                                    </div>
                                                    <div
                                                        className="text-xl font-bold text-blue-900"
                                                        data-oid="_vvyz3u"
                                                    >
                                                        {selectedCountry.symbol}
                                                        {formatCurrency(
                                                            getSharePrice(selectedCompany),
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="bg-blue-50 p-3 rounded-lg"
                                                    data-oid="h578j9g"
                                                >
                                                    <div
                                                        className="text-sm text-gray-600"
                                                        data-oid="5aoftcj"
                                                    >
                                                        Market Cap
                                                    </div>
                                                    <div
                                                        className="text-xl font-bold text-blue-900"
                                                        data-oid="rnpt6id"
                                                    >
                                                        {selectedCountry.symbol}
                                                        {formatLargeNumber(
                                                            companyFinancials[selectedCompany.id]
                                                                .marketCap * 1000000,
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className="text-xs text-gray-500 italic"
                                            data-oid="q0qaqu6"
                                        >
                                            * Market data delayed by 15 minutes
                                        </div>
                                        <div
                                            className="text-xs text-gray-500 mt-2"
                                            data-oid="w1c48.l"
                                        >
                                            * Financial data shown is for demonstration purposes
                                        </div>
                                    </div>

                                    <div data-oid="kc42gaf">
                                        <h4
                                            className="text-sm font-semibold text-gray-600 mb-3"
                                            data-oid="w2s9ae6"
                                        >
                                            Latest Financial Reports
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4" data-oid="-4m7m.i">
                                            <div
                                                className="bg-blue-50 p-3 rounded-lg"
                                                data-oid="9xq_dkb"
                                            >
                                                <div
                                                    className="text-sm text-gray-600"
                                                    data-oid="-8paj3x"
                                                >
                                                    Annual Revenue
                                                </div>
                                                <div
                                                    className="text-xl font-bold text-blue-900"
                                                    data-oid="4::b2bu"
                                                >
                                                    {selectedCountry.symbol}
                                                    {formatLargeNumber(
                                                        companyFinancials[selectedCompany.id]
                                                            .annualRevenue * 1000000,
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-blue-50 p-3 rounded-lg"
                                                data-oid="nhdsb-b"
                                            >
                                                <div
                                                    className="text-sm text-gray-600"
                                                    data-oid="ar_pi9_"
                                                >
                                                    Annual Profit
                                                </div>
                                                <div
                                                    className="text-xl font-bold text-blue-900"
                                                    data-oid="m73312-"
                                                >
                                                    {selectedCountry.symbol}
                                                    {formatLargeNumber(
                                                        companyFinancials[selectedCompany.id]
                                                            .annualProfit * 1000000,
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className="bg-blue-50 p-3 rounded-lg"
                                                data-oid="n3djm2e"
                                            >
                                                <div
                                                    className="text-sm text-gray-600"
                                                    data-oid="b1q.78n"
                                                >
                                                    Profit Margin
                                                </div>
                                                <div
                                                    className="text-xl font-bold text-blue-900"
                                                    data-oid="lud_:67"
                                                >
                                                    {calculateProfitMargin(
                                                        companyFinancials[selectedCompany.id]
                                                            .annualRevenue,
                                                        companyFinancials[selectedCompany.id]
                                                            .annualProfit,
                                                    ).toFixed(1)}
                                                    %
                                                </div>
                                            </div>
                                            <div
                                                className="bg-blue-50 p-3 rounded-lg"
                                                data-oid="uo98mp3"
                                            >
                                                <div
                                                    className="text-sm text-gray-600"
                                                    data-oid="h555u53"
                                                >
                                                    Annual Dividend Yield
                                                </div>
                                                <div
                                                    className="text-xl font-bold text-blue-900"
                                                    data-oid="dlpv0oe"
                                                >
                                                    {calculateCompanyMetrics(selectedCompany)
                                                        ?.dividendYield ?? 0}
                                                    %
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Disclaimer
                                        currency={selectedCountry.currency}
                                        data-oid="4l-k352"
                                    />
                                </div>
                            ) : (
                                <div
                                    className="h-full flex items-center justify-center"
                                    data-oid="6branmf"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-center"
                                        data-oid="an2g982"
                                    >
                                        <div className="text-5xl mb-4" data-oid="iguw88f">
                                            🔍
                                        </div>
                                        <div className="text-gray-600" data-oid="6dzncn_">
                                            Search for a company to see its overview
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

                {selectedCompany && (
                    <motion.div
                        id="your-slice"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 mb-16 border-t pt-8 scroll-highlight-target"
                        data-oid="nh-pqju"
                    >
                        <h3 className="text-xl font-semibold text-blue-900 mb-6" data-oid="8kbhenu">
                            Your Slice of the Company
                        </h3>
                        {!shares ? (
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-blue-50 p-8 rounded-xl text-center"
                                data-oid="yc4e2dq"
                            >
                                <div className="text-5xl mb-4" data-oid="b_qf4pg">
                                    🔢
                                </div>
                                <div className="text-gray-600" data-oid="0oukq:8">
                                    Enter the number of shares above to see your portion of the
                                    company
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid md:grid-cols-4 gap-4"
                                    data-oid=".h-qoi8"
                                >
                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        data-oid="h5zzam2"
                                    >
                                        <div className="group relative" data-oid="2l5_xr2">
                                            <div
                                                className="text-sm text-gray-600 mb-1 flex items-center"
                                                data-oid="m92zbh1"
                                            >
                                                Your Share of Revenue
                                                <svg
                                                    className="w-4 h-4 ml-1 text-gray-400 cursor-help"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    data-oid="t9h9evq"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        data-oid="ohgzxuk"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2"
                                                data-oid="2u.70l2"
                                            >
                                                {tooltips.revenueShare}
                                            </div>
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-teal-600"
                                            data-oid="k0.6xq8"
                                        >
                                            {selectedCountry.symbol}
                                            {metrics?.revenueShare ?? 0}
                                        </div>
                                        <div
                                            className="text-xs text-gray-500 mt-1"
                                            data-oid="99cl:65"
                                        >
                                            per year
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        data-oid="fi9sv.w"
                                    >
                                        <div className="group relative" data-oid="t:h.z4j">
                                            <div
                                                className="text-sm text-gray-600 mb-1 flex items-center"
                                                data-oid="edkcnzq"
                                            >
                                                Your Share of Profit
                                                <svg
                                                    className="w-4 h-4 ml-1 text-gray-400 cursor-help"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    data-oid="a17gcr1"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        data-oid="4hn.ggq"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2"
                                                data-oid="tgpyule"
                                            >
                                                {tooltips.profitShare}
                                            </div>
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-orange-500"
                                            data-oid="skj8yt5"
                                        >
                                            {selectedCountry.symbol}
                                            {metrics?.profitShare ?? 0}
                                        </div>
                                        <div
                                            className="text-xs text-gray-500 mt-1"
                                            data-oid="bjj1:lc"
                                        >
                                            per year
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        data-oid="eu-taz8"
                                    >
                                        <div className="group relative" data-oid="ng67p1j">
                                            <div
                                                className="text-sm text-gray-600 mb-1 flex items-center"
                                                data-oid="r87r6b5"
                                            >
                                                Return on Investment
                                                <svg
                                                    className="w-4 h-4 ml-1 text-gray-400 cursor-help"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    data-oid="z::uy6q"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        data-oid="-:oyvkb"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2"
                                                data-oid="y5g550i"
                                            >
                                                {tooltips.roi}
                                            </div>
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-blue-900"
                                            data-oid="p0sj1:x"
                                        >
                                            {`${metrics?.roi ?? 0}%`}
                                        </div>
                                        <div
                                            className="text-xs text-gray-500 mt-1"
                                            data-oid="nzmou3o"
                                        >
                                            annual yield
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        data-oid="qxjng2u"
                                    >
                                        <div className="group relative" data-oid="v:6k2ga">
                                            <div
                                                className="text-sm text-gray-600 mb-1 flex items-center"
                                                data-oid="v76.b4_"
                                            >
                                                Dividend Income
                                                <svg
                                                    className="w-4 h-4 ml-1 text-gray-400 cursor-help"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    data-oid="vlx8ohp"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        data-oid="tb1jz-3"
                                                    />
                                                </svg>
                                            </div>
                                            <div
                                                className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2"
                                                data-oid="1nr21im"
                                            >
                                                {tooltips.dividendIncome}
                                            </div>
                                        </div>
                                        <div
                                            className="text-2xl font-bold text-teal-600"
                                            data-oid="_uauv__"
                                        >
                                            {selectedCountry.symbol}
                                            {metrics?.annualDividend ?? 0}
                                        </div>
                                        <div
                                            className="text-sm font-medium text-blue-900 mt-1"
                                            data-oid="exu8ry0"
                                        >
                                            {calculateCompanyMetrics(selectedCompany)
                                                ?.dividendYield ?? 0}
                                            % yield
                                        </div>
                                        <div
                                            className="text-xs text-gray-500 mt-1"
                                            data-oid="ynxjjij"
                                        >
                                            per year
                                        </div>
                                    </motion.div>
                                </motion.div>
                                <Disclaimer
                                    currency={selectedCountry.currency}
                                    data-oid="3-d7:zy"
                                />
                                {shares && (
                                    <div className="flex justify-end mt-4" data-oid="7uo5dm9">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-blue-900 border border-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                                            onClick={() => {
                                                if (!metrics) return;
                                                const shareText = `Check out my slice of ${selectedCompany.name}: ${metrics.ownershipPercentage}% ownership generating ${selectedCountry.symbol}${metrics.annualDividend} in annual dividends!`;
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: 'My Stock Ownership Slice',
                                                        text: shareText,
                                                        url: window.location.href,
                                                    });
                                                } else {
                                                    navigator.clipboard.writeText(shareText);
                                                    alert('Share text copied to clipboard!');
                                                }
                                            }}
                                            data-oid="fx5p944"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                data-oid="-g81wgo"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                                    data-oid="4-2fn0-"
                                                />
                                            </svg>
                                            Share My Slice
                                        </motion.button>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                )}

                {/* Getting Started Guide */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                    data-oid="v3bfrny"
                >
                    <div className="text-center mb-12" data-oid="7ku4jx:">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6" data-oid="4t5zsqn">
                            Start Your Investment Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-oid="7eresnp">
                            New to investing? Follow our simple guide to get started with your first
                            stock purchase.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="-uc8qs5">
                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            data-oid="c9bie_s"
                        >
                            <div className="p-8" data-oid="2smovd8">
                                <div className="text-4xl mb-4" data-oid="htcy71z">
                                    1️⃣
                                </div>
                                <h3
                                    className="text-xl font-semibold text-blue-900 mb-4"
                                    data-oid=".q9gppk"
                                >
                                    Choose Your Broker
                                </h3>
                                <p className="text-gray-600 mb-6" data-oid="kg7.w6y">
                                    Select a licensed online broker that suits your needs. Popular
                                    options in:
                                </p>
                                <div className="space-y-4" data-oid="48qv:me">
                                    <div className="bg-blue-50 p-4 rounded-lg" data-oid="bh9jhty">
                                        <h4
                                            className="font-medium mb-2 flex items-center gap-2"
                                            data-oid="c_2-fok"
                                        >
                                            <span className="text-lg" data-oid="xdzk0ox">
                                                🇺🇸
                                            </span>{' '}
                                            United States
                                        </h4>
                                        <ul
                                            className="text-sm text-gray-600 space-y-2"
                                            data-oid="g5rv2-2"
                                        >
                                            <li data-oid="9kdy.hn">
                                                • Robinhood - Commission-free, beginner-friendly
                                            </li>
                                            <li data-oid="1rz.ihl">
                                                • Fidelity - Full-service, excellent research tools
                                            </li>
                                            <li data-oid="6rj0:.d">
                                                • Charles Schwab - Great customer service
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg" data-oid="w-.egdq">
                                        <h4
                                            className="font-medium mb-2 flex items-center gap-2"
                                            data-oid="wtkp7vo"
                                        >
                                            <span className="text-lg" data-oid="oaz.xsm">
                                                🇦🇺
                                            </span>{' '}
                                            Australia
                                        </h4>
                                        <ul
                                            className="text-sm text-gray-600 space-y-2"
                                            data-oid="kwqyfxa"
                                        >
                                            <li data-oid="-5mvisy">
                                                • CommSec - Most popular, bank integration
                                            </li>
                                            <li data-oid="v1lq3s5">
                                                • Stake - Low-cost trading platform
                                            </li>
                                            <li data-oid="vvmvzzr">
                                                • SelfWealth - Fixed-fee trading
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            data-oid="wnqfi.2"
                        >
                            <div className="p-8" data-oid="5:jt:sc">
                                <div className="text-4xl mb-4" data-oid="2ii10o3">
                                    2️⃣
                                </div>
                                <h3
                                    className="text-xl font-semibold text-blue-900 mb-4"
                                    data-oid="erbg-40"
                                >
                                    Set Up Your Account
                                </h3>
                                <p className="text-gray-600 mb-6" data-oid="e9yb-ox">
                                    Complete these steps to open your trading account:
                                </p>
                                <div className="space-y-3" data-oid="3eift57">
                                    <div className="flex items-start gap-3" data-oid="tko48ci">
                                        <div
                                            className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0"
                                            data-oid=":he0y53"
                                        >
                                            1
                                        </div>
                                        <div data-oid=":hwn0s:">
                                            <h4
                                                className="font-medium text-gray-800"
                                                data-oid="c6tim6n"
                                            >
                                                Verify Your Identity
                                            </h4>
                                            <p className="text-sm text-gray-600" data-oid="mm3s6qt">
                                                Provide government ID and proof of address
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3" data-oid="mwe2y-1">
                                        <div
                                            className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0"
                                            data-oid="-86clgw"
                                        >
                                            2
                                        </div>
                                        <div data-oid="e2ek._f">
                                            <h4
                                                className="font-medium text-gray-800"
                                                data-oid="gl32xx1"
                                            >
                                                Link Your Bank
                                            </h4>
                                            <p className="text-sm text-gray-600" data-oid="b96_73z">
                                                Connect your bank account for funding
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3" data-oid="2.uxb8o">
                                        <div
                                            className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0"
                                            data-oid=".83_gev"
                                        >
                                            3
                                        </div>
                                        <div data-oid="zrras54">
                                            <h4
                                                className="font-medium text-gray-800"
                                                data-oid="n80r9d6"
                                            >
                                                Fund Your Account
                                            </h4>
                                            <p className="text-sm text-gray-600" data-oid="2o941l3">
                                                Transfer money to start trading
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            data-oid="cu4cx0t"
                        >
                            <div className="p-8" data-oid="lw2_td.">
                                <div className="text-4xl mb-4" data-oid="wpopi2j">
                                    3️⃣
                                </div>
                                <h3
                                    className="text-xl font-semibold text-blue-900 mb-4"
                                    data-oid="lgh3u_a"
                                >
                                    Make Your First Trade
                                </h3>
                                <p className="text-gray-600 mb-6" data-oid=":w_snd6">
                                    Ready to buy your first shares? Here's what to know:
                                </p>
                                <div className="space-y-4" data-oid="4f0jqpu">
                                    <div className="bg-blue-50 p-4 rounded-lg" data-oid="_5wppcs">
                                        <h4 className="font-medium mb-2" data-oid="ew:b311">
                                            Order Types
                                        </h4>
                                        <ul
                                            className="text-sm text-gray-600 space-y-2"
                                            data-oid="j_nfdcs"
                                        >
                                            <li data-oid="w-u6d2s">
                                                • Market Order: Buy at current price
                                            </li>
                                            <li data-oid="vso2kvq">
                                                • Limit Order: Set your maximum price
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg" data-oid="udooqu3">
                                        <h4 className="font-medium mb-2" data-oid="gzn5iia">
                                            Trading Hours
                                        </h4>
                                        <ul
                                            className="text-sm text-gray-600 space-y-2"
                                            data-oid="o8az7a8"
                                        >
                                            <li data-oid="0zmob-e">
                                                🇺🇸 NYSE: 9:30 AM - 4:00 PM ET
                                            </li>
                                            <li data-oid="7mv8m_-">
                                                🇦🇺 ASX: 10:00 AM - 4:00 PM AEST
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 p-6 rounded-xl" data-oid="2zltt24">
                        <div className="flex items-start gap-4" data-oid="oobmy5f">
                            <div className="text-2xl" data-oid="__3vutb">
                                💡
                            </div>
                            <div data-oid="uwxdnn:">
                                <h4 className="font-semibold text-blue-900 mb-2" data-oid=".2fb:m3">
                                    Pro Tip
                                </h4>
                                <p className="text-gray-600" data-oid="4myl23b">
                                    Start with a small investment in well-known companies you
                                    understand. Use our calculator above to see exactly what your
                                    ownership means, and consider setting up regular investments to
                                    build your portfolio over time.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Premium Features Preview */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                    data-oid="90mxv0g"
                >
                    <div className="text-center mb-12" data-oid="h8:4len">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6" data-oid="vxm1t:w">
                            Unlock More with{' '}
                            <span className="text-blue-900" data-oid="x1fdw0d">
                                Portionary Pro
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-oid="_yl6r:q">
                            Take your investment understanding to the next level with our premium
                            features.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8" data-oid="r6haj0u">
                        {/* Company Comparison Feature */}
                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            data-oid="awumf1u"
                        >
                            <div className="relative" data-oid="mej_x:v">
                                <div className="absolute top-4 right-4" data-oid="uczjo.q">
                                    <span
                                        className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                                        data-oid="dm.7p74"
                                    >
                                        Pro
                                    </span>
                                </div>
                                <div className="p-8" data-oid="s3m.xt3">
                                    <div className="text-4xl mb-4" data-oid="3159f.o">
                                        🔄
                                    </div>
                                    <h3
                                        className="text-2xl font-semibold text-blue-900 mb-4"
                                        data-oid="m7a1:l6"
                                    >
                                        Company Comparison
                                    </h3>
                                    <p className="text-gray-600 mb-6" data-oid="akh6v:f">
                                        Compare multiple companies side by side. Analyze metrics,
                                        performance, and your potential returns across different
                                        investments.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg" data-oid="bq6v9ww">
                                        <div
                                            className="grid grid-cols-3 gap-4 text-sm"
                                            data-oid="_m.3c:u"
                                        >
                                            <div className="text-center" data-oid="thf4mru">
                                                <div
                                                    className="font-medium text-gray-600"
                                                    data-oid="8hwsroj"
                                                >
                                                    Apple
                                                </div>
                                                <div
                                                    className="text-blue-900 font-bold"
                                                    data-oid="7luw:f-"
                                                >
                                                    25.3%
                                                </div>
                                                <div className="text-gray-500" data-oid="t-vsot8">
                                                    Profit Margin
                                                </div>
                                            </div>
                                            <div className="text-center" data-oid="i76epyx">
                                                <div
                                                    className="font-medium text-gray-600"
                                                    data-oid="1lsp6g0"
                                                >
                                                    vs
                                                </div>
                                            </div>
                                            <div className="text-center" data-oid="2tu2nxh">
                                                <div
                                                    className="font-medium text-gray-600"
                                                    data-oid="_dy:njr"
                                                >
                                                    Microsoft
                                                </div>
                                                <div
                                                    className="text-blue-900 font-bold"
                                                    data-oid="8cxuppg"
                                                >
                                                    42.1%
                                                </div>
                                                <div className="text-gray-500" data-oid="157k.oe">
                                                    Profit Margin
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Management Feature */}
                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                            data-oid="8smgf2p"
                        >
                            <div className="relative" data-oid="d:szcou">
                                <div className="absolute top-4 right-4" data-oid="zz691nk">
                                    <span
                                        className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                                        data-oid="jvdug_b"
                                    >
                                        Pro
                                    </span>
                                </div>
                                <div className="p-8" data-oid="1zshcaz">
                                    <div className="text-4xl mb-4" data-oid="jeyr.-l">
                                        📊
                                    </div>
                                    <h3
                                        className="text-2xl font-semibold text-blue-900 mb-4"
                                        data-oid="2x5xqyf"
                                    >
                                        Portfolio Management
                                    </h3>
                                    <p className="text-gray-600 mb-6" data-oid="a94e:y7">
                                        Save your portfolio and track your total ownership across
                                        multiple companies. See aggregated earnings and dividend
                                        income.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg" data-oid="cn4q44t">
                                        <div className="space-y-3" data-oid="vcb9jhb">
                                            <div
                                                className="flex justify-between items-center"
                                                data-oid="2480bbq"
                                            >
                                                <span className="text-gray-600" data-oid="e1q_ctv">
                                                    Total Portfolio Value
                                                </span>
                                                <span
                                                    className="text-blue-900 font-bold"
                                                    data-oid="7xwi2hp"
                                                >
                                                    $24,567.89
                                                </span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center"
                                                data-oid="nn8w0.s"
                                            >
                                                <span className="text-gray-600" data-oid="yri4uy7">
                                                    Annual Dividend Income
                                                </span>
                                                <span
                                                    className="text-teal-600 font-bold"
                                                    data-oid="8wtm9af"
                                                >
                                                    $892.40
                                                </span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center"
                                                data-oid="d0_peko"
                                            >
                                                <span className="text-gray-600" data-oid="btfb0md">
                                                    Companies Tracked
                                                </span>
                                                <span
                                                    className="text-blue-900 font-bold"
                                                    data-oid="3h6icw5"
                                                >
                                                    5
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12" data-oid="41lg1ua">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-900 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-800 transition-colors"
                            onClick={() => {
                                // Add login/signup flow here
                                alert('Coming soon! Sign up for early access.');
                            }}
                            data-oid="6g8:em5"
                        >
                            Get Started with Pro
                        </motion.button>
                        <p className="text-gray-500 mt-4" data-oid="xh4o0hj">
                            Early bird pricing available for a limited time
                        </p>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-white border-t" data-oid="ahm4tkg">
                <div className="max-w-7xl mx-auto px-4 py-12" data-oid="-sbdl:6">
                    <div className="grid md:grid-cols-4 gap-8" data-oid="jf6p7ei">
                        <div data-oid="o570q8b">
                            <div className="flex items-center space-x-2 mb-4" data-oid="iw_k1a2">
                                <div
                                    className="w-6 h-6 bg-blue-900 rounded-lg flex items-center justify-center"
                                    data-oid="nlswxsd"
                                >
                                    <span
                                        className="text-lg font-bold text-white"
                                        data-oid="434gut0"
                                    >
                                        P
                                    </span>
                                </div>
                                <div className="text-lg font-bold text-blue-900" data-oid="8zm3ylz">
                                    portionary
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm" data-oid="mmkigsq">
                                Making stock ownership simple and meaningful.
                            </p>
                        </div>
                        <div data-oid="whjbrh5">
                            <h4 className="font-semibold mb-4" data-oid="_8ebz51">
                                Product
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600" data-oid="e7r:x6y">
                                <li data-oid="u90m7.r">Features</li>
                                <li data-oid="qxn9:fw">Pricing</li>
                                <li data-oid="5z-ud88">Early Access</li>
                            </ul>
                        </div>
                        <div data-oid="t4py5y7">
                            <h4 className="font-semibold mb-4" data-oid="sozqj.v">
                                Company
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600" data-oid="h.twsst">
                                <li data-oid="0atuhmx">About</li>
                                <li data-oid=".2i7.k2">Contact</li>
                                <li data-oid="lgxb:vq">Privacy Policy</li>
                            </ul>
                        </div>
                        <div data-oid="ijdcp8_">
                            <h4 className="font-semibold mb-4" data-oid="f3pm-no">
                                Updates
                            </h4>
                            <p className="text-sm text-gray-600 mb-4" data-oid="ihkdlr:">
                                Stay updated with our latest features and releases.
                            </p>
                            <div className="flex" data-oid=".hb7nzw">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 p-2 border border-r-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    data-oid="37s2rr6"
                                />

                                <button
                                    className="bg-blue-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800"
                                    data-oid="93wvpx0"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="mt-8 pt-8 border-t text-center text-sm text-gray-600"
                        data-oid="_wa891g"
                    >
                        © 2024 Portionary. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
