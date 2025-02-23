import { create } from "zustand";
import { TestConfig } from "./types";


const testConfig: TestConfig = {
  servers: [
    { name: "server-1", port: 8080 },
    { name: "server-2", port: 8081 },
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
      description: "When a student is added/leaves other students should receive message.",
      id: "100",
      testCases: [
        {
          action: "addUser",
          testId: "100-1",
          userName: "SSN111",
          server: "server-1",
          consumedBy: [],
          addUserMessage:{"action": "student_join","id": "SSN111","year": 3,"section": "A","department": "CS"},
          timeOut:5
        },
        {
          action: "addUser",
          testId: "100-2",
          userName: "SSN222",
          server: "server-1",
          consumedBy: [{  users: ["SSN111"],message: {"action": "student_join","id": "SSN222","year": 3,"section": "A","department": "CS"}}],
          addUserMessage:{"action": "student_join","id": "SSN222","year": 3,"section": "A","department": "CS"},
          timeOut:5
        }
      ],
    }
  ],
  totalTestCases: 18,
  dataScript: {
    init: `sudo snap start redis`,
    cleanUp: `sudo snap stop redis`,
    initTimeout: 5,
    cleanUpTimeout: 5
  } 
};
interface TestConfigState {
  testConfig: TestConfig;
  updateTestConfig: (newConfig: Partial<TestConfig>) => void;
  onFieldChange: (value: any, path: string, key: string) => void;
}


export const useTestConfigStore = create<TestConfigState>((set) => ({
  testConfig: testConfig,
  updateTestConfig: (newConfig) =>
    set((state) => ({
      testConfig: { ...state.testConfig, ...newConfig },
    })),
  
  onFieldChange: (value, path, key) => {
    console.log(value, path, key);
    set((state) => {
      const updatedConfig = { ...state.testConfig };
      const keys = path.split(".");
      let current: any = updatedConfig;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; // Ensure the path exists
        current = current[keys[i]];
      }

      const lastKey = keys[keys.length - 1];

      if (key === "length" && Array.isArray(current[lastKey])) {
        let arr = current[lastKey];
        value = parseInt(value || 0, 10);

        if (arr.length < value) {
          while (arr.length < value) {
            arr.push({ server: "", port: "" });
          }
        } else if (arr.length > value) {
          arr.splice(value);
        }
      } else {
        if (typeof current[lastKey] === "object" && current[lastKey] !== null) {
          current[lastKey][key] = value;
        } else {
          current[lastKey] = { [key]: value };
        }
      }

      return { testConfig: updatedConfig };
    });
  },
}));


