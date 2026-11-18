// Deeper content for Communication & Leadership.
deepen("com01", {
  sections: [
    {h: "Worked example: explaining an API to a sales director", steps: [
      ["Start with what they care about", "'This is how our app will pull delivery dates from the shipping company automatically.'"],
      ["Use an analogy", "'An API is like a restaurant menu and waiter: you order from a fixed list, and the kitchen sends back exactly what you asked for.'"],
      ["Say what it means for them", "'Customers will see accurate delivery dates, so fewer will call to ask.'"],
      ["Name the limit", "'If the shipping company's system is down, we fall back to estimated dates.'"],
      ["Check understanding", "'How would you explain this to a customer who asks?'"]
    ]},
    {h: "Explaining AI terms simply", table: [
      ["Term", "Plain-English version"],
      ["Large language model", "Software trained on huge amounts of text that predicts useful next words"],
      ["Hallucination", "When the AI states something wrong with confidence"],
      ["RAG", "Giving the AI the right documents to read before it answers"],
      ["Fine-tuning", "Extra training on examples so it behaves a particular way"],
      ["Evaluation", "Testing the AI on a fixed set of questions with known good answers"]
    ]}
  ],
  quiz: [
    ["What should come first when explaining technology to a business leader?", "What it means for them or the outcome they care about."],
    ["Give a plain-English definition of RAG.", "Giving the AI the right documents to read before it answers."]
  ],
  prac: ["Test your explanation on someone outside tech; if they can repeat it back, it works."]
});

deepen("com02", {
  sections: [
    {h: "Worked example: rewriting a status update", table: [
      ["Before", "After (BLUF)"],
      ["This week the team worked on the payment integration and had several discussions with the vendor about the API changes, and there were some issues with the test environment which...", "Bottom line: payments launch moves from 3 to 17 March. Cause: the vendor changed their API last week. Ask: approve two extra contractor weeks (cost in appendix) to protect the new date. Everything else is on track."]
    ], p: ["The rewrite gives the decision-maker the outcome, the reason and the ask in three sentences. Details go below or in an attachment."]},
    {h: "A one-page executive update template", bullets: [
      "Headline: one sentence on overall status and the most important change.",
      "Status: green, amber or red, with one line on why.",
      "Progress: three bullets on what was achieved, in outcomes rather than activities.",
      "Risks: top two, each with impact, likelihood and owner.",
      "Decisions or help needed: specific, with a deadline.",
      "Next milestones: dates for the next two or three."
    ]}
  ],
  quiz: [
    ["What does BLUF stand for?", "Bottom line up front."],
    ["What three things should the first lines of an executive update contain?", "The outcome or status, the reason for any change, and what you need."]
  ],
  prac: ["Before sending, delete your first paragraph and see if the update still works; often it reads better."]
});

deepen("com03", {
  sections: [
    {h: "Worked example: escalating a blocked dependency", p: [
      "Subject: Decision needed by Thursday: data platform access is blocking the AI pilot.",
      "Bottom line: the pilot will slip two weeks unless the data team grants read access to the support database by Thursday. Impact: launch moves from 1 to 15 April and the support cost savings start later. Tried so far: ticket raised on 3 March, two follow-ups, meeting with the data team lead, who needs approval from their director. Options: (1) director approves read-only access this week, (2) we use last month's exported data for the pilot, which lowers accuracy, (3) accept the slip. Recommendation: option 1. Ask: can you raise this with the data director today?"
    ]},
    {h: "Escalation do's and don'ts", table: [
      ["Do", "Don't"],
      ["Escalate early, while options still exist", "Wait until the deadline has passed"],
      ["Bring facts, options and a recommendation", "Bring only the problem"],
      ["Tell the other team you are escalating", "Go over someone's head without warning"],
      ["Describe the issue, not the person", "Blame individuals"],
      ["Follow up with the outcome", "Leave the escalation open"]
    ]}
  ],
  quiz: [
    ["What should every escalation include besides the problem?", "Impact, what has been tried, options and a recommendation with a clear ask."],
    ["Why tell the other team before escalating?", "It keeps trust and gives them a final chance to resolve it."]
  ],
  prac: ["Frame escalations as 'we need a decision', not 'they are blocking us'; it gets faster, less defensive responses."]
});

