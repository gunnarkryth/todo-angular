import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

// Todo item data structure
export interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

// Root Todo App component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly storageKey = 'todoList'; // localStorage key

  todoList: TodoItem[] = []; // list of todos
  newTask: string = ''; // bound to input field

  // Load saved todos on app start
  ngOnInit(): void {
    try {
      const storedList = localStorage.getItem(this.storageKey);
      if (storedList) this.todoList = JSON.parse(storedList) as TodoItem[];
    } catch (event) {
      console.error('Failed to load todo list from localStorage:', event);
    }
  }

  // Save todos to localStorage
  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoList));
  }

  // Add a new todo
  addTask(): void {
    const task = this.newTask.trim();
    if (!task) return;

    this.todoList = [...this.todoList, { id: crypto.randomUUID(), task: task, completed: false }];
    this.newTask = '';
    this.save();
  }

  // Toggle completion state of a todo
  toggleCompleted(index: number): void {
    this.todoList = this.todoList.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    this.save();
  }

  // Delete a todo by id
  deleteTask(id: string): void {
    this.todoList = this.todoList.filter((item) => item.id !== id);
    this.save();
  }
}
