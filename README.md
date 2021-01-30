# schedge-alert

An API for keeping track of courses' statuses provided by [Schedge](schedge.a1liu.com) API. 
It will send out emails notifying users if the statuses change for tracked courses by checking them periodically.


# API
```
POST     /course/:year/:sem/:registrationNumber
sem = ["ja", "sp", "su", "fa"]
body: {
    name: "String",
    status: "String",
    email: "String"
}


DELETE   /course/:year/:sem/:registrationNumber
sem = ["ja", "sp", "su", "fa"]
body: {
    name: "String",
    status: "String",
    email: "String"
}
````