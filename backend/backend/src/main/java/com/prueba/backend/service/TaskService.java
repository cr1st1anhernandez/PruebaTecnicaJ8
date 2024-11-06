package com.prueba.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.prueba.backend.repository.TaskRepository;
import com.prueba.backend.model.Task;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.listTasks();
    }

    public void addTask(Task task) {
        taskRepository.insertTask(task);
    }
}
