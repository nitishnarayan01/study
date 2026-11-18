// Phase 5: AI-Enabled PM Craft and Communication & Leadership. URLs returned by live web searches on 16 Nov 2026.
Object.assign(R,{
  gherkinFowler:["Given When Then (Martin Fowler)","https://martinfowler.com/bliki/GivenWhenThen.html","Read"],
  gherkinRef:["Gherkin documentation (Cucumber)","https://docs.cucumber.io/gherkin/","Reference"],
  atlStories:["User stories with examples and a template (Atlassian)","https://www.atlassian.com/agile/project-management/user-stories","Read"],
  scrumGuide:["The 2020 Scrum Guide","https://www.scrumguides.org/scrum-guide.html","Read"],
  riceIntercom:["RICE: simple prioritization for product managers (Intercom)","https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/","Read"],
  nngJourney:["Journey mapping 101 (Nielsen Norman Group)","https://www.nngroup.com/articles/journey-mapping-101/","Read"],
  pairGuide:["People + AI Guidebook (Google PAIR)","https://pair.withgoogle.com/guidebook","Read"],
  haxGuide:["Guidelines for Human-AI Interaction (Microsoft HAX Toolkit)","https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/","Read"],
  ampCohort:["The complete guide to cohort analysis (Amplitude)","https://amplitude.com/explore/analytics/cohort-analysis","Read"],
  mckAi:["The state of AI in 2025 (McKinsey)","https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-state-of-ai-2025","Read"],
  sqlbolt:["SQLBolt: interactive SQL lessons","https://sqlbolt.com/","Do"],
  hbrBluf:["How to write email with military precision (HBR)","https://hbr.org/2016/11/how-to-write-email-with-military-precision","Read"],
  amazonStar:["Amazon interview guide and the STAR method","https://www.aboutamazon.com/news/workplace/amazon-interview-guide","Read"]
});
const PMC="AI-Enabled PM Craft", COM="Communication & Leadership";

addTopic({id:"pmc01",cat:PMC,t:"AI PM tools: ClickUp/Asana AI, Notion AI, ChatPRD, Motion, tl;dv",d:"Use",p:"P1",n:"New",h:3,
what:"AI is now built into the tools PMs use daily: task tools (ClickUp, Asana) summarise and draft tasks; Notion AI drafts and queries documents; ChatPRD helps write product requirements; Motion schedules work automatically; meeting assistants such as tl;dv record, transcribe and summarise meetings. General assistants such as Claude cover much of the same ground.",
why:"These tools can save hours a week, but only if chosen carefully and used with good inputs and checks. Your organisation's data rules also decide which you may use.",
concepts:["Categories: tasks, documents, PRDs, scheduling, meetings","What to automate vs keep human","Data privacy and company policy","Accuracy checks on AI summaries","Avoiding tool sprawl","Measuring time saved"],
learn:["clProjects","nblm"],
doIt:"Pick one weekly task (status report, meeting notes or backlog grooming) and do it with an AI tool for two weeks. Track time spent and errors found.",
prove:"Write a one-page AI toolkit for your team: chosen tools, what each is for, data rules and review steps.",
interview:"Which AI tools do you use as a PM, and how do you make sure their output is reliable?",
covers:["AI Task Automation (ClickUp AI / Asana)","AI Documentation (Notion AI / ChatPRD)","AI Scheduling (Motion)","AI Meeting Assistants (tl;dv)","Notion AI"]},
{sections:[
 {h:"Tool categories",table:[["Need","Examples","Good for","Watch out for"],["Tasks and projects","ClickUp AI, Asana AI","Summaries, task drafts, status rollups","Garbage in, garbage out from messy boards"],["Documents","Notion AI","Drafting, summarising, querying wikis","Confident summaries of outdated pages"],["PRDs","ChatPRD, Claude","First drafts and critiques of requirements","Generic content without your context"],["Scheduling","Motion","Auto-planning tasks into your calendar","Over-packed days"],["Meetings","tl;dv and similar","Transcripts, summaries, action items","Consent and privacy; missed nuance"]]},
 {h:"Choosing well",steps:["Start from a painful, repeated task, not a shiny tool.","Check company policy on data and approved vendors.","Trial with one workflow for two weeks.","Measure time saved and errors caught.","Keep only what earns its place."]},
 {h:"Keep humans in the loop",bullets:["Review every AI summary before sending it to stakeholders.","Ask meeting participants for consent before recording.","Keep decisions and commitments in your own words.","Store prompts that work so the team can reuse them."]},
 {h:"Avoid sprawl",p:["Five overlapping AI tools create more work than they save. Often a general assistant with good project context, such as a Claude Project holding your PRDs and notes, covers most needs."]},
 {h:"Key terms",gloss:[["AI assistant","A tool that drafts, summarises or answers using AI"],["Meeting assistant","A tool that records and summarises meetings"],["Tool sprawl","Too many overlapping tools"],["Approved vendor","A tool cleared by security and legal"],["Prompt library","Saved prompts that work well"]]}
],
quiz:[["What should drive tool choice?","A painful repeated task, not the tool itself."],["What must you check before recording meetings?","Participants' consent and company policy."],["Why review AI summaries?","They can be confidently wrong or miss nuance."],["How do you measure a tool's value?","Time saved and errors caught over a trial."]],
deeper:["clProjects","nblm","clPe"]},
{prac:["Share a short 'how I use AI' note with your team; it spreads good habits and surfaces policy questions early.","Re-check summaries against the transcript for the first few weeks of any meeting tool."],
 mis:[["More AI tools mean more productivity.","Overlap and context switching cancel the gains."],["AI summaries are neutral records.","They omit and simplify; decisions need human confirmation."],["Any tool is fine for company data.","Use only approved tools for confidential information."]]});

addTopic({id:"pmc02",cat:PMC,t:"Writing PRDs and technical specs with AI",d:"Use",p:"P0",n:"Refresh",h:2.5,
what:"A PRD (product requirements document) explains the problem, users, goals, scope, requirements and success measures. A technical spec explains how engineering will build it. AI can draft, structure and critique both, but the thinking and facts must come from you.",
why:"Good PRDs prevent rework. AI makes a strong first draft fast and is an excellent reviewer that spots gaps, contradictions and missing edge cases.",
concepts:["PRD sections","Functional vs non-functional requirements","Feeding AI the right context","Using AI as a critic, not just a writer","Spec handoff to engineering","Keeping PRDs living documents"],
learn:["pmReq","clPe"],
doIt:"Write a half-page problem statement for a feature, give it to Claude with your template, and ask for a PRD draft. Then ask Claude to critique it as a sceptical engineer.",
prove:"Produce a complete PRD for one AI feature including success metrics, risks and an eval plan.",
interview:"Walk me through how you write a PRD and how AI fits into your process.",
covers:["PRD Technical Specifications","AI Product Workflow Design (PRD ideas)","Draft PRDs using AI"]},
{sections:[
 {h:"A practical PRD outline",table:[["Section","Contents"],["Problem","Who has it, evidence, why now"],["Goals and non-goals","What success is and what's out of scope"],["Users and journeys","Personas, key flows"],["Requirements","Functional, non-functional (speed, security, accessibility)"],["Success metrics","Primary and guardrail metrics"],["Risks and dependencies","Technical, legal, team"],["Open questions","Decisions still needed, with owners"],["For AI features","Model approach, eval plan, fallback, cost per task"]]},
 {h:"Working with AI",steps:["Give context: problem statement, users, data, constraints, your template.","Ask for a first draft, clearly labelled as draft.","Ask for critique from roles: engineer, designer, legal, support.","Ask for edge cases and failure scenarios.","Edit in your own voice and check every fact.","Share for human review."],p:["Anthropic's prompt engineering guidance emphasises clear, specific instructions and giving the model relevant context and examples."]},
 {h:"From PRD to spec",bullets:["Engineering writes the technical spec: architecture, data model, APIs, rollout.","The PM reviews it for requirement coverage and scope creep.","Link the two documents both ways."]},
 {h:"Key terms",gloss:[["PRD","Product requirements document"],["Non-goal","Something deliberately out of scope"],["Guardrail metric","A metric that must not get worse"],["Technical spec","Engineering's plan for building it"],["Living document","Updated as decisions change"]]}
],
quiz:[["Name four PRD sections.","Problem, goals, users, requirements, metrics, risks, open questions (any four)."],["How should AI be used beyond drafting?","As a critic from different role perspectives."],["What extra sections do AI features need?","Model approach, eval plan, fallback and cost."],["Who writes the technical spec?","Engineering."]],
deeper:["pmReq","clPe","clEvals"]},
{prac:["Keep a reusable 'PRD critic' prompt; running it before every review catches most gaps.","Put non-goals near the top; they prevent the most arguments."],
 mis:[["AI can write the PRD for you.","It drafts; the insight and accuracy must be yours."],["Longer PRDs are better.","Clear, short PRDs get read."],["PRDs are frozen once approved.","Update them as decisions change."]]});

