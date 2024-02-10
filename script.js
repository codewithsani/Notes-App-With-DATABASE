const addBtn = document.querySelector("#add");
const Title = document.querySelector("input");
const textarea = document.querySelector("textarea");
const notescontainer = document.querySelector("#notes");
const deleteBtn = document.querySelector("#deletAll");
addBtn.addEventListener("click", () => {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    let notesObj = [];
    notesObj.push({ title: Title.value, note: textarea.value });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    console.log("added to the localstorage");
    showNotes();
  } else {
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.push({ title: Title.value, note: textarea.value });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    console.log("add in the present localStorage array");
    showNotes();
  }
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notescontainer.innerHTML = "<h1>Pleae Add Notes</h1>";
  } else {
    let notesobj = JSON.parse(localStorage.getItem("notes"));
    if (notesobj.length == 0) {
      notescontainer.innerHTML = "<h1>No notes peresnt please add one  </h1>";
    } else {
      let html = "";
      notesobj.forEach((element, index) => {
        console.log(element);
        let notesCard = `<div class="card m-2" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">
          ${element.note}
          </p>
          <a href="#" class="btn btn-outline-danger" onclick="Delete(this.id)" id="${index}">Delete</a>
        </div>
      </div>`;
        html += notesCard;
      });
      notescontainer.innerHTML = html;
    }
  }
}

showNotes();

deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  showNotes();
});

function Delete(id) {
  let notesObj1 = JSON.parse(localStorage.getItem("notes"));
  notesObj1.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj1));
  showNotes();
}
