import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Main, Button, SingleSelect, SingleSelectOption, Box, Alert } from '@strapi/design-system';
import { loadSpecialties, setSelectedSpecialty } from '../model/slices/selectSlice';
import { AppDispatch, RootState } from 'src/app/store/store';
import { getRandomTask } from '../../../features/getLink/model/slices/taskSlice';
import { Crop } from '@strapi/icons';

const Select = () => {
  const dispatch: AppDispatch = useDispatch();
  const { specialties, selectedSpecialty } = useSelector((state: RootState) => state.select);
  const { uuid, isValid, documentId } = useSelector((state: RootState) => state.taskLink);
  const [alert, setAlert] = useState<boolean>(false);


  const link = useRef<HTMLAnchorElement>(null);

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

  const handleCopyLink = () => {
    if (link.current) {
      const linkText = link.current.href;
      navigator.clipboard.writeText(linkText)
        .then(() => {
          setAlert(true);
          setTimeout(() => setAlert(false), 2000)
        })
    }
  }

  return (
    <Main style={{ maxWidth: "733px" }} className='main'>
      <h1 className='main__title' style={{ fontSize: "32px", fontWeight: 400, lineHeight: "39px", marginBottom: "25px" }}>Выбор задания</h1>
      {specialties.length !== 0 ? (
        <>
          <h4 style={{ fontSize: "14px", fontWeight: 400, marginBottom: "20px" }}>Специальность</h4>
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
          <Button style={{ marginTop: "25px" }} onClick={handleGenerateLink}>
            Сгенерировать ссылку на задание
          </Button>

          {isValid && uuid && (
            <div style={{ fontSize: "14px", marginTop: "25px", fontWeight: 400, lineHeight: "17px", }}>
              <div style={{ marginBottom: "30px", display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: "15px" }}>Ссылка на страницу задания: <a ref={link} href={`http://localhost:3000/${documentId}`}>{`http://localhost:3000/${documentId}`}</a></p>
                <Crop onClick={handleCopyLink} style={{ cursor: 'pointer' }} />
              </div>
              <p style={{ marginBottom: '10px' }}>Скопируйте ссылку, чтобы отправить ее соискателю.</p>
              <p><span style={{ color: '#FE5815', fontWeight: 700 }}>Внимание!</span> Ссылка является одноразовой, поэтому не переходите по ней, во избежание ее инвалидации.</p>
            </div>
          )}

          {alert && (
            <Box style={{ width: '100%', marginTop: '20px', transition: '1s'}}>
              <Alert closeLabel="Закрыть уведомление">
              Ссылка скопирована
              </Alert>
            </Box>
          )}
        </>
      ) : (
        <div style={{ fontSize: "14px", marginTop: "25px", fontWeight: 400, lineHeight: "17px" }}>
          Для выбора задания необходимо добавить хотя бы одну активную специальность и хотя бы одно активное задание для неё.
        </div>
      )}
    </Main>

  );
};

export { Select };
