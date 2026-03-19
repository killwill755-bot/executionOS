// ============================================================
//  EXECUTION OS — Google Apps Script Backend
//  Version: 2.0 | The 24-Hour AI Profit Engine
//  
//  SETUP INSTRUCTIONS:
//  1. Open Google Sheets → Extensions → Apps Script
//  2. Paste this entire file
//  3. Replace GEMINI_API_KEY with your key from ai.google.dev
//  4. Run setup() once — all sheets auto-create & populate
//  5. Deploy as Web App → Execute as Me → Anyone
// ============================================================

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
const CONFIG = {
  GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE", // Replace this
  GEMINI_MODEL: "gemini-1.5-flash",
  GEMINI_ENDPOINT: "https://generativelanguage.googleapis.com/v1beta/models/",
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId(),
  SHEETS: {
    MASTER_DB: "Master_DB",
    USER_INPUTS: "User_Inputs",
    ACTIVE_ROADMAP: "Active_Roadmap",
    ANALYTICS: "Analytics_Data",
  },
};

// ─── MASTER DATABASE: 100 PREMIUM AI BUSINESS IDEAS ──────────────────────────
const MASTER_IDEAS = [
  // ── CATEGORY 1: B2B SaaS / Automation (20 ideas) ──────────────────────────
  {
    id: "B001", category: "B2B SaaS/Automation",
    idea_name: "AI Inventory Demand Predictor",
    usp: "Reduces overstock by 40% using ML forecasting for Shopify/WooCommerce stores",
    difficulty: 3,
    launch_action: "H1:Sign up Replit+Supabase. H2:Connect Shopify API. H3:Train basic ARIMA model on demo data. H4:Build dashboard UI. H5:Create Stripe billing. H6:List on AppSumo LTD. H7:Cold email 20 Shopify stores.",
    marketing_script: "REDDIT: 'I built a tool that predicted my client's Q4 stockouts 3 weeks early — here's how'. TWITTER: Thread on 'The $50K mistake most Shopify stores make in November (and how ML fixes it)'. COLD DM: 'Hey [Name], saw your store is running ads heavy this season — do you have inventory buffer logic set up? We reduce stockouts by 40% for stores like yours.'",
    scaling_roadmap: "W1:10 beta users free. W2:Case study from best result. W3:ProductHunt launch. W4:Raise to $97/mo. M2:Partner with Shopify agencies. M3:Add Amazon/Etsy connectors.",
  },
  {
    id: "B002", category: "B2B SaaS/Automation",
    idea_name: "AI Contract Risk Analyzer",
    usp: "Scans NDAs/service agreements in 60 seconds, flags 23 risk categories, saves $500/hr lawyer fees",
    difficulty: 3,
    launch_action: "H1:Set up Claude API account. H2:Build PDF upload parser. H3:Prompt-engineer risk detection. H4:Simple React frontend. H5:Stripe $29/scan pricing. H6:Post on r/legaladvice. H7:Email 50 freelancers on Upwork.",
    marketing_script: "REDDIT: 'Lawyers hate this — I scanned my client's contract and found a $12K liability clause they missed'. COLD DM: 'Hi [Name], freelancers are losing thousands to bad contract clauses. Our AI catches them in 60 seconds. Free scan for your next contract?'",
    scaling_roadmap: "W1:100 free scans campaign. W2:Target freelancer Facebook groups. W3:Launch $49/mo subscription. W4:Add e-signature integration. M2:White-label for law firms. M3:Enterprise at $499/mo.",
  },
  {
    id: "B003", category: "B2B SaaS/Automation",
    idea_name: "AI Customer Churn Predictor for SaaS",
    usp: "Predicts which customers cancel 30 days before they do, triggers retention workflows automatically",
    difficulty: 4,
    launch_action: "H1:Stripe+Segment API setup. H2:Build churn scoring model. H3:Webhook integration. H4:Email alert system. H5:Dashboard with churn risk list. H6:Post in SaaStr community. H7:Direct outreach to 10 SaaS founders.",
    marketing_script: "TWITTER: '7 signals your SaaS customer is about to churn (and how to catch them 30 days early). Thread 🧵'. COLD EMAIL: 'Subject: Your churn rate costs $[X] in ARR annually. We can cut that by 35% — here's proof.'",
    scaling_roadmap: "W1:5 SaaS beta partners. W2:Publish churn benchmark report. W3:Content SEO targeting 'reduce SaaS churn'. W4:$199/mo launch. M2:Intercom/HubSpot integration. M3:YC network outreach.",
  },
  {
    id: "B004", category: "B2B SaaS/Automation",
    idea_name: "AI Meeting-to-Action-Items Converter",
    usp: "Joins Zoom/Meet calls, auto-generates CRM tasks, follow-up emails, and Slack summaries in real-time",
    difficulty: 3,
    launch_action: "H1:Recall.ai API for transcription. H2:Claude for action extraction. H3:HubSpot/Salesforce webhook. H4:Chrome extension shell. H5:Slack bot integration. H6:Post on r/productivity. H7:Target sales teams on LinkedIn.",
    marketing_script: "TWITTER: 'Our sales team recovered 6hrs/week after every meeting auto-creates tasks. We use AI. Here's the exact workflow'. COLD DM: 'Hi [Name], your sales reps lose 40% of meeting insights. Our tool converts every call to CRM tasks automatically — 5-min setup.'",
    scaling_roadmap: "W1:10 free seats pilot. W2:Calculate ROI per user ($X saved). W3:$29/user/mo pricing. W4:Zapier integration. M2:Salesforce AppExchange listing. M3:Enterprise SSO tier.",
  },
  {
    id: "B005", category: "B2B SaaS/Automation",
    idea_name: "AI Proposal Generator for Agencies",
    usp: "Generates custom client proposals in 3 minutes using past project data — wins 2x more deals",
    difficulty: 2,
    launch_action: "H1:Build proposal template engine. H2:Claude API for customization. H3:PDF export module. H4:Simple web UI with form. H5:$49/proposal or $199/mo. H6:Post in agency owner Facebook groups. H7:Email 30 agency owners.",
    marketing_script: "REDDIT: 'How I went from 4-hour proposals to 3-minute ones — and started winning more (agency owner story)'. TWITTER: '6-figure agencies waste 80 hours/month on proposals. Here's the system that fixed mine.'",
    scaling_roadmap: "W1:20 beta agencies. W2:A/B test pricing. W3:Add CRM integrations. W4:Case study campaign. M2:White-label tier. M3:Agency mastermind partnerships.",
  },
  {
    id: "B006", category: "B2B SaaS/Automation",
    idea_name: "AI Competitive Intelligence Monitor",
    usp: "Tracks 50+ competitor moves daily (pricing, features, job posts, reviews) and sends digest reports",
    difficulty: 3,
    launch_action: "H1:Web scraping setup (Playwright). H2:Competitor signal categories. H3:Claude summarization layer. H4:Email digest builder. H5:Stripe $97/mo pricing. H6:Post on Hacker News 'Ask HN'. H7:Cold email 25 startup founders.",
    marketing_script: "TWITTER: 'How I discovered my biggest competitor was pivoting to enterprise 3 months before they announced it. The signal was hiding in their job posts.' COLD EMAIL: 'Subject: Your competitor just changed their pricing. Did you know?'",
    scaling_roadmap: "W1:10 SaaS free trial. W2:Add Slack/Teams delivery. W3:Upgrade to $197/mo. W4:API access tier. M2:VC portfolio distribution. M3:Industry-specific plans.",
  },
  {
    id: "B007", category: "B2B SaaS/Automation",
    idea_name: "AI SEO Content Cluster Builder",
    usp: "Builds 30-article topical authority clusters from one keyword, with internal linking done automatically",
    difficulty: 2,
    launch_action: "H1:Keyword research API (DataForSEO). H2:Claude outline generator. H3:Cluster visualization map. H4:WordPress auto-publish. H5:$149/cluster pricing. H6:Post on r/SEO. H7:Email 30 content agencies.",
    marketing_script: "TWITTER: 'I built 3 topical clusters in a weekend that now rank for 800+ keywords. The trick is the internal linking structure — thread 🧵'. COLD DM: 'Hey [Name], your site is missing topical authority on [topic]. Our AI builds full clusters in 24hrs.'",
    scaling_roadmap: "W1:5 free clusters as demos. W2:Content SEO case study. W3:$299/mo subscription. W4:CMS integrations. M2:White-label for agencies. M3:Enterprise at $2K/mo.",
  },
  {
    id: "B008", category: "B2B SaaS/Automation",
    idea_name: "AI Employee Onboarding Automator",
    usp: "Converts company docs/SOPs into interactive onboarding flows — cuts onboarding time from 2 weeks to 3 days",
    difficulty: 3,
    launch_action: "H1:Document parser (PDF/Notion/Drive). H2:Interactive quiz generator. H3:Progress tracker dashboard. H4:Slack bot for daily check-ins. H5:$299/mo per company. H6:Post on HR LinkedIn groups. H7:Outreach to 20 HR managers.",
    marketing_script: "LINKEDIN: 'We cut our onboarding time by 60% using AI. Here's the exact system (HR managers, bookmark this)'. COLD DM: 'Hi [Name], most new hires become productive in 30+ days. We get them there in 7. Worth a 15-min call?'",
    scaling_roadmap: "W1:3 SMB pilots free. W2:ROI case study. W3:$499/mo pricing. W4:HRIS integrations. M2:Staffing agency partnerships. M3:Enterprise at $2K/mo.",
  },
  {
    id: "B009", category: "B2B SaaS/Automation",
    idea_name: "AI Ad Creative Fatigue Detector",
    usp: "Monitors Facebook/Google ad performance, detects creative fatigue before ROAS drops, auto-generates replacements",
    difficulty: 3,
    launch_action: "H1:Meta/Google Ads API. H2:Fatigue detection algorithm. H3:Claude creative generator. H4:Alert dashboard. H5:$197/mo pricing. H6:Post in Facebook Ads groups. H7:Target media buyers on Twitter.",
    marketing_script: "TWITTER: 'Your ad just got creative fatigue. You won't know for 3 more days. By then you've burned $4K. Here's how to catch it on Day 1.' COLD EMAIL: 'Subject: Your [Campaign Name] is showing fatigue signals. Here's what to do.'",
    scaling_roadmap: "W1:5 ecom brands free. W2:ROAS improvement case study. W3:$297/mo launch. W4:TikTok Ads integration. M2:Agency white-label. M3:DTC brand bundles.",
  },
  {
    id: "B010", category: "B2B SaaS/Automation",
    idea_name: "AI Pricing Optimizer for E-commerce",
    usp: "Dynamic repricing engine that adjusts product prices based on demand signals, inventory, and competitor data in real-time",
    difficulty: 4,
    launch_action: "H1:Shopify price update API. H2:Competitor price scraper. H3:Demand signal model. H4:Rule-based repricing engine. H5:$199/mo pricing. H6:Shopify App Store submission. H7:Post on Shopify Partners forum.",
    marketing_script: "TWITTER: 'I let AI reprice my Shopify store for 30 days. Revenue went up 22%, margin up 15%. Here's exactly what it did.' REDDIT: 'Dynamic pricing isn't just for airlines anymore — here's how I run it on a $500K Shopify store.'",
    scaling_roadmap: "W1:10 Shopify stores pilot. W2:Build App Store listing. W3:$249/mo launch. W4:Amazon/eBay connectors. M2:3PL integrations. M3:Enterprise custom models.",
  },
  {
    id: "B011", category: "B2B SaaS/Automation",
    idea_name: "AI Cold Email Personalization Engine",
    usp: "Scrapes LinkedIn + company news to write hyper-personalized first lines for cold emails at scale",
    difficulty: 2,
    launch_action: "H1:LinkedIn scraping (PhantomBuster). H2:News API for company signals. H3:Claude personalization prompt. H4:CSV export + Clay integration. H5:$0.15/email pricing. H6:Post on r/sales. H7:Email 30 SDRs on LinkedIn.",
    marketing_script: "TWITTER: 'Our cold email reply rate went from 2% to 14% after switching to AI first lines. Here's the exact prompt we use.' COLD DM: 'Hey [Name], your cold emails look like templates. I can make each one feel handwritten — in bulk. Want to see a sample?'",
    scaling_roadmap: "W1:500 free email credits. W2:Reply rate case study. W3:$199/mo subscription. W4:Outreach.io/Instantly integration. M2:SDR team bundles. M3:GTM agency partnerships.",
  },
  {
    id: "B012", category: "B2B SaaS/Automation",
    idea_name: "AI SOP Generator from Screen Recordings",
    usp: "Records your screen, auto-generates step-by-step SOPs with screenshots — turn any workflow into training docs",
    difficulty: 3,
    launch_action: "H1:Screen recorder SDK. H2:Claude step extraction. H3:Screenshot annotation layer. H4:PDF/Notion export. H5:$49/mo pricing. H6:Post on r/smallbusiness. H7:Target operations managers on LinkedIn.",
    marketing_script: "TWITTER: 'Stop documenting processes manually. I record my screen once and AI writes the SOP. Saved 6 hours this week.' COLD EMAIL: 'Subject: Turn your team's chaos into documented systems in 24 hours.'",
    scaling_roadmap: "W1:10 free team pilots. W2:Notion/Confluence integration. W3:$99/mo team plan. W4:Video tutorial overlays. M2:HR platform partnerships. M3:Enterprise custom export.",
  },
  {
    id: "B013", category: "B2B SaaS/Automation",
    idea_name: "AI Grant Writing Assistant for Nonprofits",
    usp: "Matches nonprofits to 500+ grants, auto-fills applications using org data, 10x faster submissions",
    difficulty: 2,
    launch_action: "H1:Grant database compilation. H2:Nonprofit profile builder. H3:Claude application drafter. H4:Simple form UI. H5:$149/mo or $99/application. H6:Post on Nonprofit Tech forums. H7:Email 30 nonprofit directors.",
    marketing_script: "LINKEDIN: 'Our nonprofit client applied for 12 grants last quarter. They used to do 2. Same team, AI writing assistant. Here's what changed.' COLD EMAIL: 'Subject: You qualify for 3 grants you haven't applied for yet.'",
    scaling_roadmap: "W1:5 nonprofits free. W2:Success rate tracking. W3:$199/mo launch. W4:Grant alert system. M2:Foundation partnerships. M3:Government grant tier.",
  },
  {
    id: "B014", category: "B2B SaaS/Automation",
    idea_name: "AI Product Description Bulk Generator",
    usp: "Transforms raw specs/CSV into SEO-optimized, brand-voice product descriptions for 1,000 SKUs in minutes",
    difficulty: 2,
    launch_action: "H1:CSV parser build. H2:Brand voice training prompt. H3:Bulk Claude API calls. H4:Export to Shopify/WooCommerce. H5:$0.10/description pricing. H6:Post on Shopify forum. H7:Cold email 20 catalog-heavy brands.",
    marketing_script: "TWITTER: 'I generated 2,400 product descriptions in 90 minutes for a client who quoted me $18,000 manually. Here's the system.' COLD EMAIL: 'Subject: Your product catalog is costing you SEO traffic — here's a 24hr fix.'",
    scaling_roadmap: "W1:Free 50 descriptions. W2:Shopify app listing. W3:$199/mo unlimited. W4:Multi-language support. M2:Amazon listing optimizer. M3:Enterprise API.",
  },
  {
    id: "B015", category: "B2B SaaS/Automation",
    idea_name: "AI Customer Support Ticket Classifier",
    usp: "Tags, prioritizes, and routes 100% of support tickets to correct team member in under 2 seconds",
    difficulty: 3,
    launch_action: "H1:Zendesk/Intercom API. H2:Classification model training. H3:Routing rules engine. H4:Escalation triggers. H5:$299/mo pricing. H6:Post in Customer Success Slack groups. H7:Email 20 CX directors.",
    marketing_script: "TWITTER: 'How we cut support ticket response time from 4 hours to 22 minutes with AI routing. Thread.' COLD EMAIL: 'Subject: Your support team is handling 40% of tickets that should be auto-resolved.'",
    scaling_roadmap: "W1:5 free integrations. W2:Resolution rate benchmark. W3:$399/mo pricing. W4:GPT-4 resolution layer. M2:Shopify/WooCommerce bundles. M3:Enterprise at $2K/mo.",
  },
  {
    id: "B016", category: "B2B SaaS/Automation",
    idea_name: "AI Invoice & AP Automation for SMBs",
    usp: "OCR + AI extracts invoice data, matches to POs, flags anomalies — replaces $80K/yr AP clerk",
    difficulty: 4,
    launch_action: "H1:Document AI OCR setup. H2:PO matching logic. H3:QuickBooks/Xero API. H4:Anomaly detection rules. H5:$499/mo pricing. H6:Post in accountant forums. H7:Target CFOs at SMBs.",
    marketing_script: "LINKEDIN: 'Our client processes 400 invoices/month manually. Now it's 0 hours of manual work. Here's what changed.' COLD EMAIL: 'Subject: Your AP process has a $40K/year hidden cost. Here's proof.'",
    scaling_roadmap: "W1:5 accounting firm pilots. W2:Compliance certification. W3:$699/mo enterprise tier. W4:ERP integrations. M2:Bookkeeping service partnerships. M3:White-label for accountants.",
  },
  {
    id: "B017", category: "B2B SaaS/Automation",
    idea_name: "AI Social Listening & Sentiment Tracker",
    usp: "Monitors brand mentions across 12 platforms, detects PR crises before they go viral, sends instant alerts",
    difficulty: 3,
    launch_action: "H1:Social API setup (Twitter/Reddit). H2:Sentiment analysis model. H3:Crisis threshold rules. H4:Slack/email alerts. H5:$197/mo pricing. H6:Post in PR Facebook groups. H7:Email 30 brand managers.",
    marketing_script: "TWITTER: 'A startup caught a PR crisis 4 hours before it went viral using social listening AI. Here's what the alert looked like.' COLD DM: 'Hi [Name], I found 3 negative threads about [Brand] posted this week. Your team hasn't responded. Want the full report?'",
    scaling_roadmap: "W1:Free 7-day brand audit. W2:Crisis response playbook. W3:$297/mo launch. W4:TikTok/Pinterest API. M2:PR agency white-label. M3:Enterprise at $2K/mo.",
  },
  {
    id: "B018", category: "B2B SaaS/Automation",
    idea_name: "AI Job Description Optimizer",
    usp: "Rewrites job descriptions to remove bias, add SEO keywords, and increase qualified applicant rate by 60%",
    difficulty: 2,
    launch_action: "H1:Bias detection model. H2:Job board keyword research. H3:Claude rewriting engine. H4:Before/after comparison UI. H5:$29/job or $99/mo. H6:Post on LinkedIn HR groups. H7:Email 30 talent acquisition managers.",
    marketing_script: "LINKEDIN: 'We rewrote 12 job descriptions with AI. Applications went up 89%, qualified rate up 60%. Here's what we changed.' TWITTER: 'Your job description is accidentally filtering out top talent. Here's why.'",
    scaling_roadmap: "W1:50 free optimizations. W2:Application rate case study. W3:$149/mo team plan. W4:ATS integrations. M2:Recruiting agency white-label. M3:Enterprise HR bundles.",
  },
  {
    id: "B019", category: "B2B SaaS/Automation",
    idea_name: "AI Podcast Show Notes & SEO Generator",
    usp: "Transcribes podcast, generates chapters, SEO show notes, timestamps, and distribution-ready clips automatically",
    difficulty: 2,
    launch_action: "H1:Whisper API for transcription. H2:Claude chapter/summary generator. H3:Timestamp extractor. H4:WordPress/RSS auto-publish. H5:$49/episode or $199/mo. H6:Post on r/podcasting. H7:Email 30 podcast agencies.",
    marketing_script: "TWITTER: 'I get 3x more SEO traffic from my podcast since adding AI-generated show notes. Here's my exact workflow.' COLD DM: 'Hey [Name], your podcast episodes are getting zero organic search traffic. I can fix that in 24 hours — want to see a sample?'",
    scaling_roadmap: "W1:5 free episode pilots. W2:SEO traffic case study. W3:$299/mo agency plan. W4:Spotify/Apple integration. M2:Podcast network deals. M3:Enterprise bulk pricing.",
  },
  {
    id: "B020", category: "B2B SaaS/Automation",
    idea_name: "AI Vendor Due Diligence Automator",
    usp: "Scrapes vendor websites, reviews, financials, and news to produce a full risk report in 10 minutes vs 10 days",
    difficulty: 4,
    launch_action: "H1:Data source APIs (Crunchbase, news). H2:Risk scoring framework. H3:Claude report generator. H4:PDF export. H5:$299/report or $999/mo. H6:Post in procurement forums. H7:Email 20 procurement managers.",
    marketing_script: "LINKEDIN: 'Our procurement team does full vendor due diligence in 10 minutes now. Here's the AI system we built.' COLD EMAIL: 'Subject: Your last vendor onboarding took how many weeks? Here's a 10-minute alternative.'",
    scaling_roadmap: "W1:5 enterprise free pilots. W2:Compliance documentation. W3:$1,499/mo enterprise. W4:ERP connector. M2:Legal firm partnerships. M3:Government procurement tier.",
  },

  // ── CATEGORY 2: High-Ticket Digital Services (20 ideas) ───────────────────
  {
    id: "H001", category: "High-Ticket Digital Services",
    idea_name: "AI Podcast Clip Monetization Service",
    usp: "Turns 1 long-form podcast into 30 viral short clips with captions, hooks, and posting schedule — done for you",
    difficulty: 2,
    launch_action: "H1:Descript/Opus clip API. H2:Caption generator. H3:Hook analyzer prompt. H4:Delivery system (Google Drive). H5:$500/mo per podcast. H6:DM 20 podcasters on Twitter. H7:Post podcast sample before/after.",
    marketing_script: "TWITTER: 'I turned one 2-hour podcast episode into 34 viral clips. All in 3 hours. Here's every tool I used.' COLD DM: 'Hey [Name], your podcast has amazing content that's dying after 48 hours. I repurpose it into 30 clips/month. Want 5 free samples?'",
    scaling_roadmap: "W1:3 free trial clients. W2:Showcase results reel. W3:Raise to $799/mo. W4:Hire VA for editing. M2:YouTube Shorts tier. M3:3-podcast bundle at $1,500/mo.",
  },
  {
    id: "H002", category: "High-Ticket Digital Services",
    idea_name: "AI Executive LinkedIn Ghostwriting",
    usp: "Turns 15-min weekly CEO interview into 20 posts, 2 newsletters, and full content calendar — done for you",
    difficulty: 2,
    launch_action: "H1:Interview intake form. H2:Content extraction Claude prompt. H3:Post scheduling system. H4:Review/approval workflow. H5:$1,500/mo per executive. H6:DM 15 CEOs on LinkedIn. H7:Post one case study post.",
    marketing_script: "LINKEDIN: 'I write LinkedIn content for 7-figure executives. Here's why the ones who post consistently outperform those who don't (data inside).' COLD DM: 'Hi [Name], I noticed you post once every 6 weeks. I help executives like you post daily — 15-min/week commitment from you. Want proof it works?'",
    scaling_roadmap: "W1:2 clients at $1K/mo. W2:Systemize with Notion. W3:Raise to $1,500/mo. W4:Hire junior writer. M2:5 clients = $7,500 MRR. M3:Agency model at $3K/mo.",
  },
  {
    id: "H003", category: "High-Ticket Digital Services",
    idea_name: "AI-Powered Sales Script Personalization Service",
    usp: "Analyzes prospect LinkedIn/website, writes personalized sales call scripts, objection handlers, and follow-up sequences",
    difficulty: 2,
    launch_action: "H1:Client intake process. H2:Prospect research prompt. H3:Script template library. H4:Delivery as PDF+Notion. H5:$2,000 per sales team setup. H6:Post LinkedIn win story. H7:DM 10 VP Sales on LinkedIn.",
    marketing_script: "LINKEDIN: 'I rewrote the sales scripts for a SaaS team. They closed $180K in the next 60 days. Here's what changed.' COLD DM: 'Hi [Name], your team's close rate could double with personalized scripts. I research each prospect and write the exact words to say.'",
    scaling_roadmap: "W1:1 client at $2K. W2:Document the system. W3:$3K per new client. W4:Add monthly script refresh. M2:Retainer model $1K/mo. M3:Sales team licensing.",
  },
  {
    id: "H004", category: "High-Ticket Digital Services",
    idea_name: "AI E-commerce Store Audit & Revenue Optimization",
    usp: "Deep AI audit of Shopify store — CRO, SEO, email sequences, ads — with 30-day implementation roadmap",
    difficulty: 2,
    launch_action: "H1:Shopify audit checklist. H2:GA4/Shopify data analysis. H3:Claude recommendation engine. H4:PDF report template. H5:$997 per audit. H6:Post before/after revenue example. H7:DM 15 Shopify store owners.",
    marketing_script: "TWITTER: 'I audited a $40K/month Shopify store and found $18K in annual leaked revenue in 4 areas. Thread on what I found.' COLD DM: 'Hey [Name], I analyzed your store and found 3 issues costing you conversions. Want the free 2-page report?'",
    scaling_roadmap: "W1:2 audits at $997. W2:Add implementation package. W3:$1,497 audit + $1K implementation. W4:Recurring $500/mo monitoring. M2:Agency referral network. M3:Scale to $15K/mo.",
  },
  {
    id: "H005", category: "High-Ticket Digital Services",
    idea_name: "AI YouTube Script & SEO Strategy Service",
    usp: "Keyword research + full script writing for YouTube channels — optimized for 100K+ view potential per video",
    difficulty: 2,
    launch_action: "H1:VidIQ/TubeBuddy research. H2:Script template framework. H3:Claude scripting engine. H4:Thumbnail brief generator. H5:$500/video or $1,500/mo. H6:Post a sample script publicly. H7:DM 20 YouTube creators.",
    marketing_script: "TWITTER: 'I wrote a YouTube script for a creator using AI + SEO research. The video hit 200K views in 2 weeks. Here's the exact structure.' COLD DM: 'Hey [Name], I analyzed your last 10 videos. Your hooks need work — here's a free rewrite of your next video title.'",
    scaling_roadmap: "W1:3 clients at $500/video. W2:Build template library. W3:$1,200/mo package. W4:Hire research VA. M2:YouTube channel package. M3:$5K/mo agency model.",
  },
  {
    id: "H006", category: "High-Ticket Digital Services",
    idea_name: "AI Newsletter Ghostwriting for Founders",
    usp: "Weekly founder newsletter written from a 20-min brain dump — with AI research, storytelling, and CTAs",
    difficulty: 2,
    launch_action: "H1:Client intake Tally form. H2:Brain dump → newsletter prompt. H3:Beehiiv publishing workflow. H4:Approval system. H5:$800/mo per client. H6:Post newsletter sample publicly. H7:DM 15 founders on Twitter.",
    marketing_script: "TWITTER: 'I ghostwrite newsletters for 6-figure founders. Here's why the ones with newsletters are building 10x better businesses.' COLD DM: 'Hi [Name], I noticed you have [X] followers but no newsletter. That's leaving $3K-$10K/mo on the table. I can launch yours in 48 hours.'",
    scaling_roadmap: "W1:2 clients at $600/mo. W2:Raise to $800/mo. W3:5 clients = $4,000 MRR. W4:Hire editor. M2:$1,200/mo with social repurposing. M3:10 clients = $12K/mo.",
  },
  {
    id: "H007", category: "High-Ticket Digital Services",
    idea_name: "AI Brand Identity Package Generator",
    usp: "Delivers complete brand identity (logo concepts, colors, typography, voice guidelines, social templates) in 48 hours",
    difficulty: 2,
    launch_action: "H1:Brand questionnaire form. H2:Midjourney/DALL-E logo concepts. H3:Color + typography system. H4:Canva template creation. H5:$997 flat fee. H6:Post portfolio examples. H7:DM 20 startup founders.",
    marketing_script: "TWITTER: 'Branding agencies charge $5,000-$20,000 and take 6 weeks. I deliver in 48 hours for $997 using AI. Here's what you get.' COLD DM: 'Hey [Name], your brand looks like it was made in a hurry. I deliver a complete AI brand package in 48 hours for $997. Here's a sample.'",
    scaling_roadmap: "W1:5 clients at $997. W2:Systematize delivery. W3:Raise to $1,497. W4:Add monthly asset pack. M2:Startup incubator deal. M3:Productized agency.",
  },
  {
    id: "H008", category: "High-Ticket Digital Services",
    idea_name: "AI Customer Journey Mapping Service",
    usp: "Maps every touchpoint of your customer's journey using AI analytics — finds the hidden drop-off points costing revenue",
    difficulty: 3,
    launch_action: "H1:Analytics audit framework. H2:Claude journey analysis. H3:Journey map visual (Figma). H4:Revenue recovery report. H5:$1,500 project fee. H6:LinkedIn case study post. H7:DM 10 CMOs.",
    marketing_script: "LINKEDIN: 'I mapped a SaaS company's customer journey and found a touchpoint costing them $200K/year. It took 4 hours to find and 1 hour to fix.' COLD EMAIL: 'Subject: There's a leak in your customer journey. I can find it in 48 hours.'",
    scaling_roadmap: "W1:2 clients at $1K. W2:Template system. W3:$1,500 standard project. W4:Monthly monitoring retainer. M2:GTM consultant referrals. M3:Enterprise at $5K.",
  },
  {
    id: "H009", category: "High-Ticket Digital Services",
    idea_name: "AI Webinar Funnel Builder Service",
    usp: "Builds complete webinar sales funnel — landing page copy, email sequence, slide script, and replay page in 72 hours",
    difficulty: 2,
    launch_action: "H1:Funnel template library. H2:Claude copy generator. H3:Email sequence builder. H4:Slide deck template. H5:$1,997 flat fee. H6:Post webinar funnel breakdown. H7:DM 15 online course creators.",
    marketing_script: "TWITTER: 'A client made $34,000 from a webinar I built in 72 hours. Here's every piece of the funnel.' COLD DM: 'Hi [Name], I noticed you don't run webinars. It's the #1 highest-converting format for your offer. I'll build the whole funnel in 72 hours.'",
    scaling_roadmap: "W1:2 clients at $1,500. W2:Raise to $1,997. W3:Add follow-up optimization. W4:Monthly $500 retainer. M2:Course creator communities. M3:5 funnels/mo at $10K revenue.",
  },
  {
    id: "H010", category: "High-Ticket Digital Services",
    idea_name: "AI Outbound Sales System Builder",
    usp: "Full outbound infrastructure setup: lead list, clay enrichment, Instantly sequences, copywriting — first campaign live in 7 days",
    difficulty: 3,
    launch_action: "H1:ICP definition workshop. H2:Apollo.io list building. H3:Clay enrichment workflow. H4:Instantly sequence setup. H5:$2,500 setup + $500/mo. H6:Post cold email result screenshot. H7:DM 10 B2B founders.",
    marketing_script: "TWITTER: 'I set up a full outbound system for a SaaS startup in 7 days. They booked 22 meetings in the first month. Here's the exact stack.' COLD DM: 'Hi [Name], you have a great product but no outbound motion. I can build the whole machine in a week.'",
    scaling_roadmap: "W1:1 client at $2K setup. W2:Systemize with SOPs. W3:Raise to $2,500 + $500/mo. W4:Hire VA for execution. M2:4 clients = $8K/mo. M3:Agency model.",
  },
  {
    id: "H011", category: "High-Ticket Digital Services",
    idea_name: "AI Video Sales Letter (VSL) Script Writer",
    usp: "Researches market, writes proven VSL structure, and delivers a complete 15-20 min script ready to record",
    difficulty: 2,
    launch_action: "H1:VSL framework library. H2:Market research prompt. H3:Claude VSL generator. H4:Script review workflow. H5:$1,200 per VSL. H6:Post VSL conversion data. H7:DM 15 info-product creators.",
    marketing_script: "TWITTER: 'A client's VSL was converting at 1.2%. We rewrote it with AI. It now converts at 4.8%. Here's the structural change that did it.' COLD DM: 'Hey [Name], your VSL is probably leaving 3x revenue on the table. I can rewrite it in 48 hours.'",
    scaling_roadmap: "W1:3 clients at $800. W2:Raise to $1,200. W3:Add landing page copy add-on. W4:Monthly split test service. M2:Funnel builder partnerships. M3:$10K/mo at 8 projects.",
  },
  {
    id: "H012", category: "High-Ticket Digital Services",
    idea_name: "AI Book/Course Outline & Chapter Builder",
    usp: "Turns expert knowledge into fully structured book outline, chapter summaries, and first 3 chapters ready to publish",
    difficulty: 2,
    launch_action: "H1:Expert interview intake. H2:Structure extraction prompt. H3:Chapter builder workflow. H4:Formatting system. H5:$1,500 per book outline. H6:Post before/after sample. H7:DM 20 coaches and speakers.",
    marketing_script: "TWITTER: 'I helped a consultant turn a 30-minute interview into a full book outline and 3 complete chapters in 48 hours. The book is now a lead gen machine.' COLD DM: 'Hi [Name], you have enough expertise for 3 books. I can build the outline and first chapters in 48 hours.'",
    scaling_roadmap: "W1:3 clients at $1K. W2:Raise to $1,500. W3:Add full ghostwriting package at $5K. W4:Publisher connections. M2:Speaker bureau partnership. M3:Recurring IP licensing.",
  },
  {
    id: "H013", category: "High-Ticket Digital Services",
    idea_name: "AI Due Diligence Report for Angel Investors",
    usp: "Produces 20-page startup due diligence report — team, market, product, financials, risks — in 24 hours vs 2 weeks",
    difficulty: 4,
    launch_action: "H1:Due diligence framework. H2:Data source integration. H3:Claude analysis engine. H4:Report template. H5:$500/report. H6:Post on AngelList forums. H7:DM 20 angel investors.",
    marketing_script: "TWITTER: 'I can do a full startup due diligence report in 24 hours. Here's what a traditional DD misses and what AI catches.' COLD DM: 'Hi [Name], I saw you're active in angel investing. I produce 24-hour due diligence reports for $500. Here's a sample.'",
    scaling_roadmap: "W1:5 reports at $300. W2:Raise to $500. W3:Monthly retainer $2K. W4:VC fund partnerships. M2:Deal flow newsletter. M3:AngelList integration.",
  },
  {
    id: "H014", category: "High-Ticket Digital Services",
    idea_name: "AI Pitch Deck Designer & Story Builder",
    usp: "Builds investor-grade pitch deck: narrative, financial projections framework, slide design, in 48 hours",
    difficulty: 3,
    launch_action: "H1:Startup intake questionnaire. H2:Pitch narrative Claude prompt. H3:Canva slide templates. H4:Financial chart templates. H5:$1,500 per deck. H6:Post deck teardown on LinkedIn. H7:DM 15 early-stage founders.",
    marketing_script: "LINKEDIN: 'I reviewed 100 pitch decks. 80% fail at the same 3 slides. Here's what investors actually want to see.' COLD DM: 'Hi [Name], I saw you're raising a round. I build investor-grade pitch decks in 48 hours. Want to see 3 examples?'",
    scaling_roadmap: "W1:2 clients at $1K. W2:Raise to $1,500. W3:Add pitch coaching add-on. W4:VC firm referral program. M2:Accelerator program partner. M3:$12K/mo at 8 decks.",
  },
  {
    id: "H015", category: "High-Ticket Digital Services",
    idea_name: "AI Amazon Listing Optimization Service",
    usp: "Full Amazon listing rewrite: title, bullets, A+ content, backend keywords — increases organic rank within 30 days",
    difficulty: 2,
    launch_action: "H1:Keyword research (Helium10). H2:Competitor analysis. H3:Claude listing generator. H4:A+ content templates. H5:$497/listing or $1,497 for 5. H6:Post Amazon rank improvement example. H7:DM 20 Amazon sellers.",
    marketing_script: "TWITTER: 'I optimized 5 Amazon listings for a seller. 30 days later, organic revenue up 67%. Here's every change I made.' COLD DM: 'Hey [Name], your Amazon listing is missing 40% of the keywords your competitors rank for. I can fix it in 48 hours.'",
    scaling_roadmap: "W1:3 listings at $397. W2:Raise to $497. W3:5-listing bundle. W4:Monthly optimization retainer. M2:Amazon seller groups. M3:Agency model at $10K/mo.",
  },
  {
    id: "H016", category: "High-Ticket Digital Services",
    idea_name: "AI Data Analysis & Business Intelligence Reports",
    usp: "Turns raw business data (sales, ops, marketing) into executive-ready visual reports with actionable insights in 24 hours",
    difficulty: 3,
    launch_action: "H1:Data intake process. H2:Claude analysis prompt. H3:Looker Studio/Charts templates. H4:PDF report system. H5:$499/report or $1,500/mo. H6:Post data insight example. H7:DM 20 SMB owners.",
    marketing_script: "LINKEDIN: 'I analyzed 12 months of a restaurant group's data in 4 hours. Found $80K in optimization. Here's what the data showed.' COLD EMAIL: 'Subject: Your business data is telling you something — you just can't see it yet.'",
    scaling_roadmap: "W1:3 free reports. W2:Case study campaign. W3:$499 standard report. W4:Monthly BI retainer. M2:Accounting firm partnerships. M3:Enterprise at $3K/mo.",
  },
  {
    id: "H017", category: "High-Ticket Digital Services",
    idea_name: "AI E-learning Course Creation Service",
    usp: "Turns expert knowledge interview into complete online course: outline, scripts, quizzes, and workbooks in 2 weeks",
    difficulty: 3,
    launch_action: "H1:Expert knowledge extraction. H2:Course structure builder. H3:Script/slide generator. H4:Quiz builder. H5:$3,000 per course. H6:Post course creation timeline. H7:DM 15 coaches and consultants.",
    marketing_script: "TWITTER: 'I helped a consultant launch a $997 course in 2 weeks. Here's exactly how we built it using AI.' COLD DM: 'Hi [Name], you've been saying you'll launch your course for months. I can build the whole thing in 2 weeks. Want to see a sample module?'",
    scaling_roadmap: "W1:1 client at $2K. W2:Systematize workflow. W3:Raise to $3,000. W4:Add launch coaching. M2:Kajabi/Teachable partnerships. M3:2 courses/mo at $6K.",
  },
  {
    id: "H018", category: "High-Ticket Digital Services",
    idea_name: "AI Technical Documentation Service for SaaS",
    usp: "Turns API specs/code into developer docs, help center articles, and onboarding guides that reduce support tickets 40%",
    difficulty: 3,
    launch_action: "H1:Documentation intake. H2:Claude tech writing prompt. H3:GitBook/Mintlify setup. H4:Review process. H5:$2,000 per project. H6:Post documentation example. H7:DM 15 SaaS founders.",
    marketing_script: "TWITTER: 'Good developer docs reduce support tickets by 40% and increase trial-to-paid by 15%. Yet most SaaS companies have terrible docs.' COLD DM: 'Hi [Name], I read your API docs. They're missing 5 things that cause developer churn. I can rewrite them in 1 week.'",
    scaling_roadmap: "W1:2 clients at $1,500. W2:Raise to $2,000. W3:Monthly update retainer. W4:Developer relations add-on. M2:Dev tool communities. M3:$15K/mo retainer model.",
  },
  {
    id: "H019", category: "High-Ticket Digital Services",
    idea_name: "AI Reputation Management Service",
    usp: "Monitors and improves online reviews across Google/Yelp/G2 using AI responses + proactive review generation",
    difficulty: 2,
    launch_action: "H1:Review monitoring setup. H2:AI response generator. H3:Review request templates. H4:Monthly report. H5:$499/mo per business. H6:Post before/after review example. H7:DM 20 local businesses.",
    marketing_script: "TWITTER: 'A restaurant's Google rating went from 3.8 to 4.6 in 90 days. No fake reviews. Just AI-powered responses and a smart ask system.' COLD DM: 'Hey [Name], your Google rating is costing you customers. I can get it to 4.5+ in 90 days. Here's how.'",
    scaling_roadmap: "W1:3 clients at $299/mo. W2:Raise to $499/mo. W3:10 clients = $4,990 MRR. W4:Multi-location plans. M2:Digital agency partnerships. M3:Franchise management tier.",
  },
  {
    id: "H020", category: "High-Ticket Digital Services",
    idea_name: "AI Competitive Pricing Strategy Service",
    usp: "Analyzes your pricing vs top 20 competitors, identifies positioning gaps, and delivers a pricing overhaul strategy",
    difficulty: 3,
    launch_action: "H1:Competitor pricing research. H2:Positioning analysis. H3:Pricing model framework. H4:Strategy report. H5:$1,200 per audit. H6:Post pricing case study. H7:DM 15 SaaS founders.",
    marketing_script: "LINKEDIN: 'A SaaS founder raised prices by 40% after our pricing audit. Churn went down, not up. Here's why.' COLD EMAIL: 'Subject: You might be the cheapest in your category. Here's why that's killing your growth.'",
    scaling_roadmap: "W1:2 audits at $800. W2:Raise to $1,200. W3:Add quarterly review. W4:Pricing experimentation add-on. M2:SaaS community partnerships. M3:Ongoing retainer model.",
  },

  // ── CATEGORY 3: Micro-Niche Content Engines (20 ideas) ────────────────────
  {
    id: "M001", category: "Micro-Niche Content Engines",
    idea_name: "AI Legal Compliance Newsletter by US State",
    usp: "Weekly AI-curated newsletter on employment law changes for a specific US state — sold to HR managers and law firms",
    difficulty: 2,
    launch_action: "H1:Legal feed aggregation (RSS/APIs). H2:Claude summarization + compliance context. H3:Beehiiv setup. H4:$49/mo subscription. H5:Landing page. H6:Post on state-specific HR Facebook group. H7:Email 30 HR managers in target state.",
    marketing_script: "LINKEDIN: 'HR managers in [State]: there were 3 compliance changes last month that affect your handbook. Most missed them. Here's a summary.' TWITTER: 'Employment law changes 400+ times per year. We track every single one so HR teams don't get sued.'",
    scaling_roadmap: "W1:100 free subscribers. W2:First paid tier at $29/mo. W3:Raise to $49/mo. W4:Add second state. M2:10 states = $10K/mo. M3:Law firm white-label.",
  },
  {
    id: "M002", category: "Micro-Niche Content Engines",
    idea_name: "AI Golf Course Review & Equipment Newsletter",
    usp: "Weekly AI-analyzed course reviews, equipment comparisons, and swing tips for handicap 10-20 golfers",
    difficulty: 1,
    launch_action: "H1:Golf news feed aggregation. H2:Claude content curation. H3:Beehiiv/Substack setup. H4:$19/mo subscription. H5:Landing page. H6:Post in golf subreddits. H7:Partner with local golf shop.",
    marketing_script: "REDDIT: 'I've analyzed 200 golf courses and distilled the top 10 tips for breaking 90 — here's what actually works (no BS).' TWITTER: 'Golfers waste $500/year on equipment that won't fix their game. Here's what the data says actually helps a 15-handicapper.'",
    scaling_roadmap: "W1:500 free subscribers. W2:Paid tier $9/mo. W3:Raise to $19/mo. W4:Golf course sponsorships. M2:Equipment affiliate. M3:5,000 subscribers = $95K/yr.",
  },
  {
    id: "M003", category: "Micro-Niche Content Engines",
    idea_name: "AI Niche Job Board for AI/ML Roles",
    usp: "Aggregates and curates AI/ML job postings, salary data, and skill gap analysis — newsletter + job board hybrid",
    difficulty: 2,
    launch_action: "H1:Job scraping from 10 sources. H2:Claude summarization. H3:Beehiiv + job board setup. H4:$29/mo job seekers, $299/mo employers. H5:SEO landing page. H6:Post on r/MachineLearning. H7:Twitter ML community.",
    marketing_script: "TWITTER: 'I track every AI/ML job posting daily. The salary data is shocking — here's what different titles actually pay in 2024.' REDDIT: 'I analyzed 2,000 AI job descriptions. Here are the 8 skills mentioned most in 6-figure roles.'",
    scaling_roadmap: "W1:1,000 free subscribers. W2:Paid tier launch. W3:Employer job posting revenue. W4:Resume review add-on. M2:Bootcamp partnerships. M3:Recruiter licensing.",
  },
  {
    id: "M004", category: "Micro-Niche Content Engines",
    idea_name: "AI Interior Design Trend Report for Architects",
    usp: "Monthly AI-curated report on emerging design trends, material costs, and client preference data — for interior designers",
    difficulty: 1,
    launch_action: "H1:Design trend feed setup. H2:Claude analysis + report. H3:PDF + email delivery. H4:$39/mo subscription. H5:Landing page. H6:Instagram + Pinterest content. H7:Email interior design associations.",
    marketing_script: "INSTAGRAM: 'The 3 interior design trends dominating 2025 that most designers haven't caught yet (AI-analyzed from 10,000 projects).' EMAIL: 'Subject: The material that's replacing marble in high-end residential projects this quarter.'",
    scaling_roadmap: "W1:200 free subscribers. W2:Paid at $29/mo. W3:Raise to $39/mo. W4:Supplier sponsorships. M2:Architecture firm bulk licenses. M3:Design school partnerships.",
  },
  {
    id: "M005", category: "Micro-Niche Content Engines",
    idea_name: "AI Restaurant Industry Profit Intelligence",
    usp: "Weekly menu pricing intelligence, labor cost benchmarks, and food cost analysis for independent restaurant owners",
    difficulty: 2,
    launch_action: "H1:Restaurant data aggregation. H2:Benchmark analysis. H3:Claude report generator. H4:$49/mo subscription. H5:Landing page. H6:Post on restaurant owner Facebook groups. H7:Partner with food distributors.",
    marketing_script: "FACEBOOK: 'Food costs in [City] went up 8% last month. Here's which menu items restaurant owners should reprice right now.' EMAIL: 'Subject: Your burger margins are 3% below city average — here's the fix.'",
    scaling_roadmap: "W1:100 free trials. W2:$29/mo launch. W3:Raise to $49/mo. W4:Food supplier partnerships. M2:POS system integrations. M3:Restaurant group enterprise.",
  },
  {
    id: "M006", category: "Micro-Niche Content Engines",
    idea_name: "AI Crypto/DeFi Tax Compliance Newsletter",
    usp: "Weekly digest of crypto tax rule changes, wallet tracking tips, and country-specific compliance updates",
    difficulty: 2,
    launch_action: "H1:Crypto tax news feeds. H2:Claude compliance summaries. H3:Beehiiv setup. H4:$29/mo subscription. H5:Landing page. H6:Post on r/CryptoCurrency. H7:DM crypto Twitter influencers.",
    marketing_script: "TWITTER: 'Crypto taxes changed in 3 countries this week. Most HODLers don't know. Here's a breakdown.' REDDIT: 'I track every crypto tax rule change globally. Here's what changed in October that affects your 2024 filing.'",
    scaling_roadmap: "W1:500 free subscribers. W2:Paid at $19/mo. W3:Raise to $29/mo. W4:Tax tool affiliates. M2:CPA partnership program. M3:Enterprise for funds.",
  },
  {
    id: "M007", category: "Micro-Niche Content Engines",
    idea_name: "AI Pet Health & Nutrition Intelligence Newsletter",
    usp: "Weekly AI-curated pet health research, food recall alerts, and breed-specific nutrition guides for pet owners",
    difficulty: 1,
    launch_action: "H1:Pet health news aggregation. H2:Claude analysis. H3:Beehiiv setup. H4:$9/mo subscription. H5:Free quiz lead magnet. H6:Post on r/dogs + r/cats. H7:Partner with vet clinics.",
    marketing_script: "REDDIT: 'FDA just issued a pet food recall that affects 200,000 bags — here's if yours is included.' INSTAGRAM: 'Your dog's food might be missing this mineral. AI analysis of 50 top brands revealed it.'",
    scaling_roadmap: "W1:1,000 free subscribers. W2:$5/mo launch. W3:Raise to $9/mo. W4:Pet food affiliates. M2:Vet clinic white-label. M3:10,000 subscribers = $90K/yr.",
  },
  {
    id: "M008", category: "Micro-Niche Content Engines",
    idea_name: "AI Commercial Real Estate Data Digest",
    usp: "Weekly AI analysis of CRE deal flow, cap rate trends, and market velocity data for investors and brokers",
    difficulty: 3,
    launch_action: "H1:CoStar/LoopNet data scraping. H2:Claude market analysis. H3:PDF + email delivery. H4:$99/mo subscription. H5:Landing page. H6:Post on BiggerPockets. H7:DM CRE brokers on LinkedIn.",
    marketing_script: "LINKEDIN: 'Cap rates in [Market] compressed 40bps last quarter while vacancy hit a 5-year low. Here's what that means for 2025.' COLD EMAIL: 'Subject: The CRE data intelligence report your competitors are reading.'",
    scaling_roadmap: "W1:50 free trials. W2:$69/mo launch. W3:Raise to $99/mo. W4:City-specific tiers. M2:CRE brokerage firms. M3:Institutional investor subscriptions.",
  },
  {
    id: "M009", category: "Micro-Niche Content Engines",
    idea_name: "AI Fitness Coach Content Automation Package",
    usp: "Generates 30 days of workout plans, nutrition tips, and social content for fitness coaches monthly",
    difficulty: 1,
    launch_action: "H1:Fitness content templates. H2:Claude plan generator. H3:Canva social templates. H4:Delivery system. H5:$99/mo per coach. H6:Post on fitness coach Facebook groups. H7:DM 30 fitness coaches on Instagram.",
    marketing_script: "INSTAGRAM: 'Fitness coaches: I generate your full month of content — workouts, nutrition, posts — in 2 hours. Here's what it looks like.' COLD DM: 'Hey [Name], I create your entire month of content so you can focus on training. $99/month. Want a free sample week?'",
    scaling_roadmap: "W1:5 coaches free trial. W2:$49/mo launch. W3:Raise to $99/mo. W4:Customization tier. M2:Gym partnership. M3:50 coaches = $5K/mo.",
  },
  {
    id: "M010", category: "Micro-Niche Content Engines",
    idea_name: "AI Financial Advisor Social Content Engine",
    usp: "Generates compliant (FINRA-aware) social media content, newsletter, and educational posts for financial advisors monthly",
    difficulty: 3,
    launch_action: "H1:Compliance framework setup. H2:Claude content with disclaimers. H3:Approval workflow. H4:Scheduling system. H5:$299/mo per advisor. H6:Post in financial advisor LinkedIn groups. H7:Email 30 RIAs.",
    marketing_script: "LINKEDIN: 'Financial advisors post 80% less than they should because compliance is a nightmare. I solved it — here's how.' COLD EMAIL: 'Subject: You could get 3-5 referrals/month from LinkedIn. Compliance-approved content solves the biggest blocker.'",
    scaling_roadmap: "W1:3 advisors at $199/mo. W2:Compliance documentation. W3:$299/mo pricing. W4:10 advisors = $3K MRR. M2:RIA firm bundles. M3:Broker-dealer licensing.",
  },
  {
    id: "M011", category: "Micro-Niche Content Engines",
    idea_name: "AI Parenting Blog Content Automation",
    usp: "Generates weekly parenting content calendar: blog posts, Instagram captions, Pinterest descriptions, and email newsletter",
    difficulty: 1,
    launch_action: "H1:Content strategy template. H2:Claude content generation. H3:Canva image prompts. H4:Delivery system. H5:$79/mo per blogger. H6:Post in parenting blogger Facebook groups. H7:DM 20 parenting bloggers.",
    marketing_script: "FACEBOOK: 'Parenting bloggers: I generate your entire content calendar for the month in 2 hours. SEO blogs, IG captions, Pinterest — all done.' COLD DM: 'Hey [Name], I create a full month of parenting content for $79. Want a free week to try?'",
    scaling_roadmap: "W1:10 bloggers free. W2:$39/mo launch. W3:Raise to $79/mo. W4:SEO optimization add-on. M2:Blogger network deals. M3:Brand sponsorship coordination.",
  },
  {
    id: "M012", category: "Micro-Niche Content Engines",
    idea_name: "AI Real Estate Agent Content Machine",
    usp: "Generates weekly market update posts, property description copy, and social content for real estate agents",
    difficulty: 1,
    launch_action: "H1:MLS data integration. H2:Claude content templates. H3:Social scheduling. H4:Delivery system. H5:$149/mo per agent. H6:Post in real estate Facebook groups. H7:DM 30 real estate agents.",
    marketing_script: "FACEBOOK: 'Real estate agents: I write your weekly market updates, property descriptions, and social posts. 10 minutes of your time per month.' COLD DM: 'Hi [Name], I noticed you post about listings but nothing educational. I can fix that — and it'll get you 10x more referrals.'",
    scaling_roadmap: "W1:5 agents free. W2:$99/mo launch. W3:Raise to $149/mo. W4:Brokerage group deals. M2:10 agents = $1,500 MRR. M3:Franchise licensing.",
  },
  {
    id: "M013", category: "Micro-Niche Content Engines",
    idea_name: "AI Supplement Industry Research Digest",
    usp: "Weekly AI-analyzed supplement research, FDA alerts, and ingredient trend data for formulators and brands",
    difficulty: 2,
    launch_action: "H1:PubMed + FDA feed setup. H2:Claude research analysis. H3:Beehiiv newsletter. H4:$49/mo subscription. H5:Landing page. H6:Post on supplement industry LinkedIn. H7:Email 30 supplement brands.",
    marketing_script: "LINKEDIN: 'The FDA issued 12 supplement warnings last quarter. Here are the ingredients that keep appearing — and what brands need to do.' EMAIL: 'Subject: New study changes everything we thought about [ingredient].'",
    scaling_roadmap: "W1:100 free subscribers. W2:$29/mo launch. W3:Raise to $49/mo. W4:Brand sponsor tiers. M2:Formulator community. M3:Industry conference partnerships.",
  },
  {
    id: "M014", category: "Micro-Niche Content Engines",
    idea_name: "AI ESG/Sustainability Report Generator for SMBs",
    usp: "SMBs now need ESG reporting for enterprise contracts — generates compliant sustainability reports using AI in 48 hours",
    difficulty: 3,
    launch_action: "H1:ESG framework (GRI standards). H2:Data intake questionnaire. H3:Claude report generator. H4:PDF output. H5:$997 per report. H6:Post on LinkedIn ESG groups. H7:Email 30 SMB CFOs.",
    marketing_script: "LINKEDIN: 'Enterprise clients are now requiring ESG reports from vendors. SMBs that can't produce them are losing contracts. Here's the fix.' COLD EMAIL: 'Subject: [Company] requires an ESG report from all vendors by Q1. We can build yours in 48 hours.'",
    scaling_roadmap: "W1:3 reports at $697. W2:Raise to $997. W3:Annual update subscription. W4:Accounting firm referrals. M2:Enterprise vendor network. M3:$15K/mo at 15 reports.",
  },
  {
    id: "M015", category: "Micro-Niche Content Engines",
    idea_name: "AI Sports Betting Analytics Newsletter",
    usp: "AI-analyzed betting line movements, injury impact models, and value bet identification for serious sports bettors",
    difficulty: 3,
    launch_action: "H1:Odds API + injury feed. H2:Value bet model. H3:Beehiiv newsletter. H4:$39/mo subscription. H5:Landing page. H6:Post on r/sportsbook. H7:Twitter sports betting community.",
    marketing_script: "TWITTER: 'The line moved 2.5 points in 4 hours after the injury report. Here's what sharp money is doing with it.' REDDIT: 'I built an AI model that tracks line movements vs public money. Here's what it's showing for this weekend.'",
    scaling_roadmap: "W1:200 free subscribers. W2:$19/mo launch. W3:Raise to $39/mo. W4:Premium picks tier. M2:Affiliate partnerships. M3:2,000 subscribers = $78K/yr.",
  },
  {
    id: "M016", category: "Micro-Niche Content Engines",
    idea_name: "AI Drone Photography Business Content Engine",
    usp: "Generates location guides, social captions, and client proposals for drone photography businesses monthly",
    difficulty: 1,
    launch_action: "H1:Content template creation. H2:Claude content generator. H3:Canva social templates. H4:Delivery system. H5:$89/mo per operator. H6:Post in drone photography Facebook groups. H7:DM 30 drone photographers.",
    marketing_script: "INSTAGRAM: 'Drone photographers: stop spending 10 hours on content. I generate your full month of social posts and client proposals in 2 hours.' COLD DM: 'Hey [Name], I help drone photographers look professional online without spending hours on content. $89/month. Free sample?'",
    scaling_roadmap: "W1:5 free trials. W2:$49/mo launch. W3:Raise to $89/mo. W4:20 clients = $1,780 MRR. M2:Drone industry partnerships. M3:Certification content tier.",
  },
  {
    id: "M017", category: "Micro-Niche Content Engines",
    idea_name: "AI Medical Practice Marketing Automation",
    usp: "Generates HIPAA-compliant patient education content, Google posts, and appointment reminder sequences for clinics",
    difficulty: 3,
    launch_action: "H1:HIPAA compliance framework. H2:Claude content with compliance layer. H3:EHR integration research. H4:Delivery system. H5:$299/mo per practice. H6:Post on physician Facebook groups. H7:Email 20 practice managers.",
    marketing_script: "LINKEDIN: 'Medical practices that post 3x/week get 40% more new patient inquiries. The barrier is HIPAA-compliant content. I solved it.' COLD EMAIL: 'Subject: Your practice is invisible online. Here's a HIPAA-compliant fix.'",
    scaling_roadmap: "W1:3 practices free trial. W2:$199/mo launch. W3:$299/mo pricing. W4:EHR integrations. M2:Medical association partnerships. M3:Hospital network deal.",
  },
  {
    id: "M018", category: "Micro-Niche Content Engines",
    idea_name: "AI Trucking & Logistics Industry Newsletter",
    usp: "Weekly AI digest of fuel cost trends, FMCSA regulation changes, and load board pricing for owner-operators",
    difficulty: 2,
    launch_action: "H1:Trucking news feeds. H2:Regulation scraper. H3:Fuel price API. H4:Beehiiv + $29/mo. H5:Landing page. H6:Post on r/Truckers. H7:Email trucking associations.",
    marketing_script: "FACEBOOK: 'Diesel prices in [Region] are trending up 8 cents this week. Here's how to adjust your rate per mile before it hits.' REDDIT: 'FMCSA just changed the HOS rules. Here's what every owner-operator needs to know by next month.'",
    scaling_roadmap: "W1:500 free subscribers. W2:$19/mo launch. W3:Raise to $29/mo. W4:Load board affiliate. M2:Trucking association deals. M3:Fleet management tier.",
  },
  {
    id: "M019", category: "Micro-Niche Content Engines",
    idea_name: "AI Wedding Industry Business Intelligence",
    usp: "Monthly report for wedding vendors: pricing benchmarks, booking trend analysis, and contract template updates",
    difficulty: 2,
    launch_action: "H1:Wedding industry data sources. H2:Claude analysis. H3:Report template. H4:$49/mo subscription. H5:Landing page. H6:Post in wedding vendor Facebook groups. H7:Email 30 wedding photographers/planners.",
    marketing_script: "INSTAGRAM: 'Wedding photographers: prices in [City] went up 12% this year. Here's the data and what you should be charging.' COLD EMAIL: 'Subject: Are you undercharging? Here's the 2025 wedding vendor pricing benchmark for [City].'",
    scaling_roadmap: "W1:100 free subscribers. W2:$29/mo launch. W3:Raise to $49/mo. W4:City-specific tiers. M2:Wedding association partnerships. M3:Vendor platform licensing.",
  },
  {
    id: "M020", category: "Micro-Niche Content Engines",
    idea_name: "AI Personal Finance Content for Spanish Speakers",
    usp: "Weekly personal finance education content in Spanish — budgeting, investing, and credit building for US Latino community",
    difficulty: 1,
    launch_action: "H1:Spanish finance content research. H2:Claude Spanish content generator. H3:Beehiiv + Instagram setup. H4:$9/mo subscription. H5:Free guide lead magnet. H6:Post on Spanish Facebook finance groups. H7:Partner with Latino community orgs.",
    marketing_script: "INSTAGRAM: 'Tu crédito puede ser la diferencia entre una hipoteca al 5% y al 8%. Aquí te explico cómo subirlo 50 puntos en 6 meses.' FACEBOOK: 'Para los que llegaron sin saber nada de finanzas en USA — este es el guide que nadie te dio.'",
    scaling_roadmap: "W1:1,000 free subscribers. W2:$5/mo launch. W3:Raise to $9/mo. W4:Spanish bank affiliate. M2:Community org partnerships. M3:10,000 subs = $90K/yr.",
  },

  // ── CATEGORY 4: Real Estate & Finance AI (20 ideas) ───────────────────────
  {
    id: "R001", category: "Real Estate & Finance AI",
    idea_name: "AI Fix-and-Flip ROI Calculator & Deal Analyzer",
    usp: "Analyzes any address — ARV, repair estimates, holding costs, profit margin — in 60 seconds with AI comparables",
    difficulty: 3,
    launch_action: "H1:Property data API (Zillow/Attom). H2:Repair cost model. H3:ARV calculator. H4:Report dashboard. H5:$49/mo subscription. H6:Post on BiggerPockets. H7:DM 30 real estate investors.",
    marketing_script: "TWITTER: 'I analyzed 200 fix-and-flip deals with AI. Here are the 5 cost categories that kill the most profit margins.' REDDIT: 'Built a tool that calculates fix-and-flip ROI in 60 seconds. Here's how it works and a free analysis.'",
    scaling_roadmap: "W1:50 free analyses. W2:$29/mo launch. W3:Raise to $49/mo. W4:Contractor network add-on. M2:REIA club deals. M3:Hard money lender partnerships.",
  },
  {
    id: "R002", category: "Real Estate & Finance AI",
    idea_name: "AI Rental Property Cash Flow Optimizer",
    usp: "Analyzes rental properties for rent optimization, expense reduction, and refinancing opportunities monthly",
    difficulty: 3,
    launch_action: "H1:Property management API. H2:Cash flow model. H3:Optimization engine. H4:Dashboard. H5:$99/mo subscription. H6:Post on BiggerPockets. H7:DM landlords on Facebook groups.",
    marketing_script: "TWITTER: 'I analyzed a 12-unit rental portfolio and found $18K/year in missed optimization. Here's where the money was hiding.' COLD DM: 'Hi [Name], are you tracking your rental portfolio's true performance? Most landlords are leaving 10-15% on the table.'",
    scaling_roadmap: "W1:10 landlords free. W2:$59/mo launch. W3:Raise to $99/mo. W4:Property management integration. M2:REIA partnerships. M3:Property management company tier.",
  },
  {
    id: "R003", category: "Real Estate & Finance AI",
    idea_name: "AI Mortgage Rate Alert & Refinance Optimizer",
    usp: "Monitors rate movements and automatically notifies homeowners when refinancing would save $X/month",
    difficulty: 3,
    launch_action: "H1:Mortgage rate API. H2:User profile intake. H3:Savings calculator. H4:Alert system. H5:$19/mo or lender lead gen. H6:Post on r/personalfinance. H7:Partner with mortgage brokers.",
    marketing_script: "TWITTER: 'Rates dropped 0.4% this week. If you have a mortgage over $400K from 2022, here's exactly how much you could save.' REDDIT: 'Built a free alert that tells you when refinancing makes financial sense. Here's how it calculates the break-even.'",
    scaling_roadmap: "W1:1,000 free alerts. W2:$9/mo launch. W3:Lender lead gen model. W4:Credit union partnerships. M2:Financial advisor white-label. M3:Fintech partnership.",
  },
  {
    id: "R004", category: "Real Estate & Finance AI",
    idea_name: "AI Short-Term Rental Revenue Optimizer",
    usp: "Dynamic Airbnb pricing, competitor analysis, and listing optimization that increases STR revenue 20-35%",
    difficulty: 3,
    launch_action: "H1:AirDNA/Airbnb API. H2:Pricing algorithm. H3:Listing analyzer. H4:Recommendation engine. H5:$199/mo subscription. H6:Post on r/airbnb. H7:DM Airbnb hosts on Facebook.",
    marketing_script: "TWITTER: 'My Airbnb revenue went up 31% after implementing dynamic pricing. Here's the exact pricing strategy I use.' REDDIT: 'I analyzed 500 STR listings in my market. Here's what the top 10% do differently that drives 40% more revenue.'",
    scaling_roadmap: "W1:10 hosts free. W2:$99/mo launch. W3:Raise to $199/mo. W4:Property manager tier. M2:STR management company deals. M3:Multi-market expansion.",
  },
  {
    id: "R005", category: "Real Estate & Finance AI",
    idea_name: "AI Commercial Property Valuation Assistant",
    usp: "AI-powered CRE valuation using comparables, cap rates, and NOI analysis — produces appraisal-grade estimates in 30 min",
    difficulty: 4,
    launch_action: "H1:CoStar data integration. H2:Valuation model. H3:Report generator. H4:$199/report. H5:Landing page. H6:Post on CRE LinkedIn groups. H7:DM CRE brokers.",
    marketing_script: "LINKEDIN: 'Commercial appraisals cost $2,500-$5,000 and take 3 weeks. Our AI pre-valuation costs $199 and takes 30 minutes. Here's the accuracy comparison.' COLD EMAIL: 'Subject: Get a CRE valuation estimate before paying for a full appraisal.'",
    scaling_roadmap: "W1:10 free valuations. W2:$149/report launch. W3:$199 standard price. W4:$499 detailed tier. M2:CCIM member partnership. M3:Title company integration.",
  },
  {
    id: "R006", category: "Real Estate & Finance AI",
    idea_name: "AI Tax Lien & Auction Property Analyzer",
    usp: "Identifies profitable tax lien and foreclosure auction properties, calculates ROI, and flags risks automatically",
    difficulty: 4,
    launch_action: "H1:County auction data scraping. H2:Property value estimation. H3:Risk scoring. H4:Opportunity list dashboard. H5:$79/mo subscription. H6:Post on tax lien investing forums. H7:DM investors on BiggerPockets.",
    marketing_script: "TWITTER: 'Tax lien investing is one of the most overlooked real estate strategies. Here's how AI finds the good ones and avoids the disasters.' REDDIT: 'I built a tool that analyzes every tax lien auction in [State]. Here's how it works.'",
    scaling_roadmap: "W1:50 free analyses. W2:$49/mo launch. W3:Raise to $79/mo. W4:Multi-state expansion. M2:REIA chapter partnerships. M3:Fund manager licensing.",
  },
  {
    id: "R007", category: "Real Estate & Finance AI",
    idea_name: "AI Portfolio Rebalancing Alert System",
    usp: "Monitors investment portfolios, sends rebalancing alerts based on drift thresholds and tax-loss harvesting opportunities",
    difficulty: 3,
    launch_action: "H1:Brokerage API (Alpaca/IBKR). H2:Drift calculation model. H3:Tax-loss harvesting logic. H4:Alert system. H5:$29/mo subscription. H6:Post on r/personalfinance. H7:DM fee-only advisors.",
    marketing_script: "TWITTER: 'Your portfolio has drifted 8% from your target allocation. Most investors don't notice until it's too late. Here's an automated fix.' REDDIT: 'Built an AI that monitors your portfolio and tells you exactly when and how to rebalance. Here's the logic.'",
    scaling_roadmap: "W1:500 free users. W2:$15/mo launch. W3:Raise to $29/mo. W4:Financial advisor white-label. M2:Fintech partnership. M3:RIA firm licensing.",
  },
  {
    id: "R008", category: "Real Estate & Finance AI",
    idea_name: "AI Estate Planning Document Drafter",
    usp: "Generates draft will, trust, and power of attorney documents from intake form — saves $2,000-$5,000 in attorney fees",
    difficulty: 4,
    launch_action: "H1:Legal template library. H2:State-specific rules. H3:Claude document generator. H4:Attorney review workflow. H5:$299/document set. H6:Post on r/personalfinance. H7:Partner with estate attorneys.",
    marketing_script: "REDDIT: '60% of Americans have no will. Here's why AI estate planning finally makes it accessible — and what you still need an attorney for.' TWITTER: 'Estate attorneys charge $2,000-$5,000. Our AI drafts the documents for $299 — attorney still reviews, but 80% cheaper.'",
    scaling_roadmap: "W1:20 free consultations. W2:$199/launch price. W3:$299 standard. W4:Attorney review marketplace. M2:Financial planner partnerships. M3:HR benefits integration.",
  },
  {
    id: "R009", category: "Real Estate & Finance AI",
    idea_name: "AI Business Valuation Tool for M&A",
    usp: "Generates a comprehensive business valuation (DCF, comparables, asset-based) for SMB owners considering a sale",
    difficulty: 4,
    launch_action: "H1:Valuation methodology framework. H2:Financial input model. H3:Claude analysis engine. H4:Report template. H5:$497/valuation. H6:Post on EO/YPO forums. H7:DM M&A advisors.",
    marketing_script: "LINKEDIN: 'Most business owners have no idea what their company is worth until they want to sell. By then it's too late to optimize. Here's a 30-minute valuation exercise.' COLD EMAIL: 'Subject: Do you know what your business is worth today?'",
    scaling_roadmap: "W1:5 free valuations. W2:$297 launch price. W3:$497 standard. W4:$997 with strategy session. M2:Business broker partnerships. M3:PE firm deal flow.",
  },
  {
    id: "R010", category: "Real Estate & Finance AI",
    idea_name: "AI First-Time Homebuyer Readiness Coach",
    usp: "Personalized 90-day financial readiness plan for first-time buyers — credit, savings, DTI optimization — fully automated",
    difficulty: 2,
    launch_action: "H1:Financial intake assessment. H2:Personalized plan generator. H3:Progress tracking dashboard. H4:Email drip sequence. H5:$79/mo subscription. H6:Post on r/FirstTimeHomeBuyer. H7:Partner with mortgage brokers.",
    marketing_script: "REDDIT: 'I wanted to buy a home in 12 months. This AI 90-day plan told me exactly what to fix and in what order. 8 months later, I closed.' TWITTER: 'Most first-time buyers fail pre-approval because of 3 fixable things. Here's an AI tool that tells you exactly what to work on.'",
    scaling_roadmap: "W1:200 free users. W2:$39/mo launch. W3:$79/mo pricing. W4:Mortgage lead gen model. M2:NACA/HUD partnerships. M3:Realtor referral program.",
  },
  {
    id: "R011", category: "Real Estate & Finance AI",
    idea_name: "AI Opportunity Zone Investment Analyzer",
    usp: "Identifies and scores Opportunity Zone investments by tax benefit, appreciation potential, and risk factors",
    difficulty: 4,
    launch_action: "H1:OZ data compilation. H2:Tax benefit calculator. H3:Appreciation model. H4:Risk scoring. H5:$299/mo subscription. H6:Post on tax strategy forums. H7:DM CPAs and wealth managers.",
    marketing_script: "LINKEDIN: 'Opportunity Zones offer the largest legal tax deferral available to US investors. Most advisors don't understand them. Here's what the data shows.' COLD EMAIL: 'Subject: Your client's capital gains could qualify for Opportunity Zone deferral. Here's the analysis.'",
    scaling_roadmap: "W1:10 free analyses. W2:$149/mo launch. W3:$299/mo pricing. W4:CPA white-label. M2:Family office partnership. M3:Fund manager licensing.",
  },
  {
    id: "R012", category: "Real Estate & Finance AI",
    idea_name: "AI Debt Payoff Optimizer & Financial Freedom Planner",
    usp: "Builds personalized debt elimination strategy (avalanche/snowball/hybrid) with visual payoff timeline and savings calculator",
    difficulty: 2,
    launch_action: "H1:Debt input calculator. H2:Strategy optimizer. H3:Visual timeline builder. H4:Progress tracker. H5:$19/mo subscription. H6:Post on r/debtfree. H7:Partner with credit counselors.",
    marketing_script: "REDDIT: 'I had $67K in debt. This AI built me a payoff plan that saved $14K in interest vs my old approach. Here's the exact strategy.' TWITTER: 'Most people pick the wrong debt payoff strategy and waste thousands in interest. Here's how AI finds your optimal approach.'",
    scaling_roadmap: "W1:1,000 free plans. W2:$9/mo launch. W3:$19/mo pricing. W4:Credit union partnerships. M2:Dave Ramsey community. M3:Financial advisor integration.",
  },
  {
    id: "R013", category: "Real Estate & Finance AI",
    idea_name: "AI HELOC Optimization & Cash-Out Strategy Advisor",
    usp: "Analyzes home equity position and models optimal HELOC vs cash-out refinance scenarios with 10-year cost projections",
    difficulty: 3,
    launch_action: "H1:Equity calculation model. H2:HELOC vs refi comparison. H3:Scenario modeling. H4:Report generator. H5:$49 per analysis. H6:Post on r/personalfinance. H7:Partner with mortgage brokers.",
    marketing_script: "TWITTER: 'Homeowners are sitting on record equity. Most don't know whether a HELOC or cash-out refi is better for them. Here's how to know in 5 minutes.' REDDIT: 'I built a free tool that models your HELOC vs refi options with full cost projections. Here's how to use it.'",
    scaling_roadmap: "W1:500 free analyses. W2:$29/analysis launch. W3:$49 standard. W4:Mortgage broker lead gen. M2:Real estate attorney referrals. M3:Fintech integration.",
  },
  {
    id: "R014", category: "Real Estate & Finance AI",
    idea_name: "AI Insurance Coverage Gap Analyzer",
    usp: "Analyzes existing insurance policies and identifies coverage gaps, overlaps, and $X over-insurance using AI",
    difficulty: 3,
    launch_action: "H1:Policy intake system. H2:Coverage analysis model. H3:Gap identification engine. H4:Report generator. H5:$99/analysis. H6:Post on personal finance forums. H7:Partner with independent brokers.",
    marketing_script: "REDDIT: 'I uploaded my 4 insurance policies to AI. It found $2,400/year in overlapping coverage I was paying for twice.' TWITTER: 'Most families are either under-insured in critical areas or over-insured in others. Here's how to find out in 30 minutes.'",
    scaling_roadmap: "W1:100 free analyses. W2:$49 launch. W3:$99 standard. W4:Broker white-label. M2:Financial planner partnerships. M3:HR benefits integration.",
  },
  {
    id: "R015", category: "Real Estate & Finance AI",
    idea_name: "AI Startup Equity & Cap Table Advisor",
    usp: "Models fundraising scenarios, dilution impact, and exit scenarios to help founders negotiate better term sheets",
    difficulty: 4,
    launch_action: "H1:Cap table model. H2:Dilution calculator. H3:Exit scenario engine. H4:Term sheet analyzer. H5:$197/analysis. H6:Post on Hacker News. H7:DM early-stage founders.",
    marketing_script: "TWITTER: 'Most founders accept the first term sheet without modeling dilution scenarios. Here's a free tool that shows you what different terms actually mean for your exit.' REDDIT: 'I built a cap table modeler for founders. Here's what I learned analyzing 50 term sheets.'",
    scaling_roadmap: "W1:50 free models. W2:$97 launch. W3:$197 standard. W4:YC/Techstars partnerships. M2:Angel investor tools. M3:VC portfolio service.",
  },
  {
    id: "R016", category: "Real Estate & Finance AI",
    idea_name: "AI Multi-Family Property Underwriting Tool",
    usp: "Full multifamily underwriting in 20 minutes — T12, rent roll analysis, value-add potential, and debt coverage ratios",
    difficulty: 4,
    launch_action: "H1:Underwriting model. H2:T12 parser. H3:Value-add calculator. H4:Report generator. H5:$299/mo subscription. H6:Post on BiggerPockets multifamily. H7:DM multifamily syndicators.",
    marketing_script: "TWITTER: 'I underwrote 3 multifamily deals this week. Used to take 6 hours each. Now 20 minutes. Here's the tool.' LINKEDIN: 'Multifamily investors: underwriting shouldn't take 6 hours. Here's a system that does it in 20 minutes with higher accuracy.'",
    scaling_roadmap: "W1:10 free underwritings. W2:$149/mo launch. W3:$299/mo pricing. W4:Syndication package tier. M2:Multifamily coaching community. M3:Broker CRM integration.",
  },
  {
    id: "R017", category: "Real Estate & Finance AI",
    idea_name: "AI Credit Score Optimization Service",
    usp: "AI-personalized credit improvement plan with specific tradeline recommendations, dispute templates, and 90-day timeline",
    difficulty: 2,
    launch_action: "H1:Credit factor model. H2:Personalized plan generator. H3:Dispute template library. H4:Progress tracker. H5:$99/mo subscription. H6:Post on r/CRedit. H7:Partner with mortgage brokers.",
    marketing_script: "REDDIT: 'I went from 620 to 740 in 4 months following an AI credit plan. Here's every step in order.' TWITTER: 'Credit bureaus have predictable patterns. AI can find the fastest path to 740+ for almost anyone. Here's how.'",
    scaling_roadmap: "W1:200 free plans. W2:$49/mo launch. W3:$99/mo pricing. W4:Tradeline affiliate. M2:Mortgage broker partnerships. M3:Credit union licensing.",
  },
  {
    id: "R018", category: "Real Estate & Finance AI",
    idea_name: "AI Land Entitlement & Development Feasibility Tool",
    usp: "Analyzes raw land parcels for zoning potential, entitlement risk, and development ROI before costly feasibility studies",
    difficulty: 4,
    launch_action: "H1:Zoning database integration. H2:Entitlement risk model. H3:Development cost estimates. H4:Report generator. H5:$299/analysis. H6:Post on land developer forums. H7:DM land brokers.",
    marketing_script: "LINKEDIN: 'I analyzed 40 land parcels last year. The ones that lost money all had entitlement risks that were visible in the data beforehand.' COLD EMAIL: 'Subject: Pre-entitlement AI analysis for [Parcel Address] — here's what we found.'",
    scaling_roadmap: "W1:10 free analyses. W2:$199 launch. W3:$299 standard. W4:Developer subscription tier. M2:Title company partnership. M3:Municipal planning tool.",
  },
  {
    id: "R019", category: "Real Estate & Finance AI",
    idea_name: "AI BRRRR Strategy Calculator & Deal Finder",
    usp: "Full BRRRR deal analysis — purchase, rehab, refinance, rent, repeat — with market-specific comparables and cash-on-cash return",
    difficulty: 3,
    launch_action: "H1:BRRRR calculation model. H2:ARV estimator. H3:Refinance scenario tool. H4:Deal score dashboard. H5:$49/mo subscription. H6:Post on BiggerPockets. H7:DM BRRRR investors.",
    marketing_script: "TWITTER: 'Most BRRRR investors fail because they miscalculate the refinance step. Here's an AI tool that models the entire cycle before you buy.' REDDIT: 'I analyzed 12 BRRRR deals. Here's the #1 number most investors get wrong (and how to calculate it correctly).'",
    scaling_roadmap: "W1:50 free analyses. W2:$29/mo launch. W3:$49/mo pricing. W4:Lender partnerships. M2:REIA chapter licensing. M3:Coaching program integration.",
  },
  {
    id: "R020", category: "Real Estate & Finance AI",
    idea_name: "AI Tax Strategy Optimizer for Real Estate Investors",
    usp: "Identifies depreciation strategies, cost segregation opportunities, and 1031 exchange options to minimize RE investor taxes",
    difficulty: 4,
    launch_action: "H1:Tax strategy framework. H2:Depreciation calculator. H3:1031 exchange modeler. H4:Strategy report. H5:$297/report. H6:Post on BiggerPockets tax forum. H7:DM CPAs in RE.",
    marketing_script: "TWITTER: 'Real estate investors leave $20,000-$100,000/year in taxes on the table. Here are the 4 strategies that fix it.' LINKEDIN: 'A client saved $47,000 in taxes last year using cost segregation. Most CPAs don't proactively recommend it. Here's why.'",
    scaling_roadmap: "W1:10 free analyses. W2:$197 launch. W3:$297 standard. W4:CPA partnership program. M2:Real estate investing courses. M3:CPA firm licensing.",
  },

  // ── CATEGORY 5: Personalized AI Utilities (20 ideas) ──────────────────────
  {
    id: "P001", category: "Personalized AI Utilities",
    idea_name: "AI Career Pivot Coach for Tech Layoffs",
    usp: "Personalized 90-day plan to transition laid-off tech workers into high-demand adjacent roles — resume + skill gap + job strategy",
    difficulty: 2,
    launch_action: "H1:Career assessment intake. H2:Role matching model. H3:Skill gap analyzer. H4:Claude plan generator. H5:$199 one-time or $79/mo. H6:Post on r/layoffs. H7:DM laid-off workers on LinkedIn.",
    marketing_script: "LINKEDIN: 'Got laid off from [Company]? Here's a 90-day career pivot framework that 47 engineers have used to land better-paying jobs.' REDDIT: 'I was laid off from FAANG and used AI to map my pivot to a less competitive, higher-paying niche. Here's the full plan.'",
    scaling_roadmap: "W1:20 free plans. W2:$99 launch price. W3:$199 standard. W4:Resume package add-on. M2:Career coaching community. M3:Bootcamp partnership.",
  },
  {
    id: "P002", category: "Personalized AI Utilities",
    idea_name: "AI Executive Coaching Chat for Mid-Level Managers",
    usp: "AI executive coach available 24/7 — answers leadership dilemmas, communication challenges, and promotion strategy",
    difficulty: 2,
    launch_action: "H1:Executive coaching framework. H2:Claude system prompt. H3:Chat interface. H4:Memory system. H5:$79/mo subscription. H6:Post on r/managers. H7:DM LinkedIn HR professionals.",
    marketing_script: "LINKEDIN: 'Executive coaches charge $500/hr. Most managers can't afford it. I built an AI version that answers leadership questions 24/7 for $79/month.' REDDIT: 'I asked an AI executive coach how to handle a difficult skip-level situation. Here's what it said.'",
    scaling_roadmap: "W1:50 free trial users. W2:$39/mo launch. W3:$79/mo pricing. W4:Team plans. M2:L&D department deals. M3:Corporate licensing.",
  },
  {
    id: "P003", category: "Personalized AI Utilities",
    idea_name: "AI Chronic Illness Management Companion",
    usp: "Tracks symptoms, medications, and triggers for chronic conditions — generates doctor visit summaries and pattern reports",
    difficulty: 3,
    launch_action: "H1:Health tracking framework. H2:Symptom pattern analyzer. H3:Doctor visit report generator. H4:Mobile-friendly UI. H5:$29/mo subscription. H6:Post on condition-specific subreddits. H7:Partner with patient advocacy groups.",
    marketing_script: "REDDIT: 'I spent 3 years explaining my symptoms to every new doctor. This AI builds the summary for me in 5 minutes.' TWITTER: 'Chronic illness patients spend 40+ hours/year preparing for doctor visits. This AI tool cuts that to 10 minutes.'",
    scaling_roadmap: "W1:100 free users. W2:$19/mo launch. W3:$29/mo pricing. W4:Condition-specific versions. M2:Patient advocacy partnerships. M3:EHR integration.",
  },
  {
    id: "P004", category: "Personalized AI Utilities",
    idea_name: "AI Divorce Financial Planning Tool",
    usp: "Models asset division scenarios, support calculations, and post-divorce financial forecasts — reduces attorney dependency",
    difficulty: 4,
    launch_action: "H1:Divorce financial framework. H2:Asset division calculator. H3:Support modeling. H4:Report generator. H5:$199/report. H6:Post on divorce support forums. H7:Partner with mediators.",
    marketing_script: "REDDIT: 'I was blindsided by the financial side of divorce. This tool models every scenario so you walk into attorney meetings informed.' TWITTER: 'Divorce attorneys charge $300/hr to explain financial scenarios. This AI models them in 30 minutes for $199.'",
    scaling_roadmap: "W1:20 free analyses. W2:$99 launch. W3:$199 standard. W4:Attorney referral network. M2:Mediator partnerships. M3:Financial advisor integration.",
  },
  {
    id: "P005", category: "Personalized AI Utilities",
    idea_name: "AI Immigration Journey Planner",
    usp: "Personalized visa pathway analysis, document checklist, and timeline planner for immigrants — reduces attorney dependency",
    difficulty: 3,
    launch_action: "H1:Immigration pathway database. H2:Eligibility analyzer. H3:Document checklist generator. H4:Timeline builder. H5:$97/analysis. H6:Post on immigration subreddits. H7:Partner with ESL schools.",
    marketing_script: "REDDIT: 'Immigration attorneys charge $3,000+ for the same information that's public knowledge. Here's a tool that maps your path clearly.' TWITTER: 'The US visa system has 185+ visa categories. AI can map your specific situation to the right pathway in minutes.'",
    scaling_roadmap: "W1:50 free analyses. W2:$49 launch. W3:$97 standard. W4:Attorney referral marketplace. M2:International student partnerships. M3:Corporate immigration tier.",
  },
  {
    id: "P006", category: "Personalized AI Utilities",
    idea_name: "AI Negotiation Coach (Salary, Real Estate, Deals)",
    usp: "Analyzes market data and coaching AI for salary, real estate, and B2B deal negotiations — scripted and simulated",
    difficulty: 2,
    launch_action: "H1:Negotiation framework. H2:Market data integration. H3:Role-play simulation. H4:Script generator. H5:$49/mo subscription. H6:Post on r/negotiation. H7:DM career coaches.",
    marketing_script: "REDDIT: 'I practiced salary negotiation with AI for 2 hours before my interview. Got $22K more than the original offer.' TWITTER: 'Most people accept the first offer because they don't know how to negotiate. AI can practice with you until you're ready.'",
    scaling_roadmap: "W1:200 free sessions. W2:$29/mo launch. W3:$49/mo pricing. W4:Specific verticals. M2:Career coaching partnerships. M3:Corporate training tier.",
  },
  {
    id: "P007", category: "Personalized AI Utilities",
    idea_name: "AI Language Learning for Business Professionals",
    usp: "Teaches business-specific language (negotiations, presentations, emails) in target language — 10x faster than Duolingo",
    difficulty: 3,
    launch_action: "H1:Business vocabulary framework. H2:Conversational AI system. H3:Scenario library. H4:Progress tracker. H5:$39/mo subscription. H6:Post on r/languagelearning. H7:DM international business professionals.",
    marketing_script: "REDDIT: 'I learned business Spanish in 6 months using an AI that only teaches business vocabulary. Here's what I focused on.' TWITTER: 'Generic language apps teach you how to order coffee. Business professionals need negotiation language. Here's a better approach.'",
    scaling_roadmap: "W1:100 free users. W2:$19/mo launch. W3:$39/mo pricing. W4:Corporate team plans. M2:International trade associations. M3:MBA program partnership.",
  },
  {
    id: "P008", category: "Personalized AI Utilities",
    idea_name: "AI Retirement Readiness Assessment & Action Plan",
    usp: "Analyzes current financial position, social security optimization, and withdrawal sequence to build a personalized retirement plan",
    difficulty: 3,
    launch_action: "H1:Retirement calculation model. H2:SS optimization tool. H3:Withdrawal sequence planner. H4:Action plan generator. H5:$99/assessment. H6:Post on r/retirement. H7:DM fee-only planners.",
    marketing_script: "REDDIT: 'I was 10 years from retirement and had no idea if I'd have enough. This AI built me a plan in 30 minutes. Here's what it showed.' TWITTER: 'The sequence of Social Security filing and retirement account withdrawals can mean $200,000+ difference. Here's how to model it.'",
    scaling_roadmap: "W1:100 free assessments. W2:$49 launch. W3:$99 standard. W4:Financial advisor white-label. M2:AARP community partnership. M3:Insurance integration.",
  },
  {
    id: "P009", category: "Personalized AI Utilities",
    idea_name: "AI Personal Brand Audit & Growth Blueprint",
    usp: "Analyzes your online presence across platforms, identifies gaps, and builds a 90-day personal brand growth plan",
    difficulty: 2,
    launch_action: "H1:Brand audit framework. H2:Platform scraper. H3:Gap analysis engine. H4:Plan generator. H5:$149/audit. H6:Post on creator Twitter. H7:DM freelancers and consultants.",
    marketing_script: "TWITTER: 'Your LinkedIn looks like a resume, not a brand. Here's how AI analyzed my profile and the changes that 4x'd my inbound.' COLD DM: 'Hey [Name], I ran a quick audit on your personal brand. You're missing 3 things that would double your inbound leads.'",
    scaling_roadmap: "W1:20 free audits. W2:$79 launch. W3:$149 standard. W4:Monthly brand monitoring. M2:Business coaching community. M3:Corporate executive tier.",
  },
  {
    id: "P010", category: "Personalized AI Utilities",
    idea_name: "AI Academic Research Assistant for PhD Students",
    usp: "Summarizes papers, identifies research gaps, builds literature review outlines, and suggests methodology improvements",
    difficulty: 3,
    launch_action: "H1:Research paper ingestion. H2:Claude analysis prompts. H3:Literature review builder. H4:Gap identification engine. H5:$29/mo subscription. H6:Post on r/GradSchool. H7:Email university departments.",
    marketing_script: "REDDIT: 'Writing my lit review used to take 3 months. Using AI research assistants, I did it in 3 weeks. Here's my exact workflow.' TWITTER: 'PhD students spend 60% of their time on tasks AI can do. Here's the research workflow that got me to dissertation in 18 months.'",
    scaling_roadmap: "W1:200 free users. W2:$19/mo launch. W3:$29/mo pricing. W4:Institution licensing. M2:University library partnerships. M3:Research lab enterprise tier.",
  },
  {
    id: "P011", category: "Personalized AI Utilities",
    idea_name: "AI Meal Plan & Grocery Optimizer for Health Goals",
    usp: "Builds weekly meal plans based on health goals, food preferences, and local grocery prices — optimizes for nutrition + cost",
    difficulty: 2,
    launch_action: "H1:Nutrition database. H2:Goal-based meal planner. H3:Grocery price API. H4:Shopping list generator. H5:$19/mo subscription. H6:Post on r/EatCheapAndHealthy. H7:Partner with gym owners.",
    marketing_script: "REDDIT: 'I cut my grocery bill from $600 to $380/month while hitting my protein goals. Here's the AI meal planning system I use.' TWITTER: 'Nutrition apps tell you what to eat. This one tells you what to eat AND finds the cheapest local prices for the ingredients.'",
    scaling_roadmap: "W1:500 free plans. W2:$9/mo launch. W3:$19/mo pricing. W4:Grocery store partnerships. M2:Gym membership bundle. M3:Corporate wellness tier.",
  },
  {
    id: "P012", category: "Personalized AI Utilities",
    idea_name: "AI ADHD Productivity Coach",
    usp: "Builds custom ADHD-friendly task systems, time blocking, and accountability workflows — not generic productivity advice",
    difficulty: 2,
    launch_action: "H1:ADHD productivity framework. H2:Personalization assessment. H3:Task system generator. H4:Daily check-in system. H5:$49/mo subscription. H6:Post on r/ADHD. H7:DM ADHD coaches.",
    marketing_script: "REDDIT: 'Generic productivity systems don't work for ADHD brains. Here's why and what actually does (AI-personalized system).' TWITTER: 'I spent 20 years trying productivity systems that didn't work. Then I built one specifically for how my ADHD brain works.'",
    scaling_roadmap: "W1:100 free users. W2:$29/mo launch. W3:$49/mo pricing. W4:ADHD coach partnerships. M2:Therapy practice integration. M3:School/university tier.",
  },
  {
    id: "P013", category: "Personalized AI Utilities",
    idea_name: "AI Wedding Planning Coordinator",
    usp: "Full AI wedding planner — vendor research, budget tracking, timeline management, and decision support for every choice",
    difficulty: 2,
    launch_action: "H1:Wedding planning framework. H2:Vendor database. H3:Budget tracker. H4:Timeline generator. H5:$79/mo or $299 full service. H6:Post on r/weddingplanning. H7:Partner with wedding venues.",
    marketing_script: "REDDIT: 'I planned my entire wedding using AI and saved $12,000 vs friends who used a planner. Here's every tool and trick.' TWITTER: 'Wedding planners cost $3,000-$8,000. AI can do 80% of what they do for $299. Here's what it covers.'",
    scaling_roadmap: "W1:50 free trials. W2:$49/mo launch. W3:$79/mo pricing. W4:Vendor affiliate revenue. M2:Wedding venue partnerships. M3:Full planning package at $499.",
  },
  {
    id: "P014", category: "Personalized AI Utilities",
    idea_name: "AI College Application Essay Coach",
    usp: "Personalized essay coaching, story identification, and draft improvement for college applications — at 10% of tutor cost",
    difficulty: 2,
    launch_action: "H1:Essay framework. H2:Story mining interview. H3:Draft feedback engine. H4:Revision workflow. H5:$199/application. H6:Post on r/ApplyingToCollege. H7:DM high school counselors.",
    marketing_script: "REDDIT: 'My kid got into her top 3 schools. Here's the AI essay coaching system we used (and what made the difference).' TWITTER: 'College essay coaches charge $2,000-$5,000. AI coaching covers 90% of the value for $199. Here's exactly what you get.'",
    scaling_roadmap: "W1:20 free consultations. W2:$99 launch. W3:$199 standard. W4:School counselor partnerships. M2:Test prep company bundling. M3:International student tier.",
  },
  {
    id: "P015", category: "Personalized AI Utilities",
    idea_name: "AI Small Business Tax Planning Tool",
    usp: "Year-round tax strategy for solopreneurs — S-Corp election timing, deduction maximization, and quarterly estimate calculator",
    difficulty: 3,
    launch_action: "H1:Tax planning framework. H2:Entity optimization model. H3:Deduction finder. H4:Quarterly estimate tool. H5:$149/mo subscription. H6:Post on r/smallbusiness. H7:Partner with bookkeepers.",
    marketing_script: "TWITTER: 'Most solopreneurs overpay taxes by $5,000-$30,000 per year. Here are the 5 strategies they're missing.' REDDIT: 'I saved $14,000 in taxes this year by timing my S-Corp election correctly. Here's the AI tool that showed me when to do it.'",
    scaling_roadmap: "W1:50 free analyses. W2:$79/mo launch. W3:$149/mo pricing. W4:Bookkeeper partnerships. M2:Accounting software integration. M3:CPE credit partnership.",
  },
  {
    id: "P016", category: "Personalized AI Utilities",
    idea_name: "AI Home Renovation ROI Planner",
    usp: "Analyzes which home improvements add the most resale value in your specific market, with cost estimates and contractor guides",
    difficulty: 2,
    launch_action: "H1:Renovation ROI database. H2:Market-specific analysis. H3:Cost estimator. H4:Priority ranking system. H5:$49/report. H6:Post on r/HomeImprovement. H7:Partner with real estate agents.",
    marketing_script: "REDDIT: 'I got 3 renovation quotes. AI told me which projects would actually add value. The contractors were wrong about 2 of them.' TWITTER: 'Not all home renovations are equal. AI analysis of 10,000 home sales shows which $10K improvement returns the most at resale.'",
    scaling_roadmap: "W1:100 free analyses. W2:$29/report launch. W3:$49 standard. W4:Contractor marketplace. M2:Real estate agent referral. M3:Home warranty partnership.",
  },
  {
    id: "P017", category: "Personalized AI Utilities",
    idea_name: "AI Freelancer Rate & Contract Optimizer",
    usp: "Analyzes market rates, contract terms, and scope creep patterns to help freelancers charge 30% more and avoid bad clients",
    difficulty: 2,
    launch_action: "H1:Rate database compilation. H2:Contract risk analyzer. H3:Rate recommendation engine. H4:Proposal generator. H5:$39/mo subscription. H6:Post on r/freelance. H7:DM Upwork top freelancers.",
    marketing_script: "REDDIT: 'I raised my freelance rate from $75 to $115/hr after running an AI market rate analysis. Here's what it found and how I justified the increase.' TWITTER: 'Freelancers leave $20K-$50K/year on the table by undercharging. Here's how to know your real market rate.'",
    scaling_roadmap: "W1:500 free analyses. W2:$19/mo launch. W3:$39/mo pricing. W4:Contract template library. M2:Freelancer community partnerships. M3:Agency tiered plans.",
  },
  {
    id: "P018", category: "Personalized AI Utilities",
    idea_name: "AI Medical Bill Negotiation Assistant",
    usp: "Analyzes medical bills for errors, overcharges, and negotiation opportunities — average savings of $800-$3,000 per bill",
    difficulty: 3,
    launch_action: "H1:Medical billing code database. H2:Error detection model. H3:Negotiation script generator. H4:Appeal letter builder. H5:$99/bill or 15% of savings. H6:Post on r/personalfinance. H7:Post on patient forums.",
    marketing_script: "REDDIT: 'I had a $14,000 hospital bill. AI found 3 billing errors and wrote my appeal. Final bill: $4,800. Here's exactly what I said.' TWITTER: 'Medical billing errors affect 80% of hospital bills. Most people just pay. Here's how to fight back using AI.'",
    scaling_roadmap: "W1:20 free reviews. W2:$49 launch. W3:$99 standard. W4:Success-fee model. M2:Patient advocate partnerships. M3:Health insurance broker tie-in.",
  },
  {
    id: "P019", category: "Personalized AI Utilities",
    idea_name: "AI Relationship Communication Coach",
    usp: "AI coach for navigating difficult conversations, conflict resolution, and communication pattern improvement in relationships",
    difficulty: 2,
    launch_action: "H1:Communication framework. H2:Scenario library. H3:Response coach. H4:Script generator. H5:$39/mo subscription. H6:Post on r/relationships. H7:Partner with therapists.",
    marketing_script: "REDDIT: 'I used AI to prepare for a difficult conversation with my partner. It changed how I approached it completely. Here's how.' TWITTER: 'Most relationship conflicts come from poor communication patterns, not incompatibility. AI can identify yours in 10 minutes.'",
    scaling_roadmap: "W1:200 free sessions. W2:$19/mo launch. W3:$39/mo pricing. W4:Couples tier. M2:Therapist referral network. M3:Corporate conflict resolution tier.",
  },
  {
    id: "P020", category: "Personalized AI Utilities",
    idea_name: "AI Productivity System Builder for Entrepreneurs",
    usp: "Custom-built productivity OS in Notion/Obsidian based on your specific role, goals, and work style — not a template",
    difficulty: 2,
    launch_action: "H1:Productivity assessment. H2:System design framework. H3:Notion template builder. H4:Delivery system. H5:$297 one-time. H6:Post on r/Notion. H7:DM entrepreneurs on Twitter.",
    marketing_script: "TWITTER: 'I built custom Notion productivity systems for 50 entrepreneurs. Here are the 5 elements every high-performer's system has.' COLD DM: 'Hey [Name], I built you a productivity system based on how you actually work — not a generic template. Want to see it?'",
    scaling_roadmap: "W1:5 free builds. W2:$147 launch. W3:$297 standard. W4:Maintenance retainer. M2:Productivity community deals. M3:Corporate team systems.",
  },
];

