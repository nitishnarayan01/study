// Phase 4: AI Quality & Evaluation. URLs returned by live web searches on 16 Nov 2026.
Object.assign(R,{
  clEvals:["Define success criteria and build evaluations (Claude docs)","https://platform.claude.com/docs/en/test-and-evaluate/define-success","Read"],
  hamelEvals:["Your AI product needs evals (Hamel Husain)","https://hamel.dev/blog/posts/evals/","Read"],
  hamelJudge:["Using LLM-as-a-judge for evaluation (Hamel Husain)","https://hamel.dev/blog/posts/llm-judge/","Read"],
  ragasDocs:["Ragas documentation","https://docs.ragas.io/en/stable/","Reference"],
  deepevalDocs:["DeepEval quickstart","https://www.deepeval.com/docs/getting-started","Do"],
  mlccPR:["Accuracy, precision, recall (Google ML Crash Course)","https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall","Read"],
  evPrk:["Precision and recall at K (Evidently AI)","https://evidentlyai.com/ranking-metrics/precision-recall-at-k","Read"],
  evMrr:["Mean reciprocal rank explained (Evidently AI)","https://www.evidentlyai.com/ranking-metrics/mean-reciprocal-rank-mrr","Read"],
  evNdcg:["NDCG explained (Evidently AI)","https://evidentlyai.com/ranking-metrics/ndcg-metric","Read"],
  anthAgentEvals:["Demystifying evals for AI agents (Anthropic)","https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents","Read"],
  promptfoo:["promptfoo: test and evaluate LLM apps (docs)","https://www.promptfoo.dev/docs/intro","Tool"],
  mmlu:["Measuring Massive Multitask Language Understanding (MMLU paper)","https://arxiv.org/abs/2009.03300","Read"]
});
const EVL="AI Quality & Evaluation";

addTopic({id:"evl01",cat:EVL,t:"Why evals matter and how to define quality",d:"Understand",p:"P0",n:"New",h:2,
what:"An eval is a repeatable test for an AI system: a set of inputs, the system's outputs, and a way to grade them. Defining quality means turning 'it should be good' into specific, measurable criteria such as accuracy on a task, tone, safety, latency and cost.",
why:"Without evals, every prompt change, model upgrade or bug fix is a guess. Evals turn AI quality into something you can plan, report and gate releases on, which is exactly what a TPM needs.",
concepts:["Specific, measurable, achievable, relevant criteria","Multiple dimensions: accuracy, tone, safety, latency, cost","Pass rate as a product decision","Offline evals vs online monitoring","Look at the data: error analysis first","Evals as the shared language between product and engineering"],
learn:["clEvals","hamelEvals"],
doIt:"For one AI feature you know, write five success criteria with a number attached to each (for example, '95% of answers cite a source').",
prove:"Turn those criteria into a one-page quality scorecard you could review weekly with the team.",
interview:"How do you know if an AI feature is good enough to launch?",
covers:["Evaluating LLM Outputs","AI Product Metrics (Precision, Recall, Latency)"]},
{sections:[
 {h:"From vague to measurable",table:[["Vague","Measurable"],["Accurate answers","At least 90% correct on a 200-question test set"],["Safe","Fewer than 0.1% of outputs flagged by the safety filter"],["Fast","95% of responses start within 2 seconds"],["Affordable","Average cost per conversation under 2 rupees"],["On-brand","Average tone score of 4 or more on a defined rubric"]],p:["Anthropic's guidance on success criteria says good criteria are specific, measurable, achievable and relevant, and that most use cases need several dimensions, not one."]},
 {h:"Kinds of grading",table:[["Grader","How it works","Good for"],["Code-based","Exact match, contains, valid JSON, length","Classification, extraction, format rules"],["Model-based (LLM-as-judge)","Another model scores against a rubric","Tone, helpfulness, faithfulness"],["Human","Experts review and label","Calibration, high-stakes or subtle judgements"]]},
 {h:"Start with error analysis",p:["Practitioners such as Hamel Husain stress looking at real outputs before inventing metrics: read 50 to 100 traces, write down what went wrong, group the failures, and build evals for the failure types that matter most. Generic scores rarely tell you what to fix; specific failure categories do.","Unlike traditional unit tests, you don't necessarily need 100% pass rates; the acceptable pass rate is a product decision."]},
 {h:"Offline and online",bullets:["Offline evals run on a fixed test set before release, like regression tests.","Online monitoring watches real traffic: user feedback, escalation rates, sampled reviews.","Both are needed: offline catches regressions early; online catches what the test set missed."]},
 {h:"Key terms",gloss:[["Eval","A repeatable test of an AI system's outputs"],["Success criteria","Measurable targets that define 'good enough'"],["Grader","The method that scores an output"],["Error analysis","Reviewing failures to find patterns"],["Pass rate","Share of test cases meeting the criteria"]]}
],
quiz:[["Rewrite 'the bot should be fast' as a criterion.","For example: 95% of responses start within 2 seconds."],["What should come before choosing metrics?","Looking at real outputs and analysing errors."],["Must an AI eval suite pass 100%?","No; the acceptable pass rate is a product decision."],["Why combine offline evals and online monitoring?","Offline catches regressions before release; online catches what the test set missed."]],
deeper:["clEvals","hamelEvals"]},
{prac:["Make 'eval plan agreed' an entry criterion for building any AI feature, the same way acceptance criteria are for stories. It forces the quality conversation early.","Put the eval scorecard in the weekly status report. It turns 'the AI seems better' into numbers stakeholders can track."],
 mis:[["Evals are a data science job.","Product and domain experts define what good means; that's the hard part."],["One overall score is enough.","Quality has several dimensions; one number hides trade-offs."],["We'll add evals after launch.","Without them you can't tell whether launch-day changes helped or hurt."]]});

