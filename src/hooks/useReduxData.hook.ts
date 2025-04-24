import { IRootState } from "@app/store";
import { useSelector } from "react-redux";

export const useReduxData = () => {
  const user = useSelector((state: IRootState) => state.user);
  const menu = useSelector((state: IRootState) => state.menu);
  const setting = useSelector((state: IRootState) => state.setting);

  return { user, menu, setting };
};
