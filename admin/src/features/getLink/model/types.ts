export interface TaskLinkProps {
    taskUrl: string | null;
    task: string | null;
    isValid: boolean;
}

export const initialState: TaskLinkProps = {
    taskUrl: null,
    task: null,
    isValid: true
};
