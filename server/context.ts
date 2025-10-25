import type { IncomingMessage } from "http";
import {db} from '@/db/index'

export type Context = {
  req?: IncomingMessage;
  db: typeof db;
};

export const createContext = ({ req }: { req?: IncomingMessage } = {}) : Context => {
  return { req, db };
};
