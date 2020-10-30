from datetime import datetime

import boto3
from faker import Faker
import scikit

dynamodb = boto3.resource('dynamodb')
table_name = 'ConcernedUserTable'
users_created = False


# One time migration for fresh data set
def migration():
    try:
        dynamodb.delete_table(TableName=table_name)
    except Exception as e:
        print("Table hasn't been created yet")

    response = dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{
            'AttributeName': 'username',
            'KeyType': 'HASH'
        }],
        AttributeDefinitions=[{
            'AttributeName': 'username',  # either email or phone
            'AttributeType': 'S'
        }], ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )

    print(response)


"""
***For testing and Dev Only***
"""


def __test_write():
    table = dynamodb.Table(table_name)
    table.put_item(Item={
        'username': 'dhulipala.abhi@gmail.com',
        'quizTaken': str(datetime.now()),
        'coords': list(map(str, [28.538336, -81.379234]))
    })


"""
***For testing and Dev Only***
"""


def __test_get():
    table = dynamodb.Table(table_name)
    item = table.get_item(Key={
        'username': 'dhulipala.abhi@gmail.com'
    })
    print(item['Item'])


def get_table(name=table_name):
    try:
        return dynamodb.Table(name)
    except Exception:
        migration()
        return dynamodb.Table(name)


def get_user(username, table=table_name):
    table = get_table(table)
    if table == table_name:
        return table.get_item({
            'username': username
        })


def insert_user(user: map):
    assert set(user.keys()) == {'username', 'quizTaken', 'coords'} and len(user.keys()) == 3, "must be in format: " \
                                                                                              "{'username':'oski@gmail.com',\n" \
                                                                                              "'quizTaken': 'timestamp',\n" \
                                                                                              "'coords':'(lat, lon)'}\n"
    assert type(user['coords']) == dict and len(user['coords']) == 2, "please enter valid coordinates in form (lat, long)"
    user['coords'] = list(map(str, user['coords']))
    user['quizTaken'] = str(user['quizTaken'])
    response = get_table().put_item(Item=user)
    return response


def seed_data():
    fake_engine = Faker()

    pass


if __name__ == '__main__':
    seed_data()
