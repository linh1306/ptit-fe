import { Button, Flex } from "antd";
import { useRouter } from "next/navigation";
import { CaretLeftOutlined } from "@ant-design/icons";

interface ContainerProps {
  children: React.ReactNode;
  title: React.ReactNode | string;
  isShowBack?: boolean;
  suffix?: React.ReactNode;
}

export default function ContainerApp({
  children,
  title,
  isShowBack,
  suffix,
}: ContainerProps) {
  const route = useRouter();

  const handleBack = () => {
    route.back();
  };
  return (
    <Flex gap={12} vertical className="w-full">
      <Flex className="w-full block-style p-3" align="center" gap={8}>
        <Flex align="center" gap={8} className="w-full">
          <Button
            hidden={!isShowBack}
            className="rounded-full"
            icon={<CaretLeftOutlined />}
            onClick={handleBack}
          />
          {typeof title === "string" ? (
            <p className="text-lg font-medium">{title}</p>
          ) : (
            title
          )}
        </Flex>
        {suffix}
      </Flex>
      {children}
    </Flex>
  );
}