addTopic({id:"evl02",cat:EVL,t:"Golden datasets and ground truth",d:"Use",p:"P0",n:"New",h:2,
what:"A golden dataset is a curated set of test inputs with known correct answers (ground truth) or clear grading notes, used to evaluate an AI system the same way every time. It should represent real usage, including hard and unusual cases.",
why:"The golden dataset is the foundation of every eval. If it's small, unrepresentative or wrong, every score built on it misleads. Building one is a practical task a TPM can lead with domain experts.",
concepts:["Representative coverage of real use","Edge cases and adversarial inputs","Ground truth labels and grading notes","Labelling guidelines and agreement","Versioning and refreshing the set","Held-out sets to avoid overfitting"],
learn:["clEvals","hamelEvals"],
doIt:"Build a 30-row golden dataset in a spreadsheet for one task (for example, classifying support tickets): input, expected answer, category, difficulty, notes.",
prove:"Have a colleague label 10 rows independently and compare. Where you disagree, improve the labelling guidelines.",
interview:"How would you build a test set for an AI feature with no production data yet?",
covers:["Golden Datasets","Ground Truth"]},
{sections:[
 {h:"What goes in",table:[["Slice","Why include it","Rough share"],["Common cases","Reflect everyday usage","Most of the set"],["Edge cases","Unusual but legitimate inputs","A meaningful minority"],["Hard cases","Ambiguous, multi-part or tricky","Some"],["Out of scope","Things the system should decline or redirect","Some"],["Adversarial","Attempts to break rules or inject instructions","A few"]]},
 {h:"Building it, step by step",steps:[["Collect real examples","From logs, tickets, emails or user research; remove personal data"],["Fill gaps","Write or generate examples for missing scenarios"],["Write labelling guidelines","What counts as correct, with examples"],["Label with domain experts","Ideally two people on a sample to check agreement"],["Add metadata","Category, difficulty and source, so you can slice results"],["Version it","Changes are tracked so scores stay comparable over time"]]},
 {h:"Ground truth isn't always one answer",p:["For classification or extraction there's usually one correct answer. For open-ended tasks like summaries or advice, ground truth is a set of must-include facts, must-avoid errors, or a reference answer plus a rubric. The labelling guideline matters as much as the labels."]},
 {h:"Keeping it honest",bullets:["Keep a held-out set you don't tune prompts against, to detect overfitting.","Refresh with new real examples as usage changes.","Add every production bug as a new test case.","Don't let the set be dominated by easy cases; they inflate scores."]},
 {h:"Key terms",gloss:[["Golden dataset","A curated, labelled test set"],["Ground truth","The correct answer or reference for a test case"],["Inter-annotator agreement","How often labellers agree"],["Held-out set","Test data kept separate from tuning"],["Slice","A subset of results, such as one category"]]}
],
quiz:[["Why include out-of-scope examples?","To test that the system declines or redirects correctly."],["Two labellers disagree often. What do you fix first?","The labelling guidelines."],["What should happen to every production bug?","It becomes a new test case."],["Why keep a held-out set?","To detect overfitting to the examples you tuned against."]],
deeper:["clEvals","hamelEvals"]},
{prac:["Run a two-hour labelling session with domain experts early in a project. It surfaces disagreements about 'correct' that would otherwise appear after launch.","Track the golden dataset like a product artefact: owner, version, change log. Scores from different versions aren't comparable."],
 mis:[["More data is always better.","Representative, well-labelled data beats a large sloppy set."],["Synthetic data can replace real examples.","It fills gaps but misses real users' quirks."],["The set is done once built.","Usage changes; the set must evolve."]]});

addTopic({id:"evl03",cat:EVL,t:"LLM-as-a-judge rubrics",d:"Use",p:"P0",n:"New",h:2,
what:"LLM-as-a-judge uses a model to grade another model's output against a rubric, such as 'Did the answer resolve the customer's question? Pass or fail, with reasoning.' It scales evaluation to thousands of cases, but only after the judge has been checked against human expert judgement.",
why:"Many qualities that matter (helpfulness, tone, faithfulness) can't be checked with simple code. A calibrated judge makes them measurable every day, which makes continuous quality management possible.",
concepts:["Binary pass/fail with a critique beats vague 1 to 5 scales","Domain expert defines what good means","Calibrate the judge against human labels","One judge per failure type","Judge bias: position, length, self-preference","Re-check the judge periodically"],
learn:["hamelJudge","clEvals"],
doIt:"Write a pass/fail rubric for 'good meeting summary' with three criteria and one example of a pass and a fail. Test it in Claude on five summaries.",
prove:"Grade the same five summaries yourself and calculate how often you and the judge agree.",
interview:"How can you trust an AI to grade another AI?",
covers:["Quality Metrics (LLM-as-a-judge)"]},
{sections:[
 {h:"Why binary judgements",p:["Scores on a 1 to 5 scale sound precise but are hard to interpret: what makes a 3 rather than a 4? Hamel Husain's widely cited approach, which he calls critique shadowing, has a principal domain expert make pass/fail decisions with a written critique explaining why. Those critiques then become examples in the judge's prompt."]},
 {h:"Building a judge",steps:[["Find the domain expert","One trusted person keeps judgements consistent"],["Collect examples","Real or realistic outputs covering varied cases"],["Expert labels pass/fail with a critique","Detailed enough that a new employee would understand"],["Write the judge prompt","Rubric plus a few of the expert's labelled examples"],["Measure agreement","Compare judge and expert on cases the judge hasn't seen"],["Iterate","Refine the prompt until agreement is acceptable, then monitor"]]},
 {h:"Known biases",table:[["Bias","What happens","Mitigation"],["Position","Prefers the first (or second) option in comparisons","Swap order and average"],["Length","Prefers longer answers","Rubric rewards concision explicitly"],["Self-preference","Rates its own style higher","Use a different model as judge, or calibrate"],["Leniency","Passes almost everything","Include clear fail examples; check against humans"]]},
 {h:"Practical rules",bullets:["One judge per specific failure mode beats one giant 'quality' judge.","Ask for reasoning before the verdict; it improves consistency and helps debugging.","Allow 'unknown' when the evidence is insufficient.","Re-check agreement whenever the product, prompt or judge model changes.","Use code checks wherever possible; they're cheaper and deterministic."]},
 {h:"Key terms",gloss:[["LLM-as-a-judge","Using a model to grade outputs against a rubric"],["Rubric","The criteria and examples defining pass and fail"],["Calibration","Aligning the judge with expert human judgement"],["Agreement rate","How often judge and human give the same verdict"],["Critique","Written reasoning behind a judgement"]]}
],
quiz:[["Why prefer pass/fail with critiques over 1 to 5 scores?","They're clearer, more consistent and explain what to fix."],["What must you do before trusting a judge?","Measure its agreement with a domain expert on unseen cases."],["How do you reduce position bias?","Swap the order and compare or average."],["When should you prefer code checks?","Whenever the criterion can be checked deterministically, like format or exact values."]],
deeper:["hamelJudge","clEvals"]},
{prac:["Name one person as the quality owner whose judgement the judge is calibrated to. Committees produce inconsistent labels.","Report judge agreement alongside judge scores. A 92% pass rate from a judge with 70% agreement means much less than it appears."],
 mis:[["An LLM judge is objective.","It inherits biases and needs calibration."],["One judge can grade everything.","Separate, focused judges are more accurate."],["Once calibrated, always calibrated.","Changes to prompts, models or products require rechecking."]]});

