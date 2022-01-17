import React, { useState, useEffect } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import MonetizationOnSharpIcon from "@material-ui/icons/MonetizationOnSharp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
const ContactCard = (props) => {
  const history = useNavigate();
  const {
    id,
    firstName,
    lastName,
    gender,
    category,
    email,
    mobile,
    removeContactHandler,
    editContactHandler,
    contact,
  } = props;
  const fNameLetter = firstName?.charAt(0);
  const lNameLetter = lastName?.charAt(0);

  let ContactItem;
  if (contact) {
    ContactItem = Object.values(contact).includes("");
  } else {
    ContactItem = false;
  }
  return (
    <>
      {ContactItem ? null : (
        <div className="contact_card">
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                  {/* <Link to={`/edit-contact/${id}`}>
                    <Box className="action_icon_wrapper">
                      <EditIcon />
                    </Box>
                  </Link> */}

                  <Box
                    className="action_icon_wrapper"
                    onClick={() => removeContactHandler(id)}
                  >
                    <DeleteIcon style={{ color: "rgb(247, 168, 144)" }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2}>
              <div className="contact_img">
                <h1>
                  {fNameLetter ? fNameLetter : null}
                  {lNameLetter ? lNameLetter : null}
                </h1>
              </div>
            </Grid>
            <Grid item container xs={10}>
              <Grid item xs={6}>
                <h4>
                  {firstName ? firstName : null} {lastName ? lastName : null}
                </h4>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Box className="contact_category_wrapper">
                    <div>
                      {category == "Buissness" ? (
                        <MonetizationOnSharpIcon style={{ color: "gold" }} />
                      ) : (
                        <AccountCircleIcon style={{ color: "#f7bee9" }} />
                      )}
                    </div>
                    <h5 style={{ margin: 0 }}>{category}</h5>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={12}>
                <div>
                  <p>{gender}</p>
                </div>
              </Grid>
              <Grid item lg={6}>
                <p>
                  <span>email : </span>
                  {email}
                </p>
                <p>
                  <span>mobile : </span>
                  {mobile}
                </p>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default ContactCard;
