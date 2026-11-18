// Deeper content for AI-Enabled PM Craft, topics 1-9.
deepen("pmc01", {
  sections: [
    {h: "Worked example: a weekly status report", steps: [
      ["Before", "You spend about 90 minutes each Friday collecting updates from Jira, Slack and meeting notes, then writing a status email."],
      ["Set up", "Create one project in your AI assistant that holds the report template, last week's report and the list of workstreams."],
      ["Each Friday", "Paste the board export and the meeting summaries. Ask for a draft in the template, with every claim linked to its source line."],
      ["Review", "Check each red or amber item against the source, rewrite the headline in your own words and add the decisions you need."],
      ["After two weeks", "Compare time spent (for example 90 down to 35 minutes) and count the errors you caught. Keep the workflow only if both look good."]
    ]},
    {h: "Questions to ask before adopting a tool", table: [
      ["Question", "Why it matters"],
      ["Where is our data stored and is it used for training?", "Confidential plans and customer data must stay within policy"],
      ["Is it on the approved vendor list?", "Unapproved tools create audit and security findings"],
      ["Can it export my work?", "Avoids lock-in if the tool is dropped"],
      ["Who else needs to adopt it for it to help?", "Shared tools only pay off when the team uses them"],
      ["What will I stop doing?", "If nothing changes, the tool adds work rather than saving it"]
    ]}
  ],
  quiz: [
    ["What should you ask the AI to include so you can review a status draft quickly?", "Links or references from each claim back to its source."],
    ["Name one question to ask about any AI tool's data handling.", "Where data is stored, or whether it is used to train models."]
  ],
  prac: ["Keep a two-column log for any trial: minutes saved and errors caught. It turns a vague feeling into a decision you can defend."]
});

deepen("pmc02", {
  sections: [
    {h: "Worked example: a PRD for AI ticket summaries", table: [
      ["Section", "Example content"],
      ["Problem", "Support agents spend about 4 minutes reading long ticket threads before replying"],
      ["Goal", "Cut time-to-first-reply on long threads by 30% without lowering satisfaction scores"],
      ["Non-goals", "No automatic replies to customers in this release"],
      ["Requirements", "Summary appears in under 3 seconds; shows the last customer request first; agent can rate it"],
      ["Eval plan", "200 real threads scored by senior agents for accuracy and missing facts before launch"],
      ["Fallback", "If the model is slow or unavailable, show the thread as today with no summary"],
      ["Cost", "Estimated cost per summary times expected daily volume, reviewed against the support budget"]
    ]},
    {h: "A reusable critique prompt", p: [
      "After drafting, ask: 'Review this PRD as a sceptical staff engineer, a support lead and a privacy lawyer. For each, list the three biggest gaps or risks, any requirement that cannot be tested, and any question you would ask in the review meeting.'",
      "Then fix what is valid and add the rest to Open questions with an owner. This usually takes 15 minutes and saves a review cycle."
    ]}
  ],
  quiz: [
    ["Why does an AI feature PRD need a fallback section?", "Models can be slow, wrong or unavailable, so the product must still work."],
    ["What makes a requirement testable?", "It states a measurable condition, such as a time limit or an accuracy threshold."]
  ],
  prac: ["Ask reviewers to comment on the problem and goals first; agreeing on those makes the rest of the review much faster."]
});

deepen("pmc03", {
  sections: [
    {h: "Weak vs strong acceptance criteria", table: [
      ["Weak", "Strong"],
      ["Checkout should be fast", "Given a saved card, when I tap Pay, then confirmation appears within 2 seconds for 95% of payments"],
      ["Handle errors properly", "Given the payment provider times out, when I tap Pay, then I see 'Payment not completed, try again' and no charge is made"],
      ["User can manage cards", "Given two saved cards, when I remove one, then it no longer appears at checkout and the other stays default"]
    ]},
    {h: "Story review checklist", bullets: [
      "Does the story name a real user and a reason, not just a feature?",
      "Can it be finished and shown within one sprint?",
      "Is there at least one failure scenario as well as the happy path?",
      "Are numbers (time limits, sizes, counts) stated rather than implied?",
      "Would QA know exactly what to test without asking you?",
      "Are designs, API contracts or data needs linked?"
    ]}
  ],
  quiz: [
    ["Rewrite 'search should be quick' as a testable criterion.", "For example: when I search, results appear within 1 second for 95% of queries."],
    ["What is one sign a story is too big?", "It cannot be finished and demoed within a single sprint."]
  ],
  prac: ["Read your criteria aloud to an engineer and ask them to describe the test they would write; gaps show up immediately."]
});

