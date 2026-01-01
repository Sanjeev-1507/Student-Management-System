const inputName = document.querySelector("#name");
const inputMark = document.querySelector("#mark");
const addBtn = document.querySelector("#addBtn");
const bodyTable = document.querySelector("#bodyTable");

let students = [];

addBtn.addEventListener("click", ()=> {
    const name = inputName.value.trim();
    const mark = inputMark.value; // if blank js consider as 0 so first we have get the value then convert to number


//validating the input and blank values
    if(name === "" || mark === "") {
        
         alert("Please type your name and marks");
         return;
    }

// regex.test(value) which is used for checking alphabet and space
    if(!/^[A-Za-z ]+$/.test(name)){
        alert("Name field should conatians only Alpabets")
        return;
    }

//validating numbers
if(mark < 0 || mark > 100){
    alert("Marks should be within 1 - 100");
    return;
}

// setting the mark as number 
    let markNum = Number(mark);

//Validate Pass or fail and grade values
    let result = markNum >= 35 ? "Pass" : "Fail"
    let grade = "";

    markNum >= 90 ? grade = "A+" 
    : markNum >= 80 ? grade = "A"
    : markNum >= 70 ? grade = "B"
    : markNum >= 60 ? grade = "C" 
    : grade = "D"

// getting the input in array format and pushing it to storage 
    students.push({
    name : name,
    mark : markNum,
    result : result,
    grade : grade
});

// stored in local storage and converting into string from obj 
localStorage.setItem("studentsData", JSON.stringify(students));

//again we are setting to update in UI
addRowToTable({
    name : name,
    mark : markNum,
    result : result,
    grade : grade
}, 
students.length - 1
);
        inputName.value = "";
        inputMark.value = "";

});


// reuseable code to add in UI, pushing in the colnumn 
function addRowToTable(student, index){
    const row = document.createElement("tr");

    row.setAttribute("data-index", index);

    row.innerHTML = 
                `<td class="text-center border p-3">${student.name}</td>
                 <td class="text-center border p-3">${student.mark}</td>
                 <td class="text-center border p-3">${student.result}</td>
                 <td class="text-center border p-3">${student.grade}</td>
                 <td class="text-center border p-3"><button class="delete cursor-pointer bg-red-300 px-4 py-1.5 rounded-md">Delete</button></td> `;

        bodyTable.appendChild(row);
}

//while refreshing the code has to be stay so we using load fn,  
window.addEventListener("load", ()=>{
    let data = localStorage.getItem("studentsData"); // once we have set the data in string data type now, we getting it from localstrge 

    if(data){
        students = JSON.parse(data); //convert into obj from string.
        students.forEach((student, index) => {   // itrate into each obj and it will display
            addRowToTable(student, index);
        });
    }
})

bodyTable.addEventListener("click", (e)=>{
    if(e.target.classList.contains("delete")){
        const row = e.target.closest("tr");
        const index = row.getAttribute("data-index");

          students.splice(index, 1);
          
          localStorage.setItem("studentsData", JSON.stringify(students));

          bodyTable.innerHTML = "";
          students.forEach((student, i)=> {
            addRowToTable(student, i);
          });
    }
});