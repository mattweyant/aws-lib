exports.init = function(genericAWSClient) {
  // Creates a CloudWatch API client
  var createCloudWatchClient = function (accessKeyId, secretAccessKey, options) {
    options = options || {};

    var client = cloudWatchClient({
      host: options.host || "monitoring.amazonaws.com",
      path: options.path || "/",
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      secure: options.secure,
      version: options.version
    });
    return client;
  }
  // Amazon CloudWatch API client
  var cloudWatchClient = function(obj) {
    var aws = genericAWSClient({
      host: obj.host, path: obj.path, accessKeyId: obj.accessKeyId,
      secretAccessKey: obj.secretAccessKey, secure: obj.secure
    })
    obj.call = function(action, query, callback) {
      query["Action"] = action
      query["Version"] = obj.version || '2010-08-01'
      query["SignatureMethod"] = "HmacSHA256"
      query["SignatureVersion"] = "2"
      return aws.call(action, query, callback);
    }
    return obj;
  }
  return createCloudWatchClient;
}