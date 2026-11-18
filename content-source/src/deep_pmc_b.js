// Deeper content for AI-Enabled PM Craft, topics 10-17.
deepen("pmc10", {
  sections: [
    {h: "Worked example: ROI for AI meeting summaries", table: [
      ["Line", "Assumption", "Value per year"],
      ["Time saved", "200 managers x 1.5 hours a week x 46 weeks", "13,800 hours"],
      ["Value of time", "At an internal cost of 40 per hour (your own figure)", "552,000"],
      ["Realisation factor", "Only about half of saved time turns into useful work", "276,000"],
      ["Tool cost", "Licences, at the vendor's quoted price", "Subtract"],
      ["Rollout cost", "Training, security review, admin time", "Subtract"],
      ["Risk", "Wrong summaries, privacy issues", "Mitigate with review rules"]
    ], p: ["Show the realisation factor openly. Executives trust a cautious estimate more than a large headline number."]},
    {h: "Value beyond time saved", bullets: [
      "Revenue: faster sales responses, better conversion, new AI-powered features customers pay for.",
      "Quality: fewer errors in documents, more consistent customer replies.",
      "Speed: shorter cycle time from idea to release.",
      "Risk reduction: earlier detection of issues in contracts, code or tickets.",
      "Employee experience: less repetitive work, which can help retention."
    ]}
  ],
  quiz: [
    ["What is a realisation factor?", "The share of saved time that actually turns into useful work or value."],
    ["Name two kinds of AI value other than time saved.", "Revenue, quality, speed, risk reduction or employee experience (any two)."]
  ],
  prac: ["Measure a baseline before rollout; without it you cannot prove any ROI afterwards."]
});

deepen("pmc11", {
  sections: [
    {h: "Worked example: a 90-day adoption plan", table: [
      ["Weeks", "Focus", "Output"],
      ["1 to 2", "Pick two use cases with clear owners and data", "One-page brief per use case with a baseline metric"],
      ["3 to 6", "Pilot with 20 to 30 volunteers", "Weekly usage and quality data; list of issues"],
      ["7 to 8", "Fix the top issues and write guidance", "Prompt library, do and don't rules, training session"],
      ["9 to 12", "Expand to the full team", "Adoption dashboard; decision to scale, change or stop"]
    ]},
    {h: "Change management basics", bullets: [
      "Explain why: link the change to problems people already feel.",
      "Find champions in each team who share tips and answer questions.",
      "Make it safe: clear rules on data, review and who is accountable.",
      "Show early wins with real numbers and real names (with permission).",
      "Remove old ways gradually, once the new way is clearly better."
    ]}
  ],
  quiz: [
    ["Why pilot with volunteers first?", "They give honest feedback and become champions when the tool scales."],
    ["What decision should a pilot end with?", "Scale, change or stop, based on agreed metrics."]
  ],
  prac: ["Hold a short monthly show-and-tell where staff demo how they use AI; peer examples drive adoption faster than training slides."]
});

deepen("pmc12", {
  sections: [
    {h: "Worked example: reading a retention cohort table", table: [
      ["Signup month", "Users", "Month 1", "Month 2", "Month 3"],
      ["January", "1,000", "62%", "48%", "44%"],
      ["February", "1,200", "60%", "47%", "43%"],
      ["March (AI onboarding launched)", "1,100", "71%", "58%", ""]
    ], p: ["March users stay noticeably longer from month 1. That suggests the new onboarding helps, but check that nothing else changed in March, such as a pricing promotion or a different marketing channel."]},
    {h: "Key SaaS formulas", table: [
      ["Metric", "Formula"],
      ["Monthly recurring revenue (MRR)", "Sum of monthly subscription revenue from active customers"],
      ["Churn rate", "Customers lost in the period / customers at the start"],
      ["Net revenue retention", "(Start MRR + expansion - contraction - churn) / start MRR"],
      ["Customer lifetime value", "Average revenue per customer x gross margin / churn rate"],
      ["CAC payback", "Customer acquisition cost / (monthly revenue per customer x gross margin)"]
    ]}
  ],
  quiz: [
    ["What does a cohort table compare?", "How groups of users who started at different times behave over the same time since starting."],
    ["What does net revenue retention above 100% mean?", "Existing customers are spending more over time, even after churn."]
  ],
  prac: ["When a metric moves, list every change that happened in the same period before crediting your feature."]
});

