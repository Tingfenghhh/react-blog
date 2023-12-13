interface DataItem {
  label: string;
  value: string;
}

// 查询用户信息的返回值
interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  userPic: string;
  createTime: string;
  updateTime: string;
}

type GetUserInfoReturnData = BlogReturnData<UserInfo>;

// 更新用户头像参数
interface UpdateUserPicParams {
  avatarUrl: string;
}

// 更新用户信息参数
interface UpdateUserInfoParams {
  id: number;
  username: string;
  nickname: string;
  email: string;
}
