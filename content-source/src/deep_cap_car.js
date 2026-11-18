// Deeper content for Capstone Projects and Career & Brand.
deepen("cap01", {
  sections: [
    {h: "Example input and output", table: [
      ["Input requirement", "Analyzer output"],
      ["'Users should be able to export reports quickly.'", "Ambiguous: 'quickly' has no target; export format not stated; which users? Suggested rewrite: 'Admins can export any report as CSV or PDF within 10 seconds for up to 50,000 rows.' Missing: permissions, large-file behaviour, error handling."]
    ], p: ["Aim for this shape: problems found, a suggested rewrite, and questions to ask. Ten real requirements from past projects make a good test set."]},
    {h: "How to judge your POC", bullets: [
      "Collect 10 to 20 real requirements, including some you know were problematic.",
      "Write down what a senior PM would flag for each, before running the tool.",
      "Run the analyzer and score: issues found, false alarms, usefulness of rewrites.",
      "Change the prompt, re-run the same set, and compare scores.",
      "Record the before and after numbers in your write-up."
    ]}
  ],
  quiz: [
    ["Why write down expected findings before running the tool?", "So you can score the output fairly rather than judging it after the fact."],
    ["What three things should good analyzer output contain?", "Problems found, a suggested rewrite and questions to ask."]
  ],
  prac: ["Keep every prompt version with its score; showing how you improved it is the most interesting part of the case study."]
});

deepen("cap02", {
  sections: [
    {h: "Example: a structured output schema", p: [
      "For a meeting-notes extractor, ask the model to return JSON with fixed fields: decisions (list of text), actions (list of objects with owner, task and due date), risks (list of text) and open_questions (list of text).",
      "Fixed fields make the output easy to show in a table, save to a database or send to a task tool, and easy to check automatically."
    ]},
    {h: "Common problems and fixes", table: [
      ["Problem", "Fix"],
      ["Output is not valid JSON", "Use the provider's structured output or tool-use feature, and validate before saving"],
      ["Fields are missing", "Mark them required in the schema and test with short or messy inputs"],
      ["Invented owners or dates", "Instruct the model to leave a field empty when the source does not say, and test for it"],
      ["Costs grow with long inputs", "Track tokens per call and trim inputs to what is needed"],
      ["API key exposed", "Keep keys in environment variables, never in code or screenshots"]
    ]}
  ],
  quiz: [
    ["Why use a fixed schema for model output?", "It makes output predictable, easy to validate and easy to use in other systems."],
    ["Where should API keys be stored?", "In environment variables or a secrets store, never in code."]
  ],
  prac: ["Include a deliberately messy test input in your demo; showing graceful handling impresses more than a perfect happy path."]
});

deepen("cap03", {
  sections: [
    {h: "Example comparison results", table: [
      ["Measure", "Local model (Ollama)", "Hosted model API"],
      ["Setup time", "About an hour, plus model download", "Minutes, with an API key"],
      ["Speed on a laptop", "Slower, depends on hardware", "Usually faster"],
      ["Quality on your 20 test prompts", "Score it yourself", "Score it yourself"],
      ["Cost", "Free per call; uses your hardware", "Per-token charges"],
      ["Privacy", "Data stays on the machine", "Data sent to the provider under their terms"]
    ], p: ["Fill this in with your own measured numbers. The point of the project is the evidence, not the conclusion."]},
    {h: "When local models make sense", bullets: [
      "Data that must not leave the device or network.",
      "Offline or unreliable connectivity.",
      "Very high volumes of simple tasks where per-token cost adds up.",
      "Experiments and learning without spending money.",
      "Less suitable when you need the strongest reasoning or long context."
    ]}
  ],
  quiz: [
    ["Name two reasons to choose a local model.", "Privacy, offline use, cost at high volume, or free experimentation (any two)."],
    ["What is the main output of this project?", "A measured comparison you can explain, not just a working app."]
  ],
  prac: ["Note your laptop's specs in the write-up; local model speed depends heavily on hardware."]
});

deepen("cap04", {
  sections: [
    {h: "Example benchmark results", table: [
      ["Version", "Correct answers (of 50)", "Answers with correct citation", "Avg response time"],
      ["Baseline: no retrieval", "21", "0", "1.8 s"],
      ["RAG v1: 500-word chunks, top 3", "36", "30", "2.6 s"],
      ["RAG v2: 300-word chunks, top 5, rewritten queries", "43", "40", "3.1 s"]
    ], p: ["Numbers here are illustrative; record your own. A table like this shows reviewers exactly what each change bought and what it cost in speed."]},
    {h: "Debugging wrong answers", steps: [
      ["Check retrieval first", "Were the right passages retrieved? If not, fix chunking, search or the question wording."],
      ["Then check generation", "If the right passages were there, improve instructions, for example 'answer only from the sources'."],
      ["Check the source", "Sometimes the document itself is outdated or contradicts another."],
      ["Add to the test set", "Every bug you find becomes a new benchmark question."]
    ]}
  ],
  quiz: [
    ["When an answer is wrong, what should you check first?", "Whether the right passages were retrieved."],
    ["Why include a no-retrieval baseline?", "It shows how much RAG actually improves results."]
  ],
  prac: ["Keep the benchmark questions fixed between versions; changing questions and system together hides what helped."]
});

