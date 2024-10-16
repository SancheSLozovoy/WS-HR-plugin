import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, Button, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { loadSpecialties, setSelectedSpecialty } from '../model/selectSlice';
import { AppDispatch, RootState } from 'src/app/store/store';

const Select = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, selectedSpecialty } = useSelector((state: RootState) => state.select);

  useEffect(() => {
    dispatch(loadSpecialties());
  }, [dispatch]);

  const handleSelectionChange = (value: string) => {
    dispatch(setSelectedSpecialty(value));
  };

  return (
    <Main style={{ width: "50%" }} className='main'>
      <SingleSelect
        value={selectedSpecialty || ''}
        onChange={handleSelectionChange}
        placeholder="Выберите специальность"
      >
        {specialties.map((specialty) => (
          <SingleSelectOption key={specialty.id} value={specialty.name}>
            {specialty.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
      <Button style={{ marginTop: 10, fontSize: 43 }}>
        Сгенерировать ссылку на задание
      </Button>
    </Main>
  );

};

export { Select };
