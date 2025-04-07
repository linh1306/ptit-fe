import { Avatar, Flex, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { timeDisplay } from "@app/common";

export default function PSettingChatSubScreen() {
  const id = "user1";
  const mess = [
    {
      id: "12938",
      content: "Xin chao ban",
      sender: "user1",
      createdAt: new Date("2024-12-09T21:33:00"),
    },
    {
      id: "1293w8",
      content: "Ban co but khong",
      sender: "user1",
      createdAt: new Date("2024-12-09T21:33:00"),
    },
    {
      id: "1r2938",
      content: "minh can muon 2 ngay",
      sender: "user1",
      createdAt: new Date("2024-12-09T21:33:00"),
    },
    {
      id: "12r938",
      content: "Co ban",
      sender: "user2",
      createdAt: new Date("2024-12-09T21:33:00"),
    },
    {
      id: "12r9fg38",
      content: "Minh co but xanh thoi",
      sender: "user2",
      createdAt: new Date("2024-12-09T21:33:00"),
    },
    {
      id: "129r38",
      content: "Cho minh muon duoc khong, hai la ba bon nam sau",
      sender: "user1",
      createdAt: new Date("2024-12-09T21:33:00"),
    },
  ];

  return (
    <Flex vertical className="w-full" gap={10}>
      <Flex vertical className="flex-1" justify="end" gap={3}>
        {mess.map((item, index) => (
          <Flex
            vertical
            className="transition-all"
            key={item.id}
            align={item.sender === id ? "end" : "start"}
            justify="start"
          >
            <Flex
              gap={3}
              className="w-full"
              justify={item.sender === id ? "end" : "start"}
              align="end"
            >
              <div className="aspect-square w-8">
                <div
                  hidden={
                    item.sender === id ||
                    item.sender === mess[index - 1]?.sender
                  }
                >
                  <Avatar />
                </div>
              </div>
              <Flex vertical className="group max-w-[75%]" tabIndex={0}>
                <p
                  className={`group-focus:block hidden text-[10px] px-3 ${
                    item.sender === id ? "text-end" : "start"
                  }`}
                >
                  {timeDisplay(item.createdAt)}
                </p>
                <Flex className="rounded-2xl bg-slate-400 px-2 py-1">
                  <p>{item.content}</p>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Input className="rounded-3xl" suffix={<SendOutlined />} />
    </Flex>
  );
}
