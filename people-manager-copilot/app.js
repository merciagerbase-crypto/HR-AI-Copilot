const copy = {
  performance: {
    objective: 'Understand the causes of the performance change, agree on the support needed and define a fact-based follow-up plan.',
    clarify: ['What changed in the role, territory, tools or workload?', 'Which performance expectations were explicitly communicated?', 'What evidence exists beyond the two monthly results?', 'What support has already been offered and with what effect?'],
    opening: '“I want to talk about the recent results, understand what may be getting in the way and agree on what support and expectations are fair for the next period.”',
    questions: ['What has changed in your work since the territory transition?', 'Where are you seeing the biggest blockers in the sales process?', 'Which expectations feel clear, and which do not?', 'What specific support would make the next 30 days more workable?'],
    steps: ['Confirm the performance facts and context after the conversation.', 'Agree on a short, observable plan with dates, support and check-ins.', 'Document expectations and the manager’s commitments.', 'Consult HR before starting a formal performance process.'],
    boundary: 'This tool can help prepare a fair conversation. It cannot determine whether a formal performance process, pay action or employment decision is appropriate.'
  },
  promotion: {
    objective: 'Assess readiness against the role criteria, distinguish sustained evidence from potential and prepare a recommendation that HR can review consistently.',
    clarify: ['What are the written criteria for the next role?', 'Has performance been sustained across more than one cycle?', 'What examples demonstrate scope, influence and independent judgment?', 'Are there comparable employees whose treatment should be considered for consistency?'],
    opening: '“I want to review your growth, the expectations for the next level and what evidence we would need for a fair recommendation.”',
    questions: ['Which responsibilities are you already performing at the next level?', 'What outcomes best show your impact beyond the current role?', 'Where would you still need support before taking on broader scope?', 'What would a realistic development plan look like if timing is not immediate?'],
    steps: ['Map examples to published role criteria.', 'Separate readiness evidence from future development potential.', 'Review internal equity and available headcount with HR.', 'Communicate a clear decision or development path after review.'],
    boundary: 'The manager and HR remain accountable for promotion decisions, calibration and pay treatment. The tool must not rank employees or produce a final promotion decision.'
  },
  conflict: {
    objective: 'Lower the temperature, understand each person’s observable experience and establish a safe, fact-based path to resolution.',
    clarify: ['What specific behaviors or incidents are being reported?', 'What is the business or team impact?', 'Has either person raised a concern about discrimination, retaliation or safety?', 'Is it appropriate to speak with the people separately first?'],
    opening: '“I want to understand what happened from your perspective, focus on the impact on work and agree on the next safe step. I will not make assumptions before hearing the facts.”',
    questions: ['What happened, in observable terms?', 'When and where did it occur?', 'What was the impact on your work or the team?', 'What outcome would help restore a workable professional relationship?'],
    steps: ['Meet with the people individually before proposing a joint discussion.', 'Document facts, dates and agreed actions without speculation.', 'Set immediate expectations for respectful interaction.', 'Escalate immediately if there is any allegation of harassment, discrimination, retaliation or safety concern.'],
    boundary: 'This tool may support basic conflict preparation. HR, Employee Relations or Legal must lead any investigation or high-risk matter.'
  },
  compensation: {
    objective: 'Understand the request, apply the company’s compensation principles consistently and prepare a transparent response without making commitments prematurely.',
    clarify: ['What is the employee requesting and why now?', 'What are the applicable pay range, performance and internal-equity considerations?', 'Is there a role change, retention risk or market benchmark involved?', 'Who has final compensation authority and what is the timing?'],
    opening: '“I want to understand your request and explain the process we use to assess compensation fairly. I cannot make a commitment in this conversation, but I will make sure the request is reviewed properly.”',
    questions: ['What prompted the request at this point?', 'Has the scope of your role changed in a measurable way?', 'What information would you like us to consider?', 'What clarity would be most useful after the review?'],
    steps: ['Acknowledge the request without promising an outcome.', 'Gather role, pay range, performance and equity inputs.', 'Review with HR and the authorized compensation owner.', 'Return with a clear timeline and factual explanation.'],
    boundary: 'The tool must not recommend an individual pay increase. Compensation decisions require authorized review, budget validation and internal-equity assessment.'
  }
};

const caseType = document.getElementById('caseType');
const stage = document.getElementById('stage');
const context = document.getElementById('context');
const generate = document.getElementById('generate');
const empty = document.getElementById('empty');
const result = document.getElementById('result');
const status = document.getElementById('status');
const riskBox = document.getElementById('riskBox');

function fillList(id, values, ordered=false) {
  const el = document.getElementById(id); el.innerHTML = '';
  values.forEach(v => { const li = document.createElement('li'); li.textContent = v; el.appendChild(li); });
}
function caseLabel(value){ return {performance:'performance concern',promotion:'promotion readiness',conflict:'team conflict',compensation:'compensation request'}[value]; }
function stageText(value){ return {first:'before the first conversation',followup:'for a follow-up conversation',decision:'before an HR recommendation'}[value]; }
function generateBrief(){
  const template = copy[caseType.value];
  const riskFlags = [...document.querySelectorAll('.checklist input:checked')].map(i => i.value);
  const freeText = context.value.trim() || 'No additional facts were entered.';
  document.getElementById('summary').textContent = `The manager is preparing ${stageText(stage.value)} about a ${caseLabel(caseType.value)}. Case context: ${freeText}`;
  document.getElementById('objective').textContent = template.objective;
  document.getElementById('opening').textContent = template.opening;
  document.getElementById('boundary').textContent = template.boundary;
  fillList('clarify', template.clarify); fillList('questions', template.questions); fillList('nextSteps', template.steps, true);
  if(riskFlags.length){
    riskBox.className='risk-box warn';
    riskBox.textContent='Specialist review required. This case contains a sensitive risk flag. Do not use the copilot output as a substitute for HR, Legal, Employee Relations or safety procedures.';
    status.textContent='Review required'; status.className='badge';
  } else {
    riskBox.className='risk-box safe';
    riskBox.textContent='No specialist risk flag was selected. Continue with normal HR policy checks and escalate if new sensitive information emerges.';
    status.textContent='Brief generated'; status.className='badge';
  }
  empty.hidden=true; result.hidden=false;
}

generate.addEventListener('click', generateBrief);
document.getElementById('copyBrief').addEventListener('click', async () => {
  const text = [...document.querySelectorAll('#result h3, #result p, #result li, #result blockquote')].map(e => e.innerText).join('\n');
  try { await navigator.clipboard.writeText(text); const btn=document.getElementById('copyBrief'); const old=btn.textContent; btn.textContent='Copied'; setTimeout(()=>btn.textContent=old,1400); } catch(e) { alert('Copy is not available in this browser.'); }
});