// ─── SHEET SETUP ──────────────────────────────────────────────────────────────
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("Starting Execution OS setup...");

  setupMasterDB(ss);
  setupUserInputs(ss);
  setupActiveRoadmap(ss);
  setupAnalytics(ss);

  // Set Master_DB as active
  ss.setActiveSheet(ss.getSheetByName(CONFIG.SHEETS.MASTER_DB));
  Logger.log("✅ Execution OS setup complete! All sheets created with 100 ideas.");
  SpreadsheetApp.getUi().alert("✅ Setup Complete!\n\nAll 4 sheets created:\n• Master_DB (100 ideas)\n• User_Inputs\n• Active_Roadmap\n• Analytics_Data\n\nYour Execution OS is ready.");
}

function setupMasterDB(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.MASTER_DB);
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet(CONFIG.SHEETS.MASTER_DB);

  // Headers
  const headers = ["ID", "Category", "Idea Name", "USP", "Difficulty (1-5)", "7H Launch Action Plan", "24H Marketing Script", "30D Scaling Roadmap", "Confidence Score", "Last Updated"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0A0A0B").setFontColor("#007AFF").setFontWeight("bold").setFontSize(11);
  sheet.setFrozenRows(1);

  // Set column widths
  const widths = [60, 160, 220, 300, 90, 350, 350, 350, 100, 130];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Populate ideas
  const rows = MASTER_IDEAS.map(idea => [
    idea.id,
    idea.category,
    idea.idea_name,
    idea.usp,
    idea.difficulty,
    idea.launch_action,
    idea.marketing_script,
    idea.scaling_roadmap,
    "", // Confidence score populated by filterTop20()
    new Date().toLocaleDateString(),
  ]);

  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

  // Alternate row colors
  for (let i = 0; i < rows.length; i++) {
    const bg = i % 2 === 0 ? "#0F0F12" : "#111116";
    sheet.getRange(i + 2, 1, 1, headers.length).setBackground(bg).setFontColor("#C8C8D0");
  }

  // Category color coding
  const catColors = {
    "B2B SaaS/Automation": "#1a2a3a",
    "High-Ticket Digital Services": "#1a2a1a",
    "Micro-Niche Content Engines": "#2a1a2a",
    "Real Estate & Finance AI": "#2a2a1a",
    "Personalized AI Utilities": "#1a2a2a",
  };

  for (let i = 0; i < rows.length; i++) {
    const cat = rows[i][1];
    if (catColors[cat]) {
      sheet.getRange(i + 2, 2, 1, 1).setBackground(catColors[cat]);
    }
  }

  // Wrap text in action columns
  sheet.getRange(2, 6, rows.length, 3).setWrap(true).setVerticalAlignment("top");

  Logger.log(`✅ Master_DB populated with ${rows.length} ideas`);
}

