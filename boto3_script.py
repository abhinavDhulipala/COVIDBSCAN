import boto3

if __name__ == '__main__':
    db = boto3.resource("dynamodb", 'us-west-2')
