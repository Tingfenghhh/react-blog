import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  Button,
  Dropdown,
  Form,
  FormInstance,
  Grid,
  Input,
  Menu,
  Message,
  Space,
} from '@arco-design/web-react';
import { changeTheme } from '@/store/modules/user';
import { useEffect, useState } from 'react';
import { IconMoonStyled, IconSunStyled, UserInfoMotion } from '../style';
import { useNavigate } from 'react-router-dom';
import { useMyAxios } from '@/apis/intercept';
import {
  getUserInfoConfig,
  updateAvatarConfig,
  updateUserInfoConfig,
} from '@/apis/user';
import CustomModal from '@/components/modal';
import UploadImg from '@/components/upload/upload-img';
import { UploadItem } from '@arco-design/web-react/es/Upload';

const FormItem = Form.Item;
const Row = Grid.Row;
const Col = Grid.Col;
type MyFormRef = FormInstance<FormData, string, keyof FormData>;

interface FormData {
  username: string;
  nickname: string;
  email: string;
}
interface EditUserInfoProps {
  userData: UserInfo | undefined;
  isValidate: (val: boolean) => void;
  returnData: (val: FormData & { imgUrl: string }) => void;
}

// 编辑个人资料
function EditUserInfo(Props: EditUserInfoProps) {
  const [fromRef, setFromRef] = useState<MyFormRef>();
  const [imgUrl, setImgUrl] = useState<string>(Props.userData?.userPic ?? '');
  const [FormValue, setFormValue] = useState<FormData>({
    username: '',
    nickname: '',
    email: '',
  });
  const defaultImg: UploadItem[] = [
    {
      uid: '-1',
      name: 'img',
      url: Props ? Props.userData?.userPic : '',
    },
  ];

  // 获新的url
  const getNewUrl = (val: any) => {
    setImgUrl(val);
    Props.returnData({ ...FormValue, imgUrl: val });
  };

  // 获取表单的值
  const getFormValue = () => {
    if (fromRef) {
      fromRef
        .validate()
        .then((_res) => {
          setFormValue(_res);
          Props.returnData({ ..._res, imgUrl });
          Props.isValidate(true);
        })
        .catch((err) => {
          Props.isValidate(false);
          throw new Error(err);
        });
    }
  };

  useEffect(() => {
    if (fromRef) {
      fromRef
        .validate()
        .then((_res) => {
          setFormValue(_res);
          Props.isValidate(true);
        })
        .catch((err) => {
          Props.isValidate(false);
          throw new Error(err);
        });
    }
  }, [fromRef]);

  useEffect(() => {
    if (Props.userData) {
      setFormValue({
        username: Props.userData.username,
        nickname: Props.userData.nickname,
        email: Props.userData.email,
      });
    }
  }, [Props.userData]);

  return (
    <>
      <Row>
        {/* 左侧头像 */}
        <Col span={6} offset={1}>
          <Space direction={'vertical'} style={{ height: '100%' }}>
            <span>头像</span>
            <UploadImg
              listType={'picture-card'}
              defaultValue={defaultImg}
              limit={1}
              returnUrl={(val) => getNewUrl(val)}
            />
          </Space>
        </Col>
        {/* 右侧信息 */}
        <Col span={14} offset={1}>
          <Form
            ref={(ref) => setFromRef(ref ?? undefined)}
            autoComplete='off'
            layout={'vertical'}
            requiredSymbol={false}
            initialValues={{
              username: Props ? Props.userData?.username : '',
              nickname: Props ? Props.userData?.nickname : '',
              email: Props ? Props.userData?.email : '',
            }}
            onValuesChange={() => getFormValue()}
          >
            <FormItem
              label='用户别名'
              field='nickname'
              rules={[{ required: true, message: '用户别名不可以为空' }]}
            >
              <Input placeholder='请输入用户别名' />
            </FormItem>
            <FormItem
              label='用户邮箱'
              field='email'
              rules={[{ required: true, message: '用户邮箱不可以为空' }]}
            >
              <Input placeholder='请输入用户邮箱' />
            </FormItem>
          </Form>
        </Col>
      </Row>
    </>
  );
}

