import { Button } from '@arco-design/web-react';
import { MiddleBox } from './style';
import { Link } from 'react-router-dom';

function MiddleContent() {
  return (
    <>
      <MiddleBox className='content-box'>
        <Button>
          <Link
            to='/select'
            style={{
              textDecoration: 'none',
            }}
          >
            select
          </Link>
        </Button>
      </MiddleBox>
    </>
  );
}

export default MiddleContent;
