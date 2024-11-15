"use server";
import { getOrderHistory } from "../../../../src/app/actions/order/getOrderHistory.ts";
import { Then } from "@cucumber/cucumber";

Then("I should get order history", async function () {
  try {
    const orderHistory = getOrderHistory(process.env.TEST_TOKEN_CUSTOMER);
    return orderHistory;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
