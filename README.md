# Sendmail
(P)

### Starting the app

1. Clone the repo: [git@github.com:adampbragg/sendmail.git](git@github.com:adampbragg/sendmail.git)
2. Navigate into the `server` directory.
3. Drop the `.env.local` file obtained from me into this directory.
4. Run `npm run serve`.
5. Navigate to the `client` directory.
6. Run `npm run start`.
7. Navigate in your browser to [http://localhost:3000](http://localhost:3000)

### Using the App

1. Fill out the form.
2. Hit submit.
3. See the success message.

*(You can add `html` to the Message field).*

### Testing the Service

• From within the `server` directory, run `npm run test`.

### Checking Code Coverage

• From within the `server` directory, run `npm run coverage`.

![sendmail form](sendmail.png)

## Service API

The service is a simple API accepting json describing the message.

**endpoint:** http://localhost:3000/  

### --To Send Mail--
**method:** POST  
**path:** email  
**parameters:** (none)  
**payload/body:**  
`{`  
  `to: email` *(required)*  
  `to_name: string` *(required)*  
  `from: email` *(required)*  
  `from_name: string` *(required)*  
  `subject: string` *(required)*  
  `message: string` *(required)*  
`}`

### Example `curl` Request:
`curl -d '{`  
  `"to": "adam@adambragg.com",`  
  `"to_name": "Adam P. Bragg",`  
  `"from": "adampbragg@gmail.com",`  
  `"from_name": "Adam",`  
  `"subject": "Livin in the new world",`  
  `"message": "with an old soul."`  
`}' \`  
`-X POST 'http://localhost:3000' \`  
`-H "Content-Type: application/json"`