const monthSelector = document.getElementById("monthSelector");
const calendar = document.getElementById("calendar");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closeBtn = document.getElementById("closeBtn");

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// Populate month dropdown
months.forEach((m, i) => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.text = m;
  monthSelector.appendChild(opt);
});

// Show calendar for selected month
function showMonth(monthIndex) {
  calendar.innerHTML = "";
  const daysInMonth = new Date(2025, monthIndex + 1, 0).getDate(); // any year, e.g., 2025
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = d;
    const key = `${String(monthIndex+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    dayDiv.onclick = () => showObservances(key);
    calendar.appendChild(dayDiv);
  }
}

// Show observances in modal
function showObservances(dateKey) {
  const observances = events[dateKey];
  if (observances && observances.length) {
    popupText.innerHTML = "<b>Today your excuse— sorry, events, are:</b><br>" + observances.join("<br>");
  } else {
    popupText.innerHTML = "<b>You have no excuse- sorry, events today!</b>";
  }
  popup.style.display = "block";
}


// Close modal
closeBtn.onclick = () => popup.style.display = "none";
window.onclick = (e) => { if (e.target === popup) popup.style.display = "none"; };

// Initialize default month
monthSelector.addEventListener("change", (e) => showMonth(Number(e.target.value)));
monthSelector.value = new Date().getMonth(); // default current month
showMonth(new Date().getMonth());
