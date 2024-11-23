import { HTTPMethods } from 'fastify';

export const METHODS: Record<string, HTTPMethods> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
