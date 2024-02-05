const date = new Date().toLocaleDateString()
let subTasks: NodeListOf<HTMLElement> | any = document.querySelector('.addSubTasks')
let newInputTask: NodeListOf<HTMLElement> | any = document.querySelector('.newInputTask')
let task: NodeListOf<HTMLElement> | any = document.querySelector('.task')
let buttonAdd: NodeListOf<HTMLElement> | any = document.querySelector('.buttonAdd')
let lengthZero: NodeListOf<HTMLElement> | any = document.querySelector('.whileLengthZero')
let listSubTasks: any[] = []
let objectData: any[] = []
let allDataTask: any[] = []


function openModal(id?: number): void {
    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');

    if (id === 1 && modal1) {
        modal1.classList.remove('hidden');
    } else if (modal1) {
        modal1.classList.add('hidden');
    }

    if (id === 2 && modal2) {
        modal2.classList.remove('hidden');
    } else if (modal2) {
        modal2.classList.add('hidden');
    }
}
function observerTask() {
    console.log('aqui', allDataTask)
    if (allDataTask.length > 0) {
        lengthZero.classList.add('hidden')
    }
}

function editTask(){

}
function viewCurrentToDo() {
    const currentPlans: NodeListOf<HTMLElement> | any = document.querySelector('.allPlans')
    document.querySelector('.to-do').innerHTML = allDataTask.length.toString()
    currentPlans.innerHTML = allDataTask.map((i: any) => {
        let taskDone = i.subTasks.filter(task =>  task.done !== false)
        console.log('done',taskDone)
        return `
        <div key={i.title} class="w-full max-w-[300px] cursor-pointer bg-white hover:duration-300 hover:scale-105 mt-5 p-5 border-white  rounded-lg">
                    <h1 class="font-medium">${i.title}</h1>
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <lord-icon src="https://cdn.lordicon.com/uecgmesg.json" trigger="loop"style="width:20px;height:20px">
                                </lord-icon>
                                <p class="text-xs text-gray-400">Progresso</p>
                            </div>
                            <p class="text-xs font-semibold">${taskDone.length}/${i.subTasks.length}</p>
                        </div>
                        <div class=" h-1 w-full relative bg-gray-400 rounded-xl my-3">
                            <div class="h-1 w-[${( taskDone.length/i?.subTasks.length ) * 100}%] absolute bg-green-500 rounded-xl duration-150"></div>
                        </div>
                    </div>
                <div class="bg-gray-100 rounded-2xl p-1 w-20">
                     <h1 class="text-xs text-gray-600">${i.date}</h1
                </div>
                </div>
        </div>
         `
    }).join('')

        ;
}

viewCurrentToDo()


function saveTask(): void {
    let onlyObjects = objectData.filter(item => typeof item === 'object');
    if (task.value === '') {
        alert('Tá vazio')
    } else {
        allDataTask.push({
            id: Math.random(),
            title: task.value,
            subTasks: onlyObjects,
            done: false,
            date:date
        })
    }
    objectData = []
    console.log("aq", objectData)
    observerTask()
    viewCurrentToDo()
    viewCurrentSubTask()
}

function addInput(): void {
    idWithTime++;
    let object: any = {
        id: idWithTime,
        subTasks: '',
        done: true,
    }
    objectData.push(object)
    console.log(objectData)
    viewCurrentSubTask()
}

function viewCurrentSubTask() {
    newInputTask.innerHTML = objectData.map((obj, index) => {
        return ` <div  class="flex gap-2 items-center">
        <input value="${obj.subTasks}" onchange="removeSubTask(${obj.id}, this.value)" placeholder="Adicionar subtarefas" class="outline-none  h-8 rounded-lg border w-44 p-2 " type="text"/>
        <div class="flex items-center gap-2">
        <button onclick="removeData(${obj.id})" class=" h-8 w-10 bg-red-400 flex justify-center items-center text-white rounded-lg">X</button>
        </div>
        </div>
        `;
    }).join('');
}

function removeSubTask(id: number, value: string): void {
    const index = objectData.findIndex(item => item.id === id);
    if (index !== -1) {
        objectData[index].subTasks = value;
    }
}

function removeData(obj: number): void {
    console.log(obj)
    objectData = objectData.filter(item => item.id !== obj)
    viewCurrentSubTask()
}
function generateIdWithTime() {
    const now = new Date();
    const id = now.getTime(); // Obtém o tempo em milissegundos como ID único
    return id;
}

let idWithTime = generateIdWithTime();