addTopic({id:"pmc03",cat:PMC,t:"Engineering-ready user stories and Gherkin acceptance criteria",d:"Use",p:"P0",n:"Refresh",h:2,
what:"A user story describes a need from the user's side: 'As a [user], I want [goal], so that [benefit]'. Acceptance criteria define when it's done. Gherkin writes criteria as Given (context), When (action), Then (outcome) scenarios that engineers and testers can use directly.",
why:"Clear stories and criteria cut back-and-forth, make estimates more accurate and turn straight into tests.",
concepts:["Story format and INVEST qualities","Splitting large stories","Acceptance criteria","Gherkin: Given, When, Then, And, But","Edge and error scenarios","Definition of ready and done"],
learn:["atlStories","gherkinFowler","gherkinRef"],
doIt:"Write one user story for 'save card for faster checkout' with four Gherkin scenarios: happy path, expired card, network failure, user removes the card.",
prove:"Take an epic from your backlog, split it into stories, and give each Gherkin acceptance criteria. Ask an engineer to rate how build-ready they are.",
interview:"How do you write acceptance criteria that engineers and QA can actually use?",
covers:["Agile Engineering & User Stories","User Stories & Acceptance Criteria"]},
{sections:[
 {h:"Story basics",p:["Atlassian describes user stories as short descriptions of a need from the user's point of view, commonly written as 'As a [persona], I [want to], [so that].' A good story is small enough to finish in one sprint."],bullets:["Independent","Negotiable","Valuable","Estimable","Small","Testable (together, INVEST)"]},
 {h:"Gherkin in practice",steps:["Given I am a signed-in customer with a saved Visa card","When I start checkout","Then the saved card is selected by default","And I can change it before paying"],p:["Martin Fowler describes Given-When-Then as a style of specifying a system's behaviour using examples: context, event, then expected outcome."]},
 {h:"Cover the edges",table:[["Scenario","Example"],["Happy path","Payment succeeds with saved card"],["Validation","Card expired: prompt to update"],["Failure","Network drops: show retry, don't double charge"],["Permission","User not signed in: ask to sign in"],["Empty state","No saved cards: show add card"]]},
 {h:"Splitting stories",bullets:["By workflow step: add card, use card, remove card.","By rule: domestic cards first, international later.","By data: one payment type at a time.","Avoid splitting by layer (UI story, API story); each story should deliver user value."]},
 {h:"Key terms",gloss:[["User story","A short description of a user need"],["Acceptance criteria","Conditions for a story to be done"],["Gherkin","Given-When-Then language for scenarios"],["INVEST","Qualities of a good story"],["Definition of done","Team-wide checklist for finished work"]]}
],
quiz:[["What is the user story template?","As a [persona], I want [goal], so that [benefit]."],["What does Given describe?","The starting context."],["Why include failure scenarios?","They're where most bugs and arguments come from."],["Why not split stories by layer?","Each story should deliver user value on its own."]],
deeper:["atlStories","gherkinFowler","gherkinRef"]},
{prac:["Ask Claude to propose missing scenarios for every story; it reliably finds two or three you skipped.","Review stories with QA before sprint planning, not after."],
 mis:[["Acceptance criteria are QA's job.","PMs own them; QA and engineering refine them."],["Gherkin is only for automated tests.","It's useful even as plain-language criteria."],["Bigger stories save planning time.","They hide risk and are harder to estimate."]]});

addTopic({id:"pmc04",cat:PMC,t:"SDLC, agile and sprint lifecycle with AI",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"The software development lifecycle (SDLC) runs from idea through requirements, design, build, test, release and operate. Agile approaches such as Scrum deliver in short iterations (sprints) with planning, daily standups, reviews and retrospectives. AI now helps at every step.",
why:"You already know agile; the opportunity is applying AI to cut overhead and improve quality in each ceremony without losing the human conversations.",
concepts:["SDLC phases","Waterfall vs agile vs hybrid","Scrum events and artefacts","Product goal, sprint goal, definition of done","AI in planning, standups, reviews and retros","Measuring flow"],
learn:["scrumGuide"],
doIt:"For your next sprint, use AI for one ceremony: summarise the backlog before planning, or cluster retro comments into themes.",
prove:"Write a 'sprint with AI' playbook: what AI does in each event and what stays human.",
interview:"How have you used AI to improve your team's agile process?",
covers:["SDLC Methodologies","Sprint Lifecycle Management"]},
{sections:[
 {h:"Scrum in one table",table:[["Event","Purpose","AI can help by"],["Sprint planning","Choose sprint goal and work","Summarising backlog items and dependencies"],["Daily scrum","Inspect progress toward the goal","Summarising board changes and blockers"],["Sprint review","Show results, get feedback","Drafting release notes and demo scripts"],["Retrospective","Improve how the team works","Clustering feedback into themes"]],p:["The 2020 Scrum Guide introduced a product goal as the commitment for the product backlog, alongside the sprint goal and the definition of done."]},
 {h:"Choosing an approach",table:[["Approach","Fits"],["Scrum","Product teams with evolving requirements"],["Kanban","Continuous flow work like support or platform"],["Waterfall or phased","Fixed-scope, regulated or hardware-heavy work"],["Hybrid","Large programmes mixing teams and vendors"]]},
 {h:"Where AI shouldn't replace people",bullets:["Agreeing priorities and trade-offs.","Team morale and conflict in retros.","Commitments to stakeholders.","Final judgement on quality."]},
 {h:"Key terms",gloss:[["SDLC","Software development lifecycle"],["Sprint","A fixed time box, often two weeks"],["Sprint goal","The objective for a sprint"],["Definition of done","Shared standard for finished work"],["Retrospective","Meeting to improve how the team works"]]}
],
quiz:[["What are the four Scrum events (besides the sprint)?","Planning, daily scrum, review, retrospective."],["What did the 2020 Scrum Guide add?","The product goal."],["Give one way AI helps retros.","Clustering feedback into themes."],["What should stay human?","Priorities, commitments, morale and final quality judgement."]],
deeper:["scrumGuide","atlStories"]},
{prac:["Introduce one AI change per sprint and ask the team in the retro if it helped.","Keep AI summaries visible and editable, so the team corrects them."],
 mis:[["Agile means no planning.","It means planning often in small steps."],["AI can run ceremonies.","It supports them; people decide."],["One framework fits all teams.","Pick per type of work."]]});

addTopic({id:"pmc05",cat:PMC,t:"QA, UAT and release sign-off",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"QA (quality assurance) checks the product works as specified. UAT (user acceptance testing) checks it meets real users' or business owners' needs before release. Release sign-off is the formal agreement that a release is ready, based on evidence.",
why:"TPMs often own the release decision process. Clear entry and exit criteria prevent both risky launches and endless delays.",
concepts:["QA vs UAT","Test plans and coverage","Entry and exit criteria","Defect severity and triage","Go/no-go meetings","AI features: eval results as sign-off evidence"],
learn:["testPyramid","clEvals"],
doIt:"Write UAT scenarios for a feature from the business owner's point of view, separate from QA test cases.",
prove:"Create a release sign-off checklist with exit criteria, including AI eval thresholds and known issues.",
interview:"QA found three medium bugs the day before launch. How do you decide whether to ship?",
covers:["QA & UAT Governance"]},
{sections:[
 {h:"QA vs UAT",table:[["Aspect","QA","UAT"],["Question","Does it work as specified?","Does it meet our needs?"],["Who","QA engineers, automated tests","Business users, product owners"],["Based on","Requirements and acceptance criteria","Real tasks and workflows"],["When","Throughout development","Near release"]]},
 {h:"Severity and triage",table:[["Severity","Example","Typical rule"],["Critical","Payments fail, data loss","Blocks release"],["High","Major feature broken for many users","Blocks unless workaround and approval"],["Medium","Feature works with friction","Ship with fix planned"],["Low","Cosmetic","Backlog"]]},
 {h:"Go/no-go",steps:["Review exit criteria: tests passed, no open critical bugs, performance and security checks done.","For AI features, check eval scores against thresholds.","Review known issues and workarounds.","Confirm rollback plan and monitoring.","Record decision, approvers and conditions."]},
 {h:"Key terms",gloss:[["QA","Checking the product meets specifications"],["UAT","Users confirming it meets their needs"],["Exit criteria","Conditions to finish testing and release"],["Go/no-go","Formal release decision meeting"],["Known issue","An accepted defect shipped with a plan"]]}
],
quiz:[["How does UAT differ from QA?","UAT checks business needs with users; QA checks against specifications."],["What usually blocks a release?","Critical defects."],["What extra evidence do AI features need?","Eval scores against thresholds."],["What should a go/no-go decision record?","Decision, approvers, conditions and known issues."]],
deeper:["testPyramid","clEvals"]},
{prac:["Agree severity definitions with stakeholders before testing starts.","Keep the go/no-go to 30 minutes by circulating evidence a day ahead."],
 mis:[["UAT is a second round of QA.","It tests fitness for real use, not specs."],["Zero bugs before release.","Zero critical bugs; others are managed."],["Sign-off is a formality.","It's accountability; record conditions."]]});

addTopic({id:"pmc06",cat:PMC,t:"Problem framing and user journeys",d:"Use",p:"P0",n:"Refresh",h:2,
what:"Problem framing defines the right problem before solutions: who has it, what they're trying to do, what gets in the way and how we'll know it's solved. A user journey map visualises the steps a person takes to reach a goal, with thoughts, feelings and pain points, which reveals edge cases.",
why:"Teams often build the wrong thing well. Framing and journey mapping keep AI features focused on real needs rather than 'add AI'.",
concepts:["Problem statements","Jobs to be done","Evidence: data, interviews, support tickets","Journey stages, actions, thoughts, emotions","Pain points and opportunities","Edge cases from the journey"],
learn:["nngJourney","pairGuide"],
doIt:"Map the journey of a customer raising a refund request in a product you know. Mark the three worst pain points.",
prove:"Write a one-page problem brief with evidence, journey map and two solution options (one with AI, one without).",
interview:"Leadership wants 'an AI feature'. How do you decide what to build?",
covers:["Problem Framing","User Journey Mapping","Identifying Edge Cases"]},
{sections:[
 {h:"A good problem statement",p:["[User] needs a way to [goal] because [insight], but today [obstacle], which causes [impact]. Back each part with evidence: analytics, interviews, tickets or sales notes."]},
 {h:"Journey map parts",table:[["Part","Example (refund)"],["Actor","Online shopper with a damaged item"],["Stages","Notice, find help, submit request, wait, get money"],["Actions","Searches 'refund', fills form, uploads photo"],["Thoughts and feelings","'Will they believe me?' Frustrated while waiting"],["Pain points","No status updates, photo upload fails"],["Opportunities","Proactive status, instant approval for low-value items"]],p:["Nielsen Norman Group defines a journey map as a visualisation of the process a person goes through to accomplish a goal."]},
 {h:"Should this use AI?",p:["Google's People + AI Guidebook encourages teams to check whether AI adds value: some tasks need predictability, full transparency or are ones users want to do themselves. Rules or better UX may solve the problem more reliably."]},
 {h:"Finding edge cases",bullets:["Walk the journey for different users: new, power, low literacy, poor network.","Ask 'what if this step fails?' at each stage.","Check support tickets for real failures."]},
 {h:"Key terms",gloss:[["Problem framing","Defining the right problem before solutions"],["Jobs to be done","The progress a user is trying to make"],["Journey map","Visualisation of steps toward a goal"],["Pain point","Where users struggle"],["Edge case","An unusual but possible situation"]]}
],
quiz:[["What should back a problem statement?","Evidence: data, interviews, tickets."],["Name three journey map parts.","Actor, stages, actions, thoughts and feelings, pain points, opportunities (any three)."],["When might AI not be the answer?","When the task needs predictability or transparency, or rules solve it."],["How do journey maps reveal edge cases?","Walking each step for different users and failures."]],
deeper:["nngJourney","pairGuide"]},
{prac:["Always present a non-AI option next to the AI one; it builds credibility and sometimes wins.","Read 20 support tickets before framing a problem; they ground everything."],
 mis:[["Start with the solution.","Start with the user's problem."],["Journey maps are a design artefact only.","They're planning tools for PMs too."],["AI makes any feature better.","Sometimes it adds cost and unpredictability."]]});

