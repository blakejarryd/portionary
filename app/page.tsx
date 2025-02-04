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
        const dividendYield = (financials.quarterlyDividend * 4 / sharePrice) * 100;

        return {
            dividendYield: Math.round(dividendYield * 100) / 100
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
                roi: 0
            };
        }

        const financials = companyFinancials[selectedCompany.id];
        if (!financials) return null;

        const sharePrice = getSharePrice(selectedCompany);
        const sharesNum = parseFloat(shares); // Convert string to number
        
        const ownershipPercentage = (sharesNum / (financials.sharesOutstanding * 1000000)) * 100;
        const revenueShare = (financials.annualRevenue * 1000000) * (ownershipPercentage / 100);
        const profitShare = (financials.annualProfit * 1000000) * (ownershipPercentage / 100);
        const quarterlyDividend = sharesNum * financials.quarterlyDividend;
        const annualDividend = quarterlyDividend * 4;
        
        // Calculate yields
        const earningsYield = ((financials.annualProfit * 1000000) / (financials.sharesOutstanding * 1000000) / sharePrice) * 100;
        
        // Total ROI includes both dividend yield and earnings yield
        const totalROI = earningsYield;

        return {
            revenueShare: Math.round(revenueShare),
            profitShare: Math.round(profitShare),
            ownershipPercentage: ownershipPercentage.toFixed(6),
            dividendIncome: Math.round(quarterlyDividend * 100) / 100,
            annualDividend: Math.round(annualDividend * 100) / 100,
            roi: Math.round(totalROI * 100) / 100
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
                block: 'center'
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
            maximumFractionDigits: 2
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
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg
                    className="w-5 h-5 text-blue-900 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p>
                    All calculations are based on the company's most recent
                    annual report and shown in {currency}. These numbers help you understand
                    the company's current position, but remember that performance changes over time.
                </p>
            </div>
        </div>
    );

    // Add tooltips object near the top of the component
    const tooltips = {
        profitMargin: "Profit margin shows how much of each dollar of revenue becomes profit",
        dividendYield: "Annual dividend payments as a percentage of the current share price",
        roi: "Return on Investment based on the company's earnings relative to share price",
        ownershipSlice: "Your percentage ownership of the company's total shares",
        revenueShare: "Your portion of the company's annual revenue based on your ownership",
        profitShare: "Your portion of the company's annual profit based on your ownership",
        dividendIncome: "Expected annual dividend payments based on current dividend rate"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">P</span>
                            </div>
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-blue-900">portionary</div>
                                <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Beta</span>
                            </div>
                        </div>
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
                <section className="min-h-[60vh] flex flex-col justify-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-6xl font-bold text-gray-800 mb-6">
                            Your Slice of the Market,
                            <br />
                            <span className="text-blue-900">Simplified</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
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
                >
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                        Calculate Your <span className="text-blue-900">Slice</span>
                    </h2>
                    <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        A piece of a company = a piece of its success. See exactly what your
                        investment means in real terms.
                    </p>
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">
                                        Select Market
                                    </label>
                                    <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                                        <div className="relative">
                                            <Listbox.Button className="w-full p-3 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors">
                                                <span className="flex items-center gap-2">
                                                    <span className="text-xl">
                                                        {selectedCountry.flag}
                                                    </span>
                                                    {selectedCountry.name}
                                                </span>
                                            </Listbox.Button>
                                            <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                {countries.map((country) => (
                                                    <Listbox.Option
                                                        key={country.id}
                                                        value={country}
                                                        as={Fragment}
                                                    >
                                                        {({ active, selected }) => (
                                                            <li
                                                                className={`p-3 flex items-center gap-2 cursor-pointer ${
                                                                    active ? 'bg-teal-50' : ''
                                                                }`}
                                                            >
                                                                <span className="text-xl">
                                                                    {country.flag}
                                                                </span>
                                                                {country.name}
                                                                {selected && (
                                                                    <CheckIcon className="w-5 h-5 text-teal-600 ml-auto" />
                                                                )}
                                                            </li>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </div>
                                    </Listbox>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium">
                                        Search Company
                                    </label>
                                    <Combobox 
                                        value={selectedCompany} 
                                        onChange={(company) => {
                                            setIsLoading(true);
                                            setSelectedCompany(company);
                                            setTimeout(() => setIsLoading(false), 500);
                                        }}
                                    >
                                        <div className="relative">
                                            <Combobox.Input
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                                                placeholder="Search by name or ticker"
                                                displayValue={(company: Company | null) => company?.name || ''}
                                                onChange={(event) =>
                                                    setQuery(event.target.value)
                                                }
                                            />

                                            <Combobox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                                {filteredCompanies.map((company) => (
                                                    <Combobox.Option
                                                        key={company.id}
                                                        value={company}
                                                        as={Fragment}
                                                    >
                                                        {({ active, selected }) => (
                                                            <li
                                                                className={`p-3 cursor-pointer list-none ${
                                                                    active ? 'bg-teal-50' : ''
                                                                }`}
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <span className="font-medium">
                                                                        {company.name}
                                                                    </span>
                                                                    <span className="text-sm text-gray-500">
                                                                        {company.exchange}: {company.id}
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
                                    >
                                        <label className="block text-gray-700 mb-2 font-medium">
                                            Your Holdings
                                        </label>
                                        <div className="space-y-4">
                                            <input
                                                type="number"
                                                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                value={shares}
                                                onChange={handleSharesChange}
                                                placeholder="Enter number of shares"
                                            />
                                            {shares && (
                                                <motion.div 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="p-4 bg-blue-50 rounded-lg"
                                                >
                                                    <div className="text-sm text-gray-600">Total Value</div>
                                                    <div className="text-xl font-bold text-blue-900">
                                                        {selectedCountry.symbol}{formatCurrency(parseFloat(shares) * getSharePrice(selectedCompany))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {selectedCompany ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Company Overview</h3>
                                        {isLoading ? (
                                            <div className="h-full flex items-center justify-center">
                                                <div className="animate-pulse space-y-4">
                                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="h-20 bg-gray-200 rounded"></div>
                                                        <div className="h-20 bg-gray-200 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4 mb-2">
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <div className="text-sm text-gray-600">Share Price</div>
                                                    <div className="text-xl font-bold text-blue-900">
                                                        {selectedCountry.symbol}{formatCurrency(getSharePrice(selectedCompany))}
                                                    </div>
                                                </div>
                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                    <div className="text-sm text-gray-600">Market Cap</div>
                                                    <div className="text-xl font-bold text-blue-900">
                                                        {selectedCountry.symbol}{formatLargeNumber(companyFinancials[selectedCompany.id].marketCap * 1000000)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="text-xs text-gray-500 italic">
                                            * Market data delayed by 15 minutes
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            * Financial data shown is for demonstration purposes
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-600 mb-3">Latest Financial Reports</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <div className="text-sm text-gray-600">Annual Revenue</div>
                                                <div className="text-xl font-bold text-blue-900">
                                                    {selectedCountry.symbol}{formatLargeNumber(companyFinancials[selectedCompany.id].annualRevenue * 1000000)}
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <div className="text-sm text-gray-600">Annual Profit</div>
                                                <div className="text-xl font-bold text-blue-900">
                                                    {selectedCountry.symbol}{formatLargeNumber(companyFinancials[selectedCompany.id].annualProfit * 1000000)}
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <div className="text-sm text-gray-600">Profit Margin</div>
                                                <div className="text-xl font-bold text-blue-900">
                                                    {calculateProfitMargin(
                                                        companyFinancials[selectedCompany.id].annualRevenue,
                                                        companyFinancials[selectedCompany.id].annualProfit
                                                    ).toFixed(1)}%
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                <div className="text-sm text-gray-600">Annual Dividend Yield</div>
                                                <div className="text-xl font-bold text-blue-900">
                                                    {calculateCompanyMetrics(selectedCompany)?.dividendYield ?? 0}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Disclaimer currency={selectedCountry.currency} />
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <motion.div 
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-center"
                                    >
                                        <div className="text-5xl mb-4">🔍</div>
                                        <div className="text-gray-600">
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
                    >
                        <h3 className="text-xl font-semibold text-blue-900 mb-6">Your Slice of the Company</h3>
                        {!shares ? (
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-blue-50 p-8 rounded-xl text-center"
                            >
                                <div className="text-5xl mb-4">🔢</div>
                                <div className="text-gray-600">
                                    Enter the number of shares above to see your portion of the company
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid md:grid-cols-4 gap-4"
                                >
                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="group relative">
                                            <div className="text-sm text-gray-600 mb-1 flex items-center">
                                                Your Share of Revenue
                                                <svg className="w-4 h-4 ml-1 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2">
                                                {tooltips.revenueShare}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-teal-600">
                                            {selectedCountry.symbol}
                                            {metrics?.revenueShare ?? 0}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">per year</div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="group relative">
                                            <div className="text-sm text-gray-600 mb-1 flex items-center">
                                                Your Share of Profit
                                                <svg className="w-4 h-4 ml-1 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2">
                                                {tooltips.profitShare}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-orange-500">
                                            {selectedCountry.symbol}
                                            {metrics?.profitShare ?? 0}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">per year</div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="group relative">
                                            <div className="text-sm text-gray-600 mb-1 flex items-center">
                                                Return on Investment
                                                <svg className="w-4 h-4 ml-1 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2">
                                                {tooltips.roi}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-blue-900">
                                            {`${metrics?.roi ?? 0}%`}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            annual yield
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white p-6 rounded-lg shadow-lg"
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="group relative">
                                            <div className="text-sm text-gray-600 mb-1 flex items-center">
                                                Dividend Income
                                                <svg className="w-4 h-4 ml-1 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded-lg -top-2 left-full ml-2">
                                                {tooltips.dividendIncome}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-teal-600">
                                            {selectedCountry.symbol}
                                            {metrics?.annualDividend ?? 0}
                                        </div>
                                        <div className="text-sm font-medium text-blue-900 mt-1">
                                            {calculateCompanyMetrics(selectedCompany)?.dividendYield ?? 0}% yield
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            per year
                                        </div>
                                    </motion.div>
                                </motion.div>
                                <Disclaimer currency={selectedCountry.currency} />
                                {shares && (
                                    <div className="flex justify-end mt-4">
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
                                                        url: window.location.href
                                                    });
                                                } else {
                                                    navigator.clipboard.writeText(shareText);
                                                    alert('Share text copied to clipboard!');
                                                }
                                            }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
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
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Start Your Investment Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            New to investing? Follow our simple guide to get started with your first stock purchase.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-8">
                                <div className="text-4xl mb-4">2️⃣</div>
                                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                    Set Up Your Account
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Complete these steps to open your trading account:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0">1</div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Verify Your Identity</h4>
                                            <p className="text-sm text-gray-600">Provide government ID and proof of address</p>
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
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                        </div>
                    </div>

                    <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                            <div className="text-2xl">💡</div>
                            <div>
                                <h4 className="font-semibold text-blue-900 mb-2">Pro Tip</h4>
                                <p className="text-gray-600">
                                    Start with a small investment in well-known companies you understand. Use our calculator above to see exactly what your ownership means, and consider setting up regular investments to build your portfolio over time.
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
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Unlock More with <span className="text-blue-900">Portionary Pro</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Take your investment understanding to the next level with our premium features.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Company Comparison Feature */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Pro
                                    </span>
                                </div>
                                <div className="p-8">
                                    <div className="text-4xl mb-4">🔄</div>
                                    <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                                        Company Comparison
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Compare multiple companies side by side. Analyze metrics, performance, and your potential returns across different investments.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">Apple</div>
                                                <div className="text-blue-900 font-bold">25.3%</div>
                                                <div className="text-gray-500">Profit Margin</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">vs</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">Microsoft</div>
                                                <div className="text-blue-900 font-bold">42.1%</div>
                                                <div className="text-gray-500">Profit Margin</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Management Feature */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Pro
                                    </span>
                                </div>
                                <div className="p-8">
                                    <div className="text-4xl mb-4">📊</div>
                                    <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                                        Portfolio Management
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Save your portfolio and track your total ownership across multiple companies. See aggregated earnings and dividend income.
                                    </p>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Total Portfolio Value</span>
                                                <span className="text-blue-900 font-bold">$24,567.89</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Annual Dividend Income</span>
                                                <span className="text-teal-600 font-bold">$892.40</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Companies Tracked</span>
                                                <span className="text-blue-900 font-bold">5</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-900 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-800 transition-colors"
                            onClick={() => {
                                // Add login/signup flow here
                                alert('Coming soon! Sign up for early access.');
                            }}
                        >
                            Get Started with Pro
                        </motion.button>
                        <p className="text-gray-500 mt-4">
                            Early bird pricing available for a limited time
                        </p>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-6 h-6 bg-blue-900 rounded-lg flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">P</span>
                                </div>
                                <div className="text-lg font-bold text-blue-900">portionary</div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Making stock ownership simple and meaningful.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Features</li>
                                <li>Pricing</li>
                                <li>Early Access</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>About</li>
                                <li>Contact</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Updates</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Stay updated with our latest features and releases.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 p-2 border border-r-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button className="bg-blue-900 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
                        © 2024 Portionary. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
