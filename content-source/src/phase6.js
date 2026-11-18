// Phase 6: Capstone Projects and Career & Brand. Uses resource keys verified in earlier phases.
const CAP="Capstone Projects", CAR="Career & Brand";

addTopic({id:"cap01",cat:CAP,t:"Project 1: AI Requirement Analyzer POC",d:"Build",p:"P0",n:"New",h:12,
what:"Build a proof of concept that takes a raw requirement or PRD and returns a structured analysis: clear user stories, Gherkin acceptance criteria, missing edge cases, open questions, risks and a rough effort signal. You build it with Claude (Projects or Claude Code), test it on real documents and present it.",
why:"It's directly useful in your job, shows you can scope, build, evaluate and present an AI product, and ties together prompting, structured output, evals and communication.",
concepts:["POC scoping and success criteria","Preparing sample documents","Prompt design and output schema","Building the prototype","Testing against a small eval set","Iterating from feedback","Presenting the POC"],
learn:["clPe","oaStruct","clEvals"],
doIt:"Write a one-page POC brief: problem, users, inputs, outputs, success criteria (for example, 'finds at least 80% of edge cases a senior PM would'), and what's out of scope.",
prove:"Deliver a working prototype, an eval sheet on 10 real requirements, a short write-up of results and a 10-minute demo.",
interview:"Tell me about an AI tool you built. How did you know it worked?",
covers:["POC Scoping","Data Preparation","Prompt Engineering for POC","Building the Prototype","Testing & Validation","Iteration based on feedback","POC Presentation"]},
{sections:[
 {h:"What you'll build",p:["A tool where you paste a requirement and get back a structured review. Start as a Claude Project with a strong system prompt; optionally grow it into a small web app with Claude Code that calls the API and returns JSON."],table:[["Output section","Example"],["User stories","As a shopper, I want to save my card..."],["Acceptance criteria","Given / When / Then scenarios"],["Edge cases","Expired card, network drop, duplicate submit"],["Open questions","Which card types? What's the retention policy?"],["Risks","PCI compliance, payment provider dependency"]]},
 {h:"Steps",steps:["Scope: write the POC brief and success criteria.","Data: collect 10 to 15 real or realistic requirements; remove confidential details.","Golden answers: for 5 of them, write what a strong PM would flag.","Prompt and schema: design the instructions and a JSON output format.","Build: Claude Project first; then a simple app if time allows.","Test: run all samples; score coverage of edge cases and quality of stories.","Iterate: change one thing at a time; re-run the eval.","Present: demo, results, limits, next steps."]},
 {h:"Acceptance checklist",bullets:["Brief with measurable success criteria.","Eval sheet with scores before and after iteration.","Structured, consistent output on every sample.","Known limits documented honestly.","Recorded demo or live presentation."]},
 {h:"Links back",p:["Uses: prompt engineering, structured outputs, user stories and Gherkin (pmc03), evals (evaluation topics), PRD writing (pmc02) and presenting (com10)."]},
 {h:"Key terms",gloss:[["POC","Proof of concept: a small build to test feasibility"],["Golden answer","Expert reference output for evaluation"],["Output schema","The required structure of results"],["Iteration","Improving step by step with measurement"],["Success criteria","Measurable conditions for the POC to pass"]]}
],
quiz:[["Why write golden answers?","To measure output quality objectively."],["Why change one thing at a time?","To know what caused improvement."],["What makes POC success criteria good?","They're measurable and agreed upfront."],["Where should you start building?","A Claude Project with a strong prompt, then an app if needed."]],
deeper:["clPe","oaStruct","clEvals","gherkinFowler"]},
{prac:["Use the tool on your own next PRD; real use exposes gaps no test set does.","Show one failure case in your demo; it proves you evaluated honestly."],
 mis:[["A demo that works once is a POC.","A POC needs measured results on several samples."],["More features make a better POC.","One well-measured capability is stronger."],["Skip the write-up.","The write-up is what others read."]]});

addTopic({id:"cap02",cat:CAP,t:"Project 2: Model API application with structured output",d:"Build",p:"P0",n:"New",h:6,
what:"Build a small application that calls a model API (Claude or another provider), sends a prompt, and receives structured JSON that your app validates and displays. Include error handling, retries, cost tracking and a simple interface.",
why:"API apps are the building block of every AI product. Building one end to end teaches you what engineers deal with: keys, errors, rate limits, latency and cost.",
concepts:["API keys and secrets","Request and response structure","Structured output and validation","Errors, retries and rate limits","Token and cost logging","Simple UI or CLI"],
learn:["clStart","clErrors","clRate"],
doIt:"Use Claude Code to scaffold a small app (for example, 'meeting notes to action items JSON') with an .env file for the key.",
prove:"Ship the app with a README, sample inputs and outputs, a log of tokens and cost per call, and a short note on how it handles failures.",
interview:"Walk me through what happens when your app calls the model API.",
covers:["Model API Application"]},
{sections:[
 {h:"What you'll build",p:["A command-line tool or small web page that takes text (for example, meeting notes) and returns JSON with action items, owners and due dates, validated against a schema."]},
 {h:"Steps",steps:["Get an API key and store it in .env (never commit it).","Ask Claude Code to scaffold the app and a JSON schema.","Make a first call and print the raw response.","Validate the JSON; on failure, retry once with the error message.","Handle errors: rate limits (wait and retry), timeouts, bad input.","Log input tokens, output tokens and estimated cost per call.","Add a simple UI and a README."]},
 {h:"Acceptance checklist",bullets:["Key in environment variable, .env in .gitignore.","Valid JSON on at least 9 of 10 sample inputs.","Graceful message on API errors.","Cost per call logged.","README explaining setup and limits."]},
 {h:"Key terms",gloss:[["API key","Secret credential for calling the API"],["Schema","Definition of required JSON structure"],["Validation","Checking output matches the schema"],["Rate limit","Maximum requests allowed per period"],["Retry with backoff","Trying again after increasing waits"]]}
],
quiz:[["Where should the API key live?","In an environment variable or .env file that's not committed."],["What do you do if JSON is invalid?","Retry with the error, then fail gracefully."],["Why log tokens per call?","To track and forecast cost."],["What should happen on a rate-limit error?","Wait and retry with backoff."]],
deeper:["clStart","clErrors","clRate","clTools"]},
{prac:["Run your app on messy real inputs, not just clean samples.","Set a spending limit on your API account before you start."],
 mis:[["Models always return valid JSON.","Validate and handle failures."],["Errors are rare.","Rate limits and timeouts are normal."],["Cost is too small to track.","Tracking builds the habit you'll need at scale."]]});

