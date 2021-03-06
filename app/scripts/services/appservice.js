'use strict';

/**
 * @ngdoc service
 * @name majiApp.appService
 * @description
 * # appService
 * Service in the majiApp.
 * @author Maitha Manyala <maitha.manyala [at] gmail.com>
 *
 */

app.service('appService', function ($http, $cookieStore) {
  //TEST -  comment this
  var BASE_URL = 'http://localhost:9090/api/v1/';
  //var BASE_URL = 'https://kimawasco.opentembo.io/simba/api/v1/';
  //var BASE_URL = 'https://nolturesh.opentembo.io/simba/api/v1/';
  // var BASE_URL = 'https://wowasco.opentembo.io/simba/api/v1/';

  var ROLES = 'roles';
  var PERMISSIONS = 'permissions';
  var USERS = 'users';
  var OPTIONS = 'options';
  var AUTH = 'auth';

  //other resources
  var BILLING_MONTHS = 'billing_months';
  var LOCATIONS = 'locations';
  var ZONES = 'zones';
  var CATEGORIES = 'accountCategory';
  var CONSUMERS = 'consumers';
  var ACCOUNTS = 'accounts';
  var METERS = 'meters';
  var METER_SIZES = 'meterSizes';
  var METER_OWNERS = 'meterOwners';
  var TARIFFS = 'tariffs';
  var PAYMENTS = 'payments';
  var BILLS = 'bills';
  var PAYMENT_TYPES = 'paymentTypes';
  var BILL_ITEM_TYPES = 'bill_item_types';
  var REPORTS = 'reports';
  var STATS = 'stats';
  var MPESA = 'mpesa';
  var POSTBANK = 'postbank';
  var SMS_TEMPLATES = 'smstemplates';
  var SMS = 'sms';
  var METER_READINGS = 'meterReadings';
  var REPORT_HEADERS = 'reportHeaders';
  var LOGS = 'logs';
  var TASK_TYPES = 'taskTypes';
  var APPROVALS = 'approvals';
  var APPROVAL_TASKS = 'tasks';
  var TASK_APPROVALS = 'taskApprovals';
  var METER_READERS = 'meterReaders';
  var CHARGES = 'charges';



  //__________________________
  var POST_REQUEST = 'POST';
  var GET_REQUEST = 'GET';
  var PUT_REQUEST = 'PUT';
  //___________________________
  //
  var token = getToken();

  function getToken() {
    var userInfo = $cookieStore.get('userInfo');
    if (typeof userInfo === 'undefined') { } else {
      return userInfo.token;
    }
  }

  function getPayload(request) {
    var payload = {};
    payload.token = getToken();
    payload.object = request;

    return payload;
  }

  this.getAuthToken = function () {
    return getToken();
  }

  this.getBaseURl = function () {
    return BASE_URL;
  }
  this.authenticate = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + AUTH,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(request)
    });
  };

  this.getRoles = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ROLES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getUsers = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + USERS,
      data: angular.toJson(getPayload(request))
    });
  };

  this.getOptions = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + OPTIONS,
      params: request,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getRemoteMeterReadings = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READINGS,
      params: request,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateMeterReading = function (request, meterReadingId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + METER_READINGS + '/' + meterReadingId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getRemoteMeterReadingImage = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READINGS + '/getImage',
      params: request,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createRole = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ROLES + "/create",
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateRole = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + ROLES + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.createUser = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + USERS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateOption = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + OPTIONS + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateUser = function (request) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + USERS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.resetUserPassword = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + 'auth/resetPassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.updateRoleWithPemissions = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + PERMISSIONS + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getRolePermissions = function (roleId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PERMISSIONS + '/' + roleId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(''))
    });
  };

  // End admin api calls
  //


  //Start custom calls
  //

  this.getBillingMonthsPage = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLING_MONTHS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getActiveBillingMonths = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLING_MONTHS + '/active',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateBillingMonth = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + BILLING_MONTHS + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getLocations = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + LOCATIONS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateLocation = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + LOCATIONS + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.createLocation = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + LOCATIONS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getZoneMeterReaders = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READERS + '/getZoneMeterReaders',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

    this.getMeterReaders = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READERS + '/getMeterReaders',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMeterReadersNotInZone = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READERS + '/getMeterReadersNotInZone',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.addMeterReaderToZone = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READERS + '/addMeterReaderToZone',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.removeMeterReaderFromZone = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_READERS + '/removeMeterReaderFromZone',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getZones = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ZONES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getZoneById = function (request, zoneId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ZONES + "/one/" + zoneId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getTaskById = function (taskId) {
    var request = {};
    request.taskId = taskId;
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + APPROVAL_TASKS + '/one',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getApprovalTasks = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + APPROVAL_TASKS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getApprovalStepsByTaskType = function (taskTypeId) {
    var request = {};
    request.taskTypeId = taskTypeId;
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + APPROVALS + '/byTaskType',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getTaskApprovals = function (taskId) {
    var request = {};
    request.taskId = taskId;
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + TASK_APPROVALS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createTaskApproval = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + TASK_APPROVALS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createApprovalStep = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + APPROVALS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.removeApprovalStep = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + APPROVALS + '/remove',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getTaskTypes = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + TASK_TYPES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getTaskTypeById = function (taskTypeId) {
    var request = {};
    request.taskTypeId = taskTypeId;
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + TASK_TYPES + "/one",
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getLogs = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + LOGS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getZonesByScheme = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ZONES + '/byScheme',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateZone = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + ZONES + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createZone = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ZONES + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getCharges = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CHARGES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getAccountCategories = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CATEGORIES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAllAccountCategories = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CATEGORIES + '/all',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateAccountCategory = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + CATEGORIES + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createAccountCategory = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CATEGORIES + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountConsumers = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CONSUMERS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getConsumers = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CONSUMERS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getConsumer = function (request, consumerId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CONSUMERS + '/one/' + consumerId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateConsumer = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + CONSUMERS + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createConsumer = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CONSUMERS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountsByConsumer = function (request, consumerId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + "/" + consumerId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccounts = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getSchemesList = function () {
    var request = {};
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/schemeList',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccount = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + "/one",
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountById = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + "/one/" + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateAccount = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + ACCOUNTS + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.transferAccount = function (request, consumerId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + ACCOUNTS + '/transfer/' + consumerId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateAccountStatus = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/status/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.turnOnOffAccount = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/turnOnOff/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createAccount = function (request, consumerId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/create/' + consumerId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMeters = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METERS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateMeter = function (request, meterId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METERS + '/update/' + meterId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateMeterAllocate = function (request, meterId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + METERS + '/allocate/' + meterId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateMeterDeallocate = function (request, meterId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + METERS + '/deallocate/' + meterId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createMeter = function (request) {
    var payload = angular.toJson(getPayload(request));
    console.log(payload);

    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METERS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    });
  };

  this.getMeterSizes = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_SIZES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMeterOwners = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + METER_OWNERS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getTariffs = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + TARIFFS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.calculateAmountBilled = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + TARIFFS + '/calculate/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getPaymentTypes = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PAYMENT_TYPES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getPaymentsByAccount = function (request, account_id) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PAYMENTS + '/' + account_id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createPayment = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PAYMENTS + '/create/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBillsByAccount = function (request, account_id) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/' + account_id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBillOnAverageUnits = function () {
    var request = {};
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/billOnAverageUnits',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getLastBillByAccount = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/last/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.billAccount = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/bill/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.chargeAccount = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CHARGES + '/create/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.deleteCharge = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + CHARGES + '/delete',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.deleteBill = function (request, billId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/delete/' + billId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getPayments = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PAYMENTS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMpesaTransactions = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + MPESA,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.allocateMpesaTransaction = function (request, recordId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + MPESA + '/allocate/' + recordId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getPostBankFiles = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + 'postBankFiles',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getPostBankFile = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + 'postBankFiles/one',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.postPostBankFile = function (request) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + 'postBankFiles',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };



  this.getPostBankFileTransactions = function (fileId) {
    var request = {};
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + 'postBankFiles/byFile/' + fileId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };




  this.allocatePostBankTransaction = function (request, recordId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + POSTBANK + '/allocate/' + recordId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.transferPayment = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PAYMENTS + '/transfer/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.transferBill = function (request, billId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/transfer/' + billId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.voidPayment = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + PAYMENTS + '/void',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getBillItemTypes = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILL_ITEM_TYPES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createBillItemType = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILL_ITEM_TYPES + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateBillItemType = function (request, recordId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + BILL_ITEM_TYPES + '/' + recordId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountsReceivables = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/accountsReceivables',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getCreditBalances = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/creditBalances',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMeterReadings = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/meterReadings',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMeterStops = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/meterStops',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getNegativeReadings = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/negativeReadings',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBilledAmountReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/billedAmount',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getFieldCardReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/fieldCard',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountsReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + ACCOUNTS + '/accounts',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBillingChecklistReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLS + '/checklist',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getPaymentsReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/payments',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountsToActivateReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/accountsToActivate',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBilledChargesReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/billingCharges',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getCustomersWithoutPhoneNumbers = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/consumersWithoutPhones',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getPotentialCutOffReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/potentialCutOff',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAccountsNotBilledReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/accountsNotBilled',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getAgeingReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/ageing',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBillingSummaryReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/billingSummary',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getWarisReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/waris',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getWarisByAccountCategoriesReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/warisByAccountCategories',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getAccountStatementReport = function (request, accountId) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/statement/' + accountId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMonthlyBillReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORTS + '/monthlyBills',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getAllBillingMonths = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLING_MONTHS + '/all',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getBillingMonths = function () {
    var request = {};
    request.page = 0;
    request.size = 100;
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + BILLING_MONTHS + '/all',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updatePassword = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + AUTH + '/updatePassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getStats = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + STATS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getSMSTemplates = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + SMS_TEMPLATES,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateTemplate = function (request, objectId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + SMS_TEMPLATES + '/' + objectId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createSMSTemplate = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + SMS_TEMPLATES + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createSMS = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + SMS + '/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.updateMessage = function (request, recordId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + SMS + '/' + recordId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.approveSMS = function (request, smsGroupId) {
    return $http({
      method: PUT_REQUEST,
      url: BASE_URL + SMS + '/approve/' + smsGroupId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getSMSs = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + SMS + '/groups',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getMessages = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + SMS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };


  this.getAccountBalanceReportHeaders = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORT_HEADERS,
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getAgeingReportHeaders = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORT_HEADERS + '/ageingPage',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createAccountBalanceReportHeader = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORT_HEADERS + '/accountBalances',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.createAgeingBalanceReportHeader = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORT_HEADERS + '/createAgeing',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getScheduledAccountBalancesReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORT_HEADERS + '/accountBalancesReport',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };

  this.getScheduledAgeingBalancesReport = function (request) {
    return $http({
      method: POST_REQUEST,
      url: BASE_URL + REPORT_HEADERS + '/ageingReport',
      headers: {
        'Content-Type': 'application/json'
      },
      data: angular.toJson(getPayload(request))
    });
  };




  this.getSMSPlaceholders = function () {
    var placeholders = ['$account_no', '$balance', '$firstname'];
    //$account
    //$balance
    //$firstname
    //$zone_no
    return placeholders;
  };

  this.getCofig = function () {
    var configs = {
      cssAlertInfo: 'alert alert-info',
      cssAlertSucess: 'alert alert-success',
      cssAlertDanger: 'alert alert-danger',
      msgSendingData: 'Please wait, sending data...'
    };
    return configs;
  }

});