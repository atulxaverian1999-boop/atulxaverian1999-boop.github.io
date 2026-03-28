// ══════════════════════════════════════════════════
//  A Bagla Financial Services — main.js
// ══════════════════════════════════════════════════

/* ── BACKGROUND CANVAS ── */
(function initBg(){
  const canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function Particle(){ this.x=Math.random()*W; this.y=Math.random()*H; this.r=Math.random()*1.5+0.5; this.vx=(Math.random()-0.5)*0.3; this.vy=(Math.random()-0.5)*0.3; this.a=Math.random()*0.4+0.1; }
  function init(){ resize(); particles=[]; for(let i=0;i<80;i++) particles.push(new Particle()); }
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(226,255,0,${p.a})`; ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ ctx.beginPath(); ctx.strokeStyle=`rgba(226,255,0,${0.05*(1-d/100)})`; ctx.lineWidth=0.5; ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); }
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',init);
  init(); draw();
})();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
if(navbar){
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if(hamburger && mobileMenu){
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}
function closeMobile(){
  if(hamburger) hamburger.classList.remove('open');
  if(mobileMenu) mobileMenu.classList.remove('open');
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

/* ── SERVICE MODAL ── */
const svcData = {
  gst:{icon:'🧾',title:'GST Compliance & Advisory',desc:'Complete GST management from registration to monthly returns. We handle GSTR-1, GSTR-3B, GSTR-9, and reconciliation with GSTR-2A/2B. Includes advisory on GST applicability, rate classification, reverse charge mechanisms, and audit support.',points:['GST Registration & Amendments','Monthly / Quarterly Return Filing (GSTR-1, GSTR-3B)','GSTR-2A / 2B Reconciliation','GST Annual Return & Audit (GSTR-9, 9C)','E-Invoice & E-Way Bill Management','Notices & Departmental Correspondence']},
  tds:{icon:'📋',title:'TDS / TCS Compliance',desc:'End-to-end TDS management ensuring timely deduction, payment, and filing. We handle all TDS sections — salary (192), professional fees (194J), rent (194I), contractor (194C), and more.',points:['TDS Computation & Challan Payment','Quarterly TDS Returns (24Q, 26Q, 27Q)','Form 16 / 16A Generation','TDS Mismatch Resolution & Rectification','Lower Deduction Certificate (Sec 197)','TCS Compliance under Sec 206C']},
  it:{icon:'📊',title:'Income Tax Services',desc:'Comprehensive income tax planning and compliance for individuals, HUFs, partnership firms, LLPs and companies. We optimise your tax liability legally while ensuring full compliance.',points:['ITR Filing (All Forms — ITR 1 to 7)','Tax Planning & Optimisation','Advance Tax Computation & Payment','Scrutiny / Notice Handling','Capital Gains Tax Planning','Appeal before CIT(A) & ITAT']},
  books:{icon:'📚',title:'Bookkeeping & Accounting',desc:'Accurate, timely books of accounts maintained by qualified accountants. From daily journal entries to final financial statements — we keep your numbers clean and meaningful.',points:['Day-to-Day Bookkeeping','Bank & Party Reconciliation','Payroll Processing & Compliance','Monthly MIS & Management Reports','P&L, Balance Sheet, Cash Flow Statements','Tally / Zoho / Busy / QuickBooks Support']},
  inventory:{icon:'📦',title:'Inventory Management',desc:'Systematic inventory control to reduce shrinkage, improve turnover, and maintain compliance with GST stock requirements. Suitable for traders, manufacturers, and service businesses.',points:['Stock Inward / Outward Tracking','FIFO / LIFO / Weighted Average Valuation','Slow-Moving & Dead Stock Analysis','GST-Compliant Stock Register Maintenance','Physical Verification Support','ERP & Software Integration Assistance']},
  vendor:{icon:'🤝',title:'Vendor Management',desc:'Streamlined vendor payment and compliance processes to avoid TDS defaults, GST mismatches, and audit queries. We handle end-to-end vendor account management.',points:['Vendor Onboarding & KYC Verification','Payment Scheduling & Reconciliation','TDS on Vendor Payments','GSTR-2A Vendor Reconciliation','Vendor Ledger Management','Vendor Compliance Monitoring']},
  einvoice:{icon:'⚡',title:'E-Invoice & E-Way Bill',desc:'Mandatory for businesses above ₹5 Cr turnover. We handle IRN generation, QR codes, e-way bill creation and management in full compliance with GST e-invoicing mandates.',points:['IRN & QR Code Generation','E-Invoice Cancellation & Amendment','E-Way Bill Creation & Extension','Bulk E-Invoice Processing','API Integration Setup & Testing','Compliance Monitoring & Alerts']},
  itc:{icon:'🔄',title:'ITC (Input Tax Credit) Management',desc:'Maximise your eligible Input Tax Credit while staying compliant. We identify ITC leakages, reconcile GSTR-2A/2B with your books, and handle reversals and blocked credits.',points:['Monthly ITC Reconciliation','GSTR-2A vs Books Matching','Blocked Credit (Section 17(5)) Analysis','ITC Reversal Compliance','ITC Optimisation Strategy','Annual ITC Audit & Reporting']},
  finance:{icon:'💰',title:'Financial Planning & Advisory',desc:'Beyond tax — we help you build financial resilience. Cash flow management, working capital planning, loan structuring, and personal financial planning for entrepreneurs and professionals.',points:['Cash Flow Forecasting & Management','Working Capital Optimisation','Business Loan Advisory & Structuring','Personal Financial Planning','Budget Preparation & Variance Analysis','ROI & Profitability Analysis']},
  mf:{icon:'📈',title:'Mutual Fund Advisory',desc:'Goal-based investment advisory with a focus on long-term wealth creation. We analyse your risk profile, recommend suitable mutual funds, monitor portfolio performance, and rebalance as needed.',points:['Risk Profiling & Goal Mapping','SIP Planning & Direct Fund Selection','Portfolio Review & Rebalancing','Tax-Efficient Investing (ELSS, Debt Funds)','Lump Sum Deployment Strategy','Regular Performance Reporting']}
};

function openService(id){
  const s = svcData[id]; if(!s) return;
  const pts = s.points.map(p=>`<li style="padding:4px 0;color:rgba(255,255,255,0.85)">${p}</li>`).join('');
  document.getElementById('modal-content').innerHTML = `
    <div style="text-align:center;margin-bottom:18px">
      <div style="font-size:3rem;margin-bottom:6px">${s.icon}</div>
      <h2 style="color:var(--neon,#e2ff00);margin:0 0 4px;font-size:1.4rem">${s.title}</h2>
    </div>
    <p style="color:rgba(255,255,255,0.8);line-height:1.75;margin-bottom:16px;font-size:.95rem">${s.desc}</p>
    <ul style="padding-left:20px;margin-bottom:20px;line-height:1.9">${pts}</ul>
    <div style="text-align:center">
      <a href="#contact" onclick="closeModal()" class="btn-neon" style="display:inline-block;padding:10px 28px;text-decoration:none;border-radius:4px">Get a Free Consultation →</a>
    </div>`;
  document.getElementById('svcModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const m = document.getElementById('svcModal');
  if(m) m.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── CALCULATOR TABS ── */
function showCalc(id, btn){
  document.querySelectorAll('.cpanel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.ctab').forEach(b=>b.classList.remove('active'));
  const panel = document.getElementById('panel-'+id);
  if(panel) panel.classList.add('active');
  if(btn) btn.classList.add('active');
  if(id==='income-tax') calcIT();
  if(id==='gst-calc') calcGST();
  if(id==='sip-calc') calcSIP();
  if(id==='emi-calc') calcEMI();
  if(id==='hra-calc') calcHRA();
}

/* ── INCOME TAX CALCULATOR ── */
let regime = 'old';
function switchRegime(r){
  regime = r;
  document.getElementById('regime-old').classList.toggle('active', r==='old');
  document.getElementById('regime-new').classList.toggle('active', r==='new');
  const od = document.getElementById('old-deductions');
  if(od) od.style.display = r==='old' ? '' : 'none';
  calcIT();
}

function fmt(n){ return '₹'+Math.round(n).toLocaleString('en-IN'); }

function calcIT(){
  const age         = (document.getElementById('it-age')||{value:'general'}).value;
  const nationality = (document.getElementById('it-nationality')||{value:'resident'}).value;
  const salary   = +document.getElementById('it-salary')?.value  ||0;
  const business = +(document.getElementById('it-business')?.value)||0;
  const rental   = +document.getElementById('it-rental')?.value  ||0;
  const interest = +(document.getElementById('it-interest')?.value)||0;
  const stcg111a = +(document.getElementById('it-stcg')?.value)  ||0;
  const ltcg112a = +(document.getElementById('it-ltcg')?.value)  ||0;
  const other    = +document.getElementById('it-other')?.value   ||0;

  const gross       = salary + business + rental + interest + stcg111a + ltcg112a + other;
  const normalGross = gross - stcg111a - ltcg112a;

  let stdDed, totalDed, taxable;

  if(regime === 'old'){
    const c80 = Math.min(+(document.getElementById('it-80c')?.value)||0, 150000);
    const d80 = +(document.getElementById('it-80d')?.value)||0;
    const hra = +(document.getElementById('it-hra')?.value)||0;
    const hl  = +(document.getElementById('it-hl')?.value)||0;
    const nps = Math.min(+(document.getElementById('it-nps')?.value)||0, 50000);
    const otd = +(document.getElementById('it-other-ded')?.value)||0;
    stdDed   = 50000;
    totalDed = c80+d80+hra+hl+nps+otd+stdDed;
    taxable  = Math.max(0, normalGross - totalDed);
  } else {
    stdDed   = 75000;
    totalDed = stdDed;
    taxable  = Math.max(0, normalGross - stdDed);
  }

  let normalTax = 0, slabs = [];

  if(regime === 'old'){
    let brackets, starts;
    if(age==='supersenior'){
      brackets=[[500000,0],[500000,0.20],[Infinity,0.30]]; starts=[0,500000,1000000];
    } else if(age==='senior'){
      brackets=[[300000,0],[200000,0.05],[500000,0.20],[Infinity,0.30]]; starts=[0,300000,500000,1000000];
    } else {
      brackets=[[250000,0],[250000,0.05],[500000,0.20],[Infinity,0.30]]; starts=[0,250000,500000,1000000];
    }
    let rem=taxable;
    brackets.forEach(([lim,rate],i)=>{
      const chunk=Math.min(rem,lim); if(chunk<=0) return;
      const t=chunk*rate; normalTax+=t; rem-=chunk;
      slabs.push(`${fmt(starts[i])}–${i===brackets.length-1?'above':fmt(starts[i]+lim)} @ ${rate*100}% = ${fmt(t)}`);
    });
  } else {
    // New Regime FY 2025-26 (Finance Act 2024)
    const nr=[[400000,0],[400000,0.05],[400000,0.10],[400000,0.15],[400000,0.20],[400000,0.25],[Infinity,0.30]];
    const ns=[0,400000,800000,1200000,1600000,2000000,2400000];
    let rem=taxable;
    nr.forEach(([lim,rate],i)=>{
      const chunk=Math.min(rem,lim); if(chunk<=0) return;
      const t=chunk*rate; normalTax+=t; rem-=chunk;
      if(t>0||i===0) slabs.push(`${fmt(ns[i])}–${i===6?'above':fmt(ns[i]+lim)} @ ${rate*100}% = ${fmt(t)}`);
    });
  }

  // Rebate u/s 87A (residents only)
  let rebate87a=0;
  const rebateLimit = regime==='old' ? 500000 : 700000;
  const rebateCap   = regime==='old' ? 12500   : 25000;
  if(nationality==='resident' && taxable<=rebateLimit){
    rebate87a=Math.min(normalTax, rebateCap);
  }

  // Marginal Relief
  let marginalRelief=0;
  if(nationality==='resident' && taxable>rebateLimit){
    const excess=taxable-rebateLimit;
    const taxAfterRebate=normalTax-rebate87a;
    if(taxAfterRebate>excess) marginalRelief=taxAfterRebate-excess;
  }

  const normalTaxFinal = Math.max(0, normalTax - rebate87a - marginalRelief);

  // Special rate taxes
  const stcgTax = stcg111a * 0.20;
  const ltcgFree = 125000;
  const ltcgTax  = Math.max(0, ltcg112a - ltcgFree) * 0.125;

  const totalBeforeCess = normalTaxFinal + stcgTax + ltcgTax;
  const cess  = totalBeforeCess * 0.04;
  const total = totalBeforeCess + cess;
  const effRate = gross>0 ? (total/gross*100) : 0;

  // Update UI
  document.getElementById('it-gross').textContent   = fmt(gross);
  const sdEl=document.getElementById('it-std-ded');
  if(sdEl) sdEl.textContent = '− '+fmt(stdDed);
  const odEl=document.getElementById('it-ded');
  if(odEl){ const od2=totalDed-stdDed; odEl.textContent=(od2>0?'− ':'')+fmt(od2); }
  document.getElementById('it-taxable').textContent = fmt(taxable);
  document.getElementById('it-slabs').innerHTML     = slabs.map(s=>`<div class="slab-row">${s}</div>`).join('')||'<div class="slab-row">No tax — zero liability in all slabs</div>';
  document.getElementById('it-before-cess').textContent = fmt(normalTax);

  const rbRow=document.getElementById('it-rebate-row');
  const rbEl=document.getElementById('it-rebate');
  if(rbRow) rbRow.style.display=rebate87a>0?'':'none';
  if(rbEl)  rbEl.textContent='− '+fmt(rebate87a);

  const mrRow=document.getElementById('it-marginal-row');
  const mrEl=document.getElementById('it-marginal');
  if(mrRow) mrRow.style.display=marginalRelief>0?'':'none';
  if(mrEl)  mrEl.textContent='− '+fmt(marginalRelief);

  // STCG/LTCG rows
  const stEl=document.getElementById('it-stcg-tax');
  const ltEl=document.getElementById('it-ltcg-tax');
  if(stEl){ stEl.parentElement.style.display=stcgTax>0?'':'none'; stEl.textContent=fmt(stcgTax); }
  if(ltEl){ ltEl.parentElement.style.display=ltcgTax>0?'':'none'; ltEl.textContent=fmt(ltcgTax); }

  document.getElementById('it-cess').textContent    = fmt(cess);
  document.getElementById('it-total').textContent   = fmt(total);
  document.getElementById('it-monthly').textContent = fmt(total/12)+'/mo';
  document.getElementById('it-rate').textContent    = effRate.toFixed(2)+'%';

  const vd=document.getElementById('it-verdict');
  if(vd){
    if(total===0) vd.innerHTML='🎉 <strong>Zero Tax!</strong> Fully covered by rebate u/s 87A.';
    else if(effRate<10) vd.innerHTML='✅ <strong>Low Tax Burden.</strong> Effective rate under 10% — well planned!';
    else if(effRate<20) vd.innerHTML='📊 <strong>Moderate Tax.</strong> Maximise deductions to reduce liability.';
    else vd.innerHTML='⚠️ <strong>High Tax.</strong> Consult us for legal tax-saving optimisation.';
  }

  window._taxData = {regime,age,nationality,gross,stdDed,totalDed,taxable,slabs,normalTax,rebate87a,marginalRelief,stcgTax,ltcgTax,cess,total,effRate,salary,business,rental,interest,stcg111a,ltcg112a,other};
}

function downloadTaxPDF(){
  if(!window._taxData) calcIT();
  const t=window._taxData;
  const ageLabel={general:'Below 60 (General)',senior:'60–80 (Senior Citizen)',supersenior:'Above 80 (Super Senior)'}[t.age]||t.age;
  const natLabel=t.nationality==='resident'?'Resident Indian':'NRI / NOR';
  const rows=[
    ['Assessment Year','AY 2026-27 (FY 2025-26)'],
    ['Tax Regime',t.regime==='old'?'Old Regime':'New Regime'],
    ['Age Group',ageLabel],['Residency',natLabel],['---'],
    ['Salary / Pension',fmt(t.salary)],['Business / Profession',fmt(t.business)],
    ['Rental Income',fmt(t.rental)],['Interest Income',fmt(t.interest)],
    ['STCG u/s 111A',fmt(t.stcg111a)],['LTCG u/s 112A',fmt(t.ltcg112a)],
    ['Other Income',fmt(t.other)],['Gross Total Income',fmt(t.gross)],['---'],
    ['Standard Deduction','− '+fmt(t.stdDed)],
    ['Other Deductions','− '+fmt(Math.max(0,t.totalDed-t.stdDed))],
    ['Taxable Income',fmt(t.taxable)],['---'],
    ...t.slabs.map(s=>['  '+s,'']),
    ['Tax on Normal Income',fmt(t.normalTax)],
    ...(t.rebate87a>0?[['Rebate u/s 87A','− '+fmt(t.rebate87a)]]:{}),
    ...(t.marginalRelief>0?[['Marginal Relief','− '+fmt(t.marginalRelief)]]:{}),
    ...(t.stcgTax>0?[['STCG Tax @ 20%',fmt(t.stcgTax)]]:{}),
    ...(t.ltcgTax>0?[['LTCG Tax @ 12.5%',fmt(t.ltcgTax)]]:{}),
    ['Health & Edu. Cess (4%)',fmt(t.cess)],['---'],
    ['TOTAL TAX PAYABLE',fmt(t.total)],
    ['Monthly TDS',fmt(t.total/12)+'/mo'],
    ['Effective Tax Rate',t.effRate.toFixed(2)+'%']
  ];
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Tax Computation FY 2025-26</title><style>body{font-family:Arial;max-width:680px;margin:30px auto;font-size:13px}table{width:100%;border-collapse:collapse}td{padding:5px 10px}tr:nth-child(even){background:#f9f9f9}.sep td{border-top:1px dashed #ccc;padding:3px}.total-row td{background:#222;color:#fff;font-size:14px;font-weight:700}td:last-child{text-align:right;font-weight:600}</style></head><body><h2 style="border-bottom:2px solid #333;padding-bottom:6px">Income Tax Computation — FY 2025-26 / AY 2026-27</h2><p style="color:#666;font-size:11px">A Bagla Financial Services | atulbagla.com</p><table>${rows.map(r=>r[0]==='---'?'<tr class="sep"><td colspan="2"></td></tr>':`<tr${r[0]==='TOTAL TAX PAYABLE'?' class="total-row"':''}><td>${r[0]}</td><td>${r[1]||''}</td></tr>`).join('')}</table><p style="font-size:10px;color:#999;margin-top:20px">Disclaimer: Indicative calculation for FY 2025-26. Consult a CA for professional advice.</p></body></html>`;
  const w=window.open('','_blank'); if(w){ w.document.write(html); w.document.close(); setTimeout(()=>w.print(),500); }
}


/* ── GST CALCULATOR ── */
function calcGST(){
  const amt  = +document.getElementById('gst-amount').value||0;
  const rate = +document.getElementById('gst-rate').value||0;
  const type = document.getElementById('gst-type').value;
  const mode = document.getElementById('gst-mode').value;
  let base, gstAmt, total;
  if(mode==='add'){ base=amt; gstAmt=amt*rate/100; total=amt+gstAmt; }
  else { total=amt; base=amt/(1+rate/100); gstAmt=amt-base; }
  let html;
  if(type==='intra'){
    const h=gstAmt/2;
    html=`<div class="itr-row"><span>Base Amount</span><strong>${fmt(base)}</strong></div>
          <div class="itr-row"><span>CGST (${rate/2}%)</span><strong>${fmt(h)}</strong></div>
          <div class="itr-row"><span>SGST (${rate/2}%)</span><strong>${fmt(h)}</strong></div>
          <div class="itr-row final"><span>${mode==='add'?'Total Invoice Value':'GST Component'}</span><strong>${fmt(mode==='add'?total:gstAmt)}</strong></div>`;
  } else {
    html=`<div class="itr-row"><span>Base Amount</span><strong>${fmt(base)}</strong></div>
          <div class="itr-row"><span>IGST (${rate}%)</span><strong>${fmt(gstAmt)}</strong></div>
          <div class="itr-row final"><span>${mode==='add'?'Total Invoice Value':'GST Component'}</span><strong>${fmt(mode==='add'?total:gstAmt)}</strong></div>`;
  }
  document.getElementById('gst-output').innerHTML = html;
}

/* ── SIP CALCULATOR ── */
function calcSIP(){
  const sip  = +document.getElementById('sip-amt').value||0;
  const ret  = (+document.getElementById('sip-ret').value||0)/100;
  const yr   = +document.getElementById('sip-yr').value||0;
  const step = (+document.getElementById('sip-step').value||0)/100;
  const ls   = +document.getElementById('ls-amt').value||0;
  const n = yr*12, r = ret/12;
  let sipFV=0, invested=0, currentSIP=sip;
  if(step>0){
    for(let y=0;y<yr;y++){
      for(let m=0;m<12;m++){ const months=n-(y*12+m); sipFV+=currentSIP*Math.pow(1+r,months); invested+=currentSIP; }
      currentSIP*=(1+step);
    }
  } else {
    sipFV = r>0 ? sip*(Math.pow(1+r,n)-1)/r*(1+r) : sip*n;
    invested = sip*n;
  }
  const lsFV=ls*Math.pow(1+ret,yr), lsInv=ls;
  const totalFV=sipFV+lsFV, totalInv=invested+lsInv;
  const totalRet=totalFV-totalInv, absRet=totalInv>0?(totalRet/totalInv*100):0;
  const iPct=totalFV>0?(totalInv/totalFV*100):50, rPct=100-iPct;
  document.getElementById('sip-output').innerHTML=`
    <div class="itr-row"><span>Total Invested</span><strong>${fmt(totalInv)}</strong></div>
    <div class="itr-row"><span>Estimated Returns</span><strong style="color:#4caf50">${fmt(totalRet)}</strong></div>
    <div class="itr-row final"><span>Maturity Value</span><strong>${fmt(totalFV)}</strong></div>
    <div class="itr-row"><span>Absolute Return</span><strong>${absRet.toFixed(1)}%</strong></div>`;
  const bi=document.getElementById('sip-bar-i'), br=document.getElementById('sip-bar-r');
  if(bi) bi.style.width=iPct.toFixed(1)+'%';
  if(br) br.style.width=rPct.toFixed(1)+'%';
}

/* ── EMI CALCULATOR ── */
function calcEMI(){
  const P=+document.getElementById('emi-amt').value||0;
  const ar=+document.getElementById('emi-rate').value||0;
  const yr=+document.getElementById('emi-yr').value||0;
  const r=ar/12/100, n=yr*12;
  const emi=r>0 ? P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1) : (n>0?P/n:0);
  const totalPay=emi*n, totalInt=totalPay-P;
  document.getElementById('emi-output').innerHTML=`
    <div class="itr-row final"><span>Monthly EMI</span><strong>${fmt(emi)}</strong></div>
    <div class="itr-row"><span>Principal Amount</span><strong>${fmt(P)}</strong></div>
    <div class="itr-row"><span>Total Interest</span><strong style="color:#ff6b6b">${fmt(totalInt)}</strong></div>
    <div class="itr-row"><span>Total Payment</span><strong>${fmt(totalPay)}</strong></div>
    <div class="itr-row"><span>Interest as % of Principal</span><strong>${P>0?(totalInt/P*100).toFixed(1):0}%</strong></div>`;
}

