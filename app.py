from flask import Flask, render_template
import boto3

app = Flask(__name__)
app.config.update(
    ENV='development'
)

db = boto3.client('dynamodb')


@app.route('/<name>')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
