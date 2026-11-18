// Adds depth to later lessons: extra sections go before "Key terms"; extra quiz and practice items are appended.
function deepen(id, add) {
  const L = LESSONS[id], X = EXT[id];
  if (!L) throw new Error('deepen: no lesson ' + id);
  if (add.sections) {
    const k = L.sections.findIndex(s => /^Key terms/i.test(s.h));
    L.sections.splice(k < 0 ? L.sections.length : k, 0, ...add.sections);
  }
  if (add.quiz) L.quiz.push(...add.quiz);
  if (add.prac && X) X.prac.push(...add.prac);
  if (add.mis && X) X.mis.push(...add.mis);
}
