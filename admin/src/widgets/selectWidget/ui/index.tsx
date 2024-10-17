import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, Button, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { loadSpecialties, setSelectedSpecialty } from '../model/slices/selectSlice';
import { AppDispatch, RootState } from 'src/app/store/store';
import { getRandomTask } from '../../../features/getLink/model/slices/taskSlice';

const Select = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, selectedSpecialty } = useSelector((state: RootState) => state.select);
  const { uuid, isValid, documentId } = useSelector((state: RootState) => state.taskLink);

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
      <h1 style={{ fontSize: 32 }}>Выбор задания</h1>
      {specialties.length !== 0 ? (
        <>
          <h4 style={{ fontSize: 18, fontWeight: 300, marginBottom: 10}}>Специальность</h4>
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
            <div style={{ fontSize: 18, marginTop: 20, fontWeight: 300 }}>
              <p>Ссылка на задание: <a href={`http://localhost:3000/${documentId}`}>{`http://localhost:3000/${documentId}`}</a></p>
            </div>
          )}

          {!isValid && (
            <div style={{ fontSize: 18, marginTop: 20, fontWeight: 300 }}>
              <p>Нет доступной задачи или задача не загружена.</p>
            </div>
          )}
        </>
      ) : (
        <div style={{ fontSize: 18, marginTop: 20, fontWeight: 300 }}>
          Для выбора задания необходимо добавить хотя бы одну активную специальность и хотя бы одно активное задание для неё.
        </div>
      )}
    </Main>

  );
};

export { Select };
