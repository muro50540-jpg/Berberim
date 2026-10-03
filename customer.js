const data = BerberApp.loadData();
let selected = {service:null, barber:null, date:null, time:null};

const serviceList = document.querySelector("#serviceList");
const barberList = document.querySelector("#barberList");
const dateList = document.querySelector("#dateList");
const timeList = document.querySelector("#timeList");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryDetails = document.querySelector("#summaryDetails");
const bookBtn = document.querySelector("#bookBtn");

function renderServices(){
  serviceList.innerHTML = data.services.map(s => `
    <button class="choice ${selected.service===s.id?"selected":""}" data-id="${s.id}">
      <strong>${s.name}</strong><span>${s.duration} dk • ${BerberApp.money(s.price)}</span>
    </button>`).join("");
  serviceList.querySelectorAll(".choice").forEach(b => b.onclick=()=>{
    selected.service=b.dataset.id; selected.time=null; renderAll();
  });
}

function renderBarbers(){
  barberList.innerHTML = data.barbers.map(b => `
    <button class="choice ${selected.barber===b.id?"selected":""}" data-id="${b.id}">
      <strong>${b.name}</strong><span>Uygun randevu için seç</span>
    </button>`).join("");
  barberList.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{
    selected.barber=b.dataset.id; selected.time=null; renderAll();
  });
}

function nextDates(){
  const out=[];
  const d=new Date();
  for(let i=0;i<14;i++){
    const x=new Date(d); x.setDate(d.getDate()+i);
    out.push(x.toISOString().slice(0,10));
  }
  return out;
}

function renderDates(){
  dateList.innerHTML=nextDates().map(iso=>{
    const d=new Date(iso+"T12:00:00");
    const day=d.toLocaleDateString("tr-TR",{weekday:"short"}).replace(".","");
    const num=d.getDate();
    return `<button class="date-choice ${selected.date===iso?"selected":""}" data-id="${iso}">
      <span>${day}</span><b>${num}</b><small>${d.toLocaleDateString("tr-TR",{month:"short"})}</small>
    </button>`;
  }).join("");
  dateList.querySelectorAll(".date-choice").forEach(b=>b.onclick=()=>{
    selected.date=b.dataset.id; selected.time=null; renderAll();
  });
}

function renderTimes(){
  const times=[];
  for(let h=9;h<20;h++){
    for(const m of [0,30]){
      if(h===19 && m===30) continue;
      times.push(`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`);
    }
  }
  const busy=data.appointments.filter(a=>a.date===selected.date && a.barberId===selected.barber).map(a=>a.time);
  timeList.innerHTML=times.map(t=>{
    const full=busy.includes(t);
    return `<button class="time-choice ${selected.time===t?"selected":""} ${full?"full":""}" ${full?"disabled":""} data-id="${t}">
      ${t}${full?"<small style='display:block;margin-top:3px'>Dolu</small>":""}
    </button>`;
  }).join("");
  timeList.querySelectorAll(".time-choice:not(:disabled)").forEach(b=>b.onclick=()=>{
    selected.time=b.dataset.id; renderAll();
  });
}

function renderSummary(){
  const s=data.services.find(x=>x.id===selected.service);
  const b=data.barbers.find(x=>x.id===selected.barber);
  if(!s){ summaryTitle.textContent="Henüz seçim yapılmadı"; summaryDetails.innerHTML=""; bookBtn.disabled=true; return; }
  summaryTitle.textContent=s.name;
  const pills=[];
  if(b) pills.push(`<span class="summary-pill">✂ ${b.name}</span>`);
  if(selected.date) pills.push(`<span class="summary-pill">📅 ${BerberApp.formatDate(selected.date)}</span>`);
  if(selected.time) pills.push(`<span class="summary-pill">⏰ ${selected.time}</span>`);
  pills.push(`<span class="summary-pill">💳 ${BerberApp.money(s.price)}</span>`);
  summaryDetails.innerHTML=pills.join("");
  bookBtn.disabled=!(selected.service&&selected.barber&&selected.date&&selected.time&&
    document.querySelector("#customerName").value.trim()&&document.querySelector("#customerPhone").value.trim());
}

["customerName","customerPhone"].forEach(id=>document.querySelector("#"+id).addEventListener("input",renderSummary));

bookBtn.onclick=()=>{
  const name=document.querySelector("#customerName").value.trim();
  const phone=document.querySelector("#customerPhone").value.trim();
  const s=data.services.find(x=>x.id===selected.service);
  const b=data.barbers.find(x=>x.id===selected.barber);
  data.appointments.push({
    id:BerberApp.uid("apt"), serviceId:s.id, serviceName:s.name, price:s.price,
    barberId:b.id, barberName:b.name, date:selected.date, time:selected.time,
    customerName:name, customerPhone:phone, status:"Onaylandı", createdAt:new Date().toISOString()
  });
  BerberApp.saveData(data);
  document.querySelector("#confirmation").innerHTML=`
    <div class="summary-details">
      <span class="summary-pill">${s.name}</span>
      <span class="summary-pill">${b.name}</span>
      <span class="summary-pill">${BerberApp.formatDate(selected.date)}</span>
      <span class="summary-pill">${selected.time}</span>
      <span class="summary-pill">${BerberApp.money(s.price)}</span>
    </div>`;
  document.querySelector("#modal").classList.remove("hidden");
};

function closeModal(){document.querySelector("#modal").classList.add("hidden"); location.reload();}
document.querySelector("#closeModal").onclick=closeModal;
document.querySelector("#modalDone").onclick=closeModal;

function renderAll(){renderServices();renderBarbers();renderDates();renderTimes();renderSummary();}
renderAll();