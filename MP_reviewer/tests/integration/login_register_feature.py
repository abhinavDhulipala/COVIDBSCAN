import unittest
import capybara.dsl
import capybara
import selenium
from flask import url_for

# capybara.default_driver = 'selenium'

"""
Note: if full features of selenium are required
"""


class AuthFeature(unittest.TestCase):
    def setUp(self) -> None:
        self.page = capybara.dsl.page

    def tearDown(self) -> None:
        capybara.reset_sessions()

    def test_toggle(self):
        self.page.visit('/login')
        self.page.assert_text('Email address')
        self.page.assert_text('Password')


if __name__ == '__main__':
    unittest.main()