deepen("cap05", {
  sections: [
    {h: "Example: tools for a project-tracker MCP server", table: [
      ["Tool", "Inputs", "Returns", "Safety"],
      ["list_open_risks", "project name", "Risks with owner, impact and due date", "Read-only"],
      ["get_milestones", "project name", "Milestones with dates and status", "Read-only"],
      ["add_risk", "project, description, owner, impact", "The new risk's ID", "Ask the user to confirm before writing"]
    ], p: ["Start with read-only tools. Add write tools only with clear names, validation and user confirmation."]},
    {h: "Testing your server", bullets: [
      "Use the MCP Inspector to call each tool directly before connecting an AI client.",
      "Try bad inputs: unknown project, empty fields, very long text.",
      "Connect it to Claude and ask natural questions; check it picks the right tool.",
      "Check the tool descriptions: unclear descriptions are the most common reason the model picks the wrong tool.",
      "Log every call so you can see what the model actually did."
    ]}
  ],
  quiz: [
    ["Why start with read-only tools?", "They cannot change data, so mistakes are low-risk while you learn."],
    ["What is a common reason a model picks the wrong tool?", "Unclear or overlapping tool names and descriptions."]
  ],
  prac: ["Record a short screen capture of Claude using your server; it is the most convincing artefact for your portfolio."]
});

deepen("cap06", {
  sections: [
    {h: "Example task for all three builds", p: [
      "Task: 'Every Monday, collect last week's closed tickets, group them by theme, draft a summary for the product team and post it to a channel.'",
      "Build it as a fixed automation workflow (for example in n8n), as a single agent with tools, and as two or more agents (a researcher and a writer). Use the same input data each time."
    ]},
    {h: "Example comparison", table: [
      ["Measure", "Automation workflow", "Single agent", "Multi-agent"],
      ["Build time", "Shortest", "Medium", "Longest"],
      ["Predictability", "Highest", "Medium", "Lowest"],
      ["Handles unusual weeks", "Poorly", "Well", "Well"],
      ["Cost per run", "Lowest", "Medium", "Highest"],
      ["Debugging", "Easy", "Medium", "Hard"]
    ], p: ["Fill in your own observations. Many teams conclude a workflow with one AI step is enough, which is a valuable finding."]}
  ],
  quiz: [
    ["Why use the same input data for all three builds?", "So differences come from the design, not the data."],
    ["When is a fixed workflow usually the best choice?", "When the steps are known and predictable, and reliability and cost matter most."]
  ],
  prac: ["State your recommendation clearly at the end of the write-up; reviewers want to see judgement, not just three builds."]
});

deepen("cap07", {
  sections: [
    {h: "Example: risk register entries", table: [
      ["Risk", "Likelihood", "Impact", "Mitigation", "Owner"],
      ["Wrong answers about refunds", "Medium", "High", "Eval set gate before release; human handover when unsure", "PM"],
      ["Prompt injection through customer messages", "Medium", "High", "Input filtering; assistant cannot take actions", "Security lead"],
      ["Cost spike from heavy use", "Low", "Medium", "Daily cost alert and per-user limits", "Eng lead"],
      ["Personal data in logs", "Medium", "High", "Redact before logging; 30-day retention", "Data owner"]
    ]},
    {h: "Launch runbook outline", steps: [
      ["Before", "Eval scores above target, security review passed, dashboards and alerts live, support briefed."],
      ["Launch", "Enable for 5% of users behind a feature flag; watch errors, cost and feedback for 48 hours."],
      ["Expand", "Increase to 25%, then 100%, if metrics hold."],
      ["Rollback", "Flag off within minutes; communicate to support and users."],
      ["After", "Weekly review of flagged answers and costs for the first month."]
    ]}
  ],
  quiz: [
    ["What five columns make a useful risk register?", "Risk, likelihood, impact, mitigation and owner."],
    ["Why launch to a small percentage first?", "To catch problems with limited impact and roll back quickly."]
  ],
  prac: ["Ask someone outside the project to read your runbook and find gaps; they will spot assumptions you no longer see."]
});

