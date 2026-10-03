const STORAGE_KEY = "berber_randevu_v1";

const DEFAULT_DATA = {
  services: [
    {id:"s1", name:"Saç Kesimi", duration:30, price:400},
    {id:"s2", name:"Sakal", duration:20, price:250},
    {id:"s3", name:"Saç + Sakal", duration:50, price:700},
    {id:"s4", name:"Çocuk Kesimi", duration:30, price:350}
  ],
  barbers: [
    {id:"b1", name:"Yılmaz Usta"},
    {id:"b2", name:"Ahmet Usta"}
  ],
  appointments: []
};

function loadData(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if(!saved){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return structuredClone(DEFAULT_DATA);
  }
  try { return JSON.parse(saved); }
  catch { return structuredClone(DEFAULT_DATA); }
}

function saveData(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function money(v){ return new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:0}).format(v); }
function formatDate(iso){
  return new Date(iso+"T12:00:00").toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"});
}
function todayISO(){ return new Date().toISOString().slice(0,10); }
function uid(prefix="id"){ return prefix+"_"+Date.now()+"_"+Math.random().toString(36).slice(2,8); }

window.BerberApp = {loadData,saveData,money,formatDate,todayISO,uid,STORAGE_KEY};