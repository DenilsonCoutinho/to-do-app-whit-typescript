const date = new Date().toLocaleDateString();
const list = [
    {
        title: "corrida matinal",
        date: date,
        toDid: 6,
        did: 5
    },
    {
        title: "corrida matinal",
        date: date,
        toDid: 11,
        did: 2
    }, {
        title: "corrida matinal",
        date: date,
        toDid: 11,
        did: 2
    },
    {
        title: "corrida matinal",
        date: date,
        toDid: 11,
        did: 2
    }
];
function openModal(id) {
    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    if (id === 1 && modal1) {
        modal1.classList.remove('hidden');
    }
    else if (modal1) {
        modal1.classList.add('hidden');
    }
    if (id === 2 && modal2) {
        modal2.classList.remove('hidden');
    }
    else if (modal2) {
        modal2.classList.add('hidden');
    }
}
function viewCurrentToDo() {
    const currentPlans = document.querySelector('.allPlans');
    currentPlans.innerHTML = list.map((i) => {
        return `
        <div key={i.title} class="w-full max-w-[300px] bg-white hover:duration-300 hover:scale-105 mt-5 p-5 border-white  rounded-lg">
        <h1 class="font-medium">${i.title}</h1>
        <div class="flex flex-col">
        <div class="flex justify-between">
        <div class="flex items-center">
        <lord-icon
        src="https://cdn.lordicon.com/uecgmesg.json"
        trigger="loop"
        style="width:20px;height:20px">
        </lord-icon>
        <p class="text-xs text-gray-400">Progresso</p>
        </div>
        <p class="text-xs font-semibold">${i.did}/${i.toDid}</p>
        </div>
        <div class=" h-1 w-full relative bg-gray-400 rounded-xl my-3">
        <div class="h-1 w-[${(i.did / i.toDid) * 100}%] absolute bg-green-500 rounded-xl duration-150"></div>
        </div>
        </div>
        <div class="bg-gray-100 rounded-2xl p-1 w-20">
        <h1 class="text-xs text-gray-600">${i.date}</h1
        </div>
        </div>
        </div>
    `;
    }).join('');
}
viewCurrentToDo();
let subTasks = document.querySelector('.addSubTasks');
let newInputTask = document.querySelector('.newInputTask');
let task = document.querySelector('.task');
let buttonAdd = document.querySelector('.buttonAdd');
let listSubTasks = [];
let objectData = [];
let allDataTask = [];
function saveTask() {
    let onlyObjects = objectData.filter(item => typeof item === 'object');
    allDataTask.push({
        title: task.value,
        subTasks: onlyObjects
    });
    console.log('aqui', allDataTask);
}
function addInput() {
    idWithTime++;
    let object = {
        id: idWithTime,
        subTasks: ''
    };
    objectData.push(object);
    console.log(objectData);
    viewCurrentSubTask();
}
function viewCurrentSubTask() {
    newInputTask.innerHTML = objectData.map((obj, index) => {
        return ` <div  class="flex gap-2 items-center">
        <input value="${obj.subTasks}" onchange="updateSubTasks(${obj.id}, this.value)" placeholder="Adicionar subtarefas" class="outline-none  h-8 rounded-lg border w-44 p-2 " type="text"/>
        <div class="flex items-center gap-2">
        <button onclick="removeData(${obj.id})" class=" h-8 w-10 bg-red-400 flex justify-center items-center text-white rounded-lg">X</button>
        </div>
        </div>
        `;
    }).join('');
}
function updateSubTasks(id, value) {
    const index = objectData.findIndex(item => item.id === id);
    if (index !== -1) {
        objectData[index].subTasks = value;
    }
    console.log(objectData);
}
function removeData(obj) {
    console.log(obj);
    objectData = objectData.filter(item => item.id !== obj);
    viewCurrentSubTask();
}
function generateIdWithTime() {
    const now = new Date();
    const id = now.getTime(); // Obtém o tempo em milissegundos como ID único
    return id;
}
let idWithTime = generateIdWithTime();