/* ── HRA CALCULATOR ── */
function calcHRA(){
  const basic=+document.getElementById('hra-basic').value||0;
  const recv =+document.getElementById('hra-recv').value||0;
  const rent =+document.getElementById('hra-rent').value||0;
  const city =document.getElementById('hra-city').value;
  const mRate=city==='metro'?0.5:0.4;
  const c1=recv, c2=Math.max(0,rent-basic*0.1), c3=basic*mRate;
  const exempt=Math.min(c1,c2,c3), taxable=Math.max(0,recv-exempt);
  document.getElementById('hra-output').innerHTML=`
    <div class="itr-row"><span>Condition 1 — Actual HRA Received</span><strong>${fmt(c1)}/mo</strong></div>
    <div class="itr-row"><span>Condition 2 — Rent − 10% of Basic</span><strong>${fmt(c2)}/mo</strong></div>
    <div class="itr-row"><span>Condition 3 — ${mRate*100}% of Basic (${city==='metro'?'Metro':'Non-Metro'})</span><strong>${fmt(c3)}/mo</strong></div>
    <div class="itr-row final"><span>HRA Exempt (Least of above)</span><strong>${fmt(exempt)}/mo</strong></div>
    <div class="itr-row"><span>Taxable HRA / Month</span><strong style="color:#ff6b6b">${fmt(taxable)}/mo</strong></div>
    <div class="itr-row"><span>Annual HRA Exemption</span><strong style="color:#4caf50">${fmt(exempt*12)}</strong></div>`;
}

