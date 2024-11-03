"use server";
import { getAllMenus } from "../../../src/app/actions/menu/getAllMenus.ts";
import { Then } from "@cucumber/cucumber";

Then("I should get All menus", async function () {
  try {
    const menus = await getAllMenus();
    return menus;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
