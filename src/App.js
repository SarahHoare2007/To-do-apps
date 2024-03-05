import { useEffect, useState } from "react";
import './App.css'
import { TextField, Grid, Button } from "@mui/material";
import styled from "@emotion/styled";
import TaskItem from "./components/TaskItem.js";
import useLocalStorage from "./components/hooks/useLocalStorage.js";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [taskName, setTaskName] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("http://todocraft.ddev.site/tasks.json");
    const tasks = await response.json();
    console.log(tasks);

    if (tasks?.data) {
      setTasks(tasks.data);
    }
  }



  useEffect(() => {
    fetchTasks();
  }, [])

  const valueChange = (event) => {
    console.log(event);
    const newValue = event.target.value;
    setTaskName(newValue);
  }

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift({
      id: uuidv4,
      name: task,
    });
    setTasks(newTasks);
    setTaskName("")
  }


  return (
    <div className="App">
      <div id="todo-app">
        <form>
          <StyledGrid container justifyContent={"center"}>
            <Grid item><TextField type="text" id="new-task"
              placeholder="Enter a new task" value={taskName} onChange={valueChange} /> </Grid>
            <Grid item><StyledButton
              size="large"
              id="add-task"
              varient="outline"
              onClick={(e) => handleAddTask(e, taskName)}>
              create task</StyledButton>
            </Grid>
          </StyledGrid>


          <ul id="task-list">
            {tasks.map((task, index) => {
              return (
                <TaskItem key={`task-${task.id}-${index}`} task={task} tasks={tasks} setTasks={setTasks} index={index} />
              )
            })}
          </ul>
        </form>
      </div>
    </div >
  );
}

export default App;
const StyledButton = styled(Button)`
border: 50px red;
`;
const StyledGrid = styled(Grid)`
border: 10px green;
`;