addTopic({id:"cap03",cat:CAP,t:"Project 3: Fully local AI app with Ollama",d:"Build",p:"P0",n:"New",h:6,
what:"Build an AI app that runs entirely on your own computer using Ollama (or LM Studio) with an open-weight model. No data leaves your machine. Compare its quality, speed and cost with a hosted model on the same tasks.",
why:"Local models matter for privacy, offline use and cost control. Running one teaches the real trade-offs you'll discuss with security and finance teams.",
concepts:["Installing Ollama and pulling a model","Model size and quantisation vs your hardware","Calling the local API","Privacy benefits","Comparing local and hosted quality and latency","When local makes sense"],
learn:["ollamaQs","hfQuant","lmsBasics"],
doIt:"Install Ollama, pull a small model and ask it five questions from your work. Note speed and quality.",
prove:"Build a small local app (for example, summarising local documents) and write a comparison table: local vs hosted on 10 tasks for quality, latency and cost.",
interview:"When would you recommend a local or self-hosted model over an API?",
covers:["Local Model Application"]},
{sections:[
 {h:"What you'll build",p:["A local tool, such as a private document summariser or a notes question-answerer, that calls Ollama's local API. Then run the same tasks through a hosted model and compare."]},
 {h:"Steps",steps:["Install Ollama and pull a small model that fits your RAM.","Test in the terminal with a few prompts.","Ask Claude Code to build a small app calling the local API.","Prepare 10 tasks from your work (non-confidential for the hosted comparison).","Run both local and hosted; score quality 1 to 5 and time each.","Write the comparison and a recommendation."]},
 {h:"Comparison template",table:[["Task","Local quality","Hosted quality","Local time","Hosted time","Notes"],["Summarise meeting notes","3","5","12 s","3 s","Local missed one action item"],["Classify ticket","4","5","2 s","1 s","Good enough locally"]]},
 {h:"Acceptance checklist",bullets:["App runs with network disconnected.","Comparison on at least 10 tasks.","Hardware and model size recorded.","Clear recommendation on where local fits."]},
 {h:"Key terms",gloss:[["Ollama","A tool to run open models locally"],["Open-weight model","A model whose weights you can download"],["Quantisation","Compressing a model to fit smaller hardware"],["Latency","Time to get a response"],["Data residency","Where data is processed and stored"]]}
],
quiz:[["Main benefit of local models?","Privacy and no data leaving the machine; also offline use."],["What limits model size locally?","Your RAM or GPU memory."],["How do you compare local and hosted fairly?","Same tasks, scored for quality and timed."],["What does quantisation do?","Shrinks a model to run on smaller hardware, with some quality loss."]],
deeper:["ollamaQs","hfQuant","lmsBasics"]},
{prac:["Pick the smallest model that's good enough; bigger is slower.","Note your laptop's specs in the write-up so results make sense to others."],
 mis:[["Local models are free.","Hardware, power and maintenance cost money."],["Local quality equals hosted.","Smaller models usually trail on hard tasks."],["Local means secure by default.","The device and app still need protection."]]});

