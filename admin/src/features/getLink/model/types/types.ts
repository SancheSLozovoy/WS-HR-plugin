export interface Task {
    id: number;
    title: string;
    content: string;
    specialityId: number;
    isActive: boolean;
    taskLinks: TaskLink[];
}

export interface TaskLink {
    documentId: string;
    uuid: string;
    task: Task | null;
    isValid: boolean;
}

export const initialState: TaskLink = {
    documentId: '',
    uuid: '',
    task: null,
    isValid: false,
};
