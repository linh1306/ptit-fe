import { useReduxData } from "@app/hooks/useReduxData.hook";
import { IKeySubScreen, subScreen } from "@app/route";
import { setSubScreen, openTab, closeTab } from "@app/store/slices/MenuSlice";
import { Avatar, Flex } from "antd";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import './index.scss'

export default function MenuSubScreen() {
  const dispatch = useDispatch();
  const { menu } = useReduxData();

  const handleChangeSubScreen = (subKey: IKeySubScreen) => {
    if (menu.subScreen === subKey && menu.isOpenTab) {
      handleCloseSubScreen();
    } else {
      dispatch(openTab());
      dispatch(setSubScreen(subKey));
    }
  };

  const handleCloseSubScreen = () => {
    dispatch(closeTab());
  };
  return (
    <Flex vertical className="absolute right-0 top-0 " align="center">
      <div className="relative menu-sub-screen">
        {Object.values(subScreen).map((item) => (
          <div key={item.key} className="h-5 hover:h-10 transition-all">
            <Avatar
              size="large"
              className={`${
                menu.subScreen === item.key ? "bg-slate-500" : "bg-slate-800"
              } border-2 border-white cursor-pointer`}
              onClick={() => handleChangeSubScreen(item.key)}
              src={item.icon}
            />
          </div>
        ))}
        {menu.isOpenTab && (
          <div className="">
            <Avatar
              size="large"
              className="bg-gray-400 border-2 border-white cursor-pointer"
              onClick={() => handleCloseSubScreen()}
              src={<CloseOutlined />}
            />
          </div>
        )}
      </div>
    </Flex>
  );
}
