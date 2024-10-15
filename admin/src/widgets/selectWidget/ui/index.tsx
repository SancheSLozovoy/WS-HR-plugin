import { Main } from '@strapi/design-system';
import { Button, SingleSelect, SingleSelectOption} from '@strapi/design-system';


const Select = () => {
  return (
    <Main  style={{width: "50%"}} className='main'>
        <SingleSelect>
            <SingleSelectOption value='frontend'>frontend</SingleSelectOption>
            <SingleSelectOption value='backend'>backend</SingleSelectOption>
        </SingleSelect>
        <Button style={{marginTop: 10 ,fontSize: 43}}>Сгенерировать ссылку на задание</Button>
    </Main>
  );
};

export { Select } ;