deepen("com04", {
  sections: [
    {h: "Worked example: incident timeline", table: [
      ["Time", "Event"],
      ["14:02", "Error rate on checkout rises from 0.5% to 18%"],
      ["14:06", "Alert fires; on-call engineer starts investigating"],
      ["14:12", "Incident declared; incident commander and comms lead assigned"],
      ["14:15", "First customer status update posted"],
      ["14:24", "Cause linked to the 13:55 deployment; rollback started"],
      ["14:31", "Rollback complete; error rate back to normal"],
      ["14:45", "Incident resolved; post-mortem scheduled for Thursday"]
    ], p: ["A clear timeline makes the post-mortem factual. Key measures here: 4 minutes to detect, 22 minutes from detection to recovery."]},
    {h: "Post-mortem document outline", bullets: [
      "Summary: what happened, impact (users, revenue, duration) and current status.",
      "Timeline: detection, response, recovery.",
      "Root causes and contributing factors, without blame.",
      "What went well, so it is kept.",
      "Action items, each with an owner and a due date.",
      "Lessons for other teams."
    ]}
  ],
  quiz: [
    ["What does a blameless post-mortem focus on?", "Systems and processes that allowed the failure, not individual fault."],
    ["Name two time measures worth recording in an incident.", "Time to detect and time to recover (or resolve)."]
  ],
  prac: ["Track post-mortem action items like any other project work; unfinished actions are why the same incidents repeat."]
});

deepen("com05", {
  sections: [
    {h: "Worked example: making the case in numbers", table: [
      ["Symptom", "Evidence", "Business effect"],
      ["Slow releases", "Each release needs 3 days of manual testing", "Features reach customers 2 weeks later than competitors"],
      ["Frequent incidents", "6 incidents last quarter in the old billing module", "About 40 hours of engineering time and customer credits"],
      ["Slow onboarding", "New engineers take 8 weeks to be productive in the old code", "Hiring costs more and delivers later"]
    ], p: ["Proposal: spend 20% of capacity for two quarters on the billing module and test automation. Expected result: release testing down to half a day and billing incidents halved, which you then track and report."]},
    {h: "Ways to fund debt work", bullets: [
      "A fixed share of every sprint (often 15 to 20%).",
      "Bundle the fix with a feature that touches the same code.",
      "A dedicated short project with a clear before and after metric.",
      "Fix-it weeks between major releases."
    ]}
  ],
  quiz: [
    ["How do you make technical debt meaningful to executives?", "Translate it into business effects such as slower releases, incidents and cost."],
    ["Name one common way to fund technical debt work.", "A fixed share of sprint capacity, bundling with features, a dedicated project or fix-it weeks."]
  ],
  prac: ["Report the before and after numbers when debt work finishes; it makes the next request much easier to approve."]
});

deepen("com06", {
  sections: [
    {h: "Worked example: a five-slide AI pitch", table: [
      ["Slide", "Content"],
      ["1. The problem", "Support handles 30,000 order-status questions a month; customers wait on average 6 hours"],
      ["2. The proposal", "An assistant that answers order questions from live order data, with handover to an agent"],
      ["3. Evidence", "Pilot with 2,000 conversations: 72% resolved without an agent; satisfaction unchanged"],
      ["4. Cost and return", "Build and running costs against agent hours saved; payback period"],
      ["5. Risks and ask", "Accuracy safeguards, privacy review done, budget and two engineers for one quarter"]
    ]},
    {h: "Handling 'what if it gets things wrong?'", steps: [
      ["Acknowledge", "'It will sometimes be wrong; no system is perfect, including people.'"],
      ["Show the measurement", "'We test against 500 real questions before every release, and our target is 95% correct.'"],
      ["Show the safeguards", "'It only reads order data, never changes it, and hands over to an agent when unsure.'"],
      ["Show monitoring", "'We review flagged answers weekly and can switch it off in minutes.'"]
    ]}
  ],
  quiz: [
    ["What evidence makes an AI pitch more credible than a demo alone?", "Pilot results with real users and measured outcomes."],
    ["What are three parts of a good answer to 'what if it is wrong'?", "How you measure accuracy, the safeguards, and the monitoring or off switch."]
  ],
  prac: ["Pre-wire the pitch: share it one-to-one with the finance and risk stakeholders before the big meeting."]
});

