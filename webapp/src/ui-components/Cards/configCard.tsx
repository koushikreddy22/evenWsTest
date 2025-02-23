import React, { useRef, useState } from "react";
import { Box, TextField, Typography, Autocomplete, Grid } from "@mui/material";
import CardHeader from "../common/cardHeader";
import UploadDialog, { UploadDialogRef } from "../dialog-boxes/upload-dialog-box";
import { Message } from "@mui/icons-material";
import MessageEditBox from "../common/messageEditBox";

interface ConfigCardProps {
  serverConfig: {
    header: string;
    fields: {
      label: string;
      type: string;
      width: number
      options?: { label: string; value: string }[];
      placeholder?: string;
      columns?: { placeholder: string; name: string }[];
    }[];
  };
}

const TableComponent = ({ columns }: { columns: { placeholder: string; name: string }[] }) => {
  const [rows, setRows] = useState([{ cookieName: "", cookieValue: "" }]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { cookieName: "", cookieValue: "" }]);
  };

  return (
    <Box sx={{ width: "100%", paddingTop: "10px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", }}>
        <tbody >
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ border: "1px solid #ccc" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    value={row[col.name]}
                    onChange={(e) => handleChange(rowIndex, col.name, e.target.value)}
                    placeholder={col.placeholder}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Removes the border
                        },
                      },
                      "& .MuiInput-underline:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                    }}
                  />

                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

const ConfigCard: React.FC<ConfigCardProps> = ({ serverConfig }) => {
  const { header, fields } = serverConfig;

  const uploadDialogRef = useRef<UploadDialogRef>(null);

  return (
    <Box sx={{ flexGrow: 1, margin: "15px", border: "1px solid #DFE3EB", borderRadius: "8px" }}>
      <CardHeader header={header} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }} sx={{ padding: "10px" }}>
        {fields.map((field, index) => (
          <Grid key={index} item xs={2} sm={4} md={field?.width || 4}>
            <Box sx={{ textAlign: "left" }}>
              <Typography sx={{ fontWeight: "600" }}>
                {field.label}
              </Typography>
              {(() => {
                switch (field.type) {
                  case "script":
                    return <TextField variant="standard" placeholder={field.placeholder} fullWidth multiline minRows={20} sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Removes the border
                        },
                      },
                      "& .MuiInput-underline:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                    }} />
                  case "dropDown":
                    return (
                      <Autocomplete
                        options={field.options || []}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField {...params} placeholder={field.label} variant="standard" />
                        )}
                      />
                    );
                  case "messageBox":
                    return <MessageEditBox />
                  case "textField":
                    return <TextField fullWidth variant="standard" />;
                  case "file":
                    return (
                      <label
                        htmlFor="file-upload"
                        style={{ cursor: "pointer", display: "block", width: "100%" }}
                      >
                        <TextField
                          fullWidth
                          variant="standard"
                          onClick={(event) => uploadDialogRef.current?.openDialog(event)}
                          value={field.placeholder} // Placeholder sentence
                          slotProps={{
                            input: {
                              readOnly: true,
                              sx: { pointerEvents: "none" }, // Prevents text interception
                            },
                          }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: 50,
                              color: "#2160EB",
                              cursor: "pointer",
                            },
                            "& .MuiInput-underline:before": { borderBottom: "none" },
                            "& .MuiInput-underline:after": { borderBottom: "none" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                          }}
                        />
                        <UploadDialog ref={uploadDialogRef} />
                      </label>
                    );
                  case "table":
                    return <TableComponent columns={field.columns || []} />;
                  default:
                    return null;
                }
              })()}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ConfigCard;
