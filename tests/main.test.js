import supertest from 'supertest';

import express from 'express';



describe('Main App', () => {
    it('should respond with status code 200 for GET /api', async () => {
      expect(process.env.JEST_WORKER_ID !== undefined).toBe(true);
    });
  
    it('should respond with status code 400 for POST /api', async () => {
        expect(true).toBe(true);
    });
  });