deepen("car01", {
  sections: [
    {h: "Example 60-second introduction", p: [
      "'I'm a program manager with 11 years of experience delivering software projects across teams of up to 40 people. Recently I've focused on AI: I've built a RAG assistant with citations, an MCP server for project data, and an evaluation set to measure quality. What I enjoy most is turning ambiguous goals into plans engineers trust, and I'm looking for a TPM role where I can lead AI products from pilot to production.'"
    ], bullets: ["Past: experience and scale.", "Present: what you are doing now, with proof.", "Future: what you want and why this role."]},
    {h: "Example STAR story", table: [
      ["Part", "Example"],
      ["Situation", "A payments migration was three weeks behind with a fixed regulatory deadline"],
      ["Task", "I was asked to recover the plan without adding headcount"],
      ["Action", "Mapped dependencies, cut two non-essential features with the sponsor, set up daily cross-team checkpoints and an escalation path"],
      ["Result", "Launched two days before the deadline with no critical incidents; the checkpoint format was adopted by two other programmes"]
    ]}
  ],
  quiz: [
    ["What three parts make a good self-introduction?", "Past experience, present focus with proof, and future goal."],
    ["In STAR, which part should be the longest?", "Action, showing what you personally did."]
  ],
  prac: ["Record yourself giving your introduction and listen back; most people cut 20% after hearing it once."]
});

deepen("car02", {
  sections: [
    {h: "Example scenario answer", p: [
      "Question: 'Your AI feature's accuracy dropped after a model update. What do you do?'",
      "Strong answer outline: confirm the drop with the eval set and production feedback; check what changed (model version, prompt, data); limit impact by rolling back or switching the feature to a safer mode; communicate status to stakeholders; fix and re-run evals before re-release; add the failing cases to the test set and pin model versions with a test step for future updates."
    ]},
    {h: "Common TPM interview themes", table: [
      ["Theme", "What they test"],
      ["Program execution", "Planning, dependencies, recovering a slipping project"],
      ["Technical depth", "System design basics, trade-offs, asking good questions"],
      ["Stakeholder management", "Alignment, conflict, influencing without authority"],
      ["AI judgement", "When to use AI, evals, risks, cost"],
      ["Communication", "Clear, structured answers under pressure"]
    ]}
  ],
  quiz: [
    ["What is the first step when AI accuracy drops after an update?", "Confirm and measure the drop using the eval set and real feedback."],
    ["Name three themes common in TPM interviews.", "Execution, technical depth, stakeholders, AI judgement, communication (any three)."]
  ],
  prac: ["Practise with Claude as interviewer, then ask it to score your answer against a rubric you give it."]
});

deepen("car03", {
  sections: [
    {h: "Before and after bullets", table: [
      ["Before", "After"],
      ["Managed AI chatbot project", "Led launch of an AI support assistant across 3 teams; resolved 40% of order queries without agents within 2 months"],
      ["Responsible for sprint planning", "Introduced dependency reviews in planning, raising sprint completion from 60% to 85% over a quarter"],
      ["Worked with stakeholders on requirements", "Aligned product, legal and security on AI data rules, cutting review time from 6 weeks to 2"]
    ]},
    {h: "Resume checklist", bullets: [
      "Two pages at most; most relevant work first.",
      "A short summary that names the role you want.",
      "Every bullet starts with a strong verb and shows a result.",
      "Numbers wherever honest: size, time, money, percentages.",
      "An AI projects section linking to your portfolio.",
      "Keywords from the job description, used truthfully."
    ]}
  ],
  quiz: [
    ["What turns a duty into an impact bullet?", "Adding what you did and a measurable result."],
    ["Why tailor keywords to the job description?", "Recruiters and screening tools look for them; use them only where true."]
  ],
  prac: ["Ask a friend to read your resume for 30 seconds and say what role you want; if they cannot, rewrite the summary."]
});

deepen("car04", {
  sections: [
    {h: "Example case study outline", table: [
      ["Section", "Content"],
      ["Title", "Cutting support load with a cited RAG assistant"],
      ["Problem", "Agents spent hours answering policy questions; answers were inconsistent"],
      ["My role", "Scoped the MVP, built the prototype with AI help, wrote the eval set"],
      ["Approach", "Architecture diagram, data sources, key decisions and trade-offs"],
      ["Results", "Benchmark table and pilot feedback"],
      ["What I would do next", "Monitoring, more sources, cost controls"]
    ]},
    {h: "Making it easy to review", bullets: [
      "Put a three-line summary at the top.",
      "Use one diagram and one results table rather than many screenshots.",
      "Include a two-minute video demo.",
      "Link to the code or prompts if you can share them.",
      "Be honest about what did not work and what you learned."
    ]}
  ],
  quiz: [
    ["What should be at the top of a case study?", "A short summary of problem, approach and result."],
    ["Why include what did not work?", "It shows judgement and honesty, which hiring managers value."]
  ],
  prac: ["Time a stranger reading your case study; if they cannot explain it after three minutes, simplify it."]
});