addTopic({id:"evl04",cat:EVL,t:"Precision, recall, F1",d:"Understand",p:"P0",n:"New",h:1.5,
what:"Precision asks: of everything the system flagged, how much was right? Recall asks: of everything it should have flagged, how much did it find? F1 is a single score that balances the two. They're the standard metrics for classification tasks such as spam detection, fraud flags or ticket routing.",
why:"These metrics expose trade-offs that accuracy hides. Choosing whether precision or recall matters more is a business decision, and TPMs are often the ones who should make it explicit.",
concepts:["True and false positives and negatives","Precision = TP / (TP + FP)","Recall = TP / (TP + FN)","F1 as the balance of both","The precision-recall trade-off and thresholds","Why accuracy misleads on imbalanced data"],
learn:["mlccPR"],
doIt:"From this example: the model flags 50 tickets as urgent, 40 really are urgent, and 20 urgent tickets were missed. Calculate precision, recall and F1.",
prove:"For two features at work, decide whether precision or recall matters more and explain the business reason.",
interview:"Our fraud model has 99% accuracy. Is that good?",
covers:["Precision, Recall, F1 Score"]},
{sections:[
 {h:"The four outcomes",table:[["","Actually positive","Actually negative"],["Predicted positive","True positive (TP)","False positive (FP): false alarm"],["Predicted negative","False negative (FN): missed","True negative (TN)"]]},
 {h:"The formulas, in words",table:[["Metric","Formula","Plain question"],["Precision","TP / (TP + FP)","When it says yes, how often is it right?"],["Recall","TP / (TP + FN)","Of all the real yeses, how many did it catch?"],["F1","2 x precision x recall / (precision + recall)","A single balance of the two"],["Accuracy","(TP + TN) / everything","How often is it right overall?"]],p:["Worked example: 50 flagged, 40 correct, 20 missed. Precision = 40/50 = 0.80. Recall = 40/60 = 0.67. F1 = 2 x 0.80 x 0.67 / 1.47, roughly 0.73."]},
 {h:"The trade-off",p:["Google's Machine Learning Crash Course notes that precision and recall are often in tension: raising the threshold for saying 'yes' usually increases precision and lowers recall, and lowering it does the opposite. You choose the balance based on which error costs more."],table:[["Use case","Which matters more","Why"],["Cancer screening","Recall","Missing a case is far worse than a false alarm"],["Spam filter","Precision","Losing a real email is worse than seeing some spam"],["Fraud alerts to customers","Balance","Missed fraud costs money; false alarms annoy customers"]]},
 {h:"Why accuracy misleads",p:["If 1% of transactions are fraud, a model that always says 'not fraud' is 99% accurate and completely useless. On imbalanced data, look at precision, recall and F1, not accuracy."]},
 {h:"Key terms",gloss:[["False positive","Flagged but wrong (false alarm)"],["False negative","Missed a real case"],["Threshold","The confidence level above which the system says yes"],["Imbalanced data","One class is much rarer than another"],["F1 score","Harmonic mean of precision and recall"]]}
],
quiz:[["The model flagged 100, 90 were right. What's its precision?","0.90."],["There were 120 real cases and it caught 90. What's recall?","0.75."],["Which matters more for a spam filter?","Usually precision, to avoid losing real emails."],["Why is 99% accuracy meaningless for rare fraud?","Always saying 'not fraud' would achieve it."]],
deeper:["mlccPR"]},
{prac:["Ask for a confusion matrix, not just accuracy, in every classification review. The four numbers tell a much richer story.","Write down the cost of each error type in money or customer impact. It turns the threshold choice into a business decision instead of a technical default."],
 mis:[["High accuracy means a good model.","Not on imbalanced data."],["You can maximise precision and recall together.","Usually improving one lowers the other."],["F1 is always the right single metric.","Choose based on which errors cost more."]]});

