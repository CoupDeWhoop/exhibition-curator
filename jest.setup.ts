import "@testing-library/jest-dom";
import { server } from "@/mocks/server";
import "whatwg-fetch";
import "jest-extended";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
