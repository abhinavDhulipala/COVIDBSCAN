from flask import Flask, make_response, jsonify
import scheduled_analysis
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/fetch')
def fetch():
    print('started')
    outbound = []
    for coord, radi in scheduled_analysis.SINGELTON.latest():
        outbound.append({
            'radius': radi,
            "lon": coord[0],
            "lat": coord[1]
        })
    response = make_response(jsonify(outbound), 200)
    response.headers['Content-Type'] = 'application/json'
    return response


@app.route('/')
def yeet():
    return "<h1>yeet<h1/>"


@app.route('/store_user')
def store_user():
    pass


if __name__ == '__main__':
    app.run()
