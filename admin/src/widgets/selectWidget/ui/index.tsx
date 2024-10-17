import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, Button, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { loadSpecialties, setSelectedSpecialty } from '../model/slices/selectSlice';
import { AppDispatch, RootState } from 'src/app/store/store';
import { getRandomTask } from '../../../features/getLink/model/slices/taskSlice';

const Select = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, selectedSpecialty } = useSelector((state: RootState) => state.select);
  const { task, uuid, isValid } = useSelector((state: RootState) => state.taskLink);

  useEffect(() => {
    dispatch(loadSpecialties());
  }, [dispatch]);

  const handleSelectionChange = (value: string) => {
    dispatch(setSelectedSpecialty(value));
  };

  const handleGenerateLink = () => {
    if (selectedSpecialty) {
      dispatch(getRandomTask({ specialityId: Number(selectedSpecialty) }));
    }
  };

  return (
    <Main style={{ width: "50%" }} className='main'>
      <SingleSelect
        value={selectedSpecialty || ''}
        onChange={handleSelectionChange}
        placeholder="Выберите специальность"
      >
        {specialties.map((specialty) => (
          <SingleSelectOption key={specialty.id} value={specialty.id}>
            {specialty.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
      <Button style={{ marginTop: 10, fontSize: 43 }} onClick={handleGenerateLink}>
        Сгенерировать ссылку на задание
      </Button>

      {isValid && uuid && (
        <div style={{fontSize: 24, marginTop: 20 }}>
          <p>Ссылка на задание: <a href={`http://localhost:3000/task/${uuid}`}>{`http://localhost:3000/task/${uuid}`}</a></p>
        </div>
      )}

      {!isValid && (
        <div style={{fontSize: 24, marginTop: 20 }}>
          <p>Нет доступной задачи или задача не загружена.</p>
        </div>
      )}
    </Main>

  );
};

export { Select };