/* ── NEWS ── */
const newsData = {
  icai:[
    {title:'ICAI issues Guidance Note on Audit of Banks — 2024 Edition',date:'Mar 2024',url:'https://icai.org',tag:'Guidance'},
    {title:'ICAI revises CA Final Exam pattern effective Nov 2024 onwards',date:'Feb 2024',url:'https://icai.org',tag:'Exam'},
    {title:'New CPE requirement: 40 hours annually for all CA members',date:'Jan 2024',url:'https://icai.org',tag:'CPE'},
    {title:'ICAI releases Exposure Draft of revised SA 600 on Group Audits',date:'Mar 2024',url:'https://icai.org',tag:'Standard'},
    {title:'ICAI launches e-learning modules for Digital Taxation & AI',date:'Feb 2024',url:'https://icai.org',tag:'Learning'},
    {title:'ICAI clarifies applicability of Ind AS 116 for MSMEs',date:'Jan 2024',url:'https://icai.org',tag:'Clarification'},
  ],
  incometax:[
    {title:'New ITR forms released for AY 2024-25 — e-filing open',date:'Apr 2024',url:'https://incometax.gov.in',tag:'ITR'},
    {title:'Income Tax Dept notifies updated Form 26AS and AIS',date:'Mar 2024',url:'https://incometax.gov.in',tag:'AIS'},
    {title:'Section 87A rebate clarification for special rate income issued',date:'Jul 2024',url:'https://incometax.gov.in',tag:'Rebate'},
    {title:'TDS on Rent: Sec 194-IB threshold remains ₹50,000/month',date:'Apr 2024',url:'https://incometax.gov.in',tag:'TDS'},
    {title:'Faceless appeal scheme extended to all income tax assessments',date:'Feb 2024',url:'https://incometax.gov.in',tag:'Appeal'},
    {title:'Updated return (ITR-U) window: 2 years from the relevant AY',date:'Jan 2024',url:'https://incometax.gov.in',tag:'Deadline'},
  ],
  gst:[
    {title:'GST Council reduces rate on cancer drugs and medical devices',date:'Jun 2024',url:'https://gst.gov.in',tag:'Rate Change'},
    {title:'E-invoice threshold lowered to ₹1 Cr — mandatory from Oct 2023',date:'Oct 2023',url:'https://gst.gov.in',tag:'E-Invoice'},
    {title:'GSTR-1A notified — new return for amending GSTR-1 data',date:'Jul 2024',url:'https://gst.gov.in',tag:'New Return'},
    {title:'GST on online gaming platforms: 28% on full face value upheld',date:'Aug 2024',url:'https://gst.gov.in',tag:'Gaming'},
    {title:'ISD mechanism revamped — mandatory compliance from Apr 2025',date:'Sep 2024',url:'https://gst.gov.in',tag:'ISD'},
    {title:'GSTR-9 and GSTR-9C due date extended to 31 December 2024',date:'Dec 2024',url:'https://gst.gov.in',tag:'Deadline'},
  ],
  mca:[
    {title:'MCA21 V3 portal — new forms and filing system fully live',date:'Mar 2024',url:'https://mca.gov.in',tag:'Portal'},
    {title:'Companies (CSR Policy) Amendment Rules 2024 notified',date:'Feb 2024',url:'https://mca.gov.in',tag:'CSR'},
    {title:'MSME Udyam Registration — new guidelines and portal update',date:'Jan 2024',url:'https://mca.gov.in',tag:'MSME'},
    {title:'IBC amendment: Pre-packaged insolvency for MSMEs updated',date:'Mar 2024',url:'https://mca.gov.in',tag:'IBC'},
    {title:'Director KYC (DIR-3 KYC) annual deadline: 30 September',date:'Sep 2023',url:'https://mca.gov.in',tag:'KYC'},
    {title:'Annual Compliance: MGT-7A for OPCs and small companies',date:'Nov 2023',url:'https://mca.gov.in',tag:'Compliance'},
  ],
  mf:[
    {title:'SEBI introduces new asset class between Mutual Funds & PMS',date:'Aug 2024',url:'https://amfiindia.com',tag:'SEBI'},
    {title:'AMFI data: Monthly SIP inflows cross ₹20,000 Cr milestone',date:'Jun 2024',url:'https://amfiindia.com',tag:'SIP'},
    {title:'Debt fund taxation: Indexation benefit removed for new investments',date:'Apr 2024',url:'https://amfiindia.com',tag:'Taxation'},
    {title:'SEBI allows Balanced Advantage hybrid sub-categories in MFs',date:'Mar 2024',url:'https://amfiindia.com',tag:'Category'},
    {title:'TER (Total Expense Ratio) disclosure norms tightened by SEBI',date:'Feb 2024',url:'https://amfiindia.com',tag:'TER'},
    {title:'NFO rush: 30+ new funds launched in Q1 FY 2024-25',date:'Apr 2024',url:'https://amfiindia.com',tag:'NFO'},
  ]
};

