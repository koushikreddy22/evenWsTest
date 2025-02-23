import React, { useState, useRef } from "react";
import { Box, Button, Divider, IconButton, TextField } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditSquare from '../../assets/editSquare.svg';

const MessageEditBox: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedTab, setSelectedTab] = useState<number | null>(null);
    const [inputText, setInputText] = useState("");

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth / 2;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={1} sx={{ width: "100%", border: "1px solid #DFE3EB", padding: "10px 10px" }}>
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => scroll("left")}>
                    <ArrowBackIcon />
                </IconButton>
                <Box
                    ref={scrollRef}
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" },
                        gap: 1,
                        flexGrow: 1,
                        maxWidth: "100%",
                    }}
                >
                    {[...Array(7)].map((_, index) => (
                        <Button
                            key={index}
                            variant={ "outlined"}
                            onClick={() => setSelectedTab(index)}
                            sx={{
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                minWidth: "120px",
                                color:"#666E7D",
                                borderColor: "#DFE3EB",
                            }}
                        >
                            Websocket request {index + 1}
                        </Button>
                    ))}
                </Box>
                <IconButton onClick={() => scroll("right")}>
                    <ArrowForwardIcon />
                </IconButton>
                <Divider
                    orientation="vertical"
                    sx={{ borderColor: "#DFE3EB", height: "24px", mx: 1 }}
                />

                <IconButton>
                    <img src={EditSquare} alt="Edit" />
                </IconButton>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Start a new message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                />

                <IconButton color="primary" disabled={!inputText.trim()}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageEditBox;
