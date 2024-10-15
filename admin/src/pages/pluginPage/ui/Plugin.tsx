import { Main } from '@strapi/design-system';
import { Select } from '../../../widgets/selectWidget';

const HomePage = () => {

  return (
    <Main style={{margin: 20}} className='main'>
        <h1 style={{fontSize: 32}}>Выбор задания</h1>
        <h4 style={{fontSize: 18}}>Специальность</h4>
        <Select/>
    </Main>
  );
};

export { HomePage };