function showNews(id, btn){
  document.querySelectorAll('.ntab').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderNews(id);
}
function renderNews(id){
  const items=newsData[id]||[];
  document.getElementById('news-grid').innerHTML=items.map(n=>`
    <a class="news-card" href="${n.url}" target="_blank" rel="noopener noreferrer">
      <span class="news-tag">${n.tag}</span>
      <h4 class="news-title">${n.title}</h4>
      <span class="news-date">${n.date} · Official Source ↗</span>
    </a>`).join('');
}

/* ── PLAYGROUND TABS ── */
function showGame(id, btn){
  document.querySelectorAll('.pgpanel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.pgtab').forEach(b=>b.classList.remove('active'));
  const panel=document.getElementById('pg-'+id);
  if(panel) panel.classList.add('active');
  if(btn) btn.classList.add('active');
  if(id==='matrix') startMatrix();
  if(id==='quiz') loadQuiz('gst', document.querySelector('.qtab'));
}

/* ── GRAVITY BALL GAME ── */
let gravityRAF=null, gravityScore=0, gravityBest=0;
const _gravityColors=['#e2ff00','#00ffcc','#ff4fcf','#4fd1ff','#ffd700','#ff6b35','#a78bfa'];
function startGravity(){
  const canvas=document.getElementById('gravity-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  if(gravityRAF) cancelAnimationFrame(gravityRAF);
  gravityScore=0; document.getElementById('gravity-score').textContent='0';
  const balls=[];
  const GY=0.42, BOUNCE=0.60, FRICTION=0.991, MAX_BALLS=30;

  function spawnBall(x,y){
    if(balls.length>=MAX_BALLS) balls.shift();
    const r=9+Math.random()*10;
    balls.push({x,y,r,vx:(Math.random()-0.5)*4,vy:-1,color:_gravityColors[Math.floor(Math.random()*_gravityColors.length)]});
    gravityScore=balls.length;
    document.getElementById('gravity-score').textContent=gravityScore;
  }

  // Remove any old listener, add exactly ONE new click listener
  if(canvas._gravClick) canvas.removeEventListener('click',canvas._gravClick);
  canvas._gravClick=function(e){
    const rect=canvas.getBoundingClientRect();
    spawnBall((e.clientX-rect.left)*(W/rect.width),(e.clientY-rect.top)*(H/rect.height));
  };
  canvas.addEventListener('click',canvas._gravClick);

  function loop(){
    ctx.fillStyle='rgba(10,10,10,0.2)'; ctx.fillRect(0,0,W,H);
    for(let i=0;i<balls.length;i++){
      const b=balls[i];
      b.vy+=GY; b.vx*=FRICTION; b.vy*=FRICTION;
      b.x+=b.vx; b.y+=b.vy;
      if(b.y+b.r>H){b.y=H-b.r; b.vy*=-BOUNCE; b.vx*=0.9;}
      if(b.y-b.r<0){b.y=b.r; b.vy*=-BOUNCE;}
      if(b.x-b.r<0){b.x=b.r; b.vx*=-BOUNCE;}
      if(b.x+b.r>W){b.x=W-b.r; b.vx*=-BOUNCE;}
      for(let j=i+1;j<balls.length;j++){
        const o=balls[j];
        const dx=o.x-b.x,dy=o.y-b.y,dist=Math.sqrt(dx*dx+dy*dy),minD=b.r+o.r;
        if(dist<minD&&dist>0.1){
          const nx=dx/dist,ny=dy/dist,ov=(minD-dist)/2;
          b.x-=nx*ov; b.y-=ny*ov; o.x+=nx*ov; o.y+=ny*ov;
          const rv=(b.vx-o.vx)*nx+(b.vy-o.vy)*ny;
          if(rv>0){b.vx-=rv*nx*0.55; b.vy-=rv*ny*0.55; o.vx+=rv*nx*0.55; o.vy+=rv*ny*0.55;}
        }
      }
      const g=ctx.createRadialGradient(b.x-b.r*.28,b.y-b.r*.28,b.r*.08,b.x,b.y,b.r);
      g.addColorStop(0,'rgba(255,255,255,0.9)'); g.addColorStop(0.35,b.color); g.addColorStop(1,'rgba(0,0,0,0.45)');
      ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      ctx.strokeStyle=b.color; ctx.lineWidth=1.2; ctx.globalAlpha=0.6; ctx.stroke(); ctx.globalAlpha=1;
    }
    ctx.fillStyle='rgba(255,255,255,0.32)'; ctx.font='13px DM Sans';
    ctx.fillText('🖱 Click anywhere to drop a ball — max 30',10,18);
    if(balls.length===0){
      ctx.fillStyle='rgba(226,255,0,0.55)'; ctx.font='bold 19px Orbitron'; ctx.textAlign='center';
      ctx.fillText('Click on the canvas to drop balls!',W/2,H/2); ctx.textAlign='left';
    }
    gravityRAF=requestAnimationFrame(loop);
  }
  ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(226,255,0,0.5)'; ctx.font='bold 19px Orbitron'; ctx.textAlign='center';
  ctx.fillText('Click ▶ Start / Restart, then click to drop!',W/2,H/2); ctx.textAlign='left';
  loop();
}

/* ── SPEED TEST ── */
const sentences=[
  'GST was introduced in India on 1 July 2017 as a unified indirect tax replacing multiple state and central levies.',
  'A Systematic Investment Plan lets investors put fixed amounts regularly into mutual funds to build long-term wealth.',
  'Income tax in India is governed by the Income Tax Act 1961 and administered by the Central Board of Direct Taxes.',
  'Section 80C allows deductions up to one lakh fifty thousand rupees for PPF, ELSS, and life insurance premiums.',
  'The Reserve Bank of India is the central banking institution regulating monetary policy and financial stability.',
];
let speedTimer=null, speedRunning=false, speedStart=0, speedSentence='';
function startSpeed(){
  if(speedRunning) return;
  clearInterval(speedTimer);
  speedSentence=sentences[Math.floor(Math.random()*sentences.length)];
  document.getElementById('speed-sentence').textContent=speedSentence;
  const inp=document.getElementById('speed-input');
  inp.value=''; inp.disabled=false; inp.focus();
  document.getElementById('wpm-val').textContent='0';
  document.getElementById('acc-val').textContent='100';
  document.getElementById('char-val').textContent='0';
  let t=60; document.getElementById('time-val').textContent=t;
  speedRunning=true; speedStart=Date.now();
  speedTimer=setInterval(()=>{
    t--; document.getElementById('time-val').textContent=t;
    if(t<=0){clearInterval(speedTimer);speedRunning=false;inp.disabled=true;}
  },1000);
}
function checkSpeed(){
  if(!speedRunning) return;
  const typed=document.getElementById('speed-input').value;
  const elapsedMin=(Date.now()-speedStart)/60000;
  const wpm=elapsedMin>0?Math.round(typed.trim().split(/\s+/).length/elapsedMin):0;
  let correct=0; for(let i=0;i<typed.length;i++) if(typed[i]===speedSentence[i]) correct++;
  const acc=typed.length>0?Math.round(correct/typed.length*100):100;
  document.getElementById('wpm-val').textContent=wpm;
  document.getElementById('acc-val').textContent=acc;
  document.getElementById('char-val').textContent=typed.length;
}

/* ── MATRIX RAIN ── */
let matrixRAF=null, matrixRunning=false;
const matrixColors=['#00ff41','#e2ff00','#00d4ff','#ff00ff','#ffd700'];
let matrixColorIdx=0, matrixColor='#00ff41';
function startMatrix(){
  const canvas=document.getElementById('matrix-canvas'); if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  const cols=Math.floor(W/16), drops=Array(cols).fill(1);
  const chars='アイウエオカキクケコ0123456789GSTITEMRTF₹SIP@#%&';
  if(matrixRAF) cancelAnimationFrame(matrixRAF);
  matrixRunning=true;
  function draw(){
    ctx.fillStyle='rgba(0,0,0,0.05)'; ctx.fillRect(0,0,W,H);
    ctx.fillStyle=matrixColor; ctx.font='14px monospace';
    drops.forEach((y,i)=>{
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*16,y*16);
      if(y*16>H&&Math.random()>0.975) drops[i]=0;
      drops[i]++;
    });
    matrixRAF=requestAnimationFrame(draw);
  }
  draw();
}
function toggleMatrix(){
  if(matrixRunning){ cancelAnimationFrame(matrixRAF); matrixRunning=false; }
  else startMatrix();
}
function changeMatrixColor(){
  matrixColorIdx=(matrixColorIdx+1)%matrixColors.length;
  matrixColor=matrixColors[matrixColorIdx];
}

