import routes from '@/router';
import { IRoute } from '@/typings/router';
import { Menu } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuItem = Menu.Item;

function HeaderMenu() {
  const [menuData, setMenuData] = useState<IRoute[]>();
  const [selctedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();
  useEffect(() => {
    const menu: IRoute[] = [];
    routes.forEach((route) => {
      if (route.name === 'login') {
        menu.push(route);
      }
    });
    setMenuData(menu);
  }, [routes]);

  useEffect(() => {
    const key = location.pathname.split('/')[2];
    if (key) {
      setSelectedKeys([key]);
    } else {
      setSelectedKeys(['Home']);
    }
  }, [location]);

  const navigate = useNavigate();

  const goto = (val: IRoute) => {
    navigate(`/login/${val.key}`);
    setSelectedKeys([val.name]);
  };

  return (
    <>
      <div className='header-menu'>
        <Menu
          mode='horizontal'
          ellipsis={false}
          defaultSelectedKeys={['Home']}
          selectedKeys={selctedKeys}
        >
          {menuData &&
            menuData[0].children &&
            menuData[0].children.map((item) => {
              return (
                <MenuItem key={item.name} onClick={() => goto(item)}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    </>
  );
}

export default HeaderMenu;
