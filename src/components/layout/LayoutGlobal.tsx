"use client";
import React, { useEffect, useState } from "react";
import { Button, Flex, Layout, Menu } from "antd";
import authApi from "@app/api/auth.api";
import { usePathname, useRouter } from "next/navigation";
import Config from "@app/config/index.config";
import Container from "../loading";
import { useReduxData } from "@app/hooks/useReduxData.hook";
import { subScreen } from "@app/route";
import MenuSubScreen from "../menuSubScreen";
import { useDispatch } from "react-redux";
import { loginUser } from "@app/store/slices/UserSlice";
import { setTheme } from "@app/store/slices/SettingSlice";
import SubPage from "../subPage";
import { getMenuAdminItems, getMenuItems } from "@app/route/user.route";
import { MenuItem } from "@app/type/index.type";
import { getTheme } from "@app/common";
import useAppQuery from "@app/hooks/useAppQuery.hook";
import Aos from "aos";

const { Sider } = Layout;

export default function LayoutGlobal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const pathname = usePathname();
  const isLayoutAdmin = pathname?.startsWith("/admin");

  const dispatch = useDispatch();
  const router = useRouter();
  const { menu, setting } = useReduxData();

  useAppQuery(authApi.getMe, {
    queryKey: ["getMe"],
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
  });

  useEffect(() => {
    Aos.init({
      duration: 600,
      once: true,
    });
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

  const handleClickLogo = () => {
    router.push(Config.PATHNAME.HOME);
  };

  return (
    <Container>
      <Flex className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Flex
          className="flex-1 min-h-screen p-4 gap-4"
          style={{ minHeight: "100vh" }}
        >
          <Flex
            vertical
            className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg"
            justify="space-between"
          >
            <Sider
              className="bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700"
              collapsed={collapsed}
              width={240}
              collapsedWidth={80}
            >
              <div
                className="p-4 border-b border-gray-100 dark:border-gray-700"
                onClick={handleClickLogo}
              >
                <div className="font-semibold text-lg text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {collapsed ? "P" : "Ptiter"}
                </div>
              </div>
              <Menu
                theme={setting.theme === "dark" ? "dark" : "light"}
                selectedKeys={[pathname]}
                defaultSelectedKeys={["/"]}
                mode="inline"
                items={menuItems}
                onSelect={({ key }) => router.push(key)}
                className="border-none"
              />
            </Sider>
            <Button
              type="text"
              className="m-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? "→" : "←"}
            />
          </Flex>
          <Layout className="relative h-full flex-1 rounded-xl overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-200 shadow-lg">
            <div className="h-full p-6 transition-all overflow-y-auto">
              {children}
            </div>
            <MenuSubScreen />
          </Layout>
        </Flex>
        <Flex
          hidden={!menu.isOpenTab}
          className={`${
            !menu.isOpenTab ? "w-0" : "w-80"
          } transition-all p-4 pl-0`}
        >
          <Flex
            hidden={!menu.isOpenTab}
            className="relative bg-white dark:bg-gray-800 flex-1 rounded-xl overflow-hidden shadow-lg"
          >
            <Flex className="p-4 w-full h-full">
              {menu.subScreen && subScreen[menu.subScreen].component}
            </Flex>
            <SubPage />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
