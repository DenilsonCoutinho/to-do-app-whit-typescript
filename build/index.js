import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();
let date = new Date().toLocaleDateString();
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
subTasks.addEventListener('click', () => {
    let newInputTask = document.createElement('input');
    newInputTask.type = 'text';
    newInputTask.placeholder = 'Sub Tarefa';
    newInputTask.id = 'input_' + uuid;
    console.log(subTasks);
});
