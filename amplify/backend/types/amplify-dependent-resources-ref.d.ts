export type AmplifyDependentResourcesAttributes = {
  "auth": {
    "carSalesAuth": {
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolId": "string",
      "UserPoolArn": "string",
      "UserPoolName": "string",
      "AppClientIDWeb": "string",
      "AppClientID": "string"
    }
  },
  "api": {
    "carSalesApi": {
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIEndpointOutput": "string"
    }
  },
  "storage": {
    "carSalesStorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
};
