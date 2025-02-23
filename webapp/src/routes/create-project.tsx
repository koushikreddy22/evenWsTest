import { Box, Button, IconButton, Typography } from "@mui/material";
import Content from "../ui-components/Contents/Content"
import evenIcon from "../assets/evenLogo.svg"
import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Field {
    name: string;
    label: string;
    placeholder: string;
    width: string | number;
    type: string;
    options?: { label: string; value: string }[];
    columns?: { placeholder: string; name: string }[];
}

interface ServerConfig {
    type: string;
    header: string;
    fields?: Field[];
}

const MockserverConfig: ServerConfig[] = [
    {
        type: "card",
        header: "Project configuration",
        fields: [
            {
                name: "isSocketIo",
                label: "Type",
                placeholder: "Enter Type",
                width: 5.3,
                type: "dropDown",
                options: [{ label: "Socket Io", value: "socketIo" }, { label: "Web Sockets", value: "socketIo" }]
            },
            {
                name: "name",
                label: "Project Name",
                width: 5.3,
                placeholder: "Enter Project Name",
                type: "textField"
            },
            {
                name: "description",
                label: "Project description",
                width: 5.3,
                placeholder: "Enter Project description",
                type: "textField"
            }
        ]
    },
    {
        type: "card",
        header: "Server configuration",
        fields: [
            {
                name: "NoOfServers",
                label: "No of websocket servers to start",
                placeholder: "Enter No of websocket servers to start",
                width: 5.3,
                type: "dropDown",
                options: [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }]
            },
            {
                name: "projectPath",
                label: "Project path",
                width: 5.3,
                placeholder: "Enter Project path",
                type: "textField"
            },
            {
                name: "startCommand",
                label: "Start command",
                width: 5.3,
                placeholder: "Enter Start command",
                type: "textField"
            },
            {
                name: "servers",
                label: "Server Name",
                type: "table",
                width: 5.3,
                placeholder: "Table data", // Added placeholder to fix TypeScript error
                columns: [
                    { placeholder: "Server Name", name: "name" },
                    { placeholder: "Server Port", name: "port" }
                ]
            }
            // {
            //     name: "serverName",
            //     label: "Server Name",
            //     placeholder: "Enter Server Name",
            //     type: "textField"
            // },
            // {
            //     name: "serverPort",
            //     label: "Server port",
            //     placeholder: "Enter Server port",
            //     type: "textField"
            // }
        ]
    },
    {
        type: "card",
        header: "Message configurations",
        fields: [
            {
                name: "uploadMessages",
                label: "Upload Messages",
                placeholder: "Click here to Upload",
                width: 5.3,
                type: "file"
            }
        ]
    },
    {
        type: "messageProcessor",
        header: "Message Processors",
        fields: [
            {
                name: "inboundMessageProcessor",
                label: "Inbound",
                width: "50%",
                placeholder: "const inboundMessageProcessor = (message) => {\n //Process message here\n return message\n}",
                type: "textField"
            },
            {
                name: "outboundMessageProcessor",
                label: "Outbound",
                width: "50%",
                placeholder: "const inboundMessageProcessor = (message) => {\n //Process message here\n return message\n}",
                type: "textField"
            }
        ]
    },
    {
        type: "scripts",
        header: "Data scripts",
        fields: [
            {
                name: "initScript",
                label: "Init",
                width: "50%",
                placeholder: "sudo snap start redis\ncd ../evenOs && npm run dev\nkafka-server-start.sh",
                type: "script"
            },
            {
                name: "cleanUpScript",
                label: "Cleanup",
                width: "50%",
                placeholder: "sudo snap start redis\ncd ../evenOs && npm run dev\nkafka-server-start.sh",
                type: "script"
            }
        ]
    }
];

export default function CreatePage() {
    return (
        <Box >
            <Box sx={{ borderBottom: "1px solid #DFE3EB", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 25px 10px 35px" }}>
                <Box
                    key="menu-dropdown-tab"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center",
                        width: "80px",
                        position: 'relative',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: 1 }}>
                            <img src={evenIcon} alt="Menu" />
                            <Typography variant="caption" sx={{ color: "black", fontSize: "12px", fontWeight: 600 }}>
                                Even
                            </Typography>
                            {/* <KeyboardArrowDown fontSize="small" /> */}
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                    <Link to="/add-test-cases">
                        <Button variant="outlined" >
                            Import project
                        </Button>
                    </Link>
                </Box>

            </Box>
            <Box sx={{ padding: "10px" }}>
                <Content serverConfig={MockserverConfig} />
            </Box>
            <Box
                sx={{
                    border: "1px solid #DFE3EB",
                    position: "fixed",
                    //   left: "clamp(300px, 20%, 400px)", 
                    width: "100%",
                    padding: "10px",
                    bottom: 0,
                    backgroundColor: "#fff",
                    textAlign: "end"
                }}
            >
                <Box>
                    <Link to="/add-test-cases">
                        <Button sx={{ marginLeft: "20px" }} variant="contained" color="secondary">
                            Create New tests
                        </Button>
                    </Link>

                </Box>
            </Box>

        </Box>
    )

}
