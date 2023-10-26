Feature: Order Processing

  Scenario: Process an order successfully
    Given the customer is registered in the system
    When the customer searches for their ID
    Then the system should return the customer
    And the product is valid
    When the order's products are retrieved
    And the customer object is created
    And the order object is created with the customer and products
    And the payment is processed by calling paymentfacade.process with orderId and amount
    Then the payment should be approved
    And an invoice should be generated
    And the status of the order should be changed to "approved"
    And the system should return a DTO containing the order ID, invoice ID, status, total, and products

  Scenario: Fail to process the order due to customer not found
    Given the customer is not registered in the system
    When the customer searches for their ID
    Then the system should return "Client not found"
    And the order should not be processed

  Scenario: Fail to process the order due to payment not approved
    Given the customer is registered in the system
    When the customer searches for their ID
    And the product is valid
    When the order's products are retrieved
    And the customer object is created
    And the order object is created with the customer and products
    And the payment is processed by calling paymentfacade.process with orderId and amount
    Then the payment should not be approved
    And no invoice should be generated
    And the status of the order should not be changed

