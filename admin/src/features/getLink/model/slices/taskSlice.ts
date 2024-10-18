import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchValidTasks } from "../../api/getTaskApi";
import { fetchValidTaskLinks } from "../../api/getTaskLink";
import { initialState, Task, TaskLink } from "../types/types";

export const getRandomTask = createAsyncThunk<{ task: Task; links: TaskLink[] }, { specialityId: number }>(
    'task/generateTaskLink',
    async ({ specialityId }) => {
        const tasks = await fetchValidTasks(specialityId);

        if (tasks.length === 0) {
            throw new Error('Задач нет');
        }

        let validTask = null;
        let validLinks = [];

        while (validTask === null) {
            const randomIndex = Math.floor(Math.random() * tasks.length);
            const randomTask = tasks[randomIndex];

            if (randomTask.isActive) {
                const links = await fetchValidTaskLinks(randomTask.id);
                console.log(randomTask.id);
                console.log(links);
                if (links.length > 0) {
                    validTask = randomTask;
                    validLinks = links;
                }
            }
        }

        if (!validTask) {
            throw new Error('Нет доступной задачи или задача не загружена');
        }

        return { task: validTask, links: validLinks };
    }
);

const taskSlice = createSlice({
    name: 'taskLink',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRandomTask.fulfilled, (state, action) => {
                const taskLinks = action.payload.links || [];
                const uuid = taskLinks.length > 0 ? taskLinks[0].uuid : '';
                const documentId = taskLinks.length > 0 ? taskLinks[0].documentId : '';

                state.documentId = documentId;
                state.uuid = uuid;
                state.task = action.payload.task;
                state.isValid = taskLinks.length > 0; 
            })
            .addCase(getRandomTask.rejected, (state) => {
                state.documentId = '';
                state.uuid = '';
                state.task = null;
                state.isValid = false;
            });
    },
});

export default taskSlice.reducer;
