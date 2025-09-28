import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly storageKey = 'todoList';

  todoList: TodoItem[] = [];
  newTask: string = '';

  ngOnInit(): void {
    try {
      const storedList = localStorage.getItem(this.storageKey);
      if (storedList) this.todoList = JSON.parse(storedList) as TodoItem[];
    } catch (event) {
      console.error('Failed to load todo list from localStorage:', event);
    }
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoList));
  }

  addTask(): void {
    const task = this.newTask.trim();
    if (!task) return;

    this.todoList = [...this.todoList, { id: crypto.randomUUID(), task: task, completed: false }];
    this.newTask = '';
    this.save();
  }

  toggleCompleted(index: number): void {
    this.todoList = this.todoList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    this.save();
  }

  deleteTask(id: string): void {
    this.todoList = this.todoList.filter((item) => item.id !== id);
    this.save();
  }
}
