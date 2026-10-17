const base = {
  arrival_date_year: 2026, arrival_date_month: "July", arrival_date_week_number: 27,
  arrival_date_day_of_month: 1, stays_in_weekend_nights: 2, stays_in_week_nights: 3,
  adults: 2, children: 0, babies: 0, meal: "BB", country: "PRT",
  market_segment: "Online TA", distribution_channel: "TA/TO", is_repeated_guest: 0,
  previous_cancellations: 0, previous_bookings_not_canceled: 0, reserved_room_type: "A",
  deposit_type: "No Deposit", customer_type: "Transient", adr: 94,
  required_car_parking_spaces: 0, total_of_special_requests: 0, has_agent: 1,
  has_company: 0, hotel: "Resort Hotel", lead_time: 77, total_stay_nights: 5
};
// All guest identities and booking records below are fictional demonstration data.
const bookings = [
  {id:"BK-10482",name:"Olivia Bennett",email:"olivia.bennett@example.com",countryLabel:"United Kingdom",arrival:"2026-11-12",hotel:"City Hotel",nights:3, data:{hotel:"City Hotel",country:"GBR",lead_time:135,deposit_type:"No Deposit",market_segment:"Online TA",adr:128,total_of_special_requests:0,arrival_date_month:"November",arrival_date_week_number:46,arrival_date_day_of_month:12,stays_in_weekend_nights:1,stays_in_week_nights:2,total_stay_nights:3}},
  {id:"BK-10483",name:"Daniel Morgan",email:"daniel.morgan@example.com",countryLabel:"Portugal",arrival:"2026-11-18",hotel:"Resort Hotel",nights:7,data:{hotel:"Resort Hotel",country:"PRT",lead_time:77,adr:94,stays_in_weekend_nights:2,stays_in_week_nights:5,total_stay_nights:7,arrival_date_month:"November",arrival_date_week_number:47,arrival_date_day_of_month:18}},
  {id:"BK-10484",name:"Sophia Laurent",email:"sophia.laurent@example.com",countryLabel:"France",arrival:"2026-12-04",hotel:"City Hotel",nights:2,data:{hotel:"City Hotel",country:"FRA",lead_time:12,market_segment:"Direct",distribution_channel:"Direct",deposit_type:"No Deposit",adr:170,total_of_special_requests:3,required_car_parking_spaces:1,arrival_date_month:"December",arrival_date_week_number:49,arrival_date_day_of_month:4,stays_in_weekend_nights:0,stays_in_week_nights:2,total_stay_nights:2,has_agent:0}},
  {id:"BK-10485",name:"James Wilson",email:"james.wilson@example.com",countryLabel:"United Kingdom",arrival:"2026-12-10",hotel:"City Hotel",nights:5,data:{hotel:"City Hotel",country:"GBR",lead_time:210,previous_cancellations:2,adr:115,total_of_special_requests:0,deposit_type:"No Deposit",arrival_date_month:"December",arrival_date_week_number:50,arrival_date_day_of_month:10,stays_in_weekend_nights:2,stays_in_week_nights:3,total_stay_nights:5}},
  {id:"BK-10486",name:"Emma Roberts",email:"emma.roberts@example.com",countryLabel:"Germany",arrival:"2026-11-22",hotel:"Resort Hotel",nights:4,data:{hotel:"Resort Hotel",country:"DEU",lead_time:9,market_segment:"Direct",distribution_channel:"Direct",adr:180,is_repeated_guest:1,previous_bookings_not_canceled:4,required_car_parking_spaces:1,total_of_special_requests:2,arrival_date_month:"November",arrival_date_week_number:47,arrival_date_day_of_month:22,stays_in_weekend_nights:2,stays_in_week_nights:2,total_stay_nights:4,has_agent:0}},
  {id:"BK-10487",name:"Noah Chen",email:"noah.chen@example.com",countryLabel:"China",arrival:"2026-12-15",hotel:"City Hotel",nights:6,data:{hotel:"City Hotel",country:"CHN",lead_time:145,adr:105,arrival_date_month:"December",arrival_date_week_number:51,arrival_date_day_of_month:15,stays_in_weekend_nights:2,stays_in_week_nights:4,total_stay_nights:6}}
];
let chosen = 0;
let running = false;
const $ = (id) => document.getElementById(id);
const formatDate = d => new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const getRisk = p => p === null ? "pending" : p >= .70 ? "high" : p >= .36 ? "medium" : "low";
const getLabel = r => ({high:"High risk",medium:"Medium risk",low:"Low risk",pending:"Pending"})[r];
function render(){
  const search = $("search").value.trim().toLowerCase();
  const records = bookings.map((b,i)=>({...b,i})).filter(b => (b.name+" "+b.id).toLowerCase().includes(search));
  $("bookingRows").replaceChildren();
  for(const b of records){
    const risk = getRisk(b.probability ?? null);
    const tr = document.createElement("tr");
    if(b.i === chosen) tr.className="chosen";
    const guest = document.createElement("td");
    const strong=document.createElement("strong");strong.textContent=b.name;
    const sub=document.createElement("span");sub.className="sub";sub.textContent=b.email;
    guest.append(strong,sub);
    const vals=[b.id,b.hotel,formatDate(b.arrival),b.nights+" nights"];
    tr.appendChild(guest);
    for(const value of vals){const td=document.createElement("td");td.textContent=value;tr.appendChild(td);}
    const pct=document.createElement("td");pct.className="risk-score";pct.textContent=b.probability === undefined ? "—" : (b.probability*100).toFixed(1)+"%";tr.appendChild(pct);
    const status=document.createElement("td");const pill=document.createElement("span");pill.className="pill "+risk;pill.textContent=getLabel(risk);status.appendChild(pill);tr.appendChild(status);
    const arrow=document.createElement("td");arrow.className="arrow";arrow.textContent="→";tr.appendChild(arrow);
    tr.addEventListener("click",()=>{chosen=b.i;render();});
    $("bookingRows").appendChild(tr);
  }
  $("total").textContent=bookings.length;
  for(const risk of ["high","medium","low"]) $(risk).textContent=bookings.filter(b=>getRisk(b.probability??null)===risk).length;
  const b=bookings[chosen];
  const initials=b.name.split(" ").map(v=>v[0]).join("");
  $("guestDetails").innerHTML=`<div class="guest-heading"><div class="guest-avatar">${initials}</div><div><strong>${b.name}</strong><small>${b.id} · Demo guest</small></div></div><div class="detail-grid"><div><div class="key">Email</div><div class="val">${b.email}</div></div><div><div class="key">Country</div><div class="val">${b.countryLabel}</div></div><div><div class="key">Hotel</div><div class="val">${b.hotel}</div></div><div><div class="key">Check-in</div><div class="val">${formatDate(b.arrival)}</div></div><div><div class="key">Length of stay</div><div class="val">${b.nights} nights</div></div><div><div class="key">Nightly rate (dataset ADR)</div><div class="val">${(b.data.adr??base.adr).toFixed(2)}</div></div></div>`;
  if(b.probability === undefined){$("predictionDetails").innerHTML='<div class="muted">Prediction pending. Start the local FastAPI server, then select Refresh predictions.</div>';return;}
  const risk=getRisk(b.probability);
  $("predictionDetails").innerHTML=`<div class="prediction-top"><div class="big-prob ${risk==='high'?'red-text':risk==='medium'?'orange-text':'green-text'}">${(b.probability*100).toFixed(1)}%</div><span class="pill ${risk}">${getLabel(risk)}</span></div><p class="prediction-explainer">Estimated probability that this booking will be canceled.</p><div class="meter"><div class="fill ${risk}" style="width:${(b.probability*100).toFixed(2)}%"></div></div><div class="legend"><span>0% • Low</span><span>36% • Medium</span><span>70% • High</span><span>100%</span></div><div class="model-note">Classification threshold: 36% · Gradient Boosting · Example booking inputs are fictional. Risk bands are dashboard labels, not calibrated guarantees.</div>`;
}
async function refresh(){
  if(running)return;
  running=true;$("refresh").disabled=true;$("apiStatus").textContent="Connecting...";
  try{
    for(const b of bookings){
      // Keep the prediction schema compatible with the trained 27-feature pipeline.
      const payload={...base,...b.data};
      const response=await fetch("/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      if(!response.ok)throw new Error("Prediction API returned "+response.status);
      const result=await response.json();
      b.probability=Number(result.cancellation_probability);
      render();
    }
    $("apiStatus").textContent="Connected";
  }catch(err){$("apiStatus").textContent="Offline";console.error(err);alert("Could not fetch model predictions. Confirm FastAPI is running and /predict works. " + err.message);}
  finally{running=false;$("refresh").disabled=false;}
}
$("search").addEventListener("input",render);
$("refresh").addEventListener("click",refresh);
$("today").textContent=new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});
render();refresh();
