let studentsResults = [];

document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        studentsResults = XLSX.utils.sheet_to_json(firstSheet);
    };

    reader.readAsArrayBuffer(file);
});

function searchResult() {
    const searchType = document.getElementById('search-type').value;
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsTable = document.getElementById('students-results');
    resultsTable.innerHTML = '';

    let student;
    if (searchType === 'name') {
        student = studentsResults.find(s => s['الاسم'].toLowerCase() === searchInput);
    } else if (searchType === 'id') {
        student = studentsResults.find(s => s['رقم الجلوس'] == searchInput);
    }

    if (student) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${student['رقم الجلوس']}</td><td>${student['الاسم']}</td><td>${student['الدرجة']}</td><td>${student['النسبة ']}</td>`;
        resultsTable.appendChild(row);
    } else {
        resultsTable.innerHTML = '<tr><td colspan="4">لم يتم العثور على نتيجة</td></tr>';
    }
}
