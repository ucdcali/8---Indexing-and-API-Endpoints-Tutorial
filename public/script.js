document.getElementById('name').addEventListener('input', updateStudents);
document.getElementById('grade').addEventListener('change', updateStudents);
document.getElementById('minGpa').addEventListener('input', updateStudents);
document.getElementById('maxGpa').addEventListener('input', updateStudents);
document.getElementById('cool').addEventListener('change', updateStudents);

async function updateStudents() {
  try {
    // Convert minPopulation and maxPopulation to numbers
    const name = document.getElementById('name').value;
    const minGPA = parseFloat(document.getElementById('minGpa').value, 10);
    const maxGPA = parseFloat(document.getElementById('maxGpa').value, 10);
    const grade = parseInt(document.getElementById('grade').value, 10);
    const cool = document.getElementById('cool').value;

    // Check if conversion results in NaN and handle the case appropriately
    if (isNaN(minGPA) || isNaN(maxGPA)) {
      console.error('Student values must be numeric');
      return; // Exit the function if values are not valid numbers
    }

    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, minGPA, maxGPA, grade, cool }),
    });

    if (response.ok) {
      const students = await response.json();
      console.log(students);
      const container = document.getElementById('tableBody');
      container.innerHTML = ''; // Clear previous results
      students.forEach(student => {
        const studentRow = document.createElement('tr');
        const status = student.cool ? "Cool" : "Not Cool";
        studentRow.innerHTML = `
          <td>${student.name}</td>
          <td>${student.grade}</td>
          <td>${student.gpa}</td>
          <td>${status}</td>
        `;
        container.appendChild(studentRow);
      });
    } else {
      console.error('Response not ok with status:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

updateStudents();