deepen("com07", {
  sections: [
    {h: "Worked example: a dependency agreement", table: [
      ["Field", "Example"],
      ["What", "Order status API returning status and delivery date for an order ID"],
      ["Provider", "Orders team (owner: named lead)"],
      ["Consumer", "AI support assistant team"],
      ["Date needed", "In staging by 10 March, production by 24 March"],
      ["Quality", "Responds within 300 ms for 99% of calls; documented error codes"],
      ["Check-ins", "Weekly 15-minute sync until production"],
      ["If it slips", "Notify within one working day; fallback is a nightly data export"]
    ]},
    {h: "Keeping alignment across teams", bullets: [
      "Keep one shared dependency board visible to every team involved.",
      "Review it in a short weekly meeting with named owners.",
      "Agree interfaces (API contracts, data formats) early and in writing.",
      "Celebrate when another team delivers for you; it builds goodwill for the next request."
    ]}
  ],
  quiz: [
    ["Name four fields in a good dependency agreement.", "What, provider, consumer, date, quality, check-ins, what happens if it slips (any four)."],
    ["Why agree interfaces early?", "Teams can build in parallel and avoid late surprises."]
  ],
  prac: ["Ask the providing team what they need from you too; dependencies run both ways more often than plans show."]
});

deepen("com08", {
  sections: [
    {h: "Worked example: tightening a requirement", table: [
      ["Version", "Text"],
      ["Vague", "The assistant should give good answers about refunds."],
      ["Clearer", "The assistant answers refund questions using the current refund policy page."],
      ["Ready to build", "For questions about refund eligibility, timing or method, the assistant answers only from the refund policy page, cites the section used, and hands over to an agent if the order is over 90 days old or above 500 in value. Target: 95% correct on the 120-question refund test set."]
    ]},
    {h: "Standup formats compared", table: [
      ["Format", "How it works", "Good for"],
      ["Classic three questions", "Yesterday, today, blockers per person", "New teams"],
      ["Walk the board", "Go through work items right to left, focusing on what is stuck", "Teams with many parallel tasks"],
      ["Async written", "Short written updates in chat; meet only for blockers", "Distributed teams across time zones"]
    ]}
  ],
  quiz: [
    ["What turns a vague requirement into a buildable one?", "Specific scope, sources, rules for edge cases and a measurable target."],
    ["What does 'walk the board' focus a standup on?", "Work items, especially what is stuck, rather than each person's activity."]
  ],
  prac: ["End standups at 15 minutes and move problem-solving to a follow-up with only the people needed."]
});

deepen("com09", {
  sections: [
    {h: "Worked example: a first one-to-one with a tech lead", steps: [
      ["Purpose", "'I want to understand how you like to work and how I can be most useful.'"],
      ["Their view", "Ask about the biggest technical risks and what slows the team down."],
      ["History", "Ask what worked and did not work with previous PMs."],
      ["Working agreement", "Agree how decisions are made, how you will raise concerns and how often you meet."],
      ["Follow up", "Act on one thing they mentioned within a week."]
    ]},
    {h: "Behaviours that build or lose trust", table: [
      ["Builds trust", "Loses trust"],
      ["Protects the team from shifting priorities", "Agrees to new scope without asking"],
      ["Admits what you do not know and asks good questions", "Pretends to understand technical detail"],
      ["Brings clear problems and priorities", "Brings solutions dictated to engineers"],
      ["Gives credit publicly", "Takes credit for the team's work"],
      ["Keeps commitments, however small", "Forgets follow-ups"]
    ]}
  ],
  quiz: [
    ["What is one good question to ask a tech lead early on?", "What are the biggest technical risks, or what slows the team down?"],
    ["Name a behaviour that quickly loses engineering trust.", "Agreeing to new scope without asking, or pretending to understand technical detail."]
  ],
  prac: ["Learn enough to ask a good second question; that is what signals real understanding to engineers."]
});

deepen("com10", {
  sections: [
    {h: "Worked example: a 10-minute capstone presentation", table: [
      ["Minute", "Content"],
      ["0 to 1", "The problem and who has it, with one data point"],
      ["1 to 3", "Your solution and a simple architecture diagram"],
      ["3 to 6", "Live demo of the main path, with a recorded backup"],
      ["6 to 8", "How you measured quality: eval set, results and one failure you fixed"],
      ["8 to 9", "Cost, risks and what you would do next"],
      ["9 to 10", "Summary and questions"]
    ]},
    {h: "Handling questions", bullets: [
      "Pause, repeat the question briefly, then answer the part you can.",
      "If you do not know, say so and offer to follow up with a specific date.",
      "Bring the answer back to the problem and the evidence.",
      "Prepare answers to the three hardest questions in advance.",
      "Have backup slides with detail you can show if asked."
    ]}
  ],
  quiz: [
    ["Why keep a recorded backup of a demo?", "Live demos can fail; the backup lets you continue smoothly."],
    ["What should you do if you do not know an answer?", "Say so honestly and commit to a follow-up by a specific date."]
  ],
  prac: ["Rehearse out loud with a timer at least twice; the first rehearsal is usually 30% too long."]
});