function setupUserInputs(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.USER_INPUTS);
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet(CONFIG.SHEETS.USER_INPUTS);

  const headers = ["Timestamp", "Session ID", "Skillset", "Budget ($)", "Time Available (hrs/week)", "Niche Interest", "Revenue Goal ($/mo)", "Experience Level", "Top 20 Results JSON", "Selected Idea ID", "Selected Idea Name"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setBackground("#0A0A0B").setFontColor("#007AFF").setFontWeight("bold");

  // Column widths
  [130, 120, 200, 80, 120, 200, 120, 120, 400, 80, 200].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.setFrozenRows(1);

  Logger.log("✅ User_Inputs sheet created");
}

function setupActiveRoadmap(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.ACTIVE_ROADMAP);
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet(CONFIG.SHEETS.ACTIVE_ROADMAP);

  // Title area
  sheet.getRange("A1:H1").merge().setValue("🚀 ACTIVE ROADMAP — EXECUTION OS").setBackground("#007AFF").setFontColor("#FFFFFF").setFontSize(14).setFontWeight("bold").setHorizontalAlignment("center");

  // Meta row
  sheet.getRange("A2:B2").setValues([["Idea Name:", ""]]);
  sheet.getRange("C2:D2").setValues([["Start Date:", ""]]);
  sheet.getRange("E2:F2").setValues([["Target Revenue:", ""]]);
  sheet.getRange("G2:H2").setValues([["Status:", "Not Started"]]);

  // Phase headers
  const phases = [
    { row: 4, label: "⚡ PHASE 1: 7-HOUR LAUNCHPAD", color: "#007AFF" },
    { row: 14, label: "📡 PHASE 2: 24-HOUR DISTRIBUTION", color: "#34D399" },
    { row: 24, label: "🗺️ PHASE 3: 7-DAY GROWTH", color: "#F59E0B" },
    { row: 42, label: "🚀 PHASE 4: 30-DAY SCALE", color: "#EC4899" },
  ];

  const taskHeaders = ["Hour/Day", "Task", "Action Required", "Tool/Resource", "Status", "Notes", "Completed By", "% Complete"];
  phases.forEach(p => {
    sheet.getRange(p.row, 1, 1, 8).merge().setValue(p.label).setBackground(p.color).setFontColor("#FFFFFF").setFontWeight("bold").setFontSize(12);
    sheet.getRange(p.row + 1, 1, 1, 8).setValues([taskHeaders]).setBackground("#1A1A1F").setFontColor("#888888").setFontWeight("bold");
  });

  // Column widths
  [80, 220, 300, 180, 100, 200, 100, 80].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.setFrozenRows(2);

  Logger.log("✅ Active_Roadmap sheet created");
}

