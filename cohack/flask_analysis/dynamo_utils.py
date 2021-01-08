from datetime import datetime

import boto3
import botocore.exceptions as be
from faker import Faker
from matplotlib import pyplot as plt
from pandas import DataFrame
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_blobs

AWS_PROFILE = 'abhi-amplifyv3'
DEV_DB = 'ConcernedUserTable'

flask_profile = boto3.session.Session(profile_name=AWS_PROFILE)
dynamodb = flask_profile.resource('dynamodb')
# can toggle between DEV_DB and PROD_DB: set environment variable to do so or modify .env file. DEFAULT = DEV
table_name = DEV_DB
users_created = False


# One time migration for fresh data set
def migration():
    try:
        dynamodb.delete_table(TableName=table_name)
    except be as e:
        print("Table hasn't been created yet got exception", e)

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


def get_table(name=table_name):
    try:
        return dynamodb.Table(name)
    except be:
        migration()
        return dynamodb.Table(name)


def get_user(username, table=table_name):
    table = get_table(table)
    if table == table_name:
        return table.get_item({
            'username': username
        })


def insert_user(user: dict):
    assert set(user.keys()) == {'username', 'quizTaken', 'coords'} \
           and len(user.keys()) == 3, "must be in format: " \
                                      "{'username':'oski@gmail.com',\n" \
                                      "'quizTaken': 'timestamp',\n" \
                                      "'coords':'(lat, lon)'}\n"
    assert type(user['coords']) == dict and len(user['coords']) == 2, \
        "please enter valid coordinates in form (lat, long)"
    user['coords'] = list(map(str, user['coords']))
    user['quizTaken'] = str(user['quizTaken'])
    response = get_table().put_item(Item=user)
    return response


def seed_data():
    fake_engine = Faker()

    # Take the biggest cities and cites of hot spots. Assume hot spots primarily come from cities.
    # For suburbs use cities as centers and increase variance

    centers, stds, samples = [], [], []

    # City of Greely + surrounding suburbs (weld county)
    centers.append((40.542390, -79.157280))
    stds.append(.2)
    centers.append((40.542390, -79.157280))
    samples.append(int(5500 // 10))
    stds.append(.5)
    samples.append(int(755 // 10))
    # Thornton Adams county
    centers.append((39.868042, -104.971924))
    stds.append(.2)
    samples.append(int(12000 // 10))
    centers.append((39.868042, -104.971924))
    stds.append(.7)
    samples.append(int((14411 - 6000) // 10))
    # Araphoe county
    centers.append((36.970890, -93.717979))
    stds.append(.15)
    samples.append(900)
    centers.append((36.970890, -93.717979))
    stds.append(.4)
    samples.append(1305 - 900)
    # Boulder
    centers.append((40.016202, -105.270353))
    stds.append(.2)
    samples.append(400)
    centers.append((40.016202, -105.270353))
    stds.append(.4)
    samples.append(566 - 400)
    # broomfield
    centers.append((39.911665, -105.052883))
    stds.append(.2)
    samples.append(99)
    # denver
    centers.append((39.727325, -104.973980))
    stds.append(.1)
    samples.append(1300)
    centers.append((39.727325, -104.973980))
    stds.append(.4)
    samples.append(1854 - 1300)

    # el paso county
    centers.append((38.832283, -100.821753))
    stds.append(.1)
    samples.append(1041)

    X, _ = make_blobs(n_samples=samples, centers=centers, cluster_std=stds)
    df = DataFrame(dict(x=X[:, 0], y=X[:, 1]))
    fig, ax = plt.subplots(figsize=(8, 8))
    df.plot(ax=ax, kind='scatter', x='x', y='y')
    plt.xlabel('Long')
    plt.ylabel('Lat')
    plt.show()
    clustering = DBSCAN(eps=.5, min_samples=20).fit(X)
    cluster = clustering.labels_
    df = DataFrame(dict(x=X[:, 0], y=X[:, 1], label=cluster))
    group = df.groupby('label')
    independent_clusters = {i: [] for i in range(-1, 10)}
    for key, val in group:
        independent_clusters[key].append(val)

    with get_table().batch_writer() as bat:
        for val in X:
            bat.put_item(Item={
                'username': fake_engine.email(),
                'coords': list(map(str, val))
            })
    return independent_clusters[-1]


if __name__ == '__main__':
    print(seed_data())
