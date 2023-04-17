import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import { Button, styled } from '@mui/material';
import Add from '@mui/icons-material/Add';
import React from 'react';
import { useState } from 'react';
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../../state';
import axios from 'axios';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});



const AddProduct = () => {
    const [open, setOpen] = useState(false);
    const [image, setImgae] = useState(false);
    const [files, setFiles] = useState([]);
    const [price, setPrice] = useState('');
    const [name, setName] = useState('')
    const token = useSelector((state) => state.token);
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();



    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (files.length > 0) {
            formData.append('image', files[0]);
            formData.append("imagePath", files[0].name);
        }
        const response = await axios.post("http://localhost:6001/product/add", formData, {
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const product = await response.data;

        dispatch(setProduct({ products: [product,...products] }));
        setOpen(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        multiple: false,
        onDrop: acceptedFiles => {
            setImgae(false)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const user = useSelector(state => state.user);


    return (
        <>
            <Tooltip onClick={e => setOpen(true)}
                title="Addpost" sx={{
                    position: "fixed",
                    bottom: 20,
                    left: { xs: "calc(50% - 25px)", md: 30 }
                }}>
                <Fab color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={e => { setOpen(false); setFiles([]) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={image || files[0] ? 450 : 300} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>
                    <Typography variant="h6" color="gray" textAlign="center">
                        Add product
                    </Typography>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        onChange={(e)=> setName(e.target.value)}
                    />
                    <TextField
                        id="outlined-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginTop: "1rem" }}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {
                        !files[0] &&
                        <Box {...getRootProps({ className: 'dropzone' })}
                            sx={{
                                ...(image === false && {
                                    display: "none",
                                }),
                                ...(image === true && {
                                    display: "flex",
                                }),
                            }}
                        >
                            <input {...getInputProps()} />
                            <Box
                                border={"2px dashed "}
                                sx={{
                                    padding: "3rem",
                                    marginTop: "1rem",
                                    textAlign: "center",
                                    "&:hover": { cursor: "pointer" }
                                }}>
                                <p>Add Picture Here</p>
                            </Box>
                        </Box>
                    }

                    {
                        files[0] &&
                        <Box>
                            <img src={files[0]?.preview} alt='' style={{
                                width: "10rem",
                                height: "10rem",
                                objectFit: "cover"
                            }}
                                onLoad={() => { URL.revokeObjectURL(files[0]?.preview) }} />
                        </Box>
                    }
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <ImageIcon onClick={e => setImgae(!image)} color="secondary" />
                    </Stack>
                    <Button
                        size="small"
                        fullWidth
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        <span>Add Product</span>
                    </Button>
                </Box>
            </StyledModal>
        </>
    );
};

export default AddProduct
