interface CompanyFinancials {
    id: string;
    marketCap: number;  // in millions
    sharesOutstanding: number;  // in millions
    annualRevenue: number;  // in millions
    annualProfit: number;  // in millions
    quarterlyDividend: number;  // per share per quarter
}

export const companyFinancials: Record<string, CompanyFinancials> = {
    'AAPL': {  // Apple Inc. (NASDAQ)
        id: 'AAPL',
        marketCap: 2900000,  // USD millions
        sharesOutstanding: 15500,  // millions
        annualRevenue: 383900,  // millions USD
        annualProfit: 96995,  // millions USD
        quarterlyDividend: 0.24,  // USD per share per quarter
    },
    'GOOGL': {  // Alphabet Inc. (NASDAQ)
        id: 'GOOGL',
        marketCap: 1800000,  // USD millions
        sharesOutstanding: 12800,  // millions
        annualRevenue: 307400,  // millions USD
        annualProfit: 73800,  // millions USD
        quarterlyDividend: 0,  // No dividends
    },
    'MSFT': {  // Microsoft Corporation (NASDAQ)
        id: 'MSFT',
        marketCap: 3000000,  // USD millions
        sharesOutstanding: 7420,  // millions
        annualRevenue: 211900,  // millions USD
        annualProfit: 72360,  // millions USD
        quarterlyDividend: 0.75,  // USD per share per quarter
    },
    'WOW': {  // Woolworths Group (ASX)
        id: 'WOW',
        marketCap: 45000,  // AUD millions
        sharesOutstanding: 1200,  // millions
        annualRevenue: 64300,  // millions AUD
        annualProfit: 1620,  // millions AUD
        quarterlyDividend: 0.51,  // AUD per share per quarter
    },
    'CBA': {  // Commonwealth Bank (ASX)
        id: 'CBA',
        marketCap: 175000,  // AUD millions
        sharesOutstanding: 1670,  // millions
        annualRevenue: 26380,  // millions AUD
        annualProfit: 10170,  // millions AUD
        quarterlyDividend: 1.15,  // AUD per share per quarter
    },
    'BHP': {  // BHP Group (ASX)
        id: 'BHP',
        marketCap: 235000,  // AUD millions
        sharesOutstanding: 5060,  // millions
        annualRevenue: 53820,  // millions AUD
        annualProfit: 12880,  // millions AUD
        quarterlyDividend: 0.80,  // AUD per share per quarter
    }
}; 