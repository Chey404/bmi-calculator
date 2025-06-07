let lastResult = null;

function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const outputDiv = document.getElementById("output");
  clearHighlights();
  outputDiv.classList.remove("visible");

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    outputDiv.innerHTML = `<div class="alert alert-danger">Please enter valid positive numbers for both weight and height.</div>`;
    outputDiv.classList.add("visible");
    lastResult = null;
    return;
  }

  const bmi = ((weight * 703) / (height * height)).toFixed(1);
  let category = "";
  let info = "";

  if (bmi < 18.5) {
    category = "underweight";
    info = "This BMI indicates you are underweight.";
  } else if (bmi < 25) {
    category = "normal";
    info = "This BMI indicates a healthy weight range.";
  } else if (bmi < 30) {
    category = "overweight";
    info = "This BMI indicates you are overweight.";
  } else {
    category = "obese";
    info = "This BMI indicates obesity.";
  }

  document.getElementById(category).classList.add("table-success", "fw-bold");

  outputDiv.innerHTML = `
    <div class="card p-3">
      <h4>Your BMI is: <strong>${bmi}</strong></h4>
      <p>${info}</p>
    </div>
  `;
  outputDiv.classList.add("visible");

  lastResult = { weight, height, bmi, category, info };
}

function clearForm() {
  document.getElementById("weight").value = 150;
  document.getElementById("height").value = 65;
  document.getElementById("output").innerHTML = "";
  document.getElementById("output").classList.remove("visible");
  clearHighlights();
  lastResult = null;
}

function clearHighlights() {
  ["underweight", "normal", "overweight", "obese"].forEach(id => {
    const row = document.getElementById(id);
    row.classList.remove("table-success", "fw-bold");
  });
}

function exportCSV() {
  if (!lastResult) {
    alert("Please calculate BMI first.");
    return;
  }

  const rows = [
    ["Weight (lbs)", "Height (in)", "BMI", "Category"],
    [lastResult.weight, lastResult.height, lastResult.bmi, lastResult.category]
  ];

  const csvContent = rows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "bmi_result.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
