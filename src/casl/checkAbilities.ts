"use server";
export async function checkAbilities(ability: any, action: any, subject: any) {
  try {
    if (ability.can(action, subject)) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