deepen("pmc13", {
  sections: [
    {h: "Worked example: designing an AI email draft feature", table: [
      ["Moment", "Design choice", "Why"],
      ["Before", "Button labelled 'Draft reply with AI'", "Sets expectations that the result is a draft"],
      ["During", "Show progress and allow cancel", "Generation can take several seconds"],
      ["Result", "Draft appears in the editor, not sent", "User stays in control"],
      ["Trust", "Show which emails and documents were used", "Lets users check sources"],
      ["Feedback", "Thumbs up or down with optional reason", "Feeds evaluation and improvement"],
      ["Failure", "Clear message and a 'write it myself' path", "The task can always be completed"]
    ]},
    {h: "Common AI UX mistakes", bullets: [
      "Hiding that content is AI-generated.",
      "Taking actions (sending, deleting, paying) without confirmation.",
      "Showing confident answers with no way to check sources.",
      "Making users re-type their whole request to fix a small error.",
      "No way to turn the feature off or give feedback."
    ]}
  ],
  quiz: [
    ["Why should an AI draft go into the editor rather than being sent?", "So the user reviews it and stays in control of what is sent."],
    ["Name one way to help users calibrate trust in an AI answer.", "Show sources, show confidence or limitations, or label it as AI-generated."]
  ],
  prac: ["Test AI features with users on bad outputs as well as good ones; how people recover from errors decides whether they trust the feature."]
});

deepen("pmc14", {
  sections: [
    {h: "Worked example: estimating a RAG assistant", table: [
      ["Phase", "Typical range", "Exit gate"],
      ["Discovery and data audit", "1 to 2 weeks", "Sources, owners and access confirmed"],
      ["Prototype", "2 to 3 weeks", "Answers 50 sample questions; team agrees it is promising"],
      ["Eval set and baseline", "1 to 2 weeks", "Test set of 150 to 300 questions with expected answers"],
      ["Quality iterations", "3 to 6 weeks", "Eval score above target"],
      ["Hardening", "2 to 4 weeks", "Security review, monitoring, cost limits, fallback"],
      ["Pilot", "2 to 4 weeks", "Real users; adoption and satisfaction targets met"]
    ], p: ["The wide ranges are honest: quality iteration is the hardest phase to predict. Plan it as time-boxed rounds with a decision after each."]},
    {h: "How to present the estimate", bullets: [
      "Give a range and say what drives it (data quality, accuracy target, integrations).",
      "Show gates: leadership can stop or change direction at each one.",
      "List assumptions, such as access to data by a certain date.",
      "Commit firmly to the next phase only, and update the rest after each gate."
    ]}
  ],
  quiz: [
    ["Which phase of AI work is usually hardest to estimate?", "Quality iteration: improving outputs until they meet the eval target."],
    ["Why present phases with gates?", "So decision-makers can stop or change course before spending the whole budget."]
  ],
  prac: ["Keep a log of actual versus estimated time for each AI project; after two or three projects your ranges get much tighter."]
});

