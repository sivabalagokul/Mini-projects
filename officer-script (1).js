/* ==========================================================
   HLMS Loan Officer Console — data + interactions
   ========================================================== */

/* ---------- Seed data ---------- */
let applications = [
  { id:'APP-1091', name:'Rahul Mehta',  type:'Home Loan',     amount:2800000, submitted:'25 Jun 2026', score:742, status:'Pending' },
  { id:'APP-1092', name:'Sneha Iyer',   type:'Personal Loan', amount:1250000, submitted:'27 Jun 2026', score:701, status:'Pending' },
  { id:'APP-1093', name:'Arjun Nair',   type:'Home Loan',     amount:4500000, submitted:'28 Jun 2026', score:812, status:'Pending' },
  { id:'APP-1094', name:'Kavita Rao',   type:'Vehicle Loan',  amount:800000,  submitted:'29 Jun 2026', score:664, status:'Pending' },
  { id:'APP-1095', name:'Manoj Verma',  type:'Home Loan',     amount:6000000, submitted:'30 Jun 2026', score:788, status:'Pending' },
];

let portfolio = [
  { acct:'HL1234567890', name:'John Doe',      type:'Home Loan',     outstanding:4008000, nextDue:'05 Jul 2026', status:'Active'  },
  { acct:'HL2345678901', name:'Meera Kapoor',  type:'Home Loan',     outstanding:1875000, nextDue:'08 Jul 2026', status:'Active'  },
  { acct:'HL3456789012', name:'Sanjay Gupta',  type:'Personal Loan', outstanding:420000,  nextDue:'15 Jun 2026', status:'Overdue' },
  { acct:'HL4567890123', name:'Anita Desai',   type:'Vehicle Loan',  outstanding:265000,  nextDue:'10 Jul 2026', status:'Active'  },
  { acct:'HL5678901234', name:'Rohan Bhat',    type:'Home Loan',     outstanding:3120000, nextDue:'02 Jun 2026', status:'Overdue' },
  { acct:'HL6789012345', name:'Divya Menon',   type:'Home Loan',     outstanding:2650000, nextDue:'20 Jul 2026', status:'Active'  },
  { acct:'HL7890123456', name:'Karan Malhotra',type:'Personal Loan', outstanding:180000,  nextDue:'22 May 2026', status:'Overdue' },
];

let disbursements = [
  { name:'Arjun Nair',  amount:4500000, legal:'Completed',  valuation:'Completed',  ready:true  },
  { name:'Manoj Verma', amount:6000000, legal:'Completed',  valuation:'In Progress',ready:false },
  { name:'Sneha Iyer',  amount:1250000, legal:'In Progress',valuation:'Completed',  ready:false },
];

let overdue = [
  { acct:'HL3456789012', name:'Sanjay Gupta',   due:42000,  days:16, risk:'medium', lastContact:'26 Jun 2026' },
  { acct:'HL5678901234', name:'Rohan Bhat',     due:31742,  days:29, risk:'high',   lastContact:'20 Jun 2026' },
  { acct:'HL7890123456', name:'Karan Malhotra', due:18500,  days:40, risk:'high',   lastContact:'10 Jun 2026' },
];

let documents = [
  { name:'Rahul Mehta', doc:'Income Proof (Form 16)', uploaded:'24 Jun 2026', status:'Pending Review' },
  { name:'Sneha Iyer',  doc:'Aadhaar / KYC',           uploaded:'26 Jun 2026', status:'Verified' },
  { name:'Arjun Nair',  doc:'Property Sale Deed',      uploaded:'27 Jun 2026', status:'Pending Review' },
  { name:'Kavita Rao',  doc:'Vehicle Invoice',         uploaded:'28 Jun 2026', status:'Pending Review' },
];

/* ---------- Helpers ---------- */
function fmtINR(n){ return '₹' + Math.round(n).toLocaleString('en-IN'); }

function toast(message){
  const t = document.getElementById('toast');
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(()=> t.classList.remove('show'), 2600);
}

function riskBadgeClass(r){ return 'risk-' + r; }

/* ---------- Renderers ---------- */
function renderApplications(filter='all'){
  const body = document.getElementById('applicationsBody');
  body.innerHTML = '';
  const rows = applications.filter(a => filter==='all' ? true : a.status===filter);
  rows.forEach(app=>{
    const tr = document.createElement('tr');
    const disabled = app.status !== 'Pending';
    tr.innerHTML = `
      <td><div class="cell-name">${app.name}</div><div class="cell-sub">${app.id}</div></td>
      <td>${app.type}</td>
      <td class="mono">${fmtINR(app.amount)}</td>
      <td>${app.submitted}</td>
      <td>${app.score}</td>
      <td><span class="badge ${app.status.toLowerCase()}">${app.status}</span></td>
      <td>
        <div class="btn-row">
          <button class="btn approve" ${disabled?'disabled':''} data-action="approve" data-id="${app.id}">Approve</button>
          <button class="btn reject" ${disabled?'disabled':''} data-action="reject" data-id="${app.id}">Reject</button>
          <button class="btn ghost" data-action="view" data-id="${app.id}">View</button>
        </div>
      </td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll('button[data-action]').forEach(btn=>{
    btn.addEventListener('click', onAppAction);
  });
  document.getElementById('statPending').textContent = applications.filter(a=>a.status==='Pending').length;
  document.getElementById('navPendingBadge').textContent = applications.filter(a=>a.status==='Pending').length;
}

function renderPortfolio(searchTerm=''){
  const body = document.getElementById('portfolioBody');
  body.innerHTML = '';
  const term = searchTerm.trim().toLowerCase();
  const rows = portfolio.filter(p =>
    !term || p.name.toLowerCase().includes(term) || p.acct.toLowerCase().includes(term)
  );
  rows.forEach(p=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="mono">${p.acct}</td>
      <td>${p.name}</td>
      <td>${p.type}</td>
      <td class="mono">${fmtINR(p.outstanding)}</td>
      <td>${p.nextDue}</td>
      <td><span class="badge ${p.status.toLowerCase()}">${p.status}</span></td>
      <td><button class="btn ghost" data-acct="${p.acct}">View</button></td>`;
    body.appendChild(tr);
  });
  document.getElementById('portfolioCount').textContent = `${rows.length} of ${portfolio.length} accounts`;
  document.getElementById('statActive').textContent = portfolio.filter(p=>p.status==='Active').length + 121; // + rest of book
  document.getElementById('statOverdue').textContent = portfolio.filter(p=>p.status==='Overdue').length;

  body.querySelectorAll('button[data-acct]').forEach(btn=>{
    btn.addEventListener('click', ()=> toast(`Opening account ${btn.getAttribute('data-acct')}...`));
  });
}