addTopic({id:"pmc07",cat:PMC,t:"Feasibility, build vs buy and MVP scoping",d:"Use",p:"P0",n:"Refresh",h:2,
what:"Feasibility asks whether something can be built with available technology, data, skills, time and money. Build vs buy compares building in-house with buying a product or API. MVP scoping cuts the idea down to the smallest version that tests the riskiest assumption with real users.",
why:"AI makes it easy to over-promise. Honest feasibility and tight MVPs protect credibility and budgets.",
concepts:["Technical, data, operational and financial feasibility","Spikes and prototypes","Build vs buy vs partner","Total cost of ownership","MVP vs MLP and the riskiest assumption","Trade-offs: scope, quality, time"],
learn:["anthAgents","clChoose"],
doIt:"For an AI support assistant, list the riskiest assumption and design the smallest test of it.",
prove:"Write a build vs buy recommendation with a cost table over two years.",
interview:"How would you scope an MVP for an AI feature with a tight deadline?",
covers:["Technical Feasibility","Build vs Buy Analysis","MVP Scoping","MVP Definition & Tradeoffs","Product requirement discussion (MVP tradeoffs)"]},
{sections:[
 {h:"Feasibility checklist",table:[["Area","Question"],["Technical","Can current models and tools do this at the quality needed?"],["Data","Do we have the data, rights and quality?"],["Operational","Who runs, monitors and supports it?"],["Financial","Is cost per use acceptable at scale?"],["Legal and risk","Any regulatory or reputational blockers?"]],p:["A short spike or prototype of a week or two answers most technical questions faster than debate."]},
 {h:"Build vs buy",table:[["Option","Pros","Cons"],["Build","Control, differentiation, IP","Time, talent, maintenance"],["Buy (SaaS)","Fast, proven","Less control, vendor lock-in, data concerns"],["API plus build","Use models via API, build product around them","Ongoing usage cost, provider dependency"],["Partner","Shared risk and expertise","Coordination, shared upside"]],p:["Compare total cost of ownership over two to three years: licences or usage, build effort, maintenance, support and switching costs."]},
 {h:"Scoping an AI MVP",steps:["Name the riskiest assumption, such as 'the model can answer 80% of tier-1 questions correctly'.","Choose the smallest test: one topic, one channel, internal users first.","Define success and stop criteria up front.","Keep a human fallback.","Plan what you'll learn, not just what you'll ship."],p:["Anthropic's guidance on agents recommends starting with the simplest solution and adding complexity only when it clearly improves outcomes."]},
 {h:"Key terms",gloss:[["Feasibility","Whether something can realistically be done"],["Spike","A short time-boxed investigation"],["TCO","Total cost of ownership"],["MVP","Minimum viable product"],["Riskiest assumption","The belief most likely to sink the idea"]]}
],
quiz:[["Name four feasibility areas.","Technical, data, operational, financial, legal (any four)."],["What does TCO include?","Licences or usage, build, maintenance, support, switching."],["What should an AI MVP test first?","The riskiest assumption."],["Why keep a human fallback?","To protect users while quality is unproven."]],
deeper:["anthAgents","clChoose","clPrice"]},
{prac:["Write stop criteria before starting a pilot; it makes killing a weak idea painless.","Ask vendors for a pilot on your data, not their demo."],
 mis:[["MVP means low quality.","It means small scope with acceptable quality."],["Buying is always faster.","Integration and procurement take time."],["If the demo works, it's feasible.","Real data and edge cases often differ."]]});

addTopic({id:"pmc08",cat:PMC,t:"Success metrics, risks, dependencies and cost estimation",d:"Use",p:"P0",n:"Refresh",h:2,
what:"Planning a feature means defining how success is measured, which risks could derail it, which teams and systems it depends on, whether it scales and stays secure, and what it will cost to build and run.",
why:"These are the questions leadership asks in every review. Having them ready, especially for AI features with variable costs, builds trust.",
concepts:["North star, primary and guardrail metrics","Leading vs lagging indicators","Risk register: likelihood, impact, mitigation, owner","Dependency mapping","Scalability and security considerations","Build cost vs run cost"],
learn:["clPrice","nistRmf"],
doIt:"For an AI feature, write one primary metric, two guardrail metrics, three top risks and the monthly run cost at expected usage.",
prove:"Create a planning pack: metrics tree, risk register, dependency map and cost estimate.",
interview:"How do you measure success for an AI feature?",
covers:["Defining Success Metrics","Risk Assessment","Dependency Mapping","Scalability Considerations","Security & Compliance","Cost Estimation"]},
{sections:[
 {h:"Metrics",table:[["Type","Example for AI support assistant"],["Primary","Share of chats resolved without human handoff"],["Quality","Answer accuracy on sampled conversations"],["Guardrail","Customer satisfaction must not drop; escalation complaints"],["Leading","Weekly active users of the assistant"],["Cost","Cost per resolved conversation"]]},
 {h:"Risk register",table:[["Risk","Likelihood","Impact","Mitigation","Owner"],["Wrong answers about refunds","Medium","High","Grounding, evals, human review of refund topics","AI lead"],["Vendor price change","Low","Medium","Abstraction layer, budget alerts","TPM"],["Data privacy concern","Medium","High","Masking, legal review","Security"]]},
 {h:"Dependencies",bullets:["Teams: data, platform, security, legal, support.","Systems: CRM, knowledge base, identity.","Vendors: model provider, vector database.","Show them on a simple map with dates and owners."]},
 {h:"Cost estimate",p:["Separate build cost (people, months) from run cost (model usage, hosting, monitoring, human review). For AI, run cost scales with usage, so show it at low, expected and high adoption."]},
 {h:"Key terms",gloss:[["Guardrail metric","A metric that must not worsen"],["Leading indicator","An early signal of future results"],["Risk register","List of risks with owners and mitigations"],["Dependency map","Visual of what the work relies on"],["Run cost","Ongoing cost to operate"]]}
],
quiz:[["What is a guardrail metric?","A metric that must not get worse while you optimise another."],["What does a risk register record?","Risk, likelihood, impact, mitigation, owner."],["Why show AI run cost at several adoption levels?","Because it scales with usage."],["Name two dependency types.","Teams, systems, vendors (any two)."]],
deeper:["clPrice","nistRmf"]},
{prac:["Review the risk register every two weeks; stale registers give false comfort.","Always pair a success metric with a guardrail."],
 mis:[["Usage proves success.","Quality and outcomes matter more than clicks."],["Risks are for big projects.","Even small AI features carry real risks."],["Build cost is the main cost.","For AI, run cost often dominates."]]});

addTopic({id:"pmc09",cat:PMC,t:"Prioritisation: RICE, Kano, MoSCoW",d:"Use",p:"P0",n:"Refresh",h:1,
what:"Prioritisation frameworks make trade-offs explicit. RICE scores ideas by Reach × Impact × Confidence ÷ Effort. Kano classifies features by how they affect satisfaction (basic, performance, delighter). MoSCoW sorts scope into Must, Should, Could and Won't for a release.",
why:"Stakeholders always want more than capacity allows. Frameworks turn arguments into structured conversations.",
concepts:["RICE formula and scales","Confidence as honesty about evidence","Kano categories","MoSCoW for release scope","When frameworks don't fit: compliance, tech debt, strategic bets","Using AI to score and challenge"],
learn:["riceIntercom"],
doIt:"Score five backlog items with RICE in a spreadsheet, then ask Claude to challenge the impact and confidence values.",
prove:"Present a prioritised roadmap slice with RICE scores and the reasoning behind any items you overrode.",
interview:"Two senior stakeholders want different features first. How do you decide?",
covers:["Feature Prioritization"]},
{sections:[
 {h:"RICE",table:[["Factor","Meaning","Example"],["Reach","People affected per period","2,000 users a month"],["Impact","Effect per person (3 massive to 0.25 minimal)","2"],["Confidence","How sure you are (100%, 80%, 50%)","80%"],["Effort","Person-months","2"]],p:["Intercom introduced RICE to make prioritisation more consistent; the score is Reach × Impact × Confidence ÷ Effort. Here: 2,000 × 2 × 0.8 ÷ 2 = 1,600."]},
 {h:"Kano",table:[["Category","Example","Effect"],["Basic","Login works","Absent: anger; present: no praise"],["Performance","Faster search","More is better"],["Delighter","Smart suggestions","Unexpected joy; absent: no complaint"]]},
 {h:"MoSCoW",bullets:["Must: release fails without it.","Should: important, can slip if needed.","Could: nice to have.","Won't (this time): explicitly out, which prevents scope creep."]},
 {h:"Limits",p:["Mandatory compliance work, security fixes and strategic bets don't score well on RICE. Handle them as separate allocations, such as 20% of capacity for tech health."]},
 {h:"Key terms",gloss:[["RICE","Reach, Impact, Confidence, Effort"],["Kano model","Classifies features by effect on satisfaction"],["MoSCoW","Must, Should, Could, Won't"],["Confidence","How much evidence supports estimates"],["Capacity allocation","Reserving share of capacity for certain work"]]}
],
quiz:[["What is the RICE formula?","Reach × Impact × Confidence ÷ Effort."],["What is a Kano basic feature?","Expected; its absence angers users."],["What does the W in MoSCoW mean?","Won't have this time."],["What work doesn't suit RICE?","Compliance, security fixes, strategic bets."]],
deeper:["riceIntercom"]},
{prac:["Show scores and reasoning openly; transparency matters more than precision.","Re-score quarterly as evidence changes confidence."],
 mis:[["The highest score always wins.","Scores inform judgement; they don't replace it."],["Frameworks remove politics.","They make trade-offs visible, which helps."],["Confidence is optional.","It's what keeps guesses honest."]]});