deepen("pmc15", {
  sections: [
    {h: "Worked example: one PM's weekly AI routine", table: [
      ["When", "Task", "AI's role", "Your role"],
      ["Monday", "Plan the week", "Summarise open actions from last week's notes", "Choose the three priorities"],
      ["Daily", "Meetings", "Transcribe and list actions", "Confirm decisions and owners"],
      ["Wednesday", "Backlog refinement", "Draft acceptance criteria and edge cases", "Edit and agree with the team"],
      ["Thursday", "Risk review", "Scan board and threads for blockers", "Decide what to escalate"],
      ["Friday", "Status report", "Draft from sources with links", "Write the headline and asks"]
    ]},
    {h: "Building a prompt library", steps: [
      ["Capture", "Save any prompt that produced a good result, with an example input and output."],
      ["Name", "Give it a clear name, such as 'PRD critic' or 'Status draft from Jira export'."],
      ["Template", "Mark the parts to replace, such as the project name or audience."],
      ["Share", "Keep it in a team space and invite improvements."],
      ["Review", "Retire prompts that stop working well after model or tool changes."]
    ]}
  ],
  quiz: [
    ["In a status report workflow, which part should stay human?", "The headline judgement, risks to escalate and the asks."],
    ["What should a saved prompt include besides the prompt text?", "An example input and output, and the parts to replace."]
  ],
  prac: ["Review your AI routine every quarter; drop steps that stopped saving time and add new ones as tools improve."]
});

deepen("pmc16", {
  sections: [
    {h: "Worked example: a RACI for an AI launch", table: [
      ["Activity", "PM", "Eng lead", "Legal", "Security", "Support"],
      ["Define use case and success metrics", "A", "C", "C", "I", "C"],
      ["Choose model and architecture", "C", "A", "I", "C", "I"],
      ["Privacy and data review", "R", "C", "A", "C", "I"],
      ["Eval and quality sign-off", "A", "R", "I", "I", "C"],
      ["Launch communication", "A", "I", "C", "I", "R"]
    ], p: ["R = does the work, A = accountable for the outcome (only one per row), C = consulted, I = informed."]},
    {h: "A conflict conversation in four steps", steps: [
      ["Separate people from the problem", "'We both want a safe launch; let's look at the risk together.'"],
      ["Find the interests", "Ask what each side is worried about, not just what they are asking for."],
      ["Create options", "List at least three options, including partial or phased ones."],
      ["Agree criteria and decide", "Use agreed criteria (risk, cost, time) and record who decided and why."]
    ]}
  ],
  quiz: [
    ["How many people should be Accountable for one activity?", "Exactly one."],
    ["What is the difference between a position and an interest?", "A position is what someone asks for; an interest is why they want it."]
  ],
  prac: ["Before a difficult meeting, meet the most concerned stakeholder one-to-one; most conflicts soften once people feel heard."]
});

deepen("pmc17", {
  sections: [
    {h: "Worked example: a query you can read", p: [
      "SELECT plan, COUNT(*) AS customers, AVG(monthly_spend) AS avg_spend FROM customers WHERE signup_date >= '2026-01-01' GROUP BY plan ORDER BY customers DESC;",
      "In plain English: for customers who signed up this year, count how many are on each plan and their average monthly spend, then list the plans from most to fewest customers."
    ], table: [
      ["Part", "Meaning"],
      ["SELECT", "Which columns or calculations to show"],
      ["FROM customers", "Which table to read"],
      ["WHERE", "Which rows to keep"],
      ["GROUP BY plan", "Make one row per plan"],
      ["ORDER BY ... DESC", "Sort, largest first"]
    ]},
    {h: "Checking AI-written SQL", bullets: [
      "Ask the AI to explain the query line by line in plain English.",
      "Check the row count makes sense (for example, total customers matches a known figure).",
      "Watch joins: a wrong join can double-count rows.",
      "Check date filters and time zones.",
      "Run on a small date range first; ask an analyst to review anything that drives a decision."
    ]}
  ],
  quiz: [
    ["What does GROUP BY do?", "Combines rows into one row per value, such as one row per plan."],
    ["Name one common mistake in AI-written SQL.", "A wrong join that double-counts, or a wrong date filter."]
  ],
  prac: ["Keep a small set of known numbers (total customers, last month's revenue) to sanity-check any query result."]
});
