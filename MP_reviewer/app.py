from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return '<h1> login post </h1>'
    return render_template('login.html')


@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        return 'sign up post'
    return 'sign up get'


if __name__ == '__main__':
    app.run(debug=True)