addTopic({id:"evl05",cat:EVL,t:"Retrieval metrics: Recall@K, MRR, NDCG",d:"Understand",p:"P0",n:"New",h:1.5,
what:"In RAG systems, retrieval quality is measured separately from answer quality. Recall@K: did the relevant documents appear in the top K results? Precision@K: how many of the top K were relevant? MRR: how high was the first relevant result? NDCG: how good was the whole ranking compared with the ideal order?",
why:"Most bad RAG answers start with bad retrieval: the right document was never found. Measuring retrieval directly tells teams whether to fix search or fix the prompt, which saves weeks of guessing.",
concepts:["Relevance labels per query","Recall@K and Precision@K","Mean reciprocal rank (MRR)","NDCG and graded relevance","Choosing K to match what the model sees","Retrieval vs generation failures"],
learn:["evPrk","evMrr","evNdcg"],
doIt:"For 5 questions about your company's documents, list which documents are relevant. Then search with your tool of choice and calculate Recall@5 for each question.",
prove:"Explain to an engineer, using your results, whether the RAG problem is in retrieval or in generation.",
interview:"A RAG assistant gives wrong answers. How would you find out why?",
covers:["Retrieval Evaluation","Retrieval Metrics: Recall@K, Precision@K, MRR, NDCG"]},
{sections:[
 {h:"The metrics",table:[["Metric","Question it answers","Range"],["Recall@K","Of all relevant documents, what share appear in the top K?","0 to 1"],["Precision@K","Of the top K results, what share are relevant?","0 to 1"],["MRR","On average, how close to the top is the first relevant result? (1 / its rank)","0 to 1"],["NDCG@K","How close is the ranking to the ideal order, giving more credit to higher positions and more relevant documents?","0 to 1"]]},
 {h:"Worked example",p:["Question: 'What's our refund window?' Two documents are relevant: the refund policy and the FAQ. The system returns five results; the FAQ is at rank 2 and the policy at rank 6.","Recall@5 = 1/2 = 0.5 (only the FAQ is in the top 5). Precision@5 = 1/5 = 0.2. Reciprocal rank = 1/2 = 0.5, because the first relevant result is at rank 2. If the model only sees the top 5, it never sees the policy, so even a perfect prompt can't fix that answer."]},
 {h:"Which metric when",bullets:["Recall@K is usually the most important for RAG: if the answer isn't in what the model sees, it can't use it.","Set K to the number of chunks you actually pass to the model.","MRR matters when users or the model rely mostly on the first result.","NDCG matters when relevance is graded (very relevant vs somewhat) and order matters.","Precision@K matters when irrelevant chunks confuse the model or waste tokens."]},
 {h:"Separating the two halves of RAG",table:[["Retrieval good?","Answer good?","Where's the problem"],["Yes","Yes","Working"],["Yes","No","Generation: prompt, model or context handling"],["No","No","Retrieval: chunking, embeddings, search, query"],["No","Yes","Lucky, or the model answered from its own knowledge, which is a risk"]]},
 {h:"Key terms",gloss:[["K","The number of top results considered"],["Relevance label","Whether a document is relevant to a query"],["Reciprocal rank","1 divided by the position of the first relevant result"],["Graded relevance","Relevance on a scale, not just yes/no"],["Retriever","The search component in RAG"]]}
],
quiz:[["The first relevant result is at rank 4. What's the reciprocal rank?","0.25."],["Which metric matters most for RAG answer quality, and why?","Recall@K, because the model can't use what it never sees."],["What K should you use?","The number of chunks actually passed to the model."],["Retrieval is good but answers are wrong. Where do you look?","Generation: the prompt, model or how context is used."]],
deeper:["evPrk","evMrr","evNdcg"]},
{prac:["Ask RAG teams to report retrieval metrics and answer metrics separately. Mixed metrics hide whether to invest in search or prompting.","Build a small labelled retrieval set (50 questions with their relevant documents) early. It's cheap and makes every later RAG decision faster."],
 mis:[["Good answers prove good retrieval.","The model may be answering from its own memory."],["More retrieved chunks always help.","They add noise, cost and confusion."],["NDCG is always the best metric.","Recall@K is often what matters most for RAG."]]});

addTopic({id:"evl06",cat:EVL,t:"Groundedness, hallucination detection and citation accuracy",d:"Use",p:"P0",n:"New",h:2,
what:"Groundedness (or faithfulness) measures whether every claim in an answer is supported by the provided sources. Hallucination detection flags claims that aren't. Citation accuracy checks that each citation actually supports the sentence it's attached to.",
why:"For assistants answering from company documents, an unsupported claim is the most damaging failure: it looks authoritative and is wrong. These checks are how you prove the assistant sticks to the sources.",
concepts:["Claims extracted from the answer","Each claim checked against the context","Faithfulness score","Citation precision and recall","Answering 'I don't know' when sources are silent","Automated checks plus human spot checks"],
learn:["ragasDocs","clHall"],
doIt:"Take three RAG answers (from NotebookLM or your own tool). Split each into claims and mark each claim supported, partly supported or unsupported by the cited source.",
prove:"Write a groundedness policy for an assistant: target score, what happens to unsupported claims, and when it should refuse.",
interview:"How would you measure and reduce hallucinations in a document assistant?",
covers:["Groundedness Scoring","Citation Accuracy","Hallucination Detection"]},
{sections:[
 {h:"How groundedness is measured",steps:[["Break the answer into claims","Each factual statement becomes a separate claim"],["Check each claim","Is it supported by the retrieved context? (often an LLM judge)"],["Score","Supported claims divided by total claims"],["Flag","Unsupported claims are hallucinations relative to the sources"]],p:["Libraries such as Ragas implement this as a faithfulness metric, using a judge model to compare claims with the retrieved context."]},
 {h:"Citation accuracy",table:[["Check","Question"],["Citation precision","Does each cited source actually support the sentence it's attached to?"],["Citation recall","Does every factual sentence that needs a citation have one?"],["Source validity","Does the cited document exist and was it in the retrieved context?"]]},
 {h:"Reducing hallucinations",bullets:["Instruct the model to answer only from provided sources and say so when they're silent.","Ask for quotes or citations for each claim.","Improve retrieval so the right evidence is present.","Add a verification step that checks claims before showing the answer.","Lower temperature for factual tasks.","Show sources to users so they can check."],p:["Anthropic's guide on reducing hallucinations includes several of these techniques, such as allowing the model to say 'I don't know' and asking it to find supporting quotes first."]},
 {h:"Key terms",gloss:[["Groundedness / faithfulness","Share of claims supported by the sources"],["Hallucination","A claim not supported by sources or facts"],["Claim","A single factual statement"],["Citation precision","Citations that genuinely support their sentences"],["Abstention","Declining to answer when evidence is missing"]]}
],
quiz:[["An answer has 10 claims and 8 are supported by sources. What's its groundedness?","0.8."],["What's citation precision?","Whether each citation actually supports the sentence it's attached to."],["Name two ways to reduce hallucinations.","Answer only from sources, allow 'I don't know', require citations, improve retrieval, verify claims."],["Is a true claim that isn't in the sources a problem?","For a grounded assistant, yes: it's unsupported and unverifiable."]],
deeper:["ragasDocs","clHall"]},
{prac:["Make 'says I don't know when sources are silent' an explicit acceptance criterion for document assistants, with test cases. Teams often optimise for always answering.","Show citations in the UI and track how often users click them. It builds trust and gives you a feedback signal."],
 mis:[["Citations prove the answer is correct.","Only if the cited text actually supports the claim."],["Hallucinations can be eliminated.","They can be reduced and detected, not guaranteed away."],["Groundedness is the same as correctness.","An answer can faithfully repeat a wrong source."]]});

