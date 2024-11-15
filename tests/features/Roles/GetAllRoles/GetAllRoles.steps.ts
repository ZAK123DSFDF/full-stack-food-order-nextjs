"use server";
import { getAllRoles } from "../../../../src/app/actions/role/getAllRoles.ts";
import { Then } from "@cucumber/cucumber";

Then("I should get Restaurant Roles", async function () {
  try {
    const restaurantRoles = getAllRoles(process.env.TEST_TOKEN_ADMIN);
    return restaurantRoles;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
