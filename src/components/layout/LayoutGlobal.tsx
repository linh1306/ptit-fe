"use client";
import React, { useEffect, useState } from "react";
import { Button, Flex, Layout, Menu } from "antd";
import authApi from "@app/api/auth.api";
import { usePathname, useRouter } from "next/navigation";
import Config from '@app/config';
import Container from "../loading";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import { subScreen } from "@app/route";
import MenuSubScreen from "../menuSubScreen";
import { useDispatch } from "react-redux";
import { loginUser } from "@app/store/slices/UserSlice";
import { setTheme } from "@app/store/slices/SettingSlice";
import SubPage from "../subPage";
import { getMenuAdminItems, getMenuItems } from "@app/route/user.route";
import useApiMutation from "@app/hooks/useApiMutation.hook";
import { MenuItem } from "@app/type/index.type";
import { getTheme } from "@app/common";

const { Sider } = Layout;

export default function LayoutGlobal({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();
  const isLayoutAdmin = pathname?.startsWith("/admin");


  const dispatch = useDispatch();
  const router = useRouter();
  const { menu, setting } = useReduxData();
  const { mutate: getMe } = useApiMutation(authApi.getMe, {
    onSuccess: ({ data }) => {
      dispatch(loginUser({ user: data }));
      if (isLayoutAdmin) {
        setMenuItems(getMenuAdminItems(data.role));
      } else {
        setMenuItems(getMenuItems(data.role));
      }
    },
    onError: () => {
      router.push(Config.PATHNAME.SIGNIN);
    },
    setQueryData: {
      queryKey: ['user']
    },
  });

  useEffect(() => {
    getMe({});

    if (setting.theme) {
      const theme = getTheme();
      dispatch(setTheme(theme));
    }
  }, []);

  useEffect(() => {
    if (setting.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [setting.theme]);

  return (
    <Container>
      <Flex className="h-screen w-screen overflow-hidden bg-blue-100">
        <Flex
          className="flex-1 min-h-screen p-3 gap-3"
          style={{ minHeight: "100vh" }}
        >
          <Flex
            vertical
            className="rounded-lg overflow-hidden bg-bg-light dark:bg-bg-dark"
            justify="space-between"
          >
            <Sider className="bg-bg-light dark:bg-bg-dark" collapsed={collapsed}>
              <Menu
                theme='light'
                selectedKeys={[pathname]}
                defaultSelectedKeys={["/"]}
                mode="inline"
                items={menuItems}
                onSelect={({ key }) => router.push(key)}
              />
            </Sider>
            <Button className="m-2" onClick={() => setCollapsed(!collapsed)}>
              dh
            </Button>
          </Flex>
          <Layout className="relative h-full flex-1 rounded-lg overflow-y-auto p-3 bg-bg-light dark:bg-bg-dark dark:text-text-dark">
            <div className="h-[200px] transition-all">{children}</div>
            <MenuSubScreen />
          </Layout>
        </Flex>
        <Flex
          hidden={!menu.isOpenTab}
          className={`${!menu.isOpenTab ? "w-0" : "w-80"
            } transition-all p-3 pl-0`}
        >
          <Flex
            hidden={!menu.isOpenTab}
            className="relative bg-bg-light dark:bg-bg-dark flex-1 rounded-lg overflow-hidden"
          >
            <Flex className="p-3 w-full h-full">
              {subScreen[menu.subScreen ?? "CHAT"].component}
            </Flex>
            <SubPage />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}