addTopic({id:"evl07",cat:EVL,t:"Answer relevance",d:"Understand",p:"P1",n:"New",h:1,
what:"Answer relevance measures whether a response actually addresses the question asked: complete, on-topic and without padding. An answer can be accurate and grounded yet still unhelpful if it answers a different question or buries the point.",
why:"Users judge assistants on whether they got what they asked for. Relevance complements accuracy and groundedness to give a fuller picture of quality.",
concepts:["Does it answer the actual question?","Completeness for multi-part questions","Conciseness and focus","Relevance vs correctness vs groundedness","Measuring with rubrics or judges","User signals: follow-ups and rephrasing"],
learn:["ragasDocs","clEvals"],
doIt:"Write three questions with two parts each. Ask an assistant, and mark each answer for whether both parts were addressed.",
prove:"Add a relevance criterion to your quality scorecard with a target and how it's measured.",
interview:"An assistant's answers are accurate but users are unhappy. What might be wrong?",
covers:["Answer Relevance"]},
{sections:[
 {h:"Three different questions",table:[["Dimension","Question","Failure example"],["Correctness","Is it true?","Wrong refund period"],["Groundedness","Is it supported by the sources?","A plausible claim not in any document"],["Relevance","Does it address what was asked?","Explains the whole refund policy when asked only about deadlines"]]},
 {h:"How it's measured",bullets:["Rubric or judge: 'Does the response directly and completely address the question? Pass or fail.'","Multi-part checks: list the parts of the question and check each is answered.","Embedding-based scores: some libraries generate the questions an answer would fit and compare them with the original question.","User signals: rephrased questions, quick follow-ups and thumbs-down often indicate low relevance."]},
 {h:"Common causes of low relevance",bullets:["Retrieval returns related but not specific content.","The prompt encourages comprehensive answers over direct ones.","Ambiguous questions with no clarifying step.","Multi-part questions where only the first part is answered."]},
 {h:"Key terms",gloss:[["Answer relevance","How directly and completely a response addresses the question"],["Completeness","All parts of the question answered"],["Clarifying question","Asking the user to resolve ambiguity before answering"],["Implicit feedback","Signals from behaviour, like rephrasing"]]}
],
quiz:[["Can an answer be correct and grounded but irrelevant?","Yes, if it doesn't address the actual question."],["Name one user signal of low relevance.","Users rephrasing or immediately asking follow-ups."],["How do you check multi-part questions?","List the parts and check each one is answered."],["A common cause of irrelevant answers?","Retrieval of related but non-specific content, or prompts favouring long answers."]],
deeper:["ragasDocs","clEvals"]},
{prac:["Track the rephrase rate (questions re-asked within a minute) as a cheap relevance signal in production dashboards.","Include ambiguous questions in the test set and decide upfront whether the assistant should ask a clarifying question or make a reasonable assumption."],
 mis:[["Longer answers are more helpful.","Focus usually beats length."],["Relevance is subjective, so unmeasurable.","A clear rubric makes it consistently measurable."],["If it's accurate, users will be happy.","They also need it to answer their actual question."]]});

