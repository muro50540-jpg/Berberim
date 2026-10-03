const data = BerberApp.loadData();

function renderStats(){
  const today=BerberApp.todayISO();
  const todays=data.appointments.filter(a=>a.date===today && a.status!=="İptal");
  document.querySelector("#todayCount").textContent=todays.length;
  document.querySelector("#todayRevenue").textContent=BerberApp.money(todays.reduce((s,a)=>s+a.price,0));
  document.querySelector("#totalCount").textContent=data.appointments.length;
  document.querySelector("#serviceCount").textContent=data.services.length;
}

function renderAppointments(){
  const box=document.querySelector("#appointmentTable");
  if(!data.appointments.length){box.innerHTML='<div class="empty">Henüz randevu yok.</div>';return;}
  const sorted=[...data.appointments].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  box.innerHTML=`<table><thead><tr><th>Tarih</th><th>Saat</th><th>Müşteri</th><th>Hizmet</th><th>Berber</th><th>Tutar</th><th>Durum</th></tr></thead><tbody>
  ${sorted.map(a=>`<tr>
    <td>${BerberApp.formatDate(a.date)}</td><td>${a.time}</td><td>${a.customerName}<br><small>${a.customerPhone}</small></td>
    <td>${a.serviceName}</td><td>${a.barberName}</td><td>${BerberApp.money(a.price)}</td><td><span class="status">${a.status}</span></td>
  </tr>`).join("")}</tbody></table>`;
}

function renderServices(){
  document.querySelector("#adminServices").innerHTML=`<div class="admin-list">${
    data.services.map(s=>`<div class="admin-row"><div><strong>${s.name}</strong><div class="muted">${s.duration} dk</div></div><strong>${BerberApp.money(s.price)}</strong></div>`).join("")
  }</div>`;
}
function renderBarbers(){
  document.querySelector("#adminBarbers").innerHTML=`<div class="admin-list">${
    data.barbers.map(b=>`<div class="admin-row"><strong>${b.name}</strong><span class="status">Aktif</span></div>`).join("")
  }</div>`;
}
document.querySelector("#clearBtn").onclick=()=>{
  if(confirm("Tüm demo randevuları silinsin mi?")){
    data.appointments=[];
    BerberApp.saveData(data);
    location.reload();
  }
};
renderStats();renderAppointments();renderServices();renderBarbers();