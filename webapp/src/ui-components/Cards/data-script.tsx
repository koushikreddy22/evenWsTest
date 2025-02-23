import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import CardHeader from "../common/cardHeader";
import AddPackages from "../dialog-boxes/add-packages";
import { AddPackageDialogRef } from "../dialog-boxes/add-packages";
interface DataScriptsProps {
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

const DataScripts: React.FC<DataScriptsProps> = ({ serverConfig }) => {
    const { header, fields } = serverConfig;
    const [timer, setTimer] = useState(0);

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
                        <Box sx={{ padding: "10px", borderTop: "1px solid #DFE3EB", textAlign: "start" }}>
                            <Typography>{"Timeout (in seconds)"}{<input
                                type="number"
                                value={timer}
                                // onChange={handleChange}
                                min={0}
                                max={999}
                                style={{
                                    width: "60px",
                                    textAlign: "center",
                                }}
                            />}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default DataScripts;
