import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import CardHeader from "../common/cardHeader";
import AddPackages from "../dialog-boxes/add-packages";
import { AddPackageDialogRef } from "../dialog-boxes/add-packages";
interface MessageProcessorsProps{
    serverConfig: {
        header: string;
        fields: {
            label: string;
            type: string;
            width?: number;
            options?: { label: string; value: string }[];
            placeholder?: string;
        }[];
    };

}

const MessageProcessors: React.FC<MessageProcessorsProps> = ({serverConfig}) => {
    const { header, fields } = serverConfig;
    const addPackageDialogRef = useRef<AddPackageDialogRef>(null);

    interface OnChangeProps {
        (value: string): void;
    }

    const onChange: OnChangeProps = (value) => {
        console.log(value);
    }

    return (
        <Box sx={{ flexGrow: 1, margin: "15px", border: "1px solid #DFE3EB", borderRadius: "8px" }}>
            <CardHeader header={header} />
            <Box sx={{ display: "flex" }}>
                {/* <Box sx={{ textAlign: "left", width: "50%", padding: "20px", border: "1px solid #DFE3EB" }}>
                    <Typography sx={{ fontWeight: "600" }}>Inbound</Typography>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="const inboundMessageProcessor = (message) => { //Process message here return message}"
                        onChange={(e) => onChange(e.target.value)}
                        multiline
                        rows={20}
                        sx={{
                            "& .MuiInput-underline:before": { borderBottom: "none" },
                            "& .MuiInput-underline:after": { borderBottom: "none" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                        }}
                    />
                </Box> */}
                {fields.map((field) => (
                    <Box sx={{ textAlign: "left", width: field.width || "50%", border: "1px solid #DFE3EB" }}>
                        <Box sx={{ padding: "20px" }}>
                            <Typography sx={{ fontWeight: "600" }}>{field.label}</Typography>
                            <TextField
                                fullWidth
                                variant="standard"
                                placeholder={field.placeholder}
                                onChange={(e) => onChange(e.target.value)}
                                multiline
                                rows={20}
                                sx={{
                                    "& .MuiInput-underline:before": { borderBottom: "none" },
                                    "& .MuiInput-underline:after": { borderBottom: "none" },
                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                                }}
                            />
                        </Box>
                        <AddPackages ref={addPackageDialogRef} />
                        <Box sx={{ padding: "10px", borderTop: "1px solid #DFE3EB", textAlign: "start" }}>
                            <Button variant="outlined" onClick={(event) => addPackageDialogRef.current?.openDialog(event)}>
                                Import Packages
                            </Button>
                        </Box>
                    </Box>
                ))}
                {/* <Box sx={{ textAlign: "left", width: "50%", border: "1px solid #DFE3EB" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography sx={{ fontWeight: "600" }}>Outbound</Typography>
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder="const outboundMessageProcessor = (message) => { //Process message here return message}"
                            onChange={(e) => onChange(e.target.value)}
                            multiline
                            rows={20}
                            sx={{
                                "& .MuiInput-underline:before": { borderBottom: "none" },
                                "& .MuiInput-underline:after": { borderBottom: "none" },
                                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                            }}
                        />
                    </Box>
                    <AddPackages ref={addPackageDialogRef} />
                    <Box sx={{ padding: "10px", borderTop: "1px solid #DFE3EB", textAlign: "start" }}>
                        <Button variant="outlined" onClick={(event) => addPackageDialogRef.current?.openDialog(event)}>
                            Import Packages
                        </Button>
                    </Box>
                </Box> */}
            </Box>

            {/* Dialog component is placed outside to ensure it's rendered properly */}
        </Box>
    );
};

export default MessageProcessors;