addTopic({id:"cap04",cat:CAP,t:"Project 4: RAG assistant with citations and benchmark",d:"Build",p:"P0",n:"New",h:12,
what:"Build a retrieval-augmented generation (RAG) assistant over a document set (for example, company policies or product docs) that answers questions with citations. Use a vector database (Chroma, FAISS, Qdrant or Milvus), try chunking, hybrid search and reranking, and benchmark answer quality.",
why:"RAG is the most common enterprise AI pattern. Building and measuring one gives you first-hand understanding of why assistants get answers wrong and how to fix them.",
concepts:["Document loading and chunking","Embeddings and vector index","Similarity and hybrid search","Reranking","Grounded answers with citations","Retrieval and answer metrics","Benchmarking variants"],
learn:["pineVdb","redisHy","ragasDocs"],
doIt:"Pick 20 to 50 documents you can legally use and write 20 test questions with the correct answer and source.",
prove:"Ship the assistant plus a benchmark table comparing at least three configurations (chunk size, hybrid vs vector, with or without reranking) on retrieval and answer quality.",
interview:"How would you improve an internal assistant that gives wrong answers?",
covers:["RAG Application","RAG Benchmark","Grounded AI Assistant","Vector Database, Vector Index","Chroma, FAISS, Qdrant, Milvus","Similarity Search, Hybrid Search","Reranking, Chunking"]},
{sections:[
 {h:"Architecture",flow:[["Index",[["Load docs","PDF, web, text"],["Chunk","split with overlap"],["Embed","vectors"],["Store","Chroma or similar"]]],["Answer",[["Retrieve","vector or hybrid"],["Rerank","best few chunks"],["Generate","answer with citations"]]]],flowLabel:"RAG pipeline"},
 {h:"Steps",steps:["Collect documents and write 20 test questions with answers and sources.","Ask Claude Code to build a baseline: chunk, embed, store in Chroma, retrieve top 5, answer with citations.","Measure: did the right chunk appear in the top 5 (recall@5)? Is the answer correct and grounded?","Variant A: change chunk size and overlap.","Variant B: add hybrid (keyword + vector) search.","Variant C: add a reranker.","Record results in a table and choose the best configuration.","Add a refusal: 'I can't find this in the documents.'"]},
 {h:"Benchmark table",table:[["Config","Recall@5","Answer correct","Grounded","Avg latency"],["Baseline 500-token chunks","70%","65%","80%","2.1 s"],["Hybrid search","82%","74%","85%","2.3 s"],["Hybrid + rerank","90%","83%","92%","2.9 s"]],p:["Numbers here are illustrative; yours will differ. The point is measuring each change."]},
 {h:"Acceptance checklist",bullets:["Answers cite the source document and section.","Refuses when the answer isn't in the documents.","Benchmark with at least three configurations.","Write-up explaining which change helped most and why."]},
 {h:"Key terms",gloss:[["RAG","Retrieval-augmented generation"],["Chunking","Splitting documents into pieces for retrieval"],["Hybrid search","Combining keyword and vector search"],["Reranking","Re-ordering retrieved chunks by relevance"],["Recall@k","Share of questions where the right chunk is in the top k"]]}
],
quiz:[["What does recall@5 measure?","Whether the correct chunk appears in the top 5 results."],["Why add hybrid search?","Keyword matching catches exact terms vectors miss."],["What should the assistant do when the answer isn't in the docs?","Say it can't find it."],["Why benchmark variants?","To know which change actually improves quality."]],
deeper:["pineVdb","redisHy","ragasDocs","evPrk"]},
{prac:["Most RAG failures are retrieval failures; measure retrieval before tuning prompts.","Keep your test questions fixed across variants."],
 mis:[["RAG removes hallucinations.","It reduces them; grounding checks are still needed."],["Bigger chunks are always better.","They dilute relevance; test sizes."],["One configuration fits all documents.","Measure on your own data."]]});

addTopic({id:"cap05",cat:CAP,t:"Project 5: Your own MCP server",d:"Build",p:"P0",n:"New",h:6,
what:"Build a Model Context Protocol (MCP) server that exposes a few of your own tools or data (for example, reading a local task list, searching your notes, or querying a small SQLite database) so Claude can use them. Connect it to Claude Desktop or Claude Code and test it.",
why:"MCP is the standard way to connect AI to tools and data. Building a server shows you understand agents, tool design and the security questions they raise.",
concepts:["MCP hosts, clients and servers","Tools, resources and prompts","Tool names, descriptions and schemas","Local vs remote servers","Permissions and least privilege","Testing tool calls"],
learn:["mcpArch","anthTools","mcpSec"],
doIt:"Design three tools on paper: name, description, inputs, outputs and what could go wrong.",
prove:"Ship a working MCP server with three tools, a README, a security note (what it can access, what it can't) and a short screen recording of Claude using it.",
interview:"What is MCP and why does it matter for enterprise AI?",
covers:["MCP Server with Local Tools"]},
{sections:[
 {h:"What you'll build",p:["A small MCP server, scaffolded with Claude Code using an official MCP SDK, that exposes tools such as list_tasks, add_task and search_notes over a local folder or SQLite file."]},
 {h:"Steps",steps:["Pick a safe local data source you own.","Design tools with clear names, descriptions and input schemas.","Ask Claude Code to scaffold the server with the MCP SDK.","Run it locally and connect it to Claude Desktop or Claude Code.","Test: ask Claude tasks that need each tool; check calls and results.","Add input validation and read-only mode where possible.","Write the README and security note."]},
 {h:"Tool design tips",bullets:["Descriptions are prompts: say when to use the tool and what it returns.","Return concise, useful results, not huge dumps.","Prefer specific tools over one do-everything tool.","Make destructive actions require confirmation or leave them out."],p:["Anthropic's guide to writing tools for agents stresses clear names and descriptions and returning meaningful, token-efficient context."]},
 {h:"Acceptance checklist",bullets:["Three working tools used successfully by Claude.","Input validation and clear error messages.","Least-privilege access documented.","README with setup steps and a demo recording."]},
 {h:"Key terms",gloss:[["MCP","Model Context Protocol for connecting AI to tools and data"],["MCP server","A program exposing tools and data to AI clients"],["Tool schema","Definition of a tool's inputs"],["Host","The app running the AI, such as Claude Desktop"],["Least privilege","Only the access strictly needed"]]}
],
quiz:[["What does an MCP server expose?","Tools, resources and prompts."],["Why do tool descriptions matter?","The model uses them to decide when and how to call tools."],["How should destructive actions be handled?","Require confirmation or leave them out."],["What should the security note cover?","What the server can and can't access."]],
deeper:["mcpArch","anthTools","mcpSec"]},
{prac:["Start read-only; add write tools only after testing.","Watch the tool call logs; they show how the model interprets your descriptions."],
 mis:[["MCP is only for developers.","Understanding it helps TPMs plan integrations and security."],["More tools make agents smarter.","Too many confuse the model."],["Local servers need no security thinking.","They can still read or change your files."]]});

