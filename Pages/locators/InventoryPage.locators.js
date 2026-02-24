export const InventoryPageLocators = {
  buttons: {
    searchInventory: 'button:has-text("Search Inventory")',
    requestInventory: 'button:has-text("Request Inventory")',
    decisionInventory: '#btnDecisionInventory',
    nextOrder: '#btnNextOrder',
    submit: 'button:has-text("Submit")',
    addRow: '#btnAddRow'
  },

  dropdowns: {
    institution: '#ddlInstitutionName',
    branch: '#ddlBranchStoreName',
    branchInput: '#ddlBranchStoreName input',
    product: '#ddlProductName',
    productInput: '#ddlProductName input',
    country: '#ddlCountry',
    state: '#ddlState',
    shippingMode: '#ddlShippingMode',
    plasticCode: '#ddlPlasticCode'
  },

  inputs: {
    firstName: '#txtFirstName',
    lastName: '#txtLastName',
    nameOnCard: '#txtNameOnCard',
    embossingLine: '#txtEmbossingLine4',
    companyName: '#txtFICompanyName',
    address1: '#txtBulkShipAddress1',
    address2: '#txtBulkSHipAddress2',
    city: '#txtCity',
    zipCode: '#txtZipCode',
    quantity: '#txtOtherQuantity',
    branchCode: '#txtBranchStoreCode'
  },

  tables: {
    inventoryGrid: '#gvInventoryStatus',
    plasticDetailsRows: '#gvPlasticCOdeDetails tbody tr'
  },

  order: {
    orderIdContainer: '#divOrderID',
    orderIdText: 'input#txtOrderID'
  }
};