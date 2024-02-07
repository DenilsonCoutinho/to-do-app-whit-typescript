const date = new Date().toLocaleDateString()

let newInputTask: NodeListOf<HTMLElement> | any = document.querySelector('.newInputTask')
let task: NodeListOf<HTMLElement> | any = document.querySelector('.task')
let lengthZero: NodeListOf<HTMLElement> | any = document.querySelector('.whileLengthZero')
const storedTasks = JSON.parse(localStorage.getItem('myTask'));
const allDataTask = storedTasks ? storedTasks : [];
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
    if (allDataTask.length > 0) {
        lengthZero.classList.add('hidden')
    }
}
observerTask()
function deleteToDo(i:number) {
    console.log(i)
    allDataTask.splice(i, 1)
    localStorage.setItem("myTask", JSON.stringify(allDataTask));
    viewCurrentToDo()
}
function taskDone(i:number){
    allDataTask[i].done = true
    localStorage.setItem("myTask", JSON.stringify(allDataTask));
    console.log(allDataTask[i])
    viewCurrentToDo()
}

function viewCurrentToDo() {
    const currentPlans: NodeListOf<HTMLElement> | any = document.querySelector('.allPlans')
    document.querySelector('.to-do').innerHTML = JSON.parse(localStorage.getItem('myTask')).length.toString()
    currentPlans.innerHTML = JSON.parse(localStorage.getItem('myTask')).map((i: any, index) => {
        return `
        <div  key=${i.title}  class="w-full max-w-[300px]  bg-white hover:duration-300 hover:scale-102 mt-5 p-5 border-white  rounded-lg">
                    <h1 class="font-medium">${i.title}</h1>
                    <div class="flex flex-col">
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <lord-icon src="https://cdn.lordicon.com/uecgmesg.json" trigger="loop"style="width:20px;height:20px">
                                </lord-icon>
                                <p class="text-xs text-gray-400">Status</p>
                            </div>
                            <div class="p-1 rounded-3xl ${i.done === true ? 'bg-green-500':'bg-gray-300'}  "><p class="text-white text-xs">Em aberto</p></div>
                        </div>
                        <div class=" h-1 w-full relative bg-gray-400 rounded-xl  duration-150 my-3">
                            <div class="h-1 w-[${i.done === true ? '100%':''}] absolute bg-green-500 rounded-xl duration-150"></div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="bg-gray-100 rounded-2xl p-1 w-20">
                             <h1 class="text-xs text-gray-600">${i.date}</h1>
                        </div>
                        <div class="flex gap-1 items-center">
                        <button id="myButtonClose" onclick="deleteToDo(${index})" class="bg-red-600 text-white cursor-pointer rounded-full flex justify-center items-center w-7 h-7">
                        <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            colors="primary:#fff,secondary:#fff"
                            
                            style="width:25px;height:25px">
                        </lord-icon>
                        </button>
                        <button id="myButtonDone" onclick="taskDone(${index})" class="bg-green-600 cursor-pointer rounded-full flex justify-center items-center w-7 h-7">
                            <lord-icon
                                src="https://cdn.lordicon.com/cgzlioyf.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#fff"
                                class="borde"
                                style="width:25px;height:25px">
                            </lord-icon>
                        </button>
                    </div>
                    </div>
                </div>
        </div>
         `
    }).join('')

        ;
}

viewCurrentToDo()


function saveTask() {
    if (task.value === '') {
        alert('Tá vazio')
    } else {
        allDataTask.push({
            id: Math.random(),
            title: task.value,
            done: false,
            date: date
        })
        localStorage.setItem("myTask", JSON.stringify(allDataTask));
    }
    observerTask()
    viewCurrentToDo()
    task.value == ''
}

function generateIdWithTime() {
    const now = new Date();
    const id = now.getTime(); // Obtém o tempo em milissegundos como ID único
    return id;
}

let idWithTime = generateIdWithTime();