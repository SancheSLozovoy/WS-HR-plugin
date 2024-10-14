import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { Button, SingleSelect, SingleSelectOption} from '@strapi/design-system';
import './Plugin.css'
const HomePage = () => {

  return (
    <Main className='main'>
        <SingleSelect>
            <SingleSelectOption value='frontend'>frontend</SingleSelectOption>
            <SingleSelectOption value='backend'>backend</SingleSelectOption>
        </SingleSelect>
        <Button>Сгенерировать ссылку на задание</Button>
    </Main>
  );
};

export { HomePage };
