import { ILesson } from "@app/type/schema.type";
import { createFetcher } from ".";

interface ILessonsResponse {
  data: ILesson[];
  total: number;
  page: number;
  limit: number;
}

interface ICreateLessonBody {
  title: string;
  content: string;
  subjectId: string;
  description?: string;
}

type IUpdateLessonBody = Pick<ILesson, 'name'>;

export default {
  getLessons: createFetcher<void, ILessonsResponse>("lessons", "get"),
  createLesson: createFetcher<ICreateLessonBody, ILesson>("lessons", "post"),
  getLessonById: createFetcher<void, ILesson>("lessons/:id", "get"),
  updateLesson: createFetcher<IUpdateLessonBody, ILesson>("lessons/:id", "post"),
  deleteLesson: createFetcher<void, void>("lessons/:id", "delete")
};