addTopic({id:"pmc10",cat:PMC,t:"AI value, ROI and business use cases",d:"Use",p:"P0",n:"New",h:2.5,
what:"AI ROI compares the value an AI use case creates (time saved, revenue gained, cost avoided, quality improved) with its full cost (build, run, review, risk). Good business cases focus on specific workflows with measurable baselines.",
why:"Leaders are asking where AI pays off. Surveys show broad AI use but less measurable bottom-line impact, so credible ROI cases stand out.",
concepts:["Value levers: efficiency, revenue, quality, risk","Baselines and counterfactuals","Full cost including human review","Payback period","Common high-value use cases","Measuring after launch"],
learn:["mckAi","clPrice"],
doIt:"Pick one workflow (such as drafting support replies) and estimate hours saved per month, cost of AI and payback period.",
prove:"Write a one-page AI business case with baseline, expected value, full cost, risks and how you'll measure it.",
interview:"How would you build the business case for an AI initiative?",
covers:["AI Value Proposition & ROI","AI Business Use Cases","Engineering ROI"]},
{sections:[
 {h:"Where value comes from",table:[["Lever","Example","Measure"],["Efficiency","Draft replies for agents","Handle time per ticket"],["Revenue","Personalised recommendations","Conversion, order value"],["Quality","Code review assistance","Defects found earlier"],["Risk","Contract clause screening","Issues caught before signing"]],p:["McKinsey's 2025 State of AI survey found 88% of respondents' organisations use AI regularly in at least one function, yet most are still piloting rather than scaling, and enterprise-wide bottom-line impact remains uncommon."]},
 {h:"A simple ROI model",steps:["Baseline: 4,000 tickets a month × 8 minutes = 533 hours.","With AI drafts: 5 minutes per ticket, so 333 hours: 200 hours saved.","Value: 200 hours × loaded hourly cost.","Cost: model usage + build amortised + review time + monitoring.","ROI = (value − cost) ÷ cost; payback = build cost ÷ monthly net value."]},
 {h:"Common traps",bullets:["Counting time saved that isn't redeployed to useful work.","Ignoring human review and error correction time.","Using vendor benchmarks instead of your own baseline.","Forgetting change management and training."]},
 {h:"Key terms",gloss:[["ROI","Return on investment"],["Baseline","Current performance before change"],["Payback period","Time for benefits to cover costs"],["Loaded cost","Salary plus overheads per hour"],["Counterfactual","What would have happened without the change"]]}
],
quiz:[["Name the four value levers.","Efficiency, revenue, quality, risk."],["What's the ROI formula?","(Value − cost) ÷ cost."],["Name a common ROI trap.","Unredeployed time, ignoring review time, vendor benchmarks, no change management (any one)."],["Why measure a baseline first?","You can't prove improvement without it."]],
deeper:["mckAi","clPrice"]},
{prac:["Measure the baseline before the pilot starts; it's impossible to reconstruct later.","Present ranges (conservative, expected) rather than single numbers."],
 mis:[["AI ROI is obvious.","Most organisations struggle to show bottom-line impact."],["Time saved equals money saved.","Only if the time is redeployed."],["Run cost is negligible.","At scale it can be significant."]]});

addTopic({id:"pmc11",cat:PMC,t:"AI adoption and transformation strategy",d:"Understand",p:"P1",n:"New",h:2,
what:"AI transformation means changing how an organisation works with AI, not just running pilots. It covers strategy, use-case portfolio, platforms, skills, governance, workflow redesign and change management.",
why:"Many companies are stuck in pilot mode. TPMs who can run adoption programmes and redesign workflows are in demand.",
concepts:["From pilots to scale","Use-case portfolio and prioritisation","Shared platforms and guardrails","Skills and training","Workflow redesign","Adoption metrics and change management"],
learn:["mckAi","nistRmf"],
doIt:"List the AI pilots in your organisation (or an imagined one) and classify each: scale, iterate or stop.",
prove:"Draft a 90-day AI adoption plan for a team: goals, use cases, training, governance and metrics.",
interview:"How would you help an organisation move from AI pilots to real impact?",
covers:["AI Transformation Strategy"]},
{sections:[
 {h:"Why pilots stall",bullets:["No clear owner or business metric.","Bolted onto old workflows instead of redesigning them.","Data access and security blockers.","No budget path from pilot to production.","Users not trained or not trusting the tool."],p:["McKinsey's 2025 survey reported that most organisations had not embedded AI deeply enough into workflows to realise enterprise-level benefits, and that high performers were more likely to redesign workflows."]},
 {h:"A practical roadmap",steps:["Set direction: two or three business outcomes AI should move.","Build a portfolio: quick wins, core bets and experiments.","Provide a platform: approved tools, data access, guardrails.","Train people by role, with real tasks.","Redesign workflows around AI, not the other way round.","Measure adoption and outcomes; scale what works, stop what doesn't."]},
 {h:"Adoption metrics",table:[["Metric","Shows"],["Active users / eligible users","Reach"],["Tasks completed with AI","Depth"],["Time or quality improvement","Value"],["User satisfaction and trust","Sustainability"]]},
 {h:"Key terms",gloss:[["Transformation","Changing how work is done, not just adding tools"],["Use-case portfolio","Balanced set of AI initiatives"],["Workflow redesign","Rebuilding processes around new capabilities"],["Change management","Helping people adopt new ways of working"],["Pilot purgatory","Pilots that never scale"]]}
],
quiz:[["Name two reasons pilots stall.","No owner, no workflow redesign, data blockers, no budget path, no training (any two)."],["What do high performers do differently?","Redesign workflows and think big."],["Name an adoption metric.","Active users, tasks with AI, improvement, satisfaction."],["What's a use-case portfolio?","A balanced set of quick wins, core bets and experiments."]],
deeper:["mckAi","nistRmf"]},
{prac:["Give every AI use case a business owner, not just a tech owner.","Celebrate stopped pilots; it frees resources for winners."],
 mis:[["Buying licences is transformation.","Adoption and workflow change are the work."],["Start with the biggest use case.","Balance quick wins with core bets."],["Training is a one-off.","Skills need continuous practice as tools change."]]});

addTopic({id:"pmc12",cat:PMC,t:"SaaS metrics, retention and cohorts",d:"Understand",p:"P1",n:"Refresh",h:2,
what:"SaaS businesses track recurring revenue (MRR, ARR), growth, churn, retention, customer acquisition cost (CAC) and lifetime value (LTV). Cohort analysis groups users by when they started (or what they did) and tracks their behaviour over time to reveal real retention patterns.",
why:"AI features are judged by their effect on these numbers. TPMs who read them can connect delivery work to business outcomes.",
concepts:["MRR and ARR","Logo churn vs revenue churn","Net revenue retention","CAC, LTV and payback","Acquisition and behavioural cohorts","Retention curves"],
learn:["ampCohort"],
doIt:"Draw a cohort table for four monthly signup cohorts with made-up retention, then describe what improved and when.",
prove:"Analyse whether an AI feature improved retention by comparing users who adopted it with similar users who didn't.",
interview:"How would you tell if a new feature improved retention?",
covers:["SaaS Business & Health Metrics","Retention & Cohort Analysis"]},
{sections:[
 {h:"Core metrics",table:[["Metric","Meaning"],["MRR / ARR","Monthly / annual recurring revenue"],["Churn","Share of customers or revenue lost in a period"],["Net revenue retention","Revenue from existing customers now vs a year ago, including expansion"],["CAC","Cost to acquire a customer"],["LTV","Revenue a customer brings over their lifetime"],["CAC payback","Months to recover CAC"]]},
 {h:"Reading cohorts",table:[["Signup month","Month 1","Month 2","Month 3"],["January","100%","45%","38%"],["February","100%","48%","41%"],["March (AI onboarding)","100%","58%","52%"]],p:["Amplitude describes cohort analysis as grouping users by shared traits to reveal retention patterns over time. A curve that flattens means a core of users keeps finding value."]},
 {h:"Attributing to features",bullets:["Compare adopters with similar non-adopters, not with everyone.","Watch for selection bias: engaged users try new features first.","Use experiments (A/B tests) when possible.","Look at retention a few weeks after adoption, not on day one."]},
 {h:"Key terms",gloss:[["MRR","Monthly recurring revenue"],["Churn","Customers or revenue lost"],["NRR","Net revenue retention"],["Cohort","Group of users sharing a start date or behaviour"],["Retention curve","Share of a cohort still active over time"]]}
],
quiz:[["What is net revenue retention?","Revenue from existing customers now versus a year ago, including expansion and churn."],["What is a cohort?","A group of users sharing a start date or behaviour."],["Why compare adopters to similar non-adopters?","To reduce selection bias."],["What does a flattening retention curve mean?","A core of users keeps getting value."]],
deeper:["ampCohort"]},
{prac:["Ask for cohort charts, not averages, when judging feature impact.","Pair retention with cost-to-serve for AI features."],
 mis:[["More signups mean growth.","Without retention, it's a leaky bucket."],["Feature users retain better, so the feature works.","Engaged users adopt more; test properly."],["Churn is one number.","Logo and revenue churn tell different stories."]]});