addTopic({id:"cap06",cat:CAP,t:"Project 6: Single-agent, multi-agent and automation workflows",d:"Build",p:"P0",n:"New",h:10,
what:"Build three versions of one useful workflow (for example, 'weekly status report from tickets and notes'): a single agent with tools, a multi-agent version (researcher, writer, reviewer), and a no-code automation (n8n, Zapier or Make) that runs it on a schedule. Compare reliability, cost and effort.",
why:"Choosing between a simple workflow, a single agent and multiple agents is one of the most common AI design decisions. Building all three gives you evidence, not opinions.",
concepts:["Workflows vs agents","Single agent with tools","Multi-agent roles and handoffs","Human approval steps","Scheduled automation","Comparing reliability, cost, latency and maintenance"],
learn:["anthAgents","n8nDocs","lgHitl"],
doIt:"Choose the workflow and write the input sources, output format and quality criteria.",
prove:"Deliver all three versions, a comparison table on 5 runs each, and a recommendation on which you'd put in production and why.",
interview:"When would you use multiple agents instead of one?",
covers:["Single-Agent Workflow","Multi-Agent Workflow","Agent Automation"]},
{sections:[
 {h:"Three builds",table:[["Version","How","Tools"],["Single agent","One model with tools to read sources and write the report","Claude with tools or Agent SDK"],["Multi-agent","Researcher gathers, writer drafts, reviewer checks","Agent SDK, LangGraph or CrewAI"],["Automation","Scheduled trigger, fetch data, call model, post result for approval","n8n, Zapier or Make"]],p:["Anthropic's guidance recommends starting with the simplest approach, often a workflow, and adding agentic complexity only when it clearly improves results."]},
 {h:"Steps",steps:["Define inputs, output template and quality checklist.","Build the single-agent version; run 5 times; score.","Build the multi-agent version; run 5 times; score.","Build the scheduled automation with a human approval step.","Compare quality, consistency, cost per run, latency and effort to maintain.","Write your recommendation."]},
 {h:"Comparison table",table:[["Measure","Single agent","Multi-agent","Automation"],["Quality (1-5)","","",""],["Consistency across runs","","",""],["Cost per run","","",""],["Time per run","","",""],["Build and maintenance effort","","",""]]},
 {h:"Acceptance checklist",bullets:["All three versions run on the same inputs.","Human approval before anything is sent.","Comparison table filled from real runs.","Clear, justified recommendation."]},
 {h:"Key terms",gloss:[["Workflow","Predefined steps with AI at certain points"],["Agent","A model that decides its own steps and tool use"],["Multi-agent","Several agents with roles working together"],["Human-in-the-loop","A person approves key steps"],["Trigger","An event or schedule that starts an automation"]]}
],
quiz:[["What does Anthropic recommend starting with?","The simplest approach, often a workflow."],["Why add a human approval step?","To prevent wrong outputs being sent."],["Name two comparison measures.","Quality, consistency, cost, latency, maintenance (any two)."],["When might multi-agent help?","When distinct roles or checks clearly improve quality."]],
deeper:["anthAgents","n8nDocs","lgHitl","crewDocs"]},
{prac:["Expect the simplest version to win more often than you'd think.","Log every run; variability between runs is a key finding."],
 mis:[["Multi-agent is always smarter.","It adds cost and failure points."],["Automations don't need review.","AI steps still need checks."],["One run proves it works.","Run several times to see consistency."]]});

addTopic({id:"cap07",cat:CAP,t:"Project 7: Production-readiness package",d:"Build",p:"P0",n:"New",h:10,
what:"Take one of your capstone apps (ideally the RAG assistant) and produce the package a real team would need before launch: architecture document, API documentation, evaluation framework, LLMOps dashboard design, security assessment, test strategy, deployment and rollback plans, and a production-readiness checklist.",
why:"This is the TPM's signature deliverable. It shows you can take an AI prototype to production responsibly, and it's the strongest item in your portfolio.",
concepts:["Architecture document (C4)","API contract","Evaluation framework and thresholds","Observability and cost dashboard","Security assessment (OWASP LLM Top 10)","Test strategy","Deployment and rollback plans","Readiness checklist and sign-off"],
learn:["c4","owaspLlm","sreSlo"],
doIt:"List every document in the package and draft a one-line purpose for each.",
prove:"Deliver the full package for one app, reviewed by someone technical, and present it as if to a launch review board.",
interview:"What would you need to see before approving an AI feature for production?",
covers:["Production-Readiness Package","Evaluation Framework","LLMOps Dashboard","Security Assessment","Architecture Document","API Documentation","Test Strategy","Deployment Plan","Rollback Plan","Production Readiness Checklist","Capstone Project Execution"]},
{sections:[
 {h:"The package",table:[["Document","Contents","Related lesson"],["Architecture","C4 context and container diagrams, data flow, key decisions","HLD"],["API documentation","Endpoints, schemas, errors, limits","API contracts"],["Evaluation framework","Eval sets, metrics, thresholds, cadence","Evaluation topics"],["LLMOps dashboard","Traces, cost, latency, quality, alerts","Tracing, cost tracking"],["Security assessment","OWASP LLM mapping, data flows, controls","Security topics"],["Test strategy","Unit, integration, eval, load, UAT","Testing"],["Deployment plan","Environments, canary steps, go/no-go","Deployment strategies"],["Rollback plan","Triggers, steps, owner, time to roll back","Incidents"],["Readiness checklist","All of the above with sign-offs","QA and sign-off"]]},
 {h:"Readiness checklist (sample)",bullets:["Eval scores above thresholds on the full set.","p95 latency and cost per request within budget.","Guardrails and injection tests passing.","PII handling reviewed; data retention set.","Tracing, dashboards and alerts live.","Runbook and on-call owner named.","Rollback tested in staging.","Stakeholder sign-offs recorded."]},
 {h:"Steps",steps:["Choose the app and freeze its scope.","Draft architecture and API docs.","Formalise the eval framework from your benchmark.","Design the dashboard (mock-up is fine) and alerts.","Run the security assessment against OWASP LLM Top 10.","Write test, deployment and rollback plans.","Compile the checklist and get a review.","Present to a mock launch board."]},
 {h:"Key terms",gloss:[["Production readiness","Evidence a system is safe to launch"],["Launch review","Meeting to approve going live"],["Runbook","Instructions for operating and fixing the system"],["Sign-off","Recorded approval from an accountable owner"],["Threshold","Minimum acceptable metric value"]]}
],
quiz:[["Name five documents in the package.","Architecture, API docs, eval framework, dashboard, security assessment, test strategy, deployment, rollback, checklist (any five)."],["What must the rollback plan include?","Triggers, steps, owner and time to roll back."],["Which framework guides the security assessment?","OWASP Top 10 for LLM applications."],["Why present to a mock board?","To practise defending readiness decisions."]],
deeper:["c4","owaspLlm","sreSlo","anthAgentEvals"]},
{prac:["Reuse this package as a template at work; teams value a ready-made checklist.","Get one honest technical reviewer; their questions are the real exam."],
 mis:[["Production readiness is engineering's job.","TPMs assemble the evidence and drive sign-off."],["A good demo means ready to launch.","Readiness is about operations, risk and evidence."],["Documents slow launch.","They prevent painful launches."]]});