addTopic({id:"evl08",cat:EVL,t:"Regression testing for prompts and models",d:"Understand",p:"P0",n:"New",h:2,
what:"Regression testing for AI means running the same eval suite whenever something changes (the prompt, the model, retrieval settings, tools) and comparing results with the previous version, so improvements in one place don't silently break another.",
why:"AI systems change constantly: prompt tweaks, model upgrades, new documents. Without regression tests, every change is a gamble and quality drifts. This is the AI equivalent of the test suite engineers already rely on.",
concepts:["Fixed suite run on every change","Comparing against a baseline","Slicing results by category","Thresholds that block a release","Non-determinism: multiple runs","Tools: promptfoo, DeepEval, custom harnesses"],
learn:["promptfoo","deepevalDocs","anthAgentEvals"],
doIt:"Write 10 test cases for a prompt (input plus what must or must not appear), run them against two prompt versions in Claude, and compare.",
prove:"Define the release rule: which metrics must not drop, by how much, before a change can ship.",
interview:"A model upgrade improved average quality but users complain. What might your evals have missed?",
covers:["Regression Testing"]},
{sections:[
 {h:"What triggers a regression run",bullets:["Any prompt change, however small.","Switching or upgrading the model.","Changing retrieval: chunking, embeddings, number of results.","Adding or changing tools.","New or updated source documents.","Changes to guardrails or post-processing."]},
 {h:"How it works",steps:[["Baseline","Run the suite on the current production version and save results"],["Change","Make the prompt, model or config change"],["Re-run","Run the identical suite on the new version"],["Compare","Overall and per category: what improved, what got worse"],["Decide","Ship if release thresholds are met; investigate regressions"]],p:["Tools like promptfoo let teams define test cases with assertions (contains, valid JSON, LLM-graded rubric, latency, cost) and run them from the command line or in CI."]},
 {h:"Watch the slices",p:["An average can rise while an important category falls. A model upgrade might improve general questions but worsen refunds, which are 5% of traffic but most of the complaints. Always compare results per category, and treat drops in high-risk categories as blockers even if the average improves."]},
 {h:"Dealing with randomness",bullets:["Use low temperature for evals where possible.","Run important cases several times and look at pass rates, not single results.","Set thresholds with a margin for natural variation.","Keep the eval set fixed and versioned so changes in scores reflect the system, not the test."]},
 {h:"Key terms",gloss:[["Regression","A drop in quality caused by a change"],["Baseline","The results of the current version, used for comparison"],["Release threshold","The quality bar a change must meet to ship"],["Assertion","A check on an output, like 'contains' or 'is valid JSON'"],["Eval harness","The system that runs evals and records results"]]}
],
quiz:[["Name three changes that should trigger a regression run.","Prompt change, model change, retrieval or tool changes, new documents."],["The average went up but refunds got worse. Ship?","Not without investigating; high-risk slices can block."],["How do you handle non-deterministic outputs?","Low temperature, repeated runs and thresholds with margin."],["What's a baseline?","The current version's results used for comparison."]],
deeper:["promptfoo","deepevalDocs","anthAgentEvals"]},
{prac:["Make 'eval results attached' a requirement on every pull request that changes prompts or model settings, the same as passing unit tests.","Keep a regression dashboard over time. A slow decline across many small changes is otherwise invisible."],
 mis:[["Small prompt changes are safe.","Tiny wording changes can shift behaviour significantly."],["Newer models never regress.","They often improve overall and regress on specific tasks."],["One run is enough.","Randomness means important cases need several runs."]]});

addTopic({id:"evl09",cat:EVL,t:"Reproducibility: temperature, seeds, prompt drift",d:"Understand",p:"P1",n:"New",h:1,
what:"Reproducibility is getting the same (or acceptably similar) results when you rerun an AI system. Model outputs vary because of sampling settings like temperature, provider-side changes, and untracked changes to prompts, data or models. Managing those sources makes behaviour explainable.",
why:"When a stakeholder asks 'why did it say that last Tuesday?', you need to know exactly which prompt, model and data produced the answer. Reproducibility underpins debugging, audits and fair evaluation.",
concepts:["Temperature and sampling randomness","Seeds and their limits","Pinning model versions","Versioning prompts and configs","Prompt drift: untracked edits","Logging what produced each output"],
learn:["clPe","clEvals"],
doIt:"Ask the same question five times at default settings and five times with temperature 0 (in AI Studio or the API). Note how much the answers vary.",
prove:"Write the list of things that must be logged with every AI response for full traceability.",
interview:"How would you investigate a complaint about an AI answer from last week?",
covers:["Reproducibility"]},
{sections:[
 {h:"Sources of variation",table:[["Source","What changes","Control"],["Sampling","Random word choices","Low temperature for factual tasks"],["Model version","Provider updates or aliases pointing to new versions","Pin exact model versions"],["Prompt","Untracked edits by different people","Version prompts in Git or a prompt registry"],["Context","Different retrieved documents or history","Log the exact context sent"],["Tools and data","External data changed","Log tool inputs and outputs"]]},
 {h:"Temperature and seeds",p:["Temperature controls randomness: higher values give more varied output, lower values more consistent output. Even at temperature 0, outputs aren't always identical, because of how large models run on shared hardware. Some APIs offer a seed parameter for more repeatable sampling, but it's best treated as reducing variation, not guaranteeing identical results."]},
 {h:"Prompt drift",p:["Prompt drift is when the prompt in production slowly changes through small, undocumented edits until nobody knows which version produced which behaviour. The fix is treating prompts like code: stored in version control, reviewed, tested with the eval suite and released with a version number."]},
 {h:"What to log per response",bullets:["Timestamp and request ID.","Exact model version and settings (temperature, max tokens).","Prompt version.","Retrieved context and tool calls with results.","The output and any post-processing.","User feedback, if any."]},
 {h:"Key terms",gloss:[["Temperature","Setting that controls output randomness"],["Seed","A value that makes sampling more repeatable"],["Pinned version","A specific model version that won't change"],["Prompt drift","Gradual untracked prompt changes"],["Traceability","Being able to reconstruct how an output was produced"]]}
],
quiz:[["Does temperature 0 guarantee identical outputs?","No, but it greatly reduces variation."],["Why pin model versions?","So provider updates don't silently change behaviour."],["What fixes prompt drift?","Versioning prompts like code, with review and tests."],["Name three things to log per response.","Model version, settings, prompt version, context, tool calls, output."]],
deeper:["clPe","clEvals"]},
{prac:["Agree a prompt change process: who can edit, where prompts live, and that every change runs the eval suite. It prevents 'someone tweaked it on Friday' incidents.","Make sure logs can reconstruct any answer for at least the period your complaints and audit process needs."],
 mis:[["AI is too random to reproduce.","Most variation can be controlled or logged."],["Model names never change behaviour.","Aliases can move to new versions; pin them."],["Prompts are just text, not code.","They change behaviour like code and need the same discipline."]]});

