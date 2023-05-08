import { Injectable } from '@nestjs/common';
import { PrismaService} from '../../prisma.service'
import { Todo } from '@prisma/client'

@Injectable()
export class TodoService {
    constructor(private prismaService : PrismaService) {}
    async fetchAllTodos(): Promise<Todo[]> {
        return this.prismaService.todo.findMany();
    };

    async fetchATodoItem(id: number): Promise<Todo | null> {
        return this.prismaService.todo.findUnique(
            {  where: { id: Number(id)} }
        );

    }
    
    async deleteTodoItem(id: number): Promise<Todo | null> {
        return this.prismaService.todo.delete(
            {  where: { id: Number(id)} }
        );
        
    }

    async addTodoItem(data:Todo): Promise<Todo> {
        return this.prismaService.todo.create({data : data});
       
    }

    async updateTodoItem(id: number, 
        title: string, 
        content: string, 
        is_done: boolean
        ): Promise<Todo | null> {
        return this.prismaService.todo.update(
            {where: {id: Number(id)},
            data: {
                title: title,
                content: content,
                is_done: is_done
            }}
        );
        
    }
}
