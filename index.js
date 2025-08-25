// Required elements
const nameInput = document.getElementById("name");
const idInput = document.getElementById("id");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const form = document.getElementById("form");
const tableBody = document.getElementById("studentTableBody");

let students = [];

//local storage
window.addEventListener("DOMContentLoaded",() =>{
    const storage = localStorage.getItem("students")
    if(storage){
        students = JSON.parse(storage);
        displayStudents();
    }
})

// addEventListener to form
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get values form input
    const nameValue = nameInput.value.trim();
    const idValue = idInput.value.trim();
    const emailValue = emailInput.value.trim();
    const contactValue = contactInput.value.trim();

    // Validation
    if (!nameValue || !idValue || !emailValue || !contactValue) {
        alert("Please fill all mandatory fields!");
        return;
    }
    if (contactValue.length < 10) {
        alert("Contact Number must be 10 digits");
        return;
    }

    // Add student
    const student = { name: nameValue, id: idValue, email: emailValue, contact: contactValue };
    students.push(student);
    displayStudents();
    saveToLocalStorage();

    // Reset form
    form.reset();
});
//function for displaying StudentsData
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="border">${student.name}</td>
      <td class="border">${student.id}</td>
      <td class="border">${student.email}</td>
      <td class="border">${student.contact}</td>
      <td>
        <button class="bg-yellow-500 px-2 py-1 rounded-lg editButton">Edit</button>
        <button class="bg-red-600 px-2 py-1 rounded deleteButton">Delete</button>
      </td>
    `;

        // Edit button
        row.querySelector(".editButton").addEventListener("click", () => {
            editStudent(index);
        });

        // Delete button
        row.querySelector(".deleteButton").addEventListener("click", () => {
            deleteStudent(index);
        });

        tableBody.appendChild(row);
    });
}
//function for editStudentsData
function editStudent(index) {
    const student = students[index];
    nameInput.value = student.name;
    idInput.value = student.id;
    emailInput.value = student.email;
    contactInput.value = student.contact;

    students.splice(index, 1);
    displayStudents();
    saveToLocalStorage();
}
//function for deleteStudentsData
function deleteStudent(index) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
        students.splice(index, 1);
        displayStudents();
        saveToLocalStorage();
    }
}
//define function for saveDataToLocalStorage
function saveToLocalStorage() {
    localStorage.setItem("students", JSON.stringify(students));
}