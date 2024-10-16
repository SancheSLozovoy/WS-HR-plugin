export interface Speciality {
    speciality: string;
    isActive: boolean;
    task: string;
}


export interface SelectState {
    specialties: Speciality[];
    selectedSpecialty: string | null;
    loading: boolean;
    error: string | null;
}


export const initialState: SelectState = {
    specialties: [],
    selectedSpecialty: null,
    loading: false,
    error: null,
};

