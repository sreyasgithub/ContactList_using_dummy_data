import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  NativeSelect,
  InputAdornment,
  Button,
} from "@material-ui/core";
import Layout from "./Layout";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailIcon from "@material-ui/icons/Mail";
import nextId from "react-id-generator";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../components/Dialog";
const CreateContact = () => {
  const LOCAL_STORAGE_KEY = "contacts";
  const [ID, setID] = useState(nextId());
  const [initialId, setInitialId] = useState("");
  const contactInitialState = {
    id: initialId,
    firstName: "",
    lastName: "",
    gender: "",
    category: "",
    email: "",
    mobile: "",
  };
  const [contact, setContact] = useState(contactInitialState);
  const [contactsList, setContactsList] = useState([]);
  const { id, firstName, lastName, gender, category, email, mobile } =
    contactsList;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // error handler states

  const [fNameError, setFNameError] = useState("");
  const [lNameError, setlNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const Navigate = useNavigate();
  const handleInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  console.log("error", firstName);
  const handleSubmit = (e) => {
    e.preventDefault();
    setID(nextId());

    console.log("contact", Object.values(contact));
    setContactsList([...contactsList, { ...contact, id: ID }]);

    setInitialId(ID);
    let empty;
    let i;
    function itirate() {
      for (i = 1; i < Object.values(contact).length; i++) {
        if (Object.values(contact)[i] == "") {
          empty = true;
        }
      }
      return empty;
    }
    console.log("fname", empty);
    let isEmpty = itirate();
    if (isEmpty) {
      alert("all fields are required");
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    const retrievData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrievData) {
      setContactsList(retrievData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contactsList));
  }, [contactsList]);

  console.log(contactsList);

  return (
    <Layout header="Create Contact">
      <Box className="edit_contact_container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <TextField
                name="firstName"
                placeholder="First Name"
                classes={{
                  root: "filled_input_root",
                }}
                onChange={(e) => handleInputChange(e)}
              />

              {Object.keys(fNameError).map((key) => {
                return (
                  <small key={key} className="error">
                    {fNameError[key]}
                  </small>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <TextField
                name="lastName"
                placeholder="Last Name"
                classes={{
                  root: "filled_input_root",
                }}
                onChange={(e) => handleInputChange(e)}
              />
              {Object.keys(lNameError).map((key) => {
                return (
                  <small key={key} className="error">
                    {lNameError[key]}
                  </small>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <NativeSelect
                name="gender"
                placeholder="Gender"
                classes={{ root: "select_input_root" }}
                onChange={(e) =>
                  setContact({ ...contact, gender: e.target.value })
                }
              >
                <option value="Select" className="placeholder">
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </NativeSelect>
              {Object.keys(genderError).map((key) => {
                return (
                  <small key={key} className="error">
                    {genderError[key]}
                  </small>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box>
              <NativeSelect
                name="category"
                placeholder="Category"
                onChange={(e) =>
                  setContact({ ...contact, category: e.target.value })
                }
              >
                <option value="Select">Select Category</option>
                <option value="Personal">Personal Contact</option>
                <option value="Buissness">Buissness Contact</option>
              </NativeSelect>
              {Object.keys(categoryError).map((key) => {
                return (
                  <small key={key} className="error">
                    {categoryError[key]}
                  </small>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box className="custom_input">
              <Box className="input_icon">
                <PhoneAndroidIcon />
              </Box>
              <Box>
                <TextField
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={(e) => handleInputChange(e)}
                />
              </Box>
            </Box>
            {Object.keys(mobileError).map((key) => {
              return (
                <small key={key} className="error">
                  {mobileError[key]}
                </small>
              );
            })}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box className="custom_input">
              <Box className="input_icon">
                <MailIcon />
              </Box>
              <Box>
                <TextField
                  name="email"
                  placeholder="Email"
                  classes={{}}
                  onChange={(e) => handleInputChange(e)}
                />
              </Box>
            </Box>
            {Object.keys(emailError).map((key) => {
              return (
                <small key={key} className="error">
                  {emailError[key]}
                </small>
              );
            })}
          </Grid>
          <Grid item xs={12} md={8} lg={8}></Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Button onClick={handleSubmit} classes={{ root: "custom_btn" }}>
              Create Contact
            </Button>
          </Grid>
        </Grid>
        <AlertDialogSlide open={open} handleClose={handleClose} path="/" />
      </Box>
    </Layout>
  );
};

export default CreateContact;