deepen("car05", {
  sections: [
    {h: "Example headline and About section", p: [
      "Headline: 'Technical Program Manager | AI products, RAG and agent workflows | 11 years delivering complex software'.",
      "About (opening lines): 'I help teams take AI from pilot to production. Recently I built a cited RAG assistant and an MCP server, and I write about practical AI delivery for program managers.' Follow with three proof points and what you are looking for."
    ]},
    {h: "A simple networking routine", bullets: [
      "Each week, comment thoughtfully on three posts from people in roles you want.",
      "Send two personalised connection requests that mention something specific.",
      "Ask for 20-minute conversations about their work, not for jobs.",
      "Follow up with a thank-you and something useful, such as an article.",
      "Keep a simple list of contacts and when you last spoke."
    ]}
  ],
  quiz: [
    ["What three things should a headline combine?", "Target role, focus areas and credibility such as experience."],
    ["What should a networking conversation ask for?", "Insight into their work, not a job."]
  ],
  prac: ["Update your Featured section with your best case study; it is the first proof visitors see."]
});

deepen("car06", {
  sections: [
    {h: "Example post", p: [
      "Opening line: 'I tested our RAG assistant on 50 real questions. It got 36 right. Here is what took it to 43.'",
      "Body: three short points on what changed (smaller chunks, more results, rewritten queries) and one thing that did not help. Close with a question to readers about their experience."
    ]},
    {h: "Content ideas from your learning", table: [
      ["Format", "Example"],
      ["Lesson learned", "What I got wrong about evals, and how I fixed it"],
      ["Before and after", "A messy requirement and the AI-improved version"],
      ["Explainer", "MCP in plain English for project managers"],
      ["Comparison", "Local versus hosted models: my measured results"],
      ["Checklist", "My AI launch readiness checklist"]
    ]}
  ],
  quiz: [
    ["What makes an opening line effective?", "A specific result or surprise that makes people want to read on."],
    ["Why share what did not work?", "It builds credibility and is more useful to readers."]
  ],
  prac: ["Write posts in a batch once a week and schedule them; consistency matters more than volume."]
});

deepen("car07", {
  sections: [
    {h: "Example weekly routine (about 2 hours)", table: [
      ["Day", "Time", "Activity"],
      ["Monday", "20 min", "Skim one newsletter and the release notes of the tools you use"],
      ["Wednesday", "40 min", "Read one article or paper summary in depth; write three takeaways"],
      ["Friday", "45 min", "Try one new feature hands-on"],
      ["Monthly", "15 min", "Review takeaways; drop sources that rarely help"]
    ]},
    {h: "Questions to ask about any new AI release", bullets: [
      "What problem does it solve that I or my team actually have?",
      "Is it available now, and at what cost?",
      "What evidence is there beyond the announcement?",
      "What would I need to change to use it?",
      "Can I test it in under an hour?"
    ]}
  ],
  quiz: [
    ["What is a sign a source is worth keeping?", "It regularly gives you ideas you use in your work."],
    ["What should you check before adopting a new AI release?", "Whether it solves a real problem, its availability and cost, and evidence beyond the announcement."]
  ],
  prac: ["Keep one running note of takeaways; it becomes material for posts and interviews."]
});

deepen("car08", {
  sections: [
    {h: "Example end-to-end story", p: [
      "'A support team was overwhelmed by policy questions (problem). I framed the problem with data, scoped an MVP and chose RAG over fine-tuning because policies change often (decisions). I built the prototype, wrote a 50-question eval set and improved accuracy from 72% to 86% (evidence). I planned a phased launch with guardrails, monitoring and a rollback (production). Next I would add more sources and cost alerts (next steps).'",
      "This one story touches problem framing, AI fundamentals, evaluation, security and delivery: the whole path."
    ]},
    {h: "Final self-assessment", table: [
      ["Area", "Can I explain it?", "Have I done it?", "Evidence"],
      ["How software and APIs work", "", "", ""],
      ["LLMs, prompting and RAG", "", "", ""],
      ["Agents and MCP", "", "", ""],
      ["Evals and quality", "", "", ""],
      ["Security and responsible AI", "", "", ""],
      ["Delivery and stakeholders", "", "", ""]
    ], p: ["Fill it in honestly. Any row without evidence is your next small project."]}
  ],
  quiz: [
    ["What five parts make a strong end-to-end story?", "Problem, decisions, evidence, production plan and next steps."],
    ["What should you do with an area that has no evidence?", "Pick a small project to create evidence for it."]
  ],
  prac: ["Revisit this self-assessment every three months; it keeps your learning focused on real gaps."]
});