addTopic({id:"pmc13",cat:PMC,t:"UX patterns for AI features",d:"Understand",p:"P1",n:"New",h:1.5,
what:"AI features need UX patterns that set expectations, show uncertainty, let users correct and control outputs, explain sources and recover gracefully from errors. Google's People + AI Guidebook and Microsoft's 18 Guidelines for Human-AI Interaction collect proven patterns.",
why:"Trust is the main barrier to AI adoption. Good UX makes AI useful even when it's sometimes wrong.",
concepts:["Setting expectations on what AI can do","Showing sources and confidence","Easy correction, undo and feedback","User control and opt-out","Graceful failure and handoff","Calibrated trust"],
learn:["pairGuide","haxGuide"],
doIt:"Review an AI feature you use and check it against five of Microsoft's guidelines. Note where it falls short.",
prove:"Write UX requirements for an AI assistant: expectation setting, citations, feedback, undo and failure states.",
interview:"How would you design an AI feature so users trust it the right amount?",
covers:["Added: UX patterns for AI features"]},
{sections:[
 {h:"Core patterns",table:[["Pattern","Example"],["Set expectations","'I can answer questions about your orders and returns.'"],["Show sources","Citations linking to the policy used"],["Signal uncertainty","'I'm not sure; here's who can help.'"],["Easy correction","Edit, regenerate, thumbs down with reason"],["User control","Turn suggestions off, approve before send"],["Graceful failure","Clear fallback and human handoff"]],p:["Microsoft's HAX Toolkit is built around 18 guidelines for human-AI interaction, from making clear what the system can do to supporting efficient correction and dismissal."]},
 {h:"Calibrated trust",p:["The goal is not maximum trust but the right amount: users should rely on AI where it's good and check it where it isn't. Google's People + AI Guidebook covers explainability and trust as a core chapter."]},
 {h:"Design checklist",bullets:["Is it clear the user is interacting with AI?","Can users see why an answer was given?","Can they fix or undo it in one step?","Do high-stakes actions need confirmation?","Is feedback captured and used?"]},
 {h:"Key terms",gloss:[["Calibrated trust","Trust that matches actual reliability"],["Citation","A link to the source behind an answer"],["Human handoff","Passing the user to a person"],["Feedback loop","Using user corrections to improve"],["Explainability","Helping users understand why AI did something"]]}
],
quiz:[["What is calibrated trust?","Trust that matches how reliable the AI actually is."],["Name three AI UX patterns.","Set expectations, sources, uncertainty, correction, control, graceful failure (any three)."],["How many HAX guidelines are there?","18."],["Why show sources?","So users can verify answers."]],
deeper:["pairGuide","haxGuide"]},
{prac:["Add AI UX checks to design reviews, using the HAX guidelines as the checklist.","Track 'regenerate' and 'edit' rates; they show where users distrust output."],
 mis:[["Hide that it's AI for a smoother experience.","Transparency builds appropriate trust."],["Confidence scores always help.","Raw numbers can confuse; use plain language."],["Users will report problems.","Make feedback one tap or you won't get it."]]});

addTopic({id:"pmc14",cat:PMC,t:"Estimating AI work in project plans",d:"Use",p:"P0",n:"New",h:1.5,
what:"AI projects have extra uncertainty: whether quality targets can be met, how much data work is needed and how many iterations evals will take. Good plans time-box exploration, include eval and data tasks explicitly, and use milestones based on measured quality.",
why:"Teams often plan AI work like normal features and then miss dates. Realistic plans protect credibility.",
concepts:["Exploration vs execution phases","Time-boxed spikes","Quality-gated milestones","Data preparation effort","Eval creation and iteration","Contingency and ranges"],
learn:["anthAgentEvals","hamelEvals"],
doIt:"Break an AI feature into phases (explore, build, evaluate, harden, launch) with estimates and the quality gate for each.",
prove:"Create a project plan for an AI feature with ranges, quality gates and explicit eval and data tasks.",
interview:"How do you estimate a project when you don't know if the AI can reach the quality bar?",
covers:["Added: AI cost and effort estimation"]},
{sections:[
 {h:"Phases and gates",table:[["Phase","Typical length","Gate to pass"],["Explore","1 to 2 weeks","Prototype hits a minimum score on a small eval set"],["Build","2 to 6 weeks","Integrated with real data and tools"],["Evaluate and iterate","2 to 4 weeks","Meets quality thresholds on full eval set"],["Harden","1 to 3 weeks","Guardrails, monitoring, cost and latency in budget"],["Launch","1 to 2 weeks","Staged rollout healthy"]]},
 {h:"Work often missed",bullets:["Writing and labelling eval cases.","Cleaning and preparing data or documents.","Prompt and retrieval iteration cycles.","Security and legal reviews.","Human review tooling and process.","Monitoring and cost dashboards."],p:["Anthropic's guidance on evaluating agents recommends building evals early and treating them as part of development."]},
 {h:"Communicating uncertainty",bullets:["Give ranges ('6 to 10 weeks'), narrowing after each gate.","Make the explore gate a go/no-go decision.","Report quality trends, not just task completion."]},
 {h:"Key terms",gloss:[["Spike","Time-boxed exploration"],["Quality gate","A measured threshold to move forward"],["Eval set","Test cases measuring AI quality"],["Contingency","Buffer for uncertainty"],["Range estimate","An estimate with low and high bounds"]]}
],
quiz:[["Why use quality gates?","AI progress depends on measured quality, not just tasks done."],["Name three often-missed AI tasks.","Eval creation, data prep, iteration, reviews, human review tooling, monitoring (any three)."],["How should you communicate uncertainty?","Ranges that narrow after each gate."],["What decision follows the explore phase?","Go or no-go."]],
deeper:["anthAgentEvals","hamelEvals"]},
{prac:["Put eval creation in the first sprint; it's the backbone of every later estimate.","Show a quality trend chart in status reports."],
 mis:[["AI features are faster to build.","Prototypes are fast; production quality takes iteration."],["Estimate AI like CRUD features.","Quality uncertainty needs gates and ranges."],["Evals come at the end.","They should start at the beginning."]]});

addTopic({id:"pmc15",cat:PMC,t:"Your AI-enabled PM operating system",d:"Build",p:"P1",n:"New",h:3,
what:"Your PM operating system is the set of routines, templates, tools and prompts you use to run your work: planning, documentation, status, meetings, decisions and learning. Making it AI-enabled means building reusable prompts, Claude Projects and automations around your real workflows.",
why:"Consistent systems make you faster and more reliable. Done well, AI handles the drafting and summarising so you spend time on judgement and people.",
concepts:["Map weekly and monthly routines","Templates and prompt library","Context stores: Claude Projects, docs","Automations for status and notes","Review and quality checks","Iterating your system"],
learn:["clProjects","skillsOv"],
doIt:"List your recurring PM tasks for a week and mark which AI could draft, summarise or check.",
prove:"Build your OS: a Claude Project with your templates and context, five tested prompts and one automation. Write a one-page guide to it.",
interview:"Describe your personal operating system as a PM and how AI fits in.",
covers:["AI Workflow Integration","AI PM Operating System"]},
{sections:[
 {h:"Map your routines",table:[["Routine","Frequency","AI role"],["Status update","Weekly","Draft from board and notes"],["Meeting notes","Daily","Summarise, extract actions"],["PRD and specs","Per feature","Draft and critique"],["Risk review","Biweekly","Spot new risks from updates"],["Stakeholder updates","Monthly","Tailor one update for several audiences"]]},
 {h:"Building blocks",bullets:["A Claude Project per product with PRDs, glossaries and decisions as context.","A prompt library: status, critique, edge cases, BLUF rewrite, risk scan.","Skills for repeatable multi-step tasks.","Templates for PRDs, decisions and retros.","Automations (n8n, Zapier) to gather inputs."],p:["Anthropic's Agent Skills package instructions and resources so Claude can perform repeatable tasks consistently."]},
 {h:"Quality loop",steps:["Draft with AI.","Check facts and numbers against sources.","Rewrite key messages in your voice.","Send, then note what needed fixing.","Improve the prompt or template."]},
 {h:"Key terms",gloss:[["Operating system","Your routines, tools and templates for work"],["Prompt library","Saved, tested prompts"],["Context store","Documents AI uses for background"],["Automation","A workflow that runs without manual steps"],["Skill","A packaged instruction set for repeatable tasks"]]}
],
quiz:[["What's the first step in building your OS?","Map your recurring routines."],["Why use a Claude Project per product?","It keeps relevant context available for every task."],["What is the quality loop?","Draft, check, rewrite, send, improve."],["What should AI not own?","Judgement, commitments and relationships."]],
deeper:["clProjects","skillsOv","n8nDocs"]},
{prac:["Spend 30 minutes a week improving one prompt or template; it compounds quickly.","Share your best prompts with the team to raise everyone's baseline."],
 mis:[["Set it up once and forget it.","Systems need regular tuning."],["More automation is always better.","Automate stable, repeated tasks only."],["AI replaces PM judgement.","It frees time for it."]]});

addTopic({id:"pmc16",cat:PMC,t:"Stakeholder management and conflict resolution",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"Stakeholder management means understanding who is affected, what they need and how much influence they have, then engaging each appropriately. Conflict resolution and negotiation help reach decisions when goals clash, focusing on interests rather than positions.",
why:"AI programmes involve more stakeholders than usual: legal, security, data, ethics and worried users. Managing them well keeps work moving.",
concepts:["Stakeholder mapping: power and interest","RACI for decisions","Interests vs positions","Options and objective criteria","Escalation paths","AI-specific concerns: jobs, risk, control"],
learn:["nistRmf"],
doIt:"Map stakeholders for an AI project on a power/interest grid and write one engagement action for each quadrant.",
prove:"Write a RACI for key decisions on an AI feature and a plan for the most likely conflict.",
interview:"Tell me about a time you resolved a conflict between stakeholders.",
covers:["Stakeholder Management","Conflict Resolution & Negotiation"]},
{sections:[
 {h:"Power and interest",table:[["Quadrant","Approach"],["High power, high interest","Manage closely: involve in decisions"],["High power, low interest","Keep satisfied: brief, focused updates"],["Low power, high interest","Keep informed: regular updates, listen"],["Low power, low interest","Monitor"]]},
 {h:"RACI",table:[["Decision","Responsible","Accountable","Consulted","Informed"],["Model vendor","AI lead","Head of engineering","Security, legal","Product"],["Launch date","TPM","Product director","Engineering, support","Sales"],["Data use","Data lead","DPO or legal","Security","Product"]]},
 {h:"Resolving conflict",steps:["Separate people from the problem.","Ask why each side wants what they want (interests).","Generate several options together.","Agree objective criteria (data, policy, user impact).","Decide, record and communicate; escalate if stuck."]},
 {h:"AI-specific concerns",bullets:["Job security: be honest about what changes.","Risk: involve legal and security early.","Control: show human oversight and override.","Quality: share eval results openly."]},
 {h:"Key terms",gloss:[["Stakeholder","Anyone affected by or able to affect the work"],["RACI","Responsible, Accountable, Consulted, Informed"],["Interest","The underlying need behind a position"],["Position","What someone says they want"],["Escalation","Raising a decision to a higher authority"]]}
],
quiz:[["How should high power, high interest stakeholders be managed?","Closely, involved in decisions."],["What's the difference between interest and position?","Position is what they ask for; interest is why."],["What does the A in RACI mean?","Accountable: the final decision owner."],["Name an AI-specific stakeholder concern.","Jobs, risk, control or quality."]],
deeper:["nistRmf"]},
{prac:["Meet sceptical stakeholders one-to-one before group meetings.","Write decisions down with the RACI owner and share them the same day."],
 mis:[["Avoid difficult stakeholders.","Early engagement prevents late blocks."],["Compromise is always best.","Look for options that meet both interests."],["Escalation is failure.","Timely escalation is good management."]]});

