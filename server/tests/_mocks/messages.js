export const valid = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidRequiredTo = {
  // "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidTypeTo = {
  "to": "adamadambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidRequiredToName = {
  "to": "adam@adambragg.com",
  // "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidTypeToName = {
  "to": "adam@adambragg.com",
  "to_name": 4,
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidRequiredFrom = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  // "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidTypeFrom = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": 4,
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidRequiredFromName = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  // "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidTypeFromName = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": 4,
  "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidRequiredSubject = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  // "subject": "We violate free speech",
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidTypeSubject = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": [],
  "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidRequiredText = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  // "text": "<div>Living in the new world<div>with an old soul</div></div>"
}

export const invalidTypeText = {
  "to": "adam@adambragg.com",
  "to_name": "Adam P. Bragg",
  "from": "adampbragg@gmail.com",
  "from_name": "Facebook",
  "subject": "We violate free speech",
  "text": new Date()
}