/* ── FINANCE QUIZ ── */
const quizData={
  gst:[
    {q:'What does GST stand for?',opts:['General Sales Tax','Goods and Services Tax','Government Service Tax','Global Supply Tax'],ans:1},
    {q:'GST was implemented in India on:',opts:['1 April 2017','1 July 2017','1 January 2018','15 August 2017'],ans:1},
    {q:'Which return covers outward supplies filed monthly by regular taxpayers?',opts:['GSTR-3B','GSTR-1','GSTR-9','GSTR-4'],ans:1},
    {q:'CGST is collected by:',opts:['State Government','Central Government','Both equally','Local Panchayat'],ans:1},
    {q:'Standard GST rate on most professional services in India:',opts:['5%','12%','18%','28%'],ans:2},
  ],
  income:[
    {q:'Standard deduction for salaried (New Regime, FY 2024-25):',opts:['₹40,000','₹50,000','₹75,000','₹1,00,000'],ans:2},
    {q:'Section 80C maximum deduction limit:',opts:['₹1,00,000','₹1,25,000','₹1,50,000','₹2,00,000'],ans:2},
    {q:'Income Tax in India is administered by:',opts:['RBI','SEBI','CBDT','Finance Ministry'],ans:2},
    {q:'Rebate u/s 87A (New Regime FY 2024-25) available up to taxable income of:',opts:['₹5,00,000','₹7,00,000','₹10,00,000','₹12,00,000'],ans:1},
    {q:'Form 26AS is related to:',opts:['GST filing','Tax Credit Statement','Bank statement','Company registration'],ans:1},
  ],
  mf:[
    {q:'SIP stands for:',opts:['Simple Investment Plan','Systematic Investment Plan','Structured Income Plan','Savings Interest Plan'],ans:1},
    {q:'NAV stands for:',opts:['Net Annual Value','Net Asset Value','Normal Asset Value','New Account Value'],ans:1},
    {q:'ELSS funds have a mandatory lock-in period of:',opts:['1 year','2 years','3 years','5 years'],ans:2},
    {q:'AMFI stands for:',opts:['Association of Mutual Funds of India','Asset Management Finance Institution','Annual MF Index','None of these'],ans:0},
    {q:'Long-term capital gains on equity mutual funds above ₹1 lakh taxed at:',opts:['0%','10%','15%','20%'],ans:1},
  ],
  tds:[
    {q:'TDS on salary income is governed by:',opts:['Section 194J','Section 192','Section 194C','Section 195'],ans:1},
    {q:'TDS threshold for bank interest (Section 194A) per year:',opts:['₹5,000','₹10,000','₹40,000','₹50,000'],ans:2},
    {q:'Quarterly TDS return for non-salary payments is filed in:',opts:['Form 24Q','Form 26Q','Form 27EQ','Form 27Q'],ans:1},
    {q:'Form 16 is issued by the employer for:',opts:['GST compliance','TDS on salary','Investment proof','PF details'],ans:1},
    {q:'TDS rate on professional fees under Section 194J:',opts:['1%','2%','5%','10%'],ans:3},
  ],
  accounting:[
    {q:'Which principle requires expenses to be matched against revenue?',opts:['Cost Principle','Matching Principle','Consistency Principle','Materiality Principle'],ans:1},
    {q:'A debit balance in a personal account indicates:',opts:['Amount receivable (asset)','Liability','Income','Expense'],ans:0},
    {q:'P&L stands for:',opts:['Profit & Loss','Purchase & Ledger','Payment & Liability','Price & Labour'],ans:0},
    {q:'Depreciation is typically charged on:',opts:['Current assets','Fixed assets','Investments','Cash balance'],ans:1},
    {q:'Working capital is calculated as:',opts:['Fixed assets − Current liabilities','Current assets − Current liabilities','Total assets − Total liabilities','Equity − Reserves'],ans:1},
  ]
};
let quizTopic='gst', quizQ=0, quizScore=0, quizTimer=null, quizTime=30;
function loadQuiz(topic, btn){
  if(btn){ document.querySelectorAll('.qtab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
  quizTopic=topic; quizQ=0; quizScore=0;
  document.getElementById('q-score').textContent='0';
  showQuestion();
}
function showQuestion(){
  clearInterval(quizTimer);
  const qs=quizData[quizTopic];
  if(quizQ>=qs.length){
    document.getElementById('quiz-body').innerHTML=`
      <div style="text-align:center;padding:30px 20px">
        <div style="font-size:3rem;margin-bottom:8px">🎉</div>
        <h3 style="color:var(--neon,#e2ff00);margin:0 0 8px">Quiz Complete!</h3>
        <p style="font-size:1.25rem;margin:0 0 6px">Score: <strong>${quizScore} / ${qs.length}</strong></p>
        <p style="color:rgba(255,255,255,0.6);margin:0 0 20px;font-size:.9rem">${quizScore===qs.length?'🏆 Perfect! You\'re a finance expert!':quizScore>=3?'👍 Great job! Keep learning!':'📚 Keep practicing — consult A Bagla for expert guidance!'}</p>
        <button class="btn-neon-sm" onclick="loadQuiz('${quizTopic}',null)">Try Again</button>
      </div>`; return;
  }
  document.getElementById('q-num').textContent=quizQ+1;
  const q=qs[quizQ];
  document.getElementById('quiz-body').innerHTML=`
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">${q.opts.map((o,i)=>`<button class="qopt" onclick="answerQ(${i})">${o}</button>`).join('')}</div>`;
  quizTime=30; document.getElementById('q-time').textContent=quizTime;
  quizTimer=setInterval(()=>{ quizTime--; document.getElementById('q-time').textContent=quizTime; if(quizTime<=0){clearInterval(quizTimer);answerQ(-1);} },1000);
}
function answerQ(idx){
  clearInterval(quizTimer);
  const q=quizData[quizTopic][quizQ];
  document.querySelectorAll('.qopt').forEach((b,i)=>{
    b.disabled=true;
    if(i===q.ans) b.style.background='rgba(76,175,80,0.45)';
    else if(i===idx) b.style.background='rgba(255,82,82,0.45)';
  });
  if(idx===q.ans){ quizScore++; document.getElementById('q-score').textContent=quizScore; }
  quizQ++;
  setTimeout(showQuestion,1300);
}

/* ── CONTACT FORM ── */
function handleSubmit(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Sending...'; btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('form-success').style.display='block';
    btn.textContent='Send Message →'; btn.disabled=false;
    e.target.reset();
    setTimeout(()=>{ document.getElementById('form-success').style.display='none'; },5000);
  },1000);
}

