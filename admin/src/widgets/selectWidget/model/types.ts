export interface Speciality {
    id: number
    name: string;
  }
  
  export interface SelectState {
    specialties: Speciality[];
    selectedSpecialty: string | null
  }
  
 export const initialState: SelectState = {
    specialties: [],
    selectedSpecialty: null,
};
