"use server";
import { getAllServants } from "../../../src/app/actions/user/getAllServants.ts";
import { Then } from "@cucumber/cucumber";

Then("I should get Restaurant Users", async function () {
  try {
    const restaurantServant = getAllServants(process.env.TEST_TOKEN_ADMIN);
    return restaurantServant;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
