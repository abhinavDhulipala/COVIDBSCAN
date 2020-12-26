import unittest
import dynamo_utils
import json

table = dynamo_utils.dynamodb.Table(dynamo_utils.table_name)


# important: services not mocked - will alter development services
class LiveServiceTests(unittest.TestCase):

    def test_dynamo_get(self):
        item = table.get_item(Key={
            'username': 'dhulipala.abhi@gmail.com'
        })
        with open('sample_item_response.json') as expected_response:
            item.pop('ResponseMetadata')
            self.assertEqual(expected_response.read(), json.dumps(item))


if __name__ == '__main__':
    unittest.main()
