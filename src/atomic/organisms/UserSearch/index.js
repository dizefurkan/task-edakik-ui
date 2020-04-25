import React from 'react';
import axios from 'axios';

import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import Link from '../../atoms/Link';

import { debounce } from '../../../utils';

const baseURL = 'https://api.github.com/search/users?q=';
const UserSearch = () => {
  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const isDataExist = !!data.length;

  const onInputChange = value => setInputValue(value);

  const fetchUsers = () => {
    setStatus('pending');
    axios({
      url: baseURL + inputValue,
      method: 'GET'
    })
      .then(result => {
        console.log(result.data);
        if (result.data) {
          setStatus('resolved');
          setData(result.data.items);
        }
      })
      .catch(err => {
        setStatus('rejected');
        console.warn(err);
      });
  }

  React.useEffect(() => {
    fetchUsers();
  }, [inputValue]);

  console.log(data)
  return (
    <div>
      <Text type="title" text="Hey, let's find some GitHub User ha?" />
      <Input onChange={onInputChange} />
      {status === 'pending' && <Text text="Loading..." />}
      {isDataExist && status !== 'pending' &&
        <React.Fragment>
          <ul className="mt-3">
            {data.map(item => (
              <li>
                <Link to={`/detail/${item.login}`}>
                  <Image url={item.avatar_url} width="30px" height="30px" rounded />
                  <Text text={item.login} />
                </Link>
              </li>
            ))}
          </ul>
        </React.Fragment>
      }
    </div>
  )
}

export default UserSearch;