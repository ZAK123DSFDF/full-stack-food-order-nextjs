@Login
Feature: Should Login

  Background: 
    Given I'm on the "login" page

  Scenario Outline: Login as <role>
    When I login with credentials <email> and <password>
    Then I should be on the <expectedPage> page

    Examples:
      | role      | email             | password | expectedPage         |
      | 'Admin'    | 'zak2@gmail.com'   |'123456'  | 'dashboard/orders'     |
      | 'Servant' | 'sdf@gmail.com' | '123456' | 'dashboard/orders' |
      |'Customer' | 'qwe@gmail.com'     | '123456'   | 'home'                |