function UserInfo() {
  const dispatch = useAppDispatch();
  const isLight = useAppSelector((state) => state.user.theme);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [formDataIsValidate, setFormDataIsValidate] = useState(false);
  const [userInfoData, setUserInfoData] = useState<
    FormData & { imgUrl: string }
  >({ username: '', nickname: '', email: '', imgUrl: '' });
  const [editUserLoading, setEditUserLoading] = useState(false);
  const [themeName, setThemeName] = useState('暗黑模式');
  const navigate = useNavigate();
  const change = () => {
    dispatch(changeTheme(isLight === 'light' ? 'dark' : 'light'));
  };

  // 查询用户信息
  const [{ data }, GetUserInfoRun] = useMyAxios<GetUserInfoReturnData>(
    getUserInfoConfig.config,
    getUserInfoConfig.options,
  );
  // 更新用户头像
  const [{ loading }, UpdateUserPicRun] = useMyAxios<
    BlogReturnData<string>,
    UpdateUserPicParams
  >(updateAvatarConfig.config, updateAvatarConfig.options);

  // 更新用户信息

  const [{ loading: UpdateLoading }, UpdateUserInfoPicRun] = useMyAxios<
    BlogReturnData<string>,
    UpdateUserInfoParams
  >(updateUserInfoConfig.config, updateUserInfoConfig.options);

  const editUserInfo = () => {
    setIsOpen(true);
  };

  const logOut = () => {
    localStorage.removeItem('Blogtoken');
    Message.success('退出成功');
    navigate('/');
  };

  const checkValidate = (val: boolean) => {
    setFormDataIsValidate(val);
  };

  const saveUserInfoData = (val: FormData & { imgUrl: string }) => {
    setUserInfoData(val);
  };

  const ok = async () => {
    if (formDataIsValidate) {
      // 更新用户头像
      const res = await UpdateUserPicRun({
        params: {
          avatarUrl: userInfoData.imgUrl,
        },
      });
      // 更新用户信息
      const resInfo = await UpdateUserInfoPicRun({
        data: {
          id: userInfo?.id,
          username: userInfoData.username,
          nickname: userInfoData.nickname,
          email: userInfoData.email,
        },
      });
      if (res.data.code === 0 && resInfo.data.code === 0) {
        Message.success('更新成功');
        setIsOpen(false);
        GetUserInfoRun();
      }
      return;
    }
    Message.error('请检查表单是否填写完整');
  };

  const dropList = (
    <Menu>
      <Menu.Item key='1' onClick={editUserInfo}>
        编辑资料
      </Menu.Item>
      <Menu.Item key='2' onClick={logOut}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (loading || UpdateLoading) {
      setEditUserLoading(true);
      return;
    }
    setEditUserLoading(false);
  }, [loading, UpdateLoading]);

  useEffect(() => {
    GetUserInfoRun();
  }, []);

  useEffect(() => {
    if (data && data.code === 0) {
      setUserInfo(data.data);
    }
  }, [data]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme !== 'light') {
      document.body.setAttribute('arco-theme', 'dark');
      setThemeName('暗黑模式');
      return;
    }
    document.body.removeAttribute('arco-theme');
    setThemeName('亮色模式');
  }, [isLight]);

  return (
    <>
      <UserInfoMotion className='UserInfoMotion'>
        <Space
          size={15}
          style={{
            backdropFilter: 'blur(20px)',
          }}
        >
          <Button
            shape='round'
            type='text'
            icon={isLight !== 'light' ? <IconMoonStyled /> : <IconSunStyled />}
            onClick={() => change()}
          >
            <span className='theme-btn'> {themeName}</span>
          </Button>

          <Dropdown droplist={dropList} position='bl'>
            <img
              width={30}
              height={30}
              src={userInfo ? userInfo.userPic : ''}
              style={{ borderRadius: '50%' }}
              alt='logo'
            />
          </Dropdown>
        </Space>
      </UserInfoMotion>
      <CustomModal
        title='编辑个人资料'
        secondConfirm={true}
        secondConfirmTitle='是否退出编辑'
        isOpen={isOpen}
        confirmLoading={editUserLoading}
        children={EditUserInfo({
          userData: userInfo,
          isValidate: (val: boolean) => checkValidate(val),
          returnData: (val: FormData & { imgUrl: string }) =>
            saveUserInfoData(val),
        })}
        onClose={() => setIsOpen(false)}
        onOk={() => ok()}
      />
    </>
  );
}

export default UserInfo;
