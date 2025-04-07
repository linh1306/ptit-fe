export enum ROLE {
  user = "user",
  admin = "admin",
  superAdmin = "superAdmin"
}

export enum TGroupChat {
  classroom = "classroom",
  community = "community",
  group = "group"
}

export enum TLesson {
  document = "document",
  multiple_choice = "multiple_choice"
}

export enum TStatusUser {
  banned = "banned",
  active = "active",
  pending = "pending"
}

export interface IUser {
  id: string;
  code: string;
  email: string;
  name: string;
  date_of_birth?: string;
  course: string;
  password: string;
  role: ROLE;
  groupChatIds: string[];
  urlImage?: string;
  status: TStatusUser;
  adminGroupChat?: IGroupChat[];
  messages?: IMessage[];
  post?: IPost[];
  comments?: IComment[];
  groupChats?: IGroupChat[];
}

export interface ISubject {
  id: string;
  code: string;
  name: string;
  lessons?: ILesson[];
}

export interface ILesson {
  id: string;
  name: string;
  subjectId: string;
  subject?: ISubject;
  type: TLesson;
  lessonMultipleChoice?: ILessonMultipleChoice;
  lessonDocument?: ILessonDocument;
}

export interface ILessonDocument {
  id: string;
  lessonId: string;
  lesson?: ILesson;
  content: string;
}

export interface ILessonMultipleChoice {
  id: string;
  lessonId: string;
  lesson?: ILesson;
  question: string;
  answer: string[];
  answerTrue: string[];
}

export interface IGroupChat {
  id: string;
  name?: string;
  isGroup: boolean;
  type: TGroupChat;
  adminId: string;
  userIds: string[];
  messages?: IMessage[];
  lastMessage?: string;
  lastMessageTime: string;
  users?: IUser[];
  admin?: IUser;
}

export interface IMessage {
  id: string;
  senderId: string;
  groupChatId: string;
  content: string;
  createdAt: string;
  sender?: IUser;
  groupChat?: IGroupChat;
}

export interface IPost {
  id: string;
  content: string;
  userId: string;
  likes: string[];
  comments?: IComment[];
  user?: IUser;
}

export interface IComment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  tags: string[];
  post?: IPost;
  user?: IUser;
}

export interface IUserNotification {
  id: string;
  userId: string;
  notificationId: string;
  isRead: boolean;
  createdAt: string;
  notification?: INotification;
}

export interface INotification {
  id: string;
  content: string;
  url: string;
  users?: IUserNotification[];
}
