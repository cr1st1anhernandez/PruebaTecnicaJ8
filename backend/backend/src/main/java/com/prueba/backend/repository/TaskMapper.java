package com.prueba.backend.repository;

import com.prueba.backend.model.Task;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface TaskMapper {
    List<Task> listTasks();
    void insertTask(Task task);
}
