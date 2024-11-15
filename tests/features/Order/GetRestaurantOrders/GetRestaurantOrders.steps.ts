"use server";
import { getRestaurantOrders } from "../../../../src/app/actions/order/getRestaurantOrders.ts";
import { Then } from "@cucumber/cucumber";

Then("I should get Restaurant Orders", async function () {
  try {
    const restaurantOrders = getRestaurantOrders(process.env.TEST_TOKEN_ADMIN);
    return restaurantOrders;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
