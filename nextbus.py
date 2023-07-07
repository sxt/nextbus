from flask import Flask
from flask import render_template, request, url_for, redirect, make_response
from flask import session as login_session
import json
import os

app = Flask(__name__)

@app.route('/index')
def index():
    print ("Index")

    agency = request.args.get('a')
    route = request.args.get('r')
    stopTag = request.args.get('s')

    if agency is None:
        agency = 'mit'

    if route is None:
        route='tech'

    if stopTag is None:
        stopTag='kendsq_d'
    
    return render_template('index.html', a=agency, r=route, s=stopTag)

@app.route('/indexMbta')
def indexMbta():
    print ("Index MBTA")

    agency = 'mbta'
    route = request.args.get('r')
    stopTag = request.args.get('s')
    mbta_apikey = request.args.get('mbta_apikey')

    return render_template('index.html', a=agency, r=route, s=stopTag, mbta_apikey=mbta_apikey)

@app.route('/map')
def map():

    mq_apikey = request.args.get('mq_apikey')
    mbta_apikey = request.args.get('mbta_apikey')

    return render_template('map.html', mq_apikey=mq_apikey, mbta_apikey=mbta_apikey)

if __name__ == '__main__':
    app.secret_key = 'wefw23jr 2R734T'
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

    #app.debug = True
    #app.run(port=5000)
    
