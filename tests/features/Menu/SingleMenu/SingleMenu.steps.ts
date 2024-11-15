"use server";
import { getSingleMenu } from "../../../../src/app/actions/menu/getSingleMenu.ts";
import { Then } from "@cucumber/cucumber";
Then("I should get single menu", async function () {
  try {
    const singleMenu = await getSingleMenu(21);
    return singleMenu;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
