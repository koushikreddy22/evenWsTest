import { create } from "zustand";
import { TestConfig } from "./types";


const testConfig: TestConfig = {
  servers: [
    { name: "server-1", port: 8080 },
    { name: "server-2", port: 8081 },
    { name: "server-3", port: 8082 },
  ],
  repo: {
    name: "Dummy",
    path: "/home/praveen/praveenUnifo/even/evenWsTestDemo/",
    description: "Testing dummy websocket server",
    startCommand: "PORT=$$$$ npm run start",
    isSocketIo: false,
  },
  message: {
    recommendationMessages: {
      student_join: {
        action: "student_join",
        id: "SSN111",
        year: 3,
        section: "A",
        department: "CS",
      },
      professor_join: { action: "professor_join", id: "SSNProf111" },
      professor_broadcast: {
        action: "professor_broadcast",
        stuDepartment: "CS",
        stuYear: 3,
        stuSection: "A",
        message: "hii this is prof SSNProf111",
      },
      student_send: {
        action: "student_send",
        profId: "SSNProf111",
        message: "Hello Prof from SSN222",
      },
    },
    outboundMessageProcessor: {
      code: `const outboundMessageProcessor = (message) => {
  //Converts binary to json
  const decoder = new TextDecoder();
  const jsonString = decoder.decode(message);
  message = JSON.parse(jsonString);
  return message;
};`,
      packages: [],
    },
    inboundMessageProcessor: {
      code: `const inboundMessageProcessor = (message) => {
  //Converts json to binary
  const jsonString = JSON.stringify(message);
  const encoder = new TextEncoder();
  message = encoder.encode(jsonString);
  return message;
};`,
      packages: [],
    },
  },
  testSuites: [
    {
      name: "Test suite 1",
      description: "Test suite 1",
      id: "100",
      testCases: [
        {
          action: "addUser",
          id: "100-111",
          name: "user-1",
          server: "server-1",
          consumedBy: [],
        },
        {
          action: "addUser",
          id: "100-222",
          name: "user-2",
          server: "server-2",
          consumedBy: [
            {
              users: ["user-1"],
              message: "user-2 joined",
            },
          ],
        },
        {
          action: "addUser",
          id: "100-333",
          name: "user-3",
          server: "server-2",
          consumedBy: [
            {
              users: ["user-1", "user-2"],
              message: "user-3 joined",
            },
          ],
        },
        {
          action: "addUser",
          id: "100-444",
          name: "user-4",
          server: "server-3",
          consumedBy: [],
        },
        {
          action: "addUser",
          id: "100-555",
          name: "user-5",
          server: "server-3",
          consumedBy: [
            {
              users: ["user-4"],
              message: "user-5 joined",
            },
          ],
        },
        {
          action: "addUser",
          id: "100-666",
          name: "user-6",
          server: "server-1",
          consumedBy: [
            {
              users: ["user-4", "user-5"],
              message: "user-6 joined",
            },
          ],
        },
        {
          action: "sendMessage",
          id: "100-777",
          producedBy: {
            name: "user-1",
            message: "Hii this is user-1",
          },
          consumedBy: [
            {
              users: ["user-2", "user-3"],
              message: "Hii this is user-1",
            },
          ],
        },
        {
          action: "sendMessage",
          id: "100-888",
          producedBy: {
            name: "user-4",
            message: "Hii this is user-4",
          },
          consumedBy: [
            {
              users: ["user-5", "user-6"],
              message: "Hii this is user-4",
            },
          ],
        },
        {
          action: "removeUser",
          id: "100-999",
          name: "user-1",
          consumedBy: [
            {
              users: ["user-2", "user-3"],
              message: "User-1 left",
            },
          ],
        },
      ],
    },
    {
      name: "Test suite 2",
      description: "testing ws conditional send message",
      id: "222",
      testCases: [
        {
          action: "addUser",
          id: "222-111",
          name: "user-1",
          server: "server-1",
          consumedBy: [],
        },
        {
          action: "addUser",
          id: "222-222",
          name: "user-2",
          server: "server-2",
          consumedBy: [
            {
              users: ["user-1"],
              message: "user-2 joined",
            },
          ],
        },
        {
          action: "addUser",
          id: "222-333",
          name: "user-3",
          server: "server-2",
          consumedBy: [
            {
              users: ["user-1", "user-2"],
              message: "user-3 joined",
            },
          ],
        },
        {
          action: "addUser",
          id: "222-444",
          name: "user-4",
          server: "server-3",
          consumedBy: [],
        },
        {
          action: "addUser",
          id: "222-555",
          name: "user-5",
          server: "server-3",
          consumedBy: [
            {
              users: ["user-4"],
              message: "user-5 joined",
            },
          ],
        },
        {
          action: "addUser",
          id: "222-666",
          name: "user-6",
          server: "server-1",
          consumedBy: [
            {
              users: ["user-4", "user-5"],
              message: "user-6 joined",
            },
          ],
        },
        {
          action: "sendMessage",
          id: "222-777",
          producedBy: {
            name: "user-1",
            message: "Hii this is user-1",
          },
          consumedBy: [
            {
              users: ["user-2", "user-3"],
              message: "Hii this is user-1",
            },
          ],
        },
        {
          action: "sendMessage",
          id: "222-888",
          producedBy: {
            name: "user-4",
            message: "Hii this is user-4",
          },
          consumedBy: [
            {
              users: ["user-5", "user-6"],
              message: "Hii this is user-4",
            },
          ],
        },
        {
          action: "removeUser",
          id: "222-999",
          name: "user-1",
          consumedBy: [
            {
              users: ["user-2", "user-3"],
              message: "User-1 left",
            },
          ],
        },
      ],
    },
  ],
  totalTestCases: 18,
  initScript: ["sudo snap start redis"],
};

interface TestConfigState {
  testConfig: TestConfig;
  updateTestConfig: (newConfig: Partial<TestConfig>) => void;
}


export const useTestConfigStore = create<TestConfigState>((set) => ({
  testConfig: testConfig,
  updateTestConfig: (newConfig) => set((state) => ({
    testConfig: { ...state.testConfig, ...newConfig },
  })),
}));