addTopic({id:"car01",cat:CAR,t:"Self-introduction and STAR stories",d:"Use",p:"P1",n:"Refresh",h:2,
what:"A self-introduction is a 60 to 90 second story of who you are professionally, what you've achieved and where you're heading. STAR stories (Situation, Task, Action, Result) are structured examples of your experience for behavioural interview questions.",
why:"Your introduction frames every interview and networking conversation. A bank of strong STAR stories lets you answer most behavioural questions confidently.",
concepts:["Past, present, future introduction","Positioning: experienced PM becoming AI-enabled TPM","STAR structure","Quantified results","A story bank mapped to competencies","Practising out loud"],
learn:["amazonStar"],
doIt:"Write a 90-second introduction and record yourself saying it. Listen back and cut 20%.",
prove:"Build a bank of 10 STAR stories mapped to competencies (leadership, conflict, failure, delivery, technical depth, AI), each with a number in the result.",
interview:"Tell me about yourself.",
covers:["Self introduction","Storytelling (STAR)"]},
{sections:[
 {h:"Introduction structure",steps:["Present: 'I'm a programme manager with 11 years delivering...'","Past highlight: one or two achievements with numbers.","Pivot: 'Over the last year I've built AI skills: RAG assistants, evals, an MCP server...'","Future: 'I'm looking for an AI-enabled TPM role where I can...'"]},
 {h:"STAR",table:[["Part","What to say","Share of time"],["Situation","Context in one or two sentences","10%"],["Task","Your responsibility","10%"],["Action","What you did, in 'I' terms, with reasons","60%"],["Result","Outcome with numbers and what you learned","20%"]],p:["Amazon's interview guide describes its interviews as behavioural and recommends the STAR method: situation, task, action and result."]},
 {h:"Story bank",table:[["Competency","Story idea"],["Delivery under pressure","Programme recovered from a slip"],["Conflict","Two teams disagreed on priorities"],["Failure","A launch that went wrong and what changed"],["Technical depth","Architecture decision you influenced"],["AI","Capstone RAG assistant and its benchmark"]]},
 {h:"Key terms",gloss:[["STAR","Situation, Task, Action, Result"],["Story bank","Prepared examples mapped to competencies"],["Behavioural question","'Tell me about a time when...'"],["Positioning","How you frame your experience"],["Quantified result","An outcome expressed in numbers"]]}
],
quiz:[["What does STAR stand for?","Situation, Task, Action, Result."],["Which part gets the most time?","Action."],["What should every result include?","A number and a learning."],["What are the four parts of the introduction?","Present, past highlight, pivot, future."]],
deeper:["amazonStar"]},
{prac:["Practise out loud; written stories always run long when spoken.","Ask Claude to play a tough interviewer and probe your stories."],
 mis:[["Say 'we' to sound like a team player.","Interviewers need to know what you did."],["More detail is more convincing.","Crisp stories with numbers are."],["One story per question.","Good stories cover several competencies."]]});

addTopic({id:"car02",cat:CAR,t:"TPM and AI PM interview practice",d:"Use",p:"P0",n:"New",h:4,
what:"TPM and AI PM interviews usually include behavioural questions, programme scenarios, system design at a high level, AI product sense (when to use AI, evals, risks) and often a presentation. Mock interviews, including AI-powered practice tools, build fluency.",
why:"Interviews test how you think out loud. Deliberate practice across question types is the fastest way to improve.",
concepts:["Interview types: behavioural, programme, system design, AI product, presentation","Frameworks for scenario answers","Talking through trade-offs","AI-specific questions: evals, hallucination, cost, safety","Mock interviews with people and AI","Feedback and iteration"],
learn:["amazonStar","sdPrimer"],
doIt:"Answer three questions from earlier lessons' 'In an interview' prompts out loud, recorded, and score yourself on structure, clarity and depth.",
prove:"Complete five mock interviews (at least two with people) across different types, and keep a log of feedback and improvements.",
interview:"How would you launch an AI feature for customer support?",
covers:["TPM Interview Mastery","AI PM Interview Prep","Remasto: AI Interview Prep","Technical explanation (mock interview)"]},
{sections:[
 {h:"Question types",table:[["Type","Example","What they test"],["Behavioural","Tell me about a failed launch","Self-awareness, learning"],["Programme","Two teams' dependencies slip; what do you do?","Judgement, communication"],["System design","Design a notification system at high level","Technical depth, trade-offs"],["AI product","How would you know a chatbot is good enough to launch?","Evals, risk, metrics"],["Presentation","Present your capstone","Clarity, executive presence"]]},
 {h:"Answering scenarios",steps:["Clarify the goal and constraints.","State assumptions.","Lay out options and trade-offs.","Recommend and explain why.","Say how you'd measure and adjust."]},
 {h:"AI questions to prepare",bullets:["How do you evaluate an LLM feature?","How do you reduce hallucinations?","How do you control AI costs?","How do you protect against prompt injection?","When should you not use AI?","How would you explain AI risk to executives?"]},
 {h:"Practice plan",bullets:["Two mock interviews a week for a month.","Use Claude or an AI interview tool for daily drills.","Ask human mocks for blunt feedback on one thing to fix.","Re-record the same answer after fixing it."]},
 {h:"Key terms",gloss:[["Mock interview","Practice interview with feedback"],["Scenario question","A hypothetical situation to reason through"],["Trade-off","Giving up one thing to gain another"],["Clarifying question","Question to understand the problem before answering"],["Product sense","Judgement about what to build and why"]]}
],
quiz:[["Name the five interview types.","Behavioural, programme, system design, AI product, presentation."],["What's the first step in a scenario answer?","Clarify the goal and constraints."],["Name two AI questions to prepare.","Evaluation, hallucinations, cost, injection, when not to use AI, explaining risk (any two)."],["Why re-record answers?","To confirm the improvement stuck."]],
deeper:["amazonStar","sdPrimer","clEvals"]},
{prac:["Use the 'In an interview' prompt on every topic page as a ready-made question bank.","Practise with a timer; most answers should land in two to three minutes."],
 mis:[["Memorise perfect answers.","Practise structures; answers should sound natural."],["System design is only for engineers.","TPM interviews often include high-level design."],["AI tools can replace human mocks.","They help with volume; humans catch subtler issues."]]});