addTopic({id:"pmc17",cat:PMC,t:"Data work for TPMs: reading SQL with AI",d:"Use",p:"P1",n:"New",h:2,
what:"SQL is the language for asking questions of databases. TPMs don't need to write complex queries, but reading them, running simple ones and asking AI to draft and explain queries lets you answer your own questions and spot slow or wrong queries.",
why:"Waiting days for a data request slows decisions. Basic SQL plus AI makes you self-sufficient for many questions and better at discussing performance issues.",
concepts:["SELECT, WHERE, GROUP BY, ORDER BY, JOIN","Reading a query out loud","Asking AI to write and explain queries","Checking results for sense","Indexes and slow queries","Read-only access and data privacy"],
learn:["sqlbolt","lukeIdx"],
doIt:"Complete the first five SQLBolt lessons, then ask Claude to explain a query from your work line by line.",
prove:"Answer three real product questions with SQL (drafted with AI), documenting the query, result and a sanity check.",
interview:"How do you get the data you need for decisions?",
covers:["Database Query Optimization (Level 2: TPM version)"]},
{sections:[
 {h:"The core clauses",table:[["Clause","Does","Example meaning"],["SELECT","Picks columns","Show name and signup date"],["FROM","Picks the table","From users"],["WHERE","Filters rows","Only users from India"],["GROUP BY","Groups for totals","Count per month"],["JOIN","Combines tables","Users with their orders"],["ORDER BY","Sorts","Newest first"]],p:["SQLBolt offers interactive lessons that start with the parts of a query and build up to joins and aggregates in the browser."]},
 {h:"Working with AI",steps:["Describe the question in plain words and give table names and columns.","Ask for the query and a line-by-line explanation.","Run it on a small date range first.","Sanity-check totals against a known number.","Save the query with a note on what it answers."]},
 {h:"Why queries get slow",bullets:["No index on columns used to filter or join.","Selecting far more data than needed.","Functions on indexed columns in WHERE clauses.","Joining huge tables without filters."],p:["Use The Index, Luke explains how indexes speed up lookups and why some queries can't use them."]},
 {h:"Key terms",gloss:[["SQL","Language for querying databases"],["JOIN","Combining rows from related tables"],["Aggregate","A summary such as COUNT or SUM"],["Index","A structure that speeds up lookups"],["Read replica","A database copy safe for analysis queries"]]}
],
quiz:[["Which clause filters rows?","WHERE."],["What does GROUP BY do?","Groups rows for totals such as counts."],["How should you check AI-written queries?","Run on small ranges and sanity-check against known numbers."],["Why might a query be slow?","Missing index, too much data, functions on indexed columns, unfiltered joins."]],
deeper:["sqlbolt","lukeIdx","rmSql"]},
{prac:["Ask for read-only access to a replica or analytics warehouse, never production.","Keep a shared file of trusted queries with explanations."],
 mis:[["SQL is only for analysts.","Basic reading and simple queries help every TPM."],["AI-written SQL is always right.","Check joins and filters; small mistakes change answers."],["Querying production is fine.","Use replicas to avoid slowing users."]]});

addTopic({id:"com01",cat:COM,t:"Explaining technology simply",d:"Use",p:"P0",n:"Refresh",h:2,
what:"Explaining technology simply means translating technical concepts into business language: what it is, why it matters, what it costs and what could go wrong, using analogies and avoiding jargon. It's how TPMs connect engineering and business.",
why:"Leaders decide based on what they understand. Clear explanations speed approvals and prevent costly misunderstandings.",
concepts:["Start with why it matters to them","Analogies that fit","Levels of detail for different audiences","Avoiding jargon or defining it once","Checking understanding","Common explanations: APIs, cloud, scaling, cost, database changes, automation"],
learn:["hbrBluf","c4"],
doIt:"Explain one technical concept (APIs, cloud, scaling) to a non-technical friend in two minutes. Note where they got confused.",
prove:"Write one-paragraph explanations of six concepts for an executive audience: API, app cost, why database changes affect the app, cloud, scaling, an automation workflow.",
interview:"Explain an API to our CFO.",
covers:["Explain API simply","Explain app cost","Explain why DB changes affect app","Explain cloud simply to business stakeholder","Explain scaling & performance","Explain automation workflow","Technical explanation","Translating Business Needs to Tech","Architecture Explanations"]},
{sections:[
 {h:"A simple structure",steps:["What it is, in one sentence.","An analogy from their world.","Why it matters to them (money, time, risk, customers).","What we need from them (a decision, budget, patience)."]},
 {h:"Ready-made explanations",table:[["Concept","Plain explanation"],["API","A waiter between systems: one system asks for something in an agreed format, the API brings back the answer."],["App cost","Like running a shop: fixed rent (servers, database) plus costs that grow with customers (AI calls, bandwidth)."],["Database change","Changing the shelves in a warehouse: every picker who knows the old layout must be updated, or orders go wrong."],["Cloud","Renting computers by the hour instead of buying a building full of them."],["Scaling","More trucks for more deliveries, with a dispatcher to share the load."],["Automation workflow","A recipe that runs itself: when this happens, do these steps, in order, every time."]]},
 {h:"Match the audience",table:[["Audience","Wants"],["Executives","Impact, cost, risk, decision needed"],["Business teams","What changes for them and when"],["Engineers","Details, trade-offs, constraints"]]},
 {h:"Check understanding",bullets:["Ask them to summarise what they'll tell their team.","Watch for nods without questions; probe gently.","Follow up in writing with the key points."]},
 {h:"Key terms",gloss:[["Jargon","Specialist language that excludes others"],["Analogy","A comparison to something familiar"],["Audience","Who you are explaining to"],["Translation","Turning technical detail into business meaning"],["Abstraction level","How much detail you include"]]}
],
quiz:[["What are the four steps of a simple explanation?","What it is, analogy, why it matters, what you need."],["Give a plain explanation of an API.","A waiter carrying requests and answers between systems in an agreed format."],["What do executives want most?","Impact, cost, risk and the decision needed."],["How do you check understanding?","Ask them to summarise it back."]],
deeper:["hbrBluf","c4"]},
{prac:["Keep a personal file of analogies that worked; reuse them.","Ask Claude to explain a concept 'to a CFO in 80 words', then edit in your voice."],
 mis:[["Simplifying is dumbing down.","It's respecting the audience's time."],["Technical detail builds credibility.","Clarity builds more."],["One explanation fits everyone.","Tailor to each audience."]]});

addTopic({id:"com02",cat:COM,t:"Executive updates and BLUF",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"BLUF (bottom line up front) means stating the conclusion and any request first, then the supporting detail. Executive updates use BLUF with a consistent structure: status, key changes, risks, decisions needed.",
why:"Executives skim. Updates that lead with what matters get read, acted on and trusted.",
concepts:["BLUF structure","Red-amber-green status with meaning","Decisions needed and by when","Short, consistent format","Speaking concisely in meetings","Executive presence"],
learn:["hbrBluf"],
doIt:"Rewrite your last status email so the first two lines contain the status and any decision needed.",
prove:"Create a one-page weekly executive update template and use it for three weeks.",
interview:"How do you update senior leadership on a complex programme?",
covers:["Sprint updates","Concise speaking (BLUF)","Executive communication","Executive presence"]},
{sections:[
 {h:"BLUF",p:["In Harvard Business Review, Kabir Sehgal describes how military professionals open emails with a short BLUF that declares the purpose and the action required, answering who, what, where, when and why."],steps:["Bottom line: 'On track for 15 March launch; need approval for extra eval budget by Friday.'","Key changes since last update.","Risks and what you're doing.","Details or links for those who want them."]},
 {h:"Status that means something",table:[["Status","Meaning"],["Green","On track; no help needed"],["Amber","At risk; plan in place; may need help"],["Red","Will miss without a decision or resources"]],p:["Say why a status changed. Long periods of green followed by sudden red destroy trust."]},
 {h:"Speaking concisely",bullets:["Lead with the answer, then one reason.","Stop and invite questions.","Use numbers instead of adjectives.","Prepare your first sentence before the meeting."]},
 {h:"Key terms",gloss:[["BLUF","Bottom line up front"],["RAG status","Red, amber, green indicator"],["Executive summary","The few lines that matter most"],["Ask","A specific request for decision or help"],["Executive presence","Calm, clear, confident communication"]]}
],
quiz:[["What goes first in a BLUF message?","The conclusion and any action needed."],["What should amber mean?","At risk with a plan; may need help."],["Why avoid sudden reds?","They signal hidden problems and damage trust."],["Give one tip for concise speaking.","Lead with the answer, use numbers, stop and invite questions."]],
deeper:["hbrBluf"]},
{prac:["Ask Claude to 'rewrite this as BLUF in under 120 words' before sending updates.","Keep the same template weekly so leaders know where to look."],
 mis:[["More detail shows more work.","It hides the message."],["Green is always good news.","Stale green hides risk."],["BLUF is rude.","It respects busy readers."]]});