addTopic({id:"evl10",cat:EVL,t:"RAG benchmarking with Ragas",d:"Use",p:"P0",n:"New",h:2.5,
what:"Ragas is an open-source library for evaluating RAG systems with metrics such as faithfulness, answer relevancy, context precision and context recall. Similar tools include DeepEval and TruLens. They let teams benchmark a RAG pipeline on a test set and compare versions.",
why:"RAG has many moving parts (chunking, embeddings, retrieval, prompts, models). A standard benchmark shows which change actually helps, so teams stop debating and start measuring.",
concepts:["A RAG test set: question, reference answer, retrieved context","Faithfulness and answer relevancy","Context precision and context recall","Metrics computed by judge models","Comparing pipeline versions","Limits: judge cost, calibration, small sets"],
learn:["ragasDocs","deepevalDocs"],
doIt:"Read the Ragas metrics documentation and write a one-line plain-English definition for faithfulness, answer relevancy, context precision and context recall.",
prove:"Design a benchmark plan for a RAG assistant: test set size, metrics, targets, and which pipeline variants to compare.",
interview:"How would you decide whether a new chunking strategy improved your RAG system?",
covers:["RAG Benchmarking","Evaluation Libraries (Ragas, DeepEval, TruLens)"]},
{sections:[
 {h:"The core Ragas metrics",table:[["Metric","Measures","Needs"],["Faithfulness","Are the answer's claims supported by the retrieved context?","Answer, context"],["Answer relevancy","Does the answer address the question?","Question, answer"],["Context precision","Are the relevant chunks ranked near the top?","Question, context, reference"],["Context recall","Did retrieval find the information needed for the reference answer?","Context, reference"]],p:["Most of these metrics use a judge model to make their assessments, so the same calibration cautions from the LLM-as-a-judge lesson apply."]},
 {h:"Running a benchmark",steps:[["Build the test set","Questions with reference answers; 50 to 200 is a practical start"],["Run the pipeline","Record the retrieved context and the answer for each question"],["Score","Compute the metrics for each row and the averages"],["Change one thing","For example, chunk size from 500 to 1,000 tokens"],["Re-run and compare","Look at averages and at individual rows that changed"],["Sanity-check","Read a sample; confirm the metric changes match what a human would say"]]},
 {h:"Reading the results",table:[["Pattern","Likely fix"],["Low context recall","Retrieval misses information: chunking, embeddings, hybrid search, query rewriting"],["Low context precision","Too much noise: reranking or fewer chunks"],["Low faithfulness, good recall","Generation adds things: tighten the prompt, require citations"],["Low answer relevancy","Prompt or retrieval returns related but off-target material"]]},
 {h:"Key terms",gloss:[["Ragas","Open-source library for evaluating RAG pipelines"],["Context precision","Relevant chunks ranked highly among those retrieved"],["Context recall","Needed information present in retrieved context"],["Reference answer","A trusted answer used for comparison"],["Pipeline variant","A version of the RAG setup being compared"]]}
],
quiz:[["Context recall is low. Is the problem retrieval or generation?","Retrieval."],["Faithfulness is low but context recall is good. Where do you look?","Generation: the prompt or model is adding unsupported content."],["Why change one thing at a time?","So you know which change caused the difference."],["What's a key limitation of these metrics?","They rely on judge models that need calibration."]],
deeper:["ragasDocs","deepevalDocs"]},
{prac:["Insist on a benchmark run before and after every RAG pipeline change, with results in the pull request. It ends 'I think it's better' debates.","Spot-check rows where scores changed most. Metric movements sometimes come from judge quirks, not real improvement."],
 mis:[["A high Ragas score means the product is good.","It measures specific properties; users care about more."],["Bigger chunks always improve recall.","They can add noise and hurt precision and faithfulness."],["Benchmarks replace user feedback.","They complement it; real usage reveals new failure types."]]});

