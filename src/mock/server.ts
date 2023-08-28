import { setupServer } from 'msw/node'

export const server = setupServer()

export { rest } from 'msw'
