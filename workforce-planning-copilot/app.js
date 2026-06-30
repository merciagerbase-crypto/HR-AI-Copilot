const scenarios = {
  focus: {
    headline: 'Recommendation: protect revenue continuity and operational capacity by prioritizing 11 roles across Field Sales, Key Accounts, Operations and Product & Data. Defer 8 lower-criticality openings until the next planning checkpoint.',
    signals: ['Field Sales has the highest combined risk: 12 open roles, 10.8% regrettable attrition and only 35% ready-successor coverage.', 'Key Accounts has stable attrition, but its 61-day average vacancy creates a concentrated customer continuity risk.', 'Operations shows 9.6% regrettable attrition and low succession coverage, increasing overtime and contractor reliance.', 'Product & Data has the longest vacancy aging at 67 days, delaying digital enablement work while demand continues.'],
    tradeoffs: ['Prioritizing the 11 roles protects revenue and service capacity but requires postponing non-critical backfills.', 'Using contractors may protect immediate operations, but it is contributing to payroll variance and can delay long-term capability building.', 'Accelerated hiring may reduce vacancy aging but will not solve attrition if manager capacity, workload and career-path drivers are not addressed.'],
    actions: [
      ['Approve a priority requisition list of 11 roles and assign an accountable executive sponsor for each role.', 'Owner: Business leaders + HR · Within 7 days'],
      ['Run a 30-day retention and manager-capacity diagnostic in Field Sales and Operations, focused on workload, leadership coverage, mobility and exit themes.', 'Owner: HRBP + Operations · Start this month'],
      ['Create interim coverage plans for Key Accounts and Product & Data roles aged over 45 days, with named internal owners and customer or project risk assessments.', 'Owner: Commercial + Product leaders · Within 10 days'],
      ['Reforecast overtime and contractor spend against the staffing plan, then bring Finance a costed comparison of hire, overtime and contractor options.', 'Owner: Finance + Workforce Planning · Next monthly review']
    ],
    assumptions: ['The 11 selected roles have validated revenue, customer, operational or platform impact.', 'Open roles are funded or can be funded through reprioritization.', 'The attrition figures are comparable across teams and periods.', 'No major product launch or regulatory event will materially change demand in the next 90 days.']
  },
  freeze: {
    headline: 'Recommendation: implement a 90-day freeze for non-critical hiring, but protect 9 revenue, customer and operational roles. Pair the freeze with workload monitoring and a weekly exception process to prevent hidden capacity risk.',
    signals: ['A broad freeze would immediately reduce hiring spend, but 11 current vacancies are already aged above 45 days.', 'Field Sales and Operations are most vulnerable because their attrition is above target and successor coverage is weak.', 'Payroll is 3.7% above plan, yet the variance is partially driven by overtime and contractors rather than approved permanent headcount alone.', 'A blanket freeze without exception rules could shift cost from hiring to overtime, service failures or contractor dependence.'],
    tradeoffs: ['The freeze preserves near-term cash but may extend vacancy aging in strategic roles.', 'Backfill delays may create internal workload pressure and contribute to further regrettable attrition.', 'Exception governance adds a decision layer, but avoids treating all roles as equally critical.'],
    actions: [
      ['Classify all 31 open roles into protected, review-required or paused categories using a published criticality rubric.', 'Owner: HR + Finance + Business leaders · Within 5 days'],
      ['Approve only 9 protected roles through a weekly exception forum with Finance sign-off and documented business impact.', 'Owner: Executive committee · Weekly for 90 days'],
      ['Set workload and overtime trigger points in Field Sales and Operations. Reopen roles automatically for review if trigger points are breached.', 'Owner: Operations + HRBP · Within 14 days'],
      ['Replace ad hoc contractor requests with a single approval process and monthly cost comparison against permanent hiring.', 'Owner: Finance + Procurement · This quarter']
    ],
    assumptions: ['The organization can legally and operationally pause the non-critical requisitions.', 'Business leaders can provide role criticality evidence within the proposed timeframe.', 'The planned freeze will not conflict with contractual or regulatory staffing obligations.', 'Demand remains within the current forecast range.']
  },
  stabilize: {
    headline: 'Recommendation: treat Field Sales and Operations as a focused stabilization program for the next 90 days. The immediate aim is to reduce regrettable attrition, protect workload and build interim succession coverage before expanding hiring.',
    signals: ['Field Sales and Operations account for the most material attrition and succession risk in the portfolio.', 'Both teams have open roles and attrition above target, which can create a self-reinforcing cycle of workload pressure and exits.', 'Successor coverage of 35% in Field Sales and 31% in Operations suggests limited resilience if key managers or specialists leave.', 'Payroll variance points to capacity strain, with overtime and contractors acting as temporary relief.'],
    tradeoffs: ['Retention actions take leadership capacity and may not deliver immediate savings.', 'Promoting internal talent can improve stability, but requires calibration and backfill plans.', 'External hiring remains necessary for selected roles, though it should be paired with a clear experience and manager-support plan.'],
    actions: [
      ['Run stay interviews for priority populations and consolidate themes into a two-week action report without exposing individual comments.', 'Owner: HRBP + Leaders · Start immediately'],
      ['Set a 90-day manager support plan for Field Sales and Operations: span review, workload review, check-in cadence and escalation route.', 'Owner: Business leaders + HR · Within 14 days'],
      ['Identify interim successors and development actions for the highest-impact leadership and specialist roles.', 'Owner: Talent + Business leaders · Within 30 days'],
      ['Protect selected external hiring while pausing roles that do not directly reduce workload, customer or quality risk.', 'Owner: HR + Finance · Next weekly review']
    ],
    assumptions: ['Attrition is materially influenced by fixable work environment, leadership, workload or career-path factors.', 'Managers can commit time to stay interviews and follow-up actions.', 'The organization can use aggregated findings without compromising confidentiality.', 'Selected high-priority openings can be funded within the current workforce plan.']
  }
};
const scenario = document.getElementById('scenario');
const analyze = document.getElementById('analyze');
const empty = document.getElementById('empty');
const result = document.getElementById('result');
const status = document.getElementById('status');
function fillBullets(id, items){const el=document.getElementById(id);el.innerHTML='';items.forEach(x=>{const li=document.createElement('li');li.textContent=x;el.appendChild(li);});}
function fillActions(items){const el=document.getElementById('actionsList');el.innerHTML='';items.forEach((item,i)=>{const row=document.createElement('div');row.className='action-row';row.innerHTML=`<span class="action-num">${i+1}</span><div><h4>${item[0]}</h4><p class="owner">${item[1]}</p></div>`;el.appendChild(row);});}
function showRecommendation(){const data=scenarios[scenario.value];document.getElementById('headline').textContent=data.headline;fillBullets('signalsList',data.signals);fillBullets('tradeoffsList',data.tradeoffs);fillActions(data.actions);fillBullets('assumptionsList',data.assumptions);empty.hidden=true;result.hidden=false;status.textContent='Recommendation generated';status.className='badge';}
analyze.addEventListener('click',showRecommendation);document.getElementById('copyRecommendation').addEventListener('click',async()=>{const text=[...document.querySelectorAll('#result h3,#result h4,#result p,#result li,.headline')].map(el=>el.innerText).join('\n');try{await navigator.clipboard.writeText(text);const b=document.getElementById('copyRecommendation');const old=b.textContent;b.textContent='Copied';setTimeout(()=>b.textContent=old,1400)}catch(e){alert('Copy is not available in this browser.')}});
