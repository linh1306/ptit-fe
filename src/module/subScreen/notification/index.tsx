import { Avatar, Badge, Card, Flex, List, Segmented } from "antd";
import { SunOutlined, SunFilled } from "@ant-design/icons";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import { useDispatch } from "react-redux";
import { setTheme } from "@app/store/slices/SettingSlice";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import notificationApi from "@app/api/notification.api";
import { Loading } from "@app/components/loading";

export default function PNotification() {
  const { data: notifications, isLoading } = useAppQuery(
    notificationApi.getNotifications,
    {
      queryKey: ["notifications"],
    }
  );
  return (
    <Flex className="w-full" vertical>
      <List
        loading={{
          spinning: isLoading,
          indicator: <Loading />,
        }}
        dataSource={notifications}
        renderItem={(item) => (
          <Badge className="w-full" size="small" count={item.isRead ? "" : " "}>
            <List.Item
              className="cursor-pointer mb-3 bg-slate-50 rounded-md !px-3 shadow-md hover:bg-slate-100"
              key={item.id}
            >
              <List.Item.Meta
                avatar={<Avatar src={"/avatar.jpg"} />}
                title={"Hệ thống"}
                description={item.notification?.content}
              />
            </List.Item>
          </Badge>
        )}
      />
    </Flex>
  );
}
