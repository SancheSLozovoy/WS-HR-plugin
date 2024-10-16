import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, Button, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { loadSpecialties, setSelectedSpecialty } from '../model/selectSlice';
import { AppDispatch, RootState } from 'src/app/store/store';

const Select = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, loading, error, selectedSpecialty } = useSelector((state: RootState) => state.select);

  useEffect(() => {
    const loadData = async () => {
        await dispatch(loadSpecialties());
        console.log('Специальности загружены:', specialties);
    };
    loadData();
}, [dispatch]);


  const handleSelectionChange = (value: string) => {
    dispatch(setSelectedSpecialty(value));
  };

  const handleButtonClick = () => {
    console.log('Сгенерировать ссылку для:', selectedSpecialty);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <Main style={{ width: "50%" }} className='main'>
      <SingleSelect
        value={selectedSpecialty || ''}
        onChange={handleSelectionChange}
      >
        {specialties.map((specialty) => (
          <SingleSelectOption key={specialty.speciality} value={specialty.speciality}>
            {specialty.speciality}
          </SingleSelectOption>
        ))}

      </SingleSelect>
      <Button style={{ marginTop: 10, fontSize: 43 }} onClick={handleButtonClick}>
        Сгенерировать ссылку на задание
      </Button>
    </Main>
  );
};

export { Select };
