/**
 * 测验引擎：一题一屏，选项即判，即时反馈。
 * 页面在构建期把题面渲染成 HTML，通过 data 属性挂到容器上。
 */
export interface QuizQuestionPayload {
  stem: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface QuizPayload {
  id: string;
  title: string;
  questions: QuizQuestionPayload[];
}

const stateMark = { correct: '✔', wrong: '✘' } as const;

export function mountQuiz(root: HTMLElement, payload: QuizPayload, onFinish?: (score: number, total: number) => void): void {
  let index = 0;
  let score = 0;
  let locked = false;
  let finished = false;

  const dots = root.querySelector<HTMLElement>('[data-quiz-dots]')!;
  const body = root.querySelector<HTMLElement>('[data-quiz-body]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-quiz-next]')!;

  function renderDots() {
    dots.replaceChildren();
    payload.questions.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'quiz-dot';
      dot.dataset.state = i < index ? (dot.dataset.value === '1' ? 'right' : 'done') : i === index ? 'current' : '';
      dot.setAttribute('aria-hidden', 'true');
      dots.append(dot);
    });
  }

  function renderQuestion() {
    locked = false;
    next.hidden = true;
    next.textContent = '下一题 →';
    const q = payload.questions[index];
    dots.querySelectorAll<HTMLElement>('.quiz-dot').forEach((d, i) => { d.dataset.state = i === index ? 'current' : i < index ? 'done' : ''; });
    body.replaceChildren();

    const stem = document.createElement('p');
    stem.className = 'quiz-stem';
    stem.innerHTML = `${index + 1}. ${q.stem}`;
    body.append(stem);

    const list = document.createElement('div');
    list.className = 'quiz-options';
    q.options.forEach((optHTML, oi) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="quiz-option-key">${'ABCD'[oi] ?? oi + 1}</span><span>${optHTML}</span>`;
      btn.addEventListener('click', () => choose(oi, btn));
      list.append(btn);
    });
    body.append(list);

    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    feedback.hidden = true;
    body.append(feedback);
  }

  function choose(oi: number, btn: HTMLButtonElement) {
    if (locked) return;
    locked = true;
    const q = payload.questions[index];
    const correct = oi === q.answer;
    if (correct) { score++; dotResult(index, '1'); }
    else dotResult(index, '0');

    const options = body.querySelectorAll<HTMLButtonElement>('.quiz-option');
    options.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('is-correct');
      if (i === oi && !correct) b.classList.add('is-wrong');
    });
    btn.classList.add(correct ? 'is-correct' : 'is-wrong');

    const feedback = body.querySelector<HTMLElement>('.quiz-feedback')!;
    feedback.hidden = false;
    feedback.innerHTML = `<p class="quiz-verdict ${correct ? 'right' : 'wrong'}">${correct ? stateMark.correct + ' 答对了' : stateMark.wrong + ' 答错了'}${correct ? '' : ` · 正确答案是 ${'ABCD'[q.answer] ?? q.answer + 1}`}</p><p class="quiz-explain">${q.explain}</p>`;
    next.hidden = false;
    next.textContent = index === payload.questions.length - 1 ? '查看成绩 →' : '下一题 →';
    next.focus();
  }

  function dotResult(i: number, value: string) {
    const dot = dots.querySelectorAll<HTMLElement>('.quiz-dot')[i];
    if (dot) { dot.dataset.value = value; dot.dataset.state = 'done'; }
  }

  function renderSummary() {
    finished = true;
    const total = payload.questions.length;
    body.replaceChildren();
    const verdict = score === total ? '满分！这就是熟透的感觉。'
      : score / total >= 0.6 ? '不错，把错题的解释看一遍，明天再来一遍。'
      : '先回到正文把概念过一遍，再来不迟。';
    body.innerHTML = `<p class="quiz-score-line"><strong>${score}</strong> / ${total}</p><p class="quiz-score-note">${verdict}</p>`;
    next.hidden = false;
    next.textContent = '再练一次';
    onFinish?.(score, total);
  }

  next.addEventListener('click', () => {
    if (finished) {
      index = 0; score = 0; finished = false;
      renderDots();
      renderQuestion();
      return;
    }
    index++;
    if (index < payload.questions.length) renderQuestion();
    else renderSummary();
  });

  renderDots();
  renderQuestion();
}