addTopic({id:"car03",cat:CAR,t:"Resume and impact positioning",d:"Use",p:"P1",n:"Refresh",h:2,
what:"A strong TPM resume leads with impact: outcomes, scale and numbers, not duties. For a move into AI-enabled roles, it shows AI projects, tools and results alongside your programme leadership.",
why:"Recruiters skim resumes in seconds. Impact-first bullets and a clear AI story get you interviews.",
concepts:["Headline and summary","Impact bullets: action, scope, result","Quantifying outcomes","AI projects section","Tailoring to each role","Keyword alignment without stuffing"],
learn:["amazonStar"],
doIt:"Rewrite five resume bullets from 'responsible for' to impact statements with numbers.",
prove:"Produce a one-to-two page resume with an AI projects section featuring your capstones, reviewed by someone in a TPM role.",
interview:"Walk me through your resume.",
covers:["Resume & Impact Positioning"]},
{sections:[
 {h:"From duty to impact",table:[["Before","After"],["Responsible for release management","Led monthly releases for 3 mobile apps (4M users), cutting release time from 5 days to 2"],["Managed stakeholders","Aligned 6 teams on a payments migration delivered 3 weeks early with zero downtime"],["Worked on AI tools","Built a RAG assistant over 40 policy documents; improved answer accuracy from 65% to 83% through hybrid search and reranking"]]},
 {h:"Bullet formula",p:["Action verb + what you did + scale + measurable result. If you don't have exact numbers, use honest estimates and be ready to explain them."]},
 {h:"Structure",bullets:["Headline: 'Technical Programme Manager | AI-enabled delivery'.","Summary: three lines on experience, strengths and AI skills.","Experience: impact bullets, most recent first.","AI projects: capstones with links and results.","Skills: tools and methods, grouped.","Keep to two pages."]},
 {h:"Key terms",gloss:[["Impact bullet","A resume line showing outcome, not duty"],["Headline","One-line professional identity"],["Tailoring","Adjusting emphasis for each role"],["ATS","Applicant tracking system that scans resumes"],["Portfolio link","URL to your projects"]]}
],
quiz:[["What's the bullet formula?","Action verb + what + scale + measurable result."],["What should an AI projects section show?","Capstones with links and measured results."],["How long should the resume be?","One to two pages."],["What if you lack exact numbers?","Use honest estimates you can explain."]],
deeper:["amazonStar"]},
{prac:["Ask Claude to critique each bullet as a sceptical hiring manager.","Keep a master resume and tailor a copy per application."],
 mis:[["List every responsibility.","Show the most impressive impact."],["AI keywords alone get interviews.","Evidence of real projects does."],["One resume fits all roles.","Tailor emphasis to each role."]]});

addTopic({id:"car04",cat:CAR,t:"Portfolio and case studies",d:"Build",p:"P1",n:"New",h:3,
what:"A portfolio is a small public collection of your work: capstone projects, case studies, diagrams and demos. A case study tells the story of one project: problem, approach, decisions, results and learnings.",
why:"For a career changer, a portfolio is proof. It turns 'I'm learning AI' into 'here's what I built and how I measured it'.",
concepts:["What to include and exclude","Case study structure","Showing decisions and trade-offs","Visuals: diagrams, screenshots, short videos","Protecting confidential information","Hosting: GitHub, a simple site, a published artifact"],
learn:["ghHello","vercelStart"],
doIt:"Choose your two strongest capstones and outline a case study for each.",
prove:"Publish a portfolio page with at least three case studies, each with a diagram, results and a link or video.",
interview:"Show me something you've built.",
covers:["Portfolio & Case Study Building"]},
{sections:[
 {h:"Case study structure",steps:["Problem: who had it and why it mattered.","Goal and constraints.","Approach: architecture diagram and key decisions.","What you tried and what didn't work.","Results: metrics, benchmarks, feedback.","What you'd do next.","Links: demo, repo, write-up."]},
 {h:"What to include",table:[["Include","Exclude"],["Capstones with measured results","Confidential employer data"],["Architecture diagrams","Unfinished experiments without learning"],["Short demo videos","Long code walkthroughs"],["Decision logs","Tool lists without outcomes"]]},
 {h:"Where to host",bullets:["GitHub repositories with clear READMEs.","A simple portfolio site (for example on Vercel).","A published Claude artifact or a Notion page.","Link everything from LinkedIn and your resume."]},
 {h:"Key terms",gloss:[["Portfolio","Collection of your work"],["Case study","Story of one project and its results"],["Decision log","Record of choices and reasons"],["README","Guide at the top of a repository"],["Demo video","Short recording of the product working"]]}
],
quiz:[["Name the case study steps.","Problem, goal, approach, what didn't work, results, next, links."],["What should you never include?","Confidential employer information."],["Why show what didn't work?","It proves real learning and honest evaluation."],["Where should the portfolio be linked?","LinkedIn and resume."]],
deeper:["ghHello","vercelStart"]},
{prac:["Keep each case study readable in three minutes.","Ask a non-technical friend to read one; if they get the point, it works."],
 mis:[["Portfolios are for designers.","They're powerful for TPMs changing direction."],["Polish matters more than substance.","Measured results matter most."],["Code quality is what's judged.","For TPMs, decisions and outcomes are."]]});