deepen("pmc04", {
  sections: [
    {h: "A sprint with AI help", table: [
      ["Ceremony", "Human job", "Where AI helps"],
      ["Backlog refinement", "Decide priority and clarify intent", "Draft acceptance criteria, find missing edge cases"],
      ["Sprint planning", "Commit to a goal the team believes in", "Summarise capacity, flag stories without estimates"],
      ["Daily standup", "Surface blockers and help each other", "Summarise board changes since yesterday"],
      ["Review", "Show working software and get feedback", "Turn feedback notes into backlog items"],
      ["Retrospective", "Agree what to change", "Group anonymous comments into themes"]
    ]},
    {h: "Worked example: a sprint that slipped", p: [
      "A team committed to 40 points and finished 22. The retrospective found three causes: two stories depended on an API that another team had not finished, one story had no acceptance criteria, and a production incident took two engineers for three days.",
      "Actions: check cross-team dependencies during refinement, refuse stories without criteria into planning, and keep about 15% of capacity for unplanned work. The next sprint finished 30 of 32 points."
    ]}
  ],
  quiz: [
    ["Which ceremony decides what the team commits to?", "Sprint planning."],
    ["Name one cause of sprint slippage you can catch during refinement.", "Unfinished dependencies or stories without acceptance criteria."]
  ],
  prac: ["Track planned versus finished work for a few sprints before changing anything; trends matter more than one bad sprint."]
});

deepen("pmc05", {
  sections: [
    {h: "Worked example: a go/no-go meeting", table: [
      ["Check", "Status", "Decision input"],
      ["Critical bugs open", "0", "Go"],
      ["Major bugs open", "2, both with workarounds documented", "Go if support is briefed"],
      ["UAT sign-off", "Finance signed; Operations signed with one minor note", "Go"],
      ["Performance test", "Checkout p95 1.8s against a 2s target", "Go"],
      ["Rollback plan", "Feature flag off within 5 minutes; tested yesterday", "Go"],
      ["Support readiness", "FAQ drafted, training on Thursday", "Go after training"]
    ], p: ["Outcome: a conditional go, releasing on Friday after support training, with named owners for the two major bugs."]},
    {h: "Writing a good bug report", bullets: [
      "Title that says what is wrong and where.",
      "Steps to reproduce, numbered.",
      "Expected result and actual result.",
      "Environment: device, browser, app version, test account.",
      "Evidence: screenshot, video or log extract.",
      "Severity and who is affected."
    ]}
  ],
  quiz: [
    ["What makes a go decision conditional?", "A remaining action, such as support training, must be finished before release."],
    ["Name four parts of a good bug report.", "Title, steps to reproduce, expected vs actual result, environment, evidence, severity (any four)."]
  ],
  prac: ["Agree go/no-go criteria at the start of the release, not on release day, so the meeting checks facts rather than debating standards."]
});

deepen("pmc06", {
  sections: [
    {h: "Worked example: from complaint to problem statement", steps: [
      ["Raw request", "'We need an AI chatbot on the help page.'"],
      ["Ask why", "Support volume rose 40% this quarter; most tickets are about order status and refunds."],
      ["Find evidence", "Ticket data shows 55% of contacts ask 'where is my order', and the answer is already in the order system."],
      ["Problem statement", "Customers cannot easily find their order status, so they contact support, costing about 3,000 agent hours a month."],
      ["Options", "Better order tracking page, proactive delivery emails, or an assistant that reads order status. Compare cost and impact before choosing AI."]
    ]},
    {h: "Journey map example: returning an item", table: [
      ["Stage", "Customer does", "Feels", "Opportunity"],
      ["Decide", "Checks return policy", "Unsure if eligible", "Show eligibility on the order page"],
      ["Start", "Finds return form", "Frustrated by searching", "One-tap return from the order"],
      ["Ship", "Prints label, visits drop-off", "Inconvenienced", "QR code instead of printing"],
      ["Wait", "Checks refund status", "Anxious", "Proactive status updates"],
      ["Refund", "Receives money", "Relieved", "Faster refund on scan at drop-off"]
    ]}
  ],
  quiz: [
    ["Why ask 'why' before accepting a solution request?", "The real problem may have a simpler or cheaper solution than the one requested."],
    ["What four columns make a basic journey map?", "Stage, what the customer does, how they feel, and the opportunity."]
  ],
  prac: ["Bring one real customer quote or data point to every problem statement; it keeps discussions grounded."]
});

