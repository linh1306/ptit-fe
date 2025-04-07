import { Flex, Segmented } from "antd";
import { SunOutlined, SunFilled } from "@ant-design/icons";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import { useDispatch } from "react-redux";
import { setTheme } from "@app/store/slices/SettingSlice";

export default function PSetting() {
  const dispatch = useDispatch();
  const { setting } = useReduxData();

  const handleTheme = () => {
    dispatch(setTheme(setting.theme === "light" ? "dark" : "light"));
  };
  return (
    <Flex className="w-full" vertical>
      <Flex className="w-full" justify="end">
        <Segmented
          className="!bg-transparent"
          size="small"
          options={[
            {
              value: "light",
              icon: <SunOutlined className="text-black dark:text-white" />,
            },
            { value: "dark", icon: <SunFilled /> },
          ]}
          value={setting.theme}
          onChange={() => handleTheme()}
        />
      </Flex>
    </Flex>
  );
}