addTopic({id:"com03",cat:COM,t:"Escalations, delays and bad news",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"Escalating means raising an issue to someone with the authority to resolve it. Delivering bad news, such as a delay, means telling people early, clearly and with options, owning the problem without blame.",
why:"Late bad news is far worse than early bad news. How you deliver it decides whether you keep trust.",
concepts:["When to escalate","Escalation format: issue, impact, options, recommendation, ask","Delivering delays early","Owning without blaming","Options and trade-offs","Following up"],
learn:["hbrBluf"],
doIt:"Write a delay message for a feature slipping two weeks: cause, impact, options, recommendation and ask.",
prove:"Create an escalation template and use it on a real or practice issue with a mentor's feedback.",
interview:"Tell me about a time you had to deliver bad news to a senior stakeholder.",
covers:["Escalation handling","Delivering Bad News (Delays)"]},
{sections:[
 {h:"When to escalate",bullets:["A decision is beyond your authority.","Teams can't agree after a genuine attempt.","A risk threatens a committed date, budget or customer.","You need resources you can't get yourself."],p:["Escalate early with options; escalating is a tool, not a failure."]},
 {h:"Escalation format",table:[["Part","Example"],["Issue","Vendor API rate limits block load testing"],["Impact","Launch at risk by 2 weeks"],["Options","A: pay for higher tier. B: reduce scope. C: delay"],["Recommendation","A, cost ₹X, keeps date"],["Ask","Approve spend by Wednesday"]]},
 {h:"Delivering a delay",steps:["Tell people as soon as you know, not when it's certain.","Lead with the new expected date and confidence.","Explain the cause briefly and own it.","Give options and your recommendation.","Say what you're changing to prevent repeats.","Follow up with written detail."]},
 {h:"Key terms",gloss:[["Escalation","Raising an issue to someone with authority"],["Options","Alternative paths with trade-offs"],["Recommendation","Your preferred option and why"],["Ownership","Taking responsibility without blame"],["Confidence level","How sure you are about a new date"]]}
],
quiz:[["When should you share a likely delay?","As soon as you know it's likely."],["What are the five parts of an escalation?","Issue, impact, options, recommendation, ask."],["Why bring options?","So leaders can decide quickly."],["What should follow a verbal delay message?","Written detail."]],
deeper:["hbrBluf"]},
{prac:["Pre-wire big bad news with key stakeholders one-to-one before group meetings.","Never present a problem without at least one option."],
 mis:[["Wait until you're sure.","Early warning gives more options."],["Escalation damages relationships.","Surprises damage them more."],["Explain every detail of the cause.","Focus on impact and options."]]});

addTopic({id:"com04",cat:COM,t:"Incidents, rollbacks and post-mortems",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"During production issues, communication keeps stakeholders and customers informed on a predictable cadence. A rollback returns to the last good version and must be explained simply. Post-mortems review what happened and drive improvements, run in a blameless way.",
why:"TPMs are often the communications lead in incidents and the facilitator of post-mortems. Calm, clear communication reduces panic and builds trust.",
concepts:["Incident updates: impact, status, next update time","Internal vs customer communication","Explaining a rollback","Blameless post-mortem facilitation","Action items with owners","Sharing learning"],
learn:["srePostmortem"],
doIt:"Write three incident updates (start, mid, resolved) for a payment failure affecting 10% of users.",
prove:"Facilitate (or role-play) a post-mortem and produce the document with timeline, causes and owned actions.",
interview:"How do you communicate during a production incident?",
covers:["Production issue handling","Rollback explanation","Post-Mortem Facilitation"]},
{sections:[
 {h:"Incident update template",steps:["What's happening and who is affected.","What we're doing now.","Workaround, if any.","Next update time (even if nothing changes)."],p:["Example: 'Since 10:20, about 10% of card payments are failing. Engineers are rolling back this morning's release. UPI is unaffected. Next update 11:00.'"]},
 {h:"Explaining a rollback",p:["'We've returned the app to yesterday's version, which was working. This restores payments. The new features from today's release are temporarily unavailable while we fix the issue and test again.' Keep it short, focus on user impact, and avoid blame."]},
 {h:"Facilitating a post-mortem",steps:["Share the draft timeline beforehand.","Set the tone: blameless, focused on systems.","Walk the timeline: what happened, what people knew, why decisions made sense then.","Identify contributing factors.","Agree a few high-value actions with owners and dates.","Publish and track actions to completion."],p:["Google's SRE book explains that blameless post-mortems focus on contributing causes without indicting individuals, which encourages people to share openly."]},
 {h:"Key terms",gloss:[["Incident update","Regular status message during an outage"],["Rollback","Returning to a previous working version"],["Post-mortem","Review after an incident"],["Blameless","Focusing on systems rather than people"],["Action item","An owned, dated improvement"]]}
],
quiz:[["What must every incident update include?","Impact, actions, workaround if any, next update time."],["How should you explain a rollback?","Simply, focused on user impact and what's temporarily unavailable."],["Why blameless post-mortems?","People share openly, so real causes are found."],["What makes post-mortems useful?","Owned, dated actions that get completed."]],
deeper:["srePostmortem","atlMetrics"]},
{prac:["Give the next update time even when nothing has changed; silence breeds rumours.","Track post-mortem actions in the same backlog as feature work."],
 mis:[["Wait for the fix before communicating.","Communicate early and regularly."],["Rollbacks mean failure.","They're a safe, planned response."],["Post-mortems find who's responsible.","They find what to improve."]]});

addTopic({id:"com05",cat:COM,t:"Explaining technical debt to executives",d:"Use",p:"P0",n:"Refresh",h:1,
what:"Technical debt is the extra future cost created by shortcuts or outdated design in code and systems. Like financial debt, it charges interest: every change takes longer and is riskier until the debt is paid down.",
why:"Executives fund what they understand. Framing tech debt in business terms (speed, risk, cost) gets it prioritised.",
concepts:["Debt and interest analogy","Deliberate vs accidental debt","Symptoms: slowing delivery, incidents, onboarding time","Quantifying impact","Allocating capacity","Linking paydown to outcomes"],
learn:["fowlerDebt"],
doIt:"List three pieces of tech debt in a product you know and estimate the 'interest' each charges per month in time or incidents.",
prove:"Write a one-page tech debt proposal for executives with costs, benefits and a capacity plan.",
interview:"How would you convince leadership to invest in reducing technical debt?",
covers:["Explaining Technical Debt to Execs"]},
{sections:[
 {h:"The analogy",p:["Martin Fowler's technical debt metaphor compares design shortcuts to borrowing money: the extra effort on every future change is the interest, and improving the design is paying down the principal."]},
 {h:"Business symptoms",table:[["Symptom","Business impact"],["Features take longer each quarter","Slower time to market"],["Same areas cause incidents","Customer impact, support cost"],["New engineers take months to be productive","Hiring ROI drops"],["Old libraries with known vulnerabilities","Security and compliance risk"]]},
 {h:"Making the case",steps:["Pick debt that blocks business goals.","Quantify interest: hours lost per sprint, incidents per month.","Estimate paydown cost.","Show payback: 'Six weeks of work saves two days per sprint and removes our top incident cause.'","Propose a capacity allocation, such as 15 to 20% per sprint."]},
 {h:"Key terms",gloss:[["Technical debt","Future cost of shortcuts or outdated design"],["Interest","Ongoing extra effort the debt causes"],["Paydown","Work to reduce debt"],["Capacity allocation","Reserved share of team time"],["Refactoring","Improving code structure without changing behaviour"]]}
],
quiz:[["What is the 'interest' on technical debt?","Extra effort and risk on every future change."],["Name two business symptoms.","Slower delivery, repeated incidents, slow onboarding, security risk (any two)."],["How do you make the case?","Quantify interest, estimate paydown, show payback."],["What's a typical capacity allocation?","Around 15 to 20% of each sprint."]],
deeper:["fowlerDebt"]},
{prac:["Track a 'debt interest' metric, such as hours lost per sprint, to make it visible.","Bundle debt paydown with feature work in the same area."],
 mis:[["All debt is bad.","Deliberate, managed debt can be smart."],["Executives don't care about code.","They care about speed and risk; translate."],["Stop features to fix all debt.","Steady allocation works better."]]});

addTopic({id:"com06",cat:COM,t:"Pitching AI ROI",d:"Use",p:"P0",n:"New",h:1.5,
what:"An AI pitch persuades decision makers to fund or adopt an AI initiative. Strong pitches lead with the business problem, show evidence from a pilot, quantify value and cost, and are honest about AI's limits and risks.",
why:"Leaders have seen AI hype. Balanced, evidence-based pitches stand out and get funded.",
concepts:["Problem-first story","Pilot evidence and baseline","Value and full cost","Honest limits and risks","Clear ask and next step","Handling sceptical questions"],
learn:["mckAi","clHall"],
doIt:"Draft a five-slide outline for pitching an AI initiative: problem, solution, evidence, ROI, ask.",
prove:"Deliver a five-minute pitch to a mentor or record yourself; refine based on feedback.",
interview:"Pitch me an AI initiative for our support team in two minutes.",
covers:["AI ROI pitch","ROI & business communication","Stakeholder Communication (explain AI limits)"]},
{sections:[
 {h:"Pitch structure",steps:["Problem: the pain, with numbers.","Solution: what AI does in the workflow, simply.","Evidence: pilot results against baseline.","Value and cost: conservative and expected cases.","Risks and limits: what can go wrong and controls.","Ask: decision, budget and next milestone."]},
 {h:"Explaining AI limits honestly",bullets:["It can be confidently wrong; we use grounding, evals and human review.","Quality varies by topic; we launch where it's strongest.","Costs grow with usage; we monitor and cap.","We'll measure and report, and stop if it doesn't deliver."],p:["Anthropic's documentation notes that models can produce hallucinations and suggests techniques such as allowing the model to say it doesn't know and grounding answers in quotes."]},
 {h:"Handling tough questions",table:[["Question","Answer approach"],["What if it's wrong?","Controls, review, fallback, error rate from pilot"],["Will it replace jobs?","What changes, redeployment, honest about impact"],["Why now?","Cost of waiting, competitor moves, pilot evidence"],["What does it cost at scale?","Run cost range and caps"]]},
 {h:"Key terms",gloss:[["Pitch","A persuasive case for a decision"],["Pilot","A small trial to gather evidence"],["Ask","The specific decision requested"],["Hallucination","Confident but incorrect AI output"],["Conservative case","Estimate with cautious assumptions"]]}
],
quiz:[["What should a pitch lead with?","The business problem, with numbers."],["Why mention AI limits?","Honesty builds credibility with sceptical leaders."],["What evidence is most persuasive?","Pilot results against a baseline."],["What should end a pitch?","A clear ask and next milestone."]],
deeper:["mckAi","clHall"]},
{prac:["Lead with the conservative case; beating it later builds trust.","Rehearse answers to the five hardest questions."],
 mis:[["Hype gets funding.","Evidence and honesty get lasting funding."],["Skip the risks to keep it positive.","Leaders will ask; be ahead of them."],["ROI must be precise.","Credible ranges are better than false precision."]]});

