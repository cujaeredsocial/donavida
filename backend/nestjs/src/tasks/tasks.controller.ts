import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDTO } from './dto/create-tasks.dto';
import { Task, TaskStatus } from './task.model';


const newLocal = 'tasks';
@Controller(newLocal)
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string){
    return this.tasksService.getTaskById(id);
  }
   @Post()
   @UsePipes(ValidationPipe)
   createTask(
    /*@Body('title') title: string,
    @Body('description') description: string,   */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() createTaskDTO: CreateTasksDTO
    ){
    /*console.log('title',title);
    console.log('description',description);*/

    //return this.tasksService.createTask(title,description);
    return  this.tasksService.createTask(createTaskDTO);
   }

   @Delete('/:id')
   deleteTask(@Param('id') id: string): void{
    this.tasksService.deleteTask(id);
   }

   @Patch('/:id/status')
   updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
   ){
     return this.tasksService.updateTaskStatus(id,status);
   }
}
