// Full lessons. Sample: RAG (aif13).
const LESSONS = {
aif13:{
  mins:15,
  sections:[
   {h:"1. The problem RAG solves",
    p:["A language model only knows what was in its training data. It has never seen your HR policies, your product docs or last week's release notes, and its knowledge stops at a cut-off date. Ask it about your leave policy and it will either say it doesn't know or, worse, produce a confident answer that sounds right and isn't.",
       "You could paste the whole policy handbook into every prompt, but that gets slow and expensive, and many document sets are far bigger than any context window. You could retrain the model on your documents, but that is costly, slow to update and still doesn't reliably make the model quote the right clause.",
       "RAG (retrieval-augmented generation) takes a simpler route: at the moment a question is asked, find the few passages that are most likely to contain the answer, hand them to the model together with the question, and tell it to answer only from them. Think of it as turning a closed-book exam into an open-book exam where someone hands the student the right three pages."]},
   {h:"2. How it works, step by step",
    p:["A RAG system has two halves. The indexing half runs ahead of time, whenever documents are added or change. The answering half runs every time a user asks something."],
    flowLabel:"RAG pipeline: indexing ahead of time, then answering each question",flow:[["Ahead of time · indexing",[["1 Split","documents into chunks"],["2 Embed","chunks into vectors"],["3 Store","in a vector database"]]],["Every question · answering",[["4 Retrieve","closest chunks"],["5 Rerank","best first"],["6 Generate","answer + citations"]]]],
    steps:[
      ["Split (chunk)","Documents are cut into passages of a few hundred words. Too small and a passage loses its meaning; too large and the right sentence is buried in noise."],
      ["Embed","Each chunk is turned into an embedding, a list of numbers that captures its meaning, using an embedding model."],
      ["Store","Embeddings are saved in a vector database together with the original text and metadata such as document name, date and who is allowed to see it."],
      ["Retrieve","When a question arrives it is embedded the same way, and the database returns the closest chunks (the 'top-k', often 3 to 10). Many teams combine this with keyword search so exact terms like policy numbers are not missed."],
      ["Rerank (optional)","A second, more careful model re-orders those candidates so the very best passages come first."],
      ["Generate","The model receives the question, the retrieved passages and instructions such as 'answer only from these sources, cite them, and say so if the answer is not there'."]
    ]},
   {h:"3. Worked example: an HR policy assistant",
    p:["An employee asks: \"Can I carry over unused leave to next year?\"",
       "Retrieval searches 400 pages of HR documents and returns three chunks: the leave policy section on carry-over, a 2025 policy update that changed the limit, and a FAQ entry. The model is then prompted: \"Using only the sources below, answer the question. Quote the clause you rely on. If sources conflict, prefer the most recent and say so.\"",
       "The answer: \"Yes, up to 10 days, which must be used by 31 March (Leave Policy update, Jan 2025, section 4.2). The older handbook says 5 days; the 2025 update replaces it.\" The employee can click the citation and check.",
       "Notice that the quality of this answer depended almost entirely on retrieval. If the 2025 update had not been retrieved, the model would have confidently given the old, wrong limit."]},
   {h:"4. Where RAG fails, and how teams fix it",
    table:[
      ["Failure","What the user sees","Typical fix"],
      ["Right document never retrieved","\"I couldn't find that\" or a wrong answer","Better chunking, hybrid keyword + semantic search, reranking"],
      ["Chunk lacks context","Answer misses who or what the passage is about","Add a short summary of the document to each chunk before embedding (Anthropic's contextual retrieval)"],
      ["Outdated or conflicting sources","Old policy quoted","Remove superseded documents, store dates as metadata, tell the model to prefer the newest"],
      ["Model ignores sources","Confident answer not supported by citations","Stricter instructions, require quotes, automated groundedness checks"],
      ["Wrong person sees a document","Data leak","Filter retrieval by the user's permissions before anything reaches the model"],
      ["Question needs many documents","Partial answer","Retrieve more chunks, break the question into steps, or use an agent"]
    ],
    p:["Anthropic reported that adding context to each chunk cut failed retrievals by 49%, and by 67% when combined with reranking. The lesson for a TPM: most RAG quality work is search work, not prompt work."]},
   {h:"5. What a TPM must decide and track",
    bullets:[
      "Scope the corpus: which documents, who owns them, how often they change, and who removes outdated ones. Content ownership is the most common gap.",
      "Permissions: does every user see every document? If not, access control must be part of retrieval from day one.",
      "Build or buy: a managed product (for example an enterprise search assistant) versus your own pipeline with a vector database.",
      "Quality bar: build a set of 50 to 100 real questions with known correct answers before launch, and measure against it every release.",
      "Cost drivers: embedding all documents once (cheap), re-embedding when you change models, and per-question cost, which grows with how many chunks you send.",
      "Failure behaviour: what the assistant should say when it doesn't know, and how users report wrong answers.",
      "Owners: who fixes a wrong answer? Usually it is a content owner, not an engineer."
    ]},
   {h:"6. Glossary",
    gloss:[
      ["Chunk","A passage cut from a larger document, the unit that gets retrieved."],
      ["Embedding","Numbers that represent the meaning of text, so similar meanings sit close together."],
      ["Vector database","A store optimised for finding the nearest embeddings quickly."],
      ["Top-k","The number of best-matching chunks retrieved for each question."],
      ["Hybrid search","Combining keyword search with semantic (embedding) search."],
      ["Reranking","A second pass that re-orders retrieved chunks by relevance."],
      ["Grounding","Tying the answer to supplied sources rather than the model's memory."],
      ["Groundedness","How well an answer is supported by the retrieved sources; a key quality metric."]
    ]}
  ],
  quiz:[
   ["Why is RAG usually preferred over fine-tuning for a company knowledge base?","Because the knowledge changes often and must be citable. RAG updates by re-indexing documents in minutes, keeps answers traceable to sources, and respects permissions at retrieval time. Fine-tuning is slow to update and doesn't reliably reproduce exact facts."],
   ["Users say the assistant gives an old policy. Name two likely causes.","The outdated document is still indexed (no content owner removed it), or both versions were retrieved and the model wasn't told to prefer the newest, often because dates weren't stored as metadata."],
   ["What does 'top-k = 5' mean, and what happens if you raise it to 30?","Five best-matching chunks are sent to the model. At 30 you may catch more relevant passages, but cost and latency rise and irrelevant text can distract the model."],
   ["Why might pure semantic search miss 'Policy HR-114'?","Embeddings capture meaning, not exact strings, so a code like HR-114 may not be close to anything. Keyword search catches exact identifiers, which is why hybrid search is common."],
   ["Before launch, what single artefact best protects quality?","A golden set of real questions with known correct answers, run against every change to prompts, chunking or models."]
  ],
  deeper:["anthCr","ibmRagFtPe","nblm"]
}
};
