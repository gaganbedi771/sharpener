    const taskName=document.getElementById("taskname") as HTMLInputElement;
    const taskDate=document.getElementById("duedate") as HTMLInputElement;
    const btnSubmit =document.getElementById("submitbtn") as HTMLButtonElement;
    const taskList=document.getElementById("tasklist") as HTMLUListElement;

    type Tasks ={
        id:number,
        name:string,
        dueDate:string,
        isCompleted:boolean
    }

    let tasks : Tasks[] = [];
    window.addEventListener("DOMContentLoaded",()=>{
        const storedTasks=localStorage.getItem("tasks");
        if(storedTasks){
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    })


    function renderTasks():void{

        taskList.innerHTML="";

        tasks.forEach((task)=>{
            const li=document.createElement("li");

            const taskInfo=document.createElement("div");
            taskInfo.className="task-info";

            const checkBox=document.createElement("input");
            checkBox.type="checkbox";
            checkBox.checked=task.isCompleted;
            checkBox.addEventListener("change",()=>toggle(task.id));

            const span = document.createElement("span");
            span.textContent=`${task.name} is due on ${task.dueDate}`;

            if (task.isCompleted) {
                span.classList.add("completed");
             }

             const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteTask(task.id));

            taskInfo.appendChild(checkBox);
            taskInfo.appendChild(span);

            li.appendChild(taskInfo);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);

        })


    }

    function toggle(id:number):void{
        tasks=tasks.map((task)=>{
            if(task.id==id){
                return {...task,isCompleted:!task.isCompleted}
            }
            else{
                return task;
            }
        });

        saveTasks();
        renderTasks();
    }

    function deleteTask(id:number):void{
        tasks = tasks.filter((task) => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function saveTasks():void{
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }

    btnSubmit.addEventListener("click",addTask);
    
    function addTask():void{
        const name=taskName.value.trim();
        const dueDate=taskDate.value;

        tasks.push({
            id:Date.now(),
            name,
            dueDate,
            isCompleted:false
        })

        saveTasks();
        renderTasks();
        taskName.value = "";
        taskDate.value = "";
    }