function setupAnalytics(ss) {
  let sheet = ss.getSheetByName(CONFIG.SHEETS.ANALYTICS);
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet(CONFIG.SHEETS.ANALYTICS);

  // Phase progress tracking
  sheet.getRange("A1:F1").setValues([["Phase", "Total Tasks", "Completed Tasks", "% Complete", "Status", "Color"]]);
  sheet.getRange("A1:F1").setBackground("#0A0A0B").setFontColor("#007AFF").setFontWeight("bold");

  const phases = [
    ["7-Hour Launchpad", 7, 0, "=C2/B2", "Not Started", "#007AFF"],
    ["24-Hour Distribution", 5, 0, "=C3/B3", "Not Started", "#34D399"],
    ["7-Day Growth", 14, 0, "=C4/B4", "Not Started", "#F59E0B"],
    ["30-Day Scale", 14, 0, "=C5/B5", "Not Started", "#EC4899"],
  ];
  sheet.getRange(2, 1, phases.length, phases[0].length).setValues(phases);

  // Summary stats area
  sheet.getRange("H1:M1").setValues([["Metric", "Value", "", "Metric", "Value", ""]]);
  sheet.getRange("H1:M1").setBackground("#0A0A0B").setFontColor("#007AFF").setFontWeight("bold");

  const summaryMetrics = [
    ["Total Ideas", 100, "", "Categories", 5, ""],
    ["Users Served", 0, "", "Avg Confidence", "=AVERAGE(Master_DB!I:I)", ""],
    ["Active Ideas", 0, "", "Top Category", "", ""],
    ["Revenue Generated", "$0", "", "Last Sync", new Date().toLocaleDateString(), ""],
  ];
  sheet.getRange(2, 8, summaryMetrics.length, 6).setValues(summaryMetrics);

  // Column widths
  [160, 100, 80, 80, 100, 100].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.setFrozenRows(1);

  Logger.log("✅ Analytics_Data sheet created");
}