addTopic({id:"evl11",cat:EVL,t:"Evaluating agents",d:"Understand",p:"P0",n:"New",h:1.5,
what:"Agents work over many steps, use tools and change things, so evaluating them means checking both the outcome (did the final state meet the goal?) and the path (sensible tool use, safe actions, reasonable cost). Agent evals run tasks in a controlled environment, often several times each, and grade with code, judges and humans.",
why:"Agent failures are expensive and varied: wrong actions, loops, runaway costs. A clear eval approach is what lets an organisation trust agents with real work and adopt new models quickly.",
concepts:["Tasks, trials, transcripts and outcomes","Outcome grading vs path grading","Code-based, model-based and human graders","Multiple trials for non-determinism","Capability evals vs regression evals","Cost, steps and safety as metrics"],
learn:["anthAgentEvals","anthAgents"],
doIt:"Design three eval tasks for a coding or support agent: the starting state, the goal, how success is checked automatically, and one thing the agent must never do.",
prove:"Write an agent eval plan: tasks, trials per task, graders, metrics (success rate, steps, cost, safety violations) and release thresholds.",
interview:"How would you evaluate an AI agent before giving it access to production systems?",
covers:["Agent Evaluation"]},
{sections:[
 {h:"The anatomy of an agent eval",table:[["Part","Meaning"],["Task","A starting state plus a goal, such as 'fix the failing test'"],["Trial","One attempt at the task; run several because agents vary"],["Transcript","Everything the agent said and did"],["Outcome","The final state of the environment, such as tests passing"],["Grader","Logic that scores the outcome and/or transcript"],["Harness","The system that runs tasks and records results"]],p:["Anthropic's guide to agent evals uses this vocabulary and distinguishes the transcript (what the agent did) from the outcome (the final state of the environment)."]},
 {h:"What to measure",bullets:["Success rate across trials.","Steps and tool calls taken: efficiency.","Cost and time per task.","Safety violations: forbidden actions attempted.","Behaviour quality: asked for help when stuck, didn't overreach.","Consistency: how often it succeeds across repeated trials."]},
 {h:"Graders for agents",table:[["Grader","Example"],["Code-based","Unit tests pass; the database record has the right values"],["Model-based","A judge checks the explanation to the user was accurate and polite"],["Human","Experts review a sample of transcripts for judgement and safety"]],p:["No single layer catches everything; combining graders catches more, like layers of safety checks."]},
 {h:"Capability vs regression",p:["Capability evals push on what the agent can't yet do reliably, to guide improvement. Regression evals cover what it already does well and must keep doing. Teams with good evals can test a new model release within days and adopt it with confidence."]},
 {h:"Key terms",gloss:[["Trial","One run of an agent on a task"],["Transcript","Record of the agent's steps and messages"],["Outcome","Final state after the agent finishes"],["Harness","Infrastructure that runs evals"],["Capability eval","Tests that stretch what the agent can do"]]}
],
quiz:[["Why run several trials per task?","Agents are non-deterministic; success rates need multiple attempts."],["Outcome vs transcript?","Outcome is the final state; transcript is what the agent did along the way."],["Name three agent metrics beyond success.","Steps, cost, time, safety violations, consistency."],["What's a regression eval for an agent?","Tests of things it already does well, to catch drops."]],
deeper:["anthAgentEvals","anthAgents"]},
{prac:["Run agent evals in a sandbox copy of real systems, never against production data. Evals involve the agent making mistakes on purpose-built tasks.","Track cost per successful task, not just success rate. An agent that succeeds 95% of the time at ten times the cost may not be the better choice."],
 mis:[["If the final answer is right, the agent is fine.","It may have taken unsafe or wasteful steps to get there."],["One successful demo proves capability.","Success rates across many trials do."],["Agent evals are too complex to start.","A handful of well-chosen tasks already adds a lot of value."]]});

addTopic({id:"evl12",cat:EVL,t:"Public benchmarks and synthetic data",d:"Understand",p:"P1",n:"New",h:1.5,
what:"Public benchmarks such as MMLU (knowledge across 57 subjects), GSM8K (grade-school maths) and HumanEval (coding) compare models on standard tasks. Synthetic data is test or training data generated with models to fill gaps. Both are useful, and both have serious limits for judging your own product.",
why:"Vendors quote benchmark scores constantly. A TPM needs to read them critically and know why your own evals, built partly with synthetic data, matter more for decisions.",
concepts:["What major benchmarks measure","Saturation: top models score near the maximum","Contamination: test data seen in training","Leaderboards and human preference votes","Generating synthetic test inputs","Validating synthetic data against real usage"],
learn:["mmlu","lmarena","hamelEvals"],
doIt:"Look up a recent model announcement and list which benchmarks it quotes. For each, write one line on how relevant it is to your use case.",
prove:"Generate 20 synthetic test questions for a use case with Claude, then mark which ones resemble real user questions and which don't.",
interview:"A vendor says their model tops the benchmarks. How do you respond?",
covers:["Benchmarking (MMLU, GSM8K, HumanEval)","Synthetic Data"]},
{sections:[
 {h:"Common benchmarks",table:[["Benchmark","Measures"],["MMLU","Knowledge and problem-solving across 57 subjects, multiple choice"],["GSM8K","Multi-step grade-school maths word problems"],["HumanEval","Writing small Python functions that pass unit tests"],["Human preference leaderboards (e.g. LMArena)","Which model people prefer in blind side-by-side comparisons"]],p:["The original MMLU paper introduced a test covering 57 tasks including mathematics, history, computer science and law, and found models were far from expert level at the time. Today, top models score so highly on older benchmarks that newer, harder ones are needed."]},
 {h:"Limits of benchmarks",bullets:["Saturation: when everyone scores near the top, differences stop meaning much.","Contamination: test questions may appear in training data, inflating scores.","Mismatch: general knowledge tests say little about your specific workflow.","Selective reporting: vendors highlight benchmarks where they do well."]},
 {h:"Synthetic data, done well",steps:[["Define dimensions","Features, user types, scenarios, difficulty"],["Generate inputs","Ask a model for varied, realistic user inputs for each combination"],["Review","Remove unrealistic or duplicate examples"],["Run your system","Generate outputs with your actual product"],["Label","Experts grade the outputs as with real data"],["Replace over time","Swap in real examples as usage grows"]],p:["Hamel Husain's evals guide suggests generating synthetic user inputs when production data isn't available yet, while still having the real system produce the responses."]},
 {h:"Key terms",gloss:[["Benchmark","A standard test used to compare models"],["Saturation","Scores near the maximum, reducing a benchmark's usefulness"],["Contamination","Test data leaking into training data"],["Synthetic data","Data generated by models"],["Leaderboard","A ranking of models on a benchmark"]]}
],
quiz:[["What does MMLU measure?","Knowledge and problem-solving across 57 subjects."],["What is benchmark contamination?","Test questions appearing in a model's training data."],["What should synthetic generation produce: inputs or outputs?","Mainly inputs; your real system should produce the outputs being evaluated."],["Why aren't public benchmarks enough for model selection?","They rarely match your specific tasks and data."]],
deeper:["mmlu","lmarena","hamelEvals"]},
{prac:["In vendor evaluations, ask to run your own test set. Public benchmark scores should be a filter at most, not the decision.","Label synthetic examples in your dataset so you can report results on real and synthetic inputs separately."],
 mis:[["The top benchmark model is best for us.","Only your evals can show that."],["Synthetic data is fake, so useless.","It's valuable for coverage when validated."],["Benchmarks are objective truth.","They measure narrow tasks and can be gamed or contaminated."]]});
