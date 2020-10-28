from flask import Flask, render_template, redirect, request, flash
import uuid
from flask_bootstrap import Bootstrap

import boto3

app = Flask(__name__)
app.secret_key = str(uuid.getnode())
Bootstrap(app)
app.config.update(
    ENV='development'
)


db = boto3.resource('dynamodb', 'us-west-2')
# auth = boto3.resource('cognito')


@app.route("/")
def redirect_to_login():
    return redirect("/login")


@app.route("/login", methods=['GET', 'POST'])
def login(error=None):
    if request.method == 'GET':
        return render_template('login.html')


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/dashboard")
def do_the_dash():
    return render_template('layout.html')


@app.route('/quesi')
def yeet():
    pass


if __name__ == '__main__':
    app.run(debug=True)
