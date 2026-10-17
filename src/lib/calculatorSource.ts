export const ORIGINAL_SOURCE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Meeting Cost Calculator</title>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background: #f7f3ee;
      display: flex;
      justify-content: center;
      padding: 40px 16px;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    h1 {
      font-size: 20px;
      margin-bottom: 20px;
      color: #2d2a26;
    }
    label {
      display: block;
      font-size: 13px;
      color: #6b6b6b;
      margin-top: 14px;
    }
    input {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-top: 4px;
    }
    button {
      margin-top: 20px;
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 8px;
      background: #2d2a26;
      color: white;
      font-weight: 600;
    }
    #result {
      margin-top: 18px;
      font-size: 26px;
      font-weight: 700;
      color: #2d2a26;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Meeting Cost Calculator</h1>
    <label>Number of people</label>
    <input id="people" type="number" value="8" />
    <label>Average yearly salary (₹)</label>
    <input id="salary" type="number" value="1200000" />
    <label>Meeting length (minutes)</label>
    <input id="minutes" type="number" value="60" />
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
  </div>

  <script>
    function calculate() {
      const people = Number(document.getElementById("people").value);
      const salary = Number(document.getElementById("salary").value);
      const minutes = Number(document.getElementById("minutes").value);

      const hourlyRate = salary / 2000;
      const total = people * hourlyRate * (minutes / 60);

      document.getElementById("result").textContent =
        "₹" + total.toLocaleString("en-IN");
    }
  </script>
</body>
</html>`;

export const UPDATED_SOURCE = ORIGINAL_SOURCE
  .replace("color: #2d2a26;\n      text-align: center;", "color: #16a34a;\n      text-align: center;")
  .replace("<h1>Meeting Cost Calculator</h1>", "<h1>What did this meeting really cost?</h1>");