// ─── GEMINI API ───────────────────────────────────────────────────────────────
function callGemini(prompt, maxTokens = 2000) {
  if (CONFIG.GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("Gemini API key not set. Please update CONFIG.GEMINI_API_KEY.");
  }

  const url = `${CONFIG.GEMINI_ENDPOINT}${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    if (data.error) throw new Error(`Gemini API Error: ${data.error.message}`);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (e) {
    Logger.log(`Gemini API call failed: ${e.message}`);
    throw e;
  }
}

// ─── FILTER TOP 20 ────────────────────────────────────────────────────────────
/**
 * Main filtering function — takes user profile, uses Gemini to score all 100 ideas,
 * returns top 20 with confidence scores as clean JSON.
 *
 * @param {Object} userProfile - { skillset, budget, timePerWeek, nicheInterest, revenueGoal, experienceLevel }
 * @returns {Array} Top 20 ideas with confidence scores
 */
function filterTop20(userProfile) {
  const { skillset, budget, timePerWeek, nicheInterest, revenueGoal, experienceLevel } = userProfile;

  // Build condensed ideas list for Gemini
  const ideasSummary = MASTER_IDEAS.map(idea =>
    `${idea.id}|${idea.category}|${idea.idea_name}|${idea.usp}|Difficulty:${idea.difficulty}`
  ).join("\n");

  const prompt = `You are an elite AI business strategist. A user wants to start an AI business.

USER PROFILE:
- Skillset: ${skillset}
- Available Budget: $${budget}
- Time Available: ${timePerWeek} hours/week
- Niche Interest: ${nicheInterest}
- Revenue Goal: $${revenueGoal}/month
- Experience Level: ${experienceLevel}

BUSINESS IDEAS DATABASE (100 ideas):
${ideasSummary}

TASK: Analyze this user's profile against all 100 ideas and select the TOP 20 best matches.
Score each selected idea with a "confidence score" from 60-99% based on:
- Skill alignment (30% weight)
- Budget feasibility (25% weight)
- Time requirement match (20% weight)
- Revenue potential alignment (15% weight)
- Niche/interest alignment (10% weight)

Return ONLY a valid JSON array with exactly 20 objects, no other text:
[
  {
    "id": "B001",
    "confidence_score": 95,
    "match_reason": "Brief 1-sentence reason why this matches",
    "time_to_revenue": "3-7 days"
  }
]`;

  try {
    const geminiResponse = callGemini(prompt, 3000);
    const cleanJson = geminiResponse.replace(/```json|```/g, "").trim();
    const top20 = JSON.parse(cleanJson);

    // Enrich with full idea data
    const enriched = top20.map(result => {
      const fullIdea = MASTER_IDEAS.find(i => i.id === result.id);
      return { ...result, ...fullIdea };
    });

    // Sort by confidence score
    enriched.sort((a, b) => b.confidence_score - a.confidence_score);

    // Update Master_DB with confidence scores
    updateConfidenceScores(enriched);

    // Save to User_Inputs sheet
    saveUserInputs(userProfile, enriched);

    Logger.log(`filterTop20() complete: ${enriched.length} ideas returned`);
    return enriched;

  } catch (e) {
    Logger.log(`filterTop20() error: ${e.message}`);
    // Fallback: return top 20 by lowest difficulty score
    return MASTER_IDEAS.slice(0, 20).map(idea => ({
      ...idea,
      confidence_score: Math.floor(60 + Math.random() * 30),
      match_reason: "Skill and interest alignment detected",
      time_to_revenue: "3-7 days",
    }));
  }
}

function updateConfidenceScores(results) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.MASTER_DB);
  const data = sheet.getDataRange().getValues();

  results.forEach(result => {
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === result.id) {
        sheet.getRange(i + 1, 9).setValue(`${result.confidence_score}% — ${result.match_reason}`);
        break;
      }
    }
  });
}

function saveUserInputs(profile, results) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.USER_INPUTS);
  const sessionId = Utilities.getUuid().substring(0, 8).toUpperCase();

  sheet.appendRow([
    new Date(),
    sessionId,
    profile.skillset,
    profile.budget,
    profile.timePerWeek,
    profile.nicheInterest,
    profile.revenueGoal,
    profile.experienceLevel,
    JSON.stringify(results.slice(0, 5)), // Store top 5 in JSON
    "",
    "",
  ]);

  return sessionId;
}

// ─── POPULATE ACTIVE ROADMAP ──────────────────────────────────────────────────
/**
 * When user selects an idea, this populates Active_Roadmap with
 * niche-specific hour-by-hour tasks using Gemini.
 *
 * @param {string} ideaId - The idea ID from Master_DB
 * @param {Object} userProfile - User's profile
 */
function populateActiveRoadmap(ideaId, userProfile) {
  const idea = MASTER_IDEAS.find(i => i.id === ideaId);
  if (!idea) throw new Error(`Idea ${ideaId} not found`);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.ACTIVE_ROADMAP);

  // Update meta row
  sheet.getRange("B2").setValue(idea.idea_name);
  sheet.getRange("D2").setValue(new Date().toLocaleDateString());
  sheet.getRange("F2").setValue(`$${userProfile.revenueGoal}/mo`);
  sheet.getRange("H2").setValue("🔥 In Progress");

  // Generate niche-specific tasks with Gemini
  const prompt = `You are building an execution roadmap for: "${idea.idea_name}"
USP: ${idea.usp}
User Skillset: ${userProfile.skillset || "General"}
Revenue Goal: $${userProfile.revenueGoal || "1000"}/month

Generate SPECIFIC, actionable tasks for each phase. Return ONLY valid JSON:
{
  "phase1_7hours": [
    {"hour": "Hour 1", "task": "task name", "action": "specific action", "tool": "tool/resource"},
    ... (7 items)
  ],
  "phase2_24hours": [
    {"slot": "Morning", "task": "task name", "action": "specific action", "tool": "tool"},
    ... (5 items)
  ],
  "phase3_7days": [
    {"day": "Day 1-2", "task": "task name", "action": "specific action", "tool": "tool"},
    ... (7 items)
  ],
  "phase4_30days": [
    {"week": "Week 1", "task": "task name", "action": "specific action", "tool": "tool"},
    ... (4 items)
  ]
}`;

  let roadmapData;
  try {
    const response = callGemini(prompt, 3000);
    const clean = response.replace(/```json|```/g, "").trim();
    roadmapData = JSON.parse(clean);
  } catch (e) {
    // Fallback to static data
    roadmapData = generateStaticRoadmap(idea);
  }

  // Write Phase 1 (starts row 6)
  let rowOffset = 6;
  roadmapData.phase1_7hours.forEach((task, i) => {
    sheet.getRange(rowOffset + i, 1, 1, 6).setValues([[task.hour, task.task, task.action, task.tool, "⏳ Pending", ""]]);
  });

  // Write Phase 2 (starts row 16)
  rowOffset = 16;
  roadmapData.phase2_24hours.forEach((task, i) => {
    sheet.getRange(rowOffset + i, 1, 1, 6).setValues([[task.slot, task.task, task.action, task.tool, "⏳ Pending", ""]]);
  });

  // Write Phase 3 (starts row 26)
  rowOffset = 26;
  roadmapData.phase3_7days.forEach((task, i) => {
    sheet.getRange(rowOffset + i, 1, 1, 6).setValues([[task.day, task.task, task.action, task.tool, "⏳ Pending", ""]]);
  });

  // Write Phase 4 (starts row 44)
  rowOffset = 44;
  roadmapData.phase4_30days.forEach((task, i) => {
    sheet.getRange(rowOffset + i, 1, 1, 6).setValues([[task.week, task.task, task.action, task.tool, "⏳ Pending", ""]]);
  });

  // Color rows
  colorRoadmapRows(sheet);

  // Save idea selection to User_Inputs
  const userSheet = ss.getSheetByName(CONFIG.SHEETS.USER_INPUTS);
  const lastRow = userSheet.getLastRow();
  if (lastRow > 1) {
    userSheet.getRange(lastRow, 10).setValue(ideaId);
    userSheet.getRange(lastRow, 11).setValue(idea.idea_name);
  }

  Logger.log(`✅ Active_Roadmap populated for: ${idea.idea_name}`);
  return { success: true, idea_name: idea.idea_name, idea_id: ideaId };
}

function colorRoadmapRows(sheet) {
  const phaseColors = {
    6: "#007AFF", 16: "#34D399", 26: "#F59E0B", 44: "#EC4899"
  };
  [[6, 13, "#007AFF22"], [16, 21, "#34D39922"], [26, 33, "#F59E0B22"], [44, 48, "#EC4899"]].forEach(([start, end, color]) => {
    for (let r = start; r <= end; r++) {
      if (sheet.getRange(r, 1).getValue()) {
        sheet.getRange(r, 1, 1, 8).setBackground(r % 2 === 0 ? color : "#0F0F12");
      }
    }
  });
}

function generateStaticRoadmap(idea) {
  return {
    phase1_7hours: [
      { hour: "Hour 1", task: "Market Validation", action: `Research demand for "${idea.idea_name}" on Reddit, Twitter, Google`, tool: "Google Trends, Reddit" },
      { hour: "Hour 2", task: "Competitive Analysis", action: "Find 5 competitors, document pricing and gaps", tool: "Similarweb, Google" },
      { hour: "Hour 3", task: "Offer Creation", action: `Define your ${idea.idea_name} offer, pricing, and guarantee`, tool: "Google Docs" },
      { hour: "Hour 4", task: "Landing Page", action: "Build minimal landing page with headline, bullets, CTA", tool: "Carrd.co" },
      { hour: "Hour 5", task: "Payment Setup", action: "Create product in Gumroad/Stripe, test checkout flow", tool: "Gumroad or Stripe" },
      { hour: "Hour 6", task: "Lead Magnet", action: "Create a free resource that attracts ideal customers", tool: "Canva, Google Docs" },
      { hour: "Hour 7", task: "First Distribution", action: "Post on 3 platforms, DM 10 prospects directly", tool: "Twitter, Reddit, LinkedIn" },
    ],
    phase2_24hours: [
      { slot: "Morning", task: "Reddit Launch Post", action: `Post your story/solution on relevant subreddits`, tool: "Reddit" },
      { slot: "Noon", task: "Twitter Thread", action: "Post 7-tweet thread on the problem you solve", tool: "Twitter/X" },
      { slot: "Afternoon", task: "Cold DM Campaign", action: "Send 20 personalized DMs to ideal customers", tool: "Twitter DM, LinkedIn" },
      { slot: "Evening", task: "LinkedIn Article", action: "Post case study or insight related to your offer", tool: "LinkedIn" },
      { slot: "Night", task: "Follow-up Sequence", action: "Email all signups, offer early-bird pricing", tool: "Beehiiv, Gmail" },
    ],
    phase3_7days: [
      { day: "Day 1-2", task: "Optimize Landing Page", action: "Improve headline based on Day 1 feedback", tool: "Carrd, Hotjar" },
      { day: "Day 3", task: "First Customer Call", action: "Hop on call with your first customer, collect feedback", tool: "Calendly, Zoom" },
      { day: "Day 4", task: "Testimonial Collection", action: "Request written/video testimonials from early users", tool: "Tally.so" },
      { day: "Day 5", task: "Refine Offer", action: "Update offer based on objections heard in calls", tool: "Google Docs" },
      { day: "Day 6", task: "Content Blitz", action: "Post 2x on each platform about customer results", tool: "Buffer" },
      { day: "Day 7", task: "Revenue Review", action: "Calculate MRR, identify top acquisition channel", tool: "Stripe, Gumroad" },
      { day: "Day 7+", task: "Double Down", action: "Put 80% of effort into your #1 acquisition channel", tool: "Top channel" },
    ],
    phase4_30days: [
      { week: "Week 2", task: "Scale Top Channel", action: "Post 2x daily on winning distribution channel", tool: "Buffer" },
      { week: "Week 2", task: "Build Email List", action: "Capture emails from all traffic, begin nurture sequence", tool: "Beehiiv" },
      { week: "Week 3", task: "Raise Prices", action: "Increase price by 30-50% based on demand", tool: "Gumroad/Stripe" },
      { week: "Week 4", task: "Automate & Delegate", action: "Hire first VA for delivery tasks, set up SOPs", tool: "Notion, Loom" },
    ],
  };
}

// ─── PROGRESS CALCULATOR ──────────────────────────────────────────────────────
/**
 * Calculates completion percentage for each phase.
 * Reads status column from Active_Roadmap and returns analytics data.
 *
 * @returns {Object} Progress data for frontend pie charts
 */
function calculateProgress() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const roadmapSheet = ss.getSheetByName(CONFIG.SHEETS.ACTIVE_ROADMAP);
  const analyticsSheet = ss.getSheetByName(CONFIG.SHEETS.ANALYTICS);
  const data = roadmapSheet.getDataRange().getValues();

  const phases = [
    { name: "7-Hour Launchpad", startRow: 6, endRow: 12, color: "#007AFF" },
    { name: "24-Hour Distribution", startRow: 16, endRow: 20, color: "#34D399" },
    { name: "7-Day Growth", startRow: 26, endRow: 32, color: "#F59E0B" },
    { name: "30-Day Scale", startRow: 44, endRow: 47, color: "#EC4899" },
  ];

  const progressData = phases.map((phase, idx) => {
    let total = 0;
    let completed = 0;

    for (let r = phase.startRow - 1; r < Math.min(phase.endRow, data.length); r++) {
      if (data[r] && data[r][0] && data[r][0] !== "") {
        total++;
        const status = data[r][4] || "";
        if (status.includes("✅") || status.includes("Complete") || status.includes("Done")) {
          completed++;
        }
      }
    }

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Update Analytics sheet
    analyticsSheet.getRange(idx + 2, 2).setValue(total);
    analyticsSheet.getRange(idx + 2, 3).setValue(completed);
    analyticsSheet.getRange(idx + 2, 4).setValue(pct / 100);
    analyticsSheet.getRange(idx + 2, 5).setValue(
      pct === 0 ? "Not Started" : pct < 50 ? "🔥 In Progress" : pct < 100 ? "🚀 Almost Done" : "✅ Complete"
    );

    return { phase: phase.name, total, completed, pct, color: phase.color };
  });

  const overallPct = Math.round(progressData.reduce((sum, p) => sum + p.pct, 0) / progressData.length);

  return {
    phases: progressData,
    overall_pct: overallPct,
    timestamp: new Date().toISOString(),
  };
}

// ─── CONTENT GENERATOR ────────────────────────────────────────────────────────
/**
 * Generates instant marketing copy for the user's selected idea.
 *
 * @param {string} ideaId - Selected idea ID
 * @param {string} contentType - "email" | "twitter" | "reddit" | "cold_dm" | "linkedin" | "ad_copy"
 * @param {Object} userContext - { targetAudience, uniqueAngle }
 * @returns {Object} { content_type, generated_copy, character_count }
 */
function generateMarketingCopy(ideaId, contentType, userContext) {
  const idea = MASTER_IDEAS.find(i => i.id === ideaId);
  if (!idea) throw new Error(`Idea ${ideaId} not found`);

  const prompts = {
    email: `Write a high-converting launch email for: "${idea.idea_name}"
USP: ${idea.usp}
Target Audience: ${userContext.targetAudience || "business owners"}
Include: Subject line (2 variants), preview text, full email body with hook/story/offer/CTA, PS line.
Make it feel human and urgent.`,

    twitter: `Write a viral 8-tweet thread for: "${idea.idea_name}"
USP: ${idea.usp}
Tweet 1 must be a SCROLL-STOPPING hook. Alternate between insight and story. End with CTA.
Format: "1/ [tweet text]" for each tweet.`,

    reddit: `Write a Reddit post for: "${idea.idea_name}"
USP: ${idea.usp}
Style: Story-first, not promotional. Share a result/insight first. Only reveal the product at the end.
Include: Title, post body (300-500 words). Format for Reddit markdown.`,

    cold_dm: `Write 3 cold DM versions for: "${idea.idea_name}"
USP: ${idea.usp}
Target: ${userContext.targetAudience || "business owners"}
Version 1: Ultra-short (under 50 words), Version 2: Medium (under 100 words), Version 3: Story-based (under 200 words).
Each must feel human, personalized, and not salesy.`,

    linkedin: `Write a LinkedIn launch post for: "${idea.idea_name}"
USP: ${idea.usp}
Include: Hook line, problem agitation, solution reveal, social proof placeholder, CTA.
Optimize for LinkedIn algorithm (line breaks, no links in post, CTA in comments).`,

    ad_copy: `Write 3 Facebook/Google ad variations for: "${idea.idea_name}"
USP: ${idea.usp}
Target: ${userContext.targetAudience || "business owners"}
For each: Headline (5 words max), Primary text (125 words max), CTA button text.
Focus on pain points and transformation.`,
  };

  const prompt = prompts[contentType] || prompts.email;

  try {
    const copy = callGemini(prompt, 1500);

    // Save to Active_Roadmap notes
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEETS.ACTIVE_ROADMAP);
    const lastRow = sheet.getLastRow() + 2;
    sheet.getRange(lastRow, 1).setValue(`Generated ${contentType} Copy`);
    sheet.getRange(lastRow, 2).setValue(new Date().toLocaleDateString());
    sheet.getRange(lastRow, 3, 1, 4).merge().setValue(copy.substring(0, 500) + "...");

    return {
      content_type: contentType,
      idea_name: idea.idea_name,
      generated_copy: copy,
      character_count: copy.length,
      timestamp: new Date().toISOString(),
    };
  } catch (e) {
    Logger.log(`generateMarketingCopy() error: ${e.message}`);
    throw e;
  }
}

// ─── WEB APP ENDPOINT ─────────────────────────────────────────────────────────
/**
 * HTTP GET handler — used by the React frontend to fetch data
 */
function doGet(e) {
  const action = e.parameter.action || "ping";
  let result = {};

  try {
    switch (action) {
      case "ping":
        result = { status: "ok", message: "Execution OS API is running", timestamp: new Date().toISOString() };
        break;

      case "getIdeas":
        result = { ideas: MASTER_IDEAS, count: MASTER_IDEAS.length };
        break;

      case "filterTop20":
        const profile = {
          skillset: e.parameter.skillset || "",
          budget: e.parameter.budget || "500",
          timePerWeek: e.parameter.timePerWeek || "20",
          nicheInterest: e.parameter.nicheInterest || "",
          revenueGoal: e.parameter.revenueGoal || "1000",
          experienceLevel: e.parameter.experienceLevel || "Beginner",
        };
        result = { top20: filterTop20(profile) };
        break;

      case "getProgress":
        result = calculateProgress();
        break;

      case "getCategories":
        const cats = [...new Set(MASTER_IDEAS.map(i => i.category))];
        result = { categories: cats };
        break;

      default:
        result = { error: "Unknown action", available: ["ping", "getIdeas", "filterTop20", "getProgress", "getCategories"] };
    }
  } catch (err) {
    result = { error: err.message, action };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HTTP POST handler — for writing operations
 */
function doPost(e) {
  let body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Invalid JSON body" })).setMimeType(ContentService.MimeType.JSON);
  }

  let result = {};
  try {
    switch (body.action) {
      case "populateRoadmap":
        result = populateActiveRoadmap(body.ideaId, body.userProfile || {});
        break;

      case "generateCopy":
        result = generateMarketingCopy(body.ideaId, body.contentType, body.userContext || {});
        break;

      case "updateProgress":
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = ss.getSheetByName(CONFIG.SHEETS.ACTIVE_ROADMAP);
        if (body.row && body.status) {
          sheet.getRange(body.row, 5).setValue(body.status);
        }
        result = { success: true, updated: body.row };
        break;

      case "filterTop20":
        result = { top20: filterTop20(body.userProfile) };
        break;

      default:
        result = { error: "Unknown action" };
    }
  } catch (err) {
    result = { error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────
function getIdeaById(ideaId) {
  return MASTER_IDEAS.find(i => i.id === ideaId) || null;
}

function getIdeasByCategory(category) {
  return MASTER_IDEAS.filter(i => i.category === category);
}

function getIdeaStats() {
  const categories = {};
  const difficulties = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  MASTER_IDEAS.forEach(idea => {
    categories[idea.category] = (categories[idea.category] || 0) + 1;
    difficulties[idea.difficulty]++;
  });

  return {
    total: MASTER_IDEAS.length,
    by_category: categories,
    by_difficulty: difficulties,
    easy_to_launch: MASTER_IDEAS.filter(i => i.difficulty <= 2).length,
  };
}

// ─── MENU ─────────────────────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("⚡ Execution OS")
    .addItem("🚀 Run Setup (First Time)", "setup")
    .addSeparator()
    .addItem("📊 Recalculate Progress", "calculateProgress")
    .addItem("🔄 Refresh Analytics", "refreshAnalytics")
    .addSeparator()
    .addItem("📖 View API Docs", "showApiDocs")
    .addItem("⚙️ Set Gemini API Key", "promptForApiKey")
    .addToUi();
}

function refreshAnalytics() {
  const result = calculateProgress();
  SpreadsheetApp.getUi().alert(`Analytics refreshed!\n\nOverall Progress: ${result.overall_pct}%\n\nPhase Breakdown:\n${result.phases.map(p => `• ${p.phase}: ${p.pct}%`).join("\n")}`);
}

function promptForApiKey() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt("⚙️ Gemini API Key", "Enter your Gemini API key from ai.google.dev:", ui.ButtonSet.OK_CANCEL);
  if (result.getSelectedButton() === ui.Button.OK) {
    const key = result.getResponseText().trim();
    if (key) {
      PropertiesService.getScriptProperties().setProperty("GEMINI_API_KEY", key);
      CONFIG.GEMINI_API_KEY = key;
      ui.alert("✅ API Key saved successfully!");
    }
  }
}

function showApiDocs() {
  const html = HtmlService.createHtmlOutput(`
    <style>body{font-family:monospace;background:#0A0A0B;color:#C8C8D0;padding:20px}</style>
    <h2 style="color:#007AFF">⚡ Execution OS API</h2>
    <h3>GET Endpoints</h3>
    <pre>?action=ping              → Health check
?action=getIdeas           → All 100 ideas
?action=getCategories      → 5 categories
?action=getProgress        → Phase progress
?action=filterTop20        → Top 20 matches
  &skillset=coding
  &budget=500
  &timePerWeek=20
  &nicheInterest=SaaS
  &revenueGoal=5000
  &experienceLevel=Beginner</pre>
    <h3>POST Endpoints</h3>
    <pre>{"action":"populateRoadmap","ideaId":"B001","userProfile":{...}}
{"action":"generateCopy","ideaId":"B001","contentType":"twitter","userContext":{...}}
{"action":"filterTop20","userProfile":{...}}</pre>
    <h3>Content Types for generateCopy</h3>
    <pre>email | twitter | reddit | cold_dm | linkedin | ad_copy</pre>
  `)
  .setWidth(600).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, "API Documentation");
}

// ─── INIT CHECK ───────────────────────────────────────────────────────────────
function checkSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const requiredSheets = Object.values(CONFIG.SHEETS);
  const missing = requiredSheets.filter(name => !ss.getSheetByName(name));

  if (missing.length > 0) {
    SpreadsheetApp.getUi().alert(`⚠️ Setup Required\n\nMissing sheets: ${missing.join(", ")}\n\nPlease run Setup from the ⚡ Execution OS menu.`);
    return false;
  }
  return true;
}