addTopic({id:"car05",cat:CAR,t:"LinkedIn and AI-enabled PM positioning",d:"Use",p:"P2",n:"New",h:1.5,
what:"LinkedIn is where recruiters and peers check your story. Positioning means your headline, about section, featured items and activity consistently say: experienced programme leader who builds and ships with AI.",
why:"A clear profile brings inbound opportunities and makes referrals easier.",
concepts:["Headline and about section","Featured: portfolio, capstones","Experience bullets aligned to resume","Skills and recommendations","Consistent posting","Networking with intent"],
learn:["ghHello"],
doIt:"Rewrite your headline and about section to reflect the AI-enabled TPM direction.",
prove:"Update your profile fully (headline, about, featured portfolio, experience) and connect with 20 people in target roles with personal notes.",
interview:"How do you keep your skills and network current?",
covers:["LinkedIn","AI-enabled PM Branding"]},
{sections:[
 {h:"Profile essentials",table:[["Section","Guidance"],["Headline","Role + specialty + proof, such as 'TPM | AI-enabled delivery | Built RAG and agent workflows'"],["About","Three short paragraphs: experience, what you do now with AI, what you're looking for"],["Featured","Portfolio, best case study, a talk or post"],["Experience","Impact bullets matching your resume"],["Skills","Programme management, AI evaluation, RAG, agile, stakeholder management"]]},
 {h:"Networking with intent",steps:["List target companies and roles.","Find people in those roles.","Send short, specific notes referencing their work.","Offer something: a useful article, a question, your case study.","Follow up once, then move on."]},
 {h:"Consistency",p:["Your resume, LinkedIn and portfolio should tell the same story with the same numbers."]},
 {h:"Key terms",gloss:[["Headline","The line under your name"],["Featured","Pinned links on your profile"],["Positioning","How you want to be known"],["Inbound","Opportunities that come to you"],["Referral","Introduction by someone inside a company"]]}
],
quiz:[["What should a headline include?","Role, specialty and proof."],["What belongs in Featured?","Portfolio, best case study, talk or post."],["Why keep numbers consistent?","Mismatches reduce trust."],["What makes a connection note work?","It's short, specific and offers value."]],
deeper:["ghHello"]},
{prac:["Update your profile after each capstone, not all at once at the end.","Comment thoughtfully on posts by people in target roles."],
 mis:[["A busy profile is a strong profile.","A clear one is."],["Connect with everyone.","Connect with intent."],["LinkedIn doesn't matter for senior roles.","It's often the first check."]]});

addTopic({id:"car06",cat:CAR,t:"Thought leadership: sharing what you learn",d:"Use",p:"P2",n:"New",h:1,
what:"Thought leadership means sharing useful insight from your experience: short posts, write-ups, talks or internal brown-bags about what you built, measured and learned while becoming AI-enabled.",
why:"Sharing consolidates your learning, builds credibility and attracts opportunities. 'Learning in public' is especially effective for career changers.",
concepts:["Learning in public","Writing from real experience","Useful over impressive","Formats: posts, articles, talks","Consistency over volume","Accuracy and attribution"],
learn:["hbrBluf"],
doIt:"Write a 150-word post about one surprising thing you learned in a capstone, with one number.",
prove:"Publish four posts over a month and give one internal or community talk based on a capstone.",
interview:"What have you learned about AI that surprised you?",
covers:["AI Thought Leadership"]},
{sections:[
 {h:"What to share",table:[["Format","Example"],["Lesson learned","Hybrid search improved my RAG accuracy more than prompt tweaks"],["Before and after","How AI changed my weekly status process"],["Mini case study","My MCP server: what worked, what didn't"],["Explainer","Evals for PMs in 5 points"]]},
 {h:"A simple post structure",steps:["Hook: a specific insight or number.","Context: what you were trying to do.","What happened.","The lesson.","An invitation: question or link."]},
 {h:"Stay credible",bullets:["Share what you've actually done.","Cite sources and don't overclaim.","Avoid confidential details.","Admit uncertainty."]},
 {h:"Key terms",gloss:[["Thought leadership","Sharing useful insight from experience"],["Learning in public","Sharing progress while learning"],["Hook","Opening line that earns attention"],["Brown-bag","Informal internal talk"],["Attribution","Crediting sources"]]}
],
quiz:[["What makes a post credible?","Real experience, sources, honesty about limits."],["Give one post format.","Lesson learned, before/after, mini case study, explainer."],["What's a hook?","An opening line with a specific insight."],["Why learn in public?","It consolidates learning and builds credibility."]],
deeper:["hbrBluf"]},
{prac:["Keep a running note of surprises while building; they're your best post ideas.","Give an internal talk first; it's lower pressure and builds visibility at work."],
 mis:[["You must be an expert to share.","Honest learning journeys are valuable."],["Post daily to grow.","Consistent, useful posts beat volume."],["Hype gets attention.","Specific, measured insights earn trust."]]});

