from flask import Flask, render_template, redirect

app = Flask(__name__)


@app.route('/')
def hello_world():
    return redirect('/login')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/sign_up')
def sign_up():
    return 'its lit'


if __name__ == '__main__':
    app.run(debug=True)
