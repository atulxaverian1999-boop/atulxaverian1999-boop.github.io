// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  A Bagla Financial Services â€” main.js
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

/* â”€â”€ BACKGROUND CANVAS â”€â”€ */
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

/* â”€â”€ NAVBAR SCROLL â”€â”€ */
const navbar = document.getElementById('navbar');
if(navbar){
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* â”€â”€ HAMBURGER MENU â”€â”€ */
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

/* â”€â”€ SMOOTH SCROLL â”€â”€ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

/* â”€â”€ SERVICE MODAL â”€â”€ */
const svcData = {
  gst:{icon:'ğŸ§¾',title:'GST Compliance & Advisory',desc:'Complete GST management from registration to monthly returns. We handle GSTR-1, GSTR-3B, GSTR-9, and reconciliation with GSTR-2A/2B. Includes advisory on GST applicability, rate classification, reverse charge mechanisms, and audit support.',points:['GST Registration & Amendments','Monthly / Quarterly Return Filing (GSTR-1, GSTR-3B)','GSTR-2A / 2B Reconciliation','GST Annual Return & Audit (GSTR-9, 9C)','E-Invoice & E-Way Bill Management','Notices & Departmental Correspondence']},
  tds:{icon:'ğŸ“‹',title:'TDS / TCS Compliance',desc:'End-to-end TDS management ensuring timely deduction, payment, and filing. We handle all TDS sections â€” salary (192), professional fees (194J), rent (194I), contractor (194C), and more.',points:['TDS Computation & Challan Payment','Quarterly TDS Returns (24Q, 26Q, 27Q)','Form 16 / 16A Generation','TDS Mismatch Resolution & Rectification','Lower Deduction Certificate (Sec 197)','TCS Compliance under Sec 206C']},
  it:{icon:'ğŸ“Š',title:'Income Tax Services',desc:'Comprehensive income tax planning and compliance for individuals, HUFs, partnership firms, LLPs and companies. We optimise your tax liability legally while ensuring full compliance.',points:['ITR Filing (All Forms â€” ITR 1 to 7)','Tax Planning & Optimisation','Advance Tax Computation & Payment','Scrutiny / Notice Handling','Capital Gains Tax Planning','Appeal before CIT(A) & ITAT']},
  books:{icon:'ğŸ“š',title:'Bookkeeping & Accounting',desc:'Accurate, timely books of accounts maintained by qualified accountants. From daily journal entries to final financial statements â€” we keep your numbers clean and meaningful.',points:['Day-to-Day Bookkeeping','Bank & Party Reconciliation','Payroll Processing & Compliance','Monthly MIS & Management Reports','P&L, Balance Sheet, Cash Flow Statements','Tally / Zoho / Busy / QuickBooks Support']},
  inventory:{icon:'ğŸ“¦',title:'Inventory Management',desc:'Systematic inventory control to reduce shrinkage, improve turnover, and maintain compliance with GST stock requirements. Suitable for traders, manufacturers, and service businesses.',points:['Stock Inward / Outward Tracking','FIFO / LIFO / Weighted Average Valuation','Slow-Moving & Dead Stock Analysis','GST-Compliant Stock Register Maintenance','Physical Verification Support','ERP & Software Integration Assistance']},
  vendor:{icon:'ğŸ¤',title:'Vendor Management',desc:'Streamlined vendor payment and compliance processes to avoid TDS defaults, GST mismatches, and audit queries. We handle end-to-end vendor account management.',points:['Vendor Onboarding & KYC Verification','Payment Scheduling & Reconciliation','TDS on Vendor Payments','GSTR-2A Vendor Reconciliation','Vendor Ledger Management','Vendor Compliance Monitoring']},
  einvoice:{icon:'âš¡',title:'E-Invoice & E-Way Bill',desc:'Mandatory for businesses above â‚¹5 Cr turnover. We handle IRN generation, QR codes, e-way bill creation and management in full compliance with GST e-invoicing mandates.',points:['IRN & QR Code Generation','E-Invoice Cancellation & Amendment','E-Way Bill Creation & Extension','Bulk E-Invoice Processing','API Integration Setup & Testing','Compliance Monitoring & Alerts']},
  itc:{icon:'ğŸ”„',title:'ITC (Input Tax Credit) Management',desc:'Maximise your eligible Input Tax Credit while staying compliant. We identify ITC leakages, reconcile GSTR-2A/2B with your books, and handle reversals and blocked credits.',points:['Monthly ITC Reconciliation','GSTR-2A vs Books Matching','Blocked Credit (Section 17(5)) Analysis','ITC Reversal Compliance','ITC Optimisation Strategy','Annual ITC Audit & Reporting']},
  finance:{icon:'ğŸ’°',title:'Financial Planning & Advisory',desc:'Beyond tax â€” we help you build financial resilience. Cash flow management, working capital planning, loan structuring, and personal financial planning for entrepreneurs and professionals.',points:['Cash Flow Forecasting & Management','Working Capital Optimisation','Business Loan Advisory & Structuring','Personal Financial Planning','Budget Preparation & Variance Analysis','ROI & Profitability Analysis']},
  mf:{icon:'ğŸ“ˆ',title:'Mutual Fund Advisory',desc:'Goal-based investment advisory with a focus on long-term wealth creation. We analyse your risk profile, recommend suitable mutual funds, monitor portfolio performance, and rebalance as needed.',points:['Risk Profiling & Goal Mapping','SIP Planning & Direct Fund Selection','Portfolio Review & Rebalancing','Tax-Efficient Investing (ELSS, Debt Funds)','Lump Sum Deployment Strategy','Regular Performance Reporting']}
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
      <a href="#contact" onclick="closeModal()" class="btn-neon" style="display:inline-block;padding:10px 28px;text-decoration:none;border-radius:4px">Get a Free Consultation â†’</a>
    </div>`;
  document.getElementById('svcModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const m = document.getElementById('svcModal');
  if(m) m.classList.remove('open');
  document.body.style.overflow = '';
}

/* â”€â”€ CALCULATOR TABS â”€â”€ */
function showCalc(id, btn)bùÈ(€‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½É±° œ¹Á…¹•°œ¤¹™½É… ¡ÀôùÀ¹±…ÍÍ1¥ÍĞ¹É•µ½Ù” …Ñ¥Ù”œ¤¤ì(€‘½Õµ•¹Ğ¹ÅÕ•ÉåM•±•Ñ½É±° œ¹Ñ…ˆœ¤¹™½É… ¡ˆôùˆ¹±…ÍÍ1¥ÍĞ¹É•µ½Ù” …Ñ¥Ù”œ¤¤ì(€½¹ÍĞÁ…¹•°€ô‘½Õµ•¹Ğ¹•Ñ±•µ•¹Ñ	å% Á…¹•°´œ­¥¤ì(€¥˜¡Á…¹•°¤Á…¹•°¹±…ÍÍ1¥ÍĞ¹…‘ …Ñ¥Ù”œ¤ì(€¥˜¡‰Ñ¸¤‰Ñ¸¹±…ÍÍ1¥ÍĞ¹…‘ …Ñ¥Ù”œ¤ì(€¥˜¡¥ôôô¥¹½µ”µÑ…àœ¤…±%P ¤ì(€¥˜¡¥ôôôÍĞµ…±Œœ¤…±MP ¤ì(€¥˜¡¥ôôôÍ¥Àµ…±Œœ¤…±…4•‚“°¢–b†–CÓÓÒvVÖ’Ö6Æ2r’6Æ4TÔ’‚“°¢–b†–CÓÓÒv‡&Ö6Æ2r’6Æ4…$‚“°§Ğ ¢ò¢)H)H”ä4ôÔRD‚4Ä5TÄDõ")H)H¢ğ¦gVæ7F–öâf×B†â—²&WGW&â~(+’r´ÖF‚ç&÷VæB†â’çFôÆö6ÆU7G&–ær‚vVâÔ”âr“²Ğ ¢ò¢)H)H•B†VÇW#¢öÆB&Vv–ÖR6Æ"F‚)H)H¢ğ¦gVæ7F–öâööÆE6Æ%F‚‡F†&ÆRÂvR—°¢f"W‚ÒvSÓÓÒw7WW'6Væ–÷"sóS¢†vSÓÓÒw6Væ–÷"só3£#S“°¢–b‡F†&ÆSÃÖW‚’&WGW&â°¢f"FƒÓÇ&VÓ×F†&ÆRÖWƒ°¢f"C"ÒƒSÖW‚“²òò'&6¶WBFòTÀ¢–b†vRÓÒw7WW'6Væ–÷"r—°¢f"CÔÖF‚æÖ–â‡&VÒÇC"“²F‚³×C£ãS²&VÒÓ×C°¢Ğ¢f"C#ÔÖF‚æÖ–â‡&VÒÃS“²F‚³×C"£ã#²&VÒÓ×C#°¢F‚³ÔÖF‚æÖ‚ƒÇ&VÒ’£ã3°¢&WGW&âFƒ°§Ğ ¢ò¢)H)H•B†VÇW#¢æWr&Vv–ÖR6Æ"F‚e’##RÓ#b)H)H¢ğ¦gVæ7F–öâöæWu6Æ%F‚‡F†&ÆR—°¢f"3Õµ³CÃÒÅ³CÃãUÒÅ³CÃãÒÅ³CÃãUÒÅ³CÃã#ÒÅ³CÃã#UÒÅ´–æf–æ—G’Ãã3ÕÓ°¢f"FƒÓÇ&VÓ×F†&ÆS°¢2æf÷$V6‚‚…¶ÂÇ%Ò“Óç²f"3ÔÖF‚æÖ–â‡&VÒÆÂ“²F‚³Ö2§#²&VÒÓÖ3²Ò“°¢&WGW&âFƒ°§Ğ ¢ò¢)H)H•B†VÇW#¢&6RF‚²&V&FR²Ö&v–æÂ&VÆ–VbB$Â‡&WGW&ç2gFW"×&V&FRF÷FÂ&6RF‚’)H)H¢ğ¦gVæ7F–öâö&6UF„gFW%&V&FR†æ÷&ÖÅF†&ÆRÇ7F6t×BÆÇF6t×BÇ&Vv–ÖRÆvR—°¢f"6Æ"Ò&Vv–ÖSÓÓÒvöÆBsõööÆE6Æ%F‚†æ÷&ÖÅF†&ÆRÆvR“¥öæWu6Æ%F‚†æ÷&ÖÅF†&ÆR“°¢f"7F6uCÒ7F6t×B£ã#°¢f"ÇF6uCÒÖF‚æÖ‚ƒÆÇF6t×BÓ#S’£ã#S°¢f"F÷FÄ–æ3Öæ÷&ÖÅF†&ÆR·7F6t×B¶ÇF6t×C°¢f"&V&FSÓ°¢–b‡&Vv–ÖSÓÓÒvöÆBbgF÷FÄ–æ3ÃÓS’&V&FSÔÖF‚æÖ–âƒ#SÇ6Æ"“°¢–b‡&Vv–ÖSÓÓÒvæWrrftotalInc<=1200000) rebate=slab;
  var afterRebate=Math.max(0,slab-rebate)+stcgT+ltcgT;
  // Marginal relief at â‚¹12L rebate boundary (New Regime only)
  if(regime==='new'&&totalInc>1200000){
    var excessOver12L=totalInc-1200000;
    var mr12L=Math.max(0,afterRebate-excessOver12L);
    afterRebate=Math.max(0,afterRebate-mr12L);
  }
  return afterRebate;
}

/* â”€â”€ IT Helper: Compute Surcharge with Marginal Relief â”€â”€ */
function _computeSurcharge(totalInc,baseTax,stcgAmt,ltcgAmt,regime,age,stdDed){
  var thrs=regime==='old'
    ?[[50000000,0.37],[20000000,0.25],[10000000,0.15],[5000000,0.10]]
    :[[50000000,0.25],[20000000,0.25],[10000000,0.15],[5000000,0.10]];
  var scRate=0,threshold=0,prevRate=0;
  for(var i=0;i<thrs.length;i++){
    if(totalInc>thrs[i][0]){ scRate=thrs[i][1]; threshold=thrs[i][0]; prevRate=i+1<thrs.length?thrs[i+1][1]:0; break; }
  }
  if(scRate===0) return {sc:0,scRate:0,relief:0};
  var sc=baseTax*scRate;
  // Marginal relief: tax+surcharge on I minus tax+prevSurcharge at threshold â‰¤ excess income
  var stcgLtcg=stcgAmt+ltcgAmt;
  var normAtThresh=Math.max(0,threshold-stcgLtcg);
  var baseTaxAtThresh=_baseTaxAfterRebate(normAtThresh,stcgAmt,ltcgAmt,regime,age);
  var taxAtThreshWithPrevSC=baseTaxAtThresh*(1+prevRate);
  var excessInc=totalInc-threshold;
  var additionalTax=(baseTax+sc)-taxAtThreshWithPrevSC;
  var relief=Math.max(0,additionalTax-excessInc);
  sc=Math.max(0,sc-relief);
  return {sc,scRate,relief};
}

/* â”€â”€ Main IT Calculator â”€â”€ */
function calcIT(){
  var el=function(id){ return document.getElementById(id)||{value:''}; };
  var entity=(el('it-entity-type').value)||'individual';
  var age   =(el('it-age').value)||'below60';
  var salary  =+el('it-salary').value||0;
  var other   =+el('it-other').value||0;
  var rental  =+el('it-rental').value||0;
  var interest=+el('it-interest').value||0;
  var stcg    =+el('it-stcg').value||0;
  var ltcg    =+el('it-ltcg').value||0;
  var grossOrd=salary+other+rental+interest;
  var gross   =grossOrd+stcg+ltcg;
  var res=document.getElementById('it-result');
  if(!res) return;

  /* Company Tax */
  if(entity==='company-d'||entity==='company-f'){
    var cRate=entity==='company-d'?0.22:0.40;
    var cSCrate=entity==='company-d'?0.10:(gross>100000000?0.05:(gross>10000000?0.02:0));
    var cBase=grossOrd*cRate, cSC=cBase*cSCrate, cCess=(cBase+cSC)*0.04, cTot=cBase+cSC+cCess;
    var cEff=grossOrd>0?cTot/grossOrd*100:0;
    window._lastITresult={entity,gross:grossOrd,baseT:cBase,sc:cSC,cess:cCess,total:cTot,eff:cEff};
    res.innerHTML=`<div class="it-co-title">ğŸ¢ ${entity==='company-d'?'Domestic Company â€” Sec 115BAA':'Foreign Company'} Tax</div>
<div class="itr-row"><span>Total Income (PBT)</span><strong>${fmt(grossOrd)}</strong></div>
<div class="itr-row"><span>Corporate Tax (${entity==='company-d'?'22%':'40%'})</span><strong>${fmt(cBase)}</strong></div>
<div class="itr-row"><span>Surcharge (${(cSCrate*100).toFixed(0)}%)</span><strong>${fmt(cSC)}</strong></div>
<div class="itr-row"><span>Health &amp; Edu. Cess (4%)</span><strong>${fmt(cCess)}</strong></div>
<div class="itr-row final-total"><span>Total Tax Payable</span><strong>${fmt(cTot)}</strong></div>
<div class="itr-row"><span>Effective Tax Rate</span><strong>${cEff.toFixed(2)}%</strong></div>
<div class="it-disclosure">ğŸ“Œ <b>Note:</b> Sec 115BAA Domestic rate 22% â€” no deductions/exemptions. Surcharge 10% flat for domestic (Sec 115BAA). Foreign: surcharge 2% (&gt;â‚¹1Cr), 5% (&gt;â‚¹10Cr). Cess 4% on tax+surcharge. MAT &amp; AMT provisions not included. This is an indicative estimate only.</div>
<button class="btn-download-comp" onclick="downloadITcomp()">â¬‡ Download Computation</button>`;
    return;
  }

  /* â”€â”€ OLD REGIME â”€â”€ */
  var c80 =Math.min(+el('it-80c').value||0,150000);
  var d80 =+el('it-80d').value||0;
  var hra =+el('it-hra').value||0;
  var hl  =+el('it-hl').value||0;
  var nps =Math.min(+el('it-nps').value||0,50000);
  var otd =+el('it-other-ded').value||0;
  var stdOld=50000;
  var totalDedOld=c80+d80+hra+hl+nps+otd+stdOld;
  var taxableOld=Math.max(0,grossOrd-totalDedOld);
  var totalIncOld=taxableOld+stcg+ltcg;

  var oldSlabTax=_oldSlabTax(taxableOld,age);
  var stcgTax=stcg*0.20;
  var ltcgTax=Math.max(0,ltcg-125000)*0.125;
  var rebateOld=totalIncOld<=500000?Math.min(12500,oldSlabTax):0;
  var taxOldAfterRebate=Math.max(0,oldSlabTax-rebateOld);
  var totalBaseOld=taxOldAfterRebate+stcgTax+ltcgTax;
  var scResOld=_computeSurcharge(totalIncOld,totalBaseOld,stcg,ltcg,'old',age,stdOld);
  var cessOld=(totalBaseOld+scResOld.sc)*0.04;
  var totalOld=totalBaseOld+scResOld.sc+cessOld;
  var effOld=gross>0?totalOld/gross*100:0;

  /* Slabs for display - Old */
  var oldSlabRows=[];
  var ex=age==='supersenior'?500000:(age==='senior'?300000:250000);
  if(taxableOld>ex){
    var rem=taxableOld-ex;
    if(age!=='supersenior'){ var c=Math.min(rem,500000-ex); if(c>0){ oldSlabRows.push([ex,500000,5,c*0.05]); rem-=c; } }
    else { rem=Math.max(0,taxableOld-500000); }
    var c2=Math.min(rem,500000); if(c2>0){ oldSlabRows.push([500000,1000000,20,c2*0.20]); rem-=c2; }
    if(rem>0) oldSlabRows.push([1000000,Infinity,30,rem*0.30]);
  }

  /* â”€â”€ NEW REGIME â”€â”€ */
  var stdNew=75000;
  var taxableNew=Math.max(0,grossOrd-stdNew);
  var totalIncNew=taxableNew+stcg+ltcg;

  var newSlabTax=_newSlabTax(taxableNew);
  var rebateNew=totalIncNew<=1200000?newSlabTax:0;
  var taxNewAfterRebate=Math.max(0,newSlabTax-rebateNew);
  var mr12L=0;
  if(totalIncNew>1200000){
    var excessOver12L=totalIncNew-1200000;
    var fullNew=taxNewAfterRebate+stcgTax+ltcgTax;
    mr12L=Math.max(0,fullNew-excessOver12L);
    taxNewAfterRebate=Math.max(0,taxNewAfterRebate-Math.min(mr12L,taxNewAfterRebate));
  }
  var totalBaseNew=Math.max(0,taxNewAfterRebate+stcgTax+ltcgTax);
  var scResNew=_computeSurcharge(totalIncNew,totalBaseNew,stcg,ltcg,'new',age,stdNew);
  var cessNew=(totalBaseNew+scResNew.sc)*0.04;
  var totalNew=totalBaseNew+scResNew.sc+cessNew;
  var effNew=gross>0?totalNew/gross*100:0;

  /* Slabs for display - New */
  var newSlabRows=[];
  var ns=[[0,400000,0],[400000,800000,5],[800000,1200000,10],[1200000,1600000,15],[1600000,2000000,20],[2000000,2400000,25],[2400000,Infinity,30]];
  var rem2=taxableNew;
  ns.forEach(([from,to,pct])=>{
    var size=to===Infinity?rem2:Math.min(rem2,to-from); if(size<=0) return;
    if(pct>0) newSlabRows.push([from,to,pct,size*pct/100]);
    rem2-=size;
  });

  var newIsBetter=totalNew<=totalOld;

  /* Store for download */
  window._lastITresult={entity,age,gross,grossOrd,stcg,ltcg,
    old:{taxable:taxableOld,totalDed:totalDedOld,slabTax:oldSlabTax,rebate:rebateOld,taxAfterRebate:taxOldAfterRebate,totalBase:totalBaseOld,sc:scResOld.sc,scRate:scResOld.scRate,mrSurcharge:scResOld.relief,cess:cessOld,total:totalOld,eff:effOld,slabs:oldSlabRows},
    new:{taxable:taxableNew,stdDed:stdNew,slabTax:newSlabTax,rebate:rebateNew,mr12L:mr12L,taxAfterRebate:taxNewAfterRebate,totalBase:totalBaseNew,sc:scResNew.sc,scRate:scResNew.scRate,mrSurcharge:scResNew.relief,cess:cessNew,total:totalNew,eff:effNew,slabs:newSlabRows}
  };

  /* Panel builder */
  function panel(r,taxable,totalInc,grossInc,dedAmt,dedLabel,slabRows,slabTax,rebate,mrRebate,taxAfterRebate,scRate,sc,mrSurcharge,cess,total,eff,isBetter){
    var saving=Math.abs(totalOld-totalNew);
    var slabHTML=slabRows.length?slabRows.map(([f,t,p,tx])=>
      `<div class="slab-row">${fmt(f)}â€“${t===Infinity?'above':fmt(t)} @ ${p}% = ${fmt(tx)}</div>`
    ).join(''):'<div class="slab-row">All income below taxable threshold</div>';
    var scPct=(scRate*100).toFixed(0);
    return `<div class="it-panel ${r}-panel${isBetter?' best-panel':''}">
  <div class="it-panel-hd">${r==='new'?'ğŸ†• NEW REGIME':'ğŸ“ OLD REGIME'}${isBetter?'<span class="badge-better">âœ“ BETTER</span>':''}</div>
  <div class="itr-row"><span>Gross Income</span><strong>${fmt(grossInc)}</strong></div>
  <div class="itr-row deduct-row"><span>${dedLabel}</span><strong>âˆ’ ${fmt(dedAmt)}</strong></div>
  <div class="itr-row taxable-row"><span>Taxable Income</span><strong>${fmt(taxable)}</strong></div>
  ${stcg>0||ltcg>0?`<div class="it-slab-title">Special Rate Income</div>${stcg>0?`<div class="slab-row">STCG u/s 111A â€” ${fmt(stcg)} @20% = ${fmt(stcgTax)}</div>`:''}${ltcg>0?`<div class="slab-row">LTCG u/s 112A â€” ${fmt(ltcg)} (â‚¹1.25L exempt) @12.5% = ${fmt(ltcgTax)}</div>`:''}`:``}
  <div class="it-slab-title">Tax Slab Breakdown</div>
  ${slabHTML}
  <div class="itr-row"><span>Base Tax (Slab)</span><strong>${fmt(slabTax)}</strong></div>
  ${rebate>0?`<div class="itr-row rebate-row"><span>87A Rebate</span><strong class="green-val">âˆ’ ${fmt(rebate)}</strong></div>`:''}
  ${mrRebate>0?`<div class="itr-row rebate-row"><span>Marginal Relief (â‚¹12L)</span><strong class="green-val">âˆ’ ${fmt(mrRebate)}</strong></div>`:''}
  ${stcg>0||ltcg>0?`<div class="itr-row"><span>Tax on Special Income</span><strong>${fmt(stcgTax+ltcgTax)}</strong></div>`:''}
  ${sc>0?`<div class="itr-row sc-row"><span>Surcharge (${scPct}%)</span><strong>${fmt(sc)}</strong></div>`:''}
  ${mrSurcharge>0?`<div class="itr-row rebate-row"><span>Marginal Relief (Surcharge)</span><strong class="green-val">âˆ’ ${fmt(mrSurcharge)}</strong></div>`:''}
  <div class="itr-row"><span>H&amp;E Cess (4%)</span><strong>${fmt(cess)}</strong></div>
  <div class="itr-row final-total"><span>Total Tax Payable</span><strong>${fmt(total)}</strong></div>
  <div class="itr-row"><span>Monthly TDS est.</span><strong>${fmt(total/12)}/mo</strong></div>
  <div class="itr-row"><span>Effective Tax Rate</span><strong>${eff.toFixed(2)}%</strong></div>
  ${saving>0?`<div class="itr-row saving-row"><span>${isBetter?'You save vs '+( r==='new'?'Old':'New')+' Regime':'Extra cost vs '+(r==='new'?'Old':'New')+' Regime'}</span><strong class="${isBetter?'green-val':'red-val'}">${isBetter?'âˆ’':'+'}${fmt(saving)}</strong></div>`:''}
</div>`;
  }

  var newPanel=panel('new',taxableNew,totalIncNew,grossOrd,stdNew,'Std Deduction (â‚¹75,000)',newSlabRows,newSlabTax,rebateNew,mr12L,taxNewAfterRebate,scResNew.scRate,scResNew.sc,scResNew.relief,cessNew,totalNew,effNew,newIsBetter);
  var oldPanel=panel('old',taxableOld,totalIncOld,grossOrd,totalDedOld,'Total Deductions (incl. â‚¹50K std)',oldSlabRows,oldSlabTax,rebateOld,0,taxOldAfterRebate,scResOld.scRate,scResOld.sc,scResOld.relief,cessOld,totalOld,effOld,!newIsBetter);

  res.innerHTML=`<div class="it-compare-title">ğŸ“Š FY 2025-26 (AY 2026-27) â€” Both Regimes at a Glance</div>
<div class="it-compare-wrap">${newIsBetter?newPanel+oldPanel:oldPanel+newPanel}</div>
<div class="it-disclosure">ğŸ“Œ <b>Disclosures:</b> STCG u/s 111A @20% (Budget 2024). LTCG u/s 112A @12.5% on gains above â‚¹1.25L. Rebate u/s 87A â€” Old Regime: max â‚¹12,500 if total income â‰¤ â‚¹5L; New Regime: full rebate (zero tax) if total income â‰¤ â‚¹12L (Budget 2025-26). Surcharge: 10% (&gt;â‚¹50L), 15% (&gt;â‚¹1Cr), 25% (&gt;â‚¹2Cr); New Regime capped at 25% (Old Regime: 37% above â‚¹5Cr). Marginal relief applied at all surcharge thresholds &amp; â‚¹12L boundary. Standard deduction: â‚¹75,000 (New), â‚¹50,000 (Old). HUF treated same as Individual. This is an indicative estimate â€” consult a CA for final computation.</div>
<button class="btn-download-comp" onclick="downloadITcomp()">â¬‡ Download Tax Computation</button>`;
}

/* â”€â”€ Download / Print Tax Computation â”€â”€ */
function downloadITcomp(){
  var r=window._lastITresult;
  if(!r){alert('Please enter income details first.');return;}
  var dt=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  var isIndividual=r.entity==='individual';
  var slabTableRows=function(slabs){ return (slabs||[]).map(([f,t,p,tx])=>`<tr><td>${fmt(f)} â€“ ${t===Infinity?'Above':fmt(t)}</td><td>${p}%</td><td style="text-align:right">${fmt(tx)}</td></tr>`).join('')||'<tr><td colspan="3">No tax in any slab</td></tr>'; };
  var compHTML=`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Tax Computation FY 2025-26</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:30px auto;color:#111;font-size:13px;line-height:1.5;}
h1{font-size:18px;margin-bottom:2px;} .subtitle{color:#555;font-size:11px;margin-bottom:20px;}
h3{font-size:14px;background:#1a1a1a;color:#fff;padding:6px 10px;margin:18px 0 8px;}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
table{width:100%;border-collapse:collapse;margin-bottom:12px;}
th{background:#333;color:#fff;padding:6px 8px;text-align:left;font-size:11px;}
td{padding:5px 8px;border-bottom:1px solid #eee;}
.total-row td{font-weight:bold;background:#f0f0f0;border-top:2px solid #333;}
.rebate-row td{color:#2e7d32;} .sc-row td{color:#b71c1c;}
.saving-row td{color:#1565c0;font-weight:bold;}
.disclosure{font-size:10px;color:#777;border-top:1px solid #ddd;padding-top:10px;margin-top:20px;line-height:1.6;}
.footer{text-align:center;margin-top:24px;font-size:10px;color:#aaa;border-top:1px solid #eee;padding-top:10px;}
.badge{display:inline-block;background:#4caf50;color:#fff;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;margin-left:6px;}
@media print{button{display:none!important;}.no-print{display:none!important;}}
</style></head><body>
<h1>Income Tax Computation â€” FY 2025-26 (AY 2026-27)</h1>
<div class="subtitle">Generated by A Bagla Financial Services &nbsp;|&nbsp; www.atulbagla.com &nbsp;|&nbsp; ${dt}</div>
${isIndividual?`
<h3>Income Details</h3>
<table><tr><th>Head</th><th style="text-align:right">Amount</th></tr>
<tr><td>Gross Total Income (Salary/Business/Rental/Interest)</td><td style="text-align:right">${fmt(r.grossOrd)}</td></tr>
${r.stcg>0?`<tr><td>STCG u/s 111A (Equity)</td><td style="text-align:right">${fmt(r.stcg)}</td></tr>`:''}
${r.ltcg>0?`<tr><td>LTCG u/s 112A (Equity)</td><td style="text-align:right">${fmt(r.ltcg)}</td></tr>`:''}
<tr class="total-row"><td>Grand Total Income</td><td style="text-align:right">${fmt(r.gross)}</td></tr></table>

<h3>Regime Comparison</h3>
<div class="grid">
<div>
<h3 style="background:#1565c0">ğŸ†• New Regime${r.new.total<=r.old.total?'<span class="badge">BETTER</span>':''}</h3>
<table>
<tr><th>Particulars</th><th style="text-align:right">Amount</th></tr>
<tr><td>Gross Income</td><td style="text-align:right">${fmt(r.grossOrd)}</td></tr>
<tr class="rebate-row"><td>Standard Deduction</td><td style="text-align:right">âˆ’ ${fmt(r.new.stdDed)}</td></tr>
<tr><td>Taxable Income</td><td style="text-align:right">${fmt(r.new.taxable)}</td></tr>
<tr><td>Slab Tax (as per New Regime)</td><td style="text-align:right">${fmt(r.new.slabTax)}</td></tr>
${r.new.rebate>0?`<tr class="rebate-row"><td>Less: Rebate u/s 87A</td><td style="text-align:right">âˆ’ ${fmt(r.new.rebate)}</td></tr>`:''}
${r.new.mr12L>0?`<tr class="rebate-row"><td>Less: Marginal Relief (â‚¹12L boundary)</td><td style="text-align:right">âˆ’ ${fmt(r.new.mr12L)}</td></tr>`:''}
${r.stcg>0||r.ltcg>0?`<tr><td>Tax on Special Rate Income (STCG/LTCG)</td><td style="text-align:right">${fmt(r.stcg*0.20+Math.max(0,r.ltcg-125000)*0.125)}</td></tr>`:''}
${r.new.sc>0?`<tr class="sc-row"><td>Add: Surcharge @ ${(r.new.scRate*100).toFixed(0)}%</td><td style="text-align:right">${fmt(r.new.sc)}</td></tr>`:''}
${r.new.mrSurcharge>0?`<tr class="rebate-row"><td>Less: Marginal Relief (Surcharge)</td><td style="text-align:right">âˆ’ ${fmt(r.new.mrSurcharge)}</td></tr>`:''}
<tr><td>Health &amp; Education Cess @ 4%</td><td style="text-align:right">${fmt(r.new.cess)}</td></tr>
<tr class="total-row"><td>Total Tax Payable</td><td style="text-align:right">${fmt(r.new.total)}</td></tr>
<tr><td>Effective Tax Rate</td><td style="text-align:right">${r.new.eff.toFixed(2)}%</td></tr>
<tr><td>Monthly TDS Estimate</td><td style="text-align:right">${fmt(r.new.total/12)}/mo</td></tr>
</table>
</div>
<div>
<h3 style="background:#4a4a4a">ğŸ“ Old Regime${r.old.total<=r.new.total?'<span class="badge">BETTER</span>':''}</h3>
<table>
<tr><th>Particulars</th><th style="text-align:right">Amount</th></tr>
<tr><td>Gross Income</td><td style="text-align:right">${fmt(r.grossOrd)}</td></tr>
<tr class="rebate-row"><td>Total Deductions (incl. â‚¹50K std)</td><td style="text-align:right">âˆ’ ${fmt(r.old.totalDed)}</td></tr>
<tr><td>Taxable Income</td><td style="text-align:right">${fmt(r.old.taxable)}</td></tr>
<tr><td>Slab Tax (as per Old Regime)</td><td style="text-align:right">${fmt(r.old.slabTax)}</td></tr>
${r.old.rebate>0?`<tr class="rebate-row"><td>Less: Rebate u/s 87A</td><td style="text-align:right">âˆ’ ${fmt(r.old.rebate)}</td></tr>`:''}
${r.stcg>0||r.ltcg>0?`<tr><td>Tax on Special Rate Income (STCG/LTCG)</td><td style="text-align:right">${fmt(r.stcg*0.20+Math.max(0,r.ltcg-125000)*0.125)}</td></tr>`:''}
${r.old.sc>0?`<tr class="sc-row"><td>Add: Surcharge @ ${(r.old.scRate*100).toFixed(0)}%</td><td style="text-align:right">${fmt(r.old.sc)}</td></tr>`:''}
${r.old.mrSurcharge>0?`<tr class="rebate-row"><td>Less: Marginal Relief (Surcharge)</td><td style="text-align:right">âˆ’ ${fmt(r.old.mrSurcharge)}</td></tr>`:''}
<tr><td>Health &amp; Education Cess @ 4%</td><td style="text-align:right">${fmt(r.old.cess)}</td></tr>
<tr class="total-row"><td>Total Tax Payable</td><td style="text-align:right">${fmt(r.old.total)}</td></tr>
<tr><td>Effective Tax Rate</td><td style="text-align:right">${r.old.eff.toFixed(2)}%</td></tr>
<tr><td>Monthly TDS Estimate</td><td style="text-align:right">${fmt(r.old.total/12)}/mo</td></tr>
</table>
</div></div>
<h3 style="background:#1b5e20">Recommended: ${r.new.total<=r.old.total?'New Regime':'Old Regime'} â€” Saving of ${fmt(Math.abs(r.old.total-r.new.total))}</h3>
`:`<h3>${r.entity==='company-d'?'Domestic Company (Sec 115BAA)':'Foreign Company'} Tax</h3>
<table>
<tr><th>Particulars</th><th style="text-align:right">Amount</th></tr>
<tr><td>Total Income</td><td style="text-align:right">${fmt(r.gross)}</td></tr>
<tr><td>Corporate Tax</td><td style="text-align:right">${fmt(r.baseT)}</td></tr>
<tr class="sc-row"><td>Surcharge</td><td style="text-align:right">${fmt(r.sc)}</td></tr>
<tr><td>Health &amp; Education Cess (4%)</td><td style="text-align:right">${fmt(r.cess)}</td></tr>
<tr class="total-row"><td>Total Tax Payable</td><td style="text-align:right">${fmt(r.total)}</td></tr>
<tr><td>Effective Rate</td><td style="text-align:right">${r.eff.toFixed(2)}%</td></tr>
</table>`}
<div class="disclosure"><b>DISCLAIMER:</b> This computation is generated from user-entered estimates and is for indicative purposes only. It does not constitute professional tax advice. Actual tax liability may vary based on specific facts, CBDT circulars, judicial pronouncements, and deductions not captured here. A Bagla Financial Services accepts no liability for any reliance placed on this computation. For accurate tax planning and filing, please consult our qualified team.</div>
<div class="footer">A Bagla Financial Services | CA Services for Individuals, HUFs &amp; Corporates | www.atulbagla.com<br>
ğŸ“ Contact us for ITR filing, tax planning, and compliance | This document is computer-generated</div>
<br><button onclick="window.print()" style="padding:8px 20px;background:#1a1a1a;color:#fff;border:none;cursor:pointer;font-size:13px;">ğŸ–¨ Print / Save as PDF</button>
</body></html>`;
  var w=window.open('','_blank');
  if(w){ w.document.write(compHTML); w.document.close(); }
  else{ alert('Please allow pop-ups to download the computation.'); }
}

/* â”€â”€ GST CALCULATOR â”€â”€ */
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

/* â”€â”€ SIP CALCULATOR â”€â”€ */
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
  const iPct=totalFV>0?(totalInu/totalFV*100):50, rPct=100-iPct;
  document.getElementById('sip-output').innerHTML=`
    <div class="itr-row"><span>Total Invested</span><strong>${fmt(totalInv)}</strong></div>
    <div class="itr-row"><span>Estimated Returns</span><strong style="color:#4caf50">${fmt(totalRet)}</strong></div>
    <div class="itr-row final"><span>Maturity Value</span><strong>${fmt(totalFV)}</strong></div>
    <div class="itr-row"><span>Absolute Return</span><strong>${absRet.toFixed(1)}%</strong></div>`;
  const bi=document.getElementById('sip-bar-i'), br=document.getElementById('sip-bar-r');
  if(bi) bi.style.width=iPct.toFixed(1)+'%';
  if(br) br.style.width=rPct.toFixed(1)+'%';
}

/* â”€â”€ EMI CALCULATOR â”€â”€ */
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

/* â”€â”€ HRA CALCULATOR â”€â”€ */
function calcHRA(){
  const basic=+document.getElementById('hra-basic').value||0;
  const recv =+document.getElementById('hra-recv').value||0;
  const rent =+document.getElementById('hra-rent').value||0;
  const city =document.getElementById('hra-city').value;
  const mRate=city==='metro'?0.5:0.4;
  const c1=recv, c2=Math.max(0,rent-basic*0.1), c3=basic*mRate;
  const exempt=Math.min(c1,c2,c3), taxable=Math.max(0,recv-exempt);
  document.getElementById('hra-output').innerHTML=`
    <div class="itr-row"><span>Condition 1 â€” Actual HRA Received</span><strong>${fmt(c1)}/mo</strong></div>
    <div class="itr-row"><span>Condition 2 â€” Rent âˆ’ 10% of Basic</span><strong>${fmt(c2)}/mo</strong></div>
    <div class="itr-row"><span>Condition 3 â€” ${mRate*100}% of Basic (${city==='metro'?'Metro':'Non-Metro'})</span><strong>${fmt(c3)}/mo</strong></div>
    <div class="itr-row final"><span>HRA Exempt (Least of above)</span><strong>${fmt(exempt)}/mo</strong></div>
    <div class="itr-row"><span>Taxable HRA / Month</span><strong style="color:#ff6b6b">${fmt(taxable)}/mo</strong></div>
    <div class="itr-row"><span>Annual HRA Exemption</span><strong style="color:#4caf50">${fmt(exempt*12)}</strong></div>`;
}

/* â”€â”€ NEWS â”€â”€ */
const newsData = {
  icai:[
    {title:'ICAI issues Guidance Note on Audit of Banks â€” 2024 Edition',date:'Mar 2024',url:'https://icai.org',tag:'Guidance'},
    {title:'ICAI revises CA Final Exam pattern effective Nov 2024 onwards',date:'Feb 2024',url:'https://icai.org',tag:'Exam'},
    {title:'New CPE requirement: 40 hours annually for all CA members',date:'Jan 2024',url:'https://icai.org',tag:'CPE'},
    {title:'ICAI releases Exposure Draft of revised SA 600 on Group Audits',date:'Mar 2024',url:'https://icai.org',tag:'Standard'},
    {title:'ICAI launches e-learning modules for Digital Taxation & AI',date:'Feb 2024',url:'https://icai.org',tag:'Learning'},
    {title:'ICAI clarifies applicability of Ind AS 116 for MSMEs',date:'Jan 2024',url:'https://icai.org',tag:'Clarification'},
  ],
  incometax:[
    {title:'New ITR forms released for AY 2024-25 â€” e-filing open',date:'Apr 2024',url:'https://incometax.gov.in',tag:'ITR'},
    {title:'Income Tax Dept notifies updated Form 26AS and AIS',date:'Mar 2024',url:'https://incometax.gov.in',tag:'AIS'},
    {title:'Section 87A rebate clarification for special rate income issued',date:'Jul 2024',url:'https://incometax.gov.in',tag:'Rebate'},
    {title:'TDS on Rent: Sec 194-IB threshold remains â‚¹50,000/month',date:'Apr 2024',url:'https://incometax.gov.in',tag:'TDS'},
    {title:'Faceless appeal scheme extended to all income tax assessments',date:'Feb 2024',url:'https://incometax.gov.in',tag:'Appeal'},
    {title:'Updated return (ITR-U) window: 2 years from the relevant AY',date:'Jan 2024',url:'https://incometax.gov.in',tag:'Deadline'},
  ],
  gst:[
    {title:'GST Council reduces rate on cancer drugs and medical devices',date:'Jun 2024',url:'https://gst.gov.in',tag:'Rate Change'},
    {title:'E-invoice threshold lowered to â‚¹1 Cr â€” mandatory from Oct 2023',date:'Oct 2023',url:'https://gst.gov.in',tag:'E-Invoice'},
    {title:'GSTR-1A notified â€” new return for amending GSTR-1 data',date:'Jul 2024',url:'https://gst.gov.in',tag:'New Return'},
    {title:'GST on online gaming platforms: 28% on full face value upheld',date:'Aug 2024',url:'https://gst.gov.in',tag:'Gaming'},
    {title:'ISD mechanism revamped â€” mandatory compliance from Apr 2025',date:'Sep 2024',url:'https://gst.gov.in',tag:'ISD'},
    {title:'GSTR-9 and GSTR-9C due date extended to 31 December 2024',date:'Dec 2024',url:'https://gst.gov.in',tag:'Deadline'},
  ],
  mca:[
    {title:'MCA21 V3 portal â€” new forms and filing system fully live',date:'Mar 2024',url:'https://mca.gov.in',tag:'Portal'},
    {title:'Companies (CSR Policy) Amendment Rules 2024 notified',date:'Feb 2024',url:'https://mca.gov.in',tag:'CSR'},
    {title:'MSME Udyam Registration â€” new guidelines and portal update',date:'Jan 2024',url:'https://mca.gov.in',tag:'MSME'},
    {title:'IBC amendment: Pre-packaged insolvency for MSMEs updated',date:'Mar 2024',url:'https://mca.gov.in',tag:'IBC'},
    {title:'Director KYC (DIR-3 KYC) annual deadline: 30 September',date:'Sep 2023',url:'https://mca.gov.in',tag:'KYC'},
    {title:'Annual Compliance: MGT-7A for OPCs and small companies',date:'Nov 2023',url:'https://mca.gov.in',tag:'Compliance'},
  ],
  mf:[
    {title:'SEBI introduces new asset class between Mutual Funds & PMS',date:'Aug 2024',url:'https://amfiindia.com',tag:'SEBI'},
    {title:'AMFI data: Monthly SIP inflows cross â‚¹20,000 Cr milestone',date:'Jun 2024',url:'https://amfiindia.com',tag:'SIP'},
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
      <span class="news-date">${n.date} Â· Official Source â†—</span>
    </a>`).join('');
}

/* â”€â”€ PLAYGROUND TABS â”€â”€ */
function showGame(id, btn){
  document.querySelectorAll('.pgpanel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.pgtab').forEach(b=>b.classList.remove('active'));
  const panel=document.getElementById('pg-'+id);
  if(panel) panel.classList.add('active');
  if(btn) btn.classList.add('active');
  if(id==='matrix') startMatrix();
  if(id==='quiz') loadQuiz('gst', document.querySelector('.qtab'));
}

/* â”€â”€ GRAVITY BALL GAME â”€â”€ */
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
    ctx.fillText('ğŸ–± Click anywhere to drop a ball â€” max 30',10,18);
    if(balls.length===0){
      ctx.fillStyle='rgba(226,255,0,0.55)'; ctx.font='bold 19px Orbitron'; ctx.textAlign='center';
      ctx.fillText('Click on the canvas to drop balls!',W/2,H/2); ctx.textAlign='left';
    }
    gravityRAF=requestAnimationFrame(loop);
  }
  ctx.fillStyle='#0a0a0a'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(226,255,0,0.5)'; ctx.font='bold 19px Orbitron'; ctx.textAlign='center';
  ctx.fillText('Click â–¶ Start / Restart, then click to drop!',W/2,H/2); ctx.textAlign='left';
  loop();
}

/* â”€â”€ SPEED TEST â”€â”€ */
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

/* â”€â”€ MATRIX RAIN â”€â”€ */
let matrixRAF=null, matrixRunning=false;
const matrixColors=['#00ff41','#e2ff00','#00d4ff','#ff00ff','#ffd700'];
let matrixColorIdx=0, matrixColor='#00ff41';
function startMatrix(){
  const canvas=document.getElementById('matrix-canvas'); if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  const cols=Math.floor(W/16), drops=Array(cols).fill(1);
  const chars='ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ãã‚¯ã‚±ã‚³0123456789GSTITEMRTFâ‚¹SIP@#%&';
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

/* â”€â”€ FINANCE QUIZ â”€â”€ */
const quizData={
  gst:[
    {q:'What does GST stand for?',opts:['General Sales Tax','Goods and Services Tax','Government Service Tax','Global Supply Tax'],ans:1},
    {q:'GST was implemented in India on:',opts:['1 April 2017','1 July 2017','1 January 2018','15 August 2017'],ans:1},
    {q:'Which return covers outward supplies filed monthly by regular taxpayers?',opts:['GSTR-3B','GSTR-1','GSTR-9','GSTR-4'],ans:1},
    {q:'CGST is collected by:',opts:['State Government','Central Government','Both equally','Local Panchayat'],ans:1},
    {q:'Standard GST rate on most professional services in India:',opts:['5%','12%','18%','28%'],ans:2},
    {q:'GST council is chaired by:',opts:['RBI Governor','Prime Minister','Union Finance Minister','SEBI Chairman'],ans:2},
    {q:'E-way bill is required for inter-state goods movement above:',opts:['â‚¹10,000','â‚¹25,000','â‚¹50,000','â‚¹1,00,000'],ans:2},
    {q:'GSTIN is a unique number of how many digits?',opts:['10','12','15','18'],ans:2},
  ],
  income:[
    {q:'Standard deduction for salaried (New Regime, FY 2025-26):',opts:['â‚¹40,000','â‚¹50,000','â‚¹75,000','â‚¹1,00,000'],ans:2},
    {q:'Section 80C maximum deduction limit:',opts:['â‚¹1,00,000','â‚¹1,25,000','â‚¹1,50,000','â‚¹2,00,000'],ans:2},
    {q:'Income Tax in India is administered by:',opts:['RBI','SEBI','CBDT','Finance Ministry'],ans:2},
    {q:'Rebate u/s 87A (New Regime FY 2025-26) â€” zero tax up to income of:',opts:['â‚¹7,00,000','â‚¹10,00,000','â‚¹12,00,000','â‚¹15,00,000'],ans:2},
    {q:'Form 26AS is related to:',opts:['GST filing','Tax Credit Statement','Bank statement','Company registration'],ans:1},
    {q:'LTCG on equity shares above â‚¹1.25L taxed at (Budget 2024):',opts:['10%','12.5%','15%','20%'],ans:1},
    {q:'STCG on listed equity shares taxed at (Budget 2024):',opts:['10%','15%','20%','Slab Rate'],ans:2},
    {q:'Maximum surcharge rate under New Regime is:',opts:['15%','25%','30%','37%'],ans:1},
  ],
  mf:[
    {q:'SIP stands for:',opts:['Simple Investment Plan','Systematic Investment Plan','Structured Income Plan','Savings Interest Plan'],ans:1},
    {q:'NAV stands for:',opts:['Net Annual Value','Net Asset Value','Normal Asset Value','New Account Value'],ans:1},
    {q:'ELSS funds have a mandatory lock-in period of:',opts:['1 year','2 years','3 years','5 years'],ans:2},
    {q:'AMFI stands for:',opts:['Association of Mutual Funds of India','Asset Management Finance Institution','Annual MF Index','None of these'],ans:0},
    {q:'LTCG on equity mutual funds above â‚¹1.25L taxed at (Budget 2024):',opts:['0%','10%','12.5%','15%'],ans:2},
    {q:'Which body regulates Mutual Funds in India?',opts:['RBI','SEBI','AMFI','IRDAI'],ans:1},
    {q:'Exit load is charged when:',opts:['You invest in a fund','You redeem before the exit load period','NAV rises','Fund declares dividend'],ans:1},
    {q:'Debt mutual funds held beyond 3 years (pre-Apr 2023) were taxed at:',opts:['10% flat','20% with indexation','Slab rate','Exempt'],ans:1},
  ],
  tds:[
    {q:'TDS on salary income is governed by:',opts:['Section 194J','Section 192','Section 194C','Section 195'],ans:1},
    {q:'TDS threshold for bank interest (Section 194A) for non-senior citizens:',opts:['â‚¹5,000','â‚¹10,000','â‚¹40,000','â‚¹50,000'],ans:2},
    {q:'Quarterly TDS return for non-salary payments is filed in:',opts:['Form 24Q','Form 26Q','Form 27EQ','Form 27Q'],ans:1},
    {q:'Form 16 is issued by the employer for:',opts:['GST compliance','TDS on salary','Investment proof','PF details'],ans:1},
    {q:'TDS rate on professional fees under Section 194J:',opts:['1%','2%','5%','10%'],ans:3},
    {q:'TDS on rent of plant & machinery (Section 194I) is:',opts:['2%','5%','10%','15%'],ans:0},
    {q:'Lower TDS deduction certificate is obtained under:',opts:['Section 195','Section 197','Section 194C','Section 206C'],ans:1},
    {q:'Form 15G / 15H is submitted to:',opts:['IT Department','Employer','Bank/Payer (for NIL TDS)','TRACES'],ans:2},
  ],
  accounting:[
    {q:'Which principle requires expenses to be matched against revenue?',opts:['Cost Principle','Matching Principle','Consistency Principle','Materiality Principle'],ans:1},
    {q:'A debit balance in a personal account indicates:',opts:['Amount receivable (asset)','Liability','Income','Expense'],ans:0},
    {q:'P&L stands for:',opts:['Profit & Loss','Purchase & Ledger','Payment & Liability','Price & Labour'],ans:0},
    {q:'Depreciation is typically charged on:',opts:['Current assets','Fixed assets','Investments','Cash balance'],ans:1},
    {q:'Working capital is calculated as:',opts:['Fixed assets âˆ’ Current liabilities','Current assets âˆ’ Current liabilities','Total assets âˆ’ Total liabilities','Equity âˆ’ Reserves'],ans:1},
    {q:'The accounting equation is:',opts:['Assets = Liabilities + Equity','Assets = Revenue âˆ’ Expenses','Equity = Assets + Liabilities','Revenue = Assets âˆ’ Liabilities'],ans:0},
    {q:'Cash Flow from Operations does NOT include:',opts:['Net profit','Depreciation','Sale of fixed assets','Working capital changes'],ans:2},
    {q:'Which financial statement shows financial position at a point in time?',opts:['P&L Statement','Cash Flow Statement','Balance Sheet','Trial Balance'],ans:2},
  ],
  current:[
    {q:'Union Budget 2025-26: No income tax payable up to income of:',opts:['â‚¹7,00,000','â‚¹10,00,000','â‚¹12,00,000','â‚¹15,00,000'],ans:2},
    {q:'RBI repo rate as of early 2025 (after Feb 2025 cut):',opts:['5.90%','6.25%','6.50%','6.75%'],ans:1},
    {q:'Budget 2025-26 raised LTCG exemption on equity to:',opts:['â‚¹1,00,000','â‚¹1,25,000','â‚¹1,50,000','â‚¹2,00,000'],ans:1},
    {q:'New regime standard deduction increased in Budget 2024 to:',opts:['â‚¹50,000','â‚¹60,000','â‚¹75,000','â‚¹1,00,000'],ans:2},
    {q:'Section 87A rebate (New Regime FY 2025-26) max rebate amount is:',opts:['â‚¹12,500','â‚¹25,000','â‚¹60,000','No cap â€” full rebate'],ans:3},
    {q:'GST on health insurance premium (proposed, 2025):',opts:['Exempt (0%)','5%','12%','18%'],ans:0},
    {q:'STCG on equity shares â€” revised rate from Budget 2024:',opts:['10%','15%','20%','25%'],ans:2},
    {q:'TDS on e-commerce operators (Section 194-O) rate:',opts:['0.1%','0.5%','1%','2%'],ans:2},
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
        <div style="font-size:3rem;margin-bottom:8px">ğŸ‰</div>
        <h3 style="color:var(--neon,#e2ff00);margin:0 0 8px">Quiz Complete!</h3>
        <p style="font-size:1.25rem;margin:0 0 6px">Score: <strong>${quizScore} / ${qs.length}</strong></p>
        <p style="color:rgba(255,255,255,0.6);margin:0 0 20px;font-size:.9rem">${quizScore===qs.length?'ğŸ† Perfect! You\'re a finance expert!':quizScore>=3?'ğŸ‘ Great job! Keep learning!':'ğŸ“š Keep practicing â€” consult A Bagla for expert guidance!'}</p>
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

/* â”€â”€ LIVE MARKET PRICES â”€â”€ */
function refreshLivePrices(){
  var btn=document.getElementById('live-refresh-btn');
  if(btn){btn.textContent='â³ Fetching...';btn.disabled=true;}
  var proxies=['https://api.allorigins.win/get?url=','https://corsproxy.io/?'];
  function tryFetch(url,cb){
    var tried=0;
    function attempt(i){
      if(i>=proxies.length){cb(null);return;}
      fetch(proxies[i]+encodeURIComponent(url))
        .then(function(r){return r.json();})
        .then(function(d){
          var raw=d.contents||d;
          var parsed=typeof raw==='string'?JSON.parse(raw):raw;
          cb(parsed);
        })
        .catch(function(){attempt(i+1);});
    }
    attempt(0);
  }
  function setEl(id,html){var e=document.getElementById(id);if(e)e.innerHTML=html;}
  function priceBadge(price,prev,decimals){
    if(!price) return '<span style="color:#aaa">N/A</span>';
    var ch=price-prev,pct=(ch/prev*100);
    var col=ch>=0?'#6BCB77':'#ff6b6b',sg=ch>=0?'+':'';
    return price.toLocaleString('en-IN',{maximumFractionDigits:decimals||0})+' <span style="color:'+col+';font-size:.8em">'+sg+pct.toFixed(2)+'%</span>';
  }
  // Sensex
  tryFetch('https://query1.finance.yahoo.com/v8/finance/chart/%5EBSESN?interval=1m&range=1d',function(d){
    try{var m=d.chart.result[0].meta;setEl('live-sensex',priceBadge(m.regularMarketPrice,m.chartPreviousClose));}catch(e){setEl('live-sensex','<span style="color:#aaa">â€”</span>');}
  });
  // Nifty
  tryFetch('https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?interval=1m&range=1d',function(d){
    try{var m=d.chart.result[0].meta;setEl('live-nifty',priceBadge(m.regularMarketPrice,m.chartPreviousClose));}catch(e){setEl('live-nifty','<span style="color:#aaa">â€”</span>');}
  });
  // Gold
  tryFetch('https://query1.finance.yahoo.com/v8/finance/chart/GC%3DF?interval=1m&range=1d',function(d){
    try{var m=d.chart.result[0].meta;setEl('live-gold',priceBadge(m.regularMarketPrice,m.chartPreviousClose,1))' $/oz');}catch(e){setEl('live-gold','<span style="color:#aaa">â€”</span>');}
  });
  // USD/INR (direct API - no proxy needed)
  fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(function(r){return r.json();})
    .then(function(d){setEl('live-usd','â‚¹'+d.rates.INR.toFixed(2)+' / $1');})
    .catch(function(){setEl('live-usd','<span style="color:#aaa">â€”</span>');});
  setTimeout(function(){if(btn){btn.textContent='ğŸ”„ Refresh Prices';btn.disabled=false;}},8000);
}

/* â”€â”€ CONTACT FORM â”€â”€ */
function handleSubmit(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Sending...'; btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('form-success').style.display='block';
    btn.textContent='Send Message â†’'; btn.disabled=false;
    e.target.reset();
    setTimeout(()=>{ document.getElementById('form-success').style.display='none'; },5000);
  },1000);
}

/* â”€â”€ INIT â”€â”€ */
window.addEventListener('DOMContentLoaded',function(){
  calcIT(); calcGST(); calcSIP(); calcEMI(); calcHRA();
  renderNews('icai');
  loadQuiz('gst', document.querySelector('.qtab'));
});
