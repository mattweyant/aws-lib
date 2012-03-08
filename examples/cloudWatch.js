var aws = require("aws-lib");

cw = aws.createCloudWatchClient(yourAccessKeyId, yourSecretAccessKey);

cw.call("ListMetrics", {}, function(result) {
  console.log(JSON.stringify(result));
})