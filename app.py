from flask import Flask, render_template, redirect, request, url_for
import boto3

app = Flask(__name__)
app.config.update(
    ENV='development'
)


# db = boto3.client('dynamodb')
@app.route("/")
def redirect_to_login():
    return redirect("/login")


@app.route("/login", methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        return redirect("/dashboard")
    return render_template('login.html', error=error)


@app.route("/dashboard")
def do_the_dash():
    return render_template('main.html')


if __name__ == '__main__':
    app.run(debug=True)
