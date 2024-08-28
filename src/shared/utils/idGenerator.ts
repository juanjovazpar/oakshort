import { nanoid } from 'nanoid';

export const idGenerator = (): string => nanoid(10);
