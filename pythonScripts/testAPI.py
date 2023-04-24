import http.client
import os
conn = http.client.HTTPSConnection("code-collab.auth0.com")

CLIENT_SECRET = os.getenv('CLIENT_SECRET')

payload = "{\"client_id\":\"7EfwUHz5rpO4OpKF1CmzfDI37kCpGbqy\",\"client_secret\":"+ str(CLIENT_SECRET) +" \"\",\"audience\":\"https://sports-by-ai.web.app\",\"grant_type\":\"client_credentials\"}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))