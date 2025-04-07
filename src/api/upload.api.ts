import { IRes } from "@app/type/api.type";
import { fetcherFile } from ".";

export async function uploadImage(file: File): Promise<IRes<{ url: string }>> {
    const formData = new FormData();
    formData.append("image", file);

    return await fetcherFile<{ url: string }>({
        method: "POST",
        url: "/upload/image",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    });
}