deepen("pmc07", {
  sections: [
    {h: "Worked example: build or buy a document search assistant", table: [
      ["Factor", "Buy (SaaS tool)", "Build (own RAG on a model API)"],
      ["Time to first value", "2 to 4 weeks", "2 to 3 months"],
      ["Upfront cost", "Low; subscription per user", "Engineering time"],
      ["Running cost", "Fixed per seat", "Model usage plus hosting; varies with volume"],
      ["Fit to our data", "Limited connectors", "Any source we can index"],
      ["Control and security", "Vendor's controls", "Our own controls and logging"],
      ["Differentiation", "Same as competitors", "Can become a product advantage"]
    ], p: ["A common answer: buy first to learn what users need, then build only if search is a core advantage or the tool cannot meet security needs."]},
    {h: "MVP scoping example", bullets: [
      "In: one document source (the policy wiki), one user group (support), answers with citations, thumbs up or down feedback.",
      "Out: other sources, write actions, multiple languages, mobile app.",
      "Success gate: 80% of answers rated correct by support leads on a 100-question test set, and weekly active use by half the pilot group.",
      "Kill criteria: below 60% correct after two improvement rounds."
    ]}
  ],
  quiz: [
    ["When does building usually beat buying?", "When the capability is a core advantage or no tool meets data and security needs."],
    ["What are kill criteria?", "Agreed thresholds that, if not met, mean stopping the project."]
  ],
  prac: ["Write kill criteria before the MVP starts; it is much harder to agree them once people are invested."]
});

deepen("pmc08", {
  sections: [
    {h: "Worked example: metrics for an AI reply assistant", table: [
      ["Type", "Metric", "Target"],
      ["Primary", "Median time to resolve a ticket", "Down 20% in 8 weeks"],
      ["Adoption", "Share of replies that started from an AI draft", "Above 50% of eligible tickets"],
      ["Quality guardrail", "Customer satisfaction score", "No drop of more than 1 point"],
      ["Safety guardrail", "Replies flagged for wrong or risky content", "Below 0.5%"],
      ["Cost", "Model cost per resolved ticket", "Under the agreed budget"]
    ]},
    {h: "A simple cost estimate", steps: [
      ["Volume", "20,000 tickets a month, 60% eligible: 12,000 AI drafts."],
      ["Tokens per draft", "About 3,000 input tokens (thread plus instructions) and 400 output tokens."],
      ["Price", "Multiply by the current per-token price of the chosen model from the provider's pricing page."],
      ["Overheads", "Add retries, evals and testing, often 20 to 30% on top."],
      ["Compare", "Set the monthly total against agent time saved to check the business case."]
    ]}
  ],
  quiz: [
    ["Why pair a primary metric with guardrails?", "So you notice if speed or adoption improves at the expense of quality or safety."],
    ["What two numbers drive model cost?", "Volume of requests and tokens per request, multiplied by the per-token price."]
  ],
  prac: ["Always look up current model prices when estimating; they change often and can shift the business case."]
});

deepen("pmc09", {
  sections: [
    {h: "Worked example: RICE scoring three ideas", table: [
      ["Idea", "Reach (users/quarter)", "Impact (0.25 to 3)", "Confidence", "Effort (person-months)", "Score"],
      ["Saved cards", "8,000", "2", "80%", "2", "6,400"],
      ["AI order tracking assistant", "15,000", "1", "50%", "4", "1,875"],
      ["Dark mode", "5,000", "0.5", "100%", "1", "2,500"]
    ], p: ["RICE score = Reach x Impact x Confidence / Effort. Saved cards wins here, but low confidence on the assistant is a signal to run a cheap test before deciding."]},
    {h: "Choosing a method", table: [
      ["Situation", "Good fit"],
      ["Many ideas competing for one roadmap", "RICE, for a consistent comparison"],
      ["Understanding what delights versus what is expected", "Kano, using a short customer survey"],
      ["Fixed deadline with too much scope", "MoSCoW, to agree what must ship"],
      ["Executive debate with strong opinions", "Any scored method, shared in advance, to anchor the conversation"]
    ]}
  ],
  quiz: [
    ["What is the RICE formula?", "Reach x Impact x Confidence divided by Effort."],
    ["When is MoSCoW most useful?", "When a deadline is fixed and scope must be cut."]
  ],
  prac: ["Share scores before the prioritisation meeting and invite challenges to the inputs; arguing about numbers is more productive than arguing about opinions."]
});
