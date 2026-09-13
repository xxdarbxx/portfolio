const AI_AUTOMATION_SECTIONS = [
  {
    platform: 'n8n',
    icon: 'fas fa-diagram-project',
    groups: [
      {
        title: 'AI Research Pipeline',
        date: 'August 2026',
        description: 'Automated AI research pipeline that collects web data, scrapes multiple websites, analyzes the content with AI, and saves structured results directly to Google Sheets.',
        images: [
          { src: 'images/ai-automation/research-pipeline1.jpg' },
        ]
      },
      {
        title: 'AI Web Scraping Automation',
        date: 'August 2026',
        description: "Built an automated workflow that collects website URLs from Google Sheets, scrapes and processes web content in batches, formats the extracted data, and uses AI to generate structured results. The workflow automatically updates the original Google Sheet, reducing repetitive manual research and data-entry work.",
        images: [
          { src: 'images/ai-automation/web-scraping-automation1.jpg' },
        ]
      },
      {
        title: 'AI Gmail Automation',
        description: 'Built an automated email reply system using n8n, OpenAI, and Gmail to generate and send AI-powered responses.',
        images: [
          { src: 'images/ai-automation/gmail-automation1.jpg' },
        ]
      },
    ]
  },
  {
    platform: 'Zapier',
    icon: 'fas fa-bolt',
    groups: [
      {
        title: 'Gmail to Google Sheets Email Tracking Automation',
        description: 'Built an automated workflow using Zapier that captures new Gmail messages and automatically records the sender name, email address, subject, date, and email link in Google Sheets. This workflow reduces manual data entry and provides an organized system for tracking incoming emails.',
        tools: ['Zapier', 'Gmail', 'Google Sheets'],
        images: [
          { src: 'images/ai-automation/zapier-gmail-sheets1.png' },
        ]
      },
    ]
  },
];