addTopic({id:"com07",cat:COM,t:"Cross-team dependencies and alignment",d:"Use",p:"P0",n:"Refresh",h:1,
what:"Cross-team dependencies are pieces of work one team needs from another. Alignment means teams share goals, priorities and timelines so dependencies are delivered on time.",
why:"Most programme delays come from dependencies. Clear communication and agreements prevent surprises.",
concepts:["Identifying dependencies early","Dependency agreements: what, when, who, quality","Shared roadmaps and goals","Regular syncs and visible trackers","Escalating blocked dependencies","Reducing dependencies through design"],
learn:["atlDevops"],
doIt:"List the dependencies for one feature and, for each, the owning team, needed-by date and current status.",
prove:"Create a dependency tracker and a one-page agreement template, and use them in a real planning cycle.",
interview:"How do you manage dependencies across teams with different priorities?",
covers:["Dependency communication","Cross-Functional Alignment"]},
{sections:[
 {h:"Dependency agreement",table:[["Field","Example"],["What","Payments API supports saved cards"],["Who","Payments team, owner Priya"],["Needed by","Sprint 14 for integration testing"],["Definition of done","Deployed to staging with docs"],["Status","On track / at risk / blocked"],["Fallback","Launch without saved cards"]]},
 {h:"Getting alignment",bullets:["Tie the dependency to a shared company goal.","Get it into the other team's plan, not just a conversation.","Hold short regular check-ins on the riskiest items.","Make the tracker visible to all teams and leaders."]},
 {h:"When it slips",steps:["Raise early with the owner.","Explore options: partial delivery, mock, re-sequence.","Escalate with options if priorities conflict.","Update everyone affected."]},
 {h:"Key terms",gloss:[["Dependency","Work one team needs from another"],["Critical path","Sequence of work that sets the end date"],["Alignment","Shared goals and priorities"],["Fallback","Alternative if a dependency isn't delivered"],["Tracker","Visible record of status"]]}
],
quiz:[["What should a dependency agreement include?","What, who, needed by, definition of done, status, fallback."],["Why tie dependencies to company goals?","It helps the other team prioritise."],["What's the critical path?","The sequence of work that sets the end date."],["First step when a dependency slips?","Raise it early with the owner."]],
deeper:["atlDevops"]},
{prac:["Review only red and amber dependencies in syncs to keep them short.","Ask 'can we design this dependency away?' during planning."],
 mis:[["A verbal yes is a commitment.","Get it into their plan."],["Dependencies are engineering's problem.","Coordination is core TPM work."],["Escalation means conflict.","It's a way to resolve priority clashes."]]});

addTopic({id:"com08",cat:COM,t:"Clear engineering requirements and effective standups",d:"Use",p:"P0",n:"Refresh",h:1,
what:"Clear engineering requirements state the problem, behaviour, constraints and acceptance criteria unambiguously. Effective standups are short daily syncs focused on progress toward the sprint goal and removing blockers.",
why:"Unclear requirements cause rework; bloated standups waste hours. Both are fixable habits.",
concepts:["Specific, testable language","Constraints and non-functional requirements","Examples and edge cases","Standup purpose and format","Walking the board","Taking discussions offline"],
learn:["atlStories","scrumGuide"],
doIt:"Rewrite one vague requirement ('make search better') into a clear, testable one.",
prove:"Run three standups using a 'walk the board' format and capture time taken and blockers resolved.",
interview:"How do you keep standups useful?",
covers:["Writing Clear Engineering Requirements","Running Effective Standups"]},
{sections:[
 {h:"Vague vs clear",table:[["Vague","Clear"],["Make search better","Search returns results within 500 ms at p95 and matches misspellings within one character"],["Support large files","Upload files up to 200 MB; show progress; resume after network drop"],["Be secure","Only the account owner and admins can view invoices; access is logged"]]},
 {h:"Requirement checklist",bullets:["Who is the user and what's the goal?","What exactly should happen, with examples?","What must not happen?","Limits: performance, size, security, accessibility.","How will we test it?"]},
 {h:"Standups that work",steps:["15 minutes, same time daily.","Walk the board from right to left: what's closest to done first.","Focus on blockers and the sprint goal.","Take problem-solving to a follow-up with only the people needed.","Record blockers and owners."],p:["The Scrum Guide describes the daily scrum as a 15-minute event to inspect progress toward the sprint goal and adapt the plan."]},
 {h:"Key terms",gloss:[["Testable requirement","One you can verify with a test"],["Non-functional requirement","Quality constraints like speed or security"],["Daily scrum","Short daily planning event"],["Walk the board","Reviewing work items rather than people"],["Parking lot","Topics deferred to after the meeting"]]}
],
quiz:[["What makes a requirement clear?","Specific, testable, with examples and limits."],["How long is a daily scrum?","15 minutes."],["What does 'walk the board' mean?","Reviewing work items, closest to done first."],["Where should problem-solving happen?","In a follow-up with only those needed."]],
deeper:["atlStories","scrumGuide"]},
{prac:["Ask an engineer to read your requirement back; gaps show immediately.","End standup on time even if topics remain; move them to the parking lot."],
 mis:[["Engineers will figure out the details.","Unclear requirements cause rework."],["Standups are status reports for managers.","They're for the team to plan the day."],["Longer standups solve more.","They waste more."]]});

addTopic({id:"com09",cat:COM,t:"Building authority with technical leads",d:"Use",p:"P1",n:"New",h:1,
what:"Authority with technical leads comes from credibility, not title: understanding enough to ask good questions, respecting engineering judgement, removing obstacles and following through reliably.",
why:"TPMs without direct authority must earn influence. Engineers trust people who understand constraints and make their work easier.",
concepts:["Technical credibility: enough depth to ask good questions","Listening and curiosity","Removing blockers","Protecting focus","Reliability and follow-through","Disagreeing productively"],
learn:["googleCr","sdPrimer"],
doIt:"Ask a technical lead to walk you through one part of the system and write a summary; ask them to check it.",
prove:"Over a month, track three blockers you removed for engineering and the time saved.",
interview:"How do you earn credibility with engineers when you're not hands-on?",
covers:["Authority building"]},
{sections:[
 {h:"Sources of credibility",table:[["Source","How to build it"],["Understanding","Learn the architecture, read designs, use the product"],["Good questions","Ask about trade-offs, risks and assumptions"],["Usefulness","Remove blockers, get decisions, clarify requirements"],["Reliability","Do what you say, on time"],["Respect","Trust engineering estimates and judgement"]]},
 {h:"Good questions to ask",bullets:["What's the riskiest part of this design?","What would we do differently with twice the time?","What happens if this dependency fails?","How will we know it's working in production?","What would make this easier for you?"]},
 {h:"Disagreeing well",steps:["Understand their reasoning fully first.","State the business constraint you're trying to meet.","Explore options together.","Escalate together if needed, presenting both views fairly."]},
 {h:"Key terms",gloss:[["Credibility","Trust earned through competence and reliability"],["Influence","Ability to shape decisions without authority"],["Blocker","Something stopping work"],["Focus time","Uninterrupted time for deep work"],["Follow-through","Completing what you committed to"]]}
],
quiz:[["Name three sources of credibility.","Understanding, good questions, usefulness, reliability, respect (any three)."],["Give one good question for a design review.","What's the riskiest part, what if a dependency fails, how will we know it works (any one)."],["How should you disagree with a tech lead?","Understand first, state constraints, explore options, escalate together."],["Why protect engineers' focus?","Deep work needs uninterrupted time."]],
deeper:["googleCr","sdPrimer"]},
{prac:["Batch your questions to engineers instead of interrupting throughout the day.","Credit engineers publicly for wins."],
 mis:[["Authority comes from the title.","It comes from credibility and help."],["You must code to be credible.","Understanding and good questions matter more."],["Agreeing always builds trust.","Honest, respectful disagreement does too."]]});

addTopic({id:"com10",cat:COM,t:"Presenting architecture and your capstone",d:"Use",p:"P0",n:"Refresh",h:1.5,
what:"Presenting architecture or a project to leaders means telling a clear story: the problem, the solution at the right level of detail, results, risks and next steps, supported by simple diagrams and a demo.",
why:"Your capstone presentation is your proof of skills. Executive walkthroughs and leadership pitches use the same structure.",
concepts:["Story arc: problem, solution, proof, ask","Diagrams at the right zoom level","Live demo with a backup","Timing and rehearsal","Handling questions","Public speaking basics"],
learn:["c4","hbrBluf"],
doIt:"Draw a context diagram of your capstone and explain it in 60 seconds to a friend.",
prove:"Deliver a 10-minute capstone presentation with a demo, recorded, and review it against a checklist.",
interview:"Walk me through a project you built, as if I were the CTO.",
covers:["Executive walkthrough","Leadership pitch","Public speaking"]},
{sections:[
 {h:"A 10-minute structure",table:[["Minutes","Content"],["0 to 1","The problem and why it matters"],["1 to 3","Solution and architecture diagram"],["3 to 6","Live demo of the main flow"],["6 to 8","Results: evals, metrics, cost"],["8 to 9","Risks, limits, next steps"],["9 to 10","Ask or key takeaway"]]},
 {h:"Diagrams",bullets:["Use a C4 context or container view for leaders.","Label every box and arrow in plain words.","Highlight the AI parts and the human checkpoints.","One idea per slide."]},
 {h:"Demo safely",steps:["Script the demo path.","Use realistic but safe data.","Record a backup video.","Have screenshots ready if everything fails.","Narrate what the audience should notice."]},
 {h:"Speaking basics",bullets:["Rehearse out loud at least three times.","Pause after key points.","Look at people, not slides.","Answer questions briefly, then check: 'Does that answer it?'","It's fine to say 'I don't know; I'll find out.'"]},
 {h:"Key terms",gloss:[["Story arc","Problem, solution, proof, ask"],["Context diagram","Highest-level system view"],["Demo path","Scripted steps for a live demo"],["Backup","Recorded fallback if live demo fails"],["Takeaway","The one thing you want remembered"]]}
],
quiz:[["What's the story arc for a project presentation?","Problem, solution, proof, ask."],["Why record a backup demo?","Live demos can fail."],["Which diagram suits leaders?","C4 context or container view."],["What if you don't know an answer?","Say so and commit to follow up."]],
deeper:["c4","hbrBluf"]},
{prac:["Rehearse with someone non-technical; if they follow, leaders will.","End with one clear takeaway slide."],
 mis:[["More slides show more work.","Fewer, clearer slides land better."],["Live demos are too risky.","They're compelling with a backup."],["Q&A is unpredictable.","Prepare for the five likeliest questions."]]});
