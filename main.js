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
  function v(id){return parseFloat((document.getElementById(id)||{}).value)||0;}
  function fmt(n){return 'Rs. '+Math.round(n).toLocaleString('en-IN');}
  function pct(n,d){return d>0?(n/d*100).toFixed(2)+'%':'0%';}
  var salary=v('it-salary'),business=v('it-business'),rental=v('it-rental');
  var interest=v('it-interest'),stcg=v('it-stcg'),ltcg=v('it-ltcg'),other=v('it-other');
  var gross=salary+business+rental+interest+stcg+ltcg+other;
  var resEl=document.getElementById('it-result');
  if(gross<=0){resEl.innerHTML='<div style="color:#ff6b6b;text-align:center;padding:1rem">Please enter your income details above.</div>';return;}
  var entityEl=document.getElementById('it-entity-type');
  var entity=entityEl?entityEl.value:'individual';
  if(entity==='company-d'||entity==='company-f'){
    var isF=entity==='company-f';
    var br=isF?0.40:0.22;
    var sr=isF?(gross>100000000?0.05:gross>10000000?0.02:0):0.10;
    var bt=gross*br,sc=bt*sr,cs=(bt+sc)*0.04,tot=bt+sc+cs;
    var lbl=isF?'Foreign Company (40%)':'Domestic Company Sec 115BAA (22%)';
    resEl.innerHTML='<div style="background:rgba(74,74,244,0.1);border:1px solid #4a4af4;border-radius:12px;padding:1.5rem"><h3 style="color:#a0aec0;margin-bottom:1rem;text-align:center">'+lbl+'</h3><table style="width:100%;border-collapse:collapse"><tr><td style="padding:.5rem;color:#a0aec0">Gross Income</td><td style="text-align:right;color:#e2e8f0;font-weight:600">'+fmt(gross)+'</td></tr><tr><td style="padding:.5rem;color:#a0aec0">Base Tax ('+Math.round(br*100)+'%)</td><td style="text-align:right;color:#e2e8f0">'+fmt(bt)+'</td></tr><tr><td style="padding:.5rem;color:#a0aec0">Surcharge ('+Math.round(sr*100)+'%)</td><td style="text-align:right;color:#e2e8f0">'+fmt(sc)+'</td></tr><tr><td style="padding:.5rem;color:#a0aec0">Health & Ed Cess (4%)</td><td style="text-align:right;color:#e2e8f0">'+fmt(cs)+'</td></tr><tr style="border-top:2px solid #4a4af4"><td style="padding:.8rem .5rem;color:#e2e8f0;font-weight:700;font-size:1.1rem">Total Tax</td><td style="text-align:right;color:#6BCB77;font-weight:700;font-size:1.2rem">'+fmt(tot)+'</td></tr><tr><td style="padding:.5rem;color:#a0aec0">Effective Rate</td><td style="text-align:right;color:#f6ad55">'+pct(tot,gross)+'</td></tr></table></div>';
    return;
  }
  var ded=v('it-80c')+v('it-80d')+v('it-hra')+v('it-hl')+v('it-nps')+v('it-other-ded');
  var stdN=75000,tblN=Math.max(0,gross-stdN);
  function txN(ti){if(ti<=300000)return 0;if(ti<=700000)return(ti-300000)*0.05;if(ti<=1000000)return 20000+(ti-700000)*0.10;if(ti<=1200000)return 50000+(ti-1000000)*0.15;if(ti<=1500000)return 80000+(ti-1200000)*0.20;return 140000+(ti-1500000)*0.30;}
  var tBN=txN(tblN);if(tblN<=700000)tBN=0;
  var stdO=50000,tblO=Math.max(0,gross-stdO-ded);
  function txO(ti){if(ti<=250000)return 0;if(ti<=500000)return(ti-250000)*0.05;if(ti<=1000000)return 12500+(ti-500000)*0.20;return 112500+(ti-1000000)*0.30;}
  var tBO=txO(tblO);if(tblO<=500000)tBO=0;
  function gSC(g,t,isN){if(g<=5000000)return 0;if(g<=10000000)return t*0.10;if(g<=20000000)return t*0.15;if(g<=50000000)return t*0.25;return t*(isN?0.25:0.37);}
  var scN=gSC(gross,tBN,true),csN=(tBN+scN)*0.04,totN=tBN+scN+csN;
  var scO=gSC(gross,tBO,false),csO=(tBO+scO)*0.04,totO=tBO+scO+csO;
  var better=totN<=totO?'New Regime':'Old Regime',saved=Math.abs(totO-totN);
  var scNote=gross>5000000?'<p style="color:#f6ad55;font-size:0.78rem;margin:.4rem 0 0">Surcharge applied (income &gt; Rs. 50L)</p>':''; 
  resEl.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem"><div style="background:rgba(74,74,244,0.1);border:2px solid '+(better==='New Regime'?'#6BCB77':'#4a4af4')+';border-radius:12px;padding:1.2rem"><h3 style="color:#a0aec0;margin-bottom:.8rem;text-align:center;font-size:.9rem">NEW REGIME'+(better==='New Regime'?' <span style="color:#6BCB77">BETTER</span>':'')+'</h3><table style="width:100%;border-collapse:collapse"><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Taxable Income</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(tblN)+'</td></tr><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Base Tax</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(tBN)+'</td></tr><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Surcharge</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(scN)+'</td></tr><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Cess (4%)</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(csN)+'</td></tr><tr style="border-top:1px solid #4a4af4"><td style="padding:.5rem .4rem;color:#e2e8f0;font-weight:700">Total</td><td style="text-align:right;color:#6BCB77;font-weight:700;font-size:1.1rem">'+fmt(totN)+'</td></tr></table></div><div style="background:rgba(74,74,244,0.1);border:2px solid '+(better==='Old Regime'?'#6BCB77':'#4a4af4')+';border-radius:12px;padding:1.2rem"><h3 style="color:#a0aec0;margin-bottom:.8rem;text-align:center;font-size:.9rem">OLD REGIME'+(better==='Old Regime'?' <span style="color:#6BCB77">BETTER</span>':'')+'</h3><table style="width:100%;border-collapse:collapse"><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Taxable Income</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(tblO)+'</td></tr><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Base Tax</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(tBO)+'</td></tr><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Surcharge</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(scO)+'</td></tr><tr><td style="padding:.4rem;color:#a0aec0;font-size:.85rem">Cess (4%)</td><td style="text-align:right;color:#e2e8f0;font-size:.85rem">'+fmt(csO)+'</td></tr><tr style="border-top:1px solid #4a4af4"><td style="padding:.5rem .4rem;color:#e2e8f0;font-weight:700">Total</td><td style="text-align:right;color:#6BCB77;font-weight:700;font-size:1.1rem">'+fmt(totO)+'</td></tr></table></div></div><div style="background:rgba(74,74,244,0.15);border-radius:8px;padding:.8rem;text-align:center"><span style="color:#a0aec0">Save </span><span style="color:#6BCB77;font-weight:700;font-size:1.1rem">'+fmt(saved)+'</span><span style="color:#a0aec0"> by choosing </span><span style="color:#f6ad55;font-weight:700">'+better+'</span></div>'+scNote;
}
function downloadTaxPDF(){
  const d = window._taxData;
  if(!d){ calcIT(); }
  const t = window._taxData;
  const ageLabel = {general:'Below 60 (General)',senior:'60–80 (Senior Citizen)',supersenior:'Above 80 (Super Senior)'}[t.age]||t.age;
  const natLabel = t.nationality==='resident'?'Resident Indian':'NRI / NOR';
  const rows = [
    ['Assessment Year','AY 2026-27 (FY 2025-26)'],
    ['Tax Regime', t.regime==='old'?'Old Regime':'New Regime'],
    ['Age Group', ageLabel],
    ['Residency', natLabel],
    ['---'],
    ['Salary / Pension', fmt(t.salary)],
    ['Business / Profession', fmt(t.business)],
    ['Rental Income', fmt(t.rental)],
    ['Interest Income', fmt(t.interest)],
    ['STCG u/s 111A', fmt(t.stcg111a)],
    ['LTCG u/s 112A', fmt(t.ltcg112a)],
    ['Other Income', fmt(t.other)],
    ['Gross Total Income', fmt(t.gross)],
    ['---'],
    ['Standard Deduction', '− '+fmt(t.stdDed)],
    ['Other Deductions', '− '+fmt(Math.max(0,t.totalDed-t.stdDed))],
    ['Taxable Income', fmt(t.taxable)],
    ['---'],
    ...t.slabs.map(s=>['  '+s,'']),
    ['Tax on Normal Income', fmt(t.normalTax)],
    ...(t.rebate87a>0?[['Rebate u/s 87A','− '+fmt(t.rebate87a)]]:[]),
    ...(t.marginalRelief>0?[['Marginal Relief','− '+fmt(t.marginalRelief)]]:[]),
    ...(t.stcgTax>0?[['STCG Tax @ 20%',fmt(t.stcgTax)]]:[]),
    ...(t.ltcgTax>0?[['LTCG Tax @ 12.5%',fmt(t.ltcgTax)]]:[]),
    ['Health & Edu. Cess (4%)', fmt(t.cess)],
    ['---'],
    ['TOTAL TAX PAYABLE', fmt(t.total)],
    ['Monthly TDS', fmt(t.total/12)+'/mo'],
    ['Effective Tax Rate', t.effRate.toFixed(2)+'%'],
  ];
  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Tax Computation FY 2025-26</title>
  <style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#222;font-size:13px}
  h1{font-size:18px;border-bottom:2px solid #333;padding-bottom:8px}
  h2{font-size:14px;color:#444;margin-top:24px}
  table{width:100%;border-collapse:collapse;margin-top:12px}
  tr:nth-child(even){background:#f9f9f9}
  td{padding:6px 10px}td:last-child{text-align:right;font-weight:600}
  .sep{border-top:1px dashed #ccc}.total-row td{background:#333;color:#fff;font-size:14px}
  .footer{margin-top:32px;font-size:11px;color:#888;border-top:1px solid #ccc;padding-top:10px}
  </style></head><body>
  <h1>Income Tax Computation — FY 2025-26 / AY 2026-27</h1>
  <p style="color:#555;font-size:12px">Prepared by A Bagla Financial Services | atulbagla.com</p>
  <table>${rows.map(r=>r[0]==='---'?'<tr class="sep"><td colspan="2" style="padding:2px"></td></tr>':`<tr${r[0]==='TOTAL TAX PAYABLE'?' class="total-row"':''}><td>${r[0]}</td><td>${r[1]||''}</td></tr>`).join('')}
  </table><div class="footer">Disclaimer: This is an indicative calculation for FY 2025-26. Surcharge, AMT, and other complex provisions not included. Consult a CA for professional advice.<br>© A Bagla Financial Services — atulbagla.com</div>
  </body></html>`;
  const w=window.open('','_blank');
  w.document.write(html);
  w.document.close();
  setTimeout(()=>w.print(),400);
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
  if(id==='gravity') startGravity();
}

/* ── GRAVITY BALL GAME ── */
let gravityRAF=null, gravityScore=0, gravityBest=0;
function startGravity(){
  const cv0=document.getElementById('gravity-canvas');
  if(!cv0)return;
  const cv2=cv0.cloneNode(true);cv0.parentNode.replaceChild(cv2,cv0);
  const cv=document.getElementById('gravity-canvas');
  const ctx=cv.getContext('2d');
  const W=cv.width||700,H=cv.height||420;
  const balls=[];
  const COLS=['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF9F1C','#C77DFF','#F72585','#4CC9F0','#00F5FF','#39FF14'];
  function spawnAt(px){
    for(let i=0;i<3;i++) setTimeout(()=>balls.push({x:px+(Math.random()-.5)*50,y:0,r:9+Math.random()*13,vx:(Math.random()-.5)*6,vy:Math.random()*2,col:COLS[Math.floor(Math.random()*COLS.length)]}),i*90);
  }
  function gx(e){const r=cv.getBoundingClientRect();return(e.clientX-r.left)*(W/r.width);}
  cv.addEventListener('click',e=>spawnAt(gx(e)));
  cv.addEventListener('touchstart',e=>{e.preventDefault();const t=e.touches[0];const r=cv.getBoundingClientRect();spawnAt((t.clientX-r.left)*(W/r.width));},{passive:false});
  (function loop(){
    ctx.clearRect(0,0,W,H);
    const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#050510');bg.addColorStop(1,'#0d0225');
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,255,255,0.4)';
    for(let i=0;i<30;i++)ctx.fillRect((i*137+13)%W,(i*97+7)%H,1.5,1.5);
    if(!balls.length){
      ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='bold 18px Arial';ctx.textAlign='center';
      ctx.fillText('Click anywhere — balls drop from the top!',W/2,H/2);
      ctx.font='13px Arial';ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillText('Each click drops 3 glowing balls',W/2,H/2+28);
    }
    for(let b of balls){
      b.vy+=0.45;b.vx*=0.993;b.x+=b.vx;b.y+=b.vy;
      if(b.y+b.r>H){b.y=H-b.r;b.vy*=-.6;b.vx*=.88;if(Math.abs(b.vy)<.6)b.vy=0;}
      if(b.x-b.r<0){b.x=b.r;b.vx=Math.abs(b.vx)*.65;}
      if(b.x+b.r>W){b.x=W-b.r;b.vx=-Math.abs(b.vx)*.65;}
      ctx.shadowBlur=18;ctx.shadowColor=b.col;
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
      const g=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,b.r*.1,b.x,b.y,b.r);
      g.addColorStop(0,'rgba(255,255,255,0.85)');g.addColorStop(.35,b.col);g.addColorStop(1,'rgba(0,0,0,0.6)');
      ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;
    }
    if(balls.length>65)balls.splice(0,balls.length-60);
    if(balls.length){ctx.fillStyle='rgba(255,255,255,0.35)';ctx.font='12px Arial';ctx.textAlign='right';ctx.fillText(balls.length+' balls | click for more',W-10,18);}
    requestAnimationFrame(loop);
  })();
}
let speedRunning=false,speedTimer=null,speedSentence='',speedTimeLeft=60;
const sentences=['The quick brown fox jumps over the lazy dog.','Compound interest is the eighth wonder of the world.','Do not save what is left after spending but spend what is left after saving.','An investment in knowledge pays the best interest always.','Never spend your money before you have truly earned it.','The stock market rewards patience over perfect timing every time.','Budget your money wisely or your money will budget your life.','A penny saved is a penny earned according to the wise old saying.','Wealth is not about having a lot of money but having a lot of options.','Financial discipline is the bridge between goals and financial reality.'];
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
    {q:"What is the current standard GST rate in India?",opts:["5%","12%","18%","28%"],ans:2},
    {q:"GST was launched in India on which date?",opts:["1 April 2017","1 July 2017","1 January 2018","15 August 2017"],ans:1},
    {q:"Under which Constitutional Amendment was GST introduced?",opts:["99th","100th","101st","102nd"],ans:2},
    {q:"GSTIN is a unique identification number of how many digits?",opts:["10","12","15","16"],ans:2},
    {q:"Composition Scheme under GST is for businesses with turnover up to?",opts:["50 lakh","75 lakh","1.5 crore","2 crore"],ans:2},
    {q:"Input Tax Credit CANNOT be claimed on which item?",opts:["Raw materials","Capital goods","Personal consumption goods","Office equipment"],ans:2},
    {q:"IGST is levied on which type of transactions?",opts:["Intra-state supply","Inter-state supply","Both","Neither"],ans:1},
    {q:"Which authority resolves disputes between Centre and States under GST?",opts:["GST Council","GSTAT","High Court","CBIC"],ans:1},
  ],
  income:[
    {q:"Basic exemption limit under New Tax Regime for FY 2024-25?",opts:["Rs. 2.5 lakh","Rs. 3 lakh","Rs. 5 lakh","Rs. 4 lakh"],ans:1},
    {q:"Standard deduction for salaried under New Regime (Budget 2024)?",opts:["Rs. 40,000","Rs. 50,000","Rs. 75,000","Rs. 1,00,000"],ans:2},
    {q:"Maximum rebate under Section 87A in Old Regime?",opts:["Rs. 5,000","Rs. 12,500","Rs. 25,000","Rs. 50,000"],ans:1},
    {q:"Maximum deduction allowed under Section 80C?",opts:["Rs. 50,000","Rs. 1 lakh","Rs. 1.5 lakh","Rs. 2 lakh"],ans:2},
    {q:"Tax rate for income Rs. 12L-15L under New Regime FY 2024-25?",opts:["10%","15%","20%","25%"],ans:2},
    {q:"LTCG on listed equity shares above Rs. 1.25 lakh taxed at (Budget 2024)?",opts:["10%","12.5%","15%","20%"],ans:1},
    {q:"Health and Education Cess rate on income tax?",opts:["2%","3%","4%","5%"],ans:2},
    {q:"Which ITR form is filed by individual with only salary income?",opts:["ITR-1","ITR-2","ITR-3","ITR-4"],ans:0},
  ],
  mf:[
    {q:"Full form of NAV in mutual funds?",opts:["Net Annual Value","Net Asset Value","Nominal Asset Value","New Asset Value"],ans:1},
    {q:"ELSS stands for?",opts:["Equity Linked Savings Scheme","Equity Long-term Saving System","Exchange Listed Security","Equity Liquid Savings Solution"],ans:0},
    {q:"Minimum lock-in period for ELSS funds?",opts:["1 year","2 years","3 years","5 years"],ans:2},
    {q:"Which ratio measures risk-adjusted return of a mutual fund?",opts:["P/E Ratio","Sharpe Ratio","Beta","Alpha"],ans:1},
    {q:"Full form of TER in mutual fund context?",opts:["Total Expense Ratio","Tax Exemption Ratio","Trading Entry Rate","Term Equity Return"],ans:0},
    {q:"SIP primarily helps investors achieve?",opts:["Lump sum gains","Rupee cost averaging","Tax evasion","Fixed returns"],ans:1},
    {q:"SEBI categorized MFs by market cap (large/mid/small) in which year?",opts:["2015","2017","2019","2021"],ans:1},
    {q:"Which fund category has mandatory 3-year lock-in AND gives 80C benefit?",opts:["Index Fund","ELSS","Liquid Fund","Balanced Advantage Fund"],ans:1},
  ],
  tds:[
    {q:"TDS on salary is deducted under which section?",opts:["Section 194A","Section 194C","Section 192","Section 194J"],ans:2},
    {q:"TDS rate on technical services (Section 194J) from FY 2020-21?",opts:["10%","2%","5%","7.5%"],ans:1},
    {q:"TDS deducted in March must be deposited by?",opts:["7th April","30th April","31st May","7th May"],ans:1},
    {q:"Form 26AS is?",opts:["Annual tax credit statement","Wealth tax return","Advance tax challan","TDS certificate for rent"],ans:0},
    {q:"TDS certificate for salary is issued in?",opts:["Form 16","Form 16A","Form 26Q","Form 24Q"],ans:0},
    {q:"If PAN is not provided, TDS is deducted at?",opts:["Normal TDS rate","20% or applicable higher rate","Nil","5% flat"],ans:1},
    {q:"Section 194N covers TDS on?",opts:["Interest on FD","Cash withdrawal from bank","Professional fees","Rent"],ans:1},
    {q:"Quarterly TDS return for non-salary payments is filed in?",opts:["Form 24Q","Form 26Q","Form 27Q","Form 27EQ"],ans:1},
  ],
  accounting:[
    {q:"Double entry system requires every transaction to have?",opts:["Two debits","Two credits","Equal debit and credit","No credits"],ans:2},
    {q:"Depreciation under SLM is calculated on?",opts:["Written down value","Original cost","Market value","Book value"],ans:1},
    {q:"ICAI was established in which year?",opts:["1947","1949","1956","1961"],ans:1},
    {q:"Goodwill is classified as?",opts:["Current asset","Fictitious asset","Intangible fixed asset","Tangible fixed asset"],ans:2},
    {q:"Which concept requires consistent application of accounting policies?",opts:["Going concern","Consistency concept","Materiality","Prudence"],ans:1},
    {q:"Revenue is recognized when (as per AS-9)?",opts:["Cash received","Goods delivered or services rendered","Invoice raised","Order received"],ans:1},
    {q:"Full form of EBITDA?",opts:["Earnings Before Interest Tax Depreciation and Amortization","Equity Before Income Tax Dividends Assets","Earnings Before Income Tax Dues Assessment","None of the above"],ans:0},
    {q:"Ind AS is based on which global standards?",opts:["US GAAP","IFRS","ICAI own standards","UK GAAP"],ans:1},
  ],
  current:[
    {q:"Union Budget 2025-26: No income tax payable up to income of?",opts:["Rs. 7 lakh","Rs. 10 lakh","Rs. 12 lakh","Rs. 15 lakh"],ans:2},
    {q:"India fiscal deficit target for FY 2025-26 is?",opts:["4.5% of GDP","4.4% of GDP","5.1% of GDP","3.5% of GDP"],ans:1},
    {q:"SEBI T+0 settlement means trades settle on?",opts:["Next working day","Same day","2 days later","Weekly basis"],ans:1},
    {q:"Which index represents the top 50 companies on NSE?",opts:["SENSEX","NIFTY 50","BSE 100","NIFTY BANK"],ans:1},
    {q:"Budget 2025: TDS threshold on bank FD interest (194A) raised to?",opts:["Rs. 40,000","Rs. 50,000","Rs. 75,000","Rs. 1,00,000"],ans:1},
    {q:"RBI cut its repo rate in February 2025 to?",opts:["6.75%","6.50%","6.25%","6.00%"],ans:2},
    {q:"Which scheme offers paid internships in top 500 Indian companies (Budget 2024)?",opts:["PM Internship Scheme","Skill India 2.0","Digital India Jobs","MUDRA Internship"],ans:0},
    {q:"LTCG tax on equity was raised in Budget 2024 to?",opts:["10%","12.5%","15%","20%"],ans:1},
  ],
}
let quizTopic='gst', quizQ=0, quizScore=0, quizTimer=null, quizTime=30;
function loadQuiz(topic, btn){
  if(btn){ document.querySelectorAll('.qtab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
  quizTopic=topic; quizQ=0; quizScore=0;
  document.getElementById('q-score').textContent='0';
  showQuestion();
}
function showQuestion(){
  const data=quizData[quizTopic];
  if(!data||quizQ>=data.length){
    const sc=quizScore,tot=data?data.length:0;
    document.getElementById("quiz-body").innerHTML=
      "<div style=\"text-align:center;padding:2rem\">"
      +"<div style=\"font-size:3rem\">&#x1F389;</div>"
      +"<div style=\"font-size:1.3rem;color:#c8ff00;margin:.5rem 0\">Quiz Complete!</div>"
      +"<div style=\"color:#aaa\">Score: <strong style=\"color:#ffe000\">"+sc+"</strong> / "+tot+"</div>"
      +"<button onclick=\"loadQuiz(quizTopic)\" style=\"margin-top:1rem;padding:.5rem 1.5rem;background:#c8ff00;color:#000;border:none;border-radius:8px;font-weight:700;cursor:pointer\">&#x1F504; Retry</button>"
      +"</div>";
    return;
  }
  const q=data[quizQ];
  const L=["A","B","C","D"];
  const C=["#4D96FF","#6BCB77","#FF9F1C","#C77DFF"];
  // Inject quiz button styles once
  if(!document.getElementById("qbtn-style")){
    const st=document.createElement("style");
    st.id="qbtn-style";
    st.textContent=".qbtn{display:flex;align-items:center;gap:.7rem;width:100%;margin:.4rem 0;padding:.62rem .95rem;border-radius:10px;color:#fff;font-size:.87rem;cursor:pointer;text-align:left;transition:opacity .15s,background .15s;border-width:1.5px;border-style:solid;background:rgba(255,255,255,0.04)}.qbtn:hover{opacity:.85;filter:brightness(1.15)}";
    document.head.appendChild(st);
  }
  let h="<div style=\"font-size:.98rem;font-weight:600;color:#fff;margin-bottom:1.1rem;line-height:1.55\">Q"+(quizQ+1)+". "+q.q+"</div>";
  q.opts.forEach(function(o,i){
    const badge="<span style=\"min-width:26px;height:26px;border-radius:50%;background:"+C[i]+";color:#fff;font-weight:700;font-size:.78rem;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0\">"+L[i]+"</span>";
    h+="<button class=\"qbtn\" onclick=\"answerQ("+i+")\" style=\"border-color:"+C[i]+";\">"+badge+o+"</button>";
  });
  h+="<div style=\"text-align:right;margin-top:.6rem;font-size:.78rem;color:#666\">Q"+(quizQ+1)+" of "+data.length+" &nbsp;&bull;&nbsp; Score: <span style=\"color:#ffe000\">"+quizScore+"</span></div>";
  document.getElementById("quiz-body").innerHTML=h;
}
function answerQ(i){
  const data=quizData[quizTopic];if(!data)return;
  const q=data[quizQ];
  const C=["#4D96FF","#6BCB77","#FF9F1C","#C77DFF"];
  const btns=[...document.getElementById("quiz-body").querySelectorAll(".qbtn")];
  btns.forEach(function(b,bi){
    b.style.pointerEvents="none";
    if(bi===q.ans){b.style.background=C[bi]+"88";b.style.borderColor=C[bi];b.style.fontWeight="700";}
    else if(bi===i){b.style.background="rgba(255,60,60,0.25)";b.style.borderColor="#ff5555";}
  });
  if(i===q.ans)quizScore++;
  document.getElementById("q-score").textContent=quizScore;
  setTimeout(function(){quizQ++;showQuestion();},1100);
}
function handleSubmit(e){
  const btn=e.target.querySelector('button[type=submit]');
  if(btn){ btn.textContent='Sending…'; btn.disabled=true; }
  // Form submits naturally to FormSubmit.co — no preventDefault
}
function initLogoFloat(){
  const el=document.querySelector('.logo-tag');
  if(!el)return;
  el.style.cssText+='white-space:nowrap;display:inline-block;';
  const orig=el.textContent.trim();
  el.innerHTML='';
  orig.split('').forEach((ch,i)=>{
    const s=document.createElement('span');
    s.dataset.i=i;
    if(ch===' '){
      s.style.cssText='display:inline-block;min-width:0.42em;';
      s.textContent=' ';
    } else {
      s.style.cssText='display:inline-block;transition:transform .18s cubic-bezier(.34,1.56,.64,1),color .18s,text-shadow .18s;cursor:default;';
      s.textContent=ch;
      s.addEventListener('mouseover',function(){
        this.style.transform='translateY(-7px) scale(1.5)';
        this.style.color='#ffe000';
        this.style.textShadow='0 0 8px #ffe000, 0 0 18px #ff8c00';
        // Ripple neighbours
        const all=[...el.querySelectorAll('span[data-i]')];
        const me=+this.dataset.i;
        all.forEach(nb=>{
          const d=Math.abs(+nb.dataset.i - me);
          if(d===1){nb.style.transform='translateY(-4px) scale(1.25)';nb.style.color='#ffaa00';nb.style.textShadow='0 0 5px #ff8c00';}
          else if(d===2){nb.style.transform='translateY(-2px) scale(1.1)';nb.style.color='';nb.style.textShadow='';}
        });
      });
      s.addEventListener('mouseout',function(){
        this.style.transform='';this.style.color='';this.style.textShadow='';
        const all=[...el.querySelectorAll('span[data-i]')];
        all.forEach(nb=>{nb.style.transform='';nb.style.color='';nb.style.textShadow='';});
      });
    }
    el.appendChild(s);
  });
}
function initHeroFloat(){
  function wrapLetters(text,container,registry,glowColor,rippleColor){
    text.split('').forEach(ch=>{
      const s=document.createElement('span');
      s.dataset.fi=registry.length;
      if(ch===' '){
        s.style.cssText='display:inline-block;min-width:0.28em;';
        s.textContent=' ';
      } else {
        s.style.cssText='display:inline-block;transition:transform .22s cubic-bezier(.34,1.8,.64,1),color .15s,text-shadow .15s;cursor:default;position:relative;';
        s.textContent=ch;
        const myIdx=registry.length;
        s.addEventListener('mouseover',function(){
          registry.forEach((nb,ni)=>{
            const d=Math.abs(ni-myIdx);
            if(d===0){nb.style.transform='translateY(-22px) scale(1.25) rotate(-3deg)';nb.style.color=glowColor;nb.style.textShadow='0 0 12px '+glowColor+',0 0 30px '+glowColor+',0 0 60px '+rippleColor;nb.style.zIndex='10';}
            else if(d===1){nb.style.transform='translateY(-13px) scale(1.13)';nb.style.color=rippleColor;nb.style.textShadow='0 0 10px '+rippleColor;}
            else if(d===2){nb.style.transform='translateY(-7px) scale(1.06)';nb.style.color='';nb.style.textShadow='0 0 5px '+rippleColor;}
            else if(d===3){nb.style.transform='translateY(-3px)';nb.style.color='';nb.style.textShadow='';}
            else{nb.style.transform='';nb.style.color='';nb.style.textShadow='';}
          });
        });
        s.addEventListener('mouseout',function(){
          registry.forEach(nb=>{nb.style.transform='';nb.style.color='';nb.style.textShadow='';});
        });
      }
      registry.push(s);
      container.appendChild(s);
    });
  }
  const h1=document.querySelector('.hero-h1');
  if(h1){
    const reg1=[],reg2=[];
    h1.innerHTML='';
    const line1=document.createElement('span');
    line1.style.cssText='display:block;white-space:nowrap;';
    wrapLetters('A Bagla',line1,reg1,'#ffe000','#ff8c00');
    h1.appendChild(line1);
    const line2=document.createElement('span');
    line2.style.cssText='display:block;white-space:nowrap;color:#c8ff00;text-shadow:0 0 18px #c8ff00,0 0 40px #9acd00;';
    wrapLetters('Financial Services',line2,reg2,'#ffffff','#c8ff00');
    h1.appendChild(line2);
  }
  const tl=document.querySelector('.hero-tagline');
  if(tl){
    const text=tl.textContent.trim();
    tl.innerHTML='';tl.style.whiteSpace='nowrap';
    const reg=[];
    wrapLetters(text,tl,reg,'#ffe000','#ff8c00');
  }
}

function refreshLivePrices(){
  var btn=document.getElementById('live-refresh-btn');
  if(btn){btn.textContent='Refreshing...';btn.disabled=true;}
  var proxy='https://api.allorigins.win/get?url=';
  fetch(proxy+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/%5EBSESN?interval=1m&range=1d')).then(function(r){return r.json();}).then(function(d){try{var m=JSON.parse(d.contents).chart.result[0].meta;var p=m.regularMarketPrice,pr=m.chartPreviousClose,ch=p-pr,pt=(ch/pr*100).toFixed(2);var col=ch>=0?'#6BCB77':'#ff6b6b',sg=ch>=0?'+':'';var el=document.getElementById('live-sensex');if(el)el.innerHTML=p.toLocaleString('en-IN',{maximumFractionDigits:0})+' <span style="color:'+col+'">'+sg+pt+'%</span>';}catch(e){}}).catch(function(){});
  fetch(proxy+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?interval=1m&range=1d')).then(function(r){return r.json();}).then(function(d){try{var m=JSON.parse(d.contents).chart.result[0].meta;var p=m.regularMarketPrice,pr=m.chartPreviousClose,ch=p-pr,pt=(ch/pr*100).toFixed(2);var col=ch>=0?'#6BCB77':'#ff6b6b',sg=ch>=0?'+':'';var el=document.getElementById('live-nifty');if(el)el.innerHTML=p.toLocaleString('en-IN',{maximumFractionDigits:0})+' <span style="color:'+col+'">'+sg+pt+'%</span>';}catch(e){}}).catch(function(){});
  fetch(proxy+encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/GC%3DF?interval=1m&range=1d')).then(function(r){return r.json();}).then(function(d){try{var m=JSON.parse(d.contents).chart.result[0].meta;var p=m.regularMarketPrice;var el=document.getElementById('live-gold');if(el)el.innerHTML='$'+p.toFixed(2);}catch(e){}}).catch(function(){});
  fetch('https://api.exchangerate-api.com/v4/latest/USD').then(function(r){return r.json();}).then(function(d){try{var rate=d.rates.INR;var el=document.getElementById('live-usd');if(el)el.innerHTML='Rs. '+rate.toFixed(2);}catch(e){}}).catch(function(){});
  setTimeout(function(){if(btn){btn.textContent='Refresh Prices';btn.disabled=false;}},7000);
}

window.addEventListener('DOMContentLoaded',()=>{
  calcIT(); calcGST(); calcSIP(); calcEMI(); calcHRA();
  renderNews('icai');
  loadQuiz('gst', document.querySelector('.qtab'));
  
function playCoinSound(){try{var ac=new(window.AudioContext||window.webkitAudioContext)();var notes=[523,659,784,1047];notes.forEach(function(f,i){var o=ac.createOscillator(),g=ac.createGain();o.connect(g);g.connect(ac.destination);o.type="sine";o.frequency.value=f;var t=ac.currentTime+i*0.09;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.28,t+0.01);g.gain.exponentialRampToValueAtTime(0.001,t+0.18);o.start(t);o.stop(t+0.18);});}catch(e){}}
function setupHeroEffects(){var h1=document.querySelector(".hero-h1");var neon=document.querySelector(".neon-text");var tl=document.querySelector(".hero-tagline");if(h1){h1.style.transition="transform 0.35s ease,text-shadow 0.35s ease";h1.addEventListener("mouseenter",function(){this.style.transform="scale(1.06) translateY(-4px)";this.style.textShadow="0 0 30px rgba(226,255,0,0.5)";playCoinSound();});h1.addEventListener("mouseleave",function(){this.style.transform="";this.style.textShadow="";});}if(neon){neon.style.transition="text-shadow 0.35s ease,transform 0.35s ease";neon.addEventListener("mouseenter",function(){this.style.textShadow="0 0 40px #e2ff00,0 0 80px #e2ff00,0 0 120px rgba(226,255,0,0.5)";this.style.transform="scale(1.03)";playCoinSound();});neon.addEventListener("mouseleave",function(){this.style.textShadow="";this.style.transform="";});}if(tl){tl.style.transition="letter-spacing 0.3s ease";tl.addEventListener("mouseenter",function(){this.style.letterSpacing="0.07em";});tl.addEventListener("mouseleave",function(){this.style.letterSpacing="";}); }}
initLogoFloat();

  initHeroFloat();
  setupHeroEffects();
});
