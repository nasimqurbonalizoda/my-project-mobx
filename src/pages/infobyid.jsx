import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const API = "http://localhost:3000/users";

const InfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getinfo = async () => {
            try {
                const res = await fetch(`${API}/${id}`);
                const data = await res.json();
                setInfo(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getinfo();
    }, [id]);

    if (loading) {
        return null
    }

    return (
        <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
            <Card elevation={6}>
                <CardContent sx={{ pt: 4 }}>
                    <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                        {info?.name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" paragraph>
                        {info?.age}
                    </Typography>

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Chip
                            label={info?.status ? "Active" : "Inactive"}
                            color={info?.status ? "success" : "warning"}
                            size="large"
                            sx={{ fontWeight: "bold", px: 1 }}
                        />
                    </Box>
                </CardContent>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mt: 3 }}
                >
                    go Back
                </Button>
            </Card>
        </Box>
    );
};

export default InfoPage;