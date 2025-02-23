import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Popover, TextField, IconButton, Box, Typography } from "@mui/material";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import uploadButton from "../../assets/uploadButton.svg";
import { Close } from "@mui/icons-material";

export interface UploadDialogRef {
  openDialog: (event: React.MouseEvent<HTMLElement>) => void;
  closeDialog: () => void;
}

const UploadDialog = forwardRef<UploadDialogRef>((_, ref) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useImperativeHandle(ref, () => ({
    openDialog: (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    closeDialog: () => setAnchorEl(null),
  }));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box p={2} sx={{ width: 378 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Upload File</Typography>
          <IconButton onClick={() => setAnchorEl(null)}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Upload File as per the given Template or upload Async API Docs.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            onChange={handleFileChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px", // Adjusts border radius
                height: "34px",
                fontSize: "14px", // Adjust text size if needed
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px 14px", // Adjust padding for better alignment
              },
            }}
          />
          <IconButton>
            <img src={uploadButton} alt="upload" />
          </IconButton>
        </Box>

        <Box mt={2} display="flex" justifyContent="flex-end" alignItems={"center"}>
          <Typography sx={{color:"blue"}}>
          Download Template
          </Typography>
          <Button onClick={() => setAnchorEl(null)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={!file}>
            Done
          </Button>
        </Box>
      </Box>
    </Popover>
  );
});

export default UploadDialog;
