// Serve the HTML form
function doGet() {
  return HtmlService.createHtmlOutputFromFile('survey-form1'); // Your HTML filename
}

// Handle form submission
function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById("1_54DFsKR_xWuwAZhcUjAHaGAaPWr1_DGG-gP9Obxnog")
      .getSheetByName("FORM1");

    const data = e.parameter;

    // Optional: log incoming data for debugging
    Logger.log(JSON.stringify(data));

    // Map form fields to spreadsheet row
    const row = [
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.institute || "",

      // Questions 1–42 (fill in all, include q24 and q34)
      data.q1 || "",  data.q2 || "",  data.q3 || "",  data.q4 || "",  data.q5 || "",  data.q6 || "",
      data.q7 || "",  data.q8 || "",  data.q9 || "",  data.q10 || "", data.q11 || "", data.q12 || "",
      data.q13 || "", data.q14 || "", data.q15 || "", data.q16 || "", data.q17 || "", data.q18 || "",
      data.q19 || "", data.q20 || "", data.q21 || "", data.q22 || "", data.q23 || "", data.q24 || "",
      data.q25 || "", data.q26 || "", data.q27 || "", data.q28 || "", data.q29 || "", data.q30 || "",
      data.q31 || "", data.q32 || "", data.q33 || "", data.q34 || "", data.q35 || "", data.q36 || "",
      data.q37 || "", data.q38 || "", data.q39 || "", data.q40 || "", data.q41 || "", data.q42 || "",

      // Final career-related fields
      data.career1 || "", data.field1 || "", data.code1 || ""
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Return JSON response to the frontend
    return ContentService
      .createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    // Return error to frontend if something fails
    Logger.log(err.message); // optional logging
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", message: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
