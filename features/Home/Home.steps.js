"use server";
const { Then, Given } = require("@cucumber/cucumber");
const { getAllMenus } = require("../../dist/src/app/actions/menu/getAllMenus");
Then("I should get the menus", async function () {
  try {
    const menus = await getAllMenus();
    return menus;
  } catch (error) {
    throw new Error("error getting checking auth");
  }
});
