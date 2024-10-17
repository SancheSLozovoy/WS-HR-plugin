export interface Task {
    id: number;
    title: string;
    content: string;
    specialityId: number;
    isActive: boolean;
    taskLinks: TaskLink[];
}

export interface TaskLink {
    uuid: string;
    task: Task | null;
    isValid: boolean;
}

export const initialState: { uuid: string; task: Task | null; isValid: boolean } = {
    uuid: '',
    task: null,
    isValid: false,
};
