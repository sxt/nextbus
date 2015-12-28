from flask import Flask
from flask import render_template, request, url_for, redirect, make_response
from flask import session as login_session
import requests
import json

app = Flask(__name__)
client_id="4535060a-409f-4d72-93b3-4d34b6b2b406"
client_secret="aHEcwMa1J7lOFCTRH-cBSKi0Bnk888DHpkj8G-6FBH5PB5OdDTt6uXU5kqeDqlUuS6pKx8Cbjwrw87T0wMal0Q"
scope='openid+phone+email+address+profile'

@app.route('/index')
def login():
    print "Index"

    agency = request.args.get('a')
    route = request.args.get('r')
    stopTag = request.args.get('s')

    if agency is None:
        agency = 'mit'

    if route is None:
        route='tech'

    if stopTag is None:
        stopTag='kendsq_d'
    
    print "Agency: " + agency 

    return render_template('index.html')

if __name__ == '__main__':
    app.secret_key = 'wefw23jr 2R734T'
    app.run(host='0.0.0.0', port=5000)
    #app.debug = True
    #app.run(port=5000)
    