function renderDisbursements(){
  const body = document.getElementById('disbursementBody');
  body.innerHTML = '';
  disbursements.forEach((d,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="cell-name">${d.name}</td>
      <td class="mono">${fmtINR(d.amount)}</td>
      <td><span class="badge ${d.legal==='Completed'?'verified':'review'}">${d.legal}</span></td>
      <td><span class="badge ${d.valuation==='Completed'?'verified':'review'}">${d.valuation}</span></td>
      <td><span class="badge ${d.ready?'ready':'notready'}">${d.ready?'Ready':'Not Ready'}</span></td>
      <td><button class="btn primary" ${d.ready?'':'disabled'} data-idx="${i}">Disburse</button></td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll('button[data-idx]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = btn.getAttribute('data-idx');
      toast(`Disbursement initiated for ${disbursements[idx].name}`);
      disbursements.splice(idx,1);
      renderDisbursements();
    });
  });
}

function renderOverdue(){
  const body = document.getElementById('overdueBody');
  body.innerHTML = '';
  const sorted = [...overdue].sort((a,b)=> b.days - a.days);
  sorted.forEach(o=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="mono">${o.acct}</td>
      <td>${o.name}</td>
      <td class="mono">${fmtINR(o.due)}</td>
      <td>${o.days} days</td>
      <td><span class="badge ${riskBadgeClass(o.risk)}">${o.risk.charAt(0).toUpperCase()+o.risk.slice(1)}</span></td>
      <td>${o.lastContact}</td>
      <td>
        <div class="btn-row">
          <button class="btn ghost" data-acct="${o.acct}" data-act="call">Call</button>
          <button class="btn ghost" data-acct="${o.acct}" data-act="notice">Send Notice</button>
        </div>
      </td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll('button[data-act]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const act = btn.getAttribute('data-act');
      const acct = btn.getAttribute('data-acct');
      toast(act==='call' ? `Logging call attempt for ${acct}` : `Payment notice sent for ${acct}`);
    });
  });
}

function renderDocuments(){
  const body = document.getElementById('documentsBody');
  body.innerHTML = '';
  documents.forEach((d,i)=>{
    const tr = document.createElement('tr');
    const pending = d.status === 'Pending Review';
    tr.innerHTML = `
      <td>${d.name}</td>
      <td>${d.doc}</td>
      <td>${d.uploaded}</td>
      <td><span class="badge ${pending?'review':'verified'}">${d.status}</span></td>
      <td>
        <div class="btn-row">
          <button class="btn approve" ${pending?'':'disabled'} data-idx="${i}" data-act="verify">Verify</button>
          <button class="btn reject" ${pending?'':'disabled'} data-idx="${i}" data-act="flag">Flag</button>
        </div>
      </td>`;
    body.appendChild(tr);
  });
  body.querySelectorAll('button[data-act]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = btn.getAttribute('data-idx');
      const act = btn.getAttribute('data-act');
      documents[idx].status = act === 'verify' ? 'Verified' : 'Flagged';
      toast(`Document ${act === 'verify' ? 'verified' : 'flagged'} for ${documents[idx].name}`);
      renderDocuments();
    });
  });
}

/* ---------- Application approve/reject ---------- */
function onAppAction(e){
  const btn = e.currentTarget;
  const id = btn.getAttribute('data-id');
  const action = btn.getAttribute('data-action');
  const app = applications.find(a=>a.id===id);
  if(!app) return;

  if(action === 'view'){
    toast(`Viewing full application for ${app.name}`);
    return;
  }
  if(action === 'approve'){
    app.status = 'Approved';
    toast(`Application ${id} approved — moved to Disbursement Queue`);
    disbursements.push({ name:app.name, amount:app.amount, legal:'In Progress', valuation:'In Progress', ready:false });
    renderDisbursements();
  } else if(action === 'reject'){
    app.status = 'Rejected';
    toast(`Application ${id} rejected`);
  }
  renderApplications(document.getElementById('appFilter').value);
}

/* ---------- Filters / search ---------- */
document.getElementById('appFilter').addEventListener('change', function(){
  renderApplications(this.value);
});

document.getElementById('globalSearch').addEventListener('input', function(){
  renderPortfolio(this.value);
});

/* ---------- Sidebar navigation ---------- */
document.querySelectorAll('.nav-item[data-target]').forEach(item=>{
  item.addEventListener('click', function(){
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    this.classList.add('active');
    const target = document.getElementById(this.getAttribute('data-target'));
    if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

/* ---------- Report generation (placeholder action) ---------- */
document.getElementById('genReportBtn').addEventListener('click', function(){
  toast('Monthly portfolio report generated — check Reports tab');
});

/* ---------- Init ---------- */
renderApplications();
renderPortfolio();
renderDisbursements();
renderOverdue();
renderDocuments();