addTopic({id:"car07",cat:CAR,t:"Tracking AI trends without drowning",d:"Use",p:"P1",n:"New",h:1,
what:"AI changes weekly. Tracking trends sustainably means a small set of trusted sources, a fixed time budget, and a filter for what matters to your work: new capabilities, cost changes, regulation and patterns that change how products are built.",
why:"Staying current is part of the job, but chasing every announcement wastes time and creates anxiety.",
concepts:["Choosing a few trusted sources","Weekly time box","Filter: does it change what or how we build?","Primary sources over hype","Hands-on testing","Sharing a digest with your team"],
learn:["mckAi","anthAgents"],
doIt:"Pick five sources (two vendor blogs, one newsletter, one research or policy source, one community) and set a 45-minute weekly slot.",
prove:"Write a monthly one-page AI digest for your team: three changes that matter, why, and any action.",
interview:"How do you keep up with AI developments?",
covers:["AI Trends"]},
{sections:[
 {h:"A sustainable routine",steps:["45 minutes weekly, same time.","Skim headlines from your fixed sources.","Pick at most three items to read properly.","Test one thing hands-on each month.","Write two lines on what it means for your work."]},
 {h:"The filter",table:[["Question","Example"],["Does it change capability?","Models handle longer documents or tools reliably"],["Does it change cost?","Price drops make a use case viable"],["Does it change risk or rules?","New regulation timelines"],["Does it change how we build?","New standard such as MCP"]]},
 {h:"Source types",bullets:["Model provider blogs and docs (primary sources).","Engineering blogs from practitioners.","Policy sources for regulation.","One or two curated newsletters.","Communities for practical tips."]},
 {h:"Key terms",gloss:[["Primary source","The original announcement or paper"],["Time box","Fixed time limit"],["Digest","Short summary for others"],["Signal vs noise","Important changes vs hype"],["Hands-on test","Trying a capability yourself"]]}
],
quiz:[["What's a good weekly time box?","About 45 minutes."],["Name two filter questions.","Capability, cost, risk/rules, how we build (any two)."],["Why prefer primary sources?","They're accurate and less hyped."],["What's the value of a team digest?","It shares learning and saves others time."]],
deeper:["mckAi","anthAgents"]},
{prac:["Unsubscribe from sources that rarely pass your filter.","Test claims yourself before repeating them to leaders."],
 mis:[["You must follow everything.","A few good sources are enough."],["New means better for your product.","Evaluate against your needs."],["Reading equals understanding.","Hands-on tests reveal the truth."]]});

addTopic({id:"car08",cat:CAR,t:"Final revision and integration",d:"Use",p:"P0",n:"New",h:3,
what:"Final revision ties the whole path together: reviewing weak areas, rehearsing explanations, polishing your portfolio and creating clear architecture diagrams (for example with Canva or a diagram tool) for your capstones and interviews.",
why:"Integration turns many topics into one coherent story you can tell and defend. It's the bridge from learning to getting the role.",
concepts:["Self-assessment across categories","Spaced review with quizzes","Explaining end-to-end AI systems","Clean diagrams for capstones","Final portfolio and resume pass","Next 90-day plan"],
learn:["c4","sdPrimer"],
doIt:"Use the dashboard to list every topic not yet 'Done' and pick the ten most important to revisit.",
prove:"Create one clean architecture diagram for each capstone, explain your RAG and agent projects end to end in five minutes each, and write your next 90-day plan.",
interview:"Explain, end to end, how an AI assistant you built works and how you'd run it in production.",
covers:["Final Revision & Integration","Canva (architecture diagrams)"]},
{sections:[
 {h:"Review plan",steps:["Self-assess each category from 1 to 5.","Revisit the lowest three categories' key lessons.","Retake quizzes for topics marked Done more than a month ago.","Rehearse 'In an interview' answers for ten topics.","Fix gaps with one small hands-on exercise each."]},
 {h:"The end-to-end story",flow:[["Build",[["Problem and scope","PRD, MVP"],["Design","HLD, RAG or agents"],["Build","API, MCP, prompts"]]],["Prove",[["Evaluate","eval sets, thresholds"],["Secure","OWASP, guardrails"]]],["Run",[["Deploy","CI/CD, canary"],["Operate","tracing, cost, incidents"],["Communicate","executives, users"]]]],flowLabel:"AI-enabled TPM lifecycle"},
 {h:"Diagrams that work",bullets:["One diagram per message: context, containers or data flow.","Plain labels on every box and arrow.","A legend if you use colours.","Tools: Canva, draw.io, Excalidraw, or ask Claude for Mermaid code."],p:["The C4 model's guidance on clear diagrams, with titles, keys and labelled relationships, applies to any tool."]},
 {h:"Your next 90 days",bullets:["Applications or internal moves targeted.","One new project to build.","Talks or posts planned.","Skills to deepen."]},
 {h:"Key terms",gloss:[["Spaced review","Revisiting topics at increasing intervals"],["Integration","Connecting topics into one story"],["End-to-end","From problem to production operation"],["Self-assessment","Rating your own confidence by area"],["90-day plan","Concrete next steps with dates"]]}
],
quiz:[["What's the first step of the review plan?","Self-assess each category."],["Name the three phases of the end-to-end story.","Build, prove, run."],["What makes a diagram clear?","One message, plain labels, a legend if needed."],["What goes in the 90-day plan?","Applications, a project, talks or posts, skills to deepen."]],
deeper:["c4","sdPrimer"]},
{prac:["Teach one topic to a colleague; it reveals what you really know.","Celebrate finishing, then pick the next project immediately to keep momentum."],
 mis:[["Finishing the path means you're done learning.","AI changes constantly; keep building."],["Breadth beats depth.","Two or three deep projects matter most."],["Diagrams are decoration.","They're how leaders understand systems."]]});
