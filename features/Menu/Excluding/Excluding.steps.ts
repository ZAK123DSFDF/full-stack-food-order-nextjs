"use server";

import { getAllMenusExcluding } from "../../../src/app/actions/menu/getAllMenusExcluding.ts";
import { Then } from "@cucumber/cucumber";

Then("I should get All menus Excluding", async function () {
  try {
    const menus = await getAllMenusExcluding(21);
    return menus;
  } catch (error) {
    throw new Error("error in getting menus");
  }
});
