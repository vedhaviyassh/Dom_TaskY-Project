const taskContainer = document.querySelector(".task_container");
let globalStore = [];  //array of objects
console.log(taskContainer);
const generateNewCard = (taskData) =>
  `
  <div id={taskData.id} class="col-md-6 col-lg-4">
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"> <i class="fas fa-pencil-alt"></i> </button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"> <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i> </button>
      </div>
      <img src=${taskData.imageurl} class="card-img-top p-3 rounded" alt="...">
      <div class="card-body">
        <h5 class="card-title  fw-bold text-primary">${taskData.tasktitle}</h5>
        <p class="card-text">${taskData.taskdescription}</p>
        <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
      </div>
    </div>
  </div>
  `;


const loadInitialCardData = () => {
  //localStorage to get tasky card data
  const getCardData = localStorage.getItem("tasky");

  //convert the string to a normal object
  const {cards} = JSON.parse(getCardData);

  //loop over the array of task object to createHTML cards , inject it to our dom
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));


    //update our global store
    globalStore.push(cardObject);
  }
)
};

//Delete function

const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}` ,
    imageurl: document.getElementById("imageURL").value ,
    tasktitle: document.getElementById("taskTitle").value ,
    tasktype: document.getElementById("taskType").value ,
    taskdescription: document.getElementById("taskDescription").value
  };
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);
  localStorage.setItem("tasky" ,JSON.stringify({cards: globalStore}));

};
