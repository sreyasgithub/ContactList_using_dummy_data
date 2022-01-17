import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import ContactCard from "../components/ContactCard";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import { NativeSelect } from "@material-ui/core";

const Contacts = () => {
  const [contactsList, setContactsList] = useState([]);
  const [category, setCategory] = useState("");
  const [personalContacts, setPersonalContacts] = useState([]);
  const [buissnessContacts, setBuissnessContacts] = useState([]);
  const [editContactList, seteditContactList] = useState({});
  const LOCAL_STORAGE_KEY = "contacts";
  const female_count = contactsList.filter((item) => {
    return item.gender == "Female";
  }).length;
  const male_count = contactsList.filter((item) => {
    return item.gender == "Male";
  }).length;

  const buissness_count = contactsList.filter((item) => {
    return item.category == "Buissness";
  }).length;
  const personal_count = contactsList.filter((item) => {
    return item.category == "Personal";
  }).length;
  const onFilterCategory = (e) => {
    const filterContactLists = contactsList.filter((contact) => {
      return contact.category == e.target.value;
    });
    setCategory(e.target.value);
    if (e.target.value == "Personal") {
      setPersonalContacts(filterContactLists);
    } else {
      setBuissnessContacts(filterContactLists);
    }
    console.log("filteredList", contactsList);
  };
  const removeContactHandler = (id) => {
    console.log(id);
    const newContactList = contactsList.filter((contact) => {
      return contact.id !== id;
    });
    console.log("newContactLis", newContactList);
    setContactsList(newContactList);
    console.log("remove", contactsList);
  };
  const editContactHandler = (id) => {
    console.log(id);
    const EditContactList = contactsList.filter((contact) => {
      return contact.id == id;
    });
    console.log("newContactLis", EditContactList);
    seteditContactList(EditContactList);
    console.log("remove", contactsList);
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

  return (
    <Layout
      header="contacts"
      categoryDetails={
        <div style={{ color: "#fff" }}>
          <p>
            Buissness Contacts : <span>{buissness_count}</span>
          </p>
          <p>
            Personal Contacts : <span>{personal_count}</span>
          </p>
        </div>
      }
      search={
        <div>
          <NativeSelect
            name="category"
            placeholder="Category"
            onChange={(e) => onFilterCategory(e)}
          >
            <option value="Select">Select Category</option>
            <option value="Personal">Personal Contact</option>
            <option value="Buissness">Buissness Contact</option>
          </NativeSelect>
        </div>
      }
    >
      <Grid container>
        <Grid item xs={12}>
          <Box className="add_contact_header">
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Box>
                  <Link to="/create-contact">
                    <Button classes={{ root: "custom_btn" }}>
                      <Box>
                        <AddSharpIcon />
                      </Box>
                      <p>Add Contact</p>
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box style={{ textAlign: "end" }}>
                  <p>
                    Females : <span>{female_count > 0 ? female_count : 0}</span>
                  </p>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box style={{ textAlign: "end" }}>
                  <p>
                    Males : <span>{male_count > 0 ? male_count : 0}</span>
                  </p>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {personalContacts.length > 0 && category == "Personal"
          ? personalContacts.map((contact) => {
              return (
                <Grid item xs={12}>
                  <ContactCard
                    id={contact.id}
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    gender={contact.gender}
                    category={contact.category}
                    email={contact.email}
                    mobile={contact.mobile}
                    removeContactHandler={removeContactHandler}
                    editContactHandler={editContactHandler}
                  />
                </Grid>
              );
            })
          : buissnessContacts.length > 0 && category == "Buissness"
          ? buissnessContacts.map((contact) => {
              return (
                <Grid item xs={12}>
                  <ContactCard
                    id={contact.id}
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    gender={contact.gender}
                    category={contact.category}
                    email={contact.email}
                    mobile={contact.mobile}
                    removeContactHandler={removeContactHandler}
                    editContactHandler={editContactHandler}
                  />
                </Grid>
              );
            })
          : contactsList.map((contact) => {
              return (
                <Grid item xs={12}>
                  <ContactCard
                    id={contact.id}
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    gender={contact.gender}
                    category={contact.category}
                    email={contact.email}
                    mobile={contact.mobile}
                    removeContactHandler={removeContactHandler}
                    editContactHandler={editContactHandler}
                    contact={contact}
                  />
                </Grid>
              );
            })}
      </Grid>
    </Layout>
  );
};

export default Contacts;