/* ── INIT ── */
window.addEventListener('DOMContentLoaded',()=>{
  calcIT(); calcGST(); calcSIP(); calcEMI(); calcHRA();
  renderNews('icai');
  loadQuiz('gst', document.querySelector('.qtab'));
});


/* ── LOGO FLOAT EFFECT ── */
function initLogoFloat(){
  const lt=document.querySelector('.logo-tag');
  if(!lt) return;
  const text=lt.textContent;
  lt.innerHTML=text.split('').map(c=>c===' '?'<span class="logo-char" style="display:inline-block"> </span>':`<span class="logo-char" style="display:inline-block;transition:transform .25s,color .25s">${c}</span>`).join('');
  const logo=document.querySelector('.logo');
  if(!logo) return;
  logo.addEventListener('mousemove',e=>{
    lt.querySelectorAll('.logo-char').forEach(ch=>{
      const r=ch.getBoundingClientRect();
      const cx=r.left+r.width/2, cy=r.top+r.height/2;
      const dx=e.clientX-cx, dy=e.clientY-cy;
      const dist=Math.sqrt(dx*dx+dy*dy);
      const max=70;
      if(dist<max){
        const s=1-dist/max;
        ch.style.transform=`translate(${-dx*s*0.25}px,${-Math.abs(dy)*s*0.6-10*s}px)`;
        ch.style.color=`rgba(226,255,0,${0.7+s*0.3})`;
        ch.style.textShadow=`0 0 ${10*s}px rgba(226,255,0,0.8)`;
      } else {
        ch.style.transform=''; ch.style.color=''; ch.style.textShadow='';
      }
    });
  });
  logo.addEventListener('mouseleave',()=>{
    lt.querySelectorAll('.logo-char').forEach(c=>{c.style.transform='';c.style.color='';c.style.textShadow='';});
  });
}
