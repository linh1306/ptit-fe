import { ILesson, ISubject, TLesson } from "@app/type/schema.type";
import { createFetcher } from ".";

export interface ICreateSubjectBody {
  name: string;
  code: string;
}

export interface IUpdateSubjectBody {
  name?: string;
  code?: string;
}

export interface ICreateLessonBody {
  name: string;
  type: TLesson;
}

export default {
  getSubjects: createFetcher<void, ISubject[]>("subjects", "get"),
  createSubject: createFetcher<ICreateSubjectBody, ISubject>("subjects", "post"),
  getSubjectById: createFetcher<void, ISubject>("subjects/:id", "get"),
  getLessons: createFetcher<void, ILesson[]>("subjects/:id/lessons", "get"),
  createLesson: createFetcher<ICreateLessonBody, ISubject>("subjects/:id/lessons", "post"),
  updateSubject: createFetcher<IUpdateSubjectBody, ISubject>("subjects/:id", "put"),
  deleteSubject: createFetcher<void, void>("subjects/:id", "delete")
};