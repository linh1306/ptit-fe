import Config from '@app/config';
import { useReduxData } from "@app/hooks/useReduxData.hook";
import { Flex } from "antd";

export default function SubPage() {
  const { menu } = useReduxData();

  const pages =
    menu.subPages?.map((page) => {
      const Page = Config.SUB_PAGE[page.key];
      return <Page key={page.key} {...page.props} />;
    }) ?? [];

  return (
    <Flex
      hidden={pages.length === 0}
      vertical
      className="absolute top-0 w-full h-full"
    >
      <Flex className="relative w-full h-full">{pages}</Flex>
    </Flex>
  );
}
