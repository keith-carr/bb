import React, { useContext } from "react";
import { connect } from "react-redux";

import { MotionStyle } from "framer-motion";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { PageAnimations, Motions, ICartItems } from "../src/types/interfaces";
import Item from "../src/components/shoppingcart/item/Item";

import { ICart } from "../src/store/reducers/cart_reducer";
import Button from "@material-ui/core/Button/Button";
import Link from "../src/Link";
import { ShopContext } from "../src/components/context/ShopContext";

import MotionDiv from "../src/ui/hoc/MotionDiv";
import Container from "../src/ui/grid/Container";
import { getTotalItems } from "../src/utils/Math";

interface IProps {
  pageStyle: MotionStyle;
  pageAnimations: PageAnimations;
  motions: Motions;
  cartItems: ICartItems[];
  cartTotal: number;
}
const useStyles = makeStyles((theme) => ({
  root: {},
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "125px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "35px",
    },
  },
  heightOfContainer: {
    height: "100%",
  },
  header: {
    borderBottom: `3px solid ${theme.palette.common.antiqueWhite}`,
    padding: "0px 30px 5px",
    width: "100px",
    textAlign: "center",
    margin: "0 auto 70px",
  },
  shoppingcartContainer: {
    width: "95%",
    margin: "0px auto",
    maxWidth: "1150px",
    [theme.breakpoints.up("lg")]: {
      width: "85%",
    },
  },
  totalItems: {
    fontFamily: "Nunito",
    color: "#36445c",
    borderBottom: "2px solid #ffa225",
    padding: "20px 70px 30px",
  },
  itemsList: {
    overflow: "auto",
    height: "350px",
    minWidth: "350px",
    marginTop: "20px",
    marginBottom: "60px",
    paddingRight: "10px",
    paddingLeft: "10px",
    textAlign: "center",
    border: `1px solid ${theme.palette.common.dimegray}10`,
    backgroundColor: theme.palette.common.offWhite,
    borderRadius: "4px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
  },
  bottomBorder: {
    marginTop: "25px",
    border: `0.5px solid ${theme.palette.common.orange}`,
    width: "280px",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "450px",
    },
  },
  checkoutBtn: {
    color: theme.palette.common.dimGray,
    font: "0.8rem Raleway",
    textTransform: "none",
    letterSpacing: "0.5px",
    padding: "12px 25px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    border: `0.5px solid ${theme.palette.common.slateTan}99`,
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.common.orange,
    },
  },
}));

/* Container with hidden overflow for items in cart */
const ItemsList = (props: any) => {
  const classes = useStyles();
  return (
    <div className={classes.itemsList}>
      {props.cartItems.length > 0 ? (
        props.cartItems.map((item: ICartItems, index: number) => (
          <Item
            key={item.name + item.size + index}
            getQtyTotal={props.getQtyTotal}
            name={item.name}
            quantity={item.quantity}
            size={item.size}
            price={item.price}
            src={item.src}
            id={item.id}
          />
        ))
      ) : (
        <span style={{ fontFamily: "Nunito", color: "#36445c" }}>
          Your Cart Is Empty
        </span>
      )}
    </div>
  );
};

const Stats = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.totalItems}>
      {"Cart Total: $" + props.cartTotal.toFixed(2)}
      <br />
      {"Total Items in Cart: " + getTotalItems(props.cartItems) + " items"}
    </div>
  );
};

const Shoppingcart = (props: IProps) => {
  const { checkout } = useContext<any>(ShopContext);
  const classes = useStyles();

  return (
    <MotionDiv pageAnimations={props.pageAnimations}>
      <div className={classes.sectionMargin} />
      <Grid container justify="center" className={classes.header}>
        <Typography variant="h2">Cart</Typography>
      </Grid>

      <div className={classes.shoppingcartContainer}>
        <Container
          direction="column"
          justify="space-around"
          alignItems="center"
          spacing={4}
          xs={12}
        >
            <Stats cartTotal={props.cartTotal} cartItems={props.cartItems} />
            <ItemsList
              cartItems={props.cartItems}
              getQtyTotal={getTotalItems}
            />
            <Button
              disabled={props.cartTotal === 0}
              component={Link}
              href={checkout.webUrl ? checkout.webUrl : "/"}
              className={classes.checkoutBtn}
            >
              Continue To Checkout
            </Button>
        </Container>
      </div>
    </MotionDiv>
  );
};

export default connect((state: { cart: ICart }) => ({
  cartItems: state.cart.cartItems,
  cartTotal: state.cart.cartTotal,
}))(Shoppingcart);
