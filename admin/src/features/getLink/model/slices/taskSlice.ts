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

        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        console.log(randomTask)
        const links = await fetchValidTaskLinks(randomTask.id);
        console.log(randomTask.id)
        console.log(links)
        return { task: randomTask, links }; 
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
