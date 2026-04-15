import React, { useState, useEffect } from 'react';
import { Clock, Target, Map, PlayCircle, BookOpen, CheckCircle, ChevronRight, AlertCircle, RefreshCw, History, X } from 'lucide-react';

// --- MOCK DATA (Schweser-Mapped JSON) ---
const fsaRoadmapData = [
  {
    day: 1,
    schweser_reading_name: "Introduction to Financial Statement Analysis",
    schweser_module: "Module 1.1: Scope of FSA & Module 1.2: Financial Reporting Mechanics",
    isLocked: false,
    questions: [
      { id: "d1_q1", LOS: "Describe the roles of financial reporting and financial statement analysis.", difficulty_level: "Concept", question_text: "The primary role of financial statement analysis is to:", options: { "A": "Provide information about a company's performance and financial position.", "B": "Use financial reports to evaluate a company's past performance in order to make economic decisions.", "C": "Ensure that the company's financial statements conform to accounting standards." }, correct_answer: "B", explanation: "Financial statement analysis uses information to make economic decisions. Option A is the role of financial reporting.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q2", LOS: "Describe the objective of audits of financial statements, the types of audit reports, and the importance of effective internal controls.", difficulty_level: "Concept", question_text: "An independent audit report that expresses a qualified opinion most likely indicates that the financial statements:", options: { "A": "contain a material departure from accounting standards but are generally presented fairly.", "B": "are not presented fairly and should not be relied upon by analysts.", "C": "fully comply with all applicable accounting standards with no exceptions." }, correct_answer: "A", explanation: "A qualified opinion states that the financial statements are presented fairly, with the exception of one or more material items.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q3", LOS: "Describe the objective of audits.", difficulty_level: "Concept", question_text: "Which of the following audit opinions provides the highest level of assurance to an analyst?", options: { "A": "Qualified opinion.", "B": "Unqualified opinion.", "C": "Adverse opinion." }, correct_answer: "B", explanation: "An unqualified (clean) opinion is the best possible report and states that the statements are presented fairly.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q4", LOS: "Identify and describe information sources that analysts use in financial statement analysis besides annual financial statements.", difficulty_level: "Concept", question_text: "Information about management's compensation is most likely found in the:", options: { "A": "proxy statement.", "B": "auditor's report.", "C": "management discussion and analysis (MD&A)." }, correct_answer: "A", explanation: "Proxy statements contain information regarding management and director compensation, and conflicts of interest.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q5", LOS: "Describe the objective of audits.", difficulty_level: "Concept", question_text: "If an auditor believes the financial statements materially depart from accounting standards and are not presented fairly, they will issue a(n):", options: { "A": "Disclaimer of opinion.", "B": "Qualified opinion.", "C": "Adverse opinion." }, correct_answer: "C", explanation: "An adverse opinion is issued when statements are not presented fairly.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q6", LOS: "Describe the roles of financial reporting.", difficulty_level: "Concept", question_text: "Which financial statement provides a snapshot of a company's financial position at a specific point in time?", options: { "A": "Income Statement.", "B": "Statement of Cash Flows.", "C": "Balance Sheet." }, correct_answer: "C", explanation: "The balance sheet shows financial position at a specific point in time.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q7", LOS: "Identify and describe information sources.", difficulty_level: "Concept", question_text: "A U.S. publicly traded company must file a report regarding a material corporate event, such as an acquisition. This is filed on:", options: { "A": "Form 10-K.", "B": "Form 10-Q.", "C": "Form 8-K." }, correct_answer: "C", explanation: "Form 8-K is used to report material events to the SEC.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q8", LOS: "Describe the objective of audits.", difficulty_level: "Concept", question_text: "A disclaimer of opinion is most likely issued when the auditor:", options: { "A": "finds a minor deviation from GAAP.", "B": "is unable to form an opinion due to a scope limitation.", "C": "disagrees with management's accounting estimates." }, correct_answer: "B", explanation: "A disclaimer is issued if the auditor is unable to express an opinion.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q9", LOS: "Describe the financial statement analysis framework.", difficulty_level: "Concept", question_text: "In the financial statement analysis framework, which phase involves producing updated forecasts?", options: { "A": "Analyze/Interpret the processed data.", "B": "Develop and communicate conclusions.", "C": "Process data." }, correct_answer: "A", explanation: "Analyzing and interpreting the data involves using the processed data to generate forecasts and answer the research question.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q10", LOS: "Describe the qualitative characteristics.", difficulty_level: "Concept", question_text: "According to the IFRS Conceptual Framework, the two fundamental qualitative characteristics of financial reports are:", options: { "A": "Comparability and understandability.", "B": "Relevance and faithful representation.", "C": "Timeliness and verifiability." }, correct_answer: "B", explanation: "Relevance and faithful representation are fundamental. The others are enhancing characteristics.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q11", LOS: "Describe the qualitative characteristics.", difficulty_level: "Concept", question_text: "Information that influences users' economic decisions is considered to have:", options: { "A": "Verifiability.", "B": "Timeliness.", "C": "Relevance." }, correct_answer: "C", explanation: "Information is relevant if it can influence economic decisions or affect users' evaluations.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q12", LOS: "Describe the qualitative characteristics.", difficulty_level: "Concept", question_text: "Faithful representation requires information to be complete, neutral, and:", options: { "A": "Free from error.", "B": "Conservative.", "C": "Timely." }, correct_answer: "A", explanation: "Faithful representation means the information is complete, neutral, and free from error.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q13", LOS: "Describe the objective of financial reporting.", difficulty_level: "Concept", question_text: "The primary users of general-purpose financial reports are most likely:", options: { "A": "Management.", "B": "Regulators.", "C": "Investors and creditors." }, correct_answer: "C", explanation: "The Conceptual Framework states the primary users are existing and potential investors, lenders, and other creditors.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q14", LOS: "Identify required financial statements.", difficulty_level: "Concept", question_text: "Under IFRS, a complete set of financial statements least likely includes:", options: { "A": "Management Discussion & Analysis (MD&A).", "B": "Statement of changes in equity.", "C": "Notes to financial statements." }, correct_answer: "A", explanation: "MD&A is outside the scope of the audited financial statements, though it is usually required by regulators.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q15", LOS: "Describe financial reporting mechanics.", difficulty_level: "Challenge", question_text: "At the beginning of the year, a firm has Assets of $10,000 and Liabilities of $4,000. During the year, it earns Net Income of $2,000 and pays Dividends of $500. No new equity is issued. End-of-year Liabilities are $5,000. End-of-year Assets are closest to:", options: { "A": "11,500.", "B": "12,500.", "C": "13,500." }, correct_answer: "B", explanation: "Beg Equity = 10k - 4k = 6k. End Equity = 6k + 2k (NI) - 500 (Div) = 7,500. End Assets = End Liab + End Equity = 5,000 + 7,500 = 12,500.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q16", LOS: "Identify underlying assumptions.", difficulty_level: "Concept", question_text: "The assumption that an entity will continue to operate for the foreseeable future is called:", options: { "A": "Accrual basis.", "B": "Going concern.", "C": "Historical cost." }, correct_answer: "B", explanation: "Going concern assumes the company will not be liquidated in the foreseeable future.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q17", LOS: "Describe standard-setting bodies.", difficulty_level: "Concept", question_text: "Which organization is responsible for setting IFRS?", options: { "A": "FASB.", "B": "IOSCO.", "C": "IASB." }, correct_answer: "C", explanation: "The International Accounting Standards Board (IASB) sets IFRS.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q18", LOS: "Describe standard-setting bodies.", difficulty_level: "Concept", question_text: "Which organization has the legal authority to enforce financial reporting requirements in the United States?", options: { "A": "FASB.", "B": "SEC.", "C": "IASB." }, correct_answer: "B", explanation: "Regulatory authorities like the SEC have the legal authority to enforce standards. FASB is a standard-setting body, not an enforcement agency.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q19", LOS: "Identify constraints.", difficulty_level: "Concept", question_text: "The pervasive constraint on the information provided in financial reporting is:", options: { "A": "Timeliness.", "B": "Cost-benefit.", "C": "Materiality." }, correct_answer: "B", explanation: "The cost of providing information should not outweigh the benefits that users gain from it.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q20", LOS: "Describe elements of financial statements.", difficulty_level: "Concept", question_text: "An economic resource controlled by the entity as a result of past events is the definition of a(n):", options: { "A": "Asset.", "B": "Liability.", "C": "Income." }, correct_answer: "A", explanation: "This is the formal definition of an asset under the IFRS Conceptual Framework.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q21", LOS: "Describe elements of financial statements.", difficulty_level: "Concept", question_text: "Decreases in economic benefits during the accounting period in the form of outflows or depletions of assets are:", options: { "A": "Distributions to owners.", "B": "Expenses.", "C": "Liabilities." }, correct_answer: "B", explanation: "Expenses decrease economic benefits, excluding distributions to owners.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q22", LOS: "Describe measurement bases.", difficulty_level: "Concept", question_text: "Measuring an asset at the amount of cash that could currently be obtained by selling it in an orderly disposal is called:", options: { "A": "Historical cost.", "B": "Realizable value.", "C": "Current cost." }, correct_answer: "B", explanation: "Realizable (settlement) value is the amount obtained by selling the asset in an orderly disposal.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q23", LOS: "Identify financial reporting mechanics.", difficulty_level: "Concept", question_text: "A company recognizes revenue when it provides services to a customer, even if cash is not received until a later date. This is an example of:", options: { "A": "Cash basis accounting.", "B": "Accrual accounting.", "C": "Going concern assumption." }, correct_answer: "B", explanation: "Accrual accounting records transactions when they occur, not necessarily when cash changes hands.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q24", LOS: "Describe the objective of financial statement analysis.", difficulty_level: "Concept", question_text: "Which of the following is most likely to be found in the Notes to the Financial Statements?", options: { "A": "Discussion of future business prospects.", "B": "Accounting policies, methods, and estimates used.", "C": "Opinion on internal controls." }, correct_answer: "B", explanation: "The footnotes provide details on the accounting methods, policies, and estimates used to prepare the statements.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q25", LOS: "Describe the objective of audits.", difficulty_level: "Concept", question_text: "In the U.S., under Sarbanes-Oxley, management must provide a report on the effectiveness of:", options: { "A": "corporate governance.", "B": "internal control over financial reporting.", "C": "competitor analysis." }, correct_answer: "B", explanation: "Management must assess and report on the company's internal control over financial reporting.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q26", LOS: "Describe IOSCO.", difficulty_level: "Concept", question_text: "The primary objective of the International Organization of Securities Commissions (IOSCO) is to:", options: { "A": "issue International Financial Reporting Standards.", "B": "ensure that markets are fair, efficient, and transparent.", "C": "audit multinational corporations." }, correct_answer: "B", explanation: "IOSCO promotes high standards of regulation to ensure fair, efficient, and transparent markets.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q27", LOS: "Describe the financial statement analysis framework.", difficulty_level: "Concept", question_text: "Which of the following activities is most likely performed in the 'Collect input data' phase?", options: { "A": "Adjusting financial statements for comparability.", "B": "Gathering financial statements and industry data.", "C": "Calculating financial ratios." }, correct_answer: "B", explanation: "Gathering data is the collection phase. Adjusting statements and calculating ratios happens in the processing phase.", schweser_reference: "Reading 1, Module 1.1" },
      { id: "d1_q28", LOS: "Identify barriers to convergence.", difficulty_level: "Concept", question_text: "A significant barrier to the global convergence of accounting standards is:", options: { "A": "different business activities across countries.", "B": "lack of a global regulatory authority.", "C": "political pressure from business groups." }, correct_answer: "C", explanation: "Political pressure from business groups and different national economic environments are major barriers to convergence.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q29", LOS: "Describe general requirements for financial statements.", difficulty_level: "Concept", question_text: "Which of the following is NOT a required feature for preparing financial statements under IFRS?", options: { "A": "No offsetting of assets and liabilities.", "B": "Frequency of reporting must be at least quarterly.", "C": "Comparative information for prior periods must be provided." }, correct_answer: "B", explanation: "IFRS requires at least ANNUAL reporting, not quarterly.", schweser_reference: "Reading 1, Module 1.2" },
      { id: "d1_q30", LOS: "Describe financial reporting mechanics.", difficulty_level: "Challenge", question_text: "A company receives a $10,000 cash advance for services to be provided next year. How does this affect the accounting equation today?", options: { "A": "Assets increase by $10,000; Equity increases by $10,000.", "B": "Assets increase by $10,000; Liabilities increase by $10,000.", "C": "Assets increase by $10,000; Revenue increases by $10,000." }, correct_answer: "B", explanation: "Cash (Asset) increases. Because the service is not yet performed, Unearned Revenue (Liability) increases. Revenue is not recognized yet.", schweser_reference: "Reading 1, Module 1.2" }
    ]
  },
  {
    day: 2,
    schweser_reading_name: "Understanding Income Statements",
    schweser_module: "Module 2.1: Revenue Recognition, Expenses & EPS",
    isLocked: true,
    questions: [
      { id: "d2_q1", LOS: "Describe general principles of revenue recognition.", difficulty_level: "Concept", question_text: "Under the core principle of the converged revenue recognition standard, a company should recognize revenue when it:", options: { "A": "receives cash payment.", "B": "transfers control of promised goods or services.", "C": "signs a contract." }, correct_answer: "B", explanation: "Revenue is recognized to depict the transfer of control of promised goods or services.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q2", LOS: "Describe general principles of revenue recognition.", difficulty_level: "Concept", question_text: "Step 2 of the 5-step revenue recognition model is to:", options: { "A": "Identify the contract with a customer.", "B": "Determine the transaction price.", "C": "Identify the performance obligations in the contract." }, correct_answer: "C", explanation: "Step 1: Contract. Step 2: Performance obligations. Step 3: Transaction price. Step 4: Allocate price. Step 5: Recognize revenue.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q3", LOS: "Calculate and interpret revenue.", difficulty_level: "Challenge", question_text: "A company sells a product and a 2-year maintenance contract together for $1,200. If sold separately, the product is $1,000 and the contract is $500. How much revenue is recognized immediately upon delivery of the product?", options: { "A": "$800", "B": "$1,000", "C": "$1,200" }, correct_answer: "A", explanation: "Total standalone price = $1,500. Product weight = 1000/1500 = 66.67%. Allocated price to product = 66.67% * 1200 = $800. Recognized immediately.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q4", LOS: "Describe expense recognition.", difficulty_level: "Concept", question_text: "Under the matching principle, costs of goods sold are recognized in the same period as:", options: { "A": "the inventory is purchased.", "B": "the inventory is paid for.", "C": "the related revenue is recognized." }, correct_answer: "C", explanation: "The matching principle requires that expenses be recognized in the same period as the revenues they help generate.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q5", LOS: "Describe long-term contract revenue recognition.", difficulty_level: "Challenge", question_text: "A construction company has a contract for $10 million. Total estimated costs are $8 million. In Year 1, $2 million in costs are incurred. Under the percentage-of-completion method, Year 1 gross profit is:", options: { "A": "$500,000", "B": "$2,000,000", "C": "$2,500,000" }, correct_answer: "A", explanation: "% complete = 2M / 8M = 25%. Year 1 Revenue = 25% * 10M = 2.5M. Year 1 Profit = 2.5M Revenue - 2.0M Costs = $500,000.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q6", LOS: "Describe agent vs principal.", difficulty_level: "Concept", question_text: "If a company acts as an agent rather than a principal in a transaction, it should report revenue based on:", options: { "A": "The gross amount billed to the customer.", "B": "The net commission or fee earned.", "C": "No revenue is reported; it is off-balance sheet." }, correct_answer: "B", explanation: "Agents only report their net fee/commission as revenue, whereas principals report gross revenue and cost of sales.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q7", LOS: "Describe depreciation methods.", difficulty_level: "Challenge", question_text: "An asset costs $10,000, has a 4-year life, and $2,000 salvage value. Using straight-line depreciation, Year 2 depreciation expense is:", options: { "A": "$2,000", "B": "$2,500", "C": "$3,000" }, correct_answer: "A", explanation: "Depreciable base = 10,000 - 2,000 = 8,000. Annual depreciation = 8,000 / 4 = $2,000.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q8", LOS: "Describe depreciation methods.", difficulty_level: "Challenge", question_text: "An asset costs $10,000, has a 4-year life, and $2,000 salvage value. Using double-declining balance, Year 1 depreciation is:", options: { "A": "$2,500", "B": "$4,000", "C": "$5,000" }, correct_answer: "C", explanation: "DDB rate = (1/4) * 2 = 50%. Year 1 depreciation = 50% * $10,000 = $5,000. (Salvage is ignored in DDB calculation until NBV hits salvage value).", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q9", LOS: "Describe inventory methods.", difficulty_level: "Challenge", question_text: "During a period of rising prices, which inventory valuation method typically results in the highest reported net income?", options: { "A": "FIFO", "B": "LIFO", "C": "Weighted Average" }, correct_answer: "A", explanation: "In rising prices, FIFO matches older, lower costs to COGS, resulting in lower COGS and higher net income.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q10", LOS: "Describe non-recurring items.", difficulty_level: "Concept", question_text: "Income from a discontinued operation should be reported on the income statement:", options: { "A": "as part of operating income.", "B": "pre-tax, below income from continuing operations.", "C": "net of tax, below income from continuing operations." }, correct_answer: "C", explanation: "Discontinued operations are reported net of tax, below income from continuing operations.", schweser_reference: "Reading 2, Module 2.2" },
      { id: "d2_q11", LOS: "Describe non-recurring items.", difficulty_level: "Concept", question_text: "Unusual OR infrequent items (but not both) are reported:", options: { "A": "net of tax, below continuing operations.", "B": "pre-tax, as a separate line item within continuing operations.", "C": "directly in retained earnings." }, correct_answer: "B", explanation: "Under both IFRS and US GAAP, unusual/infrequent items are reported pre-tax within continuing operations.", schweser_reference: "Reading 2, Module 2.2" },
      { id: "d2_q12", LOS: "Describe accounting changes.", difficulty_level: "Concept", question_text: "A change in accounting estimate, such as the useful life of an asset, is applied:", options: { "A": "retrospectively.", "B": "prospectively.", "C": "as a prior period adjustment." }, correct_answer: "B", explanation: "Changes in accounting estimates are handled prospectively (going forward).", schweser_reference: "Reading 2, Module 2.2" },
      { id: "d2_q13", LOS: "Describe accounting changes.", difficulty_level: "Concept", question_text: "A change in accounting principle, such as moving from LIFO to FIFO, requires:", options: { "A": "retrospective application.", "B": "prospective application.", "C": "no adjustment." }, correct_answer: "A", explanation: "Changes in accounting policies generally require retrospective application to all prior periods shown.", schweser_reference: "Reading 2, Module 2.2" },
      { id: "d2_q14", LOS: "Calculate basic EPS.", difficulty_level: "Challenge", question_text: "A company had 100,000 shares outstanding on Jan 1. On July 1, it issued 20,000 new shares. Net income is $50,000. Preferred dividends are $6,000. Basic EPS is closest to:", options: { "A": "$0.37", "B": "$0.40", "C": "$0.44" }, correct_answer: "B", explanation: "WASO = 100,000*(6/12) + 120,000*(6/12) = 110,000. Basic EPS = (50,000 - 6,000) / 110,000 = $0.40.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q15", LOS: "Calculate basic EPS with stock split.", difficulty_level: "Challenge", question_text: "Jan 1: 10,000 shares out. April 1: Issued 2,000 shares. Dec 1: 2-for-1 stock split. What is the weighted average shares outstanding (WASO)?", options: { "A": "23,000", "B": "24,000", "C": "11,500" }, correct_answer: "A", explanation: "Before split WASO = 10k*(3/12) + 12k*(9/12) = 11,500. Split applies retroactively: 11,500 * 2 = 23,000 shares.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q16", LOS: "Calculate diluted EPS.", difficulty_level: "Concept", question_text: "When calculating diluted EPS, convertible bonds are handled using the:", options: { "A": "Treasury stock method.", "B": "If-converted method.", "C": "Two-class method." }, correct_answer: "B", explanation: "Convertible debt and convertible preferred stock use the if-converted method. Options/warrants use the treasury stock method.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q17", LOS: "Calculate diluted EPS.", difficulty_level: "Challenge", question_text: "A company has 100,000 shares out. It has 10,000 options out with strike price $40. Average stock price is $50. Under the treasury stock method, how many shares are ADDED to the denominator for Diluted EPS?", options: { "A": "2,000", "B": "8,000", "C": "10,000" }, correct_answer: "A", explanation: "Proceeds = 10,000 * 40 = $400,000. Shares repurchased = 400,000 / 50 = 8,000. Net shares added = 10,000 - 8,000 = 2,000.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q18", LOS: "Describe antidilutive securities.", difficulty_level: "Concept", question_text: "If a potentially dilutive security increases EPS when included in the calculation, it is:", options: { "A": "included in diluted EPS.", "B": "antidilutive and excluded from diluted EPS.", "C": "antidilutive and included in basic EPS." }, correct_answer: "B", explanation: "Securities that increase EPS (or reduce loss per share) are antidilutive and must be EXCLUDED from the diluted EPS calculation.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q19", LOS: "Calculate diluted EPS.", difficulty_level: "Challenge", question_text: "Net income = $1,000. WASO = 1,000. Convertible bonds outstanding have 5% coupon, $2,000 par value, convertible into 100 shares. Tax rate is 20%. Diluted EPS is closest to:", options: { "A": "$0.91", "B": "$0.98", "C": "$1.00" }, correct_answer: "B", explanation: "Basic EPS = 1000/1000 = 1.00. Interest = 2000*5% = 100. After-tax interest = 100*(1-0.2) = 80. Diluted EPS = (1000+80) / (1000+100) = 1080/1100 = $0.98.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q20", LOS: "Describe comprehensive income.", difficulty_level: "Concept", question_text: "Comprehensive income is defined as:", options: { "A": "Net income plus other comprehensive income.", "B": "Gross profit minus operating expenses.", "C": "Net income minus dividends paid." }, correct_answer: "A", explanation: "Comprehensive income encompasses all changes in equity except for transactions with shareholders. CI = NI + OCI.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q21", LOS: "Identify OCI components.", difficulty_level: "Concept", question_text: "Which of the following is typically included in Other Comprehensive Income (OCI)?", options: { "A": "Realized gains on trading securities.", "B": "Foreign currency translation adjustments.", "C": "Losses from discontinued operations." }, correct_answer: "B", explanation: "FX translation adjustments are part of OCI. Trading securities gains and discontinued ops go to the Income Statement.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q22", LOS: "Identify OCI components.", difficulty_level: "Concept", question_text: "Unrealized gains and losses on which type of securities are reported in OCI under US GAAP?", options: { "A": "Trading securities.", "B": "Held-to-maturity securities.", "C": "Available-for-sale securities." }, correct_answer: "C", explanation: "Under US GAAP, unrealized gains/losses on AFS debt securities bypass the income statement and go to OCI.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q23", LOS: "Evaluate income statement formats.", difficulty_level: "Concept", question_text: "In a common-size income statement, all items are expressed as a percentage of:", options: { "A": "Total Assets.", "B": "Net Income.", "C": "Revenue." }, correct_answer: "C", explanation: "A common-size income statement divides every line item by Total Revenue (Net Sales).", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q24", LOS: "Calculate margins.", difficulty_level: "Challenge", question_text: "Revenue = $10,000, COGS = $4,000, SG&A = $2,000, Taxes = $1,000. The gross profit margin is:", options: { "A": "30%", "B": "40%", "C": "60%" }, correct_answer: "C", explanation: "Gross Profit = Revenue - COGS = 10,000 - 4,000 = 6,000. Gross Margin = 6,000 / 10,000 = 60%.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q25", LOS: "Calculate margins.", difficulty_level: "Challenge", question_text: "Revenue = $10,000, COGS = $4,000, SG&A = $2,000, Taxes = $1,000. The operating profit margin is:", options: { "A": "30%", "B": "40%", "C": "60%" }, correct_answer: "B", explanation: "Operating Profit = Gross Profit - SG&A = 6,000 - 2,000 = 4,000. Operating Margin = 4,000 / 10,000 = 40%.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q26", LOS: "Calculate margins.", difficulty_level: "Challenge", question_text: "Revenue = $10,000, COGS = $4,000, SG&A = $2,000, Taxes = $1,000. The net profit margin is:", options: { "A": "30%", "B": "40%", "C": "60%" }, correct_answer: "A", explanation: "Net Income = Operating Profit - Taxes = 4,000 - 1,000 = 3,000. Net Margin = 3,000 / 10,000 = 30%.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q27", LOS: "Describe long-term contract revenue recognition.", difficulty_level: "Concept", question_text: "If a loss is expected on a long-term contract, the loss must be recognized:", options: { "A": "immediately, under both percentage-of-completion and completed contract methods.", "B": "only under the percentage-of-completion method.", "C": "at the end of the contract." }, correct_answer: "A", explanation: "Expected losses on long-term contracts are recognized immediately in their entirety under both methods.", schweser_reference: "Reading 2, Module 2.1" },
      { id: "d2_q28", LOS: "Describe comprehensive income.", difficulty_level: "Concept", question_text: "Dividends paid to shareholders are reported in:", options: { "A": "Other Comprehensive Income.", "B": "The Income Statement.", "C": "The Statement of Changes in Equity." }, correct_answer: "C", explanation: "Dividends are a transaction with owners and do not flow through the income statement or OCI. They reduce retained earnings in the equity statement.", schweser_reference: "Reading 2, Module 2.4" },
      { id: "d2_q29", LOS: "Calculate EPS.", difficulty_level: "Challenge", question_text: "A company has a net loss of $10,000. Preferred dividends are $2,000. WASO is 1,000. Basic EPS is:", options: { "A": "-$8.00", "B": "-$10.00", "C": "-$12.00" }, correct_answer: "C", explanation: "Basic EPS = (Net Income - Preferred Div) / WASO. EPS = (-10,000 - 2,000) / 1,000 = -$12.00.", schweser_reference: "Reading 2, Module 2.3" },
      { id: "d2_q30", LOS: "Calculate EPS.", difficulty_level: "Challenge", question_text: "A company repurchases 10,000 shares on October 1. How does this affect the Weighted Average Shares Outstanding (WASO) for the year?", options: { "A": "Decreases WASO by 10,000.", "B": "Decreases WASO by 2,500.", "C": "Increases WASO by 7,500." }, correct_answer: "B", explanation: "The shares are only repurchased for 3 months (Oct-Dec). The reduction to WASO = 10,000 * (3/12) = 2,500.", schweser_reference: "Reading 2, Module 2.3" }
    ]
  }
];

// Generate placeholder days up to 30
for (let i = 3; i <= 30; i++) {
  fsaRoadmapData.push({
    day: i,
    schweser_reading_name: "FSA Reading Topic " + i,
    schweser_module: "Module placeholder",
    isLocked: true,
    questions: []
  });
}

export default function App() {
  const SESSION_STORAGE_KEY = 'revise_web_session';
  const QUIZ_HISTORY_KEY = 'revise_quiz_history'; // Store previous attempts
  const QUIZ_STATS_KEY = 'revise_quiz_stats'; // Store stats per day

  const [currentScreen, setCurrentScreen] = useState('setup'); // setup, target, roadmap, quiz, review, past-review, history
  const [targetScore, setTargetScore] = useState(60);
  const [currentDayStr, setCurrentDayStr] = useState(1);
  const [activeDayData, setActiveDayData] = useState(null);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizActive, setQuizActive] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]); // Store all attempts
  const [selectedAttempt, setSelectedAttempt] = useState(null); // For reviewing past attempts

  const loadSavedSession = () => {
    if (typeof window === 'undefined') return null;
    const saved = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  };

  // Load quiz history from localStorage
  const loadQuizHistory = () => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem(QUIZ_HISTORY_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  };

  // Save quiz attempt to history
  const saveQuizAttempt = (dayData, questions, answers, score) => {
    const attempt = {
      id: Date.now(),
      dayNumber: dayData.day,
      dayName: dayData.schweser_reading_name,
      questions: questions,
      userAnswers: answers,
      correctCount: score.correctCount,
      totalQuestions: score.totalQuestions,
      scorePct: score.scorePct,
      timestamp: new Date().toISOString(),
      timeSpent: (questions.length * 90) - timeLeft // Approximate time spent
    };

    const history = loadQuizHistory();
    history.push(attempt);
    window.localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
    setQuizHistory(history);
    return attempt;
  };

  // Get stats for a specific day
  const getDayStats = (dayNumber) => {
    const attempts = loadQuizHistory().filter(a => a.dayNumber === dayNumber);
    if (attempts.length === 0) return null;
    
    const bestScore = Math.max(...attempts.map(a => a.scorePct));
    const avgScore = Math.round(attempts.reduce((sum, a) => sum + a.scorePct, 0) / attempts.length);
    
    return {
      attempts: attempts.length,
      bestScore,
      avgScore,
      allAttempts: attempts,
      lastAttempt: attempts[attempts.length - 1]
    };
  };

  useEffect(() => {
    const saved = loadSavedSession();
    if (saved) {
      setTargetScore(saved.targetScore ?? 60);
      setCurrentDayStr(saved.currentDayStr ?? 1);
      if (saved.currentDayStr > 1) {
        setCurrentScreen('roadmap');
      }
    }
    // Load quiz history
    const history = loadQuizHistory();
    setQuizHistory(history);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      targetScore,
      currentDayStr,
    }));
  }, [targetScore, currentDayStr]);

  // Helper: Format Time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (quizActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizActive) {
      handleQuizSubmit();
    }
    return () => clearInterval(interval);
  }, [quizActive, timeLeft]);

  // --- HANDLERS ---
  const startTargetSetup = () => setCurrentScreen('target');

  const generateRoadmap = () => {
    setCurrentScreen('roadmap');
  };

  const startDayQuiz = (dayData) => {
    // Filter logic based on target score (Simulated)
    let filteredQuestions = dayData.questions;
    if (targetScore < 50) {
      filteredQuestions = dayData.questions.filter(q => q.difficulty_level === 'Concept' || q.difficulty_level === 'Challenge'); // Use all for demo if not enough
    } else if (targetScore > 70) {
      filteredQuestions = dayData.questions.filter(q => q.difficulty_level === 'Challenge' || q.difficulty_level === 'Concept'); // Use all for demo
    }

    setActiveDayData(dayData);
    setQuizQuestions(filteredQuestions);
    setCurrentQIndex(0);
    setUserAnswers({});
    setTimeLeft(filteredQuestions.length * 90); // 1.5 mins (90s) per question
    setCurrentScreen('quiz');
    setQuizActive(true);
  };

  const handleAnswerSelect = (optionKey) => {
    setUserAnswers({ ...userAnswers, [currentQIndex]: optionKey });
  };

  const handleQuizNext = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = () => {
    setQuizActive(false);

    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct_answer) correctCount++;
    });
    const scorePct = Math.round((correctCount / quizQuestions.length) * 100);

    // Save attempt to history
    const score = {
      correctCount,
      totalQuestions: quizQuestions.length,
      scorePct
    };
    saveQuizAttempt(activeDayData, quizQuestions, userAnswers, score);

    setCurrentScreen('review');

    // Unlock next day
    if (activeDayData.day === currentDayStr) {
      setCurrentDayStr(currentDayStr + 1);
      fsaRoadmapData[activeDayData.day].isLocked = false;
    }
  };

  const backToRoadmap = () => setCurrentScreen('roadmap');

  const handleRetake = () => {
    // Reset for retake
    setCurrentQIndex(0);
    setUserAnswers({});
    setTimeLeft(quizQuestions.length * 90);
    setCurrentScreen('quiz');
    setQuizActive(true);
  };

  const viewPastAttempt = (attempt) => {
    setSelectedAttempt(attempt);
    setCurrentScreen('past-review');
  };

  const openHistory = () => {
    setCurrentScreen('history');
  };

  const closeHistory = () => {
    setCurrentScreen('roadmap');
  };

  // --- RENDER SCREENS ---

  // SCREEN 1: SETUP
  if (currentScreen === 'setup') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 text-center">
            <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">30-Day FSA Sprint</h1>
            <p className="text-slate-300">Powered by SchweserNotes™</p>
          </div>
          <div className="p-8 text-center">
            <p className="text-slate-600 mb-8 leading-relaxed">
              Chiến dịch nước rút 30 ngày dứt điểm môn Financial Statement Analysis cho kỳ thi CFA Level 1 tháng 11. Hệ thống sẽ tự động ép tiến độ theo chuẩn mục lục Schweser.
            </p>
            <button
              onClick={startTargetSetup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              Bắt đầu chuỗi 30 ngày
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 2: TARGET SCORE
  if (currentScreen === 'target') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <Target className="w-12 h-12 text-slate-900 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900">Thiết lập mục tiêu</h2>
            <p className="text-slate-500 mt-2">Xác định điểm số FSA mong muốn để hệ thống điều chỉnh độ khó.</p>
          </div>

          <div className="mb-10">
            <input
              type="range"
              min="30" max="90" step="10"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-400 mt-4 px-1">
              <span>&lt; 50%</span>
              <span>50% - 70%</span>
              <span>&gt; 70% (Safe)</span>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg text-center mb-2">
                {targetScore < 50 ? "Focus: Core Concepts" : targetScore <= 70 ? "Focus: Balanced (Concept & Calculation)" : "Focus: Challenge & Traps"}
              </h3>
              <p className="text-sm text-slate-600 text-center">
                {targetScore < 50 && "Ưu tiên củng cố nền tảng, tập trung vào Concept Checkers."}
                {targetScore > 50 && targetScore <= 70 && "Kết hợp lý thuyết và bài tập tính toán tiêu chuẩn."}
                {targetScore > 70 && "Tăng cường câu hỏi gài bẫy, tình huống phức tạp (Hard QBank)."}
              </p>
            </div>
          </div>

          <button
            onClick={generateRoadmap}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md"
          >
            Tạo Lộ Trình FSA
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 3: ROADMAP DASHBOARD
  if (currentScreen === 'roadmap') {
    return (
      <div className="min-h-screen bg-slate-100 font-sans pb-12">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sticky top-0 z-10 shadow-md">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold flex items-center">
                <Map className="w-5 h-5 mr-2 text-blue-400" />
                FSA Roadmap
              </h1>
              <p className="text-xs text-slate-400 mt-1">SchweserNotes Aligned • Target {targetScore}%</p>
            </div>
            <div className="text-right flex items-center gap-4">
              <button
                onClick={openHistory}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm font-semibold"
                title="View all quiz history"
              >
                <History className="w-4 h-4" />
                History
              </button>
              <div>
                <div className="text-2xl font-bold text-blue-400">Day {currentDayStr}/30</div>
                <div className="w-32 h-2 bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(currentDayStr / 30) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mt-8 px-4">
          <div className="space-y-4">
            {fsaRoadmapData.map((dayData, index) => {
              const isActive = dayData.day === currentDayStr;
              const isPast = dayData.day < currentDayStr;
              const isLocked = dayData.day > currentDayStr;
              const stats = getDayStats(dayData.day);

              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between transition-all ${isActive ? 'bg-white border-blue-500 shadow-lg ring-1 ring-blue-500' :
                      isPast ? 'bg-slate-50 border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${isActive ? 'bg-blue-100 text-blue-700' :
                          isPast ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                        }`}>
                        Day {dayData.day}
                      </span>
                      {isPast && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                    <h3 className={`font-bold text-lg ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                      {dayData.schweser_reading_name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {dayData.schweser_module}
                    </p>

                    {/* Stats if completed */}
                    {stats && (
                      <div className="mt-3 flex items-center gap-6 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Attempts:</span>
                          <span className="font-bold text-slate-700">{stats.attempts}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Best:</span>
                          <span className={`font-bold ${stats.bestScore >= 70 ? 'text-green-600' : stats.bestScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {stats.bestScore}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Avg:</span>
                          <span className="font-bold text-blue-600">{stats.avgScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-auto flex gap-2">
                    {!isLocked ? (
                      <>
                        <button
                          onClick={() => startDayQuiz(dayData)}
                          className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-all ${isActive
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                          {isPast ? 'Retake' : 'Start'}
                          {!isPast && <PlayCircle className="w-5 h-5 ml-2" />}
                          {isPast && <RefreshCw className="w-5 h-5 ml-2" />}
                        </button>
                        {stats && stats.attempts > 0 && (
                          <button
                            onClick={() => viewPastAttempt(stats.lastAttempt)}
                            className="px-4 py-3 rounded-lg font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-all"
                            title="View last attempt"
                          >
                            <BookOpen className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="px-6 py-3 rounded-lg font-semibold bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200 cursor-not-allowed">
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 4: QUIZ (Prometric CBT Style)
  if (currentScreen === 'quiz') {
    const question = quizQuestions[currentQIndex];
    const isLastQ = currentQIndex === quizQuestions.length - 1;

    return (
      <div className="min-h-screen bg-[#f3f4f6] font-serif selection:bg-blue-200 text-black flex flex-col">
        {/* Prometric Header */}
        <div className="bg-[#003366] text-white px-6 py-3 flex justify-between items-center shadow-sm font-sans">
          <div className="flex items-center space-x-4">
            <span className="font-semibold tracking-wide">CFA Institute</span>
            <span className="text-sm text-blue-200 border-l border-blue-400 pl-4">Level I CFA® Exam</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <span>Question {currentQIndex + 1} of {quizQuestions.length}</span>
            <div className="flex items-center bg-blue-900 px-3 py-1 rounded">
              <Clock className="w-4 h-4 mr-2" />
              <span className="font-mono text-base">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 max-w-5xl w-full mx-auto p-8 bg-white my-8 shadow-sm border border-gray-300">
          <div className="mb-8 text-lg leading-relaxed text-gray-800">
            {question.question_text}
          </div>

          <div className="space-y-4 font-sans">
            {['A', 'B', 'C'].map((opt) => (
              <label
                key={opt}
                className={`flex items-start p-4 border rounded-md cursor-pointer transition-colors ${userAnswers[currentQIndex] === opt
                    ? 'border-[#003366] bg-[#f0f5fa]'
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center h-5">
                  <input
                    type="radio"
                    name="answer"
                    className="w-4 h-4 text-[#003366] border-gray-300 focus:ring-[#003366]"
                    checked={userAnswers[currentQIndex] === opt}
                    onChange={() => handleAnswerSelect(opt)}
                  />
                </div>
                <div className="ml-3 text-base">
                  <span className="font-semibold mr-2">{opt}.</span>
                  {question.options[opt]}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Prometric Footer */}
        <div className="bg-white border-t border-gray-300 px-6 py-4 flex justify-between font-sans">
          <button
            onClick={() => setCurrentScreen('roadmap')}
            className="px-6 py-2 border border-gray-400 text-gray-700 font-semibold rounded hover:bg-gray-100"
          >
            End Exam Early
          </button>

          <button
            onClick={handleQuizNext}
            disabled={!userAnswers[currentQIndex]}
            className={`px-8 py-2 font-bold rounded shadow-sm ${!userAnswers[currentQIndex]
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#003366] text-white hover:bg-blue-800'
              }`}
          >
            {isLastQ ? 'Submit Exam' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 5: REVIEW & SUMMARY
  if (currentScreen === 'review') {
    // Calculate score
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct_answer) correctCount++;
    });
    const scorePct = Math.round((correctCount / quizQuestions.length) * 100);
    const stats = getDayStats(activeDayData.day);

    return (
      <div className="min-h-screen bg-slate-50 font-sans pb-12">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 text-center shadow-md">
          <h1 className="text-3xl font-bold mb-2">Session Review: Day {activeDayData.day}</h1>
          <p className="text-slate-300 mb-6">{activeDayData.schweser_reading_name}</p>

          <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-800 rounded-full border-4 border-slate-700 w-32 h-32">
            <span className={`text-3xl font-bold ${scorePct >= 70 ? 'text-green-400' : scorePct >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {scorePct}%
            </span>
            <span className="text-xs text-slate-400 mt-1">{correctCount}/{quizQuestions.length} Correct</span>
          </div>

          {/* Stats */}
          {stats && (
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-xl mx-auto text-sm">
              <div className="bg-slate-800 p-3 rounded-lg">
                <p className="text-slate-400 text-xs">ATTEMPTS</p>
                <p className="text-white font-bold text-lg">{stats.attempts}</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <p className="text-slate-400 text-xs">BEST SCORE</p>
                <p className="text-green-400 font-bold text-lg">{stats.bestScore}%</p>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <p className="text-slate-400 text-xs">AVG SCORE</p>
                <p className="text-blue-400 font-bold text-lg">{stats.avgScore}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Review */}
        <div className="max-w-4xl mx-auto mt-8 px-4 space-y-8">
          {quizQuestions.map((q, idx) => {
            const isCorrect = userAnswers[idx] === q.correct_answer;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Result Bar */}
                <div className={`px-6 py-3 font-semibold text-sm flex items-center ${isCorrect ? 'bg-green-50 text-green-700 border-b border-green-100' : 'bg-red-50 text-red-700 border-b border-red-100'}`}>
                  {isCorrect ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                  Question {idx + 1} {isCorrect ? '- Correct' : '- Incorrect'}
                </div>

                <div className="p-6">
                  {/* English Academic Content Area */}
                  <div className="font-serif text-lg mb-6 text-slate-800 leading-relaxed">
                    {q.question_text}
                  </div>

                  <div className="space-y-3 mb-8 text-sm">
                    {['A', 'B', 'C'].map(opt => {
                      let bgClass = "bg-slate-50 border-slate-200 text-slate-600";
                      let icon = null;

                      if (opt === q.correct_answer) {
                        bgClass = "bg-green-100 border-green-400 text-green-900 font-medium";
                      } else if (opt === userAnswers[idx] && !isCorrect) {
                        bgClass = "bg-red-100 border-red-400 text-red-900";
                      }

                      return (
                        <div key={opt} className={`p-4 rounded border flex items-start ${bgClass}`}>
                          <span className="font-bold mr-3">{opt}.</span>
                          <span>{q.options[opt]}</span>
                          {opt === userAnswers[idx] && <span className="ml-auto text-xs opacity-70">(Your Answer)</span>}
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation & Reference */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                    <h4 className="font-bold text-blue-900 mb-2 uppercase text-xs tracking-wider">Explanation</h4>
                    <p className="text-slate-700 text-sm mb-4 leading-relaxed font-serif">
                      {q.explanation}
                    </p>
                    <div className="border-t border-blue-200 pt-3 mt-3">
                      <h4 className="font-bold text-blue-900 mb-1 uppercase text-xs tracking-wider">Schweser Reference</h4>
                      <p className="text-blue-800 text-xs flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {q.schweser_reference}
                      </p>
                      <p className="text-blue-800 text-xs mt-1 flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        LOS: {q.LOS}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Actions */}
        <div className="max-w-4xl mx-auto mt-8 px-4 pb-12 flex justify-center gap-4">
          <button
            onClick={backToRoadmap}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105"
          >
            <Map className="w-5 h-5 mr-2" />
            Trở về Roadmap
          </button>
          <button
            onClick={handleRetake}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Làm Lại
          </button>
          <button
            onClick={openHistory}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105"
          >
            <History className="w-5 h-5 mr-2" />
            History
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 6: PAST REVIEW (View previous attempt)
  if (currentScreen === 'past-review' && selectedAttempt) {
    const attempt = selectedAttempt;
    let correctCount = 0;
    attempt.questions.forEach((q, idx) => {
      if (attempt.userAnswers[idx] === q.correct_answer) correctCount++;
    });

    return (
      <div className="min-h-screen bg-slate-50 font-sans pb-12">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 text-center shadow-md">
          <h1 className="text-3xl font-bold mb-2">Past Attempt Review: Day {attempt.dayNumber}</h1>
          <p className="text-slate-300 mb-2">{attempt.dayName}</p>
          <p className="text-xs text-slate-400 mb-6">
            {new Date(attempt.timestamp).toLocaleString('vi-VN')}
          </p>

          <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-800 rounded-full border-4 border-slate-700 w-32 h-32">
            <span className={`text-3xl font-bold ${attempt.scorePct >= 70 ? 'text-green-400' : attempt.scorePct >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {attempt.scorePct}%
            </span>
            <span className="text-xs text-slate-400 mt-1">{attempt.correctCount}/{attempt.totalQuestions} Correct</span>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="max-w-4xl mx-auto mt-8 px-4 space-y-8">
          {attempt.questions.map((q, idx) => {
            const isCorrect = attempt.userAnswers[idx] === q.correct_answer;
            return (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Result Bar */}
                <div className={`px-6 py-3 font-semibold text-sm flex items-center ${isCorrect ? 'bg-green-50 text-green-700 border-b border-green-100' : 'bg-red-50 text-red-700 border-b border-red-100'}`}>
                  {isCorrect ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                  Question {idx + 1} {isCorrect ? '- Correct' : '- Incorrect'}
                </div>

                <div className="p-6">
                  {/* Question */}
                  <div className="font-serif text-lg mb-6 text-slate-800 leading-relaxed">
                    {q.question_text}
                  </div>

                  <div className="space-y-3 mb-8 text-sm">
                    {['A', 'B', 'C'].map(opt => {
                      let bgClass = "bg-slate-50 border-slate-200 text-slate-600";

                      if (opt === q.correct_answer) {
                        bgClass = "bg-green-100 border-green-400 text-green-900 font-medium";
                      } else if (opt === attempt.userAnswers[idx] && !isCorrect) {
                        bgClass = "bg-red-100 border-red-400 text-red-900";
                      }

                      return (
                        <div key={opt} className={`p-4 rounded border flex items-start ${bgClass}`}>
                          <span className="font-bold mr-3">{opt}.</span>
                          <span>{q.options[opt]}</span>
                          {opt === attempt.userAnswers[idx] && <span className="ml-auto text-xs opacity-70">(Your Answer)</span>}
                        </div>
                      )
                    })}
                  </div>

                  {/* Explanation & Reference */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                    <h4 className="font-bold text-blue-900 mb-2 uppercase text-xs tracking-wider">Explanation</h4>
                    <p className="text-slate-700 text-sm mb-4 leading-relaxed font-serif">
                      {q.explanation}
                    </p>
                    <div className="border-t border-blue-200 pt-3 mt-3">
                      <h4 className="font-bold text-blue-900 mb-1 uppercase text-xs tracking-wider">Schweser Reference</h4>
                      <p className="text-blue-800 text-xs flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {q.schweser_reference}
                      </p>
                      <p className="text-blue-800 text-xs mt-1 flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        LOS: {q.LOS}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Actions */}
        <div className="max-w-4xl mx-auto mt-8 px-4 pb-12 flex justify-center gap-4">
          <button
            onClick={backToRoadmap}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105"
          >
            <Map className="w-5 h-5 mr-2" />
            Trở về Roadmap
          </button>
          <button
            onClick={openHistory}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center transition-transform hover:scale-105"
          >
            <History className="w-5 h-5 mr-2" />
            History
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 7: HISTORY - View all quiz attempts
  if (currentScreen === 'history') {
    const allAttempts = loadQuizHistory();
    
    // Group attempts by day
    const attemptsByDay = {};
    allAttempts.forEach(attempt => {
      if (!attemptsByDay[attempt.dayNumber]) {
        attemptsByDay[attempt.dayNumber] = [];
      }
      attemptsByDay[attempt.dayNumber].push(attempt);
    });

    // Sort by day number desc (most recent first)
    const sortedDays = Object.keys(attemptsByDay)
      .map(Number)
      .sort((a, b) => b - a);

    return (
      <div className="min-h-screen bg-slate-50 font-sans pb-12">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center mb-2">
                <History className="w-8 h-8 mr-3 text-blue-400" />
                Quiz History
              </h1>
              <p className="text-slate-300">Total Attempts: {allAttempts.length}</p>
            </div>
            <button
              onClick={closeHistory}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Close history"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="max-w-4xl mx-auto mt-8 px-4">
          {sortedDays.length === 0 ? (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Không có lịch sử quiz nào</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDays.map((dayNum) => {
                const attempts = attemptsByDay[dayNum];
                const bestScore = Math.max(...attempts.map(a => a.scorePct));
                const avgScore = Math.round(attempts.reduce((sum, a) => sum + a.scorePct, 0) / attempts.length);

                return (
                  <div key={dayNum} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    {/* Day Header */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
                      <h2 className="text-xl font-bold mb-1">Day {dayNum}</h2>
                      <p className="text-slate-300 text-sm mb-4">{attempts[0].dayName}</p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Attempts</p>
                          <p className="text-2xl font-bold text-blue-400">{attempts.length}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Best Score</p>
                          <p className={`text-2xl font-bold ${bestScore >= 70 ? 'text-green-400' : bestScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {bestScore}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase">Avg Score</p>
                          <p className="text-2xl font-bold text-blue-300">{avgScore}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Attempts List */}
                    <div className="divide-y divide-slate-200">
                      {attempts.map((attempt, idx) => (
                        <div 
                          key={attempt.id}
                          className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                          onClick={() => viewPastAttempt(attempt)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-semibold text-slate-600">
                                  Attempt #{attempts.length - idx}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                  attempt.scorePct >= 70 ? 'bg-green-100 text-green-700' :
                                  attempt.scorePct >= 50 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {attempt.scorePct}%
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                {attempt.correctCount}/{attempt.totalQuestions} Correct • {new Date(attempt.timestamp).toLocaleString('vi-VN')}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-2xl font-bold text-slate-700">{attempt.correctCount}/{attempt.totalQuestions}</p>
                              <ChevronRight className="w-5 h-5 text-slate-400 mt-1 ml-auto" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
