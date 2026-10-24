/* Knowledge Library — GST (starter edition). Full book planned by June 2027. */
(function(){
const T=(h,r)=>`<div class="mx-wrap"><table class="mx"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
KLB.gst={id:'gst',title:'GST — starter edition',sub:'The core ideas of Goods & Services Tax in plain English. A complete GST book — registration, ITC, returns, refunds, e-invoicing, assessments and case studies — is in progress for June 2027.',
notice:'🚧 <b>Work in progress.</b> This is a starter edition with the core concepts only. The full GST book (place of supply, valuation, ITC rules, returns, refunds, e-invoice & e-way bill, assessments, appeals and sector guides) will be published by <b>June 2027</b>. For GST journal entries, see the <a href="#library/je/c/gst">Accounting Journals</a> book.',
disc:'Starter summary for learning. Rates and thresholds change by notification — check the CBIC / GST portal before acting.',
coverChart:'rates',
parts:[{id:'A',t:'GST core concepts',d:'The essentials — more chapters coming by June 2027.'}],
chapters:[
 {id:'core',p:'A',t:'GST in a nutshell',ic:'🛒',intro:'GST is a single tax on supply of goods and services, collected at every stage, with credit for tax paid at the previous stage — so only the value added is taxed.',glance:['Dual GST: Centre (CGST) and State (SGST/UTGST) on intra-state supplies; IGST on inter-state.','GST 2.0 (from 22 September 2025): mainly 5% and 18%, with 40% for luxury/sin goods.','Registration above ₹40 lakh (goods) / ₹20 lakh (services).','Input tax credit removes tax-on-tax.'],charts:['rates'],topics:['g-what','g-dual','g-rates','g-registration','g-itc']},
 {id:'compliance',p:'A',t:'Compliance basics',ic:'🗓️',intro:'Monthly or quarterly returns, the composition option for small businesses, reverse charge, and e-invoicing.',glance:['GSTR-1 (sales) and GSTR-3B (summary & payment) are the main returns.','Composition scheme: turnover up to ₹1.5 crore, low flat rate, no ITC.','Reverse charge: buyer pays tax on notified supplies.','E-invoice above ₹5 crore turnover; e-way bill above ₹50,000 consignment value.'],topics:['g-returns','g-composition','g-rcm','g-einvoice']}
],
topics:[
{id:'g-what',t:'What is GST?',ref:'Constitution (101st Amendment) · CGST Act 2017',a:'gst meaning goods and services tax value added destination based',
 one:'A <b>destination-based tax</b> on the supply of goods and services, levied at each stage with credit of tax paid earlier.',
 f:[['Replaced','Excise, service tax, VAT, CST, entry tax and many cesses (from 1 July 2017)'],['Taxable event','Supply — sale, transfer, barter, lease etc.'],['Outside GST','Alcohol for human consumption; petroleum crude, diesel, petrol, ATF and natural gas (for now)']],
 ex:'Manufacturer sells for ₹100 + 18% (₹18). Retailer sells for ₹150 + 18% (₹27) and pays only ₹9 after ₹18 credit. Total tax = ₹27 = 18% of final price.',rel:['g-dual','g-itc']},
{id:'g-dual',t:'CGST, SGST, UTGST and IGST',ref:'Dual GST',a:'cgst sgst utgst igst intra state inter state place of supply',
 one:'Within a state: <b>CGST + SGST</b> (half each). Between states or on imports: <b>IGST</b>. In union territories without a legislature: UTGST.',
 ex:'₹1,000 goods at 18% sold in Maharashtra → CGST ₹90 + SGST ₹90. Sold from Maharashtra to Gujarat → IGST ₹180.',rel:['g-what']},
{id:'g-rates',t:'GST rates after GST 2.0 (from 22 September 2025)',ref:'GST Council (56th meeting) · rate notifications',a:'gst rates 5% 18% 40% gst 2.0 rate rationalisation exempt',
 one:'Most goods and services now fall in two main slabs — <b>5%</b> (merit/essential) and <b>18%</b> (standard) — with <b>40%</b> for luxury and sin goods.',
 tbl:{t:'Broad structure',h:['Rate','Typical items'],r:[['Nil / exempt','Fresh food, healthcare & education services, many essentials'],['5%','Daily-use and essential goods and services'],['18%','Most goods and services (standard rate)'],['40%','Luxury and sin goods (e.g. tobacco products, high-end cars)'],['Special','Gold & jewellery 3%, rough diamonds 0.25%']]},
 w:['Rates are item-specific — always check the HSN/SAC rate notification.','From October 2026 the Council has decided rate changes will be made once a year, effective from the next financial year.'],rel:['g-dual']},
{id:'g-registration',t:'Who must register?',ref:'ss.22-24 CGST Act',a:'gst registration threshold 40 lakh 20 lakh 10 lakh compulsory registration',
 one:'Register when aggregate turnover crosses <b>₹40 lakh (goods)</b> or <b>₹20 lakh (services)</b>; lower limits in special category states.',
 f:[['Special category states','₹20 lakh (goods) / ₹10 lakh (services) in specified states'],['Compulsory','Inter-state suppliers of goods, RCM payers, e-commerce operators, casual and non-resident taxable persons, TDS/TCS deductors'],['GSTIN','15-character number based on PAN']],rel:['g-composition']},
{id:'g-itc',t:'Input tax credit (ITC) — the basics',ref:'ss.16-18 CGST Act',a:'input tax credit conditions gstr 2b blocked credit 17(5) 180 days',
 one:'GST paid on business purchases can be set off against GST payable on sales — if four conditions are met.',
 steps:['You have the tax invoice / debit note','The supplier has reported it (appears in your GSTR-2B)','You have received the goods or services','The tax has actually been paid to the government and you’ve filed your return'],sh:'Four conditions for ITC',
 w:['Blocked credits under s.17(5): most motor vehicles, food & beverages, club membership, construction of immovable property, goods lost or given free.','Pay suppliers within 180 days or reverse the credit.'],rel:['g-returns']},
{id:'g-returns',t:'Main GST returns',ref:'GSTR-1 · GSTR-3B · GSTR-9',a:'gstr 1 gstr 3b gstr 9 due dates qrmp',
 one:'<b>GSTR-1</b> reports outward supplies; <b>GSTR-3B</b> is the summary return with tax payment; <b>GSTR-9</b> is the annual return.',
 tbl:{t:'Returns',h:['Return','What','Due (monthly filers)'],r:[['GSTR-1','Invoice-wise sales','11th of next month'],['GSTR-3B','Summary + tax payment','20th of next month'],['GSTR-9','Annual return','31 December after year-end'],['QRMP scheme','Small taxpayers (≤ ₹5 crore) file quarterly, pay monthly','—']]},
 w:['Late fees and 18% interest apply on delays.'],rel:['g-itc']},
{id:'g-composition',t:'Composition scheme',ref:'s.10 CGST Act',a:'composition scheme 1.5 crore 1% 5% 6% small taxpayers',
 one:'Small taxpayers (turnover up to <b>₹1.5 crore</b>; ₹75 lakh in some states) pay tax at a low flat rate on turnover — but can’t claim ITC or collect GST from customers.',
 tbl:{t:'Rates',h:['Category','Rate on turnover'],r:[['Manufacturers & traders','1%'],['Restaurants (not serving alcohol)','5%'],['Service providers (up to ₹50 lakh)','6%']]},
 w:['Not available for inter-state supplies of goods or e-commerce sellers of goods (with limited exceptions).'],rel:['g-registration']},
{id:'g-rcm',t:'Reverse charge mechanism (RCM)',ref:'s.9(3)/(4) CGST Act',a:'reverse charge rcm gta advocate director',
 one:'For notified supplies, the <b>recipient</b> pays the GST instead of the supplier — e.g. advocate fees, goods transport agency (in some cases), director sitting fees, rent from unregistered persons in specified cases.',
 w:['RCM tax is paid in cash; the same amount is then usually claimed as ITC.'],rel:['g-itc']},
{id:'g-einvoice',t:'E-invoice and e-way bill',ref:'Rule 48(4) · Rule 138',a:'e invoice irn qr code 5 crore e way bill 50000',
 one:'Businesses with turnover above <b>₹5 crore</b> must generate e-invoices (IRN + QR code) for B2B sales; an <b>e-way bill</b> is needed to move goods worth more than ₹50,000.',rel:['g-returns']}
],
charts:{rates:{t:'GST at a glance',r:()=>fig('rates','GST at a glance',T(['Item','Rule'],[['Main rates (GST 2.0)','5% and 18%; 40% for luxury/sin goods'],['Registration','₹40 lakh goods / ₹20 lakh services (lower in special states)'],['Composition limit','₹1.5 crore'],['E-invoice','Turnover above ₹5 crore'],['E-way bill','Consignment above ₹50,000'],['Returns','GSTR-1 (11th), GSTR-3B (20th), GSTR-9 (31 Dec)']]),'Starter summary — the full GST book is coming by June 2027.')}},
gloss:[['GSTIN','15-character GST registration number.','g-registration'],['ITC','Input tax credit — GST on purchases set off against GST on sales.','g-itc'],['RCM','Reverse charge — recipient pays GST.','g-rcm'],['HSN / SAC','Codes classifying goods / services for rates.','g-rates'],['IRN','Invoice reference number from the e-invoice portal.','g-einvoice'],['GSTR-2B','Auto-drafted statement of ITC available.','g-itc']],
shorts:[
 {k:'GST',h:'One tax, every stage',b:'GST is charged at each stage, but credit of earlier tax means only the value added is taxed.',ex:'₹100 → ₹150: retailer pays GST only on the ₹50 added.',to:'g-what'},
 {k:'GST',h:'CGST + SGST or IGST',b:'Same state: CGST + SGST. Different states or imports: IGST.',to:'g-dual'},
 {k:'GST 2.0',h:'5% and 18% (plus 40%)',b:'From 22 September 2025 most items moved to 5% or 18%; 40% applies to luxury and sin goods.',to:'g-rates'},
 {k:'GST',h:'When to register',b:'Turnover above ₹40 lakh for goods or ₹20 lakh for services — lower in special category states.',to:'g-registration'},
 {k:'GST',h:'4 conditions for ITC',b:'Invoice, supplier has filed (GSTR-2B), goods received, tax paid and return filed.',to:'g-itc'},
 {k:'GST',h:'3B pays the tax',b:'GSTR-1 reports sales by the 11th; GSTR-3B pays the tax by the 20th.',to:'g-returns'},
 {k:'GST',h:'Composition = simple',b:'Up to ₹1.5 crore turnover: pay 1% (traders), 5% (restaurants) or 6% (services). No ITC.',to:'g-composition'},
 {k:'GST',h:'Coming by June 2027',b:'This is the starter edition. The full GST book with place of supply, valuation, refunds and case studies is on the way.',to:'g-what'}
]};
})();
