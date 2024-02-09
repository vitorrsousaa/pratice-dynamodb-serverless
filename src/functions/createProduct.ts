import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto";
import { dynamoClient } from "src/lib/dynamoClient";

export async function handler(event: APIGatewayProxyEventV2) {
  const body = JSON.parse(event.body);

  const id = randomUUID();

  const command = new PutCommand({
    TableName: "Products",
    Item: {
      id,
      name: body.name,
      price: body.price,
      tags: body.tags,
    },
  });

  await dynamoClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify(body),
  };
}
