import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { notification } from "antd";
import { ITheme } from "@app/type/redux.type";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const timeDisplay = (date: string | Date) => {
  return dayjs(date).fromNow();
};

export const logout = () => {
  localStorage.removeItem("Authorization");
};

/**
 * Thay thế các placeholder trong chuỗi bằng các giá trị thực tế.
 *
 * @param template - Chuỗi chứa các placeholder dạng :key
 * @param params - Đối tượng chứa các cặp key-value để thay thế
 * @returns Chuỗi đã thay thế
 */
export function replaceDynamicPath(
  template: string,
  params: Record<string, string>
): string {
  return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    return params[key] || `:${key}`;
  });
}

/**
 * Tạo đường dẫn URL bằng cách thay thế các placeholder với giá trị từ mảng
 * 
 * @param template - Chuỗi template chứa các placeholder (vd: '/users/:id/posts/:postId')
 * @param values - Mảng các giá trị để thay thế theo thứ tự xuất hiện của placeholder
 * @returns Chuỗi đường dẫn đã được thay thế
 */
export function createPath(template: string, values?: string[]): string {
  if (!values || values.length === 0) {
    return template;
  }

  let result = template;
  let valueIndex = 0;

  // Sử dụng regex để tìm tất cả các placeholder trong template
  const placeholders = result.match(/:[a-zA-Z0-9_]+/g) || [];

  // Thay thế từng placeholder với giá trị tương ứng từ mảng values
  for (const placeholder of placeholders) {
    if (valueIndex < values.length) {
      result = result.replace(placeholder, String(values[valueIndex]));
      valueIndex++;
    } else {
      // Hết giá trị trong mảng values
      break;
    }
  }

  return result;
}

export function createToast(
  type: "success" | "error" | "warning" | "info" = "success",
  message: string,
) {
  notification[type]({
    message,
    placement: "topRight",
    duration: 5,
  });
}

export function getTheme(): ITheme {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = prefersDark ? "dark" : "light";
  localStorage.setItem("theme", defaultTheme);

  return defaultTheme;
};