import { Box, Button} from "@mui/material";
import Content from "../ui-components/Contents/Content"
import LeftNav from "../ui-components/leftNav/LeftNav";

interface Field {
    name: string;
    label: string;
    placeholder: string;
    fullwidth?: boolean;
    type: string;
    options?: { label: string; value: string }[];
}

interface ServerConfig {
    type: string;
    header: string;
    fields?: Field[];
}

const MockserverConfig: ServerConfig[] = [
    {
        type: "card",
        header: "Test suite",
        fields: [
            {
                name: "projectName",
                label: "Name",
                placeholder: "Enter Type",
                type: "dropDown",
                options: [{ label: "Socket Io", value: "socketIo" }]
            },
            {
                name: "projectDescription",
                label: "PDescription",
                placeholder: "Enter description",
                type: "textField"
            },
        ]
    },
    {
        type: "card",
        header: "User Addition",
        fields: [
            {
                name: "testCaseName",
                label: "Test case Name",
                placeholder: "Enter Test case Name",
                type: "dropDown",
                options: [{ label: "Socket Io", value: "socketIo" }]
            },
            {
                name: "timeOut",
                label: "Time out",
                placeholder: "Enter Time out",
                type: "textField"
            },
            {
                name: "name",
                label: "Name",
                placeholder: "Enter Name",
                type: "textField"
            },
            {
                name: "server",
                label: "Server",
                placeholder: "Enter Server",
                type: "textField"
            },
            {
                name: "uploadMessages",
                label: "Upload Messages",
                fullwidth: true,
                placeholder: "Click here to Upload",
                type: "messageBox"
            }
        ]
    },
    {
        type: "messageProcessor",
        header: "Message Processors"
    }
];
const navItems = [
    {
        fileName: "Web-socket-Server-Version-1",
        ports: [
            { number: 1001, name: 'server1' },
            { number: 1002, name: 'server1' },
            { number: 1003, name: 'server1' }
        ]
    },
    {
        fileName: "Web-socket-Server-Version-2",
        ports: [
            { number: 2001, name: 'server1' },
            { number: 2002, name: 'server2' },
            { number: 2003, name: 'server3' }
        ]
    },
    {
        fileName: "Web-socket-Server-Version-3",
        ports: [
            { number: 3001, name: 'server1' },
            { number: 3002, name: 'server2' },
            { number: 3003, name: 'server3' }
        ]
    }
];
export default function CreateTestCases() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Left Navigation Panel */}
            <div style={{ width: "20%", minWidth: "300px" }}>
                <LeftNav items={navItems} />
            </div>

            {/* Main Content */}
            <div style={{ width: "80%", minWidth: "400px", textAlign: "center", backgroundColor: "#fff", overflow: "auto" }}>
            <Content serverConfig={MockserverConfig} />

            </div>
            <div>
                {/* Bottom Control Panel */}
                <Box
                    sx={{
                        border: "1px solid #DFE3EB",
                        position: "fixed",
                        left: "clamp(300px, 20%, 400px)",
                        width: "clamp(400px, 80%, calc(100% - 300px))",
                        padding: "10px",
                        bottom: 0,
                        backgroundColor: "#fff",
                        textAlign: "end"
                    }}
                >
                    <Box>
                        <Button variant="outlined" color="primary">
                            Save
                        </Button>
                        <Button sx={{ marginLeft: "20px" }} variant="contained" color="secondary">
                            Start
                        </Button>
                    </Box>
                </Box>
            </div>
        </div >